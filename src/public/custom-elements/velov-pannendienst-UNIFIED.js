/* VELOV PANNENDIENST - STABLE VERSION */
class VelovPannendienst extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div style="padding:40px; font-family:sans-serif; text-align:center; background:#f9f9f9; border-radius:15px; border:2px solid #E8573A;">
        <h1 style="color:#E8573A; font-size:28px;">Plattfuss in Zürich?</h1>
        <p style="font-size:18px;">Mobiler Pannendienst — Wir kommen zu dir.</p>
        <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
          <a href="tel:+41762352126" style="background:#000; color:#fff; padding:15px 25px; text-decoration:none; border-radius:8px; font-weight:bold;">📞 Anrufen</a>
          <a href="https://wa.me/41762352126" style="background:#25D366; color:#fff; padding:15px 25px; text-decoration:none; border-radius:8px; font-weight:bold;">💬 WhatsApp</a>
        </div>
        <p style="margin-top:20px; font-weight:bold; color:#E8573A;">CHF 99 — All Inclusive</p>
      </div>
    `;
  }
}

if (!customElements.get('velov-pannendienst')) {
  customElements.define('velov-pannendienst', VelovPannendienst);
}
