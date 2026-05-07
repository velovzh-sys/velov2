/* ===================================================================
   VELOV — UNIFIED Multilingual Cargo Bike Component
   Version: 3.0 (Proactive Unified Architecture)
   Languages: de (primary) · en · fr · it · es
   =================================================================== */

/* ===== 1. SHARED SEO HELPER (Singleton) ===== */
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
      if(Array.isArray(sec.h3items)) sec.h3items.forEach(function(it){
        h+='<h3>'+safe(it.h3)+'</h3>';
        if(it.body) h+='<p>'+safe(it.body)+'</p>';
      });
      h+='</section>';
    });
    if(Array.isArray(s.faqs)&&s.faqs.length){
      h+='<section><h2>FAQ</h2>';
      s.faqs.forEach(function(f){h+='<h3>'+safe(f.q)+'</h3><p>'+safe(f.a)+'</p>';});
      h+='</section>';
    }
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

/* ===== 2. SHARED TRACKER (Singleton) ===== */
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

/* ===== 3. MULTILINGUAL DATA MAP ===== */
const VELOV_LANG = {
  de: {
    seo: {
      id: 'cargo-de',
      h1: 'Cargo-Bike Service Zürich – Wartung & Reparatur für Lastenräder',
      intro: 'Mobiler Cargo-Bike Service in Zürich für alle Marken.',
      sections: [{ h2: 'Cargo-Bike Service Zürich', body: 'Spezialisiert auf Lastenräder aller Marken.' }],
      faqs: [{ q: 'Welche Marken?', a: 'Alle: Urban Arrow, Riese & Müller, Tern, etc.' }],
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zürich","url":"https://www.velov.ch/cargo" }]
    },
    ui: {
      badge: 'Mobiler Cargo-Bike-Service · ganz Zürich',
      heroH1: 'Cargo Bike Reparatur <span class="v-grad">direkt bei dir</span> in Zürich',
      heroSub: 'Schluss mit 40-kg-Lastenrad-Schleppen. Unsere mobile Werkstatt kommt zu dir — alle Marken, transparente Festpreise.',
      ctaPhone: '📞 Jetzt Termin buchen',
      ctaCalc: 'Preis berechnen →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Mobile Werkstatt', '🚲 Alle Cargo-Marken', '💰 Anfahrt CHF 49'],
      whyLabel: 'Warum mobil',
      whyH2: 'Lastenrad-Service, der zu dir kommt',
      whySub: 'Cargo Bikes sind schwer und sperrig. Wir kommen mit komplettem Werkzeug direkt zu dir.',
      info1T: 'Direkt bei dir', info1D: 'Kein Schleppen von 40kg+. Wir reparieren vor der Haustür.',
      info2T: 'Cargo-Spezialisten', info2D: 'Erfahrung mit 2-Rad, 3-Rad, Long-Tail und Front-Loader.',
      info3T: 'Alle Marken', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe — alle Motoren.',
      calcLabel: 'Kosten-Rechner', calcH2: 'Was kostet dein Cargo-Service?', calcSub: 'Wähle dein Paket und Extras — der Preis aktualisiert sich live.',
      step1: '1. Basispaket wählen', step2: '2. Extras hinzufügen (optional)',
      totalLbl: 'Dein Festpreis', totalFine: 'Anfahrt Zürich Stadt CHF 49 · Teile nach Aufwand',
      waBtn: 'Book via WhatsApp',
      diagLabel: 'Interaktiv', diagH2: 'Klick auf dein Cargo Bike', diagSub: 'Tippe einen Punkt an für Details.',
      diagHint: '👆 Tippe einen orangen Punkt an',
      sliderLabel: 'Lohnt sich das noch?', sliderH2: 'Ist dein Cargo Bike eine Reparatur wert?', sliderSub: 'Schieb den Regler passend zum Zustand.',
      sliderL1: '🌟 Neuwertig', sliderL2: '🔧 Normal genutzt', sliderL3: '⚠️ Stark beansprucht',
      faqLabel: 'FAQ', faqH2: 'Häufige Fragen zum Cargo-Service', faqSub: 'Alles, was du wissen willst.',
      finalH2: 'Cargo Bike Service in Zürich — ohne Stress',
      finalP: 'Wir kommen zu dir, reparieren mechanisch vor Ort. Transparente Festpreise, Anfahrt CHF 49.',
      finalBtn: 'Jetzt Cargo Service buchen',
      finalCont: 'WhatsApp · info@velov.ch · Mobile Cargo-Bike-Werkstatt Zürich',
      waMsg: 'Hi VELOV! Ich möchte meinen Cargo-Service buchen.'
    }
  },
  en: {
    seo: {
      id: 'cargo-en',
      h1: 'Cargo Bike Service Zurich – Maintenance & Repair',
      intro: 'Mobile cargo bike service in Zurich for all brands.',
      sections: [{ h2: 'Cargo Bike Service Zurich', body: 'Specialized in all cargo bike brands.' }],
      faqs: [{ q: 'Which brands?', a: 'All: Urban Arrow, Riese & Müller, Tern, etc.' }],
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurich","url":"https://www.velov.ch/en/cargo" }]
    },
    ui: {
      badge: 'Mobile Cargo Bike Service · all over Zurich',
      heroH1: 'Cargo Bike Repair <span class="v-grad">right at your door</span> in Zurich',
      heroSub: 'Stop dragging 40kg cargo bikes. Our mobile workshop comes to you — all brands, transparent fixed prices.',
      ctaPhone: '📞 Book appointment',
      ctaCalc: 'Calculate price →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Mobile Workshop', '🚲 All Cargo Brands', '💰 Travel CHF 49'],
      whyLabel: 'Why mobile',
      whyH2: 'Cargo service that comes to you',
      whySub: 'Cargo bikes are heavy and bulky. We bring all tools directly to your spot.',
      info1T: 'Right at your door', info1D: 'No dragging 40kg+. We repair at your home or office.',
      info2T: 'Cargo Specialists', info2D: 'Experts in 2-wheel, 3-wheel, Long-Tail and Front-Loaders.',
      info3T: 'All Brands', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe — all motor systems.',
      calcLabel: 'Cost Calculator', calcH2: 'How much is your Cargo service?', calcSub: 'Pick a package and extras — price updates live.',
      step1: '1. Choose base package', step2: '2. Add extras (optional)',
      totalLbl: 'Your Fixed Price', totalFine: 'Zurich city travel CHF 49 · Parts based on use',
      waBtn: 'Book via WhatsApp',
      diagLabel: 'Interactive', diagH2: 'Click on your Cargo Bike', diagSub: 'Tap a point for details.',
      diagHint: '👆 Tap an orange dot',
      sliderLabel: 'Is it worth it?', sliderH2: 'Is your Cargo Bike worth repairing?', sliderSub: 'Slide to match the current condition.',
      sliderL1: '🌟 Like New', sliderL2: '🔧 Normal Use', sliderL3: '⚠️ Heavily Used',
      faqLabel: 'FAQ', faqH2: 'Cargo Service FAQ', faqSub: 'Everything you need to know.',
      finalH2: 'Cargo Bike Service in Zurich — stress-free',
      finalP: 'We come to you and repair on-site. Transparent fixed prices, Travel CHF 49.',
      finalBtn: 'Book Cargo Service now',
      finalCont: 'WhatsApp · info@velov.ch · Mobile Cargo Workshop Zurich',
      waMsg: 'Hi VELOV! I would like to book a Cargo Service.'
    }
  },
  es: {
    seo: {
      id: 'cargo-es',
      h1: 'Servicio Cargo Bike Zúrich – Mantenimiento',
      intro: 'Servicio cargo bike móvil en Zúrich para todas las marcas.',
      sections: [{ h2: 'Servicio Cargo Bike Zúrich', body: 'Especialistas en todas las marcas de cargo bikes.' }],
      faqs: [{ q: '¿Qué marcas?', a: 'Todas: Urban Arrow, Riese & Müller, Tern, etc.' }],
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zúrich","url":"https://www.velov.ch/es/cargo" }]
    },
    ui: {
      badge: 'Servicio Cargo Bike Móvil · todo Zúrich',
      heroH1: 'Reparación de Cargo Bike <span class="v-grad">directo a ti</span> en Zúrich',
      heroSub: 'Deja de arrastrar bicis de 40kg. Nuestro taller móvil va a tu casa — todas las marcas, precios fijos.',
      ctaPhone: '📞 Reservar cita',
      ctaCalc: 'Calcular precio →',
      trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Taller Móvil', '🚲 Todas las marcas', '💰 Traslado CHF 49'],
      whyLabel: 'Por qué móvil',
      whyH2: 'Servicio de cargo que va a tu domicilio',
      whySub: 'Las cargo bikes son pesadas. Llevamos todas las herramientas a tu ubicación.',
      info1T: 'Directo a ti', info1D: 'Sin cargar con 40kg+. Reparamos en tu puerta.',
      info2T: 'Especialistas Cargo', info2D: 'Expertos en 2 ruedas, 3 ruedas, Long-Tail y Front-Loaders.',
      info3T: 'Todas las marcas', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe — todos los motores.',
      calcLabel: 'Calculadora', calcH2: '¿Cuánto cuesta tu servicio?', calcSub: 'Elige paquete y extras — precio en vivo.',
      step1: '1. Elegir paquete base', step2: '2. Añadir extras (opcional)',
      totalLbl: 'Tu Precio Fijo', totalFine: 'Traslado Zúrich ciudad CHF 49 · Piezas según uso',
      waBtn: 'Reservar via WhatsApp',
      diagLabel: 'Interactivo', diagH2: 'Haz clic en tu Cargo Bike', diagSub: 'Toca un punto para detalles.',
      diagHint: '👆 Toca un punto naranja',
      sliderLabel: '¿Vale la pena?', sliderH2: '¿Vale la pena reparar tu Cargo Bike?', sliderSub: 'Desliza según el estado actual.',
      sliderL1: '🌟 Como nueva', sliderL2: '🔧 Uso normal', sliderL3: '⚠️ Muy desgastada',
      faqLabel: 'FAQ', faqH2: 'Preguntas frecuentes Cargo', faqSub: 'Todo lo que necesitas saber.',
      finalH2: 'Servicio Cargo Bike en Zúrich — sin estrés',
      finalP: 'Vamos a ti y reparamos en el sitio. Precios fijos, Traslado CHF 49.',
      finalBtn: 'Reservar Servicio Cargo ahora',
      finalCont: 'WhatsApp · info@velov.ch · Taller Móvil Cargo Zúrich',
      waMsg: 'Hola VELOV! Quiero reservar un servicio de Cargo Bike.'
    }
  },
  fr: {
    seo: {
      id: 'cargo-fr',
      h1: 'Service Vélo Cargo Zurich – Entretien',
      intro: 'Service vélo cargo mobile à Zurich pour toutes les marques.',
      sections: [{ h2: 'Service Vélo Cargo Zurich', body: 'Spécialistes de toutes les marques de vélos cargo.' }],
      faqs: [{ q: 'Quelles marques ?', a: 'Toutes: Urban Arrow, Riese & Müller, Tern, etc.' }],
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurich","url":"https://www.velov.ch/fr/cargo" }]
    },
    ui: {
      badge: 'Service Vélo Cargo Mobile · tout Zurich',
      heroH1: 'Réparation Vélo Cargo <span class="v-grad">chez vous</span> à Zurich',
      heroSub: 'Fini le transport de vélos de 40kg. Notre atelier mobile vient à vous — toutes marques, prix fixes.',
      ctaPhone: '📞 Prendre RDV',
      ctaCalc: 'Calculer le prix →',
      trust: ['⭐ 4.8 / 5 Avis Google', '🚐 Atelier Mobile', '🚲 Toutes marques Cargo', '💰 Trajet CHF 49'],
      whyLabel: 'Pourquoi mobile',
      whyH2: 'Le service cargo qui vient à vous',
      whySub: 'Les vélos cargo sont lourds. Nous apportons tous les outils chez vous.',
      info1T: 'Directement chez vous', info1D: 'Pas de transport de 40kg+. On répare devant votre porte.',
      info2T: 'Spécialistes Cargo', info2D: 'Experts en 2 roues, 3 roues, Long-Tail et Front-Loaders.',
      info3T: 'Toutes les marques', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe — tous moteurs.',
      calcLabel: 'Calculateur', calcH2: 'Quel est le prix de votre service ?', calcSub: 'Choisissez forfait et extras — prix en direct.',
      step1: '1. Choisir le forfait', step2: '2. Ajouter des extras (optionnel)',
      totalLbl: 'Votre Prix Fixe', totalFine: 'Trajet Zurich ville CHF 49 · Pièces selon usage',
      waBtn: 'Réserver via WhatsApp',
      diagLabel: 'Interactif', diagH2: 'Cliquez sur votre Vélo Cargo', diagSub: 'Touche un point pour les détails.',
      diagHint: '👆 Touchez un point orange',
      sliderLabel: 'Est-ce rentable ?', sliderH2: 'Votre vélo cargo vaut-il la peine d\'être réparé ?', sliderSub: 'Glissez selon l\'état actuel.',
      sliderL1: '🌟 Comme neuf', sliderL2: '🔧 Usage normal', sliderL3: '⚠️ Très usé',
      faqLabel: 'FAQ', faqH2: 'FAQ Service Cargo', faqSub: 'Tout ce que vous devez savoir.',
      finalH2: 'Service Vélo Cargo à Zurich — sans stress',
      finalP: 'Nous venons chez vous et réparons sur place. Prix fixes, Trajet CHF 49.',
      finalBtn: 'Réserver Service Cargo maintenant',
      finalCont: 'WhatsApp · info@velov.ch · Atelier Mobile Cargo Zurich',
      waMsg: 'Bonjour VELOV ! Je souhaite réserver un service vélo cargo.'
    }
  },
  it: {
    seo: {
      id: 'cargo-it',
      h1: 'Servizio Cargo Bike Zurigo – Manutenzione',
      intro: 'Servizio cargo bike mobile a Zurigo per tutte le marche.',
      sections: [{ h2: 'Servizio Cargo Bike Zurigo', body: 'Specialisti in tutte le marche di cargo bike.' }],
      faqs: [{ q: 'Quali marche ?', a: 'Tutte: Urban Arrow, Riese & Müller, Tern, etc.' }],
      schema: [{ "@context":"https://schema.org","@type":"LocalBusiness","name":"VELOV Cargo Zurigo","url":"https://www.velov.ch/it/cargo" }]
    },
    ui: {
      badge: 'Servizio Cargo Bike Mobile · tutta Zurigo',
      heroH1: 'Riparazione Cargo Bike <span class="v-grad">direttamente da te</span> a Zurigo',
      heroSub: 'Smetti di trascinare bici da 40kg. La nostra officina mobile viene da te — tutte le marche, prezzi fissi.',
      ctaPhone: '📞 Prenota appuntamento',
      ctaCalc: 'Calcola prezzo →',
      trust: ['⭐ 4.8 / 5 Recensioni Google', '🚐 Officina Mobile', '🚲 Tutte le marche Cargo', '💰 Trasferta CHF 49'],
      whyLabel: 'Perché mobile',
      whyH2: 'Il servizio cargo che viene da te',
      whySub: 'Le cargo bike sono pesanti e ingombranti. Portiamo tutti gli attrezzi da te.',
      info1T: 'Direttamente da te', info1D: 'Niente fatica con 40kg+. Ripariamo alla tua porta.',
      info2T: 'Specialisti Cargo', info2D: 'Esperti in 2 ruote, 3 ruote, Long-Tail e Front-Loader.',
      info3T: 'Tutte le marche', info3D: 'Riese & Müller, Urban Arrow, Tern, Yuba, Babboe — tutti i motori.',
      calcLabel: 'Calcolatore', calcH2: 'Quanto costa il tuo servizio ?', calcSub: 'Scegli pacchetto ed extra — prezzo in tempo reale.',
      step1: '1. Scegli pacchetto base', step2: '2. Aggiungi extra (opzionali)',
      totalLbl: 'Tuo Prezzo Fisso', totalFine: 'Trasferta Zurigo città CHF 49 · Parti in base all\'uso',
      waBtn: 'Prenota via WhatsApp',
      diagLabel: 'Interattivo', diagH2: 'Clicca sulla tua Cargo Bike', diagSub: 'Tocca un punto per i dettagli.',
      diagHint: '👆 Tocca un punto arancio',
      sliderLabel: 'Vale la pena ?', sliderH2: 'La tua Cargo Bike merita una riparazione ?', sliderSub: 'Sposta la barra in base allo stato attuale.',
      sliderL1: '🌟 Come nuova', sliderL2: '🔧 Uso normale', sliderL3: '⚠️ Molto usurata',
      faqLabel: 'FAQ', faqH2: 'FAQ Servizio Cargo', faqSub: 'Tutto quello che devi sapere.',
      finalH2: 'Servizio Cargo Bike a Zurigo — senza stress',
      finalP: 'Veniamo da te e ripariamo sul posto. Prezzi fissi, Trasferta CHF 49.',
      finalBtn: 'Prenota Servizio Cargo ora',
      finalCont: 'WhatsApp · info@velov.ch · Officina Mobile Cargo Zurigo',
      waMsg: 'Ciao VELOV! Vorrei prenotare un servizio cargo bike.'
    }
  }
};

/* ===================================================================
   LANGUAGE DETECTION (Synced with velov-home-UNIFIED.js)
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
      { id: 'box', x: 22, y: 55, title: 'Transportbox & Gurte', body: 'Schloss, Verdeck, Befestigungen, Kindersitze — Reparatur ab CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Antrieb & Kette', body: 'Kette wechseln ab CHF 39. Wir warten alle Cargo-Bikes.' },
      { id: 'brake', x: 70, y: 40, title: 'Hydraulische Bremsen', body: 'Beläge vorne CHF 35 · hinten CHF 55. Entlüften ab CHF 49.' },
      { id: 'wheel', x: 82, y: 70, title: 'Hinterrad / Schaltung', body: 'Speichen zentrieren CHF 45. Schaltung justieren ab CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Lenkung', body: 'Lenk-Gelenk prüfen & einstellen — CHF 39.' },
    ],
    faqs: [
      { q: 'Welche Cargo-Bike-Marken repariert ihr?', a: 'Alle. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt.' },
      { q: 'Was kostet der Cargo-Bike-Service?', a: 'Basic CHF 99 · Standard CHF 229 · Premium CHF 259 + Anfahrt CHF 49.' },
      { q: 'Unterschied Standard vs Premium?', a: 'Premium inkl. Laufräder zentrieren und kompletter Reinigung.' },
      { q: 'Repariert ihr auch E-Cargo-Bikes?', a: 'Ja mechanisch. Akku/Motor-Diagnose erfolgt über die Hersteller.' },
      { q: 'Repariert ihr auch die Transportbox?', a: 'Ja. Schloss, Gurte, Verdeck und Befestigungen prüfen wir standardmässig.' },
      { q: 'Wie funktioniert der mobile Service?', a: 'Wir kommen zu dir. Kein Transport nötig, wir arbeiten vor Ort.' },
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
    velov-cargo .v-info { background:var(--v-white); border-radius:20px; padding:36
