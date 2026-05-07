/* ===================================================================
   VELOV — UNIFIED Multilingual E-Bike Service Element
   Version: 2.3 (Synced with velov-home-UNIFIED architecture)
   =================================================================== */

/* ===== VELOV Shared SEO Helper ===== */
(function(){
  if (window.__velovSeoHelper) return;
  function safe(s){return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' ');}
  function buildMirror(s, faqLabel, contactLabel){
    var h='<article itemscope itemtype="https://schema.org/Article">';
    h+='<header><h1>'+safe(s.h1)+'</h1>';
    if(s.intro) h+='<p>'+safe(s.intro)+'</p>';
    h+='</header>';
    (s.sections||[]).forEach(function(sec){
      h+='<section>';
      if(sec.h2) h+='<h2>'+safe(sec.h2)+'</h2>';
      if(sec.body) h+='<p>'+safe(sec.body)+'</p>';
      if(Array.isArray(sec.h3items)) sec.h3items.forEach(function(it){
        h+='<h3>'+safe(it.h3)+'</h3>';
        if(it.body) h+='<p>'+safe(it.body)+'</p>';
      });
      h+='</section>';
    });
    if(Array.isArray(s.faqs)&&s.faqs.length){
      h+='<section><h2>'+(faqLabel||'FAQ')+'</h2>';
      s.faqs.forEach(function(f){h+='<h3>'+safe(f.q)+'</h3><p>'+safe(f.a)+'</p>';});
      h+='</section>';
    }
    if(s.contact) h+='<section><h2>'+(contactLabel||'Contact')+'</h2><p>'+safe(s.contact)+'</p></section>';
    h+='</article>';
    return h;
  }
  function injectSeo(host,cfg,faqLabel,contactLabel){
    if(!host||!cfg) return;
    function appendMirror(){
      if(host.querySelector('[data-velov-seo]')) return;
      var m=document.createElement('div');
      m.setAttribute('data-velov-seo','');
      m.setAttribute('aria-hidden','true');
      m.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';
      m.innerHTML=buildMirror(cfg,faqLabel,contactLabel);
      host.appendChild(m);
    }
    setTimeout(appendMirror, 0);
    setTimeout(appendMirror, 100);
    if(typeof requestAnimationFrame==='function') requestAnimationFrame(function(){requestAnimationFrame(appendMirror);});
    if(Array.isArray(cfg.schema)&&cfg.schema.length){
      var id='velov-schema-ebike-unified';
      var ex=document.getElementById(id); if(ex) ex.remove();
      var sc=document.createElement('script');
      sc.id=id; sc.type='application/ld+json';
      try{sc.textContent=JSON.stringify(cfg.schema);}catch(e){return;}
      document.head.appendChild(sc);
    }
  }
  window.__velovSeoHelper={injectSeo:injectSeo,buildMirror:buildMirror};
})();

/* ===== VELOV Tracker — GA4 events ===== */
(function(){
  if (window.__velovTracker) return;
  function pushEvent(name, params){
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({event: name}, params || {}));
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch(e) {}
  }
  function pageContext(host, lang){
    return {
      page_component: (host && host.tagName) ? host.tagName.toLowerCase() : 'unknown',
      page_path: (typeof location !== 'undefined') ? location.pathname : '',
      language: lang || 'de'
    };
  }
  function bind(host, lang){
    if (!host || host.__velovBound) return;
    host.__velovBound = true;
    host.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var ctx = pageContext(host, lang);
      var label = (a.textContent || '').replace(/\s+/g,' ').trim().slice(0,60);
      if (/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href) || /whatsapp/i.test(href)) {
        pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label}, ctx));
      } else if (/^tel:/i.test(href)) {
        pushEvent('phone_click', Object.assign({link_url: href, link_text: label}, ctx));
      } else if (/^mailto:/i.test(href)) {
        pushEvent('email_click', Object.assign({link_url: href, link_text: label}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* ===================================================================
   MULTILINGUAL CONTENT
   =================================================================== */
const VELOV_LANG = {
  de: {
    seo: {
      id: 'ebike-de',
      h1: 'E-Bike Service Zürich – mobile Wartung für alle Marken',
      intro: 'Mobiler E-Bike Service in Zürich für alle Marken: Bosch, Shimano, Yamaha. Mechanische Wartung vor Ort.',
      sections: [{ h2: 'E-Bike Service in Zürich', body: 'Wir warten alle Marken mechanisch direkt bei dir.' }],
      faqs: [{ q: 'Welche Marken?', a: 'Alle mechanisch: Bosch, Shimano, etc.' }],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV — Mobile E-Bike Service Zürich","url":"https://www.velov.ch/ebike","telephone":"+41762352126" }]
    },
    ui: {
      faqLabel: 'Häufige Fragen',
      contactLabel: 'Kontakt',
      heroH1: 'E-Bike Service Zürich — mobil zu dir',
      heroSub: 'Wir warten dein E-Bike mechanisch direkt bei dir vor der Tür. Alle Marken — gleicher Preis wie beim normalen Velo. Anfahrt Zürich Stadt CHF 49.',
      ctaPhone: '📞 Termin buchen',
      ctaWa: '💬 WhatsApp',
      heroNote: 'Mechanische Reparatur · Kein Akku- oder Motor-Service · Kein Firmware-Update',
      pkgLabel: 'Service-Pakete',
      pkgTitle: 'Festpreise wie beim normalen Velo',
      pkgSub: 'Drei klare Pakete für alle E-Bikes. Anfahrt Stadt Zürich CHF 49 separat.',
      pkgBook: 'buchen →',
      extraTitle: 'Häufige Zusatzleistungen',
      extraSub: 'Frei kombinierbar mit jedem Paket.',
      notTitle: 'Was wir bewusst nicht machen',
      notSub: 'Für E-Bike-Elektronik sind wir nicht die richtigen.',
      faqTitle: 'Häufige Fragen zum E-Bike-Service in Zürich',
      footerTitle: 'Bereit für deinen E-Bike-Service in Zürich?',
      footerSub: 'Mobile Velo-Werkstatt für E-Bikes aller Marken. Ruf an oder schreib per WhatsApp.',
      footerContact: 'Mobiler E-Bike-Service Zürich · Mechanisch, transparent, schnell',
      waMsg: 'Hallo VELOV, ich brauche einen E-Bike Service in Zürich.'
    }
  },
  en: {
    seo: {
      id: 'ebike-en',
      h1: 'E-Bike Service Zurich – Mobile Maintenance',
      intro: 'Mobile e-bike service in Zurich for all brands: Bosch, Shimano, Yamaha.',
      sections: [{ h2: 'E-Bike Service in Zurich', body: 'Mechanical maintenance for all brands at your location.' }],
      faqs: [{ q: 'Which brands?', a: 'All mechanical: Bosch, Shimano, etc.' }],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV — Mobile E-Bike Service Zurich","url":"https://www.velov.ch/en/ebike","telephone":"+41762352126" }]
    },
    ui: {
      faqLabel: 'FAQ',
      contactLabel: 'Contact',
      heroH1: 'E-Bike Service Zurich — mobile to you',
      heroSub: 'Mechanical e-bike maintenance right at your door. All brands — same price as normal bikes. Zurich city travel CHF 49.',
      ctaPhone: '📞 Book appointment',
      ctaWa: '💬 WhatsApp',
      heroNote: 'Mechanical repair · No battery or motor service · No firmware updates',
      pkgLabel: 'Service Packages',
      pkgTitle: 'Fixed prices like normal bikes',
      pkgSub: 'Three clear packages for all e-bikes. Zurich city travel CHF 49 separate.',
      pkgBook: 'book now →',
      extraTitle: 'Common Extra Services',
      extraSub: 'Can be combined with any package.',
      notTitle: 'What we intentionally don\'t do',
      notSub: 'We are not the right choice for e-bike electronics.',
      faqTitle: 'FAQ about E-Bike Service in Zurich',
      footerTitle: 'Ready for your E-Bike Service in Zurich?',
      footerSub: 'Mobile bike workshop for e-bikes of all brands. Call or WhatsApp us.',
      footerContact: 'Mobile E-Bike Service Zurich · Mechanical, transparent, fast',
      waMsg: 'Hello VELOV, I need an e-bike service in Zurich.'
    }
  },
  es: {
    seo: {
      id: 'ebike-es',
      h1: 'Servicio E-Bike Zúrich – Mantenimiento Móvil',
      intro: 'Servicio e-bike móvil en Zúrich para todas las marcas.',
      sections: [{ h2: 'Servicio E-Bike en Zúrich', body: 'Mantenimiento mecánico para todas las marcas.' }],
      faqs: [{ q: '¿Qué marcas?', a: 'Todas mecánicamente: Bosch, Shimano, etc.' }],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV — Servicio E-Bike Móvil Zúrich","url":"https://www.velov.ch/es/ebike","telephone":"+41762352126" }]
    },
    ui: {
      faqLabel: 'Preguntas frecuentes',
      contactLabel: 'Contacto',
      heroH1: 'Servicio E-Bike Zúrich — móvil hasta ti',
      heroSub: 'Mantenimiento mecánico de tu e-bike en tu puerta. Todas las marcas — mismo precio que una bici normal. Traslado Zúrich CHF 49.',
      ctaPhone: '📞 Reservar cita',
      ctaWa: '💬 WhatsApp',
      heroNote: 'Reparación mecánica · Sin servicio de batería',
      pkgLabel: 'Paquetes de Servicio',
      pkgTitle: 'Precios fijos como en bicis normales',
      pkgSub: 'Tres paquetes claros para todas las e-bikes. Traslado Zúrich CHF 49 aparte.',
      pkgBook: 'reservar →',
      extraTitle: 'Servicios Adicionales',
      extraSub: 'Combinable con cualquier paquete.',
      notTitle: 'Lo que NO hacemos',
      notSub: 'Para la electrónica de e-bikes, contacta al fabricante.',
      faqTitle: 'Preguntas frecuentes sobre el servicio en Zúrich',
      footerTitle: '¿Listo para tu servicio de E-Bike en Zúrich?',
      footerSub: 'Taller móvil para e-bikes de todas las marcas. Llama o escribe por WhatsApp.',
      footerContact: 'Servicio E-Bike Móvil Zúrich · Mecánico, transparente, rápido',
      waMsg: 'Hola VELOV, necesito un servicio de e-bike en Zúrich.'
    }
  },
  fr: {
    seo: {
      id: 'ebike-fr',
      h1: 'Service E-Bike Zurich – Entretien Mobile',
      intro: 'Service e-bike mobile à Zurich pour toutes les marques.',
      sections: [{ h2: 'Service E-Bike à Zurich', body: 'Entretien mécanique pour toutes les marques.' }],
      faqs: [{ q: 'Quelles marques ?', a: 'Toutes mécaniquement: Bosch, Shimano, etc.' }],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV — Service E-Bike Mobile Zurich","url":"https://www.velov.ch/fr/ebike","telephone":"+41762352126" }]
    },
    ui: {
      faqLabel: 'Questions fréquentes',
      contactLabel: 'Contact',
      heroH1: 'Service E-Bike Zurich — mobile chez vous',
      heroSub: 'Entretien mécanique de votre e-bike devant votre porte. Toutes marques — même prix qu\'un vélo normal. Trajet Zurich CHF 49.',
      ctaPhone: '📞 Prendre RDV',
      ctaWa: '💬 WhatsApp',
      heroNote: 'Réparation mécanique · Pas de batterie',
      pkgLabel: 'Forfaits Service',
      pkgTitle: 'Prix fixes comme pour les vélos classiques',
      pkgSub: 'Trois forfaits clairs pour tous les e-bikes. Trajet Zurich CHF 49 séparément.',
      pkgBook: 'réserver →',
      extraTitle: 'Services Supplémentaires',
      extraSub: 'Combinable avec n\'importe quel forfait.',
      notTitle: 'Ce que nous ne faisons pas',
      notSub: 'Pour l\'électronique, veuillez contacter le fabricant.',
      faqTitle: 'FAQ sur le service E-Bike à Zurich',
      footerTitle: 'Prêt pour votre service E-Bike à Zurich ?',
      footerSub: 'Atelier mobile pour e-bikes de toutes marques. Appelez ou WhatsApp.',
      footerContact: 'Service E-Bike Mobile Zurich · Mécanique, transparent, rapide',
      waMsg: 'Bonjour VELOV, j\'ai besoin d\'un service e-bike à Zurich.'
    }
  },
  it: {
    seo: {
      id: 'ebike-it',
      h1: 'Servizio E-Bike Zurigo – Manutenzione Mobile',
      intro: 'Servizio e-bike mobile a Zurigo per tutte le marche.',
      sections: [{ h2: 'Servizio E-Bike a Zurigo', body: 'Manutenzione meccanica per tutte le marche.' }],
      faqs: [{ q: 'Quali marche ?', a: 'Tutte meccanicamente: Bosch, Shimano, etc.' }],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV — Servizio E-Bike Mobile Zurigo","url":"https://www.velov.ch/it/ebike","telephone":"+41762352126" }]
    },
    ui: {
      faqLabel: 'Domande frequenti',
      contactLabel: 'Contatto',
      heroH1: 'Servizio E-Bike Zurigo — mobile da te',
      heroSub: 'Manutenzione meccanica della tua e-bike alla tua porta. Tutte le marche — stesso prezzo di una bici normale. Trasporto Zurigo CHF 49.',
      ctaPhone: '📞 Prenota appuntamento',
      ctaWa: '💬 WhatsApp',
      heroNote: 'Riparazione meccanica · No batterie',
      pkgLabel: 'Pacchetti Servizio',
      pkgTitle: 'Prezzi fissi come per le bici normali',
      pkgSub: 'Tre pacchetti chiari per tutte le e-bike. Trasporto Zurigo CHF 49 separato.',
      pkgBook: 'prenota →',
      extraTitle: 'Servizi Aggiuntivi',
      extraSub: 'Combinabile con qualsiasi pacchetto.',
      notTitle: 'Cosa NON facciamo',
      notSub: 'Per l\'elettronica delle e-bike, contatta il produttore.',
      faqTitle: 'Domande frequenti sul servizio E-Bike a Zurigo',
      footerTitle: 'Pronto per il tuo servizio E-Bike a Zurigo ?',
      footerSub: 'Officina mobile per e-bike di tutte le marche. Chiama o WhatsApp.',
      footerContact: 'Servizio E-Bike Mobile Zurigo · Meccanico, trasparente, veloce',
      waMsg: 'Ciao VELOV, ho bisogno di un servizio e-bike a Zurigo.'
    }
  }
};

/* ===================================================================
   LANGUAGE DETECTION (Exactly like velov-home-UNIFIED.js)
   =================================================================== */
function detectVelovLang() {
  try {
    if (window.wixDevelopersAnalytics && window.wixDevelopersAnalytics.currentLanguage) {
      return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2);
    }
  } catch(e) {}
  try {
    const docLang = document.documentElement.lang || document.documentElement.getAttribute('xml:lang') || '';
    if (docLang) return docLang.toLowerCase().substring(0,2);
  } catch(e) {}
  try {
    const path = window.location.pathname;
    const match = path.match(/^\/(en|fr|it|es)(\/|$)/i);
    if (match) return match[1].toLowerCase();
  } catch(e) {}
  try {
    const nav = (navigator.language || navigator.userLanguage || 'de').toLowerCase().substring(0,2);
    if (['en','fr','it','es'].includes(nav)) return nav;
  } catch(e) {}
  return 'de';
}

/* ===================================================================
   CUSTOM ELEMENT
   =================================================================== */
class VelovEbike extends HTMLElement {
  static CONFIG = {
    phone: '+41762352126', waNumber: '41762352126', email: 'info@velov.ch',
    brands: ['Bosch', 'Shimano Steps', 'Yamaha', 'FAZUA', 'Brose', 'Bafang', 'TQ', 'Specialized', 'Giant', 'Trek', 'Cube'],
    packages: {
      basic: { name: 'Basic Check', price: 79, desc: 'Sicherheitscheck + Schrauben', features: ['Sicherheitscheck', 'Schrauben nachziehen', 'Reifendruck', 'Bremsen/Licht Check', 'Kabelkontrolle'] },
      standard: { name: 'Standard Service', price: 179, featured: true, desc: 'Gründlicher Jahresservice', features: ['Sicherheitscheck', 'Bremsen justieren', 'Schaltung einstellen', 'Kette reinigen', 'Alle Schrauben', 'Lager prüfen', 'Züge prüfen', 'Kabelkontrolle'] },
      premium: { name: 'Premium Service', price: 229, desc: 'Vollservice + Detailreinigung', features: ['Alles aus Standard', 'Laufräder zentrieren', 'Speichenspannung', 'Deep Clean Kette', 'Komplettreinigung', 'Alle Lager', 'Bremsflächen reinigen', 'Abschlussbericht'] }
    },
    extras: [
      { label: 'Reifenwechsel (inkl. Schlauch)', price: 'CHF 39 + Teile' },
      { label: 'Kettenwechsel', price: 'CHF 35 + Teile' },
      { label: 'Bremsbeläge vorne', price: 'CHF 35 + Teile' },
      { label: 'Bremsbeläge hinten', price: 'CHF 55 + Teile' },
      { label: 'Bremse entlüften vorne', price: 'CHF 49' },
      { label: 'Bremse entlüften hinten', price: 'CHF 65' },
      { label: 'Laufrad zentrieren', price: 'CHF 29' },
      { label: 'Anfahrt Zürich Stadt', price: 'CHF 49' }
    ],
    notIncluded: ['Akku-Tests oder Regenerierung', 'Motor-Diagnose oder Reparatur', 'Software/Firmware-Updates', 'Display-Reparatur', 'Garantie-Arbeiten'],
    faqs: [
      { q: 'Welche E-Bike-Marken repariert ihr?', a: 'Alle mechanisch: Bosch, Shimano, Yamaha, FAZUA, Brose, Bafang, TQ, Specialized, Giant, Trek, Cube.' },
      { q: 'Repariert ihr auch Akku oder Motor?', a: 'Nein. Wir machen nur die mechanische Wartung. Für Elektronik empfehlen wir den Hersteller.' },
      { q: 'Was kostet der E-Bike-Service?', a: 'Basic CHF 79 · Standard CHF 179 · Premium CHF 229 + Anfahrt Stadt Zürich CHF 49.' },
      { q: 'Unterschied Standard vs Premium?', a: 'Premium inkl. Laufräder zentrieren und kompletter Reinigung.' },
      { q: 'Kommt ihr wirklich zu mir?', a: 'Ja. Wir kommen mit Velo/Cargo-Bike zu dir nach Hause oder ins Büro in Zürich.' },
      { q: 'Wie schnell bekommt man einen Termin?', a: 'In der Regel innerhalb von 24 Stunden.' }
    ]
  };

  constructor() {
    super();
    this.state = { openFaq: null };
    this._lang = detectVelovLang();
    if (!VELOV_LANG[this._lang]) this._lang = 'de';
  }

  get L() { return VELOV_LANG[this._lang]; }
  get UI() { return this.L.ui; }

  connectedCallback() {
    try {
      window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(
        this, this.L.seo, this.UI.faqLabel, this.UI.contactLabel
      );
    } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this, this._lang); } catch(e) {}
    this.injectStyles();
    this.render();
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
    velov-ebike section{padding:112px 0}
    velov-ebike .veb-label{font-size:12px;font-weight:700;color:var(--purple);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px}
    velov-ebike .veb-title{font-size:clamp(24px,3vw,36px);font-weight:800;color:var(--dark);margin-bottom:16px;line-height:1.2}
    velov-ebike .veb-sub{font-size:16px;color:var(--muted);max-width:640px;line-height:1.65}
    velov-ebike .veb-hero{background:linear-gradient(135deg,#1a1833,var(--dark));color:white;padding:112px 0 120px;text-align:center;position:relative;overflow:hidden}
    velov-ebike .veb-hero::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(123,104,238,.3),transparent 70%);border-radius:50%}
    velov-ebike .veb-hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--white);clip-path:ellipse(55% 100% at 50% 100%)}
    velov-ebike .veb-hero-inner{position:relative;z-index:1}
    velov-ebike .veb-hero h1{font-size:clamp(32px,5vw,52px);font-weight:800;line-height:1.1;margin-bottom:18px;color:var(--purple)}
    velov-ebike .veb-hero p{font-size:18px;opacity:.9;max-width:660px;margin:0 auto 30px}
    velov-ebike .veb-hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
    velov-ebike .veb-cta-orange{display:inline-block;background:var(--orange);color:white;text-decoration:none;font-size:17px;font-weight:700;padding:16px 40px;border-radius:50px;transition:all .2s;border:none;cursor:pointer}
    velov-ebike .veb-cta-wa{display:inline-block;background:#25D366;color:white;text-decoration:none;font-size:17px;font-weight:700;padding:16px 40px;border-radius:50px;transition:all .2s}
    velov-ebike .veb-hero-note{font-size:13px;opacity:.75;margin-top:14px}
    velov-ebike .veb-brands{display:flex;justify-content:center;gap:10px;margin-top:42px;flex-wrap:wrap;font-size:13px;opacity:.85}
    velov-ebike .veb-brands span{padding:8px 16px;border:1px solid rgba(255,255,255,.22);border-radius:50px;background:rgba(255,255,255,.04)}
    velov-ebike .veb-pkg-section{background:var(--white)}
    velov-ebike .veb-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:52px}
    velov-ebike .veb-pkg{background:var(--warm-bg);border-radius:20px;padding:38px 28px;border:2px solid transparent;transition:all .25s;position:relative}
    velov-ebike .veb-pkg:hover{border-color:var(--purple);transform:translateY(-4px);box-shadow:0 12px 32px rgba(123,104,238,.1)}
    velov-ebike .veb-pkg.best{border-color:var(--purple);background:var(--white);box-shadow:0 16px 40px rgba(123,104,238,.14)}
    velov-ebike .veb-pkg.best::before{content:'⭐ BELIEBT';position:absolute;top:-13px;left:28px;background:var(--orange);color:white;font-size:11px;font-weight:800;padding:5px 14px;border-radius:12px}
    velov-ebike .veb-pkg-name{font-size:13px;font-weight:700;color:var(--purple);text-transform:uppercase;margin-bottom:8px}
    velov-ebike .veb-pkg h3{font-size:22px;font-weight:800;margin-bottom:6px;color:var(--dark)}
    velov-ebike .veb-pkg-desc{font-size:14px;color:var(--muted);margin-bottom:18px;min-height:40px}
    velov-ebike .veb-pkg-price{padding:16px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:20px}
    velov-ebike .veb-pkg-price strong{font-size:36px;color:var(--purple);font-weight:800}
    velov-ebike .veb-pkg ul{list-style:none}
    velov-ebike .veb-pkg li{font-size:14px;padding:7px 0 7px 26px;position:relative}
    velov-ebike .veb-pkg li::before{content:'✓';position:absolute;left:0;color:var(--green);font-weight:800}
    velov-ebike .veb-pkg-cta{display:block;text-align:center;margin-top:26px;background:var(--purple);color:white;text-decoration:none;font-weight:700;padding:13px;border-radius:50px}
    velov-ebike .veb-twoCol{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:48px;align-items:start}
    velov-ebike .veb-card{background:var(--white);border-radius:20px;padding:36px;border:1px solid var(--border)}
    velov-ebike .veb-card h3{font-size:18px;font-weight:800;margin-bottom:6px;color:var(--dark)}
    velov-ebike .veb-card .veb-card-sub{font-size:14px;color:var(--muted);margin-bottom:20px}
    velov-ebike .veb-extras{display:grid;gap:10px}
    velov-ebike .veb-ext{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:var(--warm-bg);border-radius:10px}
    velov-ebike .veb-ext span{font-size:14px;font-weight:500}
    velov-ebike .veb-ext strong{font-size:14px;color:var(--purple);font-weight:700}
    velov-ebike .veb-not{display:grid;gap:10px}
    velov-ebike .veb-not div{display:flex;align-items:flex-start;gap:10px;padding:14px 18px;background:#fff5f0;border-radius:10px;font-size:14px}
    velov-ebike .veb-not div::before{content:'✗';color:var(--red);font-weight:800}
    velov-ebike .veb-faq{max-width:760px;margin:48px auto 0}
    velov-ebike .veb-faq-item{border-bottom:1px solid var(--border);padding:20px 0}
    velov-ebike .veb-faq-q{font-weight:700;cursor:pointer;font-size:16px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;width:100%;text-align:left;font-family:inherit;padding:0}
    velov-ebike .veb-faq-q::after{content:'+';font-size:20px;color:var(--purple)}
    velov-ebike .veb-faq-item.open .veb-faq-q::after{content:'−'}
    velov-ebike .veb-faq-a{font-size:14.5px;color:var(--muted);padding-top:14px;display:none}
    velov-ebike .veb-faq-item.open .veb-faq-a{display:block}
    velov-ebike .veb-cta-section{background:var(--purple);color:white;text-align:center;padding:112px 0}
    velov-ebike .veb-cta-section h2{font-size:clamp(26px,3.5vw,40px);font-weight:800;margin-bottom:14px}
    velov-ebike .veb-cta-section p{font-size:17px;opacity:.95;margin:0 auto 30px;max-width:560px}
    velov-ebike .veb-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
    velov-ebike .veb-cta-section a{display:inline-block;padding:16px 36px;border-radius:50px;font-weight:700;text-decoration:none;transition:all .2s}
    velov-ebike .veb-cta-section a.dark{background:var(--dark);color:#fff}
    velov-ebike .veb-cta-section a.wa{background:#25D366;color:#fff}
    velov-ebike .veb-cta-contact{margin-top:28px;font-size:14px;opacity:.85}
    velov-ebike .veb-cta-contact a{color:#fff;text-decoration:underline}
    @media(max-width:880px){
      velov-ebike section{padding:64px 0}
      velov-ebike .veb-hero{padding:64px 0 90px}
      velov-ebike .veb-pkg-grid{grid-template-columns:1fr}
      velov-ebike .veb-twoCol{grid-template-columns:1fr;gap:20px}
    }`;
    document.head.appendChild(s);
  }

  render() {
    const L = this.L;
    const UI = this.UI;
    const C = VelovEbike.CONFIG;

    this.innerHTML = `
      <section class="veb-hero">
        <div class="veb-container veb-hero-inner">
          <h1>${UI.heroH1}</h1>
          <p>${UI.heroSub}</p>
          <div class="veb-hero-ctas">
            <a href="tel:${C.phone}" class="veb-cta-orange">${UI.ctaPhone}</a>
            <a href="https://wa.me/${C.waNumber}?text=${encodeURIComponent(UI.waMsg)}" class="veb-cta-wa" target="_blank" rel="noopener">${UI.ctaWa}</a>
          </div>
          <div class="veb-hero-note">${UI.heroNote}</div>
          <div class="veb-brands">${C.brands.map(b => `<span>${b}</span>`).join('')}</div>
        </div>
      </section>

      <section class="veb-pkg-section">
        <div class="veb-container">
          <div style="text-align:center">
            <div class="veb-label">${UI.pkgLabel}</div>
            <h2 class="veb-title">${UI.pkgTitle}</h2>
            <p class="veb-sub" style="margin:0 auto">${UI.pkgSub}</p>
          </div>
          <div class="veb-pkg-grid">
            ${Object.entries(C.packages).map(([k, p]) => `
              <div class="veb-pkg ${p.featured ? 'best' : ''}">
                <div class="veb-pkg-name">${k.toUpperCase()}</div>
                <h3>${p.name}</h3>
                <div class="veb-pkg-desc">${p.desc}</div>
                <div class="veb-pkg-price"><strong>CHF ${p.price}</strong><small>fest</small></div>
                <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
                <a href="https://wa.me/${C.waNumber}" target="_blank" rel="noopener" class="veb-pkg-cta">${p.name} ${UI.pkgBook}</a>
              </div>`).join('')}
          </div>
          <div class="veb-twoCol">
            <div class="veb-card">
              <h3>${UI.extraTitle}</h3>
              <div class="veb-card-sub">${UI.extraSub}</div>
              <div class="veb-extras">${C.extras.map(e => `<div class="veb-ext"><span>${e.label}</span><strong>${e.price}</strong></div>`).join('')}</div>
            </div>
            <div class="veb-card">
              <h3>${UI.notTitle}</h3>
              <div class="veb-card-sub">${UI.notSub}</div>
              <div class="veb-not">${C.notIncluded.map(n => `<div>${n}</div>`).join('')}</div>
            </div>
          </div>
        </div>
      </section>

      <section style="background:var(--warm-bg)">
        <div class="veb-container">
          <div style="text-align:center">
            <div class="veb-label">FAQ</div>
            <h2 class="veb-title">${UI.faqTitle}</h2>
          </div>
          <div class="veb-faq">
            ${C.faqs.map((f, i) => `
              <div class="veb-faq-item" data-i="${i}">
                <button class="veb-faq-q" aria-expanded="false">${f.q}</button>
                <div class="veb-faq-a">${f.a}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <section class="veb-cta-section">
        <div class="veb-container">
          <h2>${UI.footerTitle}</h2>
          <p>${UI.footerSub}</p>
          <div class="veb-row">
            <a href="tel:${C.phone}" class="dark">📞 ${C.phone}</a>
            <a href="https://wa.me/${C.waNumber}" class="wa" target="_blank" rel="noopener">💬 WhatsApp</a>
          </div>
          <div class="veb-cta-contact">
            <a href="mailto:${C.email}">${C.email}</a> · ${UI.footerContact}
          </div>
        </div>
      </section>
    `;
    this.bindFaq();
  }

  bindFaq() {
    this.querySelectorAll('.veb-faq-item').forEach(item => {
      const btn = item.querySelector('.veb-faq-q');
      btn.addEventListener('click', () => {
        const i = +item.dataset.i;
        const open = this.state.openFaq === i;
        this.querySelectorAll('.veb-faq-item').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.veb-faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          this.state.openFaq = i;
        } else { this.state.openFaq = null; }
      });
    });
  }
}

if (!customElements.get('velov-ebike')) {
  customElements.define('velov-ebike', VelovEbike);
}
