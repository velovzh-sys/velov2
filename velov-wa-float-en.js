// VELOV Floating WhatsApp Button — English Edition
// Add ONCE to Wix Header / Footer / masterPage of your /en/ pages
// Tag: <velov-wa-float-en></velov-wa-float-en>
//
// Same architecture as the German velov-wa-float.js but with an English
// default message so WhatsApp opens with English context for the recipient.
// Also auto-pushes a 'whatsapp_click' dataLayer event when clicked.

(function () {
  const PHONE = '41762352126';
  const MSG = encodeURIComponent('Hi VELOV, I need a bike repair in Zurich.');
  const HREF = 'https://wa.me/' + PHONE + '?text=' + MSG;
  const ROOT_ID = 'velov-wa-float-en-root';

  const CSS = `
    #${ROOT_ID} {
      position: fixed !important;
      right: 18px !important;
      bottom: 18px !important;
      z-index: 2147483647 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      pointer-events: auto;
    }
    #${ROOT_ID} .vw-wa {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      background: #25D366;
      color: #fff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none !important;
      border-radius: 999px;
      box-shadow: 0 10px 28px rgba(37,211,102,.45), 0 2px 6px rgba(0,0,0,.15);
      transition: transform .18s ease, box-shadow .18s ease;
      cursor: pointer;
      line-height: 1;
      -webkit-tap-highlight-color: transparent;
      overflow: visible;
    }
    #${ROOT_ID} .vw-wa:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 14px 34px rgba(37,211,102,.55), 0 3px 8px rgba(0,0,0,.2);
    }
    #${ROOT_ID} .vw-wa:active { transform: translateY(0) scale(.98); }
    #${ROOT_ID} .vw-wa svg { width: 22px; height: 22px; fill: #fff; flex-shrink: 0; }
    #${ROOT_ID} .vw-lbl { white-space: nowrap; }
    #${ROOT_ID} .vw-pulse {
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: #25D366;
      opacity: .55;
      animation: vwPulseEn 2.2s ease-out infinite;
      pointer-events: none;
      z-index: -1;
    }
    @keyframes vwPulseEn {
      0%   { transform: scale(1);    opacity: .55; }
      70%  { transform: scale(1.35); opacity: 0;   }
      100% { transform: scale(1.35); opacity: 0;   }
    }
    @media (max-width: 640px) {
      #${ROOT_ID} { right: 14px !important; bottom: 14px !important; }
      #${ROOT_ID} .vw-wa { padding: 13px 16px; font-size: 14px; }
      #${ROOT_ID} .vw-lbl { display: none; }
      #${ROOT_ID} .vw-wa svg { width: 26px; height: 26px; }
    }
  `;

  const HTML = `
    <a class="vw-wa" href="${HREF}" target="_blank" rel="noopener"
       aria-label="Contact VELOV via WhatsApp">
      <span class="vw-pulse"></span>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.03 1.318-1.044 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.9 2.708.9.53 0 1.8.072 1.7-1.175-.13-1.403-.302-1.56-.44-1.92zM16.16 31.23c-2.75 0-5.545-.832-7.872-2.295L.072 31.23l2.437-7.915C.872 20.83 0 17.825 0 14.72 0 6.58 7.242 0 16.16 0c8.92 0 16.16 6.58 16.16 14.72 0 8.12-7.242 14.72-16.16 14.72l.012-.043c-.014 0-.014.013-.014.013z"/>
      </svg>
      <span class="vw-lbl">WhatsApp</span>
    </a>
  `;

  function trackClick() {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_click',
        link_url: HREF,
        link_text: 'WhatsApp Float (EN)',
        page_path: location.pathname,
        language: 'en',
        source: 'wa-float-en'
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', {language: 'en', source: 'wa-float-en'});
      }
    } catch (e) {}
  }

  function mount() {
    if (document.getElementById(ROOT_ID)) return;
    if (!document.body) return;

    if (!document.getElementById(ROOT_ID + '-css')) {
      const style = document.createElement('style');
      style.id = ROOT_ID + '-css';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.innerHTML = HTML;

    // Bind tracker on the anchor
    const a = root.querySelector('a.vw-wa');
    if (a) a.addEventListener('click', trackClick, {passive: true});

    document.body.appendChild(root);
  }

  class VelovWAFloatEn extends HTMLElement {
    connectedCallback() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        mount();
      }
      this.style.display = 'none';
    }
  }

  if (!customElements.get('velov-wa-float-en')) {
    customElements.define('velov-wa-float-en', VelovWAFloatEn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
