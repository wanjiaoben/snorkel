const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_BYTES = 8192;

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers
    }
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] || '*';
  return {
    'access-control-allow-origin': allowOrigin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin'
  };
}

function cleanText(value, max = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function parseGuests(value) {
  const guests = Number(value);
  return Number.isInteger(guests) && guests > 0 && guests < 100 ? guests : null;
}

async function readJson(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) {
    const err = new Error('request_too_large');
    err.status = 413;
    throw err;
  }
  return request.json();
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function checkRateLimit(env, request, contact) {
  const limit = Number(env.RATE_LIMIT_MAX || 5);
  const windowSeconds = Number(env.RATE_LIMIT_WINDOW_SECONDS || 3600);
  const now = Math.floor(Date.now() / 1000);
  const resetAt = now + windowSeconds;
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  const buckets = [
    ['ip', await sha256Hex(ip)],
    ['contact', await sha256Hex(contact.toLowerCase())],
    ['global', 'all']
  ];

  for (const [scope, bucket] of buckets) {
    const existing = await env.DB.prepare(
      'SELECT count, reset_at FROM inquiry_rate_limits WHERE scope = ? AND bucket = ?'
    ).bind(scope, bucket).first();

    if (!existing || Number(existing.reset_at) <= now) {
      await env.DB.prepare(`
        INSERT INTO inquiry_rate_limits (scope, bucket, count, reset_at, updated_at)
        VALUES (?, ?, 1, ?, datetime('now'))
        ON CONFLICT(scope, bucket) DO UPDATE SET count = 1, reset_at = excluded.reset_at, updated_at = datetime('now')
      `).bind(scope, bucket, resetAt).run();
      continue;
    }

    if (Number(existing.count) >= limit) {
      const err = new Error('rate_limited');
      err.status = 429;
      err.retryAfter = Math.max(1, Number(existing.reset_at) - now);
      throw err;
    }

    await env.DB.prepare(`
      UPDATE inquiry_rate_limits
      SET count = count + 1, updated_at = datetime('now')
      WHERE scope = ? AND bucket = ?
    `).bind(scope, bucket).run();
  }
}

async function verifyTurnstile(env, token, request) {
  if (!token) return false;
  const remoteip = request.headers.get('CF-Connecting-IP') || undefined;
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET,
      response: token,
      remoteip,
      idempotency_key: crypto.randomUUID()
    })
  });
  if (!response.ok) return false;
  const result = await response.json();
  return result && result.success === true;
}

function emailText(inquiry) {
  return [
    'New Nice Okinawa inquiry',
    '',
    `Source: ${inquiry.sourceSite}`,
    `Language: ${inquiry.language || '-'}`,
    `Date: ${inquiry.date || '-'}`,
    `Guests: ${inquiry.guests || '-'}`,
    `Project: ${inquiry.project || '-'}`,
    `Contact: ${inquiry.contact}`,
    `Remarks: ${inquiry.remarks || '-'}`,
    '',
    `Inquiry ID: ${inquiry.id}`
  ].join('\n');
}

async function sendNotification(env, inquiry) {
  const text = emailText(inquiry);
  const html = `<h2>New Nice Okinawa inquiry</h2><pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">${text.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]))}</pre>`;
  return env.EMAIL.send({
    to: env.INQUIRY_TO_EMAIL,
    from: { email: env.INQUIRY_FROM_EMAIL, name: env.INQUIRY_FROM_NAME || 'Nice Okinawa Inquiry' },
    replyTo: inquiry.contact.includes('@') ? inquiry.contact : undefined,
    subject: `[${inquiry.sourceSite}] Inquiry ${inquiry.date || 'no date'} / ${inquiry.guests || '-'} guests`,
    text,
    html
  });
}

async function createInquiry(request, env) {
  const body = await readJson(request);
  const inquiry = {
    id: crypto.randomUUID(),
    sourceSite: cleanText(body.sourceSite || 'snorkel.nice.okinawa', 120),
    date: cleanText(body.date, 40),
    guests: parseGuests(body.guests),
    project: cleanText(body.project, 160),
    contact: cleanText(body.contact, 240),
    remarks: cleanText(body.remarks, 1200),
    language: cleanText(body.language, 40)
  };

  if (!inquiry.contact || !inquiry.project) {
    return json({ ok: false, error: 'missing_required_fields' }, 400, corsHeaders(request, env));
  }

  await checkRateLimit(env, request, inquiry.contact);

  const turnstileOk = await verifyTurnstile(env, body.turnstileToken, request);
  if (!turnstileOk) {
    return json({ ok: false, error: 'turnstile_failed' }, 400, corsHeaders(request, env));
  }

  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '';
  const ipHash = ip ? await sha256Hex(ip) : null;
  const userAgent = cleanText(request.headers.get('User-Agent'), 300);

  await env.DB.prepare(`
    INSERT INTO inquiries (
      id, source_site, requested_date, guests, project, contact, remarks, language,
      status, email_status, ip_hash, user_agent, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'stored', 'pending', ?, ?, datetime('now'), datetime('now'))
  `).bind(
    inquiry.id,
    inquiry.sourceSite,
    inquiry.date || null,
    inquiry.guests,
    inquiry.project || null,
    inquiry.contact,
    inquiry.remarks || null,
    inquiry.language || null,
    ipHash,
    userAgent
  ).run();

  try {
    const result = await sendNotification(env, inquiry);
    await env.DB.prepare(`
      UPDATE inquiries
      SET status = 'notified', email_status = 'sent', email_error = NULL, updated_at = datetime('now')
      WHERE id = ?
    `).bind(inquiry.id).run();
    return json({ ok: true, id: inquiry.id, status: 'notified', emailMessageId: result && result.messageId }, 202, corsHeaders(request, env));
  } catch (error) {
    await env.DB.prepare(`
      UPDATE inquiries
      SET status = 'email_failed', email_status = 'failed', email_error = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(cleanText(error && (error.code || error.message || String(error)), 500), inquiry.id).run();
    return json({ ok: true, id: inquiry.id, status: 'email_failed', emailPending: true }, 202, corsHeaders(request, env));
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }
    const url = new URL(request.url);
    if (url.pathname === '/api/inquiries' && request.method === 'POST') {
      try {
        return await createInquiry(request, env);
      } catch (error) {
        const status = error.status || 500;
        const headers = corsHeaders(request, env);
        if (error.retryAfter) headers['retry-after'] = String(error.retryAfter);
        return json({ ok: false, error: status === 500 ? 'internal_error' : error.message }, status, headers);
      }
    }
    return json({ ok: false, error: 'not_found' }, 404, corsHeaders(request, env));
  }
};
