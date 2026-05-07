/* ===================================================================
   VELOV — UNIFIED Multilingual Home Custom Element
   Languages: de (primary) · en · fr · it · es
   
   HOW IT WORKS:
   - One single JS file replaces ALL your separate language files
   - It reads the Wix Multilingual active language automatically
   - Everything (UI text, reviews, FAQs, ticker, WhatsApp messages)
     switches to the correct language
   - One custom element tag: <velov-home>  (used for ALL languages)
   
   WIXSETUP:
   - Upload this file to Wix Public folder as: velov-home-unified.js
   - In your Wix custom element settings, point ALL language versions
     to this same file and use tag: velov-home
   - The language detection happens automatically at runtime
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
      var id='velov-schema-'+(cfg.id||host.tagName.toLowerCase());
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
      } else if (/booking|termin|offerte|appointment|quote|rendez|prenota|reserva/i.test(href + ' ' + label)) {
        pushEvent('booking_click', Object.assign({link_url: href, link_text: label}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* ===================================================================
   MULTILINGUAL CONTENT — All 5 languages
   =================================================================== */

const VELOV_LANG = {

  /* -------- DEUTSCH (primary) -------- */
  de: {
    seo: {
      id: 'home-de',
      h1: 'Mobiler Velomechaniker Zürich – wir kommen zu dir, dein Velo bleibt wo es ist',
      intro: 'VELOV ist die mobile Velowerkstatt in Zürich. Wir reparieren dein Velo, E-Bike oder Cargo-Bike direkt vor Ort – zu Hause, im Büro, am See. 500+ Google-Bewertungen, 4,8 Sterne. Plattfuss-Reparatur ab CHF 99 inkl. Anfahrt.',
      sections: [
        { h2: 'Mobile Velowerkstatt Zürich – Service direkt vor Ort', body: 'VELOV ist Zürichs bestbewertete mobile Velowerkstatt. Statt dein Velo in eine Werkstatt zu bringen, kommen wir mit unserem voll ausgestatteten Service-Bike zu dir. Du musst nicht einmal zu Hause sein – stell dein Velo ab, wir senden dir nach der Reparatur ein Foto. Wir bedienen alle 12 Zürcher Stadtkreise und die Agglomeration.' },
        { h2: 'Unsere Velo-Services in Zürich', body: 'Plattfuss-Reparatur (Pannendienst CHF 99 all-in), Mini Service (CHF 149), Full Service (CHF 179), E-Bike Service, Cargo-Bike Service, Bremsen-Justage, Schaltung einstellen, Kettenwechsel, Velo-Entsorgung. Wir reparieren rein mechanisch, alle Marken und Motoren-Systeme.' },
        { h2: 'Servicegebiet: Stadt Zürich & Agglomeration', body: 'Wir bedienen alle Quartiere: Kreis 1–12, Schlieren, Kilchberg, Zollikon, Thalwil und weitere.' },
        { h2: 'Warum VELOV?', body: 'Dein Velo bleibt wo es ist. Reaktionszeit unter 60 Minuten für Plattfuss-Notfälle. 500+ verifizierte Google-Bewertungen, 4,8 Sterne. TWINT-Zahlung direkt vor Ort. Transparente Preise.' }
      ],
      faqs: [
        { q: 'Wie schnell könnt ihr kommen?', a: 'Bei Plattfuss-Notfällen in der Stadt Zürich in der Regel unter 60 Minuten.' },
        { q: 'Muss ich zu Hause sein?', a: 'Nein. Stell dein Velo zugänglich ab und wir senden dir nach der Reparatur ein Foto.' },
        { q: 'Repariert ihr E-Bikes?', a: 'Ja, mechanisch – alle Marken. Akku/Motor-Elektronik überlassen wir den Markenwerkstätten.' },
        { q: 'Was kostet ein Plattfuss?', a: 'CHF 99 all-inclusive: Anfahrt, neuer Schlauch, Sicherheitscheck.' },
        { q: 'Wie zahle ich?', a: 'TWINT (bevorzugt), Bargeld, Rechnung auf Anfrage.' }
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zürich',
      schema: [{"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Velowerkstatt Zürich","url":"https://www.velov.ch","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zürich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"08:00","closes":"18:00"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"],"inLanguage":"de"}]
    },
    ui: {
      faqLabel: 'Häufige Fragen',
      contactLabel: 'Kontakt',
      liveAvail: (hh,mm) => `Verfügbar — nächster Slot heute um ${hh}:${mm}`,
      liveOff: 'Notfall-Service verfügbar — Reaktion ~90 Min',
      heroH1: 'Velo kaputt in Zürich?<br/>Wir kommen zu dir — per Velo & Cargo-Bike.',
      heroSub: 'Mobile Velo-Reparatur in ganz Zürich. Transparent: <strong>Anfahrt 49 CHF</strong>, Platten-Fix all-in <strong>99 CHF</strong>, Standard Service <strong>179 CHF</strong>, Premium Service <strong>229 CHF</strong>.',
      ctaWhatsapp: '💬 WhatsApp · Antwort in 5 Min',
      ctaPrice: '⚡ Preis in 30 Sek. berechnen',
      waMsg: 'Hi VELOV, ich brauche eine Velo-Reparatur in Zürich.',
      estimatorTitle: 'Preis in <span class="accent">30 Sekunden</span> berechnen',
      estimatorLead: 'Sag uns was kaputt ist und wo du bist — du bekommst sofort Preis + Reaktionszeit.',
      step1: 'Was ist das Problem?',
      step2: 'Wo bist du?',
      step3: 'Wie dringend?',
      priceFrom: 'Preis ab',
      duration: 'Dauer',
      onsite: 'vor Ort',
      eta: 'Reaktionszeit',
      zone: 'Zone',
      resPriceDesc: (label) => `${label} — alles inklusive. Transparenter Preis, keine Überraschungen.`,
      priceSub: 'inkl. Anfahrt Zürich Stadt',
      umlandSub: (s) => `+ ${s} CHF Umland-Zuschlag`,
      waResMsg: (p,svc,total,zname,timeLabel) => `Hi VELOV, ich brauche eine Velo-Reparatur:\n\n• Problem: ${p}\n• Service: ${svc}\n• Preis ab: ${total} CHF\n• Standort: ${zname}\n• Dringlichkeit: ${timeLabel}\n\nWann kannst du da sein?`,
      waBook: '💬 Jetzt per WhatsApp buchen',
      priceMenuTitle: 'Transparente <span class="accent">Preise</span>',
      priceMenuLead: 'Kein Verstecken. Kein Stress. Fixer Preis, fair und klar.',
      featured: '★ Beliebtester',
      zoneMapTitle: 'Bist du in <span class="accent">meiner Zone</span>?',
      zoneMapLead: 'Klick auf deinen Quartiernamen — du siehst sofort Anfahrtszeit und Preis.',
      zmDesc: (label, eta) => `${label} · ~${eta} Minuten Reaktionszeit ab WhatsApp-Nachricht.`,
      zmCityLabel: 'Stadt Zürich',
      zmAggloLabel: 'Agglomeration',
      zmFarLabel: 'Umland (weiter)',
      zmPriceLabel: 'Anfahrt ab CHF',
      zmEtaLabel: 'Reaktionszeit',
      zmWaMsg: (zname) => `Hi VELOV, ich bin in ${zname} und brauche eine Velo-Reparatur. Wann kannst du da sein?`,
      proofTitle: 'Was unsere <span class="accent">Kunden</span> sagen',
      proofSub: '500+ Bewertungen · 4,8 Sterne · verifiziert via Google',
      photoStampTitle: 'Schick uns Fotos oder Videos vorab',
      photoStampDesc: 'Wir schauen\'s uns an, machen eine Offerte und lösen\'s oft schon beim ersten Besuch.',
      howTitle: 'Wie es <span class="accent">funktioniert</span>',
      howLead: 'In 4 Schritten von kaputt zu gefahren.',
      faqTitle: 'Häufige <span class="accent">Fragen</span>',
      faqLead: 'Die Fragen, die wir am häufigsten bekommen — direkt beantwortet.',
      finalH2: 'Bereit? Dein Velo wartet auf VELOV.',
      finalP: 'WhatsApp-Nachricht → Antwort in Minuten → Reparatur noch heute. Ab 49 CHF Anfahrt.',
      finalWa: '💬 Jetzt per WhatsApp buchen',
      finalWaMsg: 'Hi VELOV, ich brauche eine Velo-Reparatur. Wann kannst du kommen?',
      orCall: 'oder ruf an:',
      tickerLabel: 'LIVE',
      tickerText: (t, what, where) => `Vor ${t}: <strong>${what}</strong> abgeschlossen in <strong>${where}</strong>`,
    },
    problems: [
      { id: 'platten',   icon: '🛞', label: 'Platten / Reifen defekt',                           price: 99,  time: '30 Min',    svc: 'Platten-Fix all-in' },
      { id: 'reifen',    icon: '🔄', label: 'Reifen/Mantel wechseln',                            price: 123, time: '40 Min',    svc: 'Reifen wechseln' },
      { id: 'bremse',    icon: '🛑', label: 'Bremsen einstellen / Beläge',                       price: 99,  time: '40 Min',    svc: 'Bremsen-Service' },
      { id: 'schaltung', icon: '⚙️', label: 'Schaltung justieren',                                price: 99,  time: '40 Min',    svc: 'Schaltungs-Tuning' },
      { id: 'kette',     icon: '🔗', label: 'Kette wechseln / ölen',                              price: 99,  time: '30 Min',    svc: 'Ketten-Service' },
      { id: 'standard',  icon: '🔧', label: 'Standard Service',                                   price: 179, time: '60–90 Min', svc: 'Standard Service' },
      { id: 'premium',   icon: '⭐', label: 'Premium Service (inkl. Laufräder zentrieren)',       price: 229, time: '90–120 Min',svc: 'Premium Service' },
      { id: 'ebike',     icon: '⚡', label: 'E-Bike Service (mechanisch)',                        price: 179, time: '60–90 Min', svc: 'E-Bike Mechanik-Service' }
    ],
    urgencyOptions: [
      { id: 'jetzt',  label: '🆘 Sofort' },
      { id: 'heute',  label: '⚡ Heute'  },
      { id: 'morgen', label: '📅 Morgen' },
      { id: 'flex',   label: '🗓️ Flexibel' }
    ],
    reviews: [
      { stars: 5, name: 'Michael K.', area: 'Enge',      text: 'Platten auf dem Weg zur Arbeit. WhatsApp-Nachricht — 40 Min später war VELOV da. Perfekter Service.', date: 'vor 3 Tagen' },
      { stars: 5, name: 'Sarah M.',   area: 'Wiedikon',  text: 'E-Bike Service bei mir im Büro. Keine Transportkosten, kein Stress. Top-Mechaniker!', date: 'vor 1 Woche' },
      { stars: 5, name: 'Daniel B.',  area: 'Oerlikon',  text: 'Samstag 19 Uhr, Velo komplett hinüber. VELOV kam innerhalb 1 Stunde. Sensationell!', date: 'vor 2 Wochen' },
      { stars: 5, name: 'Laura R.',   area: 'Seefeld',   text: 'Jahres-Wartung direkt im Hinterhof. Super sauber gearbeitet, Schaltung wie neu.', date: 'vor 3 Wochen' },
      { stars: 5, name: 'Marco P.',   area: 'Schlieren', text: 'Notfall-Service am Sonntag — kein Velo-Shop offen, VELOV schon. Danke!', date: 'vor 1 Monat' },
      { stars: 5, name: 'Anna S.',    area: 'Höngg',     text: 'Kette hat sich verabschiedet. VELOV in 35 Min da. Neue Kette, weiter gehts!', date: 'vor 1 Monat' }
    ],
    ticker: [
      { t: '14 Min',  what: 'Platten',         where: 'Enge' },
      { t: '42 Min',  what: 'Bremse',          where: 'Wiedikon' },
      { t: '1 Std',   what: 'Schaltung',       where: 'Seefeld' },
      { t: '2 Std',   what: 'Standard Service',where: 'Höngg' },
      { t: '3 Std',   what: 'Reifenwechsel',   where: 'Aussersihl' },
      { t: 'gestern', what: 'Premium Service', where: 'Kilchberg' }
    ],
    trust: [
      { k: '1.200+', v: 'Reparaturen in Zürich' },
      { k: '4.8 ⭐', v: 'Google Reviews' },
      { k: '🚴‍♂️',   v: 'Mobil per Velo & Cargo-Bike' },
      { k: 'Max 8',  v: 'Termine pro Tag' }
    ],
    faqs: [
      { q: 'Wie schnell ist VELOV in Zürich bei mir?', a: 'Innerhalb der Stadt Zürich in maximal 45 Minuten — oft schon in 30–35 Min.' },
      { q: 'Was kostet eine Velo-Reparatur in Zürich?', a: 'Anfahrt fix 49 CHF. Basic Check 79 CHF. Standard Service 179 CHF. Premium Service 229 CHF.' },
      { q: 'Kommt VELOV auch am Wochenende oder abends?', a: 'Ja — 7 Tage die Woche, auch abends und am Wochenende.' },
      { q: 'Kann ich vorab einen Preis bekommen?', a: 'Ja! Schick uns Fotos oder ein Video per WhatsApp. Wir machen eine Offerte vorab.' },
      { q: 'Repariert VELOV auch E-Bikes?', a: 'Ja — mechanische Komponenten aller E-Bike-Marken. KEINE Akku- oder Software-Arbeiten.' },
      { q: 'Wie bezahle ich?', a: 'TWINT, Bar, Karte oder Rechnung.' }
    ],
    howSteps: [
      { n: 1, icon: '📱', t: 'WhatsApp oder anrufen',             d: 'Schreib uns was kaputt ist. Antwort innerhalb von Minuten.' },
      { n: 2, icon: '📸', t: 'Foto oder Video schicken',           d: 'Empfohlen: schick Bilder/Videos. Wir machen direkt eine Offerte.' },
      { n: 3, icon: '🚴‍♂️', t: 'Wir kommen mit dem Velo',          d: 'Mechaniker fährt zu dir — max 45 Minuten in der Stadt.' },
      { n: 4, icon: '✅', t: 'Repariert & weiter',                 d: 'Repariert vor Ort. Zahlung per TWINT/Karte/Rechnung.' }
    ],
    priceItems: [
      { name: 'Anfahrt Zürich Stadt', val: '49 CHF', desc: 'Fixer Anfahrtspreis', incl: ['Immer transparent', 'Keine Überraschungen'] },
      { name: 'Platten-Fix all-in',   val: '99 CHF', desc: 'Schlauch + Anfahrt',  incl: ['Anfahrt inklusive', 'Neuer Schlauch', '30-Punkt-Check'], featured: true },
      { name: 'Standard Service',     val: '179 CHF', desc: 'Komplette Wartung',  incl: ['Bremsen', 'Schaltung', 'Kette', 'Licht'] },
      { name: 'Premium Service',      val: '229 CHF', desc: 'Inkl. Laufräder',    incl: ['Alles aus Standard', 'Laufräder zentrieren', 'Lager prüfen'] }
    ]
  },

  /* -------- ENGLISH -------- */
  en: {
    seo: {
      id: 'home-en',
      h1: 'Mobile Bike Repair Zurich – We Come to You, Your Bike Stays Where It Is',
      intro: 'VELOV is the mobile bike workshop in Zurich. We repair your bike, e-bike or cargo bike on-site — at home, at the office, by the lake. 500+ Google reviews, 4.8 stars. Flat tyre repair from CHF 99 incl. travel.',
      sections: [
        { h2: 'Mobile Bike Workshop Zurich – Service at Your Doorstep', body: 'VELOV is Zurich\'s top-rated mobile bike repair service. Instead of dragging your bike to a workshop, we come to you with a fully equipped service bike. You don\'t even need to be home — leave your bike accessible and we\'ll send a photo when done. We serve all 12 districts of Zurich and the surrounding agglomeration.' },
        { h2: 'Our Bike Services in Zurich', body: 'Flat tyre repair (CHF 99 all-in), Mini Service (CHF 149), Full Service (CHF 179), e-bike service, cargo bike service, brake adjustment, gear tuning, chain replacement, bike disposal. All brands and motor systems.' },
        { h2: 'Service Area: City of Zurich & Agglomeration', body: 'We serve all 12 districts plus Schlieren, Kilchberg, Zollikon, Thalwil and more.' },
        { h2: 'Why VELOV?', body: 'Your bike stays where it is. Response under 60 min for flat tyre emergencies. 500+ verified Google reviews, 4.8 stars. TWINT on the spot. Transparent pricing.' }
      ],
      faqs: [
        { q: 'How fast can you come?', a: 'For flat tyre emergencies in Zurich city, typically under 60 minutes.' },
        { q: 'Do I need to be home?', a: 'No. Leave your bike accessible and we\'ll send a photo after the repair.' },
        { q: 'Do you repair e-bikes?', a: 'Yes — mechanically, all brands. Battery/motor electronics we leave to authorised workshops.' },
        { q: 'How much is a flat tyre repair?', a: 'CHF 99 all-inclusive: travel, new inner tube, safety check. No hidden fees.' },
        { q: 'How do I pay?', a: 'TWINT (preferred), cash, or invoice on request.' }
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema: [{"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Bike Workshop Zurich","url":"https://www.velov.ch/en","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"08:00","closes":"18:00"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"en"}]
    },
    ui: {
      faqLabel: 'Frequently Asked Questions',
      contactLabel: 'Contact',
      liveAvail: (hh,mm) => `Available — next slot today at ${hh}:${mm}`,
      liveOff: 'Emergency service available — response ~90 min',
      heroH1: 'Broken bike in Zurich?<br/>We come to you — by bike & cargo bike.',
      heroSub: 'Mobile bike repair across Zurich. Transparent: <strong>Travel CHF 49</strong>, flat fix all-in <strong>CHF 99</strong>, Standard Service <strong>CHF 179</strong>, Premium Service <strong>CHF 229</strong>.',
      ctaWhatsapp: '💬 WhatsApp · Reply in 5 min',
      ctaPrice: '⚡ Get price in 30 sec',
      waMsg: 'Hi VELOV, I need a bike repair in Zurich.',
      estimatorTitle: 'Get your price in <span class="accent">30 seconds</span>',
      estimatorLead: 'Tell us what\'s wrong and where you are — get an instant price, ETA, and WhatsApp booking link.',
      step1: 'What\'s the problem?',
      step2: 'Where are you?',
      step3: 'How urgent?',
      priceFrom: 'Price from',
      duration: 'Duration',
      onsite: 'on-site',
      eta: 'Response time',
      zone: 'Zone',
      resPriceDesc: (label) => `${label} — all inclusive. Transparent price, no surprises.`,
      priceSub: 'incl. travel Zurich city',
      umlandSub: (s) => `+ CHF ${s} agglomeration surcharge`,
      waResMsg: (p,svc,total,zname,timeLabel) => `Hi VELOV, I need a bike repair:\n\n• Problem: ${p}\n• Service: ${svc}\n• Price from: CHF ${total}\n• Location: ${zname}\n• Urgency: ${timeLabel}\n\nWhen can you come?`,
      waBook: '💬 Book via WhatsApp',
      priceMenuTitle: 'Transparent <span class="accent">Pricing</span>',
      priceMenuLead: 'No hidden fees. No stress. Fixed price, fair and clear.',
      featured: '★ Most popular',
      zoneMapTitle: 'Are you in <span class="accent">my area</span>?',
      zoneMapLead: 'Click your neighbourhood — see your travel time and price instantly.',
      zmDesc: (label, eta) => `${label} · ~${eta} min response time from WhatsApp message.`,
      zmCityLabel: 'Zurich City',
      zmAggloLabel: 'Agglomeration',
      zmFarLabel: 'Outlying area',
      zmPriceLabel: 'Travel from CHF',
      zmEtaLabel: 'Response time',
      zmWaMsg: (zname) => `Hi VELOV, I'm in ${zname} and need a bike repair. When can you come?`,
      proofTitle: 'What our <span class="accent">customers</span> say',
      proofSub: '500+ reviews · 4.8 stars · verified via Google',
      photoStampTitle: 'Send us photos or videos first',
      photoStampDesc: 'We\'ll assess it, send a quote, and often fix it in a single visit. No guesswork.',
      howTitle: 'How it <span class="accent">works</span>',
      howLead: 'From broken to rolling in 4 steps.',
      faqTitle: 'Frequently <span class="accent">Asked Questions</span>',
      faqLead: 'The questions we get most — answered directly.',
      finalH2: 'Ready? Your bike is waiting for VELOV.',
      finalP: 'WhatsApp message → reply in minutes → repaired today. From CHF 49 travel fee.',
      finalWa: '💬 Book now via WhatsApp',
      finalWaMsg: 'Hi VELOV, I need a bike repair. When can you come?',
      orCall: 'or call us:',
      tickerLabel: 'LIVE',
      tickerText: (t, what, where) => `${t} ago: <strong>${what}</strong> completed in <strong>${where}</strong>`,
    },
    problems: [
      { id: 'platten',   icon: '🛞', label: 'Flat tyre / puncture',              price: 99,  time: '30 min',    svc: 'Flat fix all-in' },
      { id: 'reifen',    icon: '🔄', label: 'Tyre/outer replacement',            price: 123, time: '40 min',    svc: 'Tyre replacement' },
      { id: 'bremse',    icon: '🛑', label: 'Brake adjustment / pads',           price: 99,  time: '40 min',    svc: 'Brake service' },
      { id: 'schaltung', icon: '⚙️', label: 'Gear tuning',                       price: 99,  time: '40 min',    svc: 'Gear tuning' },
      { id: 'kette',     icon: '🔗', label: 'Chain replacement / lubrication',   price: 99,  time: '30 min',    svc: 'Chain service' },
      { id: 'standard',  icon: '🔧', label: 'Standard Service',                  price: 179, time: '60–90 min', svc: 'Standard Service' },
      { id: 'premium',   icon: '⭐', label: 'Premium Service (incl. wheel true)', price: 229, time: '90–120 min',svc: 'Premium Service' },
      { id: 'ebike',     icon: '⚡', label: 'E-Bike Service (mechanical)',        price: 179, time: '60–90 min', svc: 'E-Bike Mechanical Service' }
    ],
    urgencyOptions: [
      { id: 'jetzt',  label: '🆘 Now'      },
      { id: 'heute',  label: '⚡ Today'    },
      { id: 'morgen', label: '📅 Tomorrow' },
      { id: 'flex',   label: '🗓️ Flexible' }
    ],
    reviews: [
      { stars: 5, name: 'Michael K.', area: 'Enge',      text: 'Flat tyre on the way to work. WhatsApp message — 40 min later VELOV was at my door. Perfect service.', date: '3 days ago' },
      { stars: 5, name: 'Sarah M.',   area: 'Wiedikon',  text: 'E-bike service at my office. No transport hassle, no stress. Top mechanic, great value!', date: '1 week ago' },
      { stars: 5, name: 'Daniel B.',  area: 'Oerlikon',  text: 'Saturday 7pm, bike completely broken. VELOV came within an hour. Absolutely brilliant.', date: '2 weeks ago' },
      { stars: 5, name: 'Laura R.',   area: 'Seefeld',   text: 'Annual service right in my courtyard. Spotless work, gears like new. Great value.', date: '3 weeks ago' },
      { stars: 5, name: 'Marco P.',   area: 'Schlieren', text: 'Emergency service on Sunday — no bike shop open, VELOV was. Brakes sorted in 30 min. Thanks!', date: '1 month ago' },
      { stars: 5, name: 'Anna S.',    area: 'Höngg',     text: 'Chain snapped mid-ride. VELOV in 35 min. New chain fitted, off I went!', date: '1 month ago' }
    ],
    ticker: [
      { t: '14 min',      what: 'Flat tyre',        where: 'Enge' },
      { t: '42 min',      what: 'Brakes',           where: 'Wiedikon' },
      { t: '1 hour',      what: 'Gear service',     where: 'Seefeld' },
      { t: '2 hours',     what: 'Standard Service', where: 'Höngg' },
      { t: '3 hours',     what: 'Tyre change',      where: 'Aussersihl' },
      { t: 'yesterday',   what: 'Premium Service',  where: 'Kilchberg' }
    ],
    trust: [
      { k: '1,200+', v: 'Repairs in Zurich' },
      { k: '4.8 ⭐', v: 'Google Reviews' },
      { k: '🚴‍♂️',   v: 'Mobile by bike & cargo bike' },
      { k: 'Max 8',  v: 'Appointments per day' }
    ],
    faqs: [
      { q: 'How fast can VELOV reach me in Zurich?', a: 'Within Zurich city, typically within 45 minutes — often 30–35 min. Same-day bookings are standard.' },
      { q: 'What does a bike repair cost in Zurich?', a: 'Travel CHF 49 (fixed). Basic Check CHF 79. Standard Service CHF 179. Premium Service CHF 229.' },
      { q: 'Does VELOV come on weekends or evenings?', a: 'Yes — 7 days a week, including evenings and weekends.' },
      { q: 'Can I get a price estimate upfront?', a: 'Absolutely! Send photos or a short video via WhatsApp. We\'ll give you a quote before we come.' },
      { q: 'Does VELOV repair e-bikes?', a: 'Yes — mechanical components on all e-bike brands. No battery, motor, or software work.' },
      { q: 'How do I pay?', a: 'TWINT, cash, card, or invoice.' }
    ],
    howSteps: [
      { n: 1, icon: '📱', t: 'WhatsApp or call',             d: 'Tell us what\'s broken. Reply within minutes.' },
      { n: 2, icon: '📸', t: 'Send a photo or video',        d: 'Recommended: send images/video. We\'ll quote you right away.' },
      { n: 3, icon: '🚴‍♂️', t: 'We come by bike',             d: 'Mechanic rides to your location — max 45 min in the city.' },
      { n: 4, icon: '✅', t: 'Repaired & back on the road',  d: 'Fixed on-site. Pay via TWINT, card, or invoice.' }
    ],
    priceItems: [
      { name: 'Travel Zurich City', val: 'CHF 49',  desc: 'Fixed travel fee',      incl: ['Always transparent', 'No surprises'] },
      { name: 'Flat Fix all-in',    val: 'CHF 99',  desc: 'Tube + travel included', incl: ['Travel included', 'New inner tube', '30-point check'], featured: true },
      { name: 'Standard Service',   val: 'CHF 179', desc: 'Full maintenance',       incl: ['Brakes', 'Gears', 'Chain', 'Lights'] },
      { name: 'Premium Service',    val: 'CHF 229', desc: 'Incl. wheel truing',     incl: ['All from Standard', 'Wheel truing', 'Bearing check'] }
    ]
  },

  /* -------- FRANÇAIS -------- */
  fr: {
    seo: {
      id: 'home-fr',
      h1: 'Réparation Vélo Mobile Zurich – Nous venons chez vous, votre vélo reste où il est',
      intro: 'VELOV est l\'atelier vélo mobile à Zurich. Nous réparons votre vélo, e-bike ou cargo bike directement sur place — à la maison, au bureau, au bord du lac. 500+ avis Google, 4,8 étoiles. Réparation de crevaison dès CHF 99 déplacement inclus.',
      sections: [
        { h2: 'Atelier Vélo Mobile Zurich – Service à domicile', body: 'VELOV est le service de réparation vélo mobile le mieux noté de Zurich. Au lieu d\'apporter votre vélo à l\'atelier, nous venons chez vous avec un vélo de service entièrement équipé.' },
        { h2: 'Nos Services Vélo à Zurich', body: 'Réparation de crevaison (CHF 99 tout compris), Mini Service (CHF 149), Full Service (CHF 179), service e-bike, service cargo bike, réglage des freins, réglage des vitesses, remplacement de chaîne, élimination de vélo.' },
        { h2: 'Zone de service : Ville de Zurich & Agglomération', body: 'Nous couvrons les 12 districts de Zurich plus Schlieren, Kilchberg, Zollikon, Thalwil et plus encore.' },
        { h2: 'Pourquoi VELOV ?', body: 'Votre vélo reste où il est. Temps de réponse sous 60 min pour les crevaisons d\'urgence. 500+ avis Google vérifiés, 4,8 étoiles. Paiement TWINT sur place. Prix transparents.' }
      ],
      faqs: [
        { q: 'En combien de temps pouvez-vous venir ?', a: 'Pour les crevaisons d\'urgence dans la ville de Zurich, généralement moins de 60 minutes.' },
        { q: 'Dois-je être à la maison ?', a: 'Non. Laissez votre vélo accessible et nous vous enverrons une photo après la réparation.' },
        { q: 'Réparez-vous les e-bikes ?', a: 'Oui — mécaniquement, toutes marques. L\'électronique batterie/moteur est laissée aux ateliers agréés.' },
        { q: 'Combien coûte une réparation de crevaison ?', a: 'CHF 99 tout compris : déplacement, nouvelle chambre à air, contrôle de sécurité.' },
        { q: 'Comment payer ?', a: 'TWINT (préféré), espèces, ou facture sur demande.' }
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema: [{"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Atelier Vélo Mobile Zurich","url":"https://www.velov.ch/fr","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"fr"}]
    },
    ui: {
      faqLabel: 'Questions fréquentes',
      contactLabel: 'Contact',
      liveAvail: (hh,mm) => `Disponible — prochain créneau aujourd'hui à ${hh}h${mm}`,
      liveOff: 'Service d\'urgence disponible — réponse ~90 min',
      heroH1: 'Vélo en panne à Zurich ?<br/>Nous venons chez vous — à vélo & cargo bike.',
      heroSub: 'Réparation vélo mobile partout à Zurich. Transparent : <strong>Déplacement 49 CHF</strong>, réparation crevaison <strong>99 CHF</strong>, Service Standard <strong>179 CHF</strong>, Service Premium <strong>229 CHF</strong>.',
      ctaWhatsapp: '💬 WhatsApp · Réponse en 5 min',
      ctaPrice: '⚡ Obtenir un prix en 30 sec',
      waMsg: 'Bonjour VELOV, j\'ai besoin d\'une réparation vélo à Zurich.',
      estimatorTitle: 'Obtenez votre prix en <span class="accent">30 secondes</span>',
      estimatorLead: 'Dites-nous ce qui ne va pas et où vous êtes — prix instantané, délai et lien de réservation WhatsApp.',
      step1: 'Quel est le problème ?',
      step2: 'Où êtes-vous ?',
      step3: 'Quelle urgence ?',
      priceFrom: 'Prix dès',
      duration: 'Durée',
      onsite: 'sur place',
      eta: 'Temps de réponse',
      zone: 'Zone',
      resPriceDesc: (label) => `${label} — tout compris. Prix transparent, sans surprises.`,
      priceSub: 'déplacement Zurich ville inclus',
      umlandSub: (s) => `+ ${s} CHF supplément agglomération`,
      waResMsg: (p,svc,total,zname,timeLabel) => `Bonjour VELOV, j'ai besoin d'une réparation vélo :\n\n• Problème : ${p}\n• Service : ${svc}\n• Prix dès : ${total} CHF\n• Lieu : ${zname}\n• Urgence : ${timeLabel}\n\nQuand pouvez-vous venir ?`,
      waBook: '💬 Réserver via WhatsApp',
      priceMenuTitle: 'Tarifs <span class="accent">transparents</span>',
      priceMenuLead: 'Pas de frais cachés. Prix fixe, juste et clair.',
      featured: '★ Le plus populaire',
      zoneMapTitle: 'Êtes-vous dans <span class="accent">ma zone</span> ?',
      zoneMapLead: 'Cliquez sur votre quartier — voyez instantanément le délai et le prix.',
      zmDesc: (label, eta) => `${label} · ~${eta} min de temps de réponse depuis le message WhatsApp.`,
      zmCityLabel: 'Ville de Zurich',
      zmAggloLabel: 'Agglomération',
      zmFarLabel: 'Zone périphérique',
      zmPriceLabel: 'Déplacement dès CHF',
      zmEtaLabel: 'Temps de réponse',
      zmWaMsg: (zname) => `Bonjour VELOV, je suis à ${zname} et j'ai besoin d'une réparation vélo. Quand pouvez-vous venir ?`,
      proofTitle: 'Ce que disent nos <span class="accent">clients</span>',
      proofSub: '500+ avis · 4,8 étoiles · vérifiés via Google',
      photoStampTitle: 'Envoyez-nous des photos ou vidéos d\'abord',
      photoStampDesc: 'Nous évaluerons, enverrons un devis et réglerons souvent le problème en une seule visite.',
      howTitle: 'Comment ça <span class="accent">fonctionne</span>',
      howLead: 'De la panne à la route en 4 étapes.',
      faqTitle: 'Questions <span class="accent">fréquentes</span>',
      faqLead: 'Les questions les plus courantes — répondues directement.',
      finalH2: 'Prêt ? Votre vélo attend VELOV.',
      finalP: 'Message WhatsApp → réponse en minutes → réparé aujourd\'hui. Dès 49 CHF de déplacement.',
      finalWa: '💬 Réserver maintenant via WhatsApp',
      finalWaMsg: 'Bonjour VELOV, j\'ai besoin d\'une réparation vélo. Quand pouvez-vous venir ?',
      orCall: 'ou appelez :',
      tickerLabel: 'LIVE',
      tickerText: (t, what, where) => `Il y a ${t} : <strong>${what}</strong> terminé à <strong>${where}</strong>`,
    },
    problems: [
      { id: 'platten',   icon: '🛞', label: 'Crevaison / pneu crevé',            price: 99,  time: '30 min',    svc: 'Réparation crevaison tout compris' },
      { id: 'reifen',    icon: '🔄', label: 'Remplacement pneu/enveloppe',       price: 123, time: '40 min',    svc: 'Remplacement pneu' },
      { id: 'bremse',    icon: '🛑', label: 'Réglage freins / plaquettes',       price: 99,  time: '40 min',    svc: 'Service freins' },
      { id: 'schaltung', icon: '⚙️', label: 'Réglage dérailleur',                price: 99,  time: '40 min',    svc: 'Réglage vitesses' },
      { id: 'kette',     icon: '🔗', label: 'Remplacement / lubrification chaîne',price: 99, time: '30 min',    svc: 'Service chaîne' },
      { id: 'standard',  icon: '🔧', label: 'Service Standard',                  price: 179, time: '60–90 min', svc: 'Service Standard' },
      { id: 'premium',   icon: '⭐', label: 'Service Premium (roues incluses)',   price: 229, time: '90–120 min',svc: 'Service Premium' },
      { id: 'ebike',     icon: '⚡', label: 'Service E-Bike (mécanique)',         price: 179, time: '60–90 min', svc: 'Service E-Bike Mécanique' }
    ],
    urgencyOptions: [
      { id: 'jetzt',  label: '🆘 Maintenant' },
      { id: 'heute',  label: '⚡ Aujourd\'hui' },
      { id: 'morgen', label: '📅 Demain'      },
      { id: 'flex',   label: '🗓️ Flexible'    }
    ],
    reviews: [
      { stars: 5, name: 'Michel K.',  area: 'Enge',      text: 'Crevaison en allant au travail. Message WhatsApp — 40 min plus tard VELOV était là. Service parfait.', date: 'il y a 3 jours' },
      { stars: 5, name: 'Sophie M.',  area: 'Wiedikon',  text: 'Service e-bike au bureau. Pas de transport, pas de stress. Mécanicien top !', date: 'il y a 1 semaine' },
      { stars: 5, name: 'Daniel B.',  area: 'Oerlikon',  text: 'Samedi soir, vélo complètement cassé. VELOV en moins d\'une heure. Incroyable !', date: 'il y a 2 semaines' },
      { stars: 5, name: 'Laura R.',   area: 'Seefeld',   text: 'Entretien annuel dans ma cour. Travail impeccable, dérailleur comme neuf.', date: 'il y a 3 semaines' },
      { stars: 5, name: 'Marc P.',    area: 'Schlieren', text: 'Service urgence dimanche — aucun magasin ouvert, VELOV si. Freins réglés en 30 min. Merci !', date: 'il y a 1 mois' },
      { stars: 5, name: 'Anna S.',    area: 'Höngg',     text: 'Chaîne cassée en route. VELOV en 35 min. Nouvelle chaîne, en route !', date: 'il y a 1 mois' }
    ],
    ticker: [
      { t: '14 min',      what: 'Crevaison',      where: 'Enge' },
      { t: '42 min',      what: 'Freins',         where: 'Wiedikon' },
      { t: '1 heure',     what: 'Dérailleur',     where: 'Seefeld' },
      { t: '2 heures',    what: 'Service Standard',where: 'Höngg' },
      { t: '3 heures',    what: 'Pneu',           where: 'Aussersihl' },
      { t: 'hier',        what: 'Service Premium', where: 'Kilchberg' }
    ],
    trust: [
      { k: '1\'200+', v: 'Réparations à Zurich' },
      { k: '4.8 ⭐',  v: 'Avis Google' },
      { k: '🚴‍♂️',    v: 'Mobile à vélo & cargo bike' },
      { k: 'Max 8',   v: 'Rendez-vous par jour' }
    ],
    faqs: [
      { q: 'En combien de temps VELOV arrive-t-il à Zurich ?', a: 'Dans la ville de Zurich, en 45 minutes maximum — souvent 30–35 min. Réservation le jour même.' },
      { q: 'Combien coûte une réparation vélo à Zurich ?', a: 'Déplacement fixe 49 CHF. Basic Check 79 CHF. Service Standard 179 CHF. Service Premium 229 CHF.' },
      { q: 'VELOV vient-il le week-end ou le soir ?', a: 'Oui — 7 jours sur 7, y compris les soirs et week-ends.' },
      { q: 'Puis-je obtenir un devis à l\'avance ?', a: 'Absolument ! Envoyez des photos ou une vidéo via WhatsApp. Nous ferons un devis avant de venir.' },
      { q: 'VELOV répare-t-il les e-bikes ?', a: 'Oui — composants mécaniques de toutes marques. Pas de travaux batterie, moteur ou logiciel.' },
      { q: 'Comment payer ?', a: 'TWINT, espèces, carte ou facture.' }
    ],
    howSteps: [
      { n: 1, icon: '📱', t: 'WhatsApp ou appel',              d: 'Dites-nous ce qui est cassé. Réponse en quelques minutes.' },
      { n: 2, icon: '📸', t: 'Envoyez une photo ou vidéo',     d: 'Recommandé : envoyez des images/vidéos. Nous faisons un devis immédiatement.' },
      { n: 3, icon: '🚴‍♂️', t: 'Nous venons à vélo',            d: 'Le mécanicien vient chez vous — max 45 min en ville.' },
      { n: 4, icon: '✅', t: 'Réparé & de nouveau en route',   d: 'Réparé sur place. Paiement par TWINT, carte ou facture.' }
    ],
    priceItems: [
      { name: 'Déplacement ville Zurich', val: '49 CHF',  desc: 'Prix fixe de déplacement',  incl: ['Toujours transparent', 'Sans surprise'] },
      { name: 'Réparation crevaison',     val: '99 CHF',  desc: 'Chambre + déplacement incl.',incl: ['Déplacement inclus', 'Nouvelle chambre', 'Contrôle 30 pts'], featured: true },
      { name: 'Service Standard',         val: '179 CHF', desc: 'Entretien complet',          incl: ['Freins', 'Vitesses', 'Chaîne', 'Éclairage'] },
      { name: 'Service Premium',          val: '229 CHF', desc: 'Roues comprises',            incl: ['Tout du Standard', 'Voilage roues', 'Contrôle roulements'] }
    ]
  },

  /* -------- ITALIANO -------- */
  it: {
    seo: {
      id: 'home-it',
      h1: 'Riparazione Biciclette Mobile Zurigo – Veniamo da te, la tua bici resta dove si trova',
      intro: 'VELOV è l\'officina mobile per biciclette a Zurigo. Ripariamo la tua bici, e-bike o cargo bike direttamente in loco — a casa, in ufficio, al lago. 500+ recensioni Google, 4,8 stelle. Riparazione foratura da CHF 99 incluso trasporto.',
      sections: [
        { h2: 'Officina Mobile Biciclette Zurigo – Servizio a Domicilio', body: 'VELOV è il servizio di riparazione biciclette mobile più apprezzato di Zurigo. Invece di portare la tua bici in officina, veniamo da te con una bici di servizio completamente attrezzata.' },
        { h2: 'I Nostri Servizi Bici a Zurigo', body: 'Riparazione foratura (CHF 99 tutto incluso), Mini Service (CHF 149), Full Service (CHF 179), servizio e-bike, servizio cargo bike, regolazione freni, regolazione cambio, sostituzione catena, smaltimento biciclette.' },
        { h2: 'Area di Servizio: Città di Zurigo & Agglomerato', body: 'Copriamo tutti i 12 distretti di Zurigo più Schlieren, Kilchberg, Zollikon, Thalwil e altro.' },
        { h2: 'Perché VELOV?', body: 'La tua bici rimane dove si trova. Risposta entro 60 min per forature d\'emergenza. 500+ recensioni Google verificate, 4,8 stelle. Pagamento TWINT in loco. Prezzi trasparenti.' }
      ],
      faqs: [
        { q: 'In quanto tempo potete venire?', a: 'Per forature d\'emergenza nella città di Zurigo, di solito entro 60 minuti.' },
        { q: 'Devo essere a casa?', a: 'No. Lascia la bici accessibile e ti manderemo una foto dopo la riparazione.' },
        { q: 'Riparate gli e-bike?', a: 'Sì — meccanicamente, tutte le marche. L\'elettronica di batteria/motore la lasciamo alle officine autorizzate.' },
        { q: 'Quanto costa riparare una foratura?', a: 'CHF 99 tutto incluso: trasporto, camera d\'aria nuova, controllo sicurezza.' },
        { q: 'Come si paga?', a: 'TWINT (preferito), contanti, o fattura su richiesta.' }
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurigo',
      schema: [{"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Officina Mobile Biciclette Zurigo","url":"https://www.velov.ch/it","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurigo","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"it"}]
    },
    ui: {
      faqLabel: 'Domande frequenti',
      contactLabel: 'Contatto',
      liveAvail: (hh,mm) => `Disponibile — prossimo slot oggi alle ${hh}:${mm}`,
      liveOff: 'Servizio emergenza disponibile — risposta ~90 min',
      heroH1: 'Bici rotta a Zurigo?<br/>Veniamo da te — in bici & cargo bike.',
      heroSub: 'Riparazione bici mobile in tutta Zurigo. Trasparente: <strong>Trasferta 49 CHF</strong>, riparazione foratura <strong>99 CHF</strong>, Servizio Standard <strong>179 CHF</strong>, Servizio Premium <strong>229 CHF</strong>.',
      ctaWhatsapp: '💬 WhatsApp · Risposta in 5 min',
      ctaPrice: '⚡ Ottieni il prezzo in 30 sec',
      waMsg: 'Ciao VELOV, ho bisogno di una riparazione bici a Zurigo.',
      estimatorTitle: 'Ottieni il tuo prezzo in <span class="accent">30 secondi</span>',
      estimatorLead: 'Dicci qual è il problema e dove sei — prezzo istantaneo, tempo di risposta e link di prenotazione WhatsApp.',
      step1: 'Qual è il problema?',
      step2: 'Dove sei?',
      step3: 'Quanto è urgente?',
      priceFrom: 'Prezzo da',
      duration: 'Durata',
      onsite: 'in loco',
      eta: 'Tempo di risposta',
      zone: 'Zona',
      resPriceDesc: (label) => `${label} — tutto incluso. Prezzo trasparente, nessuna sorpresa.`,
      priceSub: 'trasferta Zurigo città inclusa',
      umlandSub: (s) => `+ ${s} CHF supplemento agglomerato`,
      waResMsg: (p,svc,total,zname,timeLabel) => `Ciao VELOV, ho bisogno di una riparazione bici:\n\n• Problema: ${p}\n• Servizio: ${svc}\n• Prezzo da: CHF ${total}\n• Posizione: ${zname}\n• Urgenza: ${timeLabel}\n\nQuando puoi venire?`,
      waBook: '💬 Prenota via WhatsApp',
      priceMenuTitle: 'Prezzi <span class="accent">trasparenti</span>',
      priceMenuLead: 'Nessun costo nascosto. Prezzo fisso, equo e chiaro.',
      featured: '★ Il più popolare',
      zoneMapTitle: 'Sei nella <span class="accent">mia zona</span>?',
      zoneMapLead: 'Clicca sul tuo quartiere — vedi subito il tempo di trasferta e il prezzo.',
      zmDesc: (label, eta) => `${label} · ~${eta} min di tempo di risposta dal messaggio WhatsApp.`,
      zmCityLabel: 'Città di Zurigo',
      zmAggloLabel: 'Agglomerato',
      zmFarLabel: 'Zona periferica',
      zmPriceLabel: 'Trasferta da CHF',
      zmEtaLabel: 'Tempo di risposta',
      zmWaMsg: (zname) => `Ciao VELOV, sono a ${zname} e ho bisogno di una riparazione bici. Quando puoi venire?`,
      proofTitle: 'Cosa dicono i nostri <span class="accent">clienti</span>',
      proofSub: '500+ recensioni · 4,8 stelle · verificate via Google',
      photoStampTitle: 'Mandaci prima foto o video',
      photoStampDesc: 'Valutiamo, inviamo un preventivo e spesso risolviamo tutto in una sola visita. Nessuna sorpresa.',
      howTitle: 'Come <span class="accent">funziona</span>',
      howLead: 'Da rotta a in marcia in 4 passi.',
      faqTitle: 'Domande <span class="accent">frequenti</span>',
      faqLead: 'Le domande più comuni — risposte dirette.',
      finalH2: 'Pronto? La tua bici aspetta VELOV.',
      finalP: 'Messaggio WhatsApp → risposta in minuti → riparata oggi. Da 49 CHF di trasferta.',
      finalWa: '💬 Prenota ora via WhatsApp',
      finalWaMsg: 'Ciao VELOV, ho bisogno di una riparazione bici. Quando puoi venire?',
      orCall: 'o chiama:',
      tickerLabel: 'LIVE',
      tickerText: (t, what, where) => `${t} fa: <strong>${what}</strong> completato a <strong>${where}</strong>`,
    },
    problems: [
      { id: 'platten',   icon: '🛞', label: 'Foratura / pneumatico bucato',      price: 99,  time: '30 min',    svc: 'Riparazione foratura tutto incluso' },
      { id: 'reifen',    icon: '🔄', label: 'Sostituzione copertone',            price: 123, time: '40 min',    svc: 'Sostituzione pneumatico' },
      { id: 'bremse',    icon: '🛑', label: 'Regolazione freni / pastiglie',     price: 99,  time: '40 min',    svc: 'Servizio freni' },
      { id: 'schaltung', icon: '⚙️', label: 'Regolazione cambio',                price: 99,  time: '40 min',    svc: 'Regolazione cambio' },
      { id: 'kette',     icon: '🔗', label: 'Sostituzione / lubrificazione catena',price: 99, time: '30 min',    svc: 'Servizio catena' },
      { id: 'standard',  icon: '🔧', label: 'Servizio Standard',                 price: 179, time: '60–90 min', svc: 'Servizio Standard' },
      { id: 'premium',   icon: '⭐', label: 'Servizio Premium (incl. centratura ruote)', price: 229, time: '90–120 min', svc: 'Servizio Premium' },
      { id: 'ebike',     icon: '⚡', label: 'Servizio E-Bike (meccanico)',        price: 179, time: '60–90 min', svc: 'Servizio E-Bike Meccanico' }
    ],
    urgencyOptions: [
      { id: 'jetzt',  label: '🆘 Adesso'     },
      { id: 'heute',  label: '⚡ Oggi'       },
      { id: 'morgen', label: '📅 Domani'     },
      { id: 'flex',   label: '🗓️ Flessibile' }
    ],
    reviews: [
      { stars: 5, name: 'Michele K.', area: 'Enge',      text: 'Foratura andando al lavoro. Messaggio WhatsApp — 40 min dopo VELOV era alla mia porta. Servizio perfetto.', date: '3 giorni fa' },
      { stars: 5, name: 'Sara M.',    area: 'Wiedikon',  text: 'Servizio e-bike in ufficio. Nessun trasporto, nessuno stress. Meccanico ottimo!', date: '1 settimana fa' },
      { stars: 5, name: 'Daniele B.', area: 'Oerlikon',  text: 'Sabato sera, bici completamente rotta. VELOV in meno di un\'ora. Straordinario!', date: '2 settimane fa' },
      { stars: 5, name: 'Laura R.',   area: 'Seefeld',   text: 'Manutenzione annuale nel cortile. Lavoro impeccabile, cambio come nuovo.', date: '3 settimane fa' },
      { stars: 5, name: 'Marco P.',   area: 'Schlieren', text: 'Servizio emergenza domenica — nessun negozio aperto, VELOV sì. Freni sistemati in 30 min. Grazie!', date: '1 mese fa' },
      { stars: 5, name: 'Anna S.',    area: 'Höngg',     text: 'Catena rotta a metà strada. VELOV in 35 min. Nuova catena, via!', date: '1 mese fa' }
    ],
    ticker: [
      { t: '14 min',   what: 'Foratura',        where: 'Enge' },
      { t: '42 min',   what: 'Freni',           where: 'Wiedikon' },
      { t: '1 ora',    what: 'Cambio',          where: 'Seefeld' },
      { t: '2 ore',    what: 'Servizio Standard',where: 'Höngg' },
      { t: '3 ore',    what: 'Pneumatico',      where: 'Aussersihl' },
      { t: 'ieri',     what: 'Servizio Premium', where: 'Kilchberg' }
    ],
    trust: [
      { k: '1.200+', v: 'Riparazioni a Zurigo' },
      { k: '4.8 ⭐', v: 'Recensioni Google' },
      { k: '🚴‍♂️',   v: 'Mobile in bici & cargo bike' },
      { k: 'Max 8',  v: 'Appuntamenti al giorno' }
    ],
    faqs: [
      { q: 'In quanto tempo VELOV arriva a Zurigo?', a: 'Nella città di Zurigo, entro 45 minuti al massimo — spesso 30–35 min. Prenotazione in giornata.' },
      { q: 'Quanto costa una riparazione bici a Zurigo?', a: 'Trasferta fissa 49 CHF. Basic Check 79 CHF. Servizio Standard 179 CHF. Servizio Premium 229 CHF.' },
      { q: 'VELOV viene anche nel weekend o la sera?', a: 'Sì — 7 giorni su 7, anche la sera e il fine settimana.' },
      { q: 'Posso avere un preventivo in anticipo?', a: 'Certo! Manda foto o un breve video via WhatsApp. Faremo un preventivo prima di venire.' },
      { q: 'VELOV ripara gli e-bike?', a: 'Sì — componenti meccanici di tutte le marche. Nessun lavoro su batteria, motore o software.' },
      { q: 'Come si paga?', a: 'TWINT, contanti, carta o fattura.' }
    ],
    howSteps: [
      { n: 1, icon: '📱', t: 'WhatsApp o chiama',              d: 'Dicci cosa è rotto. Risposta in pochi minuti.' },
      { n: 2, icon: '📸', t: 'Manda una foto o video',          d: 'Consigliato: manda immagini/video. Facciamo subito un preventivo.' },
      { n: 3, icon: '🚴‍♂️', t: 'Veniamo in bici',               d: 'Il meccanico viene da te — max 45 min in città.' },
      { n: 4, icon: '✅', t: 'Riparata & di nuovo in marcia',   d: 'Riparata in loco. Pagamento con TWINT, carta o fattura.' }
    ],
    priceItems: [
      { name: 'Trasferta Città Zurigo', val: '49 CHF',  desc: 'Tariffa fissa trasferta',    incl: ['Sempre trasparente', 'Nessuna sorpresa'] },
      { name: 'Riparazione foratura',   val: '99 CHF',  desc: 'Camera + trasferta inclusa', incl: ['Trasferta inclusa', 'Camera nuova', 'Controllo 30 pt'], featured: true },
      { name: 'Servizio Standard',      val: '179 CHF', desc: 'Manutenzione completa',      incl: ['Freni', 'Cambio', 'Catena', 'Luci'] },
      { name: 'Servizio Premium',       val: '229 CHF', desc: 'Centratura ruote inclusa',   incl: ['Tutto del Standard', 'Centratura ruote', 'Controllo cuscinetti'] }
    ]
  },

  /* -------- ESPAÑOL -------- */
  es: {
    seo: {
      id: 'home-es',
      h1: 'Reparación de Bicicletas Zúrich – Mecánico Móvil a Domicilio',
      intro: 'VELOV es el taller de bicicletas móvil en Zúrich. Reparamos tu bici, e-bike o cargo bike directamente donde estés — en casa, en la oficina, en el lago. 500+ reseñas en Google, 4,8 estrellas. Reparación de pinchazos desde CHF 99 desplazamiento incluido.',
      sections: [
        { h2: 'Taller de Bicicletas Móvil Zúrich – Servicio a Domicilio', body: 'VELOV es el servicio de reparación de bicicletas móvil mejor valorado de Zúrich. En lugar de llevar tu bici al taller, vamos nosotros a ti con una bici de servicio totalmente equipada.' },
        { h2: 'Nuestros Servicios de Bici en Zúrich', body: 'Reparación de pinchazos (CHF 99 todo incluido), Mini Service (CHF 149), Full Service (CHF 179), servicio e-bike, servicio cargo bike, ajuste de frenos, regulación del cambio, sustitución de cadena, retirada de bicicletas.' },
        { h2: 'Zona de Servicio: Ciudad de Zúrich & Área Metropolitana', body: 'Cubrimos los 12 distritos de Zúrich más Schlieren, Kilchberg, Zollikon, Thalwil y más.' },
        { h2: '¿Por qué VELOV?', body: 'Tu bici se queda donde está. Tiempo de respuesta menor a 60 minutos para emergencias. 500+ reseñas Google verificadas, 4,8 estrellas. Pago TWINT en el sitio. Precios transparentes.' }
      ],
      faqs: [
        { q: '¿En cuánto tiempo llegáis?', a: 'Para emergencias de pinchazo en la ciudad de Zúrich, normalmente en menos de 60 minutos.' },
        { q: '¿Tengo que estar en casa?', a: 'No. Solo deja la bici accesible y te enviamos una foto después de la reparación.' },
        { q: '¿Reparáis e-bikes?', a: 'Sí — mecánicamente, todas las marcas. La electrónica de batería/motor la dejamos a los talleres oficiales.' },
        { q: '¿Cuánto cuesta una reparación de pinchazo?', a: 'CHF 99 todo incluido: desplazamiento, cámara nueva, control de seguridad.' },
        { q: '¿Cómo puedo pagar?', a: 'TWINT (preferido), efectivo, o factura bajo petición.' }
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zúrich',
      schema: [{"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Taller de Bicicletas Móvil Zúrich","url":"https://www.velov.ch/es","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zúrich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"es"}]
    },
    ui: {
      faqLabel: 'Preguntas frecuentes',
      contactLabel: 'Contacto',
      liveAvail: (hh,mm) => `Disponible — próximo horario hoy a las ${hh}:${mm}`,
      liveOff: 'Servicio de emergencia disponible — respuesta ~90 min',
      heroH1: '¿Bici rota en Zúrich?<br/>Vamos a donde estés — en bici & cargo bike.',
      heroSub: 'Reparación de bicicletas móvil en todo Zúrich. Transparente: <strong>Desplazamiento 49 CHF</strong>, reparación pinchazo <strong>99 CHF</strong>, Servicio Estándar <strong>179 CHF</strong>, Servicio Premium <strong>229 CHF</strong>.',
      ctaWhatsapp: '💬 WhatsApp · Respuesta en 5 min',
      ctaPrice: '⚡ Obtén precio en 30 seg',
      waMsg: 'Hola VELOV, necesito una reparación de bici en Zúrich.',
      estimatorTitle: 'Obtén tu precio en <span class="accent">30 segundos</span>',
      estimatorLead: 'Dinos qué falla y dónde estás — precio instantáneo, tiempo estimado y enlace de reserva WhatsApp.',
      step1: '¿Cuál es el problema?',
      step2: '¿Dónde estás?',
      step3: '¿Qué urgencia tiene?',
      priceFrom: 'Precio desde',
      duration: 'Duración',
      onsite: 'in situ',
      eta: 'Tiempo de respuesta',
      zone: 'Zona',
      resPriceDesc: (label) => `${label} — todo incluido. Precio transparente, sin sorpresas.`,
      priceSub: 'desplazamiento Zúrich ciudad incluido',
      umlandSub: (s) => `+ ${s} CHF suplemento agglomeración`,
      waResMsg: (p,svc,total,zname,timeLabel) => `Hola VELOV, necesito una reparación de bici:\n\n• Problema: ${p}\n• Servicio: ${svc}\n• Precio desde: CHF ${total}\n• Ubicación: ${zname}\n• Urgencia: ${timeLabel}\n\n¿Cuándo puedes venir?`,
      waBook: '💬 Reservar por WhatsApp',
      priceMenuTitle: 'Precios <span class="accent">transparentes</span>',
      priceMenuLead: 'Sin cargos ocultos. Precio fijo, justo y claro.',
      featured: '★ El más popular',
      zoneMapTitle: '¿Estás en <span class="accent">mi zona</span>?',
      zoneMapLead: 'Haz clic en tu barrio — ve al instante el tiempo de llegada y el precio.',
      zmDesc: (label, eta) => `${label} · ~${eta} min de tiempo de respuesta desde el mensaje WhatsApp.`,
      zmCityLabel: 'Ciudad de Zúrich',
      zmAggloLabel: 'Área metropolitana',
      zmFarLabel: 'Zona periférica',
      zmPriceLabel: 'Desplazamiento desde CHF',
      zmEtaLabel: 'Tiempo de respuesta',
      zmWaMsg: (zname) => `Hola VELOV, estoy en ${zname} y necesito una reparación de bici. ¿Cuándo puedes venir?`,
      proofTitle: 'Lo que dicen nuestros <span class="accent">clientes</span>',
      proofSub: '500+ reseñas · 4,8 estrellas · verificadas en Google',
      photoStampTitle: 'Envíanos fotos o vídeos primero',
      photoStampDesc: 'Evaluamos, enviamos un presupuesto y a menudo lo resolvemos en una sola visita. Sin sorpresas.',
      howTitle: 'Cómo <span class="accent">funciona</span>',
      howLead: 'De rota a en marcha en 4 pasos.',
      faqTitle: 'Preguntas <span class="accent">frecuentes</span>',
      faqLead: 'Las preguntas más comunes — respondidas directamente.',
      finalH2: '¿Listo? Tu bici espera a VELOV.',
      finalP: 'Mensaje WhatsApp → respuesta en minutos → reparada hoy. Desde 49 CHF de desplazamiento.',
      finalWa: '💬 Reservar ahora por WhatsApp',
      finalWaMsg: 'Hola VELOV, necesito una reparación de bici. ¿Cuándo puedes venir?',
      orCall: 'o llama:',
      tickerLabel: 'LIVE',
      tickerText: (t, what, where) => `Hace ${t}: <strong>${what}</strong> completado en <strong>${where}</strong>`,
    },
    problems: [
      { id: 'platten',   icon: '🛞', label: 'Pinchazo / neumático pinchado',     price: 99,  time: '30 min',    svc: 'Reparación pinchazo todo incluido' },
      { id: 'reifen',    icon: '🔄', label: 'Sustitución cubierta/neumático',    price: 123, time: '40 min',    svc: 'Sustitución neumático' },
      { id: 'bremse',    icon: '🛑', label: 'Ajuste frenos / pastillas',         price: 99,  time: '40 min',    svc: 'Servicio frenos' },
      { id: 'schaltung', icon: '⚙️', label: 'Regulación del cambio',             price: 99,  time: '40 min',    svc: 'Puesta a punto cambio' },
      { id: 'kette',     icon: '🔗', label: 'Sustitución / lubricación cadena',  price: 99,  time: '30 min',    svc: 'Servicio cadena' },
      { id: 'standard',  icon: '🔧', label: 'Servicio Estándar',                 price: 179, time: '60–90 min', svc: 'Servicio Estándar' },
      { id: 'premium',   icon: '⭐', label: 'Servicio Premium (incl. centrado ruedas)', price: 229, time: '90–120 min', svc: 'Servicio Premium' },
      { id: 'ebike',     icon: '⚡', label: 'Servicio E-Bike (mecánico)',         price: 179, time: '60–90 min', svc: 'Servicio E-Bike Mecánico' }
    ],
    urgencyOptions: [
      { id: 'jetzt',  label: '🆘 Ahora'      },
      { id: 'heute',  label: '⚡ Hoy'        },
      { id: 'morgen', label: '📅 Mañana'     },
      { id: 'flex',   label: '🗓️ Flexible'   }
    ],
    reviews: [
      { stars: 5, name: 'Miguel K.',  area: 'Enge',      text: 'Pinchazo de camino al trabajo. WhatsApp — 40 min después VELOV en mi puerta. Servicio perfecto.', date: 'hace 3 días' },
      { stars: 5, name: 'Sara M.',    area: 'Wiedikon',  text: 'Servicio e-bike en la oficina. Sin transporte, sin estrés. ¡Mecánico de primera!', date: 'hace 1 semana' },
      { stars: 5, name: 'Daniel B.',  area: 'Oerlikon',  text: 'Sábado a las 19h, bici completamente rota. VELOV en menos de una hora. ¡Increíble!', date: 'hace 2 semanas' },
      { stars: 5, name: 'Laura R.',   area: 'Seefeld',   text: 'Mantenimiento anual en mi patio. Trabajo impecable, cambio como nuevo.', date: 'hace 3 semanas' },
      { stars: 5, name: 'Marcos P.',  area: 'Schlieren', text: 'Servicio urgente domingo — ninguna tienda abierta, VELOV sí. Frenos listos en 30 min. ¡Gracias!', date: 'hace 1 mes' },
      { stars: 5, name: 'Ana S.',     area: 'Höngg',     text: 'Cadena rota a mitad de camino. VELOV en 35 min. Nueva cadena, ¡en marcha!', date: 'hace 1 mes' }
    ],
    ticker: [
      { t: '14 min',   what: 'Pinchazo',        where: 'Enge' },
      { t: '42 min',   what: 'Frenos',          where: 'Wiedikon' },
      { t: '1 hora',   what: 'Cambio',          where: 'Seefeld' },
      { t: '2 horas',  what: 'Servicio Estándar',where: 'Höngg' },
      { t: '3 horas',  what: 'Neumático',       where: 'Aussersihl' },
      { t: 'ayer',     what: 'Servicio Premium', where: 'Kilchberg' }
    ],
    trust: [
      { k: '1.200+', v: 'Reparaciones en Zúrich' },
      { k: '4,8 ⭐', v: 'Reseñas Google' },
      { k: '🚴‍♂️',   v: 'Móvil en bici & cargo bike' },
      { k: 'Máx 8',  v: 'Citas por día' }
    ],
    faqs: [
      { q: '¿En cuánto tiempo llega VELOV a Zúrich?', a: 'Dentro de la ciudad de Zúrich, en 45 minutos como máximo — a menudo 30–35 min. Reservas el mismo día.' },
      { q: '¿Cuánto cuesta una reparación de bici en Zúrich?', a: 'Desplazamiento fijo 49 CHF. Basic Check 79 CHF. Servicio Estándar 179 CHF. Servicio Premium 229 CHF.' },
      { q: '¿VELOV viene los fines de semana o por la tarde?', a: 'Sí — 7 días a la semana, incluyendo tardes y fines de semana.' },
      { q: '¿Puedo obtener un presupuesto previo?', a: '¡Por supuesto! Envía fotos o un vídeo por WhatsApp. Haremos un presupuesto antes de ir.' },
      { q: '¿VELOV repara e-bikes?', a: 'Sí — componentes mecánicos de todas las marcas. Sin trabajos de batería, motor ni software.' },
      { q: '¿Cómo pago?', a: 'TWINT, efectivo, tarjeta o factura.' }
    ],
    howSteps: [
      { n: 1, icon: '📱', t: 'WhatsApp o llama',                d: 'Cuéntanos qué está roto. Respuesta en minutos.' },
      { n: 2, icon: '📸', t: 'Envía foto o vídeo',              d: 'Recomendado: manda imágenes/vídeo. Hacemos un presupuesto al instante.' },
      { n: 3, icon: '🚴‍♂️', t: 'Venimos en bici',               d: 'El mecánico va a tu ubicación — máx 45 min en la ciudad.' },
      { n: 4, icon: '✅', t: 'Reparada & de nuevo en marcha',   d: 'Reparada in situ. Pago con TWINT, tarjeta o factura.' }
    ],
    priceItems: [
      { name: 'Desplazamiento ciudad Zúrich', val: '49 CHF',  desc: 'Tarifa fija de desplazamiento', incl: ['Siempre transparente', 'Sin sorpresas'] },
      { name: 'Reparación pinchazo',          val: '99 CHF',  desc: 'Cámara + desplazamiento incl.', incl: ['Desplazamiento incluido', 'Cámara nueva', 'Control 30 pts'], featured: true },
      { name: 'Servicio Estándar',            val: '179 CHF', desc: 'Mantenimiento completo',        incl: ['Frenos', 'Cambio', 'Cadena', 'Luces'] },
      { name: 'Servicio Premium',             val: '229 CHF', desc: 'Centrado ruedas incluido',      incl: ['Todo del Estándar', 'Centrado ruedas', 'Control rodamientos'] }
    ]
  }
};

/* ===================================================================
   SHARED ZONES (same in all languages — neighbourhood names stay as-is)
   =================================================================== */
const VELOV_ZONES = [
  { slug: 'enge',              name: 'Enge',              type: 'stadt',  eta: 35, surcharge: 0  },
  { slug: 'wollishofen',       name: 'Wollishofen',       type: 'stadt',  eta: 40, surcharge: 0  },
  { slug: 'leimbach',          name: 'Leimbach',          type: 'stadt',  eta: 45, surcharge: 0  },
  { slug: 'wiedikon',          name: 'Wiedikon',          type: 'stadt',  eta: 35, surcharge: 0  },
  { slug: 'aussersihl',        name: 'Aussersihl',        type: 'stadt',  eta: 30, surcharge: 0  },
  { slug: 'industriequartier', name: 'Industriequartier', type: 'stadt',  eta: 30, surcharge: 0  },
  { slug: 'schwamendingen',    name: 'Schwamendingen',    type: 'stadt',  eta: 45, surcharge: 0  },
  { slug: 'oerlikon',          name: 'Oerlikon',          type: 'stadt',  eta: 40, surcharge: 0  },
  { slug: 'hoengg',            name: 'Höngg',             type: 'stadt',  eta: 45, surcharge: 0  },
  { slug: 'affoltern',         name: 'Affoltern',         type: 'stadt',  eta: 45, surcharge: 0  },
  { slug: 'seefeld',           name: 'Seefeld',           type: 'stadt',  eta: 35, surcharge: 0  },
  { slug: 'witikon',           name: 'Witikon',           type: 'stadt',  eta: 45, surcharge: 0  },
  { slug: 'hirslanden',        name: 'Hirslanden',        type: 'stadt',  eta: 40, surcharge: 0  },
  { slug: 'schlieren',         name: 'Schlieren',         type: 'umland', eta: 60, surcharge: 20 },
  { slug: 'kilchberg',         name: 'Kilchberg',         type: 'umland', eta: 60, surcharge: 20 },
  { slug: 'opfikon',           name: 'Opfikon',           type: 'umland', eta: 60, surcharge: 20 },
  { slug: 'wallisellen',       name: 'Wallisellen',       type: 'umland', eta: 65, surcharge: 20 },
  { slug: 'zollikon',          name: 'Zollikon',          type: 'umland', eta: 55, surcharge: 20 },
  { slug: 'glattbrugg',        name: 'Glattbrugg',        type: 'umland', eta: 65, surcharge: 20 },
  { slug: 'thalwil',           name: 'Thalwil',           type: 'umland', eta: 65, surcharge: 20 }
];

const VELOV_PRICING = {
  anfahrtStadt: 49,
  schlauch: 15,
  reifenArbeit: 39,
  plattenAllIn: 99,
  serviceStandard: 179,
  servicePremium: 229,
  basicCheck: 79
};

const VELOV_CONTACT = {
  phone: '+41762352126',
  phoneDisplay: '+41 76 235 21 26',
  whatsapp: '41762352126',
  email: 'info@velov.ch'
};

/* ===================================================================
   LANGUAGE DETECTION
   Tries Wix Multilingual API first, then falls back to URL/browser
   =================================================================== */
function detectVelovLang() {
  // 1. Try Wix Multilingual API (works in Wix custom elements via wix-window-frontend)
  try {
    if (window.wixDevelopersAnalytics && window.wixDevelopersAnalytics.currentLanguage) {
      return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2);
    }
  } catch(e) {}

  // 2. Try document language attribute (Wix sets this)
  try {
    const docLang = document.documentElement.lang || document.documentElement.getAttribute('xml:lang') || '';
    if (docLang) return docLang.toLowerCase().substring(0,2);
  } catch(e) {}

  // 3. Try URL path — Wix multilingual uses /en, /fr, /it, /es prefix
  try {
    const path = window.location.pathname;
    const match = path.match(/^\/(en|fr|it|es)(\/|$)/i);
    if (match) return match[1].toLowerCase();
  } catch(e) {}

  // 4. Fall back to browser language
  try {
    const nav = (navigator.language || navigator.userLanguage || 'de').toLowerCase().substring(0,2);
    if (['en','fr','it','es'].includes(nav)) return nav;
  } catch(e) {}

  return 'de'; // default primary
}

/* ===================================================================
   CUSTOM ELEMENT
   =================================================================== */
class VelovHome extends HTMLElement {
  constructor() {
    super();
    this.state = {
      est: { problem: null, zone: null, time: 'heute' },
      proofIdx: 0,
      tickerIdx: 0
    };
    this._ticks = [];
    // Detect language once at construction time
    this._lang = detectVelovLang();
    // Validate — fall back to 'de' if unknown
    if (!VELOV_LANG[this._lang]) this._lang = 'de';
  }

  get L() { return VELOV_LANG[this._lang]; }
  get UI() { return this.L.ui; }

  connectedCallback() {
    const L = this.L;
    try {
      window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(
        this, L.seo, L.ui.faqLabel, L.ui.contactLabel
      );
    } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this, this._lang); } catch(e) {}

    this.injectStyles();
    this.render();
    this.bindEvents();
    this.startLoops();
  }

  disconnectedCallback() {
    this._ticks.forEach(clearInterval);
    this._ticks = [];
  }

  /* =============== STYLES =============== */
  injectStyles() {
    if (document.getElementById('velov-home-styles')) return;
    const style = document.createElement('style');
    style.id = 'velov-home-styles';
    style.textContent = `
      velov-home { display: block; width: 100%; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2B3D; box-sizing: border-box; }
      velov-home *, velov-home *::before, velov-home *::after { box-sizing: border-box; }
      .vh-wrap { max-width: 1200px; margin: 0 auto; padding: 56px 24px 128px; background: #F5F0EB; }
      .vh-hero { background: linear-gradient(135deg, #7B68EE 0%, #9B88FF 60%, #B9AEFF 100%); color: #fff; padding: 128px 40px 112px; border-radius: 28px; text-align: center; position: relative; overflow: hidden; margin-bottom: 96px; }
      .vh-hero::before { content: ''; position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(232,87,58,.3), transparent); border-radius: 50%; }
      .vh-hero h1 { font-size: 3.2rem; font-weight: 800; letter-spacing: -1.2px; margin: 0 0 28px; position: relative; line-height: 1.1; }
      .vh-hero .sub { font-size: 1.25rem; opacity: .95; margin: 0 auto 40px; max-width: 640px; position: relative; line-height: 1.55; }
      .vh-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
      .vh-btn { padding: 16px 32px; border-radius: 999px; font-weight: 800; text-decoration: none; transition: transform .2s, box-shadow .2s; font-size: 1.05rem; display: inline-flex; align-items: center; gap: 8px; border: 0; cursor: pointer; font-family: inherit; }
      .vh-btn-primary { background: #E8573A; color: #fff; box-shadow: 0 10px 30px rgba(232,87,58,.4); }
      .vh-btn-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 36px rgba(232,87,58,.5); }
      .vh-btn-ghost { background: rgba(255,255,255,.12); color: #fff; border: 2px solid rgba(255,255,255,.3); }
      .vh-btn-ghost:hover { background: rgba(255,255,255,.25); }
      .vh-live { display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; background: rgba(255,255,255,.15); border-radius: 999px; margin-bottom: 20px; font-size: .95rem; font-weight: 600; position: relative; backdrop-filter: blur(10px); }
      .vh-dot { width: 10px; height: 10px; border-radius: 50%; background: #4ADE80; box-shadow: 0 0 0 0 rgba(74,222,128,.7); animation: vhPulse 2s infinite; }
      .vh-dot.off { background: #FACC15; animation: none; }
      @keyframes vhPulse { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,.7); } 70% { box-shadow: 0 0 0 10px rgba(74,222,128,0); } 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); } }
      .vh-trust { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 96px; }
      .vh-tr { background: #fff; padding: 20px; border-radius: 14px; text-align: center; box-shadow: 0 2px 10px rgba(45,43,61,.06); }
      .vh-tr .k { font-size: 1.6rem; font-weight: 800; color: #7B68EE; display: block; line-height: 1; }
      .vh-tr .v { font-size: .85rem; color: #666; margin-top: 6px; display: block; }
      @media (max-width: 700px) { .vh-trust { grid-template-columns: repeat(2, 1fr); } }
      .vh-ticker { background: #2D2B3D; color: #fff; padding: 14px 20px; border-radius: 999px; display: flex; align-items: center; gap: 14px; margin-bottom: 32px; overflow: hidden; font-size: .95rem; }
      .vh-ticker .tlabel { background: #E8573A; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: .75rem; font-weight: 800; letter-spacing: .5px; text-transform: uppercase; flex-shrink: 0; }
      .vh-ticker-content { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .vh-ticker-content strong { color: #E8573A; }
      .vh-section { margin-bottom: 128px; }
      .vh-h2 { font-size: 2.25rem; font-weight: 800; color: #2D2B3D; margin: 0 0 16px; letter-spacing: -0.5px; line-height: 1.15; }
      .vh-h2 .accent { color: #E8573A; }
      .vh-lead { color: #666; margin: 0 0 40px; font-size: 1.1rem; max-width: 640px; line-height: 1.55; }
      .vh-est { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 8px 30px rgba(45,43,61,.1); }
      .vh-est-step { font-size: .8rem; color: #7B68EE; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px; display: flex; align-items: center; gap: 8px; }
      .vh-est-step .num { background: #7B68EE; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: .8rem; }
      .vh-probs { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 24px; }
      .vh-prob { padding: 16px; border-radius: 14px; border: 2px solid #E8E3D9; background: #fff; cursor: pointer; text-align: left; transition: all .2s; font-family: inherit; }
      .vh-prob:hover { border-color: #7B68EE; transform: translateY(-2px); }
      .vh-prob.selected { border-color: #E8573A; background: #FFF5F0; }
      .vh-prob .icon { font-size: 1.5rem; display: block; margin-bottom: 6px; }
      .vh-prob .label { font-weight: 700; color: #2D2B3D; font-size: .95rem; }
      .vh-zones { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
      .vh-zchip { padding: 8px 14px; border-radius: 999px; background: #F5F0EB; border: 2px solid transparent; color: #2D2B3D; font-size: .88rem; cursor: pointer; font-weight: 600; font-family: inherit; transition: all .15s; }
      .vh-zchip:hover { background: #E8E3D9; }
      .vh-zchip.selected { background: #7B68EE; color: #fff; border-color: #7B68EE; }
      .vh-urgency { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
      .vh-uchip { padding: 10px 16px; border-radius: 10px; border: 2px solid #E8E3D9; background: #fff; cursor: pointer; font-weight: 600; color: #2D2B3D; font-family: inherit; font-size: .9rem; transition: all .15s; }
      .vh-uchip:hover { border-color: #7B68EE; }
      .vh-uchip.selected { background: #7B68EE; color: #fff; border-color: #7B68EE; }
      .vh-res { margin-top: 20px; padding: 28px; border-radius: 18px; background: linear-gradient(135deg, #2D2B3D 0%, #3D3B4D 100%); color: #fff; display: none; }
      .vh-res.show { display: block; }
      .vh-res h3 { margin: 0 0 6px; font-size: 1.5rem; font-weight: 700; }
      .vh-res .desc { opacity: .9; margin: 0 0 18px; }
      .vh-res-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
      .vh-box { background: rgba(255,255,255,.08); padding: 14px; border-radius: 12px; }
      .vh-box .k { font-size: .72rem; opacity: .7; letter-spacing: 1px; text-transform: uppercase; }
      .vh-box .v { font-size: 1.4rem; font-weight: 800; color: #E8573A; margin-top: 4px; line-height: 1; }
      .vh-box .sub { font-size: .75rem; opacity: .6; margin-top: 4px; }
      @media (max-width: 600px) { .vh-res-grid { grid-template-columns: 1fr; } }
      .vh-res .gcta { display: inline-flex; align-items: center; gap: 8px; background: #25D366; color: #fff; padding: 14px 28px; border-radius: 999px; font-weight: 800; text-decoration: none; font-size: 1.05rem; }
      .vh-menu { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vh-menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 24px; }
      .vh-price { padding: 28px; border-radius: 18px; border: 2px solid #F0EBE1; background: #FCFAF6; transition: all .2s; }
      .vh-price:hover { border-color: #7B68EE; transform: translateY(-3px); }
      .vh-price.featured { border-color: #E8573A; background: #FFF5F0; position: relative; }
      .vh-price.featured::before { content: attr(data-featured); position: absolute; top: -10px; right: 16px; background: #E8573A; color: #fff; padding: 3px 10px; border-radius: 999px; font-size: .68rem; font-weight: 800; }
      .vh-price h4 { margin: 0 0 4px; color: #2D2B3D; font-size: 1.05rem; font-weight: 700; }
      .vh-price .pdesc { color: #666; font-size: .88rem; margin: 0 0 12px; }
      .vh-price .pval { font-size: 1.8rem; font-weight: 800; color: #E8573A; }
      .vh-price .pincl { margin-top: 10px; font-size: .8rem; color: #555; }
      .vh-price .pincl .tick { color: #4ADE80; font-weight: 800; }
      .vh-zonemap { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vh-zm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-top: 20px; }
      .vh-zm { background: #F5F0EB; border: 2px solid transparent; border-radius: 12px; padding: 14px 16px; cursor: pointer; text-align: left; transition: all .2s; font-family: inherit; }
      .vh-zm:hover { background: #fff; border-color: #7B68EE; transform: translateY(-2px); }
      .vh-zm.selected { background: #fff; border-color: #E8573A; }
      .vh-zm .zm-n { font-weight: 700; color: #2D2B3D; font-size: .95rem; }
      .vh-zm .zm-meta { font-size: .8rem; color: #E8573A; font-weight: 600; margin-top: 4px; }
      .vh-zm.umland .zm-n::before { content: '🏘️ '; }
      .vh-zm.stadt .zm-n::before { content: '🏢 '; }
      .vh-zm-result { margin-top: 20px; padding: 24px; background: #F5F0EB; border-radius: 14px; display: none; }
      .vh-zm-result.show { display: block; }
      .vh-zm-result h4 { margin: 0 0 8px; color: #2D2B3D; }
      .vh-zm-result .zm-price { font-size: 1.4rem; font-weight: 800; color: #E8573A; }
      .vh-proof { background: linear-gradient(135deg, #FFF5F0 0%, #F5F0EB 100%); border-radius: 24px; padding: 48px; }
      .vh-g-logo { display: inline-block; background: #fff; padding: 10px 18px; border-radius: 999px; margin-bottom: 20px; font-weight: 800; font-size: .95rem; }
      .vh-g-logo .gstar { color: #FBBF24; }
      .vh-rev { background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 4px 16px rgba(45,43,61,.06); }
      .vh-rev .stars { color: #FBBF24; font-size: 1.1rem; margin-bottom: 8px; }
      .vh-rev p { font-size: 1.05rem; color: #2D2B3D; margin: 0 0 14px; line-height: 1.5; }
      .vh-rev .meta { display: flex; align-items: center; gap: 10px; font-size: .88rem; color: #666; }
      .vh-rev .avatar { width: 36px; height: 36px; border-radius: 50%; background: #7B68EE; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
      .vh-rev-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
      .vh-rev-dot { width: 8px; height: 8px; border-radius: 50%; background: #E8E3D9; cursor: pointer; border: 0; padding: 0; transition: all .2s; }
      .vh-rev-dot.active { background: #7B68EE; width: 24px; border-radius: 4px; }
      .vh-guarantee { display: inline-flex; align-items: center; gap: 14px; background: #fff; padding: 18px 24px; border-radius: 999px; box-shadow: 0 4px 16px rgba(45,43,61,.08); margin-top: 24px; }
      .vh-stamp { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #4ADE80, #16A34A); color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.8rem; }
      .vh-g-text .g1 { font-weight: 800; color: #2D2B3D; font-size: 1rem; }
      .vh-g-text .g2 { font-size: .85rem; color: #666; margin-top: 2px; }
      .vh-how { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
      .vh-step { background: #fff; border-radius: 18px; padding: 28px; text-align: center; position: relative; box-shadow: 0 4px 16px rgba(45,43,61,.06); }
      .vh-step::before { content: attr(data-n); position: absolute; top: -18px; left: 50%; transform: translateX(-50%); background: #7B68EE; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; border: 4px solid #F5F0EB; }
      .vh-step .icon { font-size: 2.4rem; margin-top: 8px; }
      .vh-step h4 { margin: 10px 0 6px; font-size: 1.1rem; font-weight: 700; color: #2D2B3D; }
      .vh-step p { color: #666; font-size: .95rem; margin: 0; }
      .vh-faq { background: #fff; border-radius: 24px; padding: 48px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vh-faq-item { border-bottom: 1px solid #F0EBE1; }
      .vh-faq-item:last-child { border-bottom: 0; }
      .vh-faq-q { width: 100%; background: none; border: 0; padding: 20px 0; text-align: left; cursor: pointer; font-family: inherit; font-size: 1.05rem; font-weight: 700; color: #2D2B3D; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
      .vh-faq-q:hover { color: #7B68EE; }
      .vh-faq-arrow { color: #7B68EE; transition: transform .2s; flex-shrink: 0; }
      .vh-faq-item.open .vh-faq-arrow { transform: rotate(180deg); }
      .vh-faq-a { max-height: 0; overflow: hidden; transition: max-height .3s, padding .3s; color: #555; font-size: .98rem; line-height: 1.6; }
      .vh-faq-item.open .vh-faq-a { max-height: 400px; padding: 0 0 20px; }
      .vh-finalcta { background: linear-gradient(135deg, #E8573A 0%, #FF7A5C 100%); color: #fff; padding: 80px 36px; border-radius: 28px; text-align: center; margin-top: 32px; }
      .vh-finalcta h2 { font-size: 2.2rem; margin: 0 0 12px; font-weight: 800; }
      .vh-finalcta p { font-size: 1.15rem; opacity: .95; margin: 0 0 24px; }
      .vh-finalcta .btn-wa { display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: #fff; padding: 18px 36px; border-radius: 999px; font-weight: 800; text-decoration: none; font-size: 1.1rem; }
      .vh-finalcta .phone { display: block; margin-top: 20px; font-size: 1rem; opacity: .9; }
      .vh-finalcta .phone a { color: #fff; font-weight: 700; text-decoration: underline; }
      .vh-float-wa { position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; align-items: center; gap: 10px; background: #25D366; color: #fff; padding: 14px 22px; border-radius: 999px; font-weight: 800; text-decoration: none; box-shadow: 0 8px 24px rgba(37,211,102,.5); font-size: 1rem; }
      @media (max-width: 640px) {
        .vh-wrap { padding: 16px 12px 80px; }
        .vh-hero { padding: 40px 20px; border-radius: 20px; }
        .vh-hero h1 { font-size: 1.9rem; }
        .vh-hero .sub { font-size: 1rem; }
        .vh-h2 { font-size: 1.5rem; }
        .vh-est, .vh-menu, .vh-zonemap, .vh-proof, .vh-faq { padding: 20px 16px; border-radius: 18px; }
        .vh-finalcta { padding: 36px 20px; }
        .vh-finalcta h2 { font-size: 1.6rem; }
      }
    `;
    document.head.appendChild(style);
  }

  /* =============== RENDER =============== */
  render() {
    const L = this.L;
    const UI = this.UI;
    const P = VELOV_PRICING;
    const C = VELOV_CONTACT;

    this.innerHTML = `
      <div class="vh-wrap">

        <!-- HERO -->
        <section class="vh-hero">
          <div class="vh-live">
            <span class="vh-dot" id="vh-dot"></span>
            <span id="vh-status">…</span>
          </div>
          <h1>${UI.heroH1}</h1>
          <p class="sub">${UI.heroSub}</p>
          <div class="vh-cta-row">
            <a class="vh-btn vh-btn-primary" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(UI.waMsg)}" target="_blank" rel="noopener">${UI.ctaWhatsapp}</a>
            <a class="vh-btn vh-btn-ghost" href="#vh-estimator">${UI.ctaPrice}</a>
          </div>
        </section>

        <!-- TRUST BAR -->
        <div class="vh-trust">
          ${L.trust.map(t => `<div class="vh-tr"><span class="k">${t.k}</span><span class="v">${t.v}</span></div>`).join('')}
        </div>

        <!-- LIVE TICKER -->
        <div class="vh-ticker">
          <span class="tlabel">${UI.tickerLabel}</span>
          <span class="vh-ticker-content" id="vh-ticker">…</span>
        </div>

        <!-- INSTANT PRICE ESTIMATOR -->
        <section class="vh-section" id="vh-estimator">
          <h2 class="vh-h2">${UI.estimatorTitle}</h2>
          <p class="vh-lead">${UI.estimatorLead}</p>
          <div class="vh-est">
            <div class="vh-est-step"><span class="num">1</span> ${UI.step1}</div>
            <div class="vh-probs" id="vh-probs">
              ${L.problems.map(p => `
                <button class="vh-prob" data-id="${p.id}">
                  <span class="icon">${p.icon}</span>
                  <span class="label">${p.label}</span>
                </button>`).join('')}
            </div>
            <div class="vh-est-step"><span class="num">2</span> ${UI.step2}</div>
            <div class="vh-zones" id="vh-zones">
              ${VELOV_ZONES.map(z => `<button class="vh-zchip" data-slug="${z.slug}" data-type="${z.type}">${z.name}</button>`).join('')}
            </div>
            <div class="vh-est-step"><span class="num">3</span> ${UI.step3}</div>
            <div class="vh-urgency" id="vh-urg">
              ${L.urgencyOptions.map(u => `<button class="vh-uchip ${u.id === 'heute' ? 'selected' : ''}" data-id="${u.id}">${u.label}</button>`).join('')}
            </div>
            <div class="vh-res" id="vh-res">
              <h3 id="vh-res-name">—</h3>
              <p class="desc" id="vh-res-desc">—</p>
              <div class="vh-res-grid">
                <div class="vh-box"><div class="k">${UI.priceFrom}</div><div class="v" id="vh-res-price">—</div><div class="sub" id="vh-res-psub">—</div></div>
                <div class="vh-box"><div class="k">${UI.duration}</div><div class="v" id="vh-res-dur">—</div><div class="sub">${UI.onsite}</div></div>
                <div class="vh-box"><div class="k">${UI.eta}</div><div class="v" id="vh-res-eta">—</div><div class="sub" id="vh-res-zone">—</div></div>
              </div>
              <a class="gcta" id="vh-res-cta" href="#" target="_blank" rel="noopener">💬 ${UI.waBook}</a>
            </div>
          </div>
        </section>

        <!-- PRICE MENU -->
        <section class="vh-section">
          <h2 class="vh-h2">${UI.priceMenuTitle}</h2>
          <p class="vh-lead">${UI.priceMenuLead}</p>
          <div class="vh-menu">
            <div class="vh-menu-grid">
              ${L.priceItems.map(item => `
                <div class="vh-price ${item.featured ? 'featured' : ''}" data-featured="${UI.featured}">
                  <h4>${item.name}</h4>
                  <p class="pdesc">${item.desc}</p>
                  <div class="pval">${item.val}</div>
                  <div class="pincl">${item.incl.map(i => `<div><span class="tick">✓</span> ${i}</div>`).join('')}</div>
                </div>`).join('')}
            </div>
          </div>
        </section>

        <!-- ZONE MAP -->
        <section class="vh-section">
          <h2 class="vh-h2">${UI.zoneMapTitle}</h2>
          <p class="vh-lead">${UI.zoneMapLead}</p>
          <div class="vh-zonemap">
            <div class="vh-zm-grid">
              ${VELOV_ZONES.map(z => `
                <button class="vh-zm ${z.type}" data-slug="${z.slug}">
                  <div class="zm-n">${z.name}</div>
                  <div class="zm-meta">~${z.eta} min</div>
                </button>`).join('')}
            </div>
            <div class="vh-zm-result" id="vh-zm-result">
              <h4 id="vh-zm-name">—</h4>
              <p id="vh-zm-desc">—</p>
              <div>${UI.zmPriceLabel} <span class="zm-price" id="vh-zm-price">—</span> · ${UI.zmEtaLabel} <strong id="vh-zm-eta">—</strong> min</div>
              <a id="vh-zm-cta" href="#" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;margin-top:12px;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;font-weight:800;text-decoration:none;">💬 ${UI.waBook}</a>
            </div>
          </div>
        </section>

        <!-- SOCIAL PROOF -->
        <section class="vh-section">
          <h2 class="vh-h2">${UI.proofTitle}</h2>
          <p class="vh-lead">${UI.proofSub}</p>
          <div class="vh-proof">
            <div class="vh-g-logo"><span class="gstar">★★★★★</span> 4.8 · Google Reviews</div>
            <div class="vh-reviews">
              <div class="vh-rev">
                <div class="stars">★★★★★</div>
                <p id="vh-rev-text">—</p>
                <div class="meta">
                  <div class="avatar" id="vh-rev-avatar">?</div>
                  <div><strong id="vh-rev-name">—</strong> · <span id="vh-rev-area">—</span><br/><span style="font-size:.8rem;opacity:.7;" id="vh-rev-date">—</span></div>
                </div>
              </div>
              <div class="vh-rev-dots" id="vh-rev-dots">
                ${L.reviews.map((_, i) => `<button class="vh-rev-dot ${i===0?'active':''}" data-idx="${i}"></button>`).join('')}
              </div>
            </div>
            <div class="vh-guarantee">
              <div class="vh-stamp">📸</div>
              <div class="vh-g-text">
                <div class="g1">${UI.photoStampTitle}</div>
                <div class="g2">${UI.photoStampDesc}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- HOW IT WORKS -->
        <section class="vh-section">
          <h2 class="vh-h2">${UI.howTitle}</h2>
          <p class="vh-lead">${UI.howLead}</p>
          <div class="vh-how">
            ${L.howSteps.map(s => `
              <div class="vh-step" data-n="${s.n}">
                <div class="icon">${s.icon}</div>
                <h4>${s.t}</h4>
                <p>${s.d}</p>
              </div>`).join('')}
          </div>
        </section>

        <!-- FAQ -->
        <section class="vh-section">
          <h2 class="vh-h2">${UI.faqTitle}</h2>
          <p class="vh-lead">${UI.faqLead}</p>
          <div class="vh-faq" id="vh-faq">
            ${L.faqs.map((f, i) => `
              <div class="vh-faq-item" data-idx="${i}">
                <button class="vh-faq-q" aria-expanded="false">
                  <span>${f.q}</span>
                  <span class="vh-faq-arrow">▼</span>
                </button>
                <div class="vh-faq-a"><p>${f.a}</p></div>
              </div>`).join('')}
          </div>
        </section>

        <!-- FINAL CTA -->
        <section class="vh-finalcta">
          <h2>${UI.finalH2}</h2>
          <p>${UI.finalP}</p>
          <a class="btn-wa" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(UI.finalWaMsg)}" target="_blank" rel="noopener">
            <span>💬</span> ${UI.finalWa}
          </a>
          <span class="phone">${UI.orCall} <a href="tel:${C.phone}">${C.phoneDisplay}</a></span>
        </section>

      </div>

      <!-- FLOATING WHATSAPP -->
      <a class="vh-float-wa" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(UI.waMsg)}" target="_blank" rel="noopener">
        💬 WhatsApp
      </a>
    `;
  }

  /* =============== EVENTS =============== */
  bindEvents() {
    this.querySelectorAll('.vh-prob').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.vh-prob').forEach(b => b.classList.toggle('selected', b === btn));
        this.state.est.problem = btn.dataset.id;
        this.updateEstimator();
      });
    });
    this.querySelectorAll('.vh-zchip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.vh-zchip').forEach(b => b.classList.toggle('selected', b === btn));
        this.state.est.zone = btn.dataset.slug;
        this.updateEstimator();
      });
    });
    this.querySelectorAll('.vh-uchip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.vh-uchip').forEach(b => b.classList.toggle('selected', b === btn));
        this.state.est.time = btn.dataset.id;
        this.updateEstimator();
      });
    });
    this.querySelectorAll('.vh-zm').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.vh-zm').forEach(b => b.classList.toggle('selected', b === btn));
        this.selectZoneMap(btn.dataset.slug);
      });
    });
    this.querySelectorAll('.vh-rev-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.state.proofIdx = parseInt(dot.dataset.idx, 10);
        this.renderReview();
      });
    });
    this.querySelectorAll('.vh-faq-item').forEach(item => {
      item.querySelector('.vh-faq-q').addEventListener('click', () => {
        const open = item.classList.toggle('open');
        item.querySelector('.vh-faq-q').setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* =============== ESTIMATOR =============== */
  updateEstimator() {
    const L = this.L;
    const UI = this.UI;
    const C = VELOV_CONTACT;
    const { problem, zone, time } = this.state.est;
    const res = this.querySelector('#vh-res');
    if (!problem) { res.classList.remove('show'); return; }

    const p = L.problems.find(x => x.id === problem);
    const z = zone ? VELOV_ZONES.find(x => x.slug === zone) : null;
    const eta = z ? z.eta : 45;

    let total = p.price;
    let priceSub = UI.priceSub;
    if (z && z.surcharge > 0) {
      total += z.surcharge;
      priceSub = UI.umlandSub(z.surcharge);
    }

    this.querySelector('#vh-res-name').textContent = `${p.icon} ${p.svc}`;
    this.querySelector('#vh-res-desc').textContent = UI.resPriceDesc(p.label);
    this.querySelector('#vh-res-price').textContent = `${total} CHF`;
    this.querySelector('#vh-res-psub').textContent = priceSub;
    this.querySelector('#vh-res-dur').textContent = p.time;
    this.querySelector('#vh-res-eta').textContent = `~${eta} min`;
    this.querySelector('#vh-res-zone').textContent = z ? z.name : (UI.zmCityLabel || 'Zürich');

    const timeLabel = (L.urgencyOptions.find(u => u.id === time) || {}).label || L.urgencyOptions[1].label;
    const msg = UI.waResMsg(p.label, p.svc, total, z ? z.name : 'Zürich', timeLabel);
    this.querySelector('#vh-res-cta').href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
    res.classList.add('show');
  }

  selectZoneMap(slug) {
    const UI = this.UI;
    const C = VELOV_CONTACT;
    const z = VELOV_ZONES.find(x => x.slug === slug);
    if (!z) return;
    const anfahrt = VELOV_PRICING.anfahrtStadt + z.surcharge;
    const label = z.type === 'stadt' ? UI.zmCityLabel : UI.zmAggloLabel;
    this.querySelector('#vh-zm-name').textContent = `📍 ${z.name}`;
    this.querySelector('#vh-zm-desc').textContent = UI.zmDesc(label, z.eta);
    this.querySelector('#vh-zm-price').textContent = anfahrt;
    this.querySelector('#vh-zm-eta').textContent = z.eta;
    this.querySelector('#vh-zm-cta').href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(UI.zmWaMsg(z.name))}`;
    this.querySelector('#vh-zm-result').classList.add('show');
  }

  /* =============== LOOPS =============== */
  startLoops() {
    this.updateLive();
    this.renderReview();
    this.renderTicker();
    this._ticks.push(setInterval(() => this.updateLive(), 60000));
    this._ticks.push(setInterval(() => {
      this.state.proofIdx = (this.state.proofIdx + 1) % this.L.reviews.length;
      this.renderReview();
    }, 6000));
    this._ticks.push(setInterval(() => {
      this.state.tickerIdx = (this.state.tickerIdx + 1) % this.L.ticker.length;
      this.renderTicker();
    }, 3500));
  }

  isBusinessHours() {
    const now = new Date();
    const d = now.getDay();
    const h = now.getHours();
    if (d === 0) return false;
    return h >= 7 && h < 20;
  }

  updateLive() {
    const dot = this.querySelector('#vh-dot');
    const status = this.querySelector('#vh-status');
    if (!dot || !status) return;
    if (this.isBusinessHours()) {
      dot.classList.remove('off');
      const now = new Date();
      const nextSlot = new Date(now.getTime() + 45 * 60000);
      const hh = String(nextSlot.getHours()).padStart(2, '0');
      const mm = String(nextSlot.getMinutes()).padStart(2, '0');
      status.textContent = this.UI.liveAvail(hh, mm);
    } else {
      dot.classList.add('off');
      status.textContent = this.UI.liveOff;
    }
  }

  renderReview() {
    const r = this.L.reviews[this.state.proofIdx];
    if (!r) return;
    this.querySelector('#vh-rev-text').textContent = `"${r.text}"`;
    this.querySelector('#vh-rev-name').textContent = r.name;
    this.querySelector('#vh-rev-area').textContent = r.area;
    this.querySelector('#vh-rev-date').textContent = r.date;
    this.querySelector('#vh-rev-avatar').textContent = r.name.charAt(0);
    this.querySelectorAll('.vh-rev-dot').forEach((d, i) => d.classList.toggle('active', i === this.state.proofIdx));
  }

  renderTicker() {
    const t = this.L.ticker[this.state.tickerIdx];
    if (!t) return;
    const el = this.querySelector('#vh-ticker');
    if (el) el.innerHTML = this.UI.tickerText(t.t, t.what, t.where);
  }
}

if (!customElements.get('velov-home')) {
  customElements.define('velov-home', VelovHome);
}