/*
  VELOV — PANNENDIENST DEBUG VERSION
  ===================================
  Use this to confirm the custom element loads at all.
  If you see a green box → the element works, the issue is in the full file.
  If you see nothing → the issue is in Wix settings (URL / tag / height).

  Tag name: velov-pannendienst
  After confirming this works, switch back to velov-pannendienst-UNIFIED.js
*/

class VelovPannendienst extends HTMLElement {
  connectedCallback() {
    this.style.cssText = 'display:block;width:100%;min-height:200px;';
    this.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #7B68EE, #E8573A);
        color: white;
        padding: 48px 32px;
        font-family: sans-serif;
        text-align: center;
        border-radius: 16px;
        margin: 24px;
      ">
        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
        <h2 style="font-size: 28px; font-weight: 800; margin: 0 0 12px;">
          VELOV Pannendienst — Element lädt!
        </h2>
        <p style="font-size: 16px; opacity: 0.9; margin: 0 0 8px;">
          Custom element is working. Language detected: <strong id="vp-lang-debug">detecting...</strong>
        </p>
        <p style="font-size: 14px; opacity: 0.75; margin: 0;">
          URL path: <code id="vp-path-debug"></code>
        </p>
        <p style="font-size: 14px; opacity: 0.75; margin: 8px 0 0;">
          doc.lang: <code id="vp-doclang-debug"></code>
        </p>
      </div>
    `;

    /* Show debug info */
    try {
      const path = window.location.pathname;
      const match = path.match(/^\/(en|fr|it|es)(\/|$)/i);
      const docLang = document.documentElement.lang || '(none)';
      const detected = match ? match[1] : docLang.substring(0,2) || 'de (fallback)';

      this.querySelector('#vp-lang-debug').textContent = detected;
      this.querySelector('#vp-path-debug').textContent = path;
      this.querySelector('#vp-doclang-debug').textContent = docLang;
    } catch(e) {
      this.querySelector('#vp-lang-debug').textContent = 'error: ' + e.message;
    }
  }
}

if (!customElements.get('velov-pannendienst')) {
  customElements.define('velov-pannendienst', VelovPannendienst);
}
