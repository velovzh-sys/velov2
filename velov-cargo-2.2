/* ===== VELOV Shared SEO Helper (auto-prepended) ===== */
(function(){
  if (window.__velovSeoHelper) return;
  function safe(s){return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' ');}
  function buildMirror(s){
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
      h+='<section><h2>FAQ</h2>';
      s.faqs.forEach(function(f){h+='<h3>'+safe(f.q)+'</h3><p>'+safe(f.a)+'</p>';});
      h+='</section>';
    }
    if(s.contact) h+='<section><h2>Kontakt</h2><p>'+safe(s.contact)+'</p></section>';
    h+='</article>';
    return h;
  }
  function injectSeo(host,cfg){
    if(!host||!cfg) return;
    function appendMirror(){
      if(host.querySelector('[data-velov-seo]')) return;
      var m=document.createElement('div');
      m.setAttribute('data-velov-seo','');
      m.setAttribute('aria-hidden','true');
      m.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';
      m.innerHTML=buildMirror(cfg);
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

/* ===== VELOV Tracker — dataLayer + GA4 events on CTA clicks ===== */
(function(){
  if (window.__velovTracker) return;
  function pushEvent(name, params){
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({event: name}, params || {}));
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch(e) {}
  }
  function pageContext(host){
    return {
      page_component: (host && host.tagName) ? host.tagName.toLowerCase() : 'unknown',
      page_path: (typeof location !== 'undefined') ? location.pathname : ''
    };
  }
  function bind(host){
    if (!host || host.__velovBound) return;
    host.__velovBound = true;
    host.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var ctx = pageContext(host);
      var label = (a.textContent || '').replace(/\s+/g,' ').trim().slice(0,60);
      if (/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href) || /whatsapp/i.test(href)) {
        pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label, component: 'cargo'}, ctx));
      } else if (/^tel:/i.test(href)) {
        pushEvent('phone_click', Object.assign({link_url: href, link_text: label, component: 'cargo'}, ctx));
      } else if (/^mailto:/i.test(href)) {
        pushEvent('email_click', Object.assign({link_url: href, link_text: label, component: 'cargo'}, ctx));
      } else if (/booking|termin|offerte/i.test(href + ' ' + label)) {
        pushEvent('booking_click', Object.assign({link_url: href, link_text: label, component: 'cargo'}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* =============================================================
 * VELOV — Cargo Bike Service Component (Multilingual v2.2)
 * Languages: DE / EN / FR / IT / ES (auto-detected from <html lang>)
 *
 * Wix install:
 *   1. Editor → Add (+) → Embed → Custom Element
 *   2. Tag name: velov-cargo
 *   3. Source: upload this file (Wix File Manager) or host on CDN
 *   4. Same component works on every language version of your site —
 *      Wix Multilingual sets <html lang> per version automatically.
 * ============================================================= */

const VELOV_CARGO_I18N = {
  DE: {
    seoH1: 'Cargo-Bike Service Zürich – Wartung & Reparatur für Lastenräder',
    seoIntro: 'Mobiler Cargo-Bike Service in Zürich. Wir warten und reparieren Lastenräder aller Marken: Riese & Müller, Urban Arrow, Tern, Yuba, Larry vs Harry. Direkt bei dir – wir kommen zum Cargo-Bike.',
    heroBadge: 'Mobiler Cargo-Bike-Service · ganz Zürich',
    heroH1Pre: 'Cargo Bike Reparatur',
    heroH1Mid: 'direkt bei dir',
    heroH1Post: 'in Zürich',
    heroLead: 'Schluss mit 40-kg-Lastenrad-Schleppen. Unsere mobile Werkstatt kommt mit Velo und Cargo-Bike zu dir — alle Marken, alle Motor-Systeme, transparente Festpreise. Mechanische Reparatur direkt vor Ort.',
    ctaPrimary: '📞 Jetzt Termin buchen',
    ctaGhost: 'Preis berechnen →',
    trust: ['⭐ 4.8 / 5 Google Reviews', '🚐 Mobile Werkstatt', '🚲 Alle Cargo-Marken', '💰 Festpreis · Anfahrt CHF 49'],
    whyLabel: 'Warum mobil',
    whyTitle: 'Lastenrad-Service, der zu dir kommt',
    whySub: 'Cargo Bikes sind schwer, sperrig und kaum transportabel. Genau deshalb kommen wir mit komplettem Werkzeug direkt nach Hause, ins Büro oder an deinen Lieblings-Spot in Zürich.',
    whyCards: [
      { icon: '🏠', t: 'Direkt bei dir', p: 'Kein mühsames Schleppen eines 40 kg+ Lastenrads. Wir reparieren vor deiner Haustür, im Hinterhof oder an der Strasse.' },
      { icon: '🔧', t: 'Cargo-Spezialisten', p: 'Erfahrung mit 2-Rad, 3-Rad, Long-Tail und Front-Loader. Bremsen, Schaltung, Antrieb, Laufräder, Transportbox — alles aus einer Hand.' },
      { icon: '🚲', t: 'Alle Marken & Motoren', p: 'Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt — egal welcher Motor (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Mechanisch, was mechanisch ist.' }
    ],
    calcLabel: 'Kosten-Rechner',
    calcTitle: 'Was kostet dein Cargo-Service?',
    calcSub: 'Wähle dein Paket, klick die gewünschten Extras an — der Gesamtpreis aktualisiert sich live. Keine versteckten Kosten.',
    calcStep1: '1. Basispaket wählen',
    calcStep2: '2. Extras hinzufügen (optional)',
    calcTotalLabel: 'Dein Festpreis',
    calcFine: 'Anfahrt Zürich Stadt CHF 49 · Teile nach Aufwand · Mechanische Reparatur',
    calcWaBtn: 'Per WhatsApp buchen',
    diagLabel: 'Interaktiv',
    diagTitle: 'Klick auf dein Cargo Bike — wir zeigen dir, was wir reparieren',
    diagSub: 'Jeder Punkt steht für einen Service-Bereich. Einfach antippen für Preis & Details.',
    diagHint: '👆 Tippe einen orangen Punkt an, um Details zu sehen',
    sliderLabel: 'Lohnt sich das noch?',
    sliderTitle: 'Ist dein Cargo Bike eine Reparatur wert?',
    sliderSub: 'Schieb den Regler passend zum Zustand deines Lastenrads — wir empfehlen das richtige Service-Paket.',
    sliderQ: 'Wie ist der aktuelle Zustand?',
    sliderL: ['🌟 Neuwertig', '🔧 Normal genutzt', '⚠️ Stark beansprucht'],
    faqLabel: 'FAQ',
    faqTitle: 'Häufige Fragen zum Cargo-Service',
    faqSub: 'Alles, was du vor der Buchung wissen willst — klar und ehrlich beantwortet.',
    finalH2: 'Cargo Bike Service in Zürich — ohne Schleppen, ohne Stress',
    finalP: 'Wir kommen zu dir, reparieren mechanisch vor Ort, und dein Lastenrad ist wieder bereit für den Alltag. Transparente Festpreise, Anfahrt Zürich Stadt CHF 49.',
    finalBtn: 'Jetzt Cargo Service buchen',
    finalContactSuffix: 'Mobile Cargo-Bike-Werkstatt für ganz Zürich',
    waMsgIntro: 'Hi VELOV! 👋\nIch möchte meinen Cargo-Service buchen:',
    waMsgPkg: 'Paket',
    waMsgExtras: 'Extras',
    waMsgTotal: 'Total (Festpreis)',
    waMsgAddrLine: 'Adresse / Zeitfenster:',
    waMsgAddrPh: '(bitte ausfüllen)',
    waMsgEnd: 'Danke!',
    packages: {
      basic:    { name: 'Cargo Basic',    price:  99, desc: 'Sicherheitscheck + alle Schrauben nachziehen — ideal zwischen zwei Services' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Gründlicher Jahresservice für dein Lastenrad — Bestseller' },
      premium:  { name: 'Cargo Premium',  price: 259, desc: 'Komplett-Service mit Laufräder zentrieren, Reinigung & Abschlussbericht' }
    },
    extras: [
      { id: 'tire',   label: 'Reifenwechsel (Cargo, inkl. Schlauch)', price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Bremsbeläge vorne wechseln',            price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Bremsbeläge hinten wechseln',           price: 55, icon: '🛑' },
      { id: 'hydrF',  label: 'Hydraulische Bremse entlüften vorne',   price: 49, icon: '💧' },
      { id: 'hydrR',  label: 'Hydraulische Bremse entlüften hinten',  price: 65, icon: '💧' },
      { id: 'chain',  label: 'Kettenwechsel',                         price: 39, icon: '⛓️' },
      { id: 'lenk',   label: 'Knicklenkung einstellen',               price: 39, icon: '↔️' },
      { id: 'box',    label: 'Transportbox-Reparatur (mechanisch)',   price: 49, icon: '📦' },
      { id: 'wheel',  label: 'Laufräder zentrieren (von Auge)',       price: 45, icon: '🎯' },
      { id: 'anfahrt',label: 'Anfahrt Zürich Stadt',                  price: 49, icon: '🚐' }
    ],
    hotspots: [
      { id: 'box',   x: 22, y: 55, title: 'Transportbox & Gurte',    body: 'Schloss, Verdeck, Befestigungen, Kindersitze — Reparatur ab CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Antrieb & Kette',         body: 'Kette wechseln ab CHF 39. Wir warten alle Cargo-Bikes — egal mit welchem Motor.' },
      { id: 'brake', x: 70, y: 40, title: 'Hydraulische Bremsen',    body: 'Beläge vorne CHF 35 · hinten CHF 55. Entlüften vorne CHF 49 · hinten CHF 65.' },
      { id: 'wheel', x: 82, y: 70, title: 'Hinterrad / Schaltung',   body: 'Speichen zentrieren (von Auge) CHF 45. Schaltung justieren ab CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Lenkung / Knicklenkung',  body: 'Lenk-Gelenk prüfen & einstellen — CHF 39.' }
    ],
    faqs: [
      { q: 'Welche Cargo-Bike-Marken repariert ihr in Zürich?', a: 'Alle. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt, Omnium, Butchers & Bicycles und viele mehr. Wir warten Cargo-Bikes aller Marken — egal welcher Motor verbaut ist (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' },
      { q: 'Was kostet der Cargo-Bike-Service in Zürich?', a: 'Cargo Basic Check CHF 99 · Cargo Standard Service CHF 229 · Cargo Premium Service CHF 259. Dazu kommt die Anfahrt Stadt Zürich CHF 49. Festpreise — nur der Service-Umfang ist an das grössere Lastenrad angepasst.' },
      { q: 'Was ist der Unterschied zwischen Cargo Standard und Premium?', a: 'Premium (CHF 259) enthält alles aus dem Standard Service (CHF 229) plus Laufräder zentrieren von Auge und komplette Reinigung. Standard ist perfekt für den jährlichen Service.' },
      { q: 'Repariert ihr auch E-Cargo-Bikes mit Motor?', a: 'Ja — alle mechanischen Teile auch bei E-Cargo-Bikes: Bremsen, Schaltung, Kette, Laufräder, Transportbox. Motor-Diagnose, Firmware-Updates und Akku-Tests sind nicht Teil unseres Angebots.' },
      { q: 'Repariert ihr auch die Transportbox?', a: 'Ja. Schloss, Gurte, Verdeck und Befestigungen prüfen und reparieren wir standardmässig (ab CHF 49). Grössere Holz-/Kunststoffbox-Reparaturen je nach Modell direkt vor Ort.' },
      { q: 'Wie funktioniert der mobile Service bei schweren Lastenrädern?', a: 'Wir kommen mit unserer mobilen Werkstatt direkt zu dir — perfekt für 30–60 kg schwere Cargo-Bikes. Du sparst dir Transport, Stress und Zeit. Wir arbeiten in der Einfahrt, im Hof, in der Garage oder an der Strasse.' }
    ],
    recos: {
      basic:    { emoji: '🌟', title: 'Cargo Basic — perfekt',           msg: 'Dein Lastenrad ist in gutem Zustand. Ein Basic Check reicht: Sicherheitscheck, alle Schrauben nachziehen, Reifendruck prüfen, Sichtkontrolle Bremsen und Schaltung.' },
      standard: { emoji: '🛠️', title: 'Cargo Standard — empfohlen',     msg: 'Alltagsgebrauch hinterlässt Spuren. Mit dem Standard Service justieren wir Bremsen und Schaltung, prüfen Steuersatz, Tretlager und Züge — alles mechanisch direkt vor Ort.' },
      premium:  { emoji: '🔥', title: 'Cargo Premium — dringend empfohlen', msg: 'Bei stark genutzten Lastenrädern lohnt sich der volle Premium Service: alles aus dem Standard plus Laufräder zentrieren von Auge, komplette Reinigung, alle Lager nachstellen und ausführlicher Zustandsbericht.' }
    },
    recoBookSuffix: 'buchen →'
  },

  EN: {
    seoH1: 'Cargo Bike Service Zürich – Maintenance & Repair for Cargo Bikes',
    seoIntro: 'Mobile cargo bike service in Zürich. We service and repair cargo bikes of every brand: Riese & Müller, Urban Arrow, Tern, Yuba, Larry vs Harry. We come to you – no need to transport the bike.',
    heroBadge: 'Mobile cargo bike service · all of Zürich',
    heroH1Pre: 'Cargo bike repair',
    heroH1Mid: 'right where you are',
    heroH1Post: 'in Zürich',
    heroLead: 'No more lugging your 40 kg cargo bike. Our mobile workshop arrives by bike & cargo bike — every brand, every motor system, transparent fixed prices. Mechanical repair right on the spot.',
    ctaPrimary: '📞 Book a slot',
    ctaGhost: 'Calculate price →',
    trust: ['⭐ 4.8 / 5 Google reviews', '🚐 Mobile workshop', '🚲 Every cargo brand', '💰 Fixed price · Travel CHF 49'],
    whyLabel: 'Why mobile',
    whyTitle: 'Cargo service that comes to you',
    whySub: 'Cargo bikes are heavy, bulky and barely transportable. That is exactly why we bring our full toolkit to your home, your office or your favourite spot in Zürich.',
    whyCards: [
      { icon: '🏠', t: 'On-site to you', p: 'No more dragging a 40 kg+ cargo bike around. We repair at your front door, in the courtyard or on the street.' },
      { icon: '🔧', t: 'Cargo specialists', p: 'Years of experience with 2-wheel, 3-wheel, long-tail and front-loader cargos. Brakes, gears, drivetrain, wheels, cargo box — one stop.' },
      { icon: '🚲', t: 'Every brand & motor', p: 'Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt — any motor (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Mechanical work, mechanically solved.' }
    ],
    calcLabel: 'Cost calculator',
    calcTitle: 'What will your cargo service cost?',
    calcSub: 'Pick your package, tick the extras you need — total updates live. No hidden costs.',
    calcStep1: '1. Choose your base package',
    calcStep2: '2. Add extras (optional)',
    calcTotalLabel: 'Your fixed price',
    calcFine: 'Travel within Zürich CHF 49 · parts as needed · mechanical repair',
    calcWaBtn: 'Book via WhatsApp',
    diagLabel: 'Interactive',
    diagTitle: 'Click on your cargo bike — we show you what we repair',
    diagSub: 'Each dot is a service area. Tap any one for price & details.',
    diagHint: '👆 Tap an orange dot to see the details',
    sliderLabel: 'Worth fixing?',
    sliderTitle: 'Is your cargo bike worth a service?',
    sliderSub: 'Slide to match your bike\'s current condition — we recommend the right service package.',
    sliderQ: 'What is the current condition?',
    sliderL: ['🌟 Like new', '🔧 Daily use', '⚠️ Heavy wear'],
    faqLabel: 'FAQ',
    faqTitle: 'Frequent questions about the cargo service',
    faqSub: 'Everything you want to know before booking — answered honestly.',
    finalH2: 'Cargo bike service in Zürich — no lugging, no stress',
    finalP: 'We come to you, repair mechanically on-site, and your cargo bike is back in service. Fixed prices. Travel within Zürich CHF 49.',
    finalBtn: 'Book your cargo service now',
    finalContactSuffix: 'Mobile cargo bike workshop for all of Zürich',
    waMsgIntro: 'Hi VELOV! 👋\nI\'d like to book a cargo service:',
    waMsgPkg: 'Package',
    waMsgExtras: 'Extras',
    waMsgTotal: 'Total (fixed price)',
    waMsgAddrLine: 'Address / preferred slot:',
    waMsgAddrPh: '(please fill in)',
    waMsgEnd: 'Thanks!',
    packages: {
      basic:    { name: 'Cargo Basic',    price:  99, desc: 'Safety check + tighten all bolts — perfect between two services' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Thorough annual service for your cargo bike — bestseller' },
      premium:  { name: 'Cargo Premium',  price: 259, desc: 'Full service plus wheel truing, deep cleaning & condition report' }
    },
    extras: [
      { id: 'tire',   label: 'Tyre change (cargo, incl. tube)',     price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Front brake pads change',             price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Rear brake pads change',              price: 55, icon: '🛑' },
      { id: 'hydrF',  label: 'Bleed front hydraulic brake',         price: 49, icon: '💧' },
      { id: 'hydrR',  label: 'Bleed rear hydraulic brake',          price: 65, icon: '💧' },
      { id: 'chain',  label: 'Chain replacement',                   price: 39, icon: '⛓️' },
      { id: 'lenk',   label: 'Adjust articulated steering',         price: 39, icon: '↔️' },
      { id: 'box',    label: 'Cargo box repair (mechanical)',       price: 49, icon: '📦' },
      { id: 'wheel',  label: 'Truing wheels (by eye)',              price: 45, icon: '🎯' },
      { id: 'anfahrt',label: 'Travel within Zürich',                price: 49, icon: '🚐' }
    ],
    hotspots: [
      { id: 'box',   x: 22, y: 55, title: 'Cargo box & straps',    body: 'Lock, cover, fastenings, child seats — repair from CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Drivetrain & chain',    body: 'Chain replacement from CHF 39. We service all cargo bikes regardless of motor.' },
      { id: 'brake', x: 70, y: 40, title: 'Hydraulic brakes',      body: 'Front pads CHF 35 · rear pads CHF 55. Bleed front CHF 49 · rear CHF 65.' },
      { id: 'wheel', x: 82, y: 70, title: 'Rear wheel / gears',    body: 'Wheel truing (by eye) CHF 45. Gear adjustment from CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Steering / articulation', body: 'Articulated steering check & adjustment — CHF 39.' }
    ],
    faqs: [
      { q: 'Which cargo bike brands do you repair in Zürich?', a: 'All of them. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt, Omnium, Butchers & Bicycles and many more. Any motor system (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' },
      { q: 'How much does the cargo bike service cost?', a: 'Cargo Basic CHF 99 · Cargo Standard CHF 229 · Cargo Premium CHF 259. Plus travel within Zürich CHF 49. Fixed prices — only the scope is adjusted to the larger bike.' },
      { q: 'What is the difference between Cargo Standard and Premium?', a: 'Premium (CHF 259) includes everything from Standard (CHF 229) plus wheel truing by eye and full cleaning. Standard is the annual classic.' },
      { q: 'Do you also repair e-cargo bikes with motors?', a: 'Yes — all mechanical parts on e-cargo bikes too: brakes, gears, chain, wheels, cargo box. Motor diagnostics, firmware and battery tests are not part of our offer.' },
      { q: 'Do you also repair the cargo box itself?', a: 'Yes. Lock, straps, cover and fastenings as standard (from CHF 49). Larger wood/plastic box repairs by case.' },
      { q: 'How does mobile service work with such heavy bikes?', a: 'We come with our mobile workshop straight to you — perfect for 30–60 kg cargo bikes. You skip the transport hassle. We work in your driveway, courtyard, garage or street-side.' }
    ],
    recos: {
      basic:    { emoji: '🌟', title: 'Cargo Basic — perfect',         msg: 'Your bike is in good shape. A Basic check is enough: safety check, all bolts tightened, tyre pressure, brake & gear visual check.' },
      standard: { emoji: '🛠️', title: 'Cargo Standard — recommended', msg: 'Daily use leaves marks. Standard service adjusts brakes and gears, checks headset, bottom bracket and cables — all mechanically on-site.' },
      premium:  { emoji: '🔥', title: 'Cargo Premium — strongly advised', msg: 'For heavily-used cargo bikes the full Premium service is worth it: everything from Standard plus wheel truing, full cleaning, all bearings adjusted and a written condition report.' }
    },
    recoBookSuffix: 'now →'
  },

  FR: {
    seoH1: 'Service Cargo Bike Zurich – Entretien & réparation pour vélos cargo',
    seoIntro: 'Service cargo bike mobile à Zurich. Nous entretenons et réparons les vélos cargo de toutes marques : Riese & Müller, Urban Arrow, Tern, Yuba, Larry vs Harry. Nous venons à vous.',
    heroBadge: 'Service cargo bike mobile · tout Zurich',
    heroH1Pre: 'Réparation cargo bike',
    heroH1Mid: 'directement chez vous',
    heroH1Post: 'à Zurich',
    heroLead: 'Fini de trimballer un cargo bike de 40 kg. Notre atelier mobile vient à vélo & cargo bike — toutes marques, tous moteurs, prix fixes transparents. Réparation mécanique sur place.',
    ctaPrimary: '📞 Réserver maintenant',
    ctaGhost: 'Calculer le prix →',
    trust: ['⭐ 4.8 / 5 avis Google', '🚐 Atelier mobile', '🚲 Toutes marques cargo', '💰 Prix fixe · Déplacement CHF 49'],
    whyLabel: 'Pourquoi mobile',
    whyTitle: 'Service cargo qui vient à vous',
    whySub: 'Les vélos cargo sont lourds, encombrants et difficiles à transporter. C\'est exactement pourquoi nous venons avec tout l\'outillage chez vous, au bureau ou à votre spot préféré à Zurich.',
    whyCards: [
      { icon: '🏠', t: 'Chez vous', p: 'Plus besoin de traîner un cargo de 40 kg+. Nous réparons devant votre porte, dans la cour ou dans la rue.' },
      { icon: '🔧', t: 'Spécialistes cargo', p: 'Expérience avec 2-roues, 3-roues, long-tail et front-loader. Freins, vitesses, transmission, roues, caisson — tout en un.' },
      { icon: '🚲', t: 'Toutes marques & moteurs', p: 'Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt — quel que soit le moteur (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' }
    ],
    calcLabel: 'Calculateur',
    calcTitle: 'Combien coûte votre service cargo ?',
    calcSub: 'Choisissez votre forfait, cochez les options — le total se met à jour en direct. Pas de coûts cachés.',
    calcStep1: '1. Choisir le forfait de base',
    calcStep2: '2. Ajouter des options (facultatif)',
    calcTotalLabel: 'Votre prix fixe',
    calcFine: 'Déplacement Zurich ville CHF 49 · pièces selon besoin · réparation mécanique',
    calcWaBtn: 'Réserver via WhatsApp',
    diagLabel: 'Interactif',
    diagTitle: 'Cliquez sur votre cargo bike — on vous montre ce qu\'on répare',
    diagSub: 'Chaque point représente un domaine de service. Tapez pour le prix & les détails.',
    diagHint: '👆 Tapez un point orange pour voir les détails',
    sliderLabel: 'Ça vaut le coup ?',
    sliderTitle: 'Votre cargo bike vaut-il une réparation ?',
    sliderSub: 'Glissez le curseur selon l\'état actuel — nous recommandons le bon forfait.',
    sliderQ: 'Quel est l\'état actuel ?',
    sliderL: ['🌟 Comme neuf', '🔧 Usage normal', '⚠️ Très sollicité'],
    faqLabel: 'FAQ',
    faqTitle: 'Questions fréquentes sur le service cargo',
    faqSub: 'Tout ce que vous voulez savoir avant de réserver — répondu honnêtement.',
    finalH2: 'Service cargo bike à Zurich — sans transport, sans stress',
    finalP: 'Nous venons à vous, réparons mécaniquement sur place, et votre cargo bike est de nouveau prêt. Prix fixes. Déplacement Zurich CHF 49.',
    finalBtn: 'Réserver le service cargo',
    finalContactSuffix: 'Atelier cargo bike mobile pour tout Zurich',
    waMsgIntro: 'Bonjour VELOV ! 👋\nJe souhaite réserver un service cargo :',
    waMsgPkg: 'Forfait',
    waMsgExtras: 'Options',
    waMsgTotal: 'Total (prix fixe)',
    waMsgAddrLine: 'Adresse / créneau souhaité :',
    waMsgAddrPh: '(à compléter)',
    waMsgEnd: 'Merci !',
    packages: {
      basic:    { name: 'Cargo Basic',    price:  99, desc: 'Contrôle de sécurité + serrage de toutes les vis — idéal entre deux services' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Service annuel approfondi pour votre cargo bike — best-seller' },
      premium:  { name: 'Cargo Premium',  price: 259, desc: 'Service complet + dévoilage des roues, nettoyage & rapport d\'état' }
    },
    extras: [
      { id: 'tire',   label: 'Changement pneu (cargo, avec chambre)', price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Plaquettes de frein avant',             price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Plaquettes de frein arrière',           price: 55, icon: '🛑' },
      { id: 'hydrF',  label: 'Purge frein hydraulique avant',         price: 49, icon: '💧' },
      { id: 'hydrR',  label: 'Purge frein hydraulique arrière',       price: 65, icon: '💧' },
      { id: 'chain',  label: 'Changement de chaîne',                  price: 39, icon: '⛓️' },
      { id: 'lenk',   label: 'Réglage direction articulée',           price: 39, icon: '↔️' },
      { id: 'box',    label: 'Réparation caisson (mécanique)',        price: 49, icon: '📦' },
      { id: 'wheel',  label: 'Dévoilage des roues (à l\'œil)',         price: 45, icon: '🎯' },
      { id: 'anfahrt',label: 'Déplacement Zurich ville',              price: 49, icon: '🚐' }
    ],
    hotspots: [
      { id: 'box',   x: 22, y: 55, title: 'Caisson & sangles',     body: 'Serrure, capot, fixations, sièges enfant — réparation dès CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Transmission & chaîne', body: 'Changement de chaîne dès CHF 39. Tous les cargo bikes, tous les moteurs.' },
      { id: 'brake', x: 70, y: 40, title: 'Freins hydrauliques',   body: 'Plaquettes avant CHF 35 · arrière CHF 55. Purge avant CHF 49 · arrière CHF 65.' },
      { id: 'wheel', x: 82, y: 70, title: 'Roue arrière / vitesses', body: 'Dévoilage CHF 45. Réglage des vitesses dès CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Direction articulée',   body: 'Vérification & réglage du joint de direction — CHF 39.' }
    ],
    faqs: [
      { q: 'Quelles marques de cargo bikes réparez-vous à Zurich ?', a: 'Toutes. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt, Omnium, Butchers & Bicycles, etc. Tous les moteurs (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' },
      { q: 'Combien coûte le service cargo bike ?', a: 'Cargo Basic CHF 99 · Cargo Standard CHF 229 · Cargo Premium CHF 259. Plus déplacement Zurich CHF 49. Prix fixes — seul le contenu est adapté.' },
      { q: 'Quelle différence entre Cargo Standard et Premium ?', a: 'Premium (CHF 259) inclut tout du Standard (CHF 229) + dévoilage des roues à l\'œil et nettoyage complet. Standard pour le service annuel.' },
      { q: 'Réparez-vous aussi les e-cargo bikes ?', a: 'Oui — toutes les pièces mécaniques également sur les e-cargo bikes. Diagnostic moteur, firmware et tests batterie ne sont pas inclus.' },
      { q: 'Réparez-vous aussi le caisson ?', a: 'Oui. Serrure, sangles, capot et fixations en standard (dès CHF 49). Les plus grosses réparations bois/plastique selon le modèle.' },
      { q: 'Comment fonctionne le service mobile pour ces vélos lourds ?', a: 'Nous arrivons avec notre atelier mobile directement chez vous — parfait pour 30–60 kg de cargo. Allée, cour, garage ou rue.' }
    ],
    recos: {
      basic:    { emoji: '🌟', title: 'Cargo Basic — parfait',         msg: 'Votre cargo est en bon état. Un check Basic suffit : sécurité, serrage des vis, pression des pneus, contrôle visuel freins & vitesses.' },
      standard: { emoji: '🛠️', title: 'Cargo Standard — recommandé', msg: 'L\'usage quotidien laisse des traces. Le service Standard règle freins et vitesses, vérifie jeu de direction, boîtier de pédalier et câbles — sur place.' },
      premium:  { emoji: '🔥', title: 'Cargo Premium — fortement conseillé', msg: 'Pour les cargo bikes très utilisés : tout du Standard + dévoilage à l\'œil, nettoyage complet, tous les roulements + rapport d\'état détaillé.' }
    },
    recoBookSuffix: 'maintenant →'
  },

  IT: {
    seoH1: 'Servizio Cargo Bike Zurigo – Manutenzione & riparazione per cargo bike',
    seoIntro: 'Servizio cargo bike mobile a Zurigo. Manuteniamo e ripariamo cargo bike di tutte le marche: Riese & Müller, Urban Arrow, Tern, Yuba, Larry vs Harry. Veniamo da te.',
    heroBadge: 'Servizio cargo bike mobile · tutta Zurigo',
    heroH1Pre: 'Riparazione cargo bike',
    heroH1Mid: 'direttamente da te',
    heroH1Post: 'a Zurigo',
    heroLead: 'Basta trascinare 40 kg di cargo bike. La nostra officina mobile arriva in bici & cargo bike — ogni marca, ogni motore, prezzi fissi trasparenti. Riparazione meccanica sul posto.',
    ctaPrimary: '📞 Prenota subito',
    ctaGhost: 'Calcola il prezzo →',
    trust: ['⭐ 4.8 / 5 recensioni Google', '🚐 Officina mobile', '🚲 Tutte le marche cargo', '💰 Prezzo fisso · Trasferta CHF 49'],
    whyLabel: 'Perché mobile',
    whyTitle: 'Servizio cargo che viene da te',
    whySub: 'I cargo bike sono pesanti, ingombranti, difficili da trasportare. Per questo veniamo con tutta l\'attrezzatura a casa, in ufficio o nel tuo posto preferito a Zurigo.',
    whyCards: [
      { icon: '🏠', t: 'Da te', p: 'Niente più trascinare un cargo da 40 kg+. Ripariamo davanti a casa tua, nel cortile o in strada.' },
      { icon: '🔧', t: 'Specialisti cargo', p: 'Esperienza con 2 ruote, 3 ruote, long-tail e front-loader. Freni, cambio, trasmissione, ruote, cassa — tutto in uno.' },
      { icon: '🚲', t: 'Tutte le marche & motori', p: 'Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt — qualunque motore (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' }
    ],
    calcLabel: 'Calcolatore',
    calcTitle: 'Quanto costa il tuo servizio cargo?',
    calcSub: 'Scegli il pacchetto, spunta gli extra — il totale si aggiorna in tempo reale. Niente costi nascosti.',
    calcStep1: '1. Scegli il pacchetto base',
    calcStep2: '2. Aggiungi extra (facoltativi)',
    calcTotalLabel: 'Il tuo prezzo fisso',
    calcFine: 'Trasferta Zurigo città CHF 49 · pezzi a consumo · riparazione meccanica',
    calcWaBtn: 'Prenota via WhatsApp',
    diagLabel: 'Interattivo',
    diagTitle: 'Clicca sul tuo cargo bike — ti mostriamo cosa ripariamo',
    diagSub: 'Ogni punto è un\'area di servizio. Tocca per prezzo & dettagli.',
    diagHint: '👆 Tocca un punto arancione per i dettagli',
    sliderLabel: 'Ne vale la pena?',
    sliderTitle: 'Il tuo cargo bike merita una riparazione?',
    sliderSub: 'Sposta il cursore in base allo stato del cargo — consigliamo il pacchetto giusto.',
    sliderQ: 'Qual è lo stato attuale?',
    sliderL: ['🌟 Come nuovo', '🔧 Uso quotidiano', '⚠️ Molto usurato'],
    faqLabel: 'FAQ',
    faqTitle: 'Domande frequenti sul servizio cargo',
    faqSub: 'Tutto quello che vuoi sapere prima di prenotare — risposte chiare e oneste.',
    finalH2: 'Servizio cargo bike a Zurigo — senza trascinare, senza stress',
    finalP: 'Veniamo da te, ripariamo meccanicamente sul posto, il tuo cargo bike è di nuovo pronto. Prezzi fissi. Trasferta Zurigo CHF 49.',
    finalBtn: 'Prenota il servizio cargo',
    finalContactSuffix: 'Officina cargo bike mobile per tutta Zurigo',
    waMsgIntro: 'Ciao VELOV! 👋\nVorrei prenotare un servizio cargo:',
    waMsgPkg: 'Pacchetto',
    waMsgExtras: 'Extra',
    waMsgTotal: 'Totale (prezzo fisso)',
    waMsgAddrLine: 'Indirizzo / fascia oraria:',
    waMsgAddrPh: '(da compilare)',
    waMsgEnd: 'Grazie!',
    packages: {
      basic:    { name: 'Cargo Basic',    price:  99, desc: 'Controllo sicurezza + serraggio bulloni — ideale tra due servizi' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Servizio annuale completo — il più richiesto' },
      premium:  { name: 'Cargo Premium',  price: 259, desc: 'Servizio completo + centratura ruote, pulizia & rapporto stato' }
    },
    extras: [
      { id: 'tire',   label: 'Cambio gomma (cargo, con camera d\'aria)', price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Pastiglie freno anteriori',                 price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Pastiglie freno posteriori',                price: 55, icon: '🛑' },
      { id: 'hydrF',  label: 'Spurgo freno idraulico anteriore',          price: 49, icon: '💧' },
      { id: 'hydrR',  label: 'Spurgo freno idraulico posteriore',         price: 65, icon: '💧' },
      { id: 'chain',  label: 'Sostituzione catena',                       price: 39, icon: '⛓️' },
      { id: 'lenk',   label: 'Regolazione sterzo articolato',             price: 39, icon: '↔️' },
      { id: 'box',    label: 'Riparazione cassa (meccanica)',             price: 49, icon: '📦' },
      { id: 'wheel',  label: 'Centratura ruote (a vista)',                price: 45, icon: '🎯' },
      { id: 'anfahrt',label: 'Trasferta Zurigo città',                    price: 49, icon: '🚐' }
    ],
    hotspots: [
      { id: 'box',   x: 22, y: 55, title: 'Cassa & cinghie',     body: 'Serratura, copertura, fissaggi, seggiolini — riparazione da CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Trasmissione & catena', body: 'Cambio catena da CHF 39. Tutti i cargo bike, tutti i motori.' },
      { id: 'brake', x: 70, y: 40, title: 'Freni idraulici',     body: 'Pastiglie anteriori CHF 35 · posteriori CHF 55. Spurgo ant. CHF 49 · post. CHF 65.' },
      { id: 'wheel', x: 82, y: 70, title: 'Ruota posteriore / cambio', body: 'Centratura CHF 45. Regolazione cambio da CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Sterzo articolato',   body: 'Verifica & regolazione giunto sterzo — CHF 39.' }
    ],
    faqs: [
      { q: 'Quali marche di cargo bike riparate a Zurigo?', a: 'Tutte. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt, Omnium, Butchers & Bicycles e molte altre. Qualsiasi motore (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' },
      { q: 'Quanto costa il servizio cargo bike?', a: 'Cargo Basic CHF 99 · Cargo Standard CHF 229 · Cargo Premium CHF 259. Più trasferta Zurigo CHF 49. Prezzi fissi.' },
      { q: 'Differenza tra Cargo Standard e Premium?', a: 'Premium (CHF 259) include tutto Standard (CHF 229) + centratura ruote a vista e pulizia completa.' },
      { q: 'Riparate anche e-cargo bike con motore?', a: 'Sì — tutte le parti meccaniche anche sugli e-cargo bike. Diagnosi motore, firmware e test batteria non sono inclusi.' },
      { q: 'Riparate anche la cassa?', a: 'Sì. Serratura, cinghie, copertura e fissaggi di standard (da CHF 49). Riparazioni più grandi su misura.' },
      { q: 'Come funziona il servizio mobile per cargo pesanti?', a: 'Veniamo con la nostra officina mobile direttamente da te — ideale per 30–60 kg di cargo. Vialetto, cortile, garage o strada.' }
    ],
    recos: {
      basic:    { emoji: '🌟', title: 'Cargo Basic — perfetto',          msg: 'Il tuo cargo è in buono stato. Basta un Basic check: sicurezza, serraggio, pressione gomme, controllo visivo freni & cambio.' },
      standard: { emoji: '🛠️', title: 'Cargo Standard — consigliato',  msg: 'L\'uso quotidiano lascia il segno. Il servizio Standard regola freni e cambio, controlla serie sterzo, movimento centrale e cavi — sul posto.' },
      premium:  { emoji: '🔥', title: 'Cargo Premium — vivamente consigliato', msg: 'Per cargo bike molto utilizzati: tutto lo Standard + centratura a vista, pulizia completa, tutti i cuscinetti registrati e rapporto sullo stato.' }
    },
    recoBookSuffix: 'subito →'
  },

  ES: {
    seoH1: 'Servicio Cargo Bike Zúrich – Mantenimiento y reparación para bicis cargo',
    seoIntro: 'Servicio móvil de cargo bike en Zúrich. Mantenemos y reparamos cargo bikes de todas las marcas: Riese & Müller, Urban Arrow, Tern, Yuba, Larry vs Harry. Vamos donde estés.',
    heroBadge: 'Servicio móvil cargo bike · todo Zúrich',
    heroH1Pre: 'Reparación cargo bike',
    heroH1Mid: 'donde tú estés',
    heroH1Post: 'en Zúrich',
    heroLead: 'Se acabó arrastrar 40 kg de cargo bike. Nuestro taller móvil llega en bici & cargo bike — todas las marcas, todos los motores, precios fijos transparentes. Reparación mecánica in situ.',
    ctaPrimary: '📞 Reservar ahora',
    ctaGhost: 'Calcular precio →',
    trust: ['⭐ 4.8 / 5 reseñas Google', '🚐 Taller móvil', '🚲 Todas las marcas cargo', '💰 Precio fijo · Desplazamiento CHF 49'],
    whyLabel: 'Por qué móvil',
    whyTitle: 'Servicio cargo que va a ti',
    whySub: 'Las cargo bikes son pesadas, voluminosas y difíciles de transportar. Por eso vamos con todo el equipo a tu casa, oficina o tu spot favorito en Zúrich.',
    whyCards: [
      { icon: '🏠', t: 'Donde estés', p: 'No más arrastrar 40 kg+. Reparamos en tu puerta, patio o calle.' },
      { icon: '🔧', t: 'Especialistas cargo', p: 'Experiencia con 2 ruedas, 3 ruedas, long-tail y front-loader. Frenos, cambios, transmisión, ruedas, caja — todo a la vez.' },
      { icon: '🚲', t: 'Todas marcas y motores', p: 'Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt — cualquier motor (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' }
    ],
    calcLabel: 'Calculadora',
    calcTitle: '¿Cuánto cuesta tu servicio cargo?',
    calcSub: 'Elige tu paquete, marca los extras — el total se actualiza en vivo. Sin costes ocultos.',
    calcStep1: '1. Elige el paquete base',
    calcStep2: '2. Añade extras (opcional)',
    calcTotalLabel: 'Tu precio fijo',
    calcFine: 'Desplazamiento Zúrich ciudad CHF 49 · piezas según necesidad · reparación mecánica',
    calcWaBtn: 'Reservar por WhatsApp',
    diagLabel: 'Interactivo',
    diagTitle: 'Haz clic en tu cargo bike — te mostramos qué reparamos',
    diagSub: 'Cada punto es un área de servicio. Toca para ver precio & detalles.',
    diagHint: '👆 Toca un punto naranja para ver los detalles',
    sliderLabel: '¿Vale la pena?',
    sliderTitle: '¿Tu cargo bike merece una reparación?',
    sliderSub: 'Mueve el deslizador según el estado actual — recomendamos el paquete adecuado.',
    sliderQ: '¿Cuál es el estado actual?',
    sliderL: ['🌟 Como nueva', '🔧 Uso normal', '⚠️ Muy usada'],
    faqLabel: 'FAQ',
    faqTitle: 'Preguntas frecuentes sobre el servicio cargo',
    faqSub: 'Todo lo que quieres saber antes de reservar — respondido con honestidad.',
    finalH2: 'Servicio cargo bike en Zúrich — sin transportar, sin estrés',
    finalP: 'Vamos a ti, reparamos mecánicamente in situ, y tu cargo bike vuelve a estar lista. Precios fijos. Desplazamiento Zúrich CHF 49.',
    finalBtn: 'Reservar el servicio cargo',
    finalContactSuffix: 'Taller móvil cargo bike para todo Zúrich',
    waMsgIntro: '¡Hola VELOV! 👋\nQuiero reservar un servicio cargo:',
    waMsgPkg: 'Paquete',
    waMsgExtras: 'Extras',
    waMsgTotal: 'Total (precio fijo)',
    waMsgAddrLine: 'Dirección / franja horaria:',
    waMsgAddrPh: '(por favor rellenar)',
    waMsgEnd: '¡Gracias!',
    packages: {
      basic:    { name: 'Cargo Basic',    price:  99, desc: 'Revisión de seguridad + apriete de tornillos — ideal entre dos servicios' },
      standard: { name: 'Cargo Standard', price: 229, desc: 'Servicio anual completo — el más solicitado' },
      premium:  { name: 'Cargo Premium',  price: 259, desc: 'Servicio completo + centrado de ruedas, limpieza & informe' }
    },
    extras: [
      { id: 'tire',   label: 'Cambio de cubierta (cargo, con cámara)', price: 59, icon: '🛞' },
      { id: 'brakeF', label: 'Pastillas de freno delanteras',          price: 35, icon: '🛑' },
      { id: 'brakeR', label: 'Pastillas de freno traseras',            price: 55, icon: '🛑' },
      { id: 'hydrF',  label: 'Purga freno hidráulico delantero',       price: 49, icon: '💧' },
      { id: 'hydrR',  label: 'Purga freno hidráulico trasero',         price: 65, icon: '💧' },
      { id: 'chain',  label: 'Cambio de cadena',                       price: 39, icon: '⛓️' },
      { id: 'lenk',   label: 'Ajuste dirección articulada',            price: 39, icon: '↔️' },
      { id: 'box',    label: 'Reparación caja (mecánica)',             price: 49, icon: '📦' },
      { id: 'wheel',  label: 'Centrado de ruedas (a ojo)',             price: 45, icon: '🎯' },
      { id: 'anfahrt',label: 'Desplazamiento Zúrich ciudad',           price: 49, icon: '🚐' }
    ],
    hotspots: [
      { id: 'box',   x: 22, y: 55, title: 'Caja & correas',      body: 'Cerradura, cubierta, fijaciones, sillas infantiles — reparación desde CHF 49.' },
      { id: 'motor', x: 54, y: 68, title: 'Transmisión & cadena', body: 'Cambio de cadena desde CHF 39. Todas las cargo bikes, todos los motores.' },
      { id: 'brake', x: 70, y: 40, title: 'Frenos hidráulicos',   body: 'Pastillas delanteras CHF 35 · traseras CHF 55. Purga del. CHF 49 · tras. CHF 65.' },
      { id: 'wheel', x: 82, y: 70, title: 'Rueda trasera / cambios', body: 'Centrado CHF 45. Ajuste de cambios desde CHF 29.' },
      { id: 'front', x: 35, y: 36, title: 'Dirección articulada', body: 'Verificación & ajuste de la articulación — CHF 39.' }
    ],
    faqs: [
      { q: '¿Qué marcas de cargo bike reparáis en Zúrich?', a: 'Todas. Urban Arrow, Babboe, Riese & Müller, Ca Go, Tern GSD, Yuba, Bullitt, Omnium, Butchers & Bicycles y muchas más. Cualquier motor (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha).' },
      { q: '¿Cuánto cuesta el servicio cargo bike?', a: 'Cargo Basic CHF 99 · Cargo Standard CHF 229 · Cargo Premium CHF 259. Más desplazamiento Zúrich CHF 49. Precios fijos.' },
      { q: '¿Diferencia entre Cargo Standard y Premium?', a: 'Premium (CHF 259) incluye todo el Standard (CHF 229) + centrado de ruedas a ojo y limpieza completa.' },
      { q: '¿Reparáis también e-cargo bikes con motor?', a: 'Sí — todas las partes mecánicas también en e-cargo bikes. Diagnóstico de motor, firmware y test de batería no incluidos.' },
      { q: '¿Reparáis también la caja?', a: 'Sí. Cerradura, correas, cubierta y fijaciones como estándar (desde CHF 49). Reparaciones mayores según modelo.' },
      { q: '¿Cómo funciona el servicio móvil con cargas tan pesadas?', a: 'Llegamos con nuestro taller móvil directamente a ti — perfecto para 30–60 kg. Entrada, patio, garaje o calle.' }
    ],
    recos: {
      basic:    { emoji: '🌟', title: 'Cargo Basic — perfecto',          msg: 'Tu cargo está en buen estado. Basta un Basic check: seguridad, apriete, presión de neumáticos, control visual frenos & cambios.' },
      standard: { emoji: '🛠️', title: 'Cargo Standard — recomendado',  msg: 'El uso diario deja huella. El servicio Standard ajusta frenos y cambios, revisa dirección, eje pedalier y cables — in situ.' },
      premium:  { emoji: '🔥', title: 'Cargo Premium — muy recomendado', msg: 'Para cargo bikes muy usadas: todo el Standard + centrado a ojo, limpieza completa, todos los rodamientos ajustados e informe escrito.' }
    },
    recoBookSuffix: 'ya →'
  }
};

/* SEO config per language (mirror + JSON-LD) */
function _velovCargoBuildSeo(lang) {
  const t = VELOV_CARGO_I18N[lang] || VELOV_CARGO_I18N.DE;
  const base = {
    id: 'cargo_' + lang.toLowerCase(),
    h1: t.seoH1,
    intro: t.seoIntro,
    sections: [
      { h2: t.calcTitle, body: t.calcSub },
      { h2: t.whyTitle, body: t.whySub }
    ],
    faqs: t.faqs,
    contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch'
  };
  // attach schema only on DE to avoid duplicates
  if (lang === 'DE') {
    base.schema = [
      {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "AutoRepair"],
        "@id": "https://www.velov.ch/cargo#business",
        "name": "VELOV — Mobile Cargo Bike Service Zürich",
        "image": "https://www.velov.ch/og-image.jpg",
        "url": "https://www.velov.ch/cargo",
        "telephone": "+41762352126",
        "email": "info@velov.ch",
        "priceRange": "CHF 99 – CHF 259",
        "address": { "@type": "PostalAddress", "streetAddress": "Merkurstrasse 56", "addressLocality": "Zürich", "addressRegion": "ZH", "postalCode": "8032", "addressCountry": "CH" },
        "geo": { "@type": "GeoCoordinates", "latitude": 47.3769, "longitude": 8.5417 },
        "areaServed": [ { "@type": "City", "name": "Zürich" }, { "@type": "AdministrativeArea", "name": "Kanton Zürich" } ],
        "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "08:00", "closes": "20:00" }],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "500" },
        "sameAs": ["https://g.page/r/Cde-mb4tOTU-EAE"]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.velov.ch" },
          { "@type": "ListItem", "position": 2, "name": "Cargo-Bike Service", "item": "https://www.velov.ch/cargo" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": "Cargo Bike Service Zürich — Pakete",
        "itemListElement": Object.values(t.packages).map(function(p, i){
          return {
            "@type": "Offer",
            "position": i + 1,
            "name": p.name,
            "description": p.desc,
            "priceCurrency": "CHF",
            "price": p.price,
            "availability": "https://schema.org/InStock",
            "areaServed": "Zürich"
          };
        })
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": t.faqs.map(function(f){
          return { "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } };
        })
      }
    ];
  }
  return base;
}

class VelovCargo extends HTMLElement {
  static CONFIG = {
    phone:    '+41762352126',
    waNumber: '41762352126',
    email:    'info@velov.ch',
    city:     'Zürich',
    currency: 'CHF'
  };

  constructor() {
    super();
    this.state = {
      basePkg: 'standard',
      extras: new Set(),
      hotspot: null,
      slider: 5
    };
  }

  detectLang() {
    const supported = ['DE', 'EN', 'FR', 'IT', 'ES'];
    const explicit = this.getAttribute('lang');
    if (explicit) {
      const up = explicit.toUpperCase().slice(0, 2);
      if (supported.includes(up)) return up;
    }
    if (typeof window !== 'undefined' && window.__VELOV_LANG__) {
      const w = String(window.__VELOV_LANG__).toUpperCase().slice(0, 2);
      if (supported.includes(w)) return w;
    }
    if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
      const d = document.documentElement.lang.toUpperCase().slice(0, 2);
      if (supported.includes(d)) return d;
    }
    return 'DE';
  }

  connectedCallback() {
    this.lang = this.detectLang();
    this.t = VELOV_CARGO_I18N[this.lang] || VELOV_CARGO_I18N.DE;
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, _velovCargoBuildSeo(this.lang)); } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this); } catch(e) {}

    this.injectStyles();
    this.render();
    this.attachEvents();
  }

  disconnectedCallback() {
    const s = document.getElementById('velov-cargo-schema');
    if (s) s.remove();
  }

  injectStyles() {
    if (document.getElementById('velov-cargo-styles')) return;
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
    velov-cargo{display:block;--v-purple:#7B68EE;--v-purple-dark:#6354d4;--v-orange:#E8573A;--v-orange-dark:#d14a30;--v-dark:#2D2B3D;--v-warm:#F5F0EB;--v-white:#fff;--v-text:#2D2B3D;--v-muted:#6B6880;--v-border:#E8E4DF;--v-green:#4CAF50;--v-shadow:0 12px 32px rgba(123,104,238,.10);--v-shadow-lg:0 20px 50px rgba(45,43,61,.12);font-family:'DM Sans',system-ui,-apple-system,sans-serif;color:var(--v-text);line-height:1.6;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
    velov-cargo *,velov-cargo *::before,velov-cargo *::after{margin:0;padding:0;box-sizing:border-box}
    velov-cargo .v-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
    velov-cargo .v-section{padding:112px 0}
    velov-cargo .v-label{display:inline-block;font-size:12px;font-weight:700;color:var(--v-purple);text-transform:uppercase;letter-spacing:1.8px;margin-bottom:12px}
    velov-cargo .v-title{font-size:clamp(26px,3.6vw,40px);font-weight:800;color:var(--v-dark);line-height:1.15;margin-bottom:16px;letter-spacing:-.02em}
    velov-cargo .v-sub{font-size:17px;color:var(--v-muted);max-width:620px;line-height:1.65}
    velov-cargo .v-center{text-align:center}
    velov-cargo .v-center .v-sub{margin-left:auto;margin-right:auto}
    velov-cargo .v-hero{background:radial-gradient(circle at 20% 20%,#3a3460 0%,var(--v-dark) 55%,#1a1833 100%);color:#fff;padding:96px 0 120px;text-align:center;position:relative;overflow:hidden}
    velov-cargo .v-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(123,104,238,.25),transparent 65%);filter:blur(40px)}
    velov-cargo .v-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:60px;background:var(--v-warm);border-radius:60% 60% 0 0 / 100% 100% 0 0}
    velov-cargo .v-hero-inner{position:relative;z-index:2}
    velov-cargo .v-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);padding:8px 18px;border-radius:50px;font-size:13px;font-weight:600;margin-bottom:24px;backdrop-filter:blur(10px)}
    velov-cargo .v-badge .v-dot{width:8px;height:8px;border-radius:50%;background:#4ADE80;box-shadow:0 0 12px #4ADE80;animation:v-pulse 2s infinite}
    @keyframes v-pulse{0%,100%{opacity:1}50%{opacity:.5}}
    velov-cargo h1.v-h1{font-size:clamp(34px,5.2vw,58px);font-weight:800;line-height:1.05;margin:0 auto 20px;max-width:900px;letter-spacing:-.025em}
    velov-cargo h1.v-h1 .v-grad{background:linear-gradient(90deg,var(--v-purple) 0%,#a394ff 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
    velov-cargo .v-hero p.v-lead{font-size:19px;opacity:.85;max-width:650px;margin:0 auto 32px;line-height:1.55}
    velov-cargo .v-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
    velov-cargo .v-cta{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;text-decoration:none;font-weight:700;border-radius:50px;font-size:15px;transition:all .22s;border:2px solid transparent}
    velov-cargo .v-cta-primary{background:var(--v-orange);color:#fff;box-shadow:0 8px 22px rgba(232,87,58,.32)}
    velov-cargo .v-cta-primary:hover{background:var(--v-orange-dark);transform:translateY(-2px);box-shadow:0 12px 28px rgba(232,87,58,.45)}
    velov-cargo .v-cta-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.3)}
    velov-cargo .v-cta-ghost:hover{background:rgba(255,255,255,.08)}
    velov-cargo .v-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;margin-top:38px;font-size:14px;opacity:.85}
    velov-cargo .v-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
    velov-cargo .v-info{background:var(--v-white);border-radius:20px;padding:36px 28px;text-align:left;box-shadow:var(--v-shadow);border:1px solid var(--v-border);transition:all .25s}
    velov-cargo .v-info:hover{transform:translateY(-4px);box-shadow:var(--v-shadow-lg)}
    velov-cargo .v-info-icon{font-size:34px;display:inline-block;margin-bottom:14px}
    velov-cargo .v-info h3{font-size:19px;font-weight:700;color:var(--v-dark);margin-bottom:8px}
    velov-cargo .v-info p{font-size:15px;color:var(--v-muted);line-height:1.6}
    velov-cargo .v-calc{margin-top:48px;background:var(--v-white);border-radius:28px;padding:44px;box-shadow:var(--v-shadow);border:1px solid var(--v-border)}
    velov-cargo .v-calc-top{display:grid;grid-template-columns:1fr 1.2fr;gap:48px}
    velov-cargo .v-calc h3{font-size:15px;font-weight:700;color:var(--v-dark);margin-bottom:18px}
    velov-cargo .v-pkg-opts{display:flex;flex-direction:column;gap:12px}
    velov-cargo .v-pkg-opt{display:flex;align-items:flex-start;gap:14px;padding:18px 20px;border:2px solid var(--v-border);border-radius:16px;cursor:pointer;transition:all .2s}
    velov-cargo .v-pkg-opt:hover{border-color:var(--v-purple)}
    velov-cargo .v-pkg-opt.active{border-color:var(--v-purple);background:#ede9ff}
    velov-cargo .v-pkg-opt input{display:none}
    velov-cargo .v-radio{width:22px;height:22px;border:2px solid var(--v-border);border-radius:50%;flex-shrink:0;margin-top:2px;position:relative;transition:all .2s}
    velov-cargo .v-pkg-opt.active .v-radio{border-color:var(--v-purple)}
    velov-cargo .v-pkg-opt.active .v-radio::after{content:'';position:absolute;inset:4px;border-radius:50%;background:var(--v-purple)}
    velov-cargo .v-pkg-info{flex:1;display:block}
    velov-cargo .v-pkg-name{display:flex;justify-content:space-between;font-weight:700;color:var(--v-dark);margin-bottom:4px}
    velov-cargo .v-pkg-price{color:var(--v-purple)}
    velov-cargo .v-pkg-desc{font-size:13.5px;color:var(--v-muted)}
    velov-cargo .v-extras-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    velov-cargo .v-ext-opt{display:flex;align-items:center;gap:10px;padding:11px 13px;border:1.5px solid var(--v-border);border-radius:11px;cursor:pointer;transition:all .15s;font-size:13.5px}
    velov-cargo .v-ext-opt:hover{border-color:var(--v-purple)}
    velov-cargo .v-ext-opt.active{border-color:var(--v-purple);background:#ede9ff}
    velov-cargo .v-ext-opt input{display:none}
    velov-cargo .v-check{width:18px;height:18px;border:2px solid var(--v-border);border-radius:5px;flex-shrink:0;position:relative;transition:all .2s}
    velov-cargo .v-ext-opt.active .v-check{background:var(--v-purple);border-color:var(--v-purple)}
    velov-cargo .v-ext-opt.active .v-check::after{content:'✓';position:absolute;inset:0;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center}
    velov-cargo .v-ext-icon{font-size:16px;flex-shrink:0}
    velov-cargo .v-ext-label{flex:1;color:var(--v-dark)}
    velov-cargo .v-ext-price{font-weight:700;color:var(--v-purple);font-size:13px;white-space:nowrap}
    velov-cargo .v-calc-total{margin-top:36px;padding-top:28px;border-top:2px dashed var(--v-border);display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}
    velov-cargo .v-total-lbl{font-size:13px;color:var(--v-muted);font-weight:600;text-transform:uppercase;letter-spacing:1px}
    velov-cargo .v-total-amt{font-size:42px;font-weight:800;color:var(--v-dark);line-height:1;margin-top:4px}
    velov-cargo .v-total-amt small{font-size:17px;color:var(--v-muted);font-weight:600;margin-left:6px}
    velov-cargo .v-total-fine{font-size:12.5px;color:var(--v-muted);margin-top:6px}
    velov-cargo .v-wa-btn{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;text-decoration:none;font-weight:700;padding:16px 28px;border-radius:50px;font-size:15.5px;transition:all .2s;box-shadow:0 8px 22px rgba(37,211,102,.3)}
    velov-cargo .v-wa-btn:hover{background:#1ebe5b;transform:translateY(-2px);box-shadow:0 12px 28px rgba(37,211,102,.45)}
    velov-cargo .v-wa-btn svg{width:20px;height:20px}
    velov-cargo .v-diag-wrap{margin-top:48px;background:var(--v-white);border-radius:28px;padding:40px;box-shadow:var(--v-shadow);border:1px solid var(--v-border);position:relative}
    velov-cargo .v-diag-svg{width:100%;max-width:720px;display:block;margin:0 auto;height:auto}
    velov-cargo .v-hs{cursor:pointer}
    velov-cargo .v-hs-circle{fill:var(--v-orange);stroke:#fff;stroke-width:3;transition:all .22s;filter:drop-shadow(0 4px 8px rgba(232,87,58,.4))}
    velov-cargo .v-hs:hover .v-hs-circle,velov-cargo .v-hs.active .v-hs-circle{fill:var(--v-purple);r:14}
    velov-cargo .v-hs-pulse{fill:var(--v-orange);opacity:.4;animation:v-hspulse 2s infinite}
    velov-cargo .v-hs.active .v-hs-pulse{fill:var(--v-purple)}
    @keyframes v-hspulse{0%{r:10;opacity:.5}100%{r:22;opacity:0}}
    velov-cargo .v-hs-num{fill:#fff;font-size:12px;font-weight:800;font-family:'DM Sans',sans-serif;text-anchor:middle;pointer-events:none}
    velov-cargo .v-diag-panel{margin-top:24px;padding:22px;background:var(--v-warm);border-radius:16px;min-height:96px;transition:all .3s}
    velov-cargo .v-diag-panel.filled{background:#ede9ff;border-left:4px solid var(--v-purple)}
    velov-cargo .v-diag-panel h4{font-size:17px;font-weight:700;color:var(--v-dark);margin-bottom:6px}
    velov-cargo .v-diag-panel p{font-size:14.5px;color:var(--v-muted);line-height:1.55}
    velov-cargo .v-diag-hint{font-size:13.5px;color:var(--v-muted);font-style:italic;text-align:center}
    velov-cargo .v-slider-card{margin-top:48px;background:var(--v-white);border-radius:28px;padding:44px;box-shadow:var(--v-shadow);border:1px solid var(--v-border)}
    velov-cargo .v-slider-wrap{margin-top:26px;padding:8px 4px}
    velov-cargo .v-slider-range{-webkit-appearance:none;appearance:none;width:100%;height:12px;border-radius:6px;background:linear-gradient(90deg,#4ADE80 0%,#FFD60A 50%,#E8573A 100%);outline:none;cursor:pointer}
    velov-cargo .v-slider-range::-webkit-slider-thumb{-webkit-appearance:none;width:32px;height:32px;border-radius:50%;background:var(--v-white);border:4px solid var(--v-purple);cursor:pointer;box-shadow:0 4px 14px rgba(123,104,238,.35);transition:all .2s}
    velov-cargo .v-slider-range::-webkit-slider-thumb:hover{transform:scale(1.1)}
    velov-cargo .v-slider-range::-moz-range-thumb{width:32px;height:32px;border-radius:50%;background:var(--v-white);border:4px solid var(--v-purple);cursor:pointer;box-shadow:0 4px 14px rgba(123,104,238,.35)}
    velov-cargo .v-slider-labels{display:flex;justify-content:space-between;margin-top:14px;font-size:13px;color:var(--v-muted);font-weight:500}
    velov-cargo .v-reco{margin-top:32px;padding:26px;border-radius:18px;background:var(--v-warm);transition:all .3s}
    velov-cargo .v-reco.basic{background:linear-gradient(135deg,#e8f5e9,#c8e6c9)}
    velov-cargo .v-reco.standard{background:linear-gradient(135deg,#ede9ff,#d7ccff)}
    velov-cargo .v-reco.premium{background:linear-gradient(135deg,#ffeee6,#ffd6c2)}
    velov-cargo .v-reco-head{display:flex;align-items:center;gap:14px;margin-bottom:10px}
    velov-cargo .v-reco-emoji{font-size:36px}
    velov-cargo .v-reco-title{font-size:20px;font-weight:800;color:var(--v-dark)}
    velov-cargo .v-reco-price{margin-left:auto;font-size:22px;font-weight:800;color:var(--v-purple)}
    velov-cargo .v-reco p{font-size:14.5px;color:var(--v-dark);line-height:1.55}
    velov-cargo .v-reco-btn{display:inline-block;margin-top:14px;background:var(--v-dark);color:#fff;text-decoration:none;padding:12px 22px;border-radius:50px;font-weight:700;font-size:14px;transition:all .2s}
    velov-cargo .v-reco-btn:hover{background:var(--v-purple);transform:translateY(-2px)}
    velov-cargo .v-faq-list{margin-top:40px;max-width:760px;margin-left:auto;margin-right:auto}
    velov-cargo .v-faq-item{background:var(--v-white);border-radius:16px;margin-bottom:12px;border:1px solid var(--v-border);overflow:hidden;transition:all .2s}
    velov-cargo .v-faq-item:hover{border-color:var(--v-purple)}
    velov-cargo .v-faq-item.open{box-shadow:var(--v-shadow);border-color:var(--v-purple)}
    velov-cargo .v-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:none;border:none;font-family:inherit;font-size:16px;font-weight:700;color:var(--v-dark);text-align:left;cursor:pointer;gap:16px}
    velov-cargo .v-faq-ico{width:30px;height:30px;border-radius:50%;background:var(--v-warm);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s;color:var(--v-purple);font-weight:700}
    velov-cargo .v-faq-item.open .v-faq-ico{background:var(--v-purple);color:#fff;transform:rotate(45deg)}
    velov-cargo .v-faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 24px}
    velov-cargo .v-faq-item.open .v-faq-a{max-height:400px}
    velov-cargo .v-faq-a-inner{padding-bottom:20px;font-size:15px;color:var(--v-muted);line-height:1.65}
    velov-cargo .v-final-cta{background:linear-gradient(135deg,var(--v-purple),var(--v-purple-dark));color:#fff;text-align:center;padding:84px 0;position:relative;overflow:hidden}
    velov-cargo .v-final-cta::before{content:'';position:absolute;top:-50%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,255,255,.1),transparent 65%);filter:blur(50px)}
    velov-cargo .v-final-cta h2{font-size:clamp(28px,4vw,42px);font-weight:800;margin-bottom:14px;position:relative}
    velov-cargo .v-final-cta p{font-size:17px;opacity:.9;margin-bottom:30px;max-width:560px;margin-left:auto;margin-right:auto;position:relative}
    velov-cargo .v-btn-white{display:inline-block;background:#fff;color:var(--v-purple);text-decoration:none;font-weight:700;padding:16px 44px;border-radius:50px;font-size:17px;transition:all .22s;position:relative}
    velov-cargo .v-btn-white:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(0,0,0,.2)}
    velov-cargo .v-final-contact{margin-top:24px;font-size:14px;opacity:.8;position:relative}
    velov-cargo .v-final-contact a{color:#fff;text-decoration:underline}
    @media (max-width:880px){
      velov-cargo .v-section{padding:60px 0}
      velov-cargo .v-hero{padding:72px 0 96px}
      velov-cargo .v-info-grid{grid-template-columns:1fr;gap:14px}
      velov-cargo .v-calc{padding:28px 22px}
      velov-cargo .v-calc-top{grid-template-columns:1fr;gap:28px}
      velov-cargo .v-extras-grid{grid-template-columns:1fr}
      velov-cargo .v-calc-total{grid-template-columns:1fr;text-align:center}
      velov-cargo .v-wa-btn{justify-content:center}
      velov-cargo .v-diag-wrap,velov-cargo .v-slider-card{padding:26px 20px}
      velov-cargo .v-total-amt{font-size:36px}
      velov-cargo .v-cta-row{flex-direction:column;align-items:stretch}
      velov-cargo .v-cta{justify-content:center}
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
    const T = this.t;
    return `
    <section class="v-hero" aria-label="Hero">
      <div class="v-wrap v-hero-inner">
        <div class="v-badge"><span class="v-dot"></span> ${T.heroBadge}</div>
        <h1 class="v-h1">${T.heroH1Pre} <span class="v-grad">${T.heroH1Mid}</span> ${T.heroH1Post}</h1>
        <p class="v-lead">${T.heroLead}</p>
        <div class="v-cta-row">
          <a class="v-cta v-cta-primary" href="tel:${VelovCargo.CONFIG.phone}">${T.ctaPrimary}</a>
          <a class="v-cta v-cta-ghost" href="#v-calc">${T.ctaGhost}</a>
        </div>
        <div class="v-trust">
          ${T.trust.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    </section>`;
  }

  tplWhyMobile() {
    const T = this.t;
    return `
    <section class="v-section" style="background:var(--v-warm)">
      <div class="v-wrap v-center">
        <div class="v-label">${T.whyLabel}</div>
        <h2 class="v-title">${T.whyTitle}</h2>
        <p class="v-sub">${T.whySub}</p>
        <div class="v-info-grid">
          ${T.whyCards.map(c => `<article class="v-info"><div class="v-info-icon">${c.icon}</div><h3>${c.t}</h3><p>${c.p}</p></article>`).join('')}
        </div>
      </div>
    </section>`;
  }

  tplCalculator() {
    const T = this.t;
    const pkgOpts = Object.entries(T.packages).map(([key, p]) => `
      <label class="v-pkg-opt ${this.state.basePkg === key ? 'active' : ''}" data-pkg="${key}">
        <input type="radio" name="v-pkg" value="${key}" ${this.state.basePkg === key ? 'checked' : ''}>
        <span class="v-radio" aria-hidden="true"></span>
        <span class="v-pkg-info">
          <span class="v-pkg-name"><span>${p.name}</span><span class="v-pkg-price">CHF ${p.price}</span></span>
          <span class="v-pkg-desc">${p.desc}</span>
        </span>
      </label>`).join('');

    const extOpts = T.extras.map(e => `
      <label class="v-ext-opt ${this.state.extras.has(e.id) ? 'active' : ''}" data-ext="${e.id}">
        <input type="checkbox" value="${e.id}" ${this.state.extras.has(e.id) ? 'checked' : ''}>
        <span class="v-check" aria-hidden="true"></span>
        <span class="v-ext-icon" aria-hidden="true">${e.icon}</span>
        <span class="v-ext-label">${e.label}</span>
        <span class="v-ext-price">+${e.price}</span>
      </label>`).join('');

    return `
    <section class="v-section" id="v-calc" style="background:var(--v-white)">
      <div class="v-wrap">
        <div class="v-center">
          <div class="v-label">${T.calcLabel}</div>
          <h2 class="v-title">${T.calcTitle}</h2>
          <p class="v-sub">${T.calcSub}</p>
        </div>
        <div class="v-calc">
          <div class="v-calc-top">
            <div>
              <h3>${T.calcStep1}</h3>
              <div class="v-pkg-opts">${pkgOpts}</div>
            </div>
            <div>
              <h3>${T.calcStep2}</h3>
              <div class="v-extras-grid">${extOpts}</div>
            </div>
          </div>
          <div class="v-calc-total">
            <div>
              <div class="v-total-lbl">${T.calcTotalLabel}</div>
              <div class="v-total-amt" id="v-total">CHF <span>${T.packages[this.state.basePkg].price}</span></div>
              <div class="v-total-fine">${T.calcFine}</div>
            </div>
            <a class="v-wa-btn" id="v-wa-btn" href="#" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              ${T.calcWaBtn}
            </a>
          </div>
        </div>
      </div>
    </section>`;
  }

  tplDiagram() {
    const T = this.t;
    const hs = T.hotspots.map((h, i) => `
      <g class="v-hs" data-hs="${h.id}" tabindex="0" role="button" aria-label="${h.title}">
        <circle class="v-hs-pulse" cx="${h.x*7.2}" cy="${h.y*3.6}" r="10"/>
        <circle class="v-hs-circle" cx="${h.x*7.2}" cy="${h.y*3.6}" r="11"/>
        <text class="v-hs-num" x="${h.x*7.2}" y="${h.y*3.6 + 4}">${i+1}</text>
      </g>`).join('');

    return `
    <section class="v-section" style="background:var(--v-warm)">
      <div class="v-wrap">
        <div class="v-center">
          <div class="v-label">${T.diagLabel}</div>
          <h2 class="v-title">${T.diagTitle}</h2>
          <p class="v-sub">${T.diagSub}</p>
        </div>
        <div class="v-diag-wrap">
          <svg class="v-diag-svg" viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" aria-label="Cargo Bike">
            <defs><linearGradient id="vFrame" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7B68EE"/><stop offset="100%" stop-color="#6354d4"/></linearGradient></defs>
            <line x1="40" y1="305" x2="680" y2="305" stroke="#E8E4DF" stroke-width="2" stroke-dasharray="6 6"/>
            <rect x="70" y="150" width="190" height="120" rx="10" fill="#2D2B3D" stroke="#7B68EE" stroke-width="3"/>
            <rect x="85" y="165" width="160" height="14" rx="3" fill="#3a3a52"/>
            <rect x="85" y="190" width="160" height="70" rx="5" fill="#3a3a52"/>
            <text x="165" y="232" text-anchor="middle" fill="#F5F0EB" font-size="13" font-weight="700" font-family="DM Sans">CARGO</text>
            <circle cx="165" cy="295" r="38" fill="none" stroke="#2D2B3D" stroke-width="6"/>
            <circle cx="165" cy="295" r="6" fill="#2D2B3D"/>
            <line x1="127" y1="295" x2="203" y2="295" stroke="#6B6880" stroke-width="1.5"/>
            <line x1="165" y1="257" x2="165" y2="333" stroke="#6B6880" stroke-width="1.5"/>
            <path d="M 260 170 L 480 145" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round" fill="none"/>
            <line x1="480" y1="145" x2="460" y2="290" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round"/>
            <path d="M 260 170 L 460 290" stroke="url(#vFrame)" stroke-width="9" stroke-linecap="round" fill="none"/>
            <line x1="460" y1="290" x2="600" y2="295" stroke="url(#vFrame)" stroke-width="8" stroke-linecap="round"/>
            <line x1="460" y1="145" x2="468" y2="110" stroke="#2D2B3D" stroke-width="6" stroke-linecap="round"/>
            <ellipse cx="475" cy="108" rx="28" ry="7" fill="#2D2B3D"/>
            <line x1="260" y1="170" x2="258" y2="115" stroke="#2D2B3D" stroke-width="6" stroke-linecap="round"/>
            <path d="M 230 108 Q 258 100 286 108" stroke="#2D2B3D" stroke-width="6" fill="none" stroke-linecap="round"/>
            <circle cx="460" cy="290" r="22" fill="#E8573A" stroke="#2D2B3D" stroke-width="3"/>
            <circle cx="460" cy="290" r="10" fill="#2D2B3D"/>
            <circle cx="600" cy="295" r="38" fill="none" stroke="#2D2B3D" stroke-width="6"/>
            <circle cx="600" cy="295" r="6" fill="#2D2B3D"/>
            <line x1="562" y1="295" x2="638" y2="295" stroke="#6B6880" stroke-width="1.5"/>
            <line x1="600" y1="257" x2="600" y2="333" stroke="#6B6880" stroke-width="1.5"/>
            <circle cx="460" cy="290" r="18" fill="none" stroke="#F5F0EB" stroke-width="1" stroke-dasharray="2 2"/>
            ${hs}
          </svg>
          <div class="v-diag-panel" id="v-diag-panel">
            <div class="v-diag-hint">${T.diagHint}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  tplSlider() {
    const T = this.t;
    return `
    <section class="v-section" style="background:var(--v-white)">
      <div class="v-wrap">
        <div class="v-center">
          <div class="v-label">${T.sliderLabel}</div>
          <h2 class="v-title">${T.sliderTitle}</h2>
          <p class="v-sub">${T.sliderSub}</p>
        </div>
        <div class="v-slider-card">
          <div style="font-weight:700;font-size:15px;color:var(--v-dark);margin-bottom:8px">${T.sliderQ}</div>
          <div class="v-slider-wrap">
            <input type="range" min="0" max="10" value="${this.state.slider}" class="v-slider-range" id="v-slider" aria-label="${T.sliderQ}">
            <div class="v-slider-labels">
              <span>${T.sliderL[0]}</span><span>${T.sliderL[1]}</span><span>${T.sliderL[2]}</span>
            </div>
          </div>
          <div class="v-reco" id="v-reco"></div>
        </div>
      </div>
    </section>`;
  }

  tplFAQ() {
    const T = this.t;
    const items = T.faqs.map((f, i) => `
      <div class="v-faq-item" data-faq="${i}">
        <button class="v-faq-q" aria-expanded="false" aria-controls="v-faq-a-${i}" id="v-faq-q-${i}">
          <span>${f.q}</span>
          <span class="v-faq-ico" aria-hidden="true">+</span>
        </button>
        <div class="v-faq-a" id="v-faq-a-${i}" role="region" aria-labelledby="v-faq-q-${i}">
          <div class="v-faq-a-inner">${f.a}</div>
        </div>
      </div>`).join('');

    return `
    <section class="v-section" style="background:var(--v-warm)">
      <div class="v-wrap">
        <div class="v-center">
          <div class="v-label">${T.faqLabel}</div>
          <h2 class="v-title">${T.faqTitle}</h2>
          <p class="v-sub">${T.faqSub}</p>
        </div>
        <div class="v-faq-list">${items}</div>
      </div>
    </section>`;
  }

  tplFinalCTA() {
    const T = this.t;
    return `
    <section class="v-final-cta">
      <div class="v-wrap">
        <h2>${T.finalH2}</h2>
        <p>${T.finalP}</p>
        <a class="v-btn-white" href="tel:${VelovCargo.CONFIG.phone}">${T.finalBtn}</a>
        <div class="v-final-contact">
          <a href="https://wa.me/${VelovCargo.CONFIG.waNumber}">WhatsApp</a> ·
          <a href="mailto:${VelovCargo.CONFIG.email}">${VelovCargo.CONFIG.email}</a> ·
          ${T.finalContactSuffix}
        </div>
      </div>
    </section>`;
  }

  attachEvents() {
    this.querySelectorAll('.v-pkg-opt').forEach(el => {
      el.addEventListener('click', () => {
        this.state.basePkg = el.dataset.pkg;
        this.querySelectorAll('.v-pkg-opt').forEach(o => o.classList.toggle('active', o.dataset.pkg === this.state.basePkg));
        const input = el.querySelector('input'); if (input) input.checked = true;
        this.updateTotal();
      });
    });

    this.querySelectorAll('.v-ext-opt').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.dataset.ext;
        if (this.state.extras.has(id)) this.state.extras.delete(id); else this.state.extras.add(id);
        el.classList.toggle('active');
        const input = el.querySelector('input'); if (input) input.checked = this.state.extras.has(id);
        this.updateTotal();
      });
    });

    this.querySelectorAll('.v-hs').forEach(el => {
      const open = () => {
        this.querySelectorAll('.v-hs').forEach(n => n.classList.remove('active'));
        el.classList.add('active');
        this.state.hotspot = el.dataset.hs;
        const h = this.t.hotspots.find(x => x.id === this.state.hotspot);
        const panel = this.querySelector('#v-diag-panel');
        if (h && panel) {
          panel.classList.add('filled');
          panel.innerHTML = `<h4>${h.title}</h4><p>${h.body}</p>`;
        }
      };
      el.addEventListener('click', open);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
    });

    const slider = this.querySelector('#v-slider');
    if (slider) slider.addEventListener('input', (e) => { this.state.slider = +e.target.value; this.updateRecommendation(); });

    this.querySelectorAll('.v-faq-item').forEach(it => {
      const btn = it.querySelector('.v-faq-q');
      btn.addEventListener('click', () => {
        const isOpen = it.classList.contains('open');
        this.querySelectorAll('.v-faq-item').forEach(x => {
          x.classList.remove('open');
          const b = x.querySelector('.v-faq-q'); if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) { it.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });

    this.updateTotal();
    this.updateRecommendation();
  }

  updateTotal() {
    const T = this.t;
    const base = T.packages[this.state.basePkg];
    let total = base.price;
    const extraItems = [];
    this.state.extras.forEach(id => {
      const e = T.extras.find(x => x.id === id);
      if (e) { total += e.price; extraItems.push(e); }
    });

    const amt = this.querySelector('#v-total');
    if (amt) amt.innerHTML = `CHF <span>${total}</span>`;

    const extrasTxt = extraItems.length ? extraItems.map(e => `• ${e.label} (+CHF ${e.price})`).join('\n') : '—';
    const msg = [
      T.waMsgIntro,
      '',
      `📦 ${T.waMsgPkg}: ${base.name} (CHF ${base.price})`,
      `➕ ${T.waMsgExtras}:`,
      extrasTxt,
      '',
      `💰 ${T.waMsgTotal}: CHF ${total}`,
      '',
      T.waMsgAddrLine,
      T.waMsgAddrPh,
      '',
      T.waMsgEnd
    ].join('\n');

    const wa = this.querySelector('#v-wa-btn');
    if (wa) wa.setAttribute('href', `https://wa.me/${VelovCargo.CONFIG.waNumber}?text=${encodeURIComponent(msg)}`);
  }

  updateRecommendation() {
    const T = this.t;
    const v = this.state.slider;
    let key;
    if (v <= 3) key = 'basic';
    else if (v <= 7) key = 'standard';
    else key = 'premium';

    const r = T.recos[key];
    const p = T.packages[key];
    const box = this.querySelector('#v-reco');
    if (box) {
      box.className = `v-reco ${key}`;
      box.innerHTML = `
        <div class="v-reco-head">
          <span class="v-reco-emoji" aria-hidden="true">${r.emoji}</span>
          <span class="v-reco-title">${r.title}</span>
          <span class="v-reco-price">CHF ${p.price}</span>
        </div>
        <p>${r.msg}</p>
        <a class="v-reco-btn" href="tel:${VelovCargo.CONFIG.phone}">${p.name} ${T.recoBookSuffix}</a>`;
    }
  }
}

if (!customElements.get('velov-cargo')) {
  customElements.define('velov-cargo', VelovCargo);
}
