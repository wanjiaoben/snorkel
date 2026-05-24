/**
 * snorkel.nice.okinawa — App Logic
 * 读取 photos.js 的数据，渲染画廊、Hero、日志
 */

// ── 语言 ──────────────────────────────────────────
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('visible', el.getAttribute('data-lang') === lang);
  });
  document.querySelectorAll('.lang-btn').forEach((btn, i) => {
    btn.classList.toggle('active', ['en','zh-Hans','zh-Hant'][i] === lang);
  });
  document.documentElement.lang = lang;
}

// ── Hero 背景图 ───────────────────────────────────
function renderHero() {
  const h = PHOTOS.hero;
  if (!h) return;
  const bg = document.getElementById('heroBg');
  bg.style.cssText = `
    position:absolute;inset:0;
    background-image:url('${h.file}');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
  `;
  // overlay gradient on top of photo
  bg.insertAdjacentHTML('afterend',
    `<div style="position:absolute;inset:0;
      background:linear-gradient(180deg,rgba(5,17,31,.45) 0%,rgba(5,17,31,.2) 40%,rgba(5,17,31,.65) 100%);
      pointer-events:none;"></div>`
  );
  // credit
  const credit = document.getElementById('heroCredit');
  credit.textContent = `📷 ${h.caption} · ${h.date}`;
}

// ── Gallery ───────────────────────────────────────
let currentFilter = 'all';
let filteredPhotos = [];
let lbIndex = 0;

function renderGallery(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('galleryGrid');
  const photos = filter === 'all'
    ? PHOTOS.gallery
    : PHOTOS.gallery.filter(p => p.tag === filter);
  filteredPhotos = photos;

  grid.innerHTML = photos.map((p, i) => `
    <div class="gitem gitem-${p.layout}" data-tag="${p.tag}" onclick="openLightbox(${i})">
      <div class="gitem-img" style="background-image:url('${p.file}')">
        <div class="gitem-hover">
          <span class="gitem-tag-pill">${tagLabel(p.tag)}</span>
          <p class="gitem-caption">${p.caption}</p>
          <p class="gitem-date">${formatDate(p.date)}</p>
        </div>
      </div>
    </div>
  `).join('');

  // filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function tagLabel(tag) {
  const map = { drone:'🚁 Drone', underwater:'🤿 Underwater', activity:'🏄 Activity', sunset:'🌅 Sunset' };
  return map[tag] || tag;
}

function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

// ── Filter buttons ────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => renderGallery(btn.dataset.filter));
});

// ── Photo Log ─────────────────────────────────────
function renderLog() {
  const body = document.getElementById('logBody');
  const entries = [...PHOTOS.log].sort((a,b) => b.date.localeCompare(a.date));
  body.innerHTML = entries.map(e => `
    <div class="log-entry">
      <span class="log-date">${formatDate(e.date)}</span>
      <span class="log-action log-${e.action}">${e.action}</span>
      <span class="log-files">${e.files.join(', ')}</span>
      <span class="log-note">${e.note}</span>
    </div>
  `).join('');
}

let logOpen = false;
function toggleLog() {
  logOpen = !logOpen;
  const body = document.getElementById('logBody');
  body.style.display = logOpen ? 'block' : 'none';
}

// ── Lightbox ──────────────────────────────────────
function openLightbox(index) {
  lbIndex = index;
  showLbPhoto();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbPhoto() {
  const p = filteredPhotos[lbIndex];
  document.getElementById('lbImg').src = p.file;
  document.getElementById('lbCaption').textContent = p.caption;
  document.getElementById('lbMeta').textContent =
    `${tagLabel(p.tag)} · ${formatDate(p.date)} · ${lbIndex+1} / ${filteredPhotos.length}`;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir, e) {
  e.stopPropagation();
  lbIndex = (lbIndex + dir + filteredPhotos.length) % filteredPhotos.length;
  showLbPhoto();
}

// ── Booking Modal ─────────────────────────────────
const packages = {
  half:  { tag:{ en:'Half Day · 4 Hours','zh-Hans':'半日 · 4小时','zh-Hant':'半日 · 4小時'}, title:{ en:'Morning Discovery','zh-Hans':'晨光探索之旅','zh-Hant':'晨光探索之旅'}, price:'¥8,800' },
  full:  { tag:{ en:'Full Day · 8 Hours','zh-Hans':'全日 · 8小时','zh-Hant':'全日 · 8小時'}, title:{ en:'Blue Ocean Expedition','zh-Hans':'蓝海全日探险','zh-Hant':'藍海全日探險'}, price:'¥16,500' },
  night: { tag:{ en:'Night · 3 Hours','zh-Hans':'夜间 · 3小时','zh-Hant':'夜間 · 3小時'}, title:{ en:'Midnight Luminescence','zh-Hans':'午夜荧光夜潜','zh-Hant':'午夜螢光夜潛'}, price:'¥12,000' },
};

function openModal(pkg) {
  const p = packages[pkg];
  const l = currentLang;
  document.getElementById('modal-tag').textContent   = p.tag[l];
  document.getElementById('modal-title').textContent = p.title[l];
  document.getElementById('modal-price').textContent = p.price + (l==='en' ? ' / person' : ' / 每人');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setLang(currentLang);
}
function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }
function closeModalBg(e) { if (e.target === document.getElementById('modal')) closeModal(); }
function handlePay(m) {
  const msg = { en: m==='stripe'?'Redirecting to Stripe…':'Redirecting to PayPal…', 'zh-Hans': m==='stripe'?'正在跳转到Stripe…':'正在跳转到PayPal…', 'zh-Hant': m==='stripe'?'正在跳轉到Stripe…':'正在跳轉到PayPal…' };
  alert(msg[currentLang]);
}

// ── Float buttons ─────────────────────────────────
function toggleFloat() { document.getElementById('floatWrap').classList.toggle('open'); }
function toggleWechat() { document.getElementById('wcOverlay').classList.add('open'); document.body.style.overflow='hidden'; setLang(currentLang); }
function closeWechat() { document.getElementById('wcOverlay').classList.remove('open'); document.body.style.overflow=''; }

// ── Bubbles ───────────────────────────────────────
function makeBubbles() {
  const wrap = document.getElementById('bubbles');
  if (!wrap) return;
  for (let i = 0; i < 18; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 4 + Math.random() * 12;
    b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*14}s;animation-delay:${Math.random()*10}s;`;
    wrap.appendChild(b);
  }
}

// ── Keyboard ──────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeWechat(); closeLightbox(); }
  if (document.getElementById('lightbox').classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lbNav(-1, { stopPropagation:()=>{} });
    if (e.key === 'ArrowRight') lbNav(1,  { stopPropagation:()=>{} });
  }
});

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderGallery('all');
  renderLog();
  makeBubbles();
  setLang('en');
});
