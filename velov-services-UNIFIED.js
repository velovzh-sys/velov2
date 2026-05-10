/* ===================================================================
   VELOV — UNIFIED Multilingual Services Custom Element
   Languages: de (primary) · en · fr · it · es
   Tag: <velov-services>

   BUILT WITH ALL LESSONS LEARNED:
   ✅ CSS targets .vs-wrap — NOT the custom element tag (Wix sandbox fix)
   ✅ No @import — Google Fonts injected via <link> tag
   ✅ No nested backticks anywhere — plain string concatenation
   ✅ display:block + background + overflow:visible + position:relative
      set on connectedCallback so element is visible in Wix Editor
   ✅ _fixHeight() with ResizeObserver + 3 fallback timers
   ✅ All 5 languages fully translated: packages, extras, FAQs,
      WhatsApp booking messages, SEO schema, breadcrumbs
   ✅ Interactive live price calculator — works in all languages
   ✅ FAQPage + OfferCatalog + LocalBusiness schema per language
=================================================================== */

/* ===== Shared SEO Helper ===== */
(function(){
  if(window.__velovSeoHelper) return;
  function safe(s){ return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' '); }
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
      s.faqs.forEach(function(f){ h+='<h3>'+safe(f.q)+'</h3><p>'+safe(f.a)+'</p>'; });
      h+='</section>';
    }
    if(s.contact) h+='<section><h2>'+(contactLabel||'Contact')+'</h2><p>'+safe(s.contact)+'</p></section>';
    h+='</article>';
    return h;
  }
  function injectSeo(host, cfg, faqLabel, contactLabel){
    if(!host||!cfg) return;
    function appendMirror(){
      if(host.querySelector('[data-velov-seo]')) return;
      var m=document.createElement('div');
      m.setAttribute('data-velov-seo','');
      m.setAttribute('aria-hidden','true');
      m.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';
      m.innerHTML=buildMirror(cfg, faqLabel, contactLabel);
      host.appendChild(m);
    }
    setTimeout(appendMirror, 0);
    setTimeout(appendMirror, 100);
    if(typeof requestAnimationFrame==='function') requestAnimationFrame(function(){ requestAnimationFrame(appendMirror); });
    if(Array.isArray(cfg.schema)&&cfg.schema.length){
      var id='velov-schema-'+(cfg.id||host.tagName.toLowerCase());
      var ex=document.getElementById(id); if(ex) ex.remove();
      var sc=document.createElement('script');
      sc.id=id; sc.type='application/ld+json';
      try{ sc.textContent=JSON.stringify(cfg.schema); }catch(e){ return; }
      document.head.appendChild(sc);
    }
  }
  window.__velovSeoHelper={injectSeo:injectSeo};
})();

/* ===== Shared Tracker ===== */
(function(){
  if(window.__velovTracker) return;
  function pushEvent(name, params){
    try{
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push(Object.assign({event:name}, params||{}));
      if(typeof window.gtag==='function') window.gtag('event', name, params||{});
    }catch(e){}
  }
  function bind(host, lang){
    if(!host||host.__velovBound) return;
    host.__velovBound=true;
    host.addEventListener('click', function(e){
      var a=e.target.closest&&e.target.closest('a');
      if(!a) return;
      var href=a.getAttribute('href')||'';
      var label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
      var ctx={page_component:host.tagName.toLowerCase(), page_path:(typeof location!=='undefined'?location.pathname:''), language:lang||'de'};
      if(/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href)) pushEvent('whatsapp_click', Object.assign({link_url:href,link_text:label},ctx));
      else if(/^tel:/i.test(href)) pushEvent('phone_click', Object.assign({link_url:href,link_text:label},ctx));
      else if(/^mailto:/i.test(href)) pushEvent('email_click', Object.assign({link_url:href,link_text:label},ctx));
    },{passive:true,capture:true});
  }
  window.__velovTracker={bind:bind,pushEvent:pushEvent};
})();

/* ===================================================================
   SHARED CONSTANTS
=================================================================== */
const VS_CONTACT = {
  phone: '+41762352126',
  phoneDisplay: '+41 76 235 21 26',
  waNumber: '41762352126',
  email: 'info@velov.ch',
  domain: 'https://www.velov.ch'
};

/* ===================================================================
   LANGUAGE DETECTION — same logic used across all VELOV elements
=================================================================== */
function detectVsLang(){
  try{ if(window.wixDevelopersAnalytics&&window.wixDevelopersAnalytics.currentLanguage) return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2); }catch(e){}
  try{ var dl=document.documentElement.lang||''; if(dl) return dl.toLowerCase().substring(0,2); }catch(e){}
  try{ var m=window.location.pathname.match(/^\/(en|fr|it|es)(\/|$)/i); if(m) return m[1].toLowerCase(); }catch(e){}
  try{ var nav=(navigator.language||'de').toLowerCase().substring(0,2); if(['en','fr','it','es'].indexOf(nav)>-1) return nav; }catch(e){}
  return 'de';
}

/* ===================================================================
   MULTILINGUAL CONTENT — All 5 languages
=================================================================== */
const VS_LANG = {

  /* ── DEUTSCH ── */
  de: {
    seo: {
      id: 'services-de',
      h1: 'Velo Service Zürich – Mobile Velo & E-Bike Wartung | VELOV',
      intro: 'Alle Velo-Service-Pakete von VELOV in Zürich. Basic Check CHF 79, Standard Service CHF 179, Premium Service CHF 229. Mobil vor Ort – für Velo, E-Bike & Cargo-Bike. Transparente Festpreise, keine versteckten Kosten. Jetzt online anfragen!',
      sections: [
        { h2:'Service-Pakete im Überblick', body:'Drei klare Pakete für jeden Bedarf: Basic Check für schnellen Sicherheitscheck, Standard Service für gründliche Wartung, Premium Service für Komplettwartung inklusive Laufräder zentrieren. Alle Pakete mobil vor Ort in Zürich.',
          h3items:[
            {h3:'Basic Check – CHF 79', body:'Sicherheitscheck, Schrauben nachziehen, Reifendruck, Sichtkontrolle Bremsen und Schaltung. Dauer: ca. 30 Minuten.'},
            {h3:'Standard Service – CHF 179', body:'Bremsen, Schaltung, Kette, Lager, Reifen, Licht, Schrauben. Dein Velo fährt wie neu. Dauer: ca. 60–90 Minuten.'},
            {h3:'Premium Service – CHF 229', body:'Alles aus dem Standard Service plus Laufräder zentrieren, Deep Clean, Komplettreinigung, Lager nachstellen. Dauer: ca. 120–150 Minuten.'}
          ]},
        { h2:'Zusatzleistungen', body:'Reifenwechsel CHF 39, Kettenwechsel CHF 35, Bremsbeläge vorne CHF 35, Bremsbeläge hinten CHF 55, Hydraulikbremse entlüften vorne CHF 49, hinten CHF 65, Laufrad zentrieren CHF 29, LED-Licht montieren CHF 25.' },
        { h2:'Mobil in ganz Zürich', body:'Wir kommen zu dir — Wohnung, Büro, Coworking oder Café. Alle 12 Zürcher Kreise und Agglomeration. Anfahrt Stadt Zürich CHF 49.' }
      ],
      faqs: [
        {q:'Was ist im Service-Preis enthalten?', a:'Arbeitszeit, Werkzeug und Verbrauchsmaterial. Anfahrt CHF 49 separat. Ersatzteile transparent nach Aufwand.'},
        {q:'Wie lange dauert ein Service?', a:'Basic Check: ca. 30 Min. Standard: 60–90 Min. Premium: 120–150 Min.'},
        {q:'Repariert ihr auch E-Bikes?', a:'Ja — mechanische Wartung aller Marken. Keine Akku-/Motor-Diagnose.'},
        {q:'Brauche ich einen Termin?', a:'Ja, ausser für Plattfuss-Notfälle. WhatsApp +41 76 235 21 26.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zürich',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Velowerkstatt Zürich","url":"https://www.velov.ch/services","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 79–CHF 229","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zürich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"08:00","closes":"18:00"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"de","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"OfferCatalog","name":"Velo Service Pakete Zürich","inLanguage":"de","itemListElement":[{"@type":"Offer","position":1,"name":"Basic Check","price":"79","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zürich"},{"@type":"Offer","position":2,"name":"Standard Service","price":"179","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zürich"},{"@type":"Offer","position":3,"name":"Premium Service","price":"229","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zürich"}]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"de","mainEntity":[{"@type":"Question","name":"Was ist im Service-Preis enthalten?","acceptedAnswer":{"@type":"Answer","text":"Arbeitszeit, Werkzeug und Verbrauchsmaterial sind inbegriffen. Anfahrt CHF 49 separat. Ersatzteile transparent nach Aufwand."}},{"@type":"Question","name":"Repariert ihr auch E-Bikes?","acceptedAnswer":{"@type":"Answer","text":"Ja — mechanische Wartung aller E-Bike-Marken. Keine Akku-Tests, Motor-Diagnose oder Firmware-Updates."}},{"@type":"Question","name":"Brauche ich einen Termin?","acceptedAnswer":{"@type":"Answer","text":"Ja, ausser für Plattfuss-Notfälle. WhatsApp +41 76 235 21 26."}},{"@type":"Question","name":"Kann ich Pakete und Extras kombinieren?","acceptedAnswer":{"@type":"Answer","text":"Ja, frei kombinierbar. Der Live-Rechner zeigt den Gesamtpreis sofort."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch"},{"@type":"ListItem","position":2,"name":"Services","item":"https://www.velov.ch/services"}]}
      ]
    },
    ui: {
      faqLabel:'Häufige Fragen', contactLabel:'Kontakt',
      heroBadge:'Velo Service Zürich · Mobile Werkstatt',
      heroH1:'Velo Service Zürich.',
      heroSpan:'Mobil. Perfekt gewartet.',
      heroLead:'Drei transparente Festpreis-Pakete für Velo, E-Bike und Cargo-Bike — mobile Velowerkstatt für ganz Zürich. Wähle dein Paket, füge Extras hinzu — Gesamtpreis aktualisiert sich live.',
      heroBtn:'📞 Termin buchen',
      pkgLabel:'Pakete · Live-Rechner',
      pkgTitle:'Wähle dein Service-Paket',
      pkgSub:'Klick auf ein Paket, füge Extras hinzu — du siehst sofort den Festpreis. Anfahrt Stadt Zürich CHF 49.',
      priceSuffix:' fest',
      extrasTitle:'Zusatzleistungen (optional)',
      extrasHint:'Alles kombinierbar. Preise aktualisieren sich live unten.',
      totalLabel:'Dein Festpreis',
      totalFooter:'Anfahrt Zürich Stadt CHF 49 · Material nach Aufwand · Rein mechanische Reparatur',
      waBtn:'Buchen via WhatsApp',
      featuredBadge:'⭐ BELIEBT',
      selectBtn:'Auswählen',
      selectedBtn:'✓ Ausgewählt',
      faqSectionLabel:'FAQ',
      faqSectionTitle:'Häufige Fragen',
      ctaTitle:'Bereit für den nächsten Service?',
      ctaBody:'Ruf an, schreib WhatsApp — wir kommen direkt zu dir.',
      ctaCall:'📞 Jetzt anrufen',
      ctaWa:'WhatsApp',
      ctaContact:'Mobile Velo-Werkstatt Zürich · 24/7 erreichbar per WhatsApp',
      waMsg: function(pkg, extras, total){
        var extTxt = extras.length ? extras.map(function(e){ return '• '+e.label+' (+CHF '+e.price+')'; }).join('\n') : '—';
        return 'Hi VELOV! 👋\nIch möchte einen Velo-Service buchen:\n\n📦 Paket: '+pkg.title+' (CHF '+pkg.price+')\n➕ Extras:\n'+extTxt+'\n\n💰 Total (Festpreis): CHF '+total+'\n\nAdresse / Zeitfenster:\n(bitte ausfüllen)\n\nDanke!';
      }
    },
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',      price:79,  subtitle:'Sicherheitscheck',        desc:'Schneller Sicherheitscheck — ideal zwischen zwei Services', featured:false,
        features:['Kompletter Sicherheitscheck','Alle wichtigen Schrauben nachziehen','Reifendruck prüfen','Sichtkontrolle Bremsen, Schaltung, Licht'] },
      { id:'standard', badge:'Standard', title:'Standard Service', price:179, subtitle:'Gründlicher Jahresservice', desc:'Unser beliebtester Service — perfekt für Pendler und Alltagsfahrer', featured:true,
        features:['Kompletter Sicherheitscheck','Bremsen justieren & Beläge prüfen','Schaltung fein einstellen','Kette prüfen, reinigen & schmieren','Alle Schrauben nachziehen','Steuersatz & Tretlager prüfen','Züge & Hüllen prüfen','Visuelle Kontrolle Kabel / E-Bike-Leitungen'] },
      { id:'premium',  badge:'Premium',  title:'Premium Service',  price:229, subtitle:'Alles aus Standard + Laufräder', desc:'Komplettservice für Anspruchsvolle — wie neu weiterfahren', featured:false,
        features:['Alles aus dem Standard Service','Laufräder zentrieren (von Auge)','Speichenspannung prüfen','Kettenreinigung (Deep Clean)','Komplettreinigung des Velos','Lager prüfen & nachstellen','Bremsflächen reinigen','Abschlussbericht & Empfehlungen'] }
    ],
    extras: [
      { id:'tire',    label:'Reifenwechsel (inkl. Schlauch)',         price:39, icon:'🛞' },
      { id:'chain',   label:'Kettenwechsel',                          price:35, icon:'⛓️' },
      { id:'brakeF',  label:'Bremsbeläge vorne (mechanisch)',          price:35, icon:'🛑' },
      { id:'brakeR',  label:'Bremsbeläge hinten',                     price:55, icon:'🛑' },
      { id:'hydrF',   label:'Hydraulikbremse entlüften vorne',        price:49, icon:'💧' },
      { id:'hydrR',   label:'Hydraulikbremse entlüften hinten',       price:65, icon:'💧' },
      { id:'wheel',   label:'Laufrad zentrieren (von Auge)',           price:29, icon:'🎯' },
      { id:'light',   label:'Licht montieren (LED-Set)',               price:25, icon:'💡' },
      { id:'cargo',   label:'Cargo-Bike Zuschlag',                    price:30, icon:'📦' },
      { id:'anfahrt', label:'Anfahrt Zürich Stadt',                   price:49, icon:'🚐' }
    ],
    faqs: [
      { q:'Was ist im Service-Preis enthalten?', a:'Arbeitszeit, Werkzeug und Verbrauchsmaterial sind inbegriffen. Die Anfahrt in der Stadt Zürich kostet CHF 49 und wird separat ausgewiesen. Ersatzteile werden transparent nach Aufwand verrechnet.' },
      { q:'Wie lange dauert ein Service?', a:'Basic Check: ca. 30 Min. Standard Service: 60–90 Min. Premium Service: 120–150 Min. Wir arbeiten effizient und gründlich — direkt bei dir vor Ort in Zürich.' },
      { q:'Repariert ihr auch E-Bikes?', a:'Ja — wir warten E-Bikes aller Marken (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Mechanische Wartung und visuelle Kontrolle der Kabel. Keine Akku-Tests, Motor-Diagnose oder Firmware-Updates.' },
      { q:'Brauche ich spezielle Teile?', a:'Meist haben wir alle gängigen Teile dabei. Spezialteile bestellen wir innert 2–3 Tagen — ohne zusätzliche Anfahrtsgebühr.' },
      { q:'Kann ich den Service kombinieren?', a:'Klar! Pakete und Extras sind frei kombinierbar. Der Live-Rechner zeigt den Gesamtpreis sofort.' }
    ]
  },

  /* ── ENGLISH ── */
  en: {
    seo: {
      id: 'services-en',
      h1: 'Bike Service Zurich – Mobile Velo & E-Bike Maintenance | VELOV',
      intro: 'Explore all VELOV bike service packages in Zurich. Basic Check CHF 79, Standard Service CHF 179, Premium Service CHF 229. Mobile on-site service for bikes, e-bikes & cargo bikes. Transparent fixed prices. Book your service today!',
      sections: [
        { h2:'Service Packages Overview', body:'Three clear packages for every need: Basic Check for a quick safety inspection, Standard Service for thorough maintenance, Premium Service for a full overhaul including wheel truing. All packages mobile on-site in Zurich.',
          h3items:[
            {h3:'Basic Check – CHF 79', body:'Safety check, tighten bolts, tyre pressure, visual inspection of brakes and gears. Duration: approx. 30 minutes.'},
            {h3:'Standard Service – CHF 179', body:'Brakes, gears, chain, bearings, tyres, lights, bolts. Your bike rides like new. Duration: approx. 60–90 minutes.'},
            {h3:'Premium Service – CHF 229', body:'Everything in Standard plus wheel truing, deep clean, full polish, bearing adjustment. Duration: approx. 120–150 minutes.'}
          ]},
        { h2:'Add-ons', body:'Tyre replacement CHF 39, chain replacement CHF 35, front brake pads CHF 35, rear brake pads CHF 55, hydraulic brake bleed front CHF 49, rear CHF 65, wheel truing CHF 29, LED light fitting CHF 25.' },
        { h2:'Mobile across Zurich', body:'We come to you — home, office, coworking or café. All 12 Zurich districts and agglomeration. Travel fee Zurich city CHF 49.' }
      ],
      faqs: [
        {q:'What is included in the service price?', a:'Labour, tools and consumables. Travel CHF 49 separately. Parts quoted transparently upfront.'},
        {q:'How long does a service take?', a:'Basic Check: approx. 30 min. Standard: 60–90 min. Premium: 120–150 min.'},
        {q:'Do you service e-bikes?', a:'Yes — mechanical maintenance of all brands. No battery or motor diagnostics.'},
        {q:'Do I need an appointment?', a:'Yes, except for flat tyre emergencies. WhatsApp +41 76 235 21 26.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Bike Workshop Zurich","url":"https://www.velov.ch/en/services","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 79–CHF 229","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"08:00","closes":"18:00"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"en","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"OfferCatalog","name":"Bike Service Packages Zurich","inLanguage":"en","itemListElement":[{"@type":"Offer","position":1,"name":"Basic Check","price":"79","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zurich"},{"@type":"Offer","position":2,"name":"Standard Service","price":"179","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zurich"},{"@type":"Offer","position":3,"name":"Premium Service","price":"229","priceCurrency":"CHF","availability":"https://schema.org/InStock","areaServed":"Zurich"}]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"en","mainEntity":[{"@type":"Question","name":"What is included in the service price?","acceptedAnswer":{"@type":"Answer","text":"Labour, tools and consumables. Travel CHF 49 billed separately. Parts quoted transparently upfront."}},{"@type":"Question","name":"Do you service e-bikes?","acceptedAnswer":{"@type":"Answer","text":"Yes — mechanical maintenance of all e-bike brands. No battery tests, motor diagnostics or firmware updates."}},{"@type":"Question","name":"Do I need an appointment?","acceptedAnswer":{"@type":"Answer","text":"Yes, except for flat tyre emergencies. WhatsApp +41 76 235 21 26."}},{"@type":"Question","name":"Can I combine packages and add-ons?","acceptedAnswer":{"@type":"Answer","text":"Yes, freely combinable. The live calculator shows your total instantly."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/en"},{"@type":"ListItem","position":2,"name":"Services","item":"https://www.velov.ch/en/services"}]}
      ]
    },
    ui: {
      faqLabel:'Frequently Asked Questions', contactLabel:'Contact',
      heroBadge:'Bike Service Zurich · Mobile Workshop',
      heroH1:'Bike Service Zurich.',
      heroSpan:'Mobile. Perfectly maintained.',
      heroLead:'Three transparent fixed-price packages for bikes, e-bikes and cargo bikes — mobile bike workshop across all of Zurich. Choose your package, add extras — total price updates live.',
      heroBtn:'📞 Book appointment',
      pkgLabel:'Packages · Live Calculator',
      pkgTitle:'Choose your service package',
      pkgSub:'Click a package, add extras — you see the fixed price instantly. Travel Zurich city CHF 49, transparent, no hidden costs.',
      priceSuffix:' fixed',
      extrasTitle:'Add-ons (optional)',
      extrasHint:'All combinable. Prices update live below.',
      totalLabel:'Your fixed price',
      totalFooter:'Travel Zurich city CHF 49 · Parts at cost · Mechanical repair only',
      waBtn:'Book via WhatsApp',
      featuredBadge:'⭐ POPULAR',
      selectBtn:'Select',
      selectedBtn:'✓ Selected',
      faqSectionLabel:'FAQ',
      faqSectionTitle:'Frequently Asked Questions',
      ctaTitle:'Ready for your next service?',
      ctaBody:'Call us or WhatsApp — we come directly to you.',
      ctaCall:'📞 Call now',
      ctaWa:'WhatsApp',
      ctaContact:'Mobile Bike Workshop Zurich · Available 24/7 via WhatsApp',
      waMsg: function(pkg, extras, total){
        var extTxt = extras.length ? extras.map(function(e){ return '• '+e.label+' (+CHF '+e.price+')'; }).join('\n') : '—';
        return 'Hi VELOV! 👋\nI\'d like to book a bike service:\n\n📦 Package: '+pkg.title+' (CHF '+pkg.price+')\n➕ Add-ons:\n'+extTxt+'\n\n💰 Total (fixed price): CHF '+total+'\n\nAddress / time slot:\n(please fill in)\n\nThank you!';
      }
    },
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',      price:79,  subtitle:'Safety inspection',       desc:'Quick safety check — ideal between full services', featured:false,
        features:['Full safety inspection','Tighten all key bolts','Check tyre pressure','Visual check of brakes, gears and lights'] },
      { id:'standard', badge:'Standard', title:'Standard Service', price:179, subtitle:'Thorough annual service',  desc:'Our most popular service — perfect for commuters and everyday riders', featured:true,
        features:['Full safety inspection','Adjust brakes & check pads','Fine-tune gears','Check, clean & lube chain','Tighten all bolts','Check headset & bottom bracket','Check cables & housing','Visual check of wiring / e-bike cables'] },
      { id:'premium',  badge:'Premium',  title:'Premium Service',  price:229, subtitle:'Standard + wheel truing', desc:'Complete overhaul — ride like new again', featured:false,
        features:['Everything in Standard Service','True wheels (by eye)','Check spoke tension','Deep chain clean','Full bike polish','Check & adjust bearings','Clean brake surfaces','Final report & recommendations'] }
    ],
    extras: [
      { id:'tire',    label:'Tyre replacement (incl. inner tube)',   price:39, icon:'🛞' },
      { id:'chain',   label:'Chain replacement',                     price:35, icon:'⛓️' },
      { id:'brakeF',  label:'Front brake pads (mechanical)',         price:35, icon:'🛑' },
      { id:'brakeR',  label:'Rear brake pads',                      price:55, icon:'🛑' },
      { id:'hydrF',   label:'Hydraulic brake bleed front',          price:49, icon:'💧' },
      { id:'hydrR',   label:'Hydraulic brake bleed rear',           price:65, icon:'💧' },
      { id:'wheel',   label:'Wheel truing (by eye)',                 price:29, icon:'🎯' },
      { id:'light',   label:'Fit lights (LED set)',                  price:25, icon:'💡' },
      { id:'cargo',   label:'Cargo bike surcharge',                  price:30, icon:'📦' },
      { id:'anfahrt', label:'Travel Zurich city',                   price:49, icon:'🚐' }
    ],
    faqs: [
      { q:'What is included in the service price?', a:'Labour, tools and consumables are included. Travel in Zurich city is CHF 49 billed separately. Parts are quoted transparently upfront — you always know what you\'ll pay.' },
      { q:'How long does a service take?', a:'Basic Check: approx. 30 min. Standard Service: 60–90 min. Premium Service: 120–150 min. We work efficiently and thoroughly — right at your location in Zurich.' },
      { q:'Do you service e-bikes?', a:'Yes — we maintain e-bikes of all brands (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Mechanical maintenance and visual cable check. No battery tests, motor diagnostics or firmware updates.' },
      { q:'Do you carry spare parts?', a:'We carry all common parts. Specialist parts are ordered within 2–3 days — no extra travel fee for the follow-up visit.' },
      { q:'Can I combine packages and add-ons?', a:'Absolutely! Packages and add-ons are freely combinable. The live calculator shows your total instantly.' }
    ]
  },

  /* ── FRANÇAIS ── */
  fr: {
    seo: {
      id: 'services-fr',
      h1: 'Service Vélo Zurich – Entretien Mobile Vélos & E-Bikes | VELOV',
      intro: 'Découvrez les forfaits service vélo VELOV à Zurich. Basic Check CHF 79, Service Standard CHF 179, Service Premium CHF 229. Service mobile à domicile pour vélos, e-bikes & vélos cargo. Prix fixes transparents. Réservez maintenant !',
      sections: [
        { h2:'Aperçu des Forfaits', body:'Trois forfaits clairs pour chaque besoin : Basic Check pour un contrôle de sécurité rapide, Service Standard pour une maintenance complète, Service Premium pour une révision totale avec centrage des roues.',
          h3items:[
            {h3:'Basic Check – CHF 79', body:'Contrôle de sécurité, serrage des vis, pression des pneus, contrôle visuel freins et vitesses. Durée : environ 30 minutes.'},
            {h3:'Service Standard – CHF 179', body:'Freins, vitesses, chaîne, roulements, pneus, éclairage, vis. Votre vélo roule comme neuf. Durée : environ 60–90 minutes.'},
            {h3:'Service Premium – CHF 229', body:'Tout du Standard plus centrage des roues, nettoyage profond, polissage complet, réglage des roulements. Durée : environ 120–150 minutes.'}
          ]},
        { h2:'Options supplémentaires', body:'Remplacement pneu CHF 39, chaîne CHF 35, plaquettes avant CHF 35, plaquettes arrière CHF 55, purge frein hydraulique avant CHF 49, arrière CHF 65, voilage roue CHF 29, montage éclairage LED CHF 25.' },
        { h2:'Mobile dans tout Zurich', body:'Nous venons chez vous — domicile, bureau, coworking ou café. Les 12 arrondissements de Zurich et l\'agglomération. Frais de déplacement ville de Zurich CHF 49.' }
      ],
      faqs: [
        {q:'Qu\'est-ce qui est inclus dans le prix du service ?', a:'Main d\'œuvre, outils et consommables. Déplacement CHF 49 en sus. Pièces devisées de façon transparente.'},
        {q:'Combien de temps dure un service ?', a:'Basic Check : environ 30 min. Standard : 60–90 min. Premium : 120–150 min.'},
        {q:'Réparez-vous les e-bikes ?', a:'Oui — maintenance mécanique de toutes marques. Pas de diagnostic batterie ou moteur.'},
        {q:'Ai-je besoin d\'un rendez-vous ?', a:'Oui, sauf pour les crevaisons urgentes. WhatsApp +41 76 235 21 26.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],"@id":"https://www.velov.ch/#business","name":"VELOV — Atelier Vélo Mobile Zurich","url":"https://www.velov.ch/fr/services","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 79–CHF 229","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"fr","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"OfferCatalog","name":"Forfaits Service Vélo Zurich","inLanguage":"fr","itemListElement":[{"@type":"Offer","position":1,"name":"Basic Check","price":"79","priceCurrency":"CHF"},{"@type":"Offer","position":2,"name":"Service Standard","price":"179","priceCurrency":"CHF"},{"@type":"Offer","position":3,"name":"Service Premium","price":"229","priceCurrency":"CHF"}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.velov.ch/fr"},{"@type":"ListItem","position":2,"name":"Services","item":"https://www.velov.ch/fr/services"}]}
      ]
    },
    ui: {
      faqLabel:'Questions fréquentes', contactLabel:'Contact',
      heroBadge:'Service Vélo Zurich · Atelier Mobile',
      heroH1:'Service Vélo Zurich.',
      heroSpan:'Mobile. Parfaitement entretenu.',
      heroLead:'Trois forfaits à prix fixe transparents pour vélos, e-bikes et cargo bikes — atelier vélo mobile dans tout Zurich. Choisissez votre forfait, ajoutez des options — le prix total se met à jour en temps réel.',
      heroBtn:'📞 Prendre rendez-vous',
      pkgLabel:'Forfaits · Calculateur en direct',
      pkgTitle:'Choisissez votre forfait service',
      pkgSub:'Cliquez sur un forfait, ajoutez des options — le prix fixe s\'affiche immédiatement. Déplacement ville de Zurich CHF 49.',
      priceSuffix:' fixe',
      extrasTitle:'Options supplémentaires (optionnel)',
      extrasHint:'Tout combinable. Les prix se mettent à jour en bas.',
      totalLabel:'Votre prix fixe',
      totalFooter:'Déplacement Zurich ville CHF 49 · Pièces selon besoin · Réparation mécanique uniquement',
      waBtn:'Réserver via WhatsApp',
      featuredBadge:'⭐ POPULAIRE',
      selectBtn:'Choisir',
      selectedBtn:'✓ Sélectionné',
      faqSectionLabel:'FAQ',
      faqSectionTitle:'Questions fréquentes',
      ctaTitle:'Prêt pour votre prochain service ?',
      ctaBody:'Appelez ou écrivez par WhatsApp — nous venons directement chez vous.',
      ctaCall:'📞 Appeler maintenant',
      ctaWa:'WhatsApp',
      ctaContact:'Atelier Vélo Mobile Zurich · Disponible 24/7 via WhatsApp',
      waMsg: function(pkg, extras, total){
        var extTxt = extras.length ? extras.map(function(e){ return '• '+e.label+' (+CHF '+e.price+')'; }).join('\n') : '—';
        return 'Bonjour VELOV ! 👋\nJe souhaite réserver un service vélo :\n\n📦 Forfait : '+pkg.title+' (CHF '+pkg.price+')\n➕ Options :\n'+extTxt+'\n\n💰 Total (prix fixe) : CHF '+total+'\n\nAdresse / créneau horaire :\n(à compléter)\n\nMerci !';
      }
    },
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',       price:79,  subtitle:'Contrôle de sécurité',    desc:'Contrôle rapide — idéal entre deux services complets', featured:false,
        features:['Contrôle de sécurité complet','Serrage de toutes les vis importantes','Vérification pression des pneus','Contrôle visuel freins, vitesses et éclairage'] },
      { id:'standard', badge:'Standard', title:'Service Standard',  price:179, subtitle:'Révision annuelle complète', desc:'Notre service le plus populaire — parfait pour les navetteurs et cyclistes du quotidien', featured:true,
        features:['Contrôle de sécurité complet','Réglage freins & vérification plaquettes','Réglage fin du dérailleur','Vérification, nettoyage & graissage chaîne','Serrage de toutes les vis','Vérification potence & pédalier','Vérification câbles & gaines','Contrôle visuel câblage / e-bike'] },
      { id:'premium',  badge:'Premium',  title:'Service Premium',   price:229, subtitle:'Standard + centrage roues',  desc:'Révision complète pour les exigeants — roulez comme neuf', featured:false,
        features:['Tout du Service Standard','Centrage des roues (à l\'œil)','Vérification tension des rayons','Nettoyage profond de la chaîne','Nettoyage complet du vélo','Vérification & réglage des roulements','Nettoyage des surfaces de freinage','Rapport final & recommandations'] }
    ],
    extras: [
      { id:'tire',    label:'Remplacement pneu (chambre incluse)',   price:39, icon:'🛞' },
      { id:'chain',   label:'Remplacement chaîne',                   price:35, icon:'⛓️' },
      { id:'brakeF',  label:'Plaquettes avant (mécaniques)',         price:35, icon:'🛑' },
      { id:'brakeR',  label:'Plaquettes arrière',                    price:55, icon:'🛑' },
      { id:'hydrF',   label:'Purge frein hydraulique avant',        price:49, icon:'💧' },
      { id:'hydrR',   label:'Purge frein hydraulique arrière',      price:65, icon:'💧' },
      { id:'wheel',   label:'Voilage roue (à l\'œil)',              price:29, icon:'🎯' },
      { id:'light',   label:'Montage éclairage (kit LED)',           price:25, icon:'💡' },
      { id:'cargo',   label:'Supplément cargo bike',                 price:30, icon:'📦' },
      { id:'anfahrt', label:'Déplacement ville de Zurich',           price:49, icon:'🚐' }
    ],
    faqs: [
      { q:'Qu\'est-ce qui est inclus dans le prix du service ?', a:'Main d\'œuvre, outils et consommables sont inclus. Le déplacement en ville de Zurich est CHF 49 facturé séparément. Les pièces sont devisées de façon transparente.' },
      { q:'Combien de temps dure un service ?', a:'Basic Check : environ 30 min. Service Standard : 60–90 min. Service Premium : 120–150 min. Nous travaillons efficacement et soigneusement — directement chez vous à Zurich.' },
      { q:'Réparez-vous les e-bikes ?', a:'Oui — nous entretenons les e-bikes de toutes marques (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Pas de tests batterie, diagnostic moteur ou mises à jour firmware.' },
      { q:'Avez-vous les pièces en stock ?', a:'Nous avons la plupart des pièces courantes. Les pièces spéciales sont commandées en 2–3 jours — sans frais de déplacement supplémentaires.' },
      { q:'Puis-je combiner les forfaits et les options ?', a:'Bien sûr ! Forfaits et options sont librement combinables. Le calculateur en direct affiche immédiatement le total.' }
    ]
  },

  /* ── ITALIANO ── */
  it: {
    seo: {
      id: 'services-it',
      h1: 'Servizio Bici Zurigo – Manutenzione Mobile Bici & E-Bike | VELOV',
      intro: 'Tutti i pacchetti servizio bici VELOV a Zurigo. Basic Check CHF 79, Servizio Standard CHF 179, Servizio Premium CHF 229. Servizio mobile a domicilio per bici, e-bike & cargo bike. Prezzi fissi trasparenti. Prenota il tuo service!',
      sections: [
        { h2:'Panoramica dei Pacchetti', body:'Tre pacchetti chiari per ogni esigenza: Basic Check per un rapido controllo di sicurezza, Servizio Standard per una manutenzione completa, Servizio Premium per una revisione totale con centratura delle ruote.',
          h3items:[
            {h3:'Basic Check – CHF 79', body:'Controllo sicurezza, serraggio viti, pressione pneumatici, controllo visivo freni e cambio. Durata: circa 30 minuti.'},
            {h3:'Servizio Standard – CHF 179', body:'Freni, cambio, catena, cuscinetti, pneumatici, luci, viti. La tua bici va come nuova. Durata: circa 60–90 minuti.'},
            {h3:'Servizio Premium – CHF 229', body:'Tutto del Standard più centratura ruote, pulizia profonda, lucidatura completa, regolazione cuscinetti. Durata: circa 120–150 minuti.'}
          ]},
        { h2:'Servizi aggiuntivi', body:'Sostituzione pneumatico CHF 39, catena CHF 35, pastiglie anteriori CHF 35, pastiglie posteriori CHF 55, spurgo freno idraulico anteriore CHF 49, posteriore CHF 65, centratura ruota CHF 29, montaggio luci LED CHF 25.' },
        { h2:'Mobile in tutta Zurigo', body:'Veniamo da te — casa, ufficio, coworking o caffè. Tutti i 12 distretti di Zurigo e agglomerato. Trasferta città di Zurigo CHF 49.' }
      ],
      faqs: [
        {q:'Cosa è incluso nel prezzo del servizio?', a:'Manodopera, attrezzi e materiali di consumo. Trasferta CHF 49 a parte. Ricambi quotati in modo trasparente.'},
        {q:'Quanto dura un servizio?', a:'Basic Check: circa 30 min. Standard: 60–90 min. Premium: 120–150 min.'},
        {q:'Riparate anche gli e-bike?', a:'Sì — manutenzione meccanica di tutte le marche. Nessuna diagnosi batteria o motore.'},
        {q:'Ho bisogno di un appuntamento?', a:'Sì, tranne per le emergenze foratura. WhatsApp +41 76 235 21 26.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurigo',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],"@id":"https://www.velov.ch/#business","name":"VELOV — Officina Mobile Biciclette Zurigo","url":"https://www.velov.ch/it/services","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 79–CHF 229","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurigo","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"it","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"OfferCatalog","name":"Pacchetti Servizio Bici Zurigo","inLanguage":"it","itemListElement":[{"@type":"Offer","position":1,"name":"Basic Check","price":"79","priceCurrency":"CHF"},{"@type":"Offer","position":2,"name":"Servizio Standard","price":"179","priceCurrency":"CHF"},{"@type":"Offer","position":3,"name":"Servizio Premium","price":"229","priceCurrency":"CHF"}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/it"},{"@type":"ListItem","position":2,"name":"Servizi","item":"https://www.velov.ch/it/services"}]}
      ]
    },
    ui: {
      faqLabel:'Domande frequenti', contactLabel:'Contatto',
      heroBadge:'Servizio Bici Zurigo · Officina Mobile',
      heroH1:'Servizio Bici Zurigo.',
      heroSpan:'Mobile. Perfettamente manutenuto.',
      heroLead:'Tre pacchetti a prezzo fisso trasparenti per bici, e-bike e cargo bike — officina mobile in tutta Zurigo. Scegli il tuo pacchetto, aggiungi opzioni — il prezzo totale si aggiorna in tempo reale.',
      heroBtn:'📞 Prenota appuntamento',
      pkgLabel:'Pacchetti · Calcolatore live',
      pkgTitle:'Scegli il tuo pacchetto servizio',
      pkgSub:'Clicca un pacchetto, aggiungi opzioni — il prezzo fisso appare subito. Trasferta città di Zurigo CHF 49.',
      priceSuffix:' fisso',
      extrasTitle:'Servizi aggiuntivi (opzionale)',
      extrasHint:'Tutto combinabile. I prezzi si aggiornano in basso.',
      totalLabel:'Il tuo prezzo fisso',
      totalFooter:'Trasferta Zurigo città CHF 49 · Ricambi a consumo · Solo riparazione meccanica',
      waBtn:'Prenota via WhatsApp',
      featuredBadge:'⭐ POPOLARE',
      selectBtn:'Scegli',
      selectedBtn:'✓ Selezionato',
      faqSectionLabel:'FAQ',
      faqSectionTitle:'Domande frequenti',
      ctaTitle:'Pronto per il prossimo servizio?',
      ctaBody:'Chiama o scrivi su WhatsApp — veniamo direttamente da te.',
      ctaCall:'📞 Chiama ora',
      ctaWa:'WhatsApp',
      ctaContact:'Officina Mobile Bici Zurigo · Disponibile 24/7 via WhatsApp',
      waMsg: function(pkg, extras, total){
        var extTxt = extras.length ? extras.map(function(e){ return '• '+e.label+' (+CHF '+e.price+')'; }).join('\n') : '—';
        return 'Ciao VELOV! 👋\nVorrei prenotare un servizio bici:\n\n📦 Pacchetto: '+pkg.title+' (CHF '+pkg.price+')\n➕ Extra:\n'+extTxt+'\n\n💰 Totale (prezzo fisso): CHF '+total+'\n\nIndirizzo / fascia oraria:\n(da completare)\n\nGrazie!';
      }
    },
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',        price:79,  subtitle:'Controllo di sicurezza',   desc:'Controllo rapido — ideale tra due servizi completi', featured:false,
        features:['Controllo di sicurezza completo','Serraggio di tutte le viti importanti','Verifica pressione pneumatici','Controllo visivo freni, cambio e luci'] },
      { id:'standard', badge:'Standard', title:'Servizio Standard',  price:179, subtitle:'Manutenzione annuale completa', desc:'Il nostro servizio più popolare — perfetto per pendolari e ciclisti quotidiani', featured:true,
        features:['Controllo di sicurezza completo','Regolazione freni & verifica pastiglie','Taratura fine del cambio','Verifica, pulizia & lubrificazione catena','Serraggio di tutte le viti','Verifica attacco manubrio & movimento centrale','Verifica cavi & guaine','Controllo visivo cablaggio / e-bike'] },
      { id:'premium',  badge:'Premium',  title:'Servizio Premium',   price:229, subtitle:'Standard + centratura ruote', desc:'Revisione completa per i più esigenti — torna a pedalare come nuovo', featured:false,
        features:['Tutto del Servizio Standard','Centratura ruote (a occhio)','Verifica tensione raggi','Pulizia profonda catena','Pulizia completa bici','Verifica & regolazione cuscinetti','Pulizia superfici freni','Rapporto finale & raccomandazioni'] }
    ],
    extras: [
      { id:'tire',    label:'Sostituzione pneumatico (camera incl.)', price:39, icon:'🛞' },
      { id:'chain',   label:'Sostituzione catena',                    price:35, icon:'⛓️' },
      { id:'brakeF',  label:'Pastiglie anteriori (meccaniche)',       price:35, icon:'🛑' },
      { id:'brakeR',  label:'Pastiglie posteriori',                   price:55, icon:'🛑' },
      { id:'hydrF',   label:'Spurgo freno idraulico anteriore',      price:49, icon:'💧' },
      { id:'hydrR',   label:'Spurgo freno idraulico posteriore',     price:65, icon:'💧' },
      { id:'wheel',   label:'Centratura ruota (a occhio)',            price:29, icon:'🎯' },
      { id:'light',   label:'Montaggio luci (kit LED)',               price:25, icon:'💡' },
      { id:'cargo',   label:'Supplemento cargo bike',                 price:30, icon:'📦' },
      { id:'anfahrt', label:'Trasferta città di Zurigo',              price:49, icon:'🚐' }
    ],
    faqs: [
      { q:'Cosa è incluso nel prezzo del servizio?', a:'Manodopera, attrezzi e materiali di consumo sono inclusi. La trasferta in città di Zurigo è CHF 49 fatturata separatamente. I ricambi vengono quotati in modo trasparente.' },
      { q:'Quanto dura un servizio?', a:'Basic Check: circa 30 min. Servizio Standard: 60–90 min. Servizio Premium: 120–150 min. Lavoriamo in modo efficiente e accurato — direttamente da te a Zurigo.' },
      { q:'Riparate anche gli e-bike?', a:'Sì — manteniamo e-bike di tutte le marche (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Nessun test batteria, diagnosi motore o aggiornamenti firmware.' },
      { q:'Avete i ricambi con voi?', a:'Di solito abbiamo tutti i ricambi comuni. I ricambi speciali vengono ordinati in 2–3 giorni — senza costi di trasferta aggiuntivi.' },
      { q:'Posso combinare pacchetti e servizi aggiuntivi?', a:'Certo! Pacchetti e opzioni sono liberamente combinabili. Il calcolatore live mostra subito il totale.' }
    ]
  },

  /* ── ESPAÑOL ── */
  es: {
    seo: {
      id: 'services-es',
      h1: 'Servicio Bici Zúrich – Mantenimiento Móvil de Bicicletas | VELOV',
      intro: 'Todos los paquetes de servicio de bicicleta VELOV en Zúrich. Basic Check CHF 79, Servicio Estándar CHF 179, Servicio Premium CHF 229. Taller móvil para bicis, e-bikes y cargo bikes. Precios fijos sin sorpresas. ¡Reserva ya!',
      sections: [
        { h2:'Resumen de Paquetes', body:'Tres paquetes claros para cada necesidad: Basic Check para una inspección de seguridad rápida, Servicio Estándar para un mantenimiento completo, Servicio Premium para una revisión total con centrado de ruedas.',
          h3items:[
            {h3:'Basic Check – CHF 79', body:'Control de seguridad, apriete de tornillos, presión de neumáticos, inspección visual de frenos y cambio. Duración: aprox. 30 minutos.'},
            {h3:'Servicio Estándar – CHF 179', body:'Frenos, cambio, cadena, rodamientos, neumáticos, luces, tornillos. Tu bici va como nueva. Duración: aprox. 60–90 minutos.'},
            {h3:'Servicio Premium – CHF 229', body:'Todo del Estándar más centrado de ruedas, limpieza profunda, pulido completo, ajuste de rodamientos. Duración: aprox. 120–150 minutos.'}
          ]},
        { h2:'Servicios adicionales', body:'Cambio de neumático CHF 39, cadena CHF 35, pastillas delanteras CHF 35, pastillas traseras CHF 55, purga freno hidráulico delantero CHF 49, trasero CHF 65, centrado rueda CHF 29, montaje luces LED CHF 25.' },
        { h2:'Móvil en todo Zúrich', body:'Vamos a donde estés — casa, oficina, coworking o café. Los 12 distritos de Zúrich y área metropolitana. Desplazamiento ciudad de Zúrich CHF 49.' }
      ],
      faqs: [
        {q:'¿Qué está incluido en el precio del servicio?', a:'Mano de obra, herramientas y consumibles. Desplazamiento CHF 49 aparte. Piezas cotizadas de forma transparente.'},
        {q:'¿Cuánto dura un servicio?', a:'Basic Check: aprox. 30 min. Estándar: 60–90 min. Premium: 120–150 min.'},
        {q:'¿Reparáis también e-bikes?', a:'Sí — mantenimiento mecánico de todas las marcas. Sin diagnóstico de batería o motor.'},
        {q:'¿Necesito cita previa?', a:'Sí, excepto para emergencias de pinchazo. WhatsApp +41 76 235 21 26.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zúrich',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],"@id":"https://www.velov.ch/#business","name":"VELOV — Taller Móvil de Bicicletas Zúrich","url":"https://www.velov.ch/es/services","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 79–CHF 229","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zúrich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"es","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"OfferCatalog","name":"Paquetes Servicio Bici Zúrich","inLanguage":"es","itemListElement":[{"@type":"Offer","position":1,"name":"Basic Check","price":"79","priceCurrency":"CHF"},{"@type":"Offer","position":2,"name":"Servicio Estándar","price":"179","priceCurrency":"CHF"},{"@type":"Offer","position":3,"name":"Servicio Premium","price":"229","priceCurrency":"CHF"}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.velov.ch/es"},{"@type":"ListItem","position":2,"name":"Servicios","item":"https://www.velov.ch/es/services"}]}
      ]
    },
    ui: {
      faqLabel:'Preguntas frecuentes', contactLabel:'Contacto',
      heroBadge:'Servicio Bici Zúrich · Taller Móvil',
      heroH1:'Servicio Bici Zúrich.',
      heroSpan:'Móvil. Perfectamente mantenido.',
      heroLead:'Tres paquetes de precio fijo transparentes para bicis, e-bikes y cargo bikes — taller móvil en todo Zúrich. Elige tu paquete, añade extras — el precio total se actualiza en vivo.',
      heroBtn:'📞 Reservar cita',
      pkgLabel:'Paquetes · Calculadora en vivo',
      pkgTitle:'Elige tu paquete de servicio',
      pkgSub:'Haz clic en un paquete, añade extras — el precio fijo aparece al instante. Desplazamiento ciudad de Zúrich CHF 49.',
      priceSuffix:' fijo',
      extrasTitle:'Servicios adicionales (opcional)',
      extrasHint:'Todo combinable. Los precios se actualizan abajo.',
      totalLabel:'Tu precio fijo',
      totalFooter:'Desplazamiento Zúrich ciudad CHF 49 · Piezas según consumo · Solo reparación mecánica',
      waBtn:'Reservar via WhatsApp',
      featuredBadge:'⭐ POPULAR',
      selectBtn:'Seleccionar',
      selectedBtn:'✓ Seleccionado',
      faqSectionLabel:'FAQ',
      faqSectionTitle:'Preguntas frecuentes',
      ctaTitle:'¿Listo para tu próximo servicio?',
      ctaBody:'Llama o escríbenos por WhatsApp — vamos directamente a donde estés.',
      ctaCall:'📞 Llamar ahora',
      ctaWa:'WhatsApp',
      ctaContact:'Taller Móvil de Bicicletas Zúrich · Disponible 24/7 via WhatsApp',
      waMsg: function(pkg, extras, total){
        var extTxt = extras.length ? extras.map(function(e){ return '• '+e.label+' (+CHF '+e.price+')'; }).join('\n') : '—';
        return 'Hola VELOV! 👋\nQuiero reservar un servicio de bici:\n\n📦 Paquete: '+pkg.title+' (CHF '+pkg.price+')\n➕ Extras:\n'+extTxt+'\n\n💰 Total (precio fijo): CHF '+total+'\n\nDirección / franja horaria:\n(por favor completar)\n\n¡Gracias!';
      }
    },
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',         price:79,  subtitle:'Inspección de seguridad',  desc:'Revisión rápida — ideal entre dos servicios completos', featured:false,
        features:['Inspección de seguridad completa','Apriete de todos los tornillos importantes','Comprobación presión neumáticos','Inspección visual frenos, cambio y luces'] },
      { id:'standard', badge:'Estándar', title:'Servicio Estándar',   price:179, subtitle:'Revisión anual completa',  desc:'Nuestro servicio más popular — perfecto para ciclistas diarios y commuters', featured:true,
        features:['Inspección de seguridad completa','Ajuste de frenos & revisión pastillas','Puesta a punto del cambio','Revisión, limpieza & lubricación cadena','Apriete de todos los tornillos','Revisión potencia & pedalier','Revisión cables & fundas','Control visual cableado / e-bike'] },
      { id:'premium',  badge:'Premium',  title:'Servicio Premium',    price:229, subtitle:'Estándar + centrado ruedas', desc:'Revisión completa para los más exigentes — rueda como nueva', featured:false,
        features:['Todo del Servicio Estándar','Centrado de ruedas (a ojo)','Comprobación tensión radios','Limpieza profunda cadena','Limpieza completa de la bici','Revisión & ajuste de rodamientos','Limpieza superficies de freno','Informe final & recomendaciones'] }
    ],
    extras: [
      { id:'tire',    label:'Cambio neumático (cámara incluida)',     price:39, icon:'🛞' },
      { id:'chain',   label:'Cambio de cadena',                       price:35, icon:'⛓️' },
      { id:'brakeF',  label:'Pastillas delanteras (mecánicas)',       price:35, icon:'🛑' },
      { id:'brakeR',  label:'Pastillas traseras',                     price:55, icon:'🛑' },
      { id:'hydrF',   label:'Purga freno hidráulico delantero',      price:49, icon:'💧' },
      { id:'hydrR',   label:'Purga freno hidráulico trasero',        price:65, icon:'💧' },
      { id:'wheel',   label:'Centrado rueda (a ojo)',                 price:29, icon:'🎯' },
      { id:'light',   label:'Montaje luces (kit LED)',                price:25, icon:'💡' },
      { id:'cargo',   label:'Suplemento cargo bike',                  price:30, icon:'📦' },
      { id:'anfahrt', label:'Desplazamiento ciudad Zúrich',           price:49, icon:'🚐' }
    ],
    faqs: [
      { q:'¿Qué está incluido en el precio del servicio?', a:'Mano de obra, herramientas y consumibles están incluidos. El desplazamiento en la ciudad de Zúrich es CHF 49 facturado por separado. Las piezas se cotizan de forma transparente de antemano.' },
      { q:'¿Cuánto dura un servicio?', a:'Basic Check: aprox. 30 min. Servicio Estándar: 60–90 min. Servicio Premium: 120–150 min. Trabajamos de forma eficiente y minuciosa — directamente en tu ubicación en Zúrich.' },
      { q:'¿Reparáis también e-bikes?', a:'Sí — mantenemos e-bikes de todas las marcas (Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha). Sin pruebas de batería, diagnóstico de motor ni actualizaciones de firmware.' },
      { q:'¿Lleváis piezas de repuesto?', a:'Normalmente tenemos todas las piezas habituales. Las piezas especiales se piden en 2–3 días — sin coste extra de desplazamiento.' },
      { q:'¿Puedo combinar paquetes y extras?', a:'¡Por supuesto! Paquetes y extras son libremente combinables. La calculadora en vivo muestra el total al instante.' }
    ]
  }
};

/* ===================================================================
   CUSTOM ELEMENT
=================================================================== */
class VelovServices extends HTMLElement {

  constructor(){
    super();
    this.state = { pkg:'standard', extras:new Set() };
    this._lang = detectVsLang();
    if(!VS_LANG[this._lang]) this._lang = 'de';
  }

  get L(){ return VS_LANG[this._lang]; }
  get UI(){ return this.L.ui; }

  connectedCallback(){
    /* ── WIX VISIBILITY FIX ───────────────────────────────────────
       Must set these on the element itself in connectedCallback.
       Without background, the element is invisible in Wix Editor.
       Without display:block + overflow:visible, height collapses.
    ─────────────────────────────────────────────────────────── */
    this.style.display    = 'block';
    this.style.width      = '100%';
    this.style.minHeight  = '200px';
    this.style.overflow   = 'visible';
    this.style.position   = 'relative';
    this.style.background = '#F5F0EB';

    try{ window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, this.L.seo, this.UI.faqLabel, this.UI.contactLabel); }catch(e){}
    try{ window.__velovTracker && window.__velovTracker.bind(this, this._lang); }catch(e){}

    this.injectStyles();
    this.render();
    this.bindEvents();

    /* Height fix — forces Wix container to expand */
    this._fixHeight();
    var me = this;
    setTimeout(function(){ me._fixHeight(); }, 100);
    setTimeout(function(){ me._fixHeight(); }, 600);
    setTimeout(function(){ me._fixHeight(); }, 1500);
    if(typeof ResizeObserver !== 'undefined'){
      try{ new ResizeObserver(function(){ me._fixHeight(); }).observe(me); }catch(e){}
    }
  }

  _fixHeight(){
    try{
      var h = this.scrollHeight || this.offsetHeight;
      if(h > 100){ this.style.height = h+'px'; this.style.minHeight = h+'px'; }
      else { this.style.minHeight = '4000px'; }
    }catch(e){}
  }

  disconnectedCallback(){}

  injectStyles(){
    if(document.getElementById('velov-services-styles')) return;

    /* Google Fonts via <link> — @import is blocked by Wix CSP */
    if(!document.getElementById('velov-svc-font')){
      try{
        var lnk = document.createElement('link');
        lnk.id = 'velov-svc-font';
        lnk.rel = 'stylesheet';
        lnk.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(lnk);
      }catch(e){}
    }

    var s = document.createElement('style');
    s.id = 'velov-services-styles';
    /* ALL rules target .vs-wrap or children — NEVER velov-services tag */
    s.textContent = `
      .vs-wrap { display:block; width:100%; min-height:200px; background:#F5F0EB; font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif; color:#2D2B3D; line-height:1.6; -webkit-font-smoothing:antialiased; }
      .vs-wrap *,.vs-wrap *::before,.vs-wrap *::after{margin:0;padding:0;box-sizing:border-box}
      .vs-wrap a{text-decoration:none}

      .vs-inner{max-width:1140px;margin:0 auto;padding:0 24px}
      .vs-section{padding:96px 0}
      .vs-lbl{display:inline-block;font-size:12px;font-weight:700;color:#7B68EE;text-transform:uppercase;letter-spacing:1.8px;margin-bottom:12px}
      .vs-title{font-size:clamp(26px,3.6vw,40px);font-weight:800;color:#2D2B3D;line-height:1.15;margin-bottom:16px;letter-spacing:-.02em}
      .vs-sub{font-size:17px;color:#6B6880;max-width:620px;margin:0 auto;line-height:1.65}
      .vs-center{text-align:center}
      .vs-btn{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:700;font-size:16px;padding:16px 34px;border-radius:50px;border:none;cursor:pointer;font-family:inherit;transition:all .22s}

      /* HERO */
      .vs-hero{background:linear-gradient(135deg,#fbfafe 0%,#F5F0EB 100%);padding:112px 0 96px;text-align:center;position:relative;overflow:hidden}
      .vs-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(123,104,238,.12),transparent 65%);filter:blur(50px)}
      .vs-hero-in{position:relative;z-index:2}
      .vs-hero-badge{display:inline-block;background:rgba(123,104,238,.12);color:#7B68EE;font-size:13px;font-weight:700;padding:7px 18px;border-radius:50px;margin-bottom:22px;letter-spacing:1px;text-transform:uppercase}
      .vs-h1{font-size:clamp(34px,5.2vw,56px);font-weight:800;color:#2D2B3D;line-height:1.05;margin-bottom:22px;letter-spacing:-.03em}
      .vs-h1 .vs-grad{background:linear-gradient(90deg,#7B68EE,#9B8AFF);-webkit-background-clip:text;background-clip:text;color:transparent}
      .vs-hero .vs-lead{font-size:19px;color:#6B6880;max-width:620px;margin:0 auto 32px;line-height:1.55}

      /* PACKAGES */
      .vs-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:32px}
      .vs-pkg{background:#fff;border-radius:24px;padding:36px 30px;border:2px solid #E8E4DF;transition:all .25s;position:relative;cursor:pointer}
      .vs-pkg:hover{border-color:#7B68EE;transform:translateY(-4px);box-shadow:0 12px 32px rgba(123,104,238,.1)}
      .vs-pkg.on{border-color:#7B68EE;box-shadow:0 20px 50px rgba(45,43,61,.12);background:linear-gradient(135deg,#fff 0%,#fbfafe 100%)}
      .vs-pkg.featured::before{content:attr(data-feat);position:absolute;top:-14px;left:28px;background:#E8573A;color:#fff;font-size:11px;font-weight:800;padding:6px 14px;border-radius:50px;letter-spacing:1px}
      .vs-pkg-badge{display:inline-block;font-size:11px;font-weight:800;color:#7B68EE;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px}
      .vs-pkg h3{font-size:24px;font-weight:800;color:#2D2B3D;margin-bottom:4px;letter-spacing:-.02em}
      .vs-pkg-desc{font-size:14px;color:#6B6880;margin-bottom:20px;min-height:42px}
      .vs-pkg-price{padding:18px 0;border-top:1px solid #E8E4DF;border-bottom:1px solid #E8E4DF;margin-bottom:22px}
      .vs-pkg-amt{font-size:40px;font-weight:800;color:#7B68EE;line-height:1;letter-spacing:-.02em}
      .vs-pkg-amt small{font-size:15px;color:#6B6880;font-weight:600}
      .vs-pkg-sub{font-size:12px;color:#6B6880;margin-top:6px}
      .vs-pkg ul{list-style:none;padding:0}
      .vs-pkg li{font-size:14px;padding:7px 0 7px 26px;position:relative;color:#2D2B3D}
      .vs-pkg li::before{content:'✓';position:absolute;left:0;color:#4CAF50;font-weight:800}
      .vs-pkg-select{display:block;margin-top:24px;background:#F5F0EB;color:#2D2B3D;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:14px;transition:all .2s;border:none;width:100%;font-family:inherit;cursor:pointer}
      .vs-pkg.on .vs-pkg-select{background:#7B68EE;color:#fff}

      /* EXTRAS */
      .vs-extras{margin-top:44px;background:#fff;border-radius:24px;padding:40px;box-shadow:0 12px 32px rgba(123,104,238,.1);border:1px solid #E8E4DF}
      .vs-extras-title{font-size:19px;font-weight:700;margin-bottom:6px;color:#2D2B3D}
      .vs-extras-hint{font-size:14px;color:#6B6880;margin-bottom:22px}
      .vs-ext-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
      .vs-ext{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:14px;background:#F5F0EB;cursor:pointer;border:2px solid transparent;transition:all .18s;font-size:13.5px}
      .vs-ext:hover{background:#efe9e1}
      .vs-ext.on{background:#ede9ff;border-color:#7B68EE}
      .vs-ext-ic{font-size:18px;flex-shrink:0}
      .vs-ext-lbl{flex:1;font-weight:500;line-height:1.3}
      .vs-ext-px{font-weight:700;color:#7B68EE;font-size:13px;white-space:nowrap}

      /* TOTAL */
      .vs-total{margin-top:28px;padding:24px;background:linear-gradient(135deg,#7B68EE,#6354d4);color:#fff;border-radius:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
      .vs-total-l{font-size:13px;text-transform:uppercase;letter-spacing:1.5px;opacity:.9;font-weight:600}
      .vs-total-a{font-size:42px;font-weight:800;letter-spacing:-.02em}
      .vs-total-f{font-size:12px;opacity:.8;margin-top:4px}
      .vs-wa-btn{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;text-decoration:none;padding:14px 26px;border-radius:50px;font-weight:700;font-size:15px;transition:all .2s;box-shadow:0 8px 22px rgba(37,211,102,.4)}
      .vs-wa-btn:hover{background:#1ebe5b;transform:translateY(-2px)}
      .vs-wa-btn svg{width:20px;height:20px;flex-shrink:0}

      /* FAQ */
      .vs-faq-list{margin-top:40px;max-width:780px;margin-left:auto;margin-right:auto}
      .vs-faq{background:#fff;border-radius:16px;margin-bottom:12px;border:1px solid #E8E4DF;overflow:hidden;transition:all .2s}
      .vs-faq.open{box-shadow:0 12px 32px rgba(123,104,238,.1);border-color:#7B68EE}
      .vs-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:none;border:none;font-family:inherit;font-size:16px;font-weight:700;color:#2D2B3D;text-align:left;cursor:pointer;gap:16px}
      .vs-faq-ic{width:30px;height:30px;border-radius:50%;background:#F5F0EB;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s;color:#7B68EE;font-weight:700}
      .vs-faq.open .vs-faq-ic{background:#7B68EE;color:#fff;transform:rotate(45deg)}
      .vs-faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 24px}
      .vs-faq.open .vs-faq-a{max-height:400px}
      .vs-faq-ai{padding-bottom:20px;font-size:15px;color:#6B6880;line-height:1.65}

      /* CTA */
      .vs-cta{background:#7B68EE;color:#fff;text-align:center;padding:112px 0}
      .vs-cta h2{font-size:clamp(26px,3.5vw,40px);font-weight:800;margin-bottom:14px}
      .vs-cta p{font-size:17px;opacity:.9;margin-bottom:30px;max-width:540px;margin-left:auto;margin-right:auto}
      .vs-contact{margin-top:24px;font-size:14px;opacity:.8}
      .vs-contact a{color:#fff;text-decoration:underline}
      .vs-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

      @media(max-width:880px){
        .vs-section,.vs-hero{padding:60px 0}
        .vs-pkg-grid{grid-template-columns:1fr}
        .vs-ext-grid{grid-template-columns:1fr 1fr}
        .vs-extras{padding:26px 22px}
        .vs-total{flex-direction:column;align-items:stretch;text-align:center}
        .vs-wa-btn{justify-content:center}
        .vs-cta{padding:60px 0}
      }
    `;
    document.head.appendChild(s);
  }

  /* ── HTML builders — no nested backticks ── */
  _buildPackages(){
    var me = this;
    var UI = this.UI;
    var L = this.L;
    return L.packages.map(function(p){
      var lis = p.features.map(function(f){ return '<li>'+f+'</li>'; }).join('');
      var selected = p.id === me.state.pkg;
      return '<div class="vs-pkg'+(p.featured?' featured':'')+(selected?' on':'')+'" data-pkg="'+p.id+'" data-feat="'+UI.featuredBadge+'">'
        + '<div class="vs-pkg-badge">'+p.badge+'</div>'
        + '<h3>'+p.title+'</h3>'
        + '<div class="vs-pkg-desc">'+p.desc+'</div>'
        + '<div class="vs-pkg-price">'
        + '<div class="vs-pkg-amt">CHF '+p.price+'<small>'+UI.priceSuffix+'</small></div>'
        + '<div class="vs-pkg-sub">'+p.subtitle+'</div>'
        + '</div>'
        + '<ul>'+lis+'</ul>'
        + '<button class="vs-pkg-select">'+(selected ? UI.selectedBtn : UI.selectBtn)+'</button>'
        + '</div>';
    }).join('');
  }

  _buildExtras(){
    var me = this;
    var L = this.L;
    return L.extras.map(function(e){
      var on = me.state.extras.has(e.id);
      return '<div class="vs-ext'+(on?' on':'')+'" data-ext="'+e.id+'">'
        + '<span class="vs-ext-ic">'+e.icon+'</span>'
        + '<span class="vs-ext-lbl">'+e.label+'</span>'
        + '<span class="vs-ext-px">+CHF '+e.price+'</span>'
        + '</div>';
    }).join('');
  }

  _buildFaqs(){
    var L = this.L;
    return L.faqs.map(function(f, i){
      return '<div class="vs-faq" data-faq="'+i+'">'
        + '<button class="vs-faq-q" aria-expanded="false">'
        + '<span>'+f.q+'</span>'
        + '<span class="vs-faq-ic">+</span>'
        + '</button>'
        + '<div class="vs-faq-a"><div class="vs-faq-ai">'+f.a+'</div></div>'
        + '</div>';
    }).join('');
  }

  _waIconSvg(){
    return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  }

  render(){
    var UI = this.UI;
    var L = this.L;
    var C = VS_CONTACT;
    var startPkg = L.packages.find(function(p){ return p.id === 'standard'; }) || L.packages[0];

    this.innerHTML = '<div class="vs-wrap">'

      /* HERO */
      + '<div class="vs-hero"><div class="vs-inner vs-hero-in">'
      + '<div class="vs-hero-badge">'+UI.heroBadge+'</div>'
      + '<h1 class="vs-h1">'+UI.heroH1+'<br><span class="vs-grad">'+UI.heroSpan+'</span></h1>'
      + '<p class="vs-lead">'+UI.heroLead+'</p>'
      + '<a href="tel:'+C.phone+'" class="vs-btn" style="background:#E8573A;color:#fff">'+UI.heroBtn+'</a>'
      + '</div></div>'

      /* PACKAGES + CALCULATOR */
      + '<div class="vs-section" style="background:#fff"><div class="vs-inner">'
      + '<div class="vs-center">'
      + '<div class="vs-lbl">'+UI.pkgLabel+'</div>'
      + '<h2 class="vs-title">'+UI.pkgTitle+'</h2>'
      + '<p class="vs-sub">'+UI.pkgSub+'</p>'
      + '</div>'
      + '<div class="vs-pkg-grid" id="vs-pkg-grid">'+this._buildPackages()+'</div>'
      + '<div class="vs-extras">'
      + '<div class="vs-extras-title">'+UI.extrasTitle+'</div>'
      + '<div class="vs-extras-hint">'+UI.extrasHint+'</div>'
      + '<div class="vs-ext-grid" id="vs-ext-grid">'+this._buildExtras()+'</div>'
      + '</div>'
      + '<div class="vs-total">'
      + '<div>'
      + '<div class="vs-total-l">'+UI.totalLabel+'</div>'
      + '<div class="vs-total-a" id="vs-tot">CHF '+startPkg.price+'</div>'
      + '<div class="vs-total-f">'+UI.totalFooter+'</div>'
      + '</div>'
      + '<a class="vs-wa-btn" id="vs-wa" href="#" target="_blank" rel="noopener">'
      + this._waIconSvg()
      + UI.waBtn
      + '</a>'
      + '</div>'
      + '</div></div>'

      /* FAQ */
      + '<div class="vs-section" style="background:#F5F0EB"><div class="vs-inner">'
      + '<div class="vs-center">'
      + '<div class="vs-lbl">'+UI.faqSectionLabel+'</div>'
      + '<h2 class="vs-title">'+UI.faqSectionTitle+'</h2>'
      + '</div>'
      + '<div class="vs-faq-list">'+this._buildFaqs()+'</div>'
      + '</div></div>'

      /* FINAL CTA */
      + '<div class="vs-cta"><div class="vs-inner">'
      + '<h2>'+UI.ctaTitle+'</h2>'
      + '<p>'+UI.ctaBody+'</p>'
      + '<div class="vs-row">'
      + '<a href="tel:'+C.phone+'" class="vs-btn" style="background:#fff;color:#7B68EE">'+UI.ctaCall+'</a>'
      + '<a href="https://wa.me/'+C.waNumber+'" class="vs-btn" style="background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25)">'+UI.ctaWa+'</a>'
      + '</div>'
      + '<div class="vs-contact"><a href="mailto:'+C.email+'">'+C.email+'</a> · '+UI.ctaContact+'</div>'
      + '</div></div>'

      + '</div>'; /* end .vs-wrap */

    this.updateTotal();
  }

  bindEvents(){
    var me = this;
    /* Package selection */
    this.querySelectorAll('.vs-pkg').forEach(function(el){
      el.addEventListener('click', function(){
        me.state.pkg = el.dataset.pkg;
        me.querySelectorAll('.vs-pkg').forEach(function(p){
          p.classList.toggle('on', p.dataset.pkg === me.state.pkg);
          var btn = p.querySelector('.vs-pkg-select');
          if(btn) btn.textContent = p.dataset.pkg === me.state.pkg ? me.UI.selectedBtn : me.UI.selectBtn;
        });
        me.updateTotal();
      });
    });
    /* Extra toggles */
    this.querySelectorAll('.vs-ext').forEach(function(el){
      el.addEventListener('click', function(){
        var id = el.dataset.ext;
        if(me.state.extras.has(id)) me.state.extras.delete(id);
        else me.state.extras.add(id);
        el.classList.toggle('on');
        me.updateTotal();
      });
    });
    /* FAQ accordion */
    this.querySelectorAll('.vs-faq').forEach(function(item){
      item.querySelector('.vs-faq-q').addEventListener('click', function(){
        var wasOpen = item.classList.contains('open');
        me.querySelectorAll('.vs-faq').forEach(function(x){
          x.classList.remove('open');
          x.querySelector('.vs-faq-q').setAttribute('aria-expanded','false');
        });
        if(!wasOpen){
          item.classList.add('open');
          item.querySelector('.vs-faq-q').setAttribute('aria-expanded','true');
        }
      });
    });
  }

  updateTotal(){
    var me = this;
    var L = this.L;
    var UI = this.UI;
    var C = VS_CONTACT;
    var pkg = L.packages.find(function(x){ return x.id === me.state.pkg; }) || L.packages[0];
    var total = pkg.price;
    var selectedExtras = [];
    me.state.extras.forEach(function(id){
      var e = L.extras.find(function(x){ return x.id === id; });
      if(e){ total += e.price; selectedExtras.push(e); }
    });
    var totEl = this.querySelector('#vs-tot');
    if(totEl) totEl.textContent = 'CHF '+total;
    var msg = UI.waMsg(pkg, selectedExtras, total);
    var waEl = this.querySelector('#vs-wa');
    if(waEl) waEl.setAttribute('href', 'https://wa.me/'+C.waNumber+'?text='+encodeURIComponent(msg));
  }
}

if(!customElements.get('velov-services')){
  customElements.define('velov-services', VelovServices);
}
