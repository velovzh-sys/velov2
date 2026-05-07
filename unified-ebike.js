/**
 * VELOV Unified E-Bike Service Component v2.2
 * Optimized for Wix Custom Elements
 */

(function() {
  if (window.__velovSeoHelper) return;
  function safe(s) { return String(s == null ? '' : s).replace(/[\u0000-\u001F]/g, ' '); }
  function buildMirror(s, lang) {
    var h = `<article itemscope itemtype="https://schema.org/Article" lang="${lang}">`;
    h += `<header><h1>${safe(s.h1)}</h1>`;
    if (s.intro) h += `<p>${safe(s.intro)}</p>`;
    h += `</header>`;
    (s.sections || []).forEach(function(sec) {
      h += `<section>`;
      if (sec.h2) h += `<h2>${safe(sec.h2)}</h2>`;
      if (sec.body) h += `<p>${safe(sec.body)}</p>`;
      if (Array.isArray(sec.h3items)) sec.h3items.forEach(function(it) {
        h += `<h3>${safe(it.h3)}</h3>`;
        if (it.body) h += `<p>${safe(it.body)}</p>`;
      });
      h += `</section>`;
    });
    h += `</article>`;
    return h;
  }
  function injectSeo(host, cfg, lang) {
    if (!host || !cfg) return;
    function appendMirror() {
      if (host.querySelector('[data-velov-seo]')) return;
      var m = document.createElement('div');
      m.setAttribute('data-velov-seo', '');
      m.setAttribute('aria-hidden', 'true');
      m.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';
      m.innerHTML = buildMirror(cfg, lang);
      host.appendChild(m);
    }
    setTimeout(appendMirror, 0);
    setTimeout(appendMirror, 200);
    if (Array.isArray(cfg.schema) && cfg.schema.length) {
      var id = 'velov-schema-' + (cfg.id || 'ebike-' + lang);
      var ex = document.getElementById(id); if (ex) ex.remove();
      var sc = document.createElement('script');
      sc.id = id; sc.type = 'application/ld+json';
      try { sc.textContent = JSON.stringify(cfg.schema); } catch (e) { return; }
      document.head.appendChild(sc);
    }
  }
  window.__velovSeoHelper = { injectSeo: injectSeo };
})();

(function() {
  if (window.__velovTracker) return;
  function pushEvent(name, params) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, params || {}));
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch (e) {}
  }
  function bind(host, lang) {
    if (!host || host.__velovBound) return;
    host.__velovBound = true;
    host.addEventListener('click', function(e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      var ctx = { page_component: host.tagName.toLowerCase(), page_path: location.pathname, language: lang };
      if (/whatsapp/i.test(href)) pushEvent('whatsapp_click', Object.assign({ link_url: href, link_text: label }, ctx));
      else if (/^tel:/i.test(href)) pushEvent('phone_click', Object.assign({ link_url: href, link_text: label }, ctx));
      else if (/^mailto:/i.test(href)) pushEvent('email_click', Object.assign({ link_url: href, link_text: label }, ctx));
    }, { passive: true, capture: true });
  }
  window.__velovTracker = { bind: bind };
})();

const VELOV_DATA = {
  de: {
    seo: { id: "ebike", h1: "E-Bike Service Zürich", intro: "Mobiler E-Bike Service in Zürich für alle Marken.", sections: [{h2: "Mobil bei dir", body: "Wir kommen zu dir vor Ort."}], schema: [{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "VELOV Zürich" }] },
    ui: { heroTitle: "E-Bike Service Zürich — mobil zu dir", heroSub: "Wir warten dein E-Bike mechanisch direkt bei dir vor der Tür. Alle Marken. Anfahrt Zürich Stadt CHF 49.", ctaPhone: "📞 Termin buchen", ctaWa: "💬 WhatsApp", heroNote: "Mechanische Reparatur · Kein Akku- oder Motor-Service", pkgLabel: "Service-Pakete", pkgTitle: "Festpreise wie beim normalen Velo", pkgSub: "Drei klare Pakete für alle E-Bikes.", pkgBook: "buchen →", extraTitle: "Zusatzleistungen", extraSub: "Frei kombinierbar.", notTitle: "Was wir NICHT machen", notSub: "Keine Elektronik-Reparaturen.", faqTitle: "Häufige Fragen", footerTitle: "Bereit für deinen Service?", footerSub: "Wir kommen mit Velo & Cargo-Bike zu dir.", footerContact: "Mobiler E-Bike-Service Zürich" }
  },
  en: {
    seo: { id: "ebike-en", h1: "E-Bike Service Zurich", intro: "Mobile e-bike service in Zurich for all brands.", sections: [{h2: "Mobile to you", body: "We come to your location."}], schema: [{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "VELOV Zurich" }] },
    ui: { heroTitle: "E-Bike Service Zurich — mobile to you", heroSub: "Mechanical e-bike maintenance at your door. All brands. Zurich city travel CHF 49.", ctaPhone: "📞 Book now", ctaWa: "💬 WhatsApp", heroNote: "Mechanical repair · No battery or motor service", pkgLabel: "Service Packages", pkgTitle: "Fixed prices like normal bikes", pkgSub: "Three clear packages for all e-bikes.", pkgBook: "book now →", extraTitle: "Extra Services", extraSub: "Can be combined.", notTitle: "What we DON'T do", notSub: "No electronics repairs.", faqTitle: "FAQ", footerTitle: "Ready for your service?", footerSub: "We come to you by bike or cargo bike.", footerContact: "Mobile E-Bike Service Zurich" }
  },
  es: {
    seo: { id: "ebike-es", h1: "Servicio E-Bike Zúrich", intro: "Servicio e-bike móvil en Zúrich.", sections: [{h2: "Móvil hasta ti", body: "Vamos a tu domicilio."}], schema: [{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "VELOV Zúrich" }] },
    ui: { heroTitle: "Servicio E-Bike Zúrich — móvil hasta ti", heroSub: "Mantenimiento mecánico en tu puerta. Todas las marcas. Traslado Zúrich CHF 49.", ctaPhone: "📞 Reservar", ctaWa: "💬 WhatsApp", heroNote: "Reparación mecánica · Sin servicio de batería", pkgLabel: "Paquetes", pkgTitle: "Precios fijos", pkgSub: "Tres paquetes claros.", pkgBook: "reservar →", extraTitle: "Extras", extraSub: "Combinables.", notTitle: "Lo que NO hacemos", notSub: "Sin reparaciones electrónicas.", faqTitle: "Preguntas", footerTitle: "¿Listo para tu servicio?", footerSub: "Vamos a ti en bicicleta.", footerContact: "Servicio E-Bike Móvil Zúrich" }
  },
  fr: {
    seo: { id: "ebike-fr", h1: "Service E-Bike Zurich", intro: "Service e-bike mobile à Zurich.", sections: [{h2: "Mobile chez vous", body: "Nous venons chez vous."}], schema: [{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "VELOV Zurich" }] },
    ui: { heroTitle: "Service E-Bike Zurich — mobile chez vous", heroSub: "Entretien mécanique devant votre porte. Toutes marques. Trajet Zurich CHF 49.", ctaPhone: "📞 Prendre RDV", ctaWa: "💬 WhatsApp", heroNote: "Réparation mécanique · Pas de batterie", pkgLabel: "Forfaits", pkgTitle: "Prix fixes", pkgSub: "Trois forfaits clairs.", pkgBook: "réserver →", extraTitle: "Suppléments", extraSub: "Combinables.", notTitle: "Ce que nous NE faisons PAS", notSub: "Pas d'électronique.", faqTitle: "Questions", footerTitle: "Prêt pour votre service ?", footerSub: "Nous venons chez vous.", footerContact: "Service E-Bike Mobile Zurich" }
  },
  it: {
    seo: { id: "ebike-it", h1: "Servizio E-Bike Zurigo", intro: "Servizio e-bike mobile a Zurigo.", sections: [{h2: "Mobile da te", body: "Veniamo da te."}], schema: [{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": "VELOV Zurigo" }] },
    ui: { heroTitle: "Servizio E-Bike Zurigo — mobile da te", heroSub: "Manutenzione meccanica alla tua porta. Tutte le marche. Trasporto Zurigo CHF 49.", ctaPhone: "📞 Prenota", ctaWa: "💬 WhatsApp", heroNote: "Riparazione meccanica · No batterie", pkgLabel: "Pacchetti", pkgTitle: "Prezzi fissi", pkgSub: "Tre pacchetti chiari.", pkgBook: "prenota →", extraTitle: "Extra", extraSub: "Combinabili.", notTitle: "Cosa NON facciamo", notSub: "No elettronica.", faqTitle: "Domande", footerTitle: "Pronto per il servizio ?", footerSub: "Veniamo da te in bici.", footerContact: "Servizio E-Bike Mobile Zurigo" }
  }
};

class VelovEbike extends HTMLElement {
  static CONFIG = {
    phone: '+41762352126', waNumber: '41762352126', email: 'info@velov.ch',
    brands: ['Bosch', 'Shimano Steps', 'Yamaha', 'FAZUA', 'Brose', 'Bafang', 'TQ', 'Specialized', 'Giant', 'Trek', 'Cube'],
    packages: {
      basic: { name: 'Basic Check', price: 79, desc: 'Sicherheitscheck', features: ['Sicherheitscheck', 'Schrauben nachziehen', 'Reifendruck', 'Bremsen Check', 'Kabelkontrolle'] },
      standard: { name: 'Standard Service', price: 179, featured: true, desc: 'Jahresservice', features: ['Sicherheitscheck', 'Bremsen justieren', 'Schaltung einstellen', 'Kette reinigen', 'Alle Schrauben', 'Lager prüfen', 'Züge prüfen', 'Kabelkontrolle'] },
      premium: { name: 'Premium Service', price: 229, desc: 'Vollservice', features: ['Alles aus Standard', 'Laufräder zentrieren', 'Speichenspannung', 'Deep Clean Kette', 'Komplettreinigung', 'Alle Lager', 'Bremsflächen reinigen', 'Abschlussbericht'] }
    },
    extras: [
      { label: 'Reifenwechsel', price: 'CHF 39 + Teile' }, { label: 'Kettenwechsel', price: 'CHF 35 + Teile' },
      { label: 'Bremsbeläge vorne', price: 'CHF 35 + Teile' }, { label: 'Bremsbeläge hinten', price: 'CHF 55 + Teile' },
      { label: 'Bremse entlüften v.', price: 'CHF 49' }, { label: 'Bremse entlüften h.', price: 'CHF 65' },
      { label: 'Laufrad zentrieren', price: 'CHF 29' }, { label: 'Anfahrt Zürich Stadt', price: 'CHF 49' }
    ],
    notIncluded: ['Akku-Tests', 'Motor-Diagnose', 'Software-Updates', 'Display-Reparatur', 'Garantie-Arbeiten'],
    faqs: [
      { q: 'Welche E-Bike-Marken?', a: 'Alle gängigen Marken: Bosch, Shimano, Yamaha, FAZUA, Brose, Bafang, TQ.' },
      { q: 'Repariert ihr Akku?', a: 'Nein. Nur mechanische Wartung.' },
      { q: 'Kosten?', a: 'Basic CHF 79 · Standard CHF 179 · Premium CHF 229 + Anfahrt CHF 49.' }
    ]
  };

  constructor() { super(); this.state = { openFaq: null }; }

  connectedCallback() {
    const lang = this.getAttribute('lang') || 'de'; 
    const data = VELOV_DATA[lang] || VELOV_DATA.de;
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, data.seo, lang); } catch (e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this, lang); } catch (e) {}
    this.injectStyles();
    this.render(data);
  }

  injectStyles() {
    if (document.getElementById('velov-ebike-styles')) return;
    const s = document.createElement('style');
    s.id = 'velov-ebike-styles';
    s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
    velov-ebike { --purple:#7B68EE; --purple-dark:#6354d4; --orange:#E8573A; --dark:#2D2B3D; --warm-bg:#F5F0EB; --white:#fff; --text:#2D2B3D; --muted:#6B6880; --border:#E8E4DF; --green:#4CAF50; --red:#E8573A;
      display:block; font-family:'DM Sans',system-ui,sans-serif; color:var(--text); line-height:1.6; }
    velov-ebike *{margin:0;padding:0;box-sizing:border-box}
    velov-ebike .veb-container{max-width:1100px;margin:0 auto;padding:0 24px}
    velov-ebike section{padding:112px
