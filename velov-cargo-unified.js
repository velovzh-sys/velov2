/* ===================================================================
   VELOV — UNIFIED Multilingual Cargo Bike Component
   Version: 3.2 (Ultra-Safe Edition)
   =================================================================== */

/* ===== 1. SHARED SEO HELPER ===== */
(function(){
  if (window.__velovSeoHelper) return;
  function safe(s){return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' ');}
  function buildMirror(s, lang){
    var h='<article itemscope itemtype="https://schema.org/Article" lang="'+lang+'">';
    h+='<header><h1>'+safe(s.h1)+'</h1>';
    if(s.intro) h+='<p>'+safe(s.intro)+'</p>';
    h+='</header>';
    (s.sections||[]).forEach(function(sec){
      h+='<section>';
      if(sec.h2) h+='<h2>'+safe(sec.h2)+'</h2>';
      if(sec.body) h+='<p>'+safe(sec.body)+'</p>';
      h+='</section>';
    });
    h+='</article>';
    return h;
  }
  function injectSeo(host,cfg,lang){
    if(!host||!cfg) return;
    function appendMirror(){
      if(host.querySelector('[data-velov-seo]')) return;
      var m=document.createElement('div');
      m.setAttribute('data-velov-seo','');
      m.setAttribute('aria-hidden','true');
      m.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';
      m.innerHTML=buildMirror(cfg, lang);
      host.appendChild(m);
    }
    setTimeout(appendMirror, 0);
    setTimeout(appendMirror, 200);
    if(Array.isArray(cfg.schema)&&cfg.schema.length){
      var id='velov-schema-cargo-'+lang;
      var ex=document.getElementById(id); if(ex) ex.remove();
      var sc=document.createElement('script');
      sc.id=id; sc.type='application/ld+json';
      try{sc.textContent=JSON.stringify(cfg.schema);}catch(e){return;}
      document.head.appendChild(sc);
    }
  }
  window.__velovSeoHelper={injectSeo:injectSeo};
})();

/* ===== 2. SHARED TRACKER ===== */
(function(){
  if (window.__velovTracker) return;
  function pushEvent(name, params){
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({event: name}, params || {}));
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch(e) {}
  }
  function bind(host, lang){
    if (!host || host.__velovBound) return;
    host.__velovBound = true;
    host.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var label = (a.textContent || '').replace(/\s+/g,' ').trim().slice(0,60);
      var ctx = { page_component: host.tagName.toLowerCase(), page_path: location.pathname, language: lang };
      if (/whatsapp/i.test(href)) pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label}, ctx));
      else if (/^tel:/i.test(href)) pushEvent('phone_click', Object.assign({link_url: href, link_text: label}, ctx));
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind};
})();

/* ===== 3. MULTILINGUAL DATA ===== */
const VELOV_LANG = {
  de: {
    seo: { id: 'cargo-de', h1: 'Cargo-Bike Service Zürich', intro: 'Mobiler Cargo-Bike Service für alle Marken.', sections: [{ h2: 'Service Zürich', body: 'Spezialisiert auf Lastenräder.' }], faqs: [{ q: 'Welche Marken?', a: 'Alle mechanisch.' }], schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zürich" }] },
    ui: {
      badge: 'Mobiler Cargo-Bike-Service · ganz Zürich',
      heroH1: 'Cargo Bike Reparatur <span class="v-grad">direkt bei dir</span> in Zürich',
      heroSub: 'Schluss mit 40-kg-Lastenrad-Schleppen. Wir kommen zu dir — alle Marken, transparente Festpreise.',
      ctaPhone: '📞 Jetzt Termin buchen', ctaCalc: 'Preis berechnen →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Mobile Werkstatt', '🚲 Alle Cargo-Marken', '💰 Anfahrt CHF 49'],
      whyLabel: 'Warum mobil', whyH2: 'Lastenrad-Service, der zu dir kommt', whySub: 'Cargo Bikes sind schwer. Wir kommen direkt zu dir.',
      info1T: 'Direkt bei dir', info1D: 'Kein Schleppen von 40kg+. Wir reparieren vor der Haustür.',
      info2T: 'Cargo-Spezialisten', info2D: 'Erfahrung mit 2-Rad, 3-Rad, Long-Tail und Front-Loader.',
      info3T: 'Alle Marken', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe.',
      calcLabel: 'Kosten-Rechner', calcH2: 'Was kostet dein Cargo-Service?', calcSub: 'Wähle Paket und Extras — Preis live.',
      step1: '1. Basispaket wählen', step2: '2. Extras hinzufügen',
      totalLbl: 'Dein Festpreis', totalFine: 'Anfahrt Zürich Stadt CHF 49 · Teile nach Aufwand',
      waBtn: 'WhatsApp Buchung',
      diagLabel: 'Interaktiv', diagH2: 'Klick auf dein Cargo Bike', diagSub: 'Tippe einen Punkt an.',
      diagHint: '👆 Tippe einen orangen Punkt an',
      sliderLabel: 'Lohnt sich das noch?', sliderH2: 'Ist dein Cargo Bike reparaturwürdig?', sliderSub: 'Schieb den Regler passend zum Zustand.',
      sliderL1: '🌟 Neuwertig', sliderL2: '🔧 Normal genutzt', sliderL3: '⚠️ Stark beansprucht',
      faqLabel: 'FAQ', faqH2: 'Häufige Fragen Cargo', faqSub: 'Alles, was du wissen musst.',
      finalH2: 'Cargo Bike Service in Zürich — ohne Stress',
      finalP: 'Wir kommen zu dir, reparieren mechanisch vor Ort. Anfahrt CHF 49.',
      finalBtn: 'Jetzt Cargo Service buchen',
      finalCont: 'WhatsApp · info@velov.ch · Mobile Cargo-Bike-Werkstatt Zürich',
      waMsg: 'Hi VELOV! Ich möchte meinen Cargo-Service buchen.'
    }
  },
  en: {
    seo: { id: 'cargo-en', h1: 'Cargo Bike Service Zurich', intro: 'Mobile cargo bike service for all brands.', sections: [{ h2: 'Service Zurich', body: 'Specialized in cargo bikes.' }], faqs: [{ q: 'Which brands?', a: 'All mechanical.' }], schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurich" }] },
    ui: {
      badge: 'Mobile Cargo Bike Service · all over Zurich',
      heroH1: 'Cargo Bike Repair <span class="v-grad">right at your door</span> in Zurich',
      heroSub: 'Stop dragging 40kg bikes. Our mobile workshop comes to you — all brands, fixed prices.',
      ctaPhone: '📞 Book appointment', ctaCalc: 'Calculate price →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Mobile Workshop', '🚲 All Cargo Brands', '💰 Travel CHF 49'],
      whyLabel: 'Why mobile', whyH2: 'Cargo service that comes to you', whySub: 'Cargo bikes are heavy. We bring all tools to you.',
      info1T: 'Right at your door', info1D: 'No dragging 40kg+. We repair at your location.',
      info2T: 'Cargo Specialists', info2D: 'Experts in 2-wheel, 3-wheel, Long-Tail and Front-Loaders.',
      info3T: 'All Brands', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe.',
      calcLabel: 'Cost Calculator', calcH2: 'How much is your Cargo service?', calcSub: 'Pick package and extras — price live.',
      step1: '1. Choose base package', step2: '2. Add extras',
      totalLbl: 'Your Fixed Price', totalFine: 'Zurich city travel CHF 49 · Parts based on use',
      waBtn: 'WhatsApp Booking',
      diagLabel: 'Interactive', diagH2: 'Click on your Cargo Bike', diagSub: 'Tap a point for details.',
      diagHint: '👆 Tap an orange dot',
      sliderLabel: 'Is it worth it?', sliderH2: 'Is your Cargo Bike worth repairing?', sliderSub: 'Slide to match the current condition.',
      sliderL1: '🌟 Like New', sliderL2: '🔧 Normal Use', sliderL3: '⚠️ Heavily Used',
      faqLabel: 'FAQ', faqH2: 'Cargo Service FAQ', faqSub: 'Everything you need to know.',
      finalH2: 'Cargo Bike Service in Zurich — stress-free',
      finalP: 'We come to you and repair on-site. Travel CHF 49.',
      finalBtn: 'Book Cargo Service now',
      finalCont: 'WhatsApp · info@velov.ch · Mobile Cargo Workshop Zurich',
      waMsg: 'Hi VELOV! I would like to book a Cargo Service.'
    }
  },
  es: {
    seo: { id: 'cargo-es', h1: 'Servicio Cargo Bike Zúrich', intro: 'Servicio cargo bike móvil para todas las marcas.', sections: [{ h2: 'Servicio Zúrich', body: 'Especialistas en cargo bikes.' }], faqs: [{ q: '¿Qué marcas?', a: 'Todas mecánicamente.' }], schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zúrich" }] },
    ui: {
      badge: 'Servicio Cargo Bike Móvil · todo Zúrich',
      heroH1: 'Reparación de Cargo Bike <span class="v-grad">directo a ti</span> en Zúrich',
      heroSub: 'Deja de arrastrar bicis de 40kg. Nuestro taller móvil va a tu casa — precios fijos.',
      ctaPhone: '📞 Reservar cita', ctaCalc: 'Calcular precio →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Taller Móvil', '🚲 Todas las marcas', '💰 Traslado CHF 49'],
      whyLabel: 'Por qué móvil', whyH2: 'Servicio de cargo que va a tu domicilio', whySub: 'Las cargo bikes son pesadas. Llevamos todo a tu ubicación.',
      info1T: 'Directo a ti', info1D: 'Sin cargar con 40kg+. Reparamos en tu puerta.',
      info2T: 'Especialistas Cargo', info2D: 'Expertos en 2 ruedas, 3 ruedas, Long-Tail y Front-Loaders.',
      info3T: 'Todas las marcas', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe.',
      calcLabel: 'Calculadora', calcH2: '¿Cuánto cuesta tu servicio?', calcSub: 'Elige paquete y extras — precio en vivo.',
      step1: '1. Elegir paquete base', step2: '2. Añadir extras',
      totalLbl: 'Tu Precio Fijo', totalFine: 'Traslado Zúrich ciudad CHF 49 · Piezas según uso',
      waBtn: 'Reserva WhatsApp',
      diagLabel: 'Interactivo', diagH2: 'Haz clic en tu Cargo Bike', diagSub: 'Toca un punto para detalles.',
      diagHint: '👆 Toca un punto naranja',
      sliderLabel: '¿Vale la pena?', sliderH2: '¿Vale la pena reparar tu Cargo Bike?', sliderSub: 'Desliza según el estado actual.',
      sliderL1: '🌟 Como nueva', sliderL2: '🔧 Uso normal', sliderL3: '⚠️ Muy desgastada',
      faqLabel: 'FAQ', faqH2: 'Preguntas frecuentes Cargo', faqSub: 'Todo lo que necesitas saber.',
      finalH2: 'Servicio Cargo Bike en Zúrich — sin estrés',
      finalP: 'Vamos a ti y reparamos en el sitio. Traslado CHF 49.',
      finalBtn: 'Reservar Servicio Cargo ahora',
      finalCont: 'WhatsApp · info@velov.ch · Taller Móvil Cargo Zúrich',
      waMsg: 'Hola VELOV! Quiero reservar un servicio de Cargo Bike.'
    }
  },
  fr: {
    seo: { id: 'cargo-fr', h1: 'Service Vélo Cargo Zurich', intro: 'Service vélo cargo mobile pour toutes les marques.', sections: [{ h2: 'Service Zurich', body: 'Spécialistes vélo cargo.' }], faqs: [{ q: 'Quelles marques ?', a: 'Toutes mécaniquement.' }], schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurich" }] },
    ui: {
      badge: 'Service Vélo Cargo Mobile · tout Zurich',
      heroH1: 'Réparation Vélo Cargo <span class="v-grad">chez vous</span> à Zurich',
      heroSub: 'Fini le transport de vélos de 40kg. Notre atelier mobile vient à vous — prix fixes.',
      ctaPhone: '📞 Prendre RDV', ctaCalc: 'Calculer le prix →',
      trust: ['⭐ 4.8 / 5 Avis Google', '🚐 Atelier Mobile', '🚲 Toutes marques Cargo', '💰 Trajet CHF 49'],
      whyLabel: 'Pourquoi mobile', whyH2: 'Le service cargo qui vient à vous', whySub: 'Les vélos cargo sont lourds. Nous apportons tout chez vous.',
      info1T: 'Directement chez vous', info1D: 'Pas de transport de 40kg+. On répare devant votre porte.',
      info2T: 'Spécialistes Cargo', info2D: 'Experts en 2 roues, 3 roues, Long-Tail et Front-Loaders.',
      info3T: 'Toutes les marques', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe.',
      calcLabel: 'Calculateur', calcH2: 'Quel est le prix de votre service ?', calcSub: 'Choisissez forfait et extras — prix en direct.',
      step1: '1. Choisir le forfait', step2: '2. Ajouter des extras',
      totalLbl: 'Votre Prix Fixe', totalFine: 'Trajet Zurich ville CHF 49 · Pièces selon usage',
      waBtn: 'Réserver WhatsApp',
      diagLabel: 'Interactif', diagH2: 'Cliquez sur votre Vélo Cargo', diagSub: 'Touche un point pour les détails.',
      diagHint: '👆 Touchez un point orange',
      sliderLabel: 'Est-ce rentable ?', sliderH2: 'Votre vélo cargo vaut-il la peine d\'être réparé ?', sliderSub: 'Glissez selon l\'état actuel.',
      sliderL1: '🌟 Comme neuf', sliderL2: '🔧 Usage normal', sliderL3: '⚠️ Très usé',
      faqLabel: 'FAQ', faqH2: 'FAQ Service Cargo', faqSub: 'Tout ce que vous devez savoir.',
      finalH2: 'Service Vélo Cargo à Zurich — sans stress',
      finalP: 'Nous venons chez vous et réparons sur place. Trajet CHF 49.',
      finalBtn: 'Réserver Service Cargo maintenant',
      finalCont: 'WhatsApp · info@velov.ch · Atelier Mobile Cargo Zurich',
      waMsg: 'Bonjour VELOV ! Je souhaite réserver un service vélo cargo.'
    }
  },
  it: {
    seo: { id: 'cargo-it', h1: 'Servizio Cargo Bike Zurigo', intro: 'Servizio cargo bike mobile per tutte le marche.', sections: [{ h2: 'Servizio Zurigo', body: 'Specialisti in cargo bike.' }], faqs: [{ q: 'Quali marche ?', a: 'Tutte meccanicamente.' }], schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurigo" }] },
    ui: {
      badge: 'Servizio Cargo Bike Mobile · tutta Zurigo',
      heroH1: 'Riparazione Cargo Bike <span class="v-grad">direttamente da te</span> a Zurigo',
      heroSub: 'Smetti di trascinare bici da 40kg. La nostra officina mobile viene da te — prezzi fissi.',
      ctaPhone: '📞 Prenota appuntamento', ctaCalc: 'Calcola prezzo →',
      trust: ['⭐ 4.8 / 5 Recensioni Google', '🚐 Officina Mobile', '🚲 Tutte le marche Cargo', '💰 Trasferta CHF 49'],
      whyLabel: 'Perché mobile', whyH2: 'Il servizio cargo che viene da te', whySub: 'Le cargo bike sono pesanti. Portiamo tutto da te.',
      info1T: 'Direttamente da te', info1D: 'Niente fatica con 40kg+. Ripariamo alla tua porta.',
      info2T: 'Specialisti Cargo', info2D: 'Esperti in 2 ruote, 3 ruote, Long-Tail e Front-Loader.',
      info3T: 'Tutte le marche', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe.',
      calcLabel: 'Calcolatore', calcH2: 'Quanto costa il tuo servizio ?', calcSub: 'Scegli pacchetto ed extra — prezzo in tempo reale.',
      step1: '1. Scegli pacchetto base', step2: '2. Aggiungi extra',
      totalLbl: 'Tuo Prezzo Fisso', totalFine: 'Trasferta Zurigo città CHF 49 · Parti in base all\'uso',
      waBtn: 'Prenota WhatsApp',
      diagLabel: 'Interattivo', diagH2: 'Clicca sulla tua Cargo Bike', diagSub: 'Tocca un punto per i dettagli.',
      diagHint: '👆 Tocca un punto arancio',
      sliderLabel: 'Vale la pena ?', sliderH2: 'La tua Cargo Bike merita una riparazione ?', sliderSub: 'Sposta la barra in base allo stato attuale.',
      sliderL1: '🌟 Come nuova', sliderL2: '🔧 Uso normale', sliderL3: '⚠️ Molto usurata',
      faqLabel: 'FAQ', faqH2: 'FAQ Servizio Cargo', faqSub: 'Tutto quello che devi sapere.',
      finalH2: 'Servizio Cargo Bike a Zurigo — senza stress',
      finalP: 'Veniamo da te e ripariamo sul posto. Trasferta CHF 49.',
      finalBtn: 'Prenota Servizio Cargo ora',
      finalCont: 'WhatsApp · info@velov.ch · Officina Mobile Cargo Zurigo',
      waMsg: 'Ciao VELOV! Vorrei prenotare un servizio cargo bike.'
    }
  }
};

/* ===================================================================
   LANGUAGE DETECTION (Sourced from Home UNIFIED)
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
  return 'de';
}

/* ===================================================================
   CUSTOM ELEMENT: velov-cargo
   =================================================================== */
class VelovCargo extends HTMLElement {
  static CONFIG = {
    phone: '+41762352126', waNumber: '41762352126', email: 'info@velov.ch',
    packages: {
      basic: { name: 'Cargo Basic', price: 99, desc: 'Sicherheitscheck + Schrauben' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Gründlicher Jahresservice' },
      premium: { name: 'Cargo Premium', price: 259, desc: 'Komplett-Service + Reinigung' },
    },
    extras: [
      { id: 'tire', label: 'Reifenwechsel', price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Beläge vorne', price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Beläge hinten', price: 55, icon: '🛑' },
      { id: 'hydrF', label: 'Entlüften vorne', price: 49, icon: '💧' },
      { id: 'hydrR', label: 'Entlüften hinten', price: 65, icon: '💧' },
      { id: 'chain', label: 'Kettenwechsel', price: 39, icon: '⛓️' },
      { id: 'lenk', label: 'Knicklenkung', price: 39, icon: '↔️' },
      { id: 'box', label: 'Box-Reparatur', price: 49, icon: '📦' },
      { id: 'wheel', label: 'Laufräder zentrieren', price: 45, icon: '🎯' },
      { id: 'anfahrt', label: 'Anfahrt Zürich Stadt', price: 49, icon: '🚐' },
    ],
    hotspots: [
      { id: 'box', x: 22, y: 55, title: 'Transportbox', body: 'Schloss, Verdeck, Befestigungen — ab CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Antrieb & Kette', body: 'Kette wechseln ab CHF 39. Alle Motoren.' },
      { id: 'brake', x: 70, y: 40, title: 'Bremsen', body: 'Beläge vorne CHF 35 · hinten CHF 55.' },
      { id: 'wheel', x: 82, y: 70, title: 'Hinterrad', body: 'Zentrieren CHF 45. Schaltung ab CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Lenkung', body: 'Lenk-Gelenk prüfen & einstellen — CHF 39.' },
    ],
    faqs: [
      { q: 'Welche Marken?', a: 'Alle: Urban Arrow, Babboe, Riese & Müller, Tern, Yuba.' },
      { q: 'Kosten?', a: 'Basic CHF 99 · Standard CHF 229 · Premium CHF 259 + Anfahrt CHF 49.' },
      { q: 'Unterschied Standard vs Premium?', a: 'Premium inkl. Laufräder zentrieren und Reinigung.' },
      { q: 'E-Cargo-Bikes?', a: 'Ja mechanisch. Akku/Motor-Diagnose via Hersteller.' },
      { q: 'Transportbox?', a: 'Ja. Schloss, Gurte, Verdeck prüfen wir standardmässig.' },
      { q: 'Wie funktioniert es?', a: 'Wir kommen zu dir. Kein Transport nötig.' },
    ]
  };

  constructor() {
    super();
    this.state = { basePkg: 'standard', extras: new Set(), openFaq: null, slider: 5 };
    this._lang = detectVelovLang();
    if (!VELOV_LANG[this._lang]) this._lang = 'de';
  }

  get L() { return VELOV_LANG[this._lang]; }
  get UI() { return this.L.ui; }

  connectedCallback() {
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, this.L.seo, this.UI.faqLabel, this.UI.contactLabel); } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this, this._lang); } catch(e) {}
    this.injectStyles();
    this.render();
    this.attachEvents();
  }

  injectStyles() {
    if (document.getElementById('velov-cargo-styles')) return;
    const s = document.createElement('style');
    s.id = 'velov-cargo-styles';
    s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
    velov-cargo { display:block; --v-purple:#7B68EE; --v-purple-dark:#6354d4; --v-orange:#E8573A; --v-orange-dark:#d14a30; --v-dark:#2D2B3D; --v-warm:#F5F0EB; --v-white:#fff; --v-text:#2D2B3D; --v-muted:#6B6880; --v-border:#E8E4DF; --v-green:#4CAF50; --v-shadow:0 12px 32px rgba(123,104,238,.1); --v-shadow-lg:0 20px 50px rgba(45,43,61,.12); font-family:'DM Sans',sans-serif; color:var(--v-text); line-height:1.6; }
    velov-cargo * { margin:0; padding:0; box-sizing:border-box; }
    velov-cargo .v-wrap { max-width:1120px; margin:0 auto; padding:0 24px; }
    velov-cargo .v-section { padding:112px 0; }
    velov-cargo .v-label { display:inline-block; font-size:12px; font-weight:700; color:var(--v-purple); text-transform:uppercase; letter-spacing:1.8px; margin-bottom:12px; }
    velov-cargo .v-title { font-size:clamp(26px,3.6vw,40px); font-weight:800; color:var(--v-dark); line-height:1.15; margin-bottom:16px; }
    velov-cargo .v-sub { font-size:17px; color:var(--v-muted); max-width:620px; line-height:1.65; }
    velov-cargo .v-center { text-align:center; }
    velov-cargo .v-center .v-sub { margin: 0 auto 40px; }
    velov-cargo .v-hero { background:radial-gradient(circle at 20% 20%,#3a3460 0%,var(--v-dark) 55%,#1a1833 100%); color:#fff; padding:96px 0 120px; text-align:center; position:relative; overflow:hidden; }
    velov-cargo .v-hero::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:60px; background:var(--v-warm); border-radius:60% 60% 0 0; }
    velov-cargo .v-hero-inner { position:relative; z-index:2; }
    velov-cargo .v-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); padding:8px 18px; border-radius:50px; font-size:13px; font-weight:600; margin-bottom:24px; backdrop-filter:blur(10px); }
    velov-cargo .v-badge .v-dot { width:8px; height:8px; border-radius:50%; background:#4ADE80; box-shadow:0 0 12px #4ADE80; animation:v-pulse 2s infinite; }
    @keyframes v-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
    velov-cargo h1.v-h1 { font-size:clamp(34px,5.2vw,58px); font-weight:800; line-height:1.05; margin:0 auto 20px; max-width:900px; }
    velov-cargo h1.v-h1 .v-grad { background:linear-gradient(90deg,var(--v-purple) 0%,#a394ff 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
    velov-cargo .v-hero p.v-lead { font-size:19px; opacity:.85; max-width:650px; margin:0 auto 32px; }
    velov-cargo .v-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
    velov-cargo .v-cta { display:inline-flex; align-items:center; gap:10px; text-decoration:none; font-weight:700; font-size:16px; padding:16px 34px; border-radius:50px; transition:all .2s; font-family:inherit; }
    velov-cargo .v-cta-primary { background:var(--v-orange); color:#fff; }
    velov-cargo .v-cta-primary:hover { transform:translateY(-2px); box-shadow:0 14px 30px rgba(232,87,58,.4); }
    velov-cargo .v-cta-ghost { background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.2); }
    velov-cargo .v-trust { display:flex; justify-content:center; gap:22px; margin-top:44px; flex-wrap:wrap; font-size:13px; opacity:.75; }
    velov-cargo .v-info-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:52px; }
    velov-cargo .v-info { background:var(--v-white); border-radius:20px; padding:36px 28px; text-align:center; transition:all .24s; border:1px solid var(--v-border); }
    velov-cargo .v-info:hover { transform:translateY(-6px); box-shadow:var(--v-shadow); border-color:var(--v-purple); }
    velov-cargo .v-info-icon { font-size:44px; margin-bottom:16px; display:inline-block; }
    velov-cargo .v-info h3 { font-size:19px; font-weight:700; margin-bottom:10px; color:var(--v-dark); }
    velov-cargo .v-info p { font-size:14.5px; color:var(--v-muted); line-height:1.6; }
    velov-cargo .v-calc { background:linear-gradient(135deg,var(--v-white) 0%,#fbfafe 100%); border-radius:28px; padding:44px; box-shadow:var(--v-shadow-lg); margin-top:56px; border:1px solid var(--v-border); }
    velov-cargo .v-calc-top { display:grid; grid-template-columns:1fr 1fr; gap:36px; align-items:start; }
    velov-cargo .v-calc h3 { font-size:18px; font-weight:700; margin-bottom:18px; color:var(--v-dark); }
    velov-cargo .v-pkg-opts { display:flex; flex-direction:column; gap:12px; }
    velov-cargo .v-pkg-opt { position:relative; display:flex; gap:14px; padding:18px; border-radius:16px; background:var(--v-warm); cursor:pointer; transition:all .2s; border:2px solid transparent; }
    velov-cargo .v-pkg-opt.active { background:var(--v-white); border-color:var(--v-purple); box-shadow:0 6px 18px rgba(123,104,238,.15); }
    velov-cargo .v-pkg-opt input { position:absolute; opacity:0; pointer-events:none; }
    velov-cargo .v-radio { width:22px; height:22px; border-radius:50%; border:2px solid var(--v-border); background:#fff; flex-shrink:0; margin-top:2px; position:relative; }
    velov-cargo .v-pkg-opt.active .v-radio { border-color:var(--v-purple); }
    velov-cargo .v-pkg-opt.active .v-radio::after { content:''; position:absolute; inset:3px; border-radius:50%; background:var(--v-purple); }
    velov-cargo .v-pkg-info { flex:1; }
    velov-cargo .v-pkg-name { font-size:15px; font-weight:700; color:var(--v-dark); display:flex; justify-content:space-between; gap:10px; }
    velov-cargo .v-pkg-price { font-weight:800; color:var(--v-purple); }
    velov-cargo .v-pkg-desc { font-size:13px; color:var(--v-muted); margin-top:3px; }
    velov-cargo .v-extras-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    velov-cargo .v-ext-opt { position:relative; display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:12px; background:var(--v-warm); cursor:pointer; transition:all .18s; border:2px solid transparent; font-size:13.5px; font-weight:500; }
    velov-cargo .v-ext-opt.active { background:#ede9ff; border-color:var(--v-purple); }
    velov-cargo .v-ext-opt input { position:absolute; opacity:0; pointer-events:none; }
    velov-cargo .v-check { width:18px; height:18px; border-radius:5px; border:2px solid var(--v-border); background:#fff; flex-shrink:0; position:relative; }
    velov-cargo .v-ext-opt.active .v-check { background:var(--v-purple); border-color:var(--v-purple); }
    velov-cargo .v-ext-opt.active .v-check::after { content:''; position:absolute; left:4px; top:0; width:6px; height:11px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg); }
    velov-cargo .v-calc-total { margin-top:36px; padding-top:28px; border-top:2px dashed var(--v-border); display:grid; grid-template-columns:1fr auto; gap:20px; align-items:center; }
    velov-cargo .v-total-amt { font-size:42px; font-weight:800; color:var(--v-dark); line-height:1; }
    velov-cargo .v-wa-btn { display:inline-flex; align-items:center; gap:10px; background:#25D366; color:#fff; text-decoration:none; font-weight:700; padding:16px 28px; border-radius:50px; font-size:15.5px; transition:all .2s; box-shadow:0 8px 22px rgba(37,211,102,.3); }
    velov-cargo .v-diag-wrap { margin-top:48px; background:var(--v-white); border-radius:28px; padding:40px; box-shadow:var(--v-shadow); border:1px solid var(--v-border); position:relative; }
    velov-cargo .v-diag-svg { width:100%; max-width:720px; display:block; margin:0 auto; height:auto; }
    velov-cargo .v-hs { cursor:pointer; }
    velov-cargo .v-hs-circle { fill:var(--v-orange); stroke:#fff; stroke-width:3; transition:all .22s; }
    velov-cargo .v-hs:hover .v-hs-circle, velov-cargo .v-hs.active .v-hs-circle { fill:var(--v-purple); r:14; }
    velov-cargo .v-hs-pulse { fill:var(--v-orange); opacity:.4; animation:v-hspulse 2s infinite; }
    @keyframes v-hspulse { 0%{r:10;opacity:.5} 100%{r:22;opacity:0} }
    velov-cargo .v-hs-num { fill:#fff; font-size:12px; font-weight:800; text-anchor:middle; pointer-events:none; }
    velov-cargo .v-diag-panel { margin-top:24px; padding:22px; background:var(--v-warm); border-radius:16px; min-height:96px; transition:all .3s; }
    velov-cargo .v-diag-panel.filled { background:#ede9ff; border-left:4px solid var(--v-purple); }
    velov-cargo .v-slider-card { margin-top:48px; background:var(--v-white); border-radius:28px; padding:44px; box-shadow:var(--v-shadow); border:1px solid var(--v-border); }
    velov-cargo .v-slider-range { -webkit-appearance:none; width:100%; height:12px; border-radius:6px; background:linear-gradient(90deg,#4ADE80 0%,#FFD60A 50%,#E8573A 100%); outline:none; cursor:pointer; }
    velov-cargo .v-slider-range::-webkit-slider-thumb { -webkit-appearance:none; width:32px; height:32px; border-radius:50%; background:var(--v-white); border:4px solid var(--v-purple); cursor:pointer; }
    velov-cargo .v-reco { margin-top:32px; padding:26px; border-radius:18px; background:var(--v-warm); transition:all .3s; }
    velov-cargo .v-reco.basic { background:linear-gradient(135deg,#e8f5e9,#c8e6c9); }
    velov-cargo .v-reco.standard { background:linear-gradient(135deg,#ede9ff,#d7ccff); }
    velov-cargo .v-reco.premium { background:linear-gradient(135deg,#ffeee6,#ffd6c2); }
    velov-cargo .v-reco-head { display:flex; align-items:center; gap:14px; margin-bottom:10px; }
    velov-cargo .v-reco-title { font-size:20px; font-weight:800; color:var(--v-dark); }
    velov-cargo .v-reco-price { margin-left:auto; font-size:22px; font-weight:800; color:var(--v-purple); }
    velov-cargo .v-reco-btn { display:inline-block; margin-top:14px; background:var(--v-dark); color:#fff; text-decoration:none; padding:12px 22px; border-radius:50px; font-weight:700; font-size:14px; }
    velov-cargo .v-faq-list { margin-top:40px; max-width:760px; margin-left:auto; margin-right:auto; }
    velov-cargo .v-faq-item { background:var(--v-white); border-radius:16px; margin-bottom:12px; border:1px solid var(--v-border); overflow:hidden; transition:all .2s; }
    velov-cargo .v-faq-q { width:100%; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; background:none; border:none; font-family:inherit; font-size:16px; font-weight:700; color:var(--v-dark); text-align:left; cursor:pointer; gap:16px; }
    velov-cargo .v-faq-ico { width:30px; height:30px; border-radius:50%; background:var(--v-warm); display:inline-flex; align-items:center; justify-content:center; color:var(--v-purple); font-weight:700; transition:all .25s; }
    velov-cargo .v-faq-item.open .v-faq-ico { background:var(--v-purple); color:#fff; transform:rotate(45deg); }
    velov-cargo .v-faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease; padding:0 24px; }
    velov-cargo .v-faq-item.open .v-faq-a { max-height:400px; }
    velov-cargo .v-faq-a-inner { padding-bottom:20px; font-size:15px; color:var(--v-muted); line-height:1.65; }
    velov-cargo .v-final-cta { background:linear-gradient(135deg,var(--v-purple),var(--v-purple-dark)); color:#fff; text-align:center; padding:84px 0; position:relative; overflow:hidden; }
    velov-cargo .v-final-cta h2 { font-size:clamp(28px,4vw,42px); font-weight:800; margin-bottom:14px; }
    velov-cargo .v-btn-white { display:inline-block; background:#fff; color:var(--v-purple); text-decoration:none; font-weight:700; padding:16px 44px; border-radius:50px; font-size:17px; transition:all .22s; }
    velov-cargo .v-final-contact { margin-top:24px; font-size:14px; opacity:.8; }
    velov-cargo .v-final-contact a { color:#fff; text-decoration:underline; }
    @media (max-width:880px){
      velov-cargo .v-section{padding:60px 0}
      velov-cargo .v-info-grid{grid-template-columns:1fr}
      velov-cargo .v-calc-top{grid-template-columns:1fr}
      velov-cargo .v-extras-grid{grid-template-columns:1fr}
      velov-cargo .v-calc-total{grid-template-columns:1fr; text-align:center}
      velov-cargo .v-cta-row{flex-direction:column; align-items:stretch}
    }
    `;
    const style = document.createElement('style');
    style.id = 'velov-cargo-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  render() {
    this.innerHTML = `
      ${this.tplHero()}
      ${this.tplWhyMobile()}
      ${this.tplCalculator()}
      ${this.tplDiagram()}
      ${this.tplSlider()}
      ${this.tplFAQ()}
      ${this.tplFinalCTA()}
    `;
  }

  tplHero() {
    return `<section class="v-hero"><div class="v-wrap v-hero-inner"><div class="v-badge"><span class="v-dot"></span> ${this.UI.badge}</div><h1 class="v-h1">${this.UI.heroH1}</h1><p class="v-lead">${this.UI.heroSub}</p><div class="v-cta-row"><a class="v-cta v-cta-primary" href="tel:${VelovCargo.CONFIG.phone}">${this.UI.ctaPhone}</a><a class="v-cta v-cta-ghost" href="#v-calc">${this.UI.ctaCalc}</a></div><div class="v-trust">${this.UI.trust.map(t=>`<span>${t}</span>`).join('')}</div></div></section>`;
  }

  tplWhyMobile() {
    return `<section class="v-section" style="background:var(--v-warm)"><div class="v-wrap v-center"><div class="v-label">${this.UI.whyLabel}</div><h2 class="v-title">${this.UI.whyH2}</h2><p class="v-sub">${this.UI.whySub}</p><div class="v-info-grid"><article class="v-info"><div class="v-info-icon">🏠</div><h3>${this.UI.info1T}</h3><p>${this.UI.info1D}</p></article><article class="v-info"><div class="v-info-icon">🔧</div><h3>${this.UI.info2T}</h3><p>${this.UI.info2D}</p></article><article class="v-info"><div class="v-info-icon">🚲</div><h3>${this.UI.info3T}</h3><p>${this.UI.info3D}</p></article></div></div></section>`;
  }

  tplCalculator() {
    const pkgOpts = Object.entries(VelovCargo.CONFIG.packages).map(([key, p]) => `
      <label class="v-pkg-opt ${this.state.basePkg === key ? 'active' : ''}" data-pkg="${key}">
        <input type="radio" name="v-pkg" value="${key}" ${this.state.basePkg === key ? 'checked' : ''}>
        <span class="v-radio"></span>
        <span class="v-pkg-info"><span class="v-pkg-name"><span>${p.name}</span><span class="v-pkg-price">CHF ${p.price}</span></span><span class="v-pkg-desc">${p.desc}</span></span>
      </label>`).join('');
    const extOpts = VelovCargo.CONFIG.extras.map(e => `
      <label class="v-ext-opt ${this.state.extras.has(e.id) ? 'active' : ''}" data-ext="${e.id}">
        <input type="checkbox" value="${e.id}" ${this.state.extras.has(e.id) ? 'checked' : ''}>
        <span class="v-check"></span><span class="v-ext-icon">${e.icon}</span><span class="v-ext-label">${e.label}</span><span class="v-ext-price">+${e.price}</span>
      </label>`).join('');
    return `<section class="v-section" id="v-calc" style="background:var(--v-white)"><div class="v-wrap"><div class="v-center"><div class="v-label">${this.UI.calcLabel}</div><h2 class="v-title">${this.UI.calcH2}</h2><p class="v-sub">${this.UI.calcSub}</p></div><div class="v-calc"><div class="v-calc-top"><div><h3>${this.UI.step1}</h3><div class="v-pkg-opts">${pkgOpts}</div></div><div><h3>${this.UI.step2}</h3><div class="v-extras-grid">${extOpts}</div></div></div><div class="v-calc-total"><div><div class="v-total-lbl">${this.UI.totalLbl}</div><div class="v-total-amt" id="v-total">CHF <span>${VelovCargo.CONFIG.packages[this.state.basePkg].price}</span></div><div class="v-total-fine">${this.UI.totalFine}</div></div><a class="v-wa-btn" id="v-wa-btn" href="#" rel="noopener">💬 ${this.UI.waBtn}</a></div></div></div></section>`;
  }

  tplDiagram() {
    const hs = VelovCargo.CONFIG.hotspots.map((h, i) => `
      <g class="v-hs" data-hs="${h.id}" tabindex="0"><circle class="v-hs-pulse" cx="${h.x*7.2}" cy="${h.y*3.6}" r="10"/><circle class="v-hs-circle" cx="${h.x*7.2}" cy="${h.y*3.6}" r="11"/><text class="v-hs-num" x="${h.x*7.2}" y="${h.y*3.6 + 4}">${i+1}</text></g>`).join('');
    return `<section class="v-section" style="background:var(--v-warm)"><div class="v-wrap"><div class="v-center"><div class="v-label">${this.UI.diagLabel}</div><h2 class="v-title">${this.UI.diagH2}</h2><p class="v-sub">${this.UI.diagSub}</p></div><div class="v-diag-wrap"><svg class="v-diag-svg" viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vFrame" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7B68EE"/><stop offset="100%" stop-color="#6354d4"/></linearGradient></defs><line x1="40" y1="305" x2="680" y2="305" stroke="#E8E4DF" stroke-width="2" stroke-dasharray="6 6"/><rect x="70" y="150" width="190" height="120" rx="10" fill="#2D2B3D" stroke="#7B68EE" stroke-width="3"/><circle cx="165" cy="295" r="38" fill="none" stroke="#2D2B3D" stroke-width="6"/><path d="M 260 170 L 480 145" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round" fill="none"/><line x1="480" y1="145" x2="460" y2="290" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round"/><path d="M 260 170 L 460 290" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round" fill="none"/><line x1="460" y1="290" x2="600" y2="295" stroke="url(#vFrame)" stroke-width="8" stroke-linecap="round"/><circle cx="600" cy="295" r="38" fill="none" stroke="#2D2B3D" stroke-width="6"/><circle cx="460" cy="290" r="22" fill="#E8573A" stroke="#2D2B3D" stroke-width="3"/>${hs}</svg><div class="v-diag-panel" id="v-diag-panel"><div class="v-diag-hint">${this.UI.diagHint}</div></div></div></div></section>`;
  }

  tplSlider() {
    return `<section class="v-section" style="background:var(--v-white)"><div class="v-wrap"><div class="v-center"><div class="v-label">${this.UI.sliderLabel}</div><h2 class="v-title">${this.UI.sliderH2}</h2><p class="v-sub">${this.UI.sliderSub}</p></div><div class="v-slider-card"><div style="font-weight:700;font-size:15px;margin-bottom:8px">Zustand?</div><div class="v-slider-wrap"><input type="range" min="0" max="10" value="${this.state.slider}" class="v-slider-range" id="v-slider"><div class="v-slider-labels"><span>${this.UI.sliderL1}</span><span>${this.UI.sliderL2}</span><span>${this.UI.sliderL3}</span></div></div><div class="v-reco" id="v-reco"></div></div></div></section>`;
  }

  tplFAQ() {
    const items = VelovCargo.CONFIG.faqs.map((f, i) => `
      <div class="v-faq-item" data-faq="${i}"><button class="v-faq-q" aria-expanded="false"><span>${f.q}</span><span class="v-faq-ico">+</span></button><div class="v-faq-a"><div class="v-faq-a-inner">${f.a}</div></div></div>`).join('');
    return `<section class="v-section" style="background:var(--v-warm)"><div class="v-wrap"><div class="v-center"><div class="v-label">${this.UI.faqLabel}</div><h2 class="v-title">${this.UI.faqH2}</h2><p class="v-sub">${this.UI.faqSub}</p></div><div class="v-faq-list">${items}</div></div></section>`;
  }

  tplFinalCTA() {
    return `<section class="v-final-cta"><div class="v-wrap"><h2>${this.UI.finalH2}</h2><p>${this.UI.finalP}</p><a class="v-btn-white" href="tel:${VelovCargo.CONFIG.phone}">${this.UI.finalBtn}</a><div class="v-final-contact">${this.UI.finalCont}</div></div></section>`;
  }

  attachEvents() {
    this.querySelectorAll('.v-pkg-opt').forEach(el => {
      el.addEventListener('click', () => {
        this.state.basePkg = el.dataset.pkg;
        this.querySelectorAll('.v-pkg-opt').forEach(o => o.classList.toggle('active', o.dataset.pkg === this.state.basePkg));
        this.updateTotal();
      });
    });
    this.querySelectorAll('.v-ext-opt').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.dataset.ext;
        this.state.extras.has(id) ? this.state.extras.delete(id) : this.state.extras.add(id);
        el.classList.toggle('active');
        this.updateTotal();
      });
    });
    this.querySelectorAll('.v-hs').forEach(el => {
      el.addEventListener('click', () => {
        this.querySelectorAll('.v-hs').forEach(n => n.classList.remove('active'));
        el.classList.add('active');
        const h = VelovCargo.CONFIG.hotspots.find(x => x.id === el.dataset.hs);
        const panel = this.querySelector('#v-diag-panel');
        if (h && panel) { panel.classList.add('filled'); panel.innerHTML = `<h4>${h.title}</h4><p>${h.body}</p>`; }
      });
    });
    const slider = this.querySelector('#v-slider');
    if (slider) slider.addEventListener('input', (e) => { this.state.slider = +e.target.value; this.updateRecommendation(); });
    this.querySelectorAll('.v-faq-item').forEach(it => {
      it.querySelector('.v-faq-q').addEventListener('click', () => {
        const isOpen = it.classList.contains('open');
        this.querySelectorAll('.v-faq-item').forEach(x => x.classList.remove('open'));
        if (!isOpen) it.classList.add('open');
      });
    });
    this.updateTotal();
    this.updateRecommendation();
  }

  updateTotal() {
    const base = VelovCargo.CONFIG.packages[this.state.basePkg];
    let total = base.price;
    const extraItems = [];
    this.state.extras.forEach(id => {
      const e = VelovCargo.CONFIG.extras.find(x => x.id === id);
      if (e) { total += e.price; extraItems.push(e); }
    });
    const amt = this.querySelector('#v-total');
    if (amt) amt.innerHTML = `CHF <span>${total}</span>`;
    const extrasTxt = extraItems.length ? extraItems.map(e => `• ${e.label} (+CHF ${e.price})`).join('\n') : '—';
    const msg = `Hi VELOV! 👋\n\n📦 Paket: ${base.name} (CHF ${base.price})\n➕ Extras:\n${extrasTxt}\n\n💰 Total: CHF ${total}\n\nAdresse: (hier ausfüllen)`;
    const wa = this.querySelector('#v-wa-btn');
    if (wa) wa.setAttribute('href', `https://wa.me/${VelovCargo.CONFIG.waNumber}?text=${encodeURIComponent(msg)}`);
  }

  updateRecommendation() {
    const v = this.state.slider;
    let key, emoji, title, msg;
    if (v <= 3) { key = 'basic'; emoji = '🌟'; title = 'Cargo Basic'; msg = 'Guter Zustand. Ein Basic Check reicht vollkommen.'; }
    else if (v <= 7) { key = 'standard'; emoji = '🛠️'; title = 'Cargo Standard'; msg = 'Normaler Gebrauch. Wir empfehlen den Standard Service.'; }
    else { key = 'premium'; emoji = '🔥'; title = 'Cargo Premium'; msg = 'Stark beansprucht. Ein Premium Service ist hier wichtig.'; }
    const p = VelovCargo.CONFIG.packages[key];
    const box = this.querySelector('#v-reco');
    if (box) {
      box.className = `v-reco ${key}`;
      box.innerHTML = `<div class="v-reco-head"><span class="v-reco-emoji">${emoji}</span><span class="v-reco-title">${title}</span><span class="v-reco-price">CHF ${p.price}</span></div><p>${msg}</p><a class="v-reco-btn" href="tel:${VelovCargo.CONFIG.phone}">${p.name} buchen →</a>`;
    }
  }
}

if (!customElements.get('velov-cargo')) {
  customElements.define('velov-cargo', VelovCargo);
}
