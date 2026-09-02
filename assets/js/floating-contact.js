(function () {
  'use strict';

  var EMAIL = 'info@nice.okinawa';
  var WHATSAPP_URL = 'https://wa.me/817089523968';
  var COMPONENT_ID = 'nice-floating-contact';
  var STYLE_ID = 'nice-floating-contact-style';

  function getScriptSite() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      var site = scripts[i].getAttribute('data-contact-site');
      if (site) return site;
    }
    return (window.location.hostname || 'nice.okinawa').split('.')[0] || 'nice';
  }

  function encode(value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  }

  function appendStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '#' + COMPONENT_ID + '{position:fixed;left:16px;bottom:16px;z-index:950;display:flex;gap:8px;align-items:center;pointer-events:none;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
      '#' + COMPONENT_ID + ' a{pointer-events:auto;display:inline-flex;align-items:center;gap:7px;min-height:42px;padding:10px 13px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:800;line-height:1;color:#fff;box-shadow:0 8px 26px rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.26);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}',
      '#' + COMPONENT_ID + ' a:focus-visible{outline:3px solid rgba(255,255,255,.95);outline-offset:3px;}',
      '#' + COMPONENT_ID + ' .nice-floating-contact-email{background:rgba(20,85,150,.94);}',
      '#' + COMPONENT_ID + ' .nice-floating-contact-whatsapp{background:rgba(27,160,83,.95);}',
      '#' + COMPONENT_ID + ' .nice-floating-contact-icon{font-size:16px;line-height:1;}',
      '@media(max-width:540px){#' + COMPONENT_ID + '{left:10px;right:10px;bottom:10px;justify-content:center;}#' + COMPONENT_ID + ' a{flex:1;justify-content:center;max-width:172px;min-height:44px;padding:10px 12px;font-size:12px;}}',
      '@media(print){#' + COMPONENT_ID + '{display:none!important;}}'
    ].join('');

    document.head.appendChild(style);
  }

  function createLink(className, href, icon, label) {
    var link = document.createElement('a');
    link.className = className;
    link.href = href;
    link.setAttribute('aria-label', label);
    if (href.indexOf('https://') === 0) {
      link.target = '_blank';
      link.rel = 'noopener';
    }

    var iconSpan = document.createElement('span');
    iconSpan.className = 'nice-floating-contact-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;

    var labelSpan = document.createElement('span');
    labelSpan.textContent = label;

    link.appendChild(iconSpan);
    link.appendChild(labelSpan);
    return link;
  }

  function init() {
    if (document.getElementById(COMPONENT_ID)) return;

    var site = getScriptSite();
    var subject = '[' + site + '] お問い合わせ';
    var wrap = document.createElement('nav');
    wrap.id = COMPONENT_ID;
    wrap.setAttribute('aria-label', 'Contact');

    wrap.appendChild(createLink(
      'nice-floating-contact-email',
      'mailto:' + EMAIL + '?subject=' + encode(subject),
      '✉️',
      'Email'
    ));
    wrap.appendChild(createLink(
      'nice-floating-contact-whatsapp',
      WHATSAPP_URL,
      '💬',
      'WhatsApp'
    ));

    appendStyles();
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
