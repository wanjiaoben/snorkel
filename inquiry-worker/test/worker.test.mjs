import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import worker, { SOURCE_BY_ORIGIN } from '../src/worker.js';

const EXPECTED_ORIGINS = [
  'https://snorkel.nice.okinawa',
  'https://fishing.nice.okinawa',
  'https://japanusedcars.nice.okinawa'
];

function makeDb() {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      let bindings = [];
      return {
        bind(...values) {
          bindings = values;
          return this;
        },
        async first() {
          return null;
        },
        async run() {
          calls.push({ sql, bindings });
          return { success: true };
        },
        async all() {
          return { results: [] };
        }
      };
    }
  };
}

function makeEnv(db = makeDb()) {
  return {
    DB: db,
    ALLOWED_ORIGINS: EXPECTED_ORIGINS.join(','),
    TURNSTILE_SECRET: 'test-secret',
    INQUIRY_TO_EMAIL: 'cctest@nice.okinawa',
    RATE_LIMIT_MAX: '5',
    RATE_LIMIT_WINDOW_SECONDS: '3600',
    ENVIRONMENT: 'preview'
  };
}

function optionsRequest(origin) {
  const headers = origin === undefined ? {} : { Origin: origin };
  return new Request('https://worker.example/api/inquiries', {
    method: 'OPTIONS',
    headers
  });
}

test('wrangler CORS allowlist contains exactly the three production origins', async () => {
  const raw = await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
  const config = JSON.parse(raw);
  assert.deepEqual(config.vars.ALLOWED_ORIGINS.split(','), EXPECTED_ORIGINS);
  assert.equal(config.vars.ALLOWED_ORIGINS.includes('*'), false);
});

test('snorkel frontend sends the matching site and sourceSite values', async () => {
  const app = await readFile(new URL('../../app.js', import.meta.url), 'utf8');
  assert.match(app, /site:\s*['"]snorkel['"]/);
  assert.match(app, /sourceSite:\s*['"]snorkel\.nice\.okinawa['"]/);
});

test('sunset charter frontend sends the matching site/sourceSite and requires ok response body', async () => {
  const page = await readFile(new URL('../../sunset-charter/index.html', import.meta.url), 'utf8');
  assert.match(page, /site:\s*['"]snorkel['"]/);
  assert.match(page, /sourceSite:\s*['"]snorkel\.nice\.okinawa['"]/);
  assert.match(page, /if\s*\(\s*!response\.ok\s*\|\|\s*!result\.ok\s*\)\s*throw new Error/);
});

test('all three exact origins receive their own CORS response header', async () => {
  for (const origin of EXPECTED_ORIGINS) {
    const response = await worker.fetch(optionsRequest(origin), makeEnv());
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
    assert.equal(response.headers.get('vary'), 'Origin');
  }
});

test('origins outside the exact allowlist are rejected without a CORS grant', async () => {
  const rejected = [
    undefined,
    'null',
    'http://fishing.nice.okinawa',
    'https://evil.example',
    'https://fishing.nice.okinawa.evil.example',
    'https://www.fishing.nice.okinawa',
    'https://japanusedcars.nice.okinawa/'
  ];

  for (const origin of rejected) {
    const response = await worker.fetch(optionsRequest(origin), makeEnv());
    assert.equal(response.status, 403, String(origin));
    assert.equal(response.headers.has('access-control-allow-origin'), false, String(origin));
    assert.deepEqual(await response.json(), { ok: false, error: 'origin_not_allowed' });
  }
});

test('a POST from a disallowed origin is rejected before any D1 operation', async () => {
  const db = makeDb();
  const request = new Request('https://worker.example/api/inquiries', {
    method: 'POST',
    headers: {
      Origin: 'https://fishing.nice.okinawa.evil.example',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      site: 'fishing',
      sourceSite: 'fishing.nice.okinawa',
      project: 'blocked inquiry',
      contact: 'cctest@nice.okinawa',
      turnstileToken: 'test-token'
    })
  });

  const response = await worker.fetch(request, makeEnv(db));
  assert.equal(response.status, 403);
  assert.equal(response.headers.has('access-control-allow-origin'), false);
  assert.deepEqual(await response.json(), { ok: false, error: 'origin_not_allowed' });
  assert.equal(db.calls.length, 0);
});

test('all three sites persist distinct site and source_site values', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async url => {
    assert.equal(String(url), 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  };

  try {
    for (const origin of EXPECTED_ORIGINS) {
      const db = makeDb();
      const source = SOURCE_BY_ORIGIN[origin];
      const request = new Request('https://worker.example/api/inquiries', {
        method: 'POST',
        headers: {
          Origin: origin,
          'content-type': 'application/json',
          'CF-Connecting-IP': `192.0.2.${origin.includes('fishing') ? '10' : '20'}`
        },
        body: JSON.stringify({
          site: source.site,
          sourceSite: source.sourceSite,
          project: `${source.site} inquiry`,
          contact: 'cctest@nice.okinawa',
          turnstileToken: 'test-token'
        })
      });
      const response = await worker.fetch(request, makeEnv(db));
      assert.equal(response.status, 202);
      assert.equal(response.headers.get('access-control-allow-origin'), origin);
      assert.equal((await response.json()).ok, true);

      const insert = db.calls.find(call => /INSERT INTO inquiries\s*\(/.test(call.sql));
      assert.ok(insert, `${source.site} inquiry insert missing`);
      assert.equal(insert.bindings[1], source.site);
      assert.equal(insert.bindings[2], source.sourceSite);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('origin and payload source must match before any inquiry is stored', async () => {
  const mismatches = [
    { site: 'japanusedcars', sourceSite: 'fishing.nice.okinawa' },
    { site: 'fishing', sourceSite: 'japanusedcars.nice.okinawa' },
    { site: 'japanusedcars', sourceSite: 'japanusedcars.nice.okinawa' }
  ];

  for (const mismatch of mismatches) {
    const db = makeDb();
    const request = new Request('https://worker.example/api/inquiries', {
      method: 'POST',
      headers: {
        Origin: 'https://fishing.nice.okinawa',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...mismatch,
        project: 'spoofed inquiry',
        contact: 'cctest@nice.okinawa',
        turnstileToken: 'test-token'
      })
    });

    const response = await worker.fetch(request, makeEnv(db));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { ok: false, error: 'invalid_inquiry_source' });
    assert.equal(db.calls.some(call => /INSERT INTO inquiries\s*\(/.test(call.sql)), false);
  }
});
