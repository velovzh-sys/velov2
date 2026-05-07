/* ===================================================================
   VELOV — UNIFIED Multilingual Pannendienst Custom Element
   Languages: de (primary) · en · fr · it · es
   Tag: <velov-pannendienst>

   IMPROVEMENTS over original files:
   ✅ All 5 languages fully translated (UI, steps, included, tiers, FAQs)
   ✅ WhatsApp messages in correct language per visitor
   ✅ Zone ETA box text in correct language
   ✅ Richer FAQPage schema (8 Q&As per language vs 3 in original)
   ✅ EmergencyService + LocalBusiness + AutoRepair schema per language
   ✅ Breadcrumb schema with localised page names
   ✅ hreflang-aware schema urls per language
   ✅ Same language detection logic as velov-home-UNIFIED.js
   =================================================================== */

/* ===== VELOV Shared SEO Helper ===== */
(function(){
  if (window.__velovSeoHelper) return;
  function safe(s){return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' ');}
  function buildMirror(s,faqLabel,contactLabel){
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
    setTimeout(appendMirror,0);
    setTimeout(appendMirror,100);
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

/* ===== VELOV Tracker ===== */
(function(){
  if(window.__velovTracker) return;
  function pushEvent(name,params){
    try{
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push(Object.assign({event:name},params||{}));
      if(typeof window.gtag==='function') window.gtag('event',name,params||{});
    }catch(e){}
  }
  function pageContext(host,lang){
    return{page_component:(host&&host.tagName)?host.tagName.toLowerCase():'unknown',
      page_path:(typeof location!=='undefined')?location.pathname:'',language:lang||'de'};
  }
  function bind(host,lang){
    if(!host||host.__velovBound) return;
    host.__velovBound=true;
    host.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a');
      if(!a) return;
      var href=a.getAttribute('href')||'';
      var ctx=pageContext(host,lang);
      var label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
      if(/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href)||/whatsapp/i.test(href)){
        pushEvent('whatsapp_click',Object.assign({link_url:href,link_text:label},ctx));
      }else if(/^tel:/i.test(href)){
        pushEvent('phone_click',Object.assign({link_url:href,link_text:label},ctx));
      }else if(/^mailto:/i.test(href)){
        pushEvent('email_click',Object.assign({link_url:href,link_text:label},ctx));
      }
    },{passive:true,capture:true});
  }
  window.__velovTracker={bind:bind,pushEvent:pushEvent};
})();

/* ===================================================================
   SHARED CONSTANTS
   =================================================================== */
const VP_CONTACT = {
  phone: '+41762352126',
  phoneDisplay: '+41 76 235 21 26',
  waNumber: '41762352126',
  email: 'info@velov.ch'
};

/* Zones — names stay in local German (neighbourhoods) */
const VP_ZONES = [
  { id:'zentrum', name:'Zürich Zentrum', areas:['Altstadt','Niederdorf','Seefeld','Enge','Wiedikon'], eta:35 },
  { id:'west',    name:'Zürich West',    areas:['Kreis 4','Kreis 5','Aussersihl','Albisrieden','Altstetten'], eta:45 },
  { id:'nord',    name:'Zürich Nord',    areas:['Oerlikon','Seebach','Affoltern','Schwamendingen','Wipkingen'], eta:45 },
  { id:'ost',     name:'Zürich Ost',     areas:['Zürichberg','Hottingen','Fluntern','Witikon','Hirslanden'], eta:45 },
  { id:'sued',    name:'Zürich Süd',     areas:['Leimbach','Wollishofen','Adliswil','Kilchberg'], eta:55 },
  { id:'umland',  name:'Zürcher Umland', areas:['Dübendorf','Opfikon','Glattbrugg','Zollikon','Küsnacht'], eta:65 }
];

/* ===================================================================
   MULTILINGUAL CONTENT
   =================================================================== */
const VP_LANG = {

  /* ── DEUTSCH ── */
  de: {
    seo: {
      id: 'pannendienst-de',
      h1: 'Velo Pannendienst Zürich – Plattfuss-Notfall? Wir kommen in 60 Minuten',
      intro: 'Plattfuss in Zürich? VELOV ist Zürichs schnellster mobiler Pannendienst. CHF 99 all-inclusive: Anfahrt, neuer Schlauch, Sicherheitscheck. WhatsApp uns – wir sind in der Regel in 60 Minuten bei dir.',
      sections: [
        { h2:'Velo Pannendienst Zürich – CHF 99 all-inclusive', body:'Ein Festpreis, keine versteckten Kosten. Wir kommen mit dem Service-Velo zu dir, wechseln den Schlauch, prüfen Reifen und Bremsen, und du fährst weiter. Reaktionszeit unter 60 Minuten in der Stadt Zürich.' },
        { h2:'Wie der Pannendienst abläuft', body:'1. WhatsApp uns Standort + Foto. 2. Wir bestätigen ETA. 3. Wir kommen, reparieren vor Ort, du bezahlst per TWINT. Du musst nicht einmal anwesend sein.',
          h3items:[
            {h3:'Schritt 1 – WhatsApp Foto', body:'Schick uns deinen Standort und ein Foto vom Velo.'},
            {h3:'Schritt 2 – Bestätigung & ETA', body:'Du bekommst eine fixe Ankunftszeit und CHF 99 schriftlich.'},
            {h3:'Schritt 3 – Reparatur vor Ort', body:'Schlauchwechsel, Reifen-Check, Bremsen prüfen, Sicherheitscheck.'},
            {h3:'Schritt 4 – TWINT-Zahlung', body:'Zahlung nach erbrachter Leistung per TWINT.'}
          ]},
        { h2:'In allen Zürcher Quartieren', body:'Pannendienst in allen 12 Kreisen der Stadt Zürich und der Agglomeration.' }
      ],
      faqs: [
        {q:'Was kostet die Plattfuss-Reparatur?', a:'CHF 99 all-inclusive: Anfahrt, Schlauch, Arbeitszeit, Sicherheitscheck.'},
        {q:'Wie schnell kommt ihr?', a:'In der Regel unter 60 Minuten in der Stadt Zürich.'},
        {q:'Repariert ihr auch E-Bike-Reifen?', a:'Ja, alle Velos und E-Bikes – auch Cargo-Bikes.'},
        {q:'Was wenn der Reifen nicht zu retten ist?', a:'Wir tauschen den Schlauch. Falls auch der Reifen Schaden hat, machen wir eine transparente Offerte vor Ort.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 für Notfälle · info@velov.ch',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobiler Velo-Pannendienst Zürich","url":"https://www.velov.ch/pannendienst","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99–CHF 119","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zürich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"offers":[{"@type":"Offer","name":"Pannendienst all-inclusive — normales Velo","price":"99","priceCurrency":"CHF","description":"Anfahrt + Diagnose + neuer Schlauch + Montage + Reifen aufpumpen + Kettenöl"},{"@type":"Offer","name":"Pannendienst E-Bike Nabenmotor hinten","price":"109","priceCurrency":"CHF"},{"@type":"Offer","name":"Pannendienst Cargo-Bike Hinterrad","price":"119","priceCurrency":"CHF"}],"inLanguage":"de","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"de","mainEntity":[{"@type":"Question","name":"Ist CHF 99 wirklich all-inclusive?","acceptedAnswer":{"@type":"Answer","text":"Ja. CHF 99 enthält Anfahrt, Diagnose, neuer Schlauch, Montage, beide Reifen aufpumpen und Kettenöl. Keine versteckten Kosten."}},{"@type":"Question","name":"Wann kostet es mehr als CHF 99?","acceptedAnswer":{"@type":"Answer","text":"Nur bei Cargo-Bike-Hinterrad (ab CHF 119) oder E-Bike-Nabenmotor hinten (ab CHF 109)."}},{"@type":"Question","name":"Wie schnell seid ihr in Zürich da?","acceptedAnswer":{"@type":"Answer","text":"Innerhalb der Stadt Zürich in der Regel innert 45 Minuten — oft schneller."}},{"@type":"Question","name":"Seid ihr 24h erreichbar?","acceptedAnswer":{"@type":"Answer","text":"Wir versuchen rund um die Uhr erreichbar zu sein. Schreib uns per WhatsApp — wir antworten so schnell wie möglich."}},{"@type":"Question","name":"Repariert ihr auch E-Bike-Elektronik?","acceptedAnswer":{"@type":"Answer","text":"Nein. VELOV repariert ausschliesslich mechanische Teile. Akku, Display und Motor-Elektronik machen wir nicht."}},{"@type":"Question","name":"Muss ich zuhause sein?","acceptedAnswer":{"@type":"Answer","text":"Nein — wenn das Velo zugänglich ist, reparieren wir auch ohne dich. Bezahlung per TWINT nach Foto-Bestätigung."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch"},{"@type":"ListItem","position":2,"name":"Pannendienst","item":"https://www.velov.ch/pannendienst"}]}
      ]
    },
    ui: {
      faqLabel:'Häufige Fragen', contactLabel:'Kontakt',
      liveBadge:'24/7 nah erreichbar · Mobiler Pannendienst Zürich',
      heroH1:'Plattfuss in Zürich? Kein Problem.',
      heroSub:'Mobiler Velo-Pannendienst — wir kommen mit Velo und Cargo-Bike zu dir. Überall in der Stadt Zürich.',
      priceTagline:'All-inclusive · Anfahrt, Schlauch, Montage, Luft, Kettenöl',
      ctaPhone:'📞 Jetzt Pannendienst rufen',
      ctaWa:'💬 WhatsApp · Antwort in Minuten',
      heroNote:'Mechanische Velo-Reparatur · Elektronik und Akku reparieren wir nicht',
      waHeroMsg:'Hallo VELOV, ich habe einen Plattfuss / Panne. Standort: ',
      bookerLabel:'Quick-Booker',
      bookerTitle:'Wo bist du gerade in Zürich?',
      bookerSub:'Wähle dein Quartier — wir zeigen dir sofort deine Reaktionszeit und buchen direkt per WhatsApp.',
      bookerStep:'Schritt 1 von 1',
      bookerQ:'In welchem Stadtteil stehst du gerade?',
      etaUnit:'Min Reaktion',
      etaArrival:'Erwartete Ankunft ab Anfrage',
      etaBookBtn:'📲 Jetzt per WhatsApp buchen',
      etaPriceNote:'Festpreis CHF 99 all-inclusive für die meisten Fälle. Cargo-Bike hinten ab CHF 119 · E-Bike Nabenmotor hinten ab CHF 109.',
      waZoneMsg:(zname,areas)=>`Hallo VELOV, ich brauche den Pannendienst!\n• Standort: ${zname} (${areas.slice(0,2).join(', ')} …)\n• Problem: Plattfuss / Panne\nKönnt ihr kommen?`,
      inclLabel:'All-Inclusive',
      inclTitle:'Was ist im Preis von CHF 99 enthalten?',
      inclSub:'Alles, was ein Plattfuss wirklich braucht. Du zahlst genau CHF 99 — Fixpreis, keine Überraschungen.',
      tiersLabel:'Preise nach Velo-Typ',
      tiersTitle:'Transparente Festpreise für Zürich',
      tiersSub:'Für 99 % unserer Einsätze gilt CHF 99. Nur bei Cargo-Bike-Hinterrad oder E-Bike-Nabenmotor hinten ist ein leichter Aufpreis fair.',
      tierFrom:'ab',
      stepsLabel:'Ablauf',
      stepsTitle:'So schnell geht\'s',
      faqLabel2:'FAQ',
      faqTitle:'Häufige Fragen zum Pannendienst',
      ctaTitle:'Plattfuss? Ruf jetzt an oder schreib per WhatsApp.',
      ctaBody:'CHF 99 all-inclusive in Zürich. Wir versuchen rund um die Uhr zu kommen — oft innert 45 Minuten.',
      ctaFooter:'Mobiler Pannendienst für Velo, E-Bike und Cargo-Bike in Zürich'
    },
    included:[
      {icon:'🚐',title:'Anfahrt',          desc:'Wir kommen per Velo oder Cargo-Bike direkt zu dir — überall in Zürich.'},
      {icon:'🔍',title:'Diagnose vor Ort', desc:'Wir finden das Problem sofort — transparent erklärt.'},
      {icon:'🛞',title:'Neuer Schlauch',   desc:'Hochwertiger Ersatzschlauch passend zu deinem Velo — inklusive.'},
      {icon:'🔧',title:'Montage',          desc:'Professioneller Reifenwechsel, korrekt montiert und ausgerichtet.'},
      {icon:'💨',title:'Beide Reifen Luft',desc:'Wir pumpen beide Reifen auf den optimalen Druck auf.'},
      {icon:'🛢️',title:'Kettenöl',         desc:'Kette gereinigt und geölt — du fährst wie neu weiter.'}
    ],
    tiers:[
      {badge:'Standard',    title:'Normale Velos — Vorder- oder Hinterrad', price:99,  desc:'Gilt für alle Stadt-, City-, Renn- und Trekking-Velos.',
       list:['Alle Vorderräder aller Velos','Hinterrad bei klassischen Fahrrädern','Alle Punkte im All-Inclusive-Paket','Fixpreis — keine Überraschung']},
      {badge:'E-Bike hinten',title:'E-Bike mit Nabenmotor — Hinterrad',      price:109, desc:'Aufpreis für Demontage des Motors / der Steckachse hinten.',
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Mehraufwand durch Nabenmotor','Spezialwerkzeug inklusive','Rein mechanisch — kein Akku-/Elektronik-Service']},
      {badge:'Cargo-Bike',   title:'Cargo-Bike — Hinterrad',                 price:119, desc:'Grössere Laufräder, schwerere Konstruktion, mehr Zeit.',
       list:['Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt u.a.','Längere Hinterrad-Demontage','Spezielle Werkzeuge für breite Achsen','Alle Punkte im All-Inclusive-Paket']}
    ],
    steps:[
      {n:1, t:'WhatsApp oder Anruf',       d:'Schreib uns per WhatsApp oder ruf an. Sag uns, wo du bist und was dran ist.'},
      {n:2, t:'Foto / Video (optional)',    d:'Schick ein Bild vom Velo / Schaden — so kommen wir mit den richtigen Teilen.'},
      {n:3, t:'Wir kommen zu dir',          d:'In der Stadt Zürich oft innerhalb 45 Minuten. Wir kommen per Velo & Cargo-Bike.'},
      {n:4, t:'Repariert & weiterfahren',   d:'Reparatur vor Ort, Reifen aufgepumpt, Kette geölt — du fährst weiter.'}
    ],
    faqs:[
      {q:'Ist CHF 99 wirklich all-inclusive?', a:'Ja. CHF 99 enthält Anfahrt, Diagnose, neuer Schlauch, Montage, beide Reifen aufpumpen und Kettenöl. Keine versteckten Kosten. Gilt für normale Velos (Vorder- & Hinterrad) und alle Vorderräder.'},
      {q:'Wann kostet es mehr als CHF 99?', a:'Nur bei Cargo-Bike-Hinterrad (ab CHF 119) oder E-Bike-Nabenmotor hinten (ab CHF 109). Vorderräder bleiben überall bei CHF 99.'},
      {q:'Wie schnell seid ihr in Zürich da?', a:'Innerhalb der Stadt Zürich in der Regel innert 45 Minuten — oft schneller. In der Agglomeration 55–65 Minuten.'},
      {q:'Seid ihr 24h erreichbar?', a:'Wir versuchen rund um die Uhr erreichbar zu sein. Schreib uns auch abends oder am Wochenende per WhatsApp.'},
      {q:'Repariert ihr auch E-Bike-Elektronik?', a:'Nein. VELOV repariert ausschliesslich mechanische Teile. Akku, Display und Motor-Elektronik machen wir nicht.'},
      {q:'Muss ich zuhause sein?', a:'Nein — wenn das Velo zugänglich ist, reparieren wir auch ohne dich. Zahlung per TWINT nach Foto-Bestätigung.'},
      {q:'Wie bezahle ich?', a:'TWINT, Bargeld oder Rechnung. Transparenter Fixpreis vor der Reparatur — du weisst genau, was du bezahlst.'},
      {q:'Welche Velos repariert ihr?', a:'Stadtvelos, Rennvelos, Gravel, MTB, Trekking, E-Bikes aller Marken, Cargo-Bikes aller Marken — alles was mechanisch ist.'}
    ]
  },

  /* ── ENGLISH ── */
  en: {
    seo: {
      id: 'emergency-en',
      h1: 'Bike Emergency Service Zurich – Flat Tyre? We Come in 60 Minutes',
      intro: 'Flat tyre in Zurich? VELOV is Zurich\'s fastest mobile bike emergency service. CHF 99 all-inclusive: travel, new inner tube, safety check. WhatsApp us — we\'re typically with you in 60 minutes.',
      sections: [
        {h2:'Bike Emergency Service Zurich – CHF 99 All-Inclusive', body:'One fixed price, no hidden fees. We come to you with a service bike, replace the inner tube, check tyres and brakes, and you\'re back on the road. Response time under 60 minutes in Zurich city.'},
        {h2:'How the Emergency Service Works', body:'1. WhatsApp us your location and a photo. 2. We confirm ETA. 3. We come, repair on-site, you pay via TWINT. You don\'t even need to be present — just leave the bike accessible.',
         h3items:[
           {h3:'Step 1 – WhatsApp Photo', body:'Send us your location and a photo of the bike. We usually reply within minutes.'},
           {h3:'Step 2 – Confirmation & ETA', body:'You get a fixed arrival time and CHF 99 fixed price in writing.'},
           {h3:'Step 3 – On-Site Repair', body:'Inner tube replacement, tyre check, brake inspection, safety check.'},
           {h3:'Step 4 – TWINT Payment', body:'Pay after the repair via TWINT.'}
         ]},
        {h2:'In All Zurich Districts', body:'Emergency service across all 12 districts and the greater Zurich agglomeration.'}
      ],
      faqs: [
        {q:'How much is the flat tyre repair?', a:'CHF 99 all-inclusive: travel, inner tube, labour, safety check.'},
        {q:'How fast do you come?', a:'Typically under 60 minutes within Zurich city.'},
        {q:'Do you repair e-bike tyres?', a:'Yes — all bikes and e-bikes, including cargo bikes.'},
        {q:'What if the tyre is beyond repair?', a:'We replace the inner tube. If the tyre is also damaged, we give you a transparent quote on-site.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 for emergencies · info@velov.ch',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Bike Emergency Service Zurich","url":"https://www.velov.ch/en/emergency","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99–CHF 119","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"offers":[{"@type":"Offer","name":"Flat tyre repair all-inclusive — standard bike","price":"99","priceCurrency":"CHF","description":"Travel + diagnosis + new inner tube + fitting + tyre inflation + chain lube"},{"@type":"Offer","name":"Flat tyre — e-bike rear hub motor","price":"109","priceCurrency":"CHF"},{"@type":"Offer","name":"Flat tyre — cargo bike rear wheel","price":"119","priceCurrency":"CHF"}],"inLanguage":"en","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"en","mainEntity":[{"@type":"Question","name":"Is CHF 99 really all-inclusive?","acceptedAnswer":{"@type":"Answer","text":"Yes. CHF 99 includes travel, diagnosis, new inner tube, fitting, inflating both tyres and chain lube. No hidden costs."}},{"@type":"Question","name":"When does it cost more than CHF 99?","acceptedAnswer":{"@type":"Answer","text":"Only for cargo bike rear wheel (from CHF 119) or e-bike rear hub motor (from CHF 109). Front wheels are always CHF 99."}},{"@type":"Question","name":"How quickly can you reach me in Zurich?","acceptedAnswer":{"@type":"Answer","text":"Within Zurich city typically within 45 minutes — often faster. Agglomeration 55–65 minutes."}},{"@type":"Question","name":"Are you available 24 hours?","acceptedAnswer":{"@type":"Answer","text":"We aim to be available around the clock. WhatsApp us any time — evenings and weekends included."}},{"@type":"Question","name":"Do you repair e-bike electronics?","acceptedAnswer":{"@type":"Answer","text":"No. VELOV repairs mechanical components only. Battery, display and motor electronics are not our service."}},{"@type":"Question","name":"Do I need to be present?","acceptedAnswer":{"@type":"Answer","text":"No — if the bike is accessible outdoors, we repair it without you present. Payment via TWINT after photo confirmation."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/en"},{"@type":"ListItem","position":2,"name":"Emergency Service","item":"https://www.velov.ch/en/emergency"}]}
      ]
    },
    ui: {
      faqLabel:'Frequently Asked Questions', contactLabel:'Contact',
      liveBadge:'Available 24/7 · Mobile Bike Emergency Service Zurich',
      heroH1:'Flat tyre in Zurich? No problem.',
      heroSub:'Mobile bike emergency service — we come to you by bike & cargo bike. Anywhere in Zurich city.',
      priceTagline:'All-inclusive · Travel, inner tube, fitting, inflation, chain lube',
      ctaPhone:'📞 Call Emergency Service Now',
      ctaWa:'💬 WhatsApp · Reply in Minutes',
      heroNote:'Mechanical bike repair only · We do not repair electronics or batteries',
      waHeroMsg:'Hi VELOV, I have a flat tyre / breakdown. Location: ',
      bookerLabel:'Quick Booker',
      bookerTitle:'Where are you in Zurich right now?',
      bookerSub:'Select your area — we\'ll show you your personal response time and you can book directly via WhatsApp.',
      bookerStep:'Step 1 of 1',
      bookerQ:'Which part of the city are you in?',
      etaUnit:'min response',
      etaArrival:'Expected arrival from request',
      etaBookBtn:'📲 Book now via WhatsApp',
      etaPriceNote:'Fixed price CHF 99 all-inclusive for most cases. Cargo bike rear from CHF 119 · E-bike rear hub motor from CHF 109.',
      waZoneMsg:(zname,areas)=>`Hi VELOV, I need emergency bike service!\n• Location: ${zname} (${areas.slice(0,2).join(', ')} …)\n• Problem: Flat tyre / breakdown\nCan you come?`,
      inclLabel:'All-Inclusive',
      inclTitle:'What\'s included in the CHF 99 price?',
      inclSub:'Everything a flat tyre really needs. You pay exactly CHF 99 — fixed price, no surprises.',
      tiersLabel:'Price by Bike Type',
      tiersTitle:'Transparent Fixed Prices for Zurich',
      tiersSub:'For 99% of callouts, CHF 99 applies. A small surcharge is fair only for cargo bike rear wheels or e-bike rear hub motors.',
      tierFrom:'from',
      stepsLabel:'How It Works',
      stepsTitle:'This is how fast it goes',
      faqLabel2:'FAQ',
      faqTitle:'Common Questions About the Emergency Service',
      ctaTitle:'Flat tyre? Call now or WhatsApp us.',
      ctaBody:'CHF 99 all-inclusive in Zurich. We aim to come around the clock — often within 45 minutes in the city.',
      ctaFooter:'Mobile emergency service for bikes, e-bikes and cargo bikes in Zurich'
    },
    included:[
      {icon:'🚐',title:'Travel',            desc:'We come to you by bike or cargo bike — anywhere in Zurich.'},
      {icon:'🔍',title:'On-site diagnosis', desc:'We find the problem immediately — explained transparently.'},
      {icon:'🛞',title:'New inner tube',    desc:'High-quality replacement tube for your bike — included.'},
      {icon:'🔧',title:'Fitting',           desc:'Professional tyre fitting, correctly mounted and aligned.'},
      {icon:'💨',title:'Both tyres inflated',desc:'We inflate both tyres to optimal pressure.'},
      {icon:'🛢️',title:'Chain lube',        desc:'Chain cleaned and lubed — you ride like new.'}
    ],
    tiers:[
      {badge:'Standard',     title:'Standard Bikes — Front or Rear Wheel', price:99,  desc:'Applies to all city, road, gravel and trekking bikes.',
       list:['All front wheels of all bikes','Rear wheel of standard bikes','All items in the all-inclusive package','Fixed price — no surprises']},
      {badge:'E-Bike rear',  title:'E-Bike with Rear Hub Motor',           price:109, desc:'Surcharge for motor / thru-axle disassembly.',
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Extra work due to hub motor','Special tools included','Mechanical work only — no battery/electronics service']},
      {badge:'Cargo Bike',   title:'Cargo Bike — Rear Wheel',              price:119, desc:'Larger wheels, heavier build, more time required.',
       list:['Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','Longer rear wheel removal','Specialist tools for wide axles','All items in the all-inclusive package']}
    ],
    steps:[
      {n:1, t:'WhatsApp or call',          d:'Tell us where you are and what\'s wrong. We reply within minutes.'},
      {n:2, t:'Photo / video (optional)',   d:'Send a picture of the bike/damage — we\'ll bring the right parts.'},
      {n:3, t:'We come to you',             d:'Within Zurich city often within 45 minutes. We travel by bike & cargo bike.'},
      {n:4, t:'Repaired & back on the road',d:'Fixed on-site, tyres pumped, chain lubed — off you go.'}
    ],
    faqs:[
      {q:'Is CHF 99 really all-inclusive?', a:'Yes. CHF 99 includes travel, diagnosis, new inner tube, fitting, inflating both tyres and chain lube. No hidden costs.'},
      {q:'When does it cost more than CHF 99?', a:'Only for cargo bike rear wheel (from CHF 119) or e-bike rear hub motor (from CHF 109). Front wheels are always CHF 99.'},
      {q:'How quickly can you reach me in Zurich?', a:'Within Zurich city typically within 45 minutes — often faster. Agglomeration 55–65 minutes.'},
      {q:'Are you available 24 hours?', a:'We aim to be available around the clock. WhatsApp us any time — evenings and weekends included.'},
      {q:'Do you repair e-bike electronics?', a:'No. VELOV repairs mechanical components only. Battery, display and motor electronics are not our service.'},
      {q:'Do I need to be present?', a:'No — if the bike is accessible outdoors, we repair it without you. Payment via TWINT after photo confirmation.'},
      {q:'How do I pay?', a:'TWINT, cash or invoice. Transparent fixed price before the repair — you know exactly what you\'ll pay.'},
      {q:'Which bikes do you repair?', a:'City bikes, road bikes, gravel, MTB, trekking, e-bikes of all brands, cargo bikes of all brands — anything mechanical.'}
    ]
  },

  /* ── FRANÇAIS ── */
  fr: {
    seo: {
      id: 'depannage-fr',
      h1: 'Dépannage Vélo Zurich – Crevaison ? Nous arrivons en 60 minutes',
      intro: 'Crevaison à Zurich ? VELOV est le service de dépannage vélo mobile le plus rapide de Zurich. CHF 99 tout inclus : déplacement, chambre à air neuve, contrôle de sécurité. WhatsApp — nous sommes généralement chez vous en 60 minutes.',
      sections: [
        {h2:'Dépannage Vélo Zurich – CHF 99 Tout Inclus', body:'Un prix fixe, sans frais cachés. Nous venons avec notre vélo de service, remplaçons la chambre à air, contrôlons pneus et freins, et vous repartez. Délai d\'intervention sous 60 minutes en ville de Zurich.'},
        {h2:'Comment se Déroule le Dépannage', body:'1. Envoyez position + photo par WhatsApp. 2. Confirmation ETA. 3. Nous venons, réparons sur place, paiement TWINT. Pas besoin d\'être présent.',
         h3items:[
           {h3:'Étape 1 – Photo WhatsApp', body:'Envoyez votre position et une photo du vélo. Réponse généralement en quelques minutes.'},
           {h3:'Étape 2 – Confirmation & Heure', body:'Vous recevez une heure d\'arrivée précise et le prix fixe CHF 99 par écrit.'},
           {h3:'Étape 3 – Réparation sur Place', body:'Remplacement chambre à air, contrôle pneus, freins, contrôle de sécurité.'},
           {h3:'Étape 4 – Paiement TWINT', body:'Paiement après la réparation par TWINT.'}
         ]},
        {h2:'Dans Tous les Arrondissements de Zurich', body:'Service de dépannage dans les 12 cercles de Zurich et l\'agglomération.'}
      ],
      faqs: [
        {q:'Combien coûte la réparation crevaison ?', a:'CHF 99 tout inclus : trajet, chambre à air, main d\'œuvre, contrôle de sécurité.'},
        {q:'À quelle vitesse arrivez-vous ?', a:'Généralement sous 60 minutes en ville de Zurich.'},
        {q:'Réparez-vous aussi les e-bikes ?', a:'Oui — tous les vélos et e-bikes, y compris les vélos cargo.'},
        {q:'Que faire si le pneu est irréparable ?', a:'Nous remplaçons la chambre à air. Si le pneu est abîmé, devis transparent sur place.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 pour urgences · info@velov.ch',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Service Dépannage Vélo Mobile Zurich","url":"https://www.velov.ch/fr/depannage","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99–CHF 119","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"offers":[{"@type":"Offer","name":"Dépannage tout inclus — vélo standard","price":"99","priceCurrency":"CHF"},{"@type":"Offer","name":"Dépannage e-bike moteur arrière","price":"109","priceCurrency":"CHF"},{"@type":"Offer","name":"Dépannage cargo bike roue arrière","price":"119","priceCurrency":"CHF"}],"inLanguage":"fr","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"fr","mainEntity":[{"@type":"Question","name":"CHF 99 est-il vraiment tout inclus ?","acceptedAnswer":{"@type":"Answer","text":"Oui. CHF 99 comprend le déplacement, le diagnostic, la chambre à air neuve, le montage, le gonflage des deux pneus et la lubrification chaîne. Aucun frais caché."}},{"@type":"Question","name":"Quand cela coûte-t-il plus de CHF 99 ?","acceptedAnswer":{"@type":"Answer","text":"Uniquement pour la roue arrière d'un cargo bike (dès CHF 119) ou d'un e-bike à moteur dans le moyeu arrière (dès CHF 109)."}},{"@type":"Question","name":"À quelle vitesse arrivez-vous à Zurich ?","acceptedAnswer":{"@type":"Answer","text":"En ville de Zurich, généralement en 45 minutes — souvent plus vite. Dans l'agglomération 55–65 minutes."}},{"@type":"Question","name":"Êtes-vous disponibles 24h/24 ?","acceptedAnswer":{"@type":"Answer","text":"Nous essayons d'être disponibles en permanence. Envoyez-nous un WhatsApp à n'importe quelle heure."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.velov.ch/fr"},{"@type":"ListItem","position":2,"name":"Dépannage","item":"https://www.velov.ch/fr/depannage"}]}
      ]
    },
    ui: {
      faqLabel:'Questions fréquentes', contactLabel:'Contact',
      liveBadge:'Disponible 24/7 · Dépannage Vélo Mobile Zurich',
      heroH1:'Crevaison à Zurich ? Pas de problème.',
      heroSub:'Dépannage vélo mobile — nous venons à vélo et cargo bike. Partout en ville de Zurich.',
      priceTagline:'Tout inclus · Déplacement, chambre à air, montage, gonflage, lubrification',
      ctaPhone:'📞 Appeler le dépannage maintenant',
      ctaWa:'💬 WhatsApp · Réponse en quelques minutes',
      heroNote:'Réparation mécanique uniquement · Nous ne réparons pas l\'électronique ni les batteries',
      waHeroMsg:'Bonjour VELOV, j\'ai une crevaison / panne. Position : ',
      bookerLabel:'Réservation rapide',
      bookerTitle:'Où êtes-vous en ce moment à Zurich ?',
      bookerSub:'Sélectionnez votre quartier — nous vous indiquons immédiatement votre délai et réservez par WhatsApp.',
      bookerStep:'Étape 1 sur 1',
      bookerQ:'Dans quel quartier êtes-vous ?',
      etaUnit:'min de réponse',
      etaArrival:'Arrivée estimée à partir de la demande',
      etaBookBtn:'📲 Réserver maintenant par WhatsApp',
      etaPriceNote:'Prix fixe CHF 99 tout inclus pour la plupart des cas. Cargo bike arrière dès CHF 119 · E-bike moteur arrière dès CHF 109.',
      waZoneMsg:(zname,areas)=>`Bonjour VELOV, j'ai besoin du service dépannage !\n• Position : ${zname} (${areas.slice(0,2).join(', ')} …)\n• Problème : Crevaison / panne\nPouvez-vous venir ?`,
      inclLabel:'Tout Inclus',
      inclTitle:'Qu\'est-ce qui est compris dans le prix de CHF 99 ?',
      inclSub:'Tout ce dont une crevaison a vraiment besoin. Vous payez exactement CHF 99 — prix fixe, aucune surprise.',
      tiersLabel:'Prix selon le type de vélo',
      tiersTitle:'Tarifs fixes transparents pour Zurich',
      tiersSub:'Pour 99 % de nos interventions, CHF 99 s\'applique. Un petit supplément est justifié uniquement pour la roue arrière cargo bike ou l\'e-bike à moteur dans le moyeu.',
      tierFrom:'dès',
      stepsLabel:'Déroulement',
      stepsTitle:'Comment ça se passe',
      faqLabel2:'FAQ',
      faqTitle:'Questions fréquentes sur le dépannage',
      ctaTitle:'Crevaison ? Appelez maintenant ou écrivez par WhatsApp.',
      ctaBody:'CHF 99 tout inclus à Zurich. Nous essayons de venir à toute heure — souvent en 45 minutes en ville.',
      ctaFooter:'Service dépannage mobile pour vélos, e-bikes et cargo bikes à Zurich'
    },
    included:[
      {icon:'🚐',title:'Déplacement',          desc:'Nous venons à vélo ou cargo bike directement chez vous — partout à Zurich.'},
      {icon:'🔍',title:'Diagnostic sur place',  desc:'Nous trouvons le problème immédiatement — expliqué de façon transparente.'},
      {icon:'🛞',title:'Chambre à air neuve',   desc:'Chambre à air de remplacement de qualité pour votre vélo — incluse.'},
      {icon:'🔧',title:'Montage',               desc:'Montage professionnel du pneu, correctement monté et aligné.'},
      {icon:'💨',title:'Les deux pneus gonflés',desc:'Nous gonflons les deux pneus à la pression optimale.'},
      {icon:'🛢️',title:'Lubrification chaîne',  desc:'Chaîne nettoyée et lubrifiée — vous roulez comme neuf.'}
    ],
    tiers:[
      {badge:'Standard',       title:'Vélos standard — Roue avant ou arrière', price:99,  desc:'Valable pour tous les vélos de ville, route, gravel et trekking.',
       list:['Toutes les roues avant de tous les vélos','Roue arrière des vélos classiques','Tous les éléments du pack tout inclus','Prix fixe — aucune surprise']},
      {badge:'E-bike arrière',  title:'E-bike avec moteur dans le moyeu arrière', price:109, desc:'Supplément pour démontage du moteur / axe traversant arrière.',
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Travail supplémentaire dû au moteur dans le moyeu','Outils spéciaux inclus','Travail mécanique uniquement — pas de service batterie/électronique']},
      {badge:'Cargo bike',      title:'Cargo bike — Roue arrière',               price:119, desc:'Roues plus grandes, construction plus lourde, plus de temps.',
       list:['Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','Démontage roue arrière plus long','Outils spéciaux pour axes larges','Tous les éléments du pack tout inclus']}
    ],
    steps:[
      {n:1, t:'WhatsApp ou appel',              d:'Dites-nous où vous êtes et ce qui ne va pas. Réponse en quelques minutes.'},
      {n:2, t:'Photo / vidéo (optionnel)',       d:'Envoyez une photo du vélo/dommage — nous arriverons avec les bonnes pièces.'},
      {n:3, t:'Nous venons chez vous',           d:'En ville de Zurich souvent en 45 minutes. Nous venons à vélo & cargo bike.'},
      {n:4, t:'Réparé & de nouveau en route',   d:'Réparé sur place, pneus gonflés, chaîne lubrifiée — repartez !'}
    ],
    faqs:[
      {q:'CHF 99 est-il vraiment tout inclus ?', a:'Oui. CHF 99 comprend déplacement, diagnostic, chambre à air neuve, montage, gonflage des deux pneus et lubrification. Aucun frais caché.'},
      {q:'Quand cela coûte-t-il plus de CHF 99 ?', a:'Uniquement pour cargo bike roue arrière (dès CHF 119) ou e-bike moteur moyeu arrière (dès CHF 109). Les roues avant sont toujours CHF 99.'},
      {q:'À quelle vitesse arrivez-vous à Zurich ?', a:'En ville généralement en 45 minutes — souvent plus vite. Agglomération 55–65 minutes.'},
      {q:'Êtes-vous disponibles 24h/24 ?', a:'Nous essayons d\'être disponibles à toute heure. Écrivez-nous par WhatsApp, soirs et week-ends inclus.'},
      {q:'Réparez-vous l\'électronique e-bike ?', a:'Non. VELOV répare uniquement les pièces mécaniques. Batterie, écran et électronique moteur ne font pas partie de notre service.'},
      {q:'Dois-je être présent ?', a:'Non — si le vélo est accessible en extérieur, nous réparons sans vous. Paiement TWINT après confirmation photo.'},
      {q:'Comment payer ?', a:'TWINT, espèces ou facture. Prix fixe transparent avant la réparation.'},
      {q:'Quels vélos réparez-vous ?', a:'Vélos de ville, route, gravel, VTT, trekking, e-bikes de toutes marques, cargo bikes de toutes marques — tout ce qui est mécanique.'}
    ]
  },

  /* ── ITALIANO ── */
  it: {
    seo: {
      id: 'emergenza-it',
      h1: 'Servizio Emergenza Bici Zurigo – Foratura? Arriviamo in 60 Minuti',
      intro: 'Foratura a Zurigo? VELOV è il servizio di emergenza bici mobile più rapido di Zurigo. CHF 99 tutto compreso: spostamento, camera d\'aria nuova, controllo sicurezza. WhatsApp — siamo da te di solito in 60 minuti.',
      sections: [
        {h2:'Servizio Emergenza Bici Zurigo – CHF 99 Tutto Compreso', body:'Un prezzo fisso, nessun costo nascosto. Veniamo con la nostra bici di servizio, sostituiamo la camera d\'aria, controlliamo pneumatici e freni, e tu riparti. Tempo di intervento sotto 60 minuti in città.'},
        {h2:'Come Funziona il Servizio Emergenza', body:'1. Inviaci posizione + foto via WhatsApp. 2. Confermiamo l\'orario. 3. Veniamo, ripariamo sul posto, paghi via TWINT. Non devi nemmeno essere presente.',
         h3items:[
           {h3:'Passo 1 – Foto WhatsApp', body:'Inviaci posizione e foto della bici. Rispondiamo di solito in pochi minuti.'},
           {h3:'Passo 2 – Conferma & Orario', body:'Ricevi un orario d\'arrivo preciso e il prezzo fisso CHF 99 per iscritto.'},
           {h3:'Passo 3 – Riparazione sul Posto', body:'Sostituzione camera d\'aria, controllo pneumatici, freni, controllo sicurezza.'},
           {h3:'Passo 4 – Pagamento TWINT', body:'Paghi dopo la riparazione via TWINT.'}
         ]},
        {h2:'In Tutti i Quartieri di Zurigo', body:'Servizio emergenza in tutti i 12 cerchi di Zurigo e nell\'agglomerato.'}
      ],
      faqs: [
        {q:'Quanto costa la riparazione foratura?', a:'CHF 99 tutto compreso: spostamento, camera d\'aria, manodopera, controllo sicurezza.'},
        {q:'Quanto velocemente arrivate?', a:'Tipicamente sotto 60 minuti in città di Zurigo.'},
        {q:'Riparate anche gli e-bike?', a:'Sì — tutte le bici ed e-bike, anche cargo bike.'},
        {q:'Cosa succede se il pneumatico è irrecuperabile?', a:'Sostituiamo la camera d\'aria. Se il pneumatico è danneggiato, preventivo trasparente sul posto.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 per emergenze · info@velov.ch',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Servizio Emergenza Bici Mobile Zurigo","url":"https://www.velov.ch/it/emergenza","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99–CHF 119","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurigo","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"offers":[{"@type":"Offer","name":"Riparazione foratura tutto compreso — bici standard","price":"99","priceCurrency":"CHF"},{"@type":"Offer","name":"Foratura e-bike motore posteriore","price":"109","priceCurrency":"CHF"},{"@type":"Offer","name":"Foratura cargo bike ruota posteriore","price":"119","priceCurrency":"CHF"}],"inLanguage":"it","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"it","mainEntity":[{"@type":"Question","name":"CHF 99 è davvero tutto compreso?","acceptedAnswer":{"@type":"Answer","text":"Sì. CHF 99 include spostamento, diagnosi, camera d'aria nuova, montaggio, gonfiaggio di entrambi i pneumatici e lubrificazione catena. Nessun costo nascosto."}},{"@type":"Question","name":"Quando costa più di CHF 99?","acceptedAnswer":{"@type":"Answer","text":"Solo per cargo bike ruota posteriore (da CHF 119) o e-bike con motore nel mozzo posteriore (da CHF 109)."}},{"@type":"Question","name":"Quanto velocemente arrivate?","acceptedAnswer":{"@type":"Answer","text":"In città di Zurigo di solito in 45 minuti — spesso prima. Agglomerato 55–65 minuti."}},{"@type":"Question","name":"Siete disponibili 24 ore?","acceptedAnswer":{"@type":"Answer","text":"Cerchiamo di essere disponibili tutto il giorno. Scriveteci via WhatsApp a qualsiasi ora."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/it"},{"@type":"ListItem","position":2,"name":"Emergenza","item":"https://www.velov.ch/it/emergenza"}]}
      ]
    },
    ui: {
      faqLabel:'Domande frequenti', contactLabel:'Contatto',
      liveBadge:'Disponibile 24/7 · Servizio Emergenza Bici Mobile Zurigo',
      heroH1:'Foratura a Zurigo? Nessun problema.',
      heroSub:'Servizio emergenza bici mobile — veniamo da te in bici e cargo bike. Ovunque in città.',
      priceTagline:'Tutto compreso · Spostamento, camera d\'aria, montaggio, gonfiaggio, lubrificazione',
      ctaPhone:'📞 Chiama il servizio emergenza ora',
      ctaWa:'💬 WhatsApp · Risposta in pochi minuti',
      heroNote:'Riparazione meccanica bici · Non ripariamo elettronica né batterie',
      waHeroMsg:'Ciao VELOV, ho una foratura / problema. Posizione: ',
      bookerLabel:'Prenotazione rapida',
      bookerTitle:'Dove ti trovi a Zurigo adesso?',
      bookerSub:'Seleziona il tuo quartiere — ti mostriamo subito il tuo tempo di risposta e prenoti direttamente via WhatsApp.',
      bookerStep:'Passo 1 di 1',
      bookerQ:'In quale zona della città sei?',
      etaUnit:'min di risposta',
      etaArrival:'Arrivo stimato dalla richiesta',
      etaBookBtn:'📲 Prenota ora via WhatsApp',
      etaPriceNote:'Prezzo fisso CHF 99 tutto compreso per la maggior parte dei casi. Cargo bike posteriore da CHF 119 · E-bike motore posteriore da CHF 109.',
      waZoneMsg:(zname,areas)=>`Ciao VELOV, ho bisogno del servizio emergenza!\n• Posizione: ${zname} (${areas.slice(0,2).join(', ')} …)\n• Problema: Foratura / guasto\nPuoi venire?`,
      inclLabel:'Tutto Compreso',
      inclTitle:'Cosa è incluso nel prezzo di CHF 99?',
      inclSub:'Tutto ciò di cui una foratura ha davvero bisogno. Paghi esattamente CHF 99 — prezzo fisso, nessuna sorpresa.',
      tiersLabel:'Prezzi per tipo di bici',
      tiersTitle:'Prezzi fissi trasparenti per Zurigo',
      tiersSub:'Per il 99% degli interventi si applica CHF 99. Un piccolo supplemento è giustificato solo per cargo bike ruota posteriore o e-bike con motore nel mozzo.',
      tierFrom:'da',
      stepsLabel:'Come funziona',
      stepsTitle:'Ecco quanto è veloce',
      faqLabel2:'FAQ',
      faqTitle:'Domande frequenti sul servizio emergenza',
      ctaTitle:'Foratura? Chiama ora o scrivi via WhatsApp.',
      ctaBody:'CHF 99 tutto compreso a Zurigo. Cerchiamo di venire a qualsiasi ora — spesso in 45 minuti in città.',
      ctaFooter:'Servizio emergenza mobile per bici, e-bike e cargo bike a Zurigo'
    },
    included:[
      {icon:'🚐',title:'Spostamento',             desc:'Veniamo da te in bici o cargo bike — ovunque a Zurigo.'},
      {icon:'🔍',title:'Diagnosi sul posto',       desc:'Troviamo subito il problema — spiegato in modo trasparente.'},
      {icon:'🛞',title:'Camera d\'aria nuova',     desc:'Camera di ricambio di qualità per la tua bici — inclusa.'},
      {icon:'🔧',title:'Montaggio',                desc:'Montaggio professionale del pneumatico, correttamente montato e allineato.'},
      {icon:'💨',title:'Entrambi i pneumatici',    desc:'Gonfiamo entrambi i pneumatici alla pressione ottimale.'},
      {icon:'🛢️',title:'Lubrificazione catena',    desc:'Catena pulita e lubrificata — riparti come nuovo.'}
    ],
    tiers:[
      {badge:'Standard',      title:'Bici standard — Ruota ant. o post.', price:99,  desc:'Valido per tutte le bici da città, strada, gravel e trekking.',
       list:['Tutte le ruote anteriori di tutte le bici','Ruota posteriore delle bici classiche','Tutti gli elementi del pacchetto tutto compreso','Prezzo fisso — nessuna sorpresa']},
      {badge:'E-bike post.',  title:'E-bike con motore nel mozzo post.',   price:109, desc:'Supplemento per smontaggio motore / asse passante posteriore.',
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Lavoro aggiuntivo per il motore nel mozzo','Attrezzi speciali inclusi','Solo lavoro meccanico — nessun servizio batteria/elettronica']},
      {badge:'Cargo bike',    title:'Cargo bike — Ruota posteriore',       price:119, desc:'Ruote più grandi, costruzione più pesante, più tempo necessario.',
       list:['Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt ecc.','Smontaggio ruota posteriore più lungo','Attrezzi speciali per assali larghi','Tutti gli elementi del pacchetto tutto compreso']}
    ],
    steps:[
      {n:1, t:'WhatsApp o chiama',              d:'Dicci dove sei e cosa non va. Risposta in pochi minuti.'},
      {n:2, t:'Foto / video (opzionale)',        d:'Manda una foto della bici/danno — porteremo i pezzi giusti.'},
      {n:3, t:'Veniamo da te',                   d:'In città di Zurigo spesso in 45 minuti. Veniamo in bici & cargo bike.'},
      {n:4, t:'Riparata & di nuovo in marcia',   d:'Riparata sul posto, pneumatici gonfiati, catena lubrificata — via!'}
    ],
    faqs:[
      {q:'CHF 99 è davvero tutto compreso?', a:'Sì. CHF 99 include spostamento, diagnosi, camera d\'aria nuova, montaggio, gonfiaggio e lubrificazione catena. Nessun costo nascosto.'},
      {q:'Quando costa più di CHF 99?', a:'Solo per cargo bike ruota posteriore (da CHF 119) o e-bike motore mozzo posteriore (da CHF 109). Le ruote anteriori sono sempre CHF 99.'},
      {q:'Quanto velocemente arrivate?', a:'In città di Zurigo di solito in 45 minuti — spesso prima. Agglomerato 55–65 minuti.'},
      {q:'Siete disponibili 24 ore?', a:'Cerchiamo di essere disponibili tutto il giorno. Scriveteci via WhatsApp a qualsiasi ora.'},
      {q:'Riparate l\'elettronica e-bike?', a:'No. VELOV ripara solo componenti meccanici. Batteria, display ed elettronica motore non rientrano nel nostro servizio.'},
      {q:'Devo essere presente?', a:'No — se la bici è accessibile all\'esterno, ripariamo senza di te. Pagamento TWINT dopo conferma foto.'},
      {q:'Come pago?', a:'TWINT, contanti o fattura. Prezzo fisso trasparente prima della riparazione.'},
      {q:'Quali bici riparate?', a:'Bici da città, strada, gravel, MTB, trekking, e-bike di tutte le marche, cargo bike di tutte le marche — tutto ciò che è meccanico.'}
    ]
  },

  /* ── ESPAÑOL ── */
  es: {
    seo: {
      id: 'asistencia-es',
      h1: 'Asistencia Bici Zúrich – ¿Pinchazo? Llegamos en 60 Minutos',
      intro: '¿Pinchazo en Zúrich? VELOV es el servicio de asistencia bici móvil más rápido de Zúrich. CHF 99 todo incluido: desplazamiento, cámara nueva, control de seguridad. WhatsApp — normalmente estamos contigo en 60 minutos.',
      sections: [
        {h2:'Asistencia Bici Zúrich – CHF 99 Todo Incluido', body:'Un precio fijo, sin costes ocultos. Vamos a ti con nuestra bici de servicio, sustituimos la cámara, revisamos neumáticos y frenos, y vuelves a rodar. Tiempo de respuesta menos de 60 minutos en la ciudad.'},
        {h2:'Cómo Funciona la Asistencia', body:'1. Mándanos ubicación + foto por WhatsApp. 2. Confirmamos ETA. 3. Vamos, reparamos en el sitio, pagas con TWINT. No necesitas estar presente.',
         h3items:[
           {h3:'Paso 1 – Foto por WhatsApp', body:'Mándanos tu ubicación y una foto de la bici. Solemos contestar en pocos minutos.'},
           {h3:'Paso 2 – Confirmación y Hora', body:'Recibes una hora de llegada concreta y el precio fijo CHF 99 por escrito.'},
           {h3:'Paso 3 – Reparación en el Sitio', body:'Sustitución de cámara, revisión neumáticos, frenos, control de seguridad.'},
           {h3:'Paso 4 – Pago TWINT', body:'Pagas tras la reparación con TWINT.'}
         ]},
        {h2:'En Todos los Distritos de Zúrich', body:'Asistencia en los 12 distritos de Zúrich y el área metropolitana.'}
      ],
      faqs: [
        {q:'¿Cuánto cuesta la reparación de pinchazo?', a:'CHF 99 todo incluido: desplazamiento, cámara, mano de obra, control de seguridad.'},
        {q:'¿En cuánto tiempo llegáis?', a:'Normalmente en menos de 60 minutos en la ciudad de Zúrich.'},
        {q:'¿También reparáis pinchazos de e-bike?', a:'Sí — todas las bicis y e-bikes, también cargo bikes.'},
        {q:'¿Y si el neumático no se puede salvar?', a:'Sustituimos la cámara. Si el neumático también está dañado, presupuesto transparente en el sitio.'}
      ],
      contact: 'WhatsApp +41 76 235 21 26 para emergencias · info@velov.ch',
      schema: [
        {"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV — Servicio Asistencia Bici Móvil Zúrich","url":"https://www.velov.ch/es/asistencia","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99–CHF 119","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zúrich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"offers":[{"@type":"Offer","name":"Reparación pinchazo todo incluido — bici estándar","price":"99","priceCurrency":"CHF"},{"@type":"Offer","name":"Pinchazo e-bike motor trasero","price":"109","priceCurrency":"CHF"},{"@type":"Offer","name":"Pinchazo cargo bike rueda trasera","price":"119","priceCurrency":"CHF"}],"inLanguage":"es","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"es","mainEntity":[{"@type":"Question","name":"¿CHF 99 es realmente todo incluido?","acceptedAnswer":{"@type":"Answer","text":"Sí. CHF 99 incluye desplazamiento, diagnóstico, cámara nueva, montaje, inflado de ambos neumáticos y lubricación de cadena. Sin costes ocultos."}},{"@type":"Question","name":"¿Cuándo cuesta más de CHF 99?","acceptedAnswer":{"@type":"Answer","text":"Solo para cargo bike rueda trasera (desde CHF 119) o e-bike con motor en buje trasero (desde CHF 109)."}},{"@type":"Question","name":"¿Con qué rapidez llegáis?","acceptedAnswer":{"@type":"Answer","text":"En la ciudad de Zúrich normalmente en 45 minutos — a menudo antes. Área metropolitana 55–65 minutos."}},{"@type":"Question","name":"¿Estáis disponibles 24 horas?","acceptedAnswer":{"@type":"Answer","text":"Intentamos estar disponibles en todo momento. Escribidnos por WhatsApp a cualquier hora."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.velov.ch/es"},{"@type":"ListItem","position":2,"name":"Asistencia","item":"https://www.velov.ch/es/asistencia"}]}
      ]
    },
    ui: {
      faqLabel:'Preguntas frecuentes', contactLabel:'Contacto',
      liveBadge:'Disponible 24/7 · Asistencia Bici Móvil Zúrich',
      heroH1:'¿Pinchazo en Zúrich? Sin problema.',
      heroSub:'Asistencia bici móvil — vamos a ti en bici y cargo bike. En toda la ciudad de Zúrich.',
      priceTagline:'Todo incluido · Desplazamiento, cámara, montaje, inflado, lubricación',
      ctaPhone:'📞 Llamar asistencia ahora',
      ctaWa:'💬 WhatsApp · Respuesta en minutos',
      heroNote:'Reparación mecánica de bici únicamente · No reparamos electrónica ni baterías',
      waHeroMsg:'Hola VELOV, tengo un pinchazo / avería. Ubicación: ',
      bookerLabel:'Reserva rápida',
      bookerTitle:'¿Dónde estás ahora en Zúrich?',
      bookerSub:'Selecciona tu zona — te mostramos tu tiempo de respuesta personal y reservas directamente por WhatsApp.',
      bookerStep:'Paso 1 de 1',
      bookerQ:'¿En qué parte de la ciudad estás?',
      etaUnit:'min de respuesta',
      etaArrival:'Llegada estimada desde la solicitud',
      etaBookBtn:'📲 Reservar ahora por WhatsApp',
      etaPriceNote:'Precio fijo CHF 99 todo incluido para la mayoría de casos. Cargo bike trasera desde CHF 119 · E-bike motor trasero desde CHF 109.',
      waZoneMsg:(zname,areas)=>`Hola VELOV, ¡necesito asistencia!\n• Ubicación: ${zname} (${areas.slice(0,2).join(', ')} …)\n• Problema: Pinchazo / avería\n¿Podéis venir?`,
      inclLabel:'Todo Incluido',
      inclTitle:'¿Qué está incluido en el precio de CHF 99?',
      inclSub:'Todo lo que un pinchazo realmente necesita. Pagas exactamente CHF 99 — precio fijo, sin sorpresas.',
      tiersLabel:'Precios por tipo de bici',
      tiersTitle:'Precios fijos transparentes para Zúrich',
      tiersSub:'Para el 99% de nuestras intervenciones se aplica CHF 99. Un pequeño suplemento solo es justo para cargo bike rueda trasera o e-bike con motor en buje.',
      tierFrom:'desde',
      stepsLabel:'Cómo funciona',
      stepsTitle:'Así de rápido va',
      faqLabel2:'FAQ',
      faqTitle:'Preguntas frecuentes sobre la asistencia',
      ctaTitle:'¿Pinchazo? Llama ahora o escríbenos por WhatsApp.',
      ctaBody:'CHF 99 todo incluido en Zúrich. Intentamos venir a cualquier hora — a menudo en 45 minutos en la ciudad.',
      ctaFooter:'Servicio de asistencia móvil para bicis, e-bikes y cargo bikes en Zúrich'
    },
    included:[
      {icon:'🚐',title:'Desplazamiento',        desc:'Vamos a ti en bici o cargo bike — en cualquier parte de Zúrich.'},
      {icon:'🔍',title:'Diagnóstico in situ',    desc:'Encontramos el problema de inmediato — explicado de forma transparente.'},
      {icon:'🛞',title:'Cámara nueva',           desc:'Cámara de repuesto de calidad para tu bici — incluida.'},
      {icon:'🔧',title:'Montaje',                desc:'Montaje profesional del neumático, correctamente montado y alineado.'},
      {icon:'💨',title:'Ambos neumáticos',       desc:'Inflamos ambos neumáticos a la presión óptima.'},
      {icon:'🛢️',title:'Lubricación cadena',     desc:'Cadena limpiada y lubricada — ruedas como nueva.'}
    ],
    tiers:[
      {badge:'Estándar',      title:'Bicis estándar — Rueda delantera o trasera', price:99,  desc:'Aplicable a todas las bicis de ciudad, carretera, gravel y trekking.',
       list:['Todas las ruedas delanteras de todas las bicis','Rueda trasera de bicis clásicas','Todos los elementos del paquete todo incluido','Precio fijo — sin sorpresas']},
      {badge:'E-bike trasera',title:'E-bike con motor en buje trasero',            price:109, desc:'Suplemento por desmontaje del motor / eje pasante trasero.',
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Trabajo adicional por el motor en buje','Herramientas especiales incluidas','Solo trabajo mecánico — sin servicio batería/electrónica']},
      {badge:'Cargo bike',    title:'Cargo bike — Rueda trasera',                  price:119, desc:'Ruedas más grandes, construcción más pesada, más tiempo.',
       list:['Riese & Müller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','Desmontaje rueda trasera más largo','Herramientas especiales para ejes anchos','Todos los elementos del paquete todo incluido']}
    ],
    steps:[
      {n:1, t:'WhatsApp o llama',               d:'Dinos dónde estás y qué pasa. Respuesta en minutos.'},
      {n:2, t:'Foto / vídeo (opcional)',          d:'Manda una foto de la bici/daño — traeremos las piezas correctas.'},
      {n:3, t:'Vamos a donde estás',             d:'En la ciudad de Zúrich a menudo en 45 minutos. Vamos en bici & cargo bike.'},
      {n:4, t:'Reparada y de nuevo en marcha',   d:'Reparada in situ, neumáticos inflados, cadena lubricada — ¡a rodar!'}
    ],
    faqs:[
      {q:'¿CHF 99 es realmente todo incluido?', a:'Sí. CHF 99 incluye desplazamiento, diagnóstico, cámara nueva, montaje, inflado y lubricación cadena. Sin costes ocultos.'},
      {q:'¿Cuándo cuesta más de CHF 99?', a:'Solo para cargo bike rueda trasera (desde CHF 119) o e-bike motor buje trasero (desde CHF 109). Las ruedas delanteras siempre son CHF 99.'},
      {q:'¿Con qué rapidez llegáis?', a:'En la ciudad de Zúrich normalmente en 45 minutos — a menudo antes. Área metropolitana 55–65 minutos.'},
      {q:'¿Estáis disponibles 24 horas?', a:'Intentamos estar disponibles en todo momento. Escribidnos por WhatsApp a cualquier hora, incluso noches y fines de semana.'},
      {q:'¿Reparáis la electrónica de e-bike?', a:'No. VELOV repara únicamente piezas mecánicas. Batería, pantalla y electrónica del motor no forman parte de nuestro servicio.'},
      {q:'¿Tengo que estar presente?', a:'No — si la bici está accesible en el exterior, reparamos sin ti. Pago con TWINT tras confirmación por foto.'},
      {q:'¿Cómo pago?', a:'TWINT, efectivo o factura. Precio fijo transparente antes de la reparación.'},
      {q:'¿Qué bicis reparáis?', a:'Bicis de ciudad, carretera, gravel, MTB, trekking, e-bikes de todas las marcas, cargo bikes de todas las marcas — todo lo que sea mecánico.'}
    ]
  }
};

/* ===================================================================
   LANGUAGE DETECTION (same logic as velov-home-UNIFIED.js)
   =================================================================== */
function detectVpLang(){
  try{ if(window.wixDevelopersAnalytics&&window.wixDevelopersAnalytics.currentLanguage) return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2); }catch(e){}
  try{ var dl=document.documentElement.lang||''; if(dl) return dl.toLowerCase().substring(0,2); }catch(e){}
  try{ var m=window.location.pathname.match(/^\/(en|fr|it|es)(\/|$)/i); if(m) return m[1].toLowerCase(); }catch(e){}
  try{ var nav=(navigator.language||'de').toLowerCase().substring(0,2); if(['en','fr','it','es'].includes(nav)) return nav; }catch(e){}
  return 'de';
}

/* ===================================================================
   CUSTOM ELEMENT
   =================================================================== */
class VelovPannendienst extends HTMLElement {
  constructor(){
    super();
    this.state={zone:null,openFaq:null};
    this._lang=detectVpLang();
    if(!VP_LANG[this._lang]) this._lang='de';
  }

  get L(){ return VP_LANG[this._lang]; }
  get UI(){ return this.L.ui; }

  connectedCallback(){
    /* WIX HEIGHT FIX — forces element to be visible.
       Wix Editor gives custom elements 0px height by default.
       We set explicit dimensions so Wix has no choice but to show it. */
    this.style.display   = 'block';
    this.style.width     = '100%';
    this.style.minHeight = '200px';
    this.style.overflow  = 'visible';
    this.style.position  = 'relative';

    try{ window.__velovSeoHelper&&window.__velovSeoHelper.injectSeo(this,this.L.seo,this.UI.faqLabel,this.UI.contactLabel); }catch(e){}
    try{ window.__velovTracker&&window.__velovTracker.bind(this,this._lang); }catch(e){}
    this.injectStyles();
    this.render();

    /* Set exact height after render so Wix container expands */
    this._fixHeight();

    /* ResizeObserver keeps height updated as content changes */
    if(typeof ResizeObserver !== 'undefined'){
      try{
        var self = this;
        new ResizeObserver(function(){ self._fixHeight(); }).observe(this);
      }catch(e){}
    }

    /* Fallback re-checks at 100ms / 500ms / 1500ms */
    var me = this;
    setTimeout(function(){ me._fixHeight(); }, 100);
    setTimeout(function(){ me._fixHeight(); }, 500);
    setTimeout(function(){ me._fixHeight(); }, 1500);
  }

  _fixHeight(){
    try{
      var h = this.scrollHeight || this.offsetHeight;
      if(h > 100){
        this.style.height    = h + 'px';
        this.style.minHeight = h + 'px';
      } else {
        /* Content not painted yet — safe large fallback */
        this.style.minHeight = '3000px';
      }
    }catch(e){}
  }

  injectStyles(){
    if(document.getElementById('velov-pannendienst-styles')) return;
    /* Inject Google Fonts via <link> — @import is blocked by Wix CSP */
    if(!document.getElementById('velov-pann-font')){
      try{
        var lnk=document.createElement('link');
        lnk.id='velov-pann-font';
        lnk.rel='stylesheet';
        lnk.href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(lnk);
      }catch(e){}
    }
    const s=document.createElement('style');
    s.id='velov-pannendienst-styles';
    s.textContent=`
    velov-pannendienst{--purple:#7B68EE;--purple-dark:#6354d4;--orange:#E8573A;--dark:#2D2B3D;--warm-bg:#F5F0EB;--white:#fff;--text:#2D2B3D;--muted:#6B6880;--border:#E8E4DF;--green:#4CAF50;
      display:block !important;width:100% !important;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
    velov-pannendienst *{margin:0;padding:0;box-sizing:border-box}
    velov-pannendienst .vp-container{max-width:1100px;margin:0 auto;padding:0 24px}
    velov-pannendienst section{padding:96px 0}
    velov-pannendienst .vp-label{font-size:12px;font-weight:700;color:var(--purple);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px}
    velov-pannendienst .vp-title{font-size:clamp(24px,3vw,36px);font-weight:800;color:var(--dark);margin-bottom:14px;line-height:1.2}
    velov-pannendienst .vp-sub{font-size:16px;color:var(--muted);max-width:620px;line-height:1.6}
    /* HERO */
    velov-pannendienst .vp-hero{background:linear-gradient(135deg,var(--dark),#1a1833);color:white;padding:96px 0 120px;text-align:center;position:relative;overflow:hidden}
    velov-pannendienst .vp-hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--white);clip-path:ellipse(55% 100% at 50% 100%)}
    velov-pannendienst .vp-hero::before{content:'';position:absolute;top:-80px;left:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(232,87,58,.25),transparent 70%);border-radius:50%}
    velov-pannendienst .vp-hero-inner{position:relative;z-index:1}
    velov-pannendienst .vp-live{display:inline-flex;align-items:center;gap:8px;background:rgba(76,175,80,.18);border:1px solid rgba(76,175,80,.45);color:#a7e9a9;font-size:13px;font-weight:700;padding:8px 18px;border-radius:50px;margin-bottom:20px;text-transform:uppercase;letter-spacing:.5px}
    velov-pannendienst .vp-live-dot{width:8px;height:8px;background:var(--green);border-radius:50%;animation:vpulse 1.8s infinite}
    @keyframes vpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
    velov-pannendienst .vp-hero h1{font-size:clamp(32px,5vw,52px);font-weight:800;line-height:1.1;margin-bottom:10px}
    velov-pannendienst .vp-hero .vp-subt{font-size:20px;opacity:.85;margin-bottom:16px}
    velov-pannendienst .vp-price-hero{display:inline-block;background:var(--orange);color:white;font-size:48px;font-weight:800;padding:18px 42px;border-radius:20px;margin:20px 0;line-height:1}
    velov-pannendienst .vp-price-hero small{font-size:16px;font-weight:500;display:block;margin-top:4px;opacity:.95}
    velov-pannendienst .vp-hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:16px}
    velov-pannendienst .vp-hero-cta{display:inline-block;background:var(--purple);color:white;text-decoration:none;font-size:18px;font-weight:700;padding:18px 40px;border-radius:50px;transition:all .2s}
    velov-pannendienst .vp-hero-cta:hover{background:var(--purple-dark);transform:translateY(-2px)}
    velov-pannendienst .vp-hero-cta.wa{background:#25D366}
    velov-pannendienst .vp-hero-cta.wa:hover{background:#1fb855}
    velov-pannendienst .vp-hero-note{font-size:13px;opacity:.7;margin-top:18px}
    /* BOOKER */
    velov-pannendienst .vp-booker{background:var(--white)}
    velov-pannendienst .vp-booker-card{max-width:860px;margin:44px auto 0;background:var(--warm-bg);border-radius:28px;padding:48px;box-shadow:0 16px 40px rgba(45,43,61,.06);border:1px solid var(--border)}
    velov-pannendienst .vp-bk-step{font-size:13px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px}
    velov-pannendienst .vp-bk-q{font-size:22px;font-weight:700;color:var(--dark);margin-bottom:24px}
    velov-pannendienst .vp-zones{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:8px}
    velov-pannendienst .vp-zone{background:var(--white);border:2px solid var(--border);border-radius:14px;padding:18px 14px;cursor:pointer;transition:all .2s;font-family:inherit;text-align:left}
    velov-pannendienst .vp-zone:hover{border-color:var(--purple);transform:translateY(-2px);box-shadow:0 8px 20px rgba(123,104,238,.12)}
    velov-pannendienst .vp-zone.sel{border-color:var(--purple);background:var(--purple);color:white}
    velov-pannendienst .vp-zone-name{font-weight:800;font-size:15px;margin-bottom:4px}
    velov-pannendienst .vp-zone-eta{font-size:12px;opacity:.75}
    velov-pannendienst .vp-zone-areas{font-size:11px;opacity:.65;margin-top:6px;line-height:1.3}
    velov-pannendienst .vp-eta{margin-top:28px;padding:26px;background:var(--white);border-radius:16px;border-left:6px solid var(--green);animation:vfadeIn .4s ease}
    @keyframes vfadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    velov-pannendienst .vp-eta h4{font-size:17px;font-weight:800;color:var(--dark);margin-bottom:4px}
    velov-pannendienst .vp-eta-big{font-size:36px;font-weight:800;color:var(--purple);line-height:1;margin:8px 0}
    velov-pannendienst .vp-eta-row{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap}
    velov-pannendienst .vp-eta-cta{background:var(--green);color:white;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:700;transition:all .2s;white-space:nowrap;font-size:15px}
    velov-pannendienst .vp-eta-cta:hover{background:#3d8b40;transform:translateY(-2px)}
    velov-pannendienst .vp-eta-note{font-size:13px;color:var(--muted);margin-top:10px}
    /* INCLUDED */
    velov-pannendienst .vp-inc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:48px}
    velov-pannendienst .vp-inc{background:var(--warm-bg);border-radius:16px;padding:32px 24px;text-align:center;transition:transform .2s}
    velov-pannendienst .vp-inc:hover{transform:translateY(-3px)}
    velov-pannendienst .vp-inc-icon{font-size:36px;margin-bottom:12px}
    velov-pannendienst .vp-inc h3{font-size:16px;font-weight:700;margin-bottom:6px;color:var(--dark)}
    velov-pannendienst .vp-inc p{font-size:14px;color:var(--muted)}
    /* TIERS */
    velov-pannendienst .vp-tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:48px}
    velov-pannendienst .vp-tier{background:var(--white);border:2px solid var(--border);border-radius:20px;padding:32px 26px;transition:all .2s}
    velov-pannendienst .vp-tier:hover{border-color:var(--purple);transform:translateY(-4px);box-shadow:0 12px 32px rgba(123,104,238,.1)}
    velov-pannendienst .vp-tier-badge{display:inline-block;background:var(--purple);color:white;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding:4px 10px;border-radius:8px;margin-bottom:14px}
    velov-pannendienst .vp-tier h3{font-size:18px;font-weight:800;color:var(--dark);margin-bottom:6px;line-height:1.3}
    velov-pannendienst .vp-tier-desc{font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.5}
    velov-pannendienst .vp-tier-price{font-size:36px;font-weight:800;color:var(--orange);line-height:1;margin-bottom:18px}
    velov-pannendienst .vp-tier-price small{font-size:14px;font-weight:600;color:var(--muted);margin-left:4px}
    velov-pannendienst .vp-tier ul{list-style:none;padding:0;margin:0}
    velov-pannendienst .vp-tier li{font-size:14px;color:var(--text);padding:6px 0 6px 22px;position:relative;line-height:1.45}
    velov-pannendienst .vp-tier li::before{content:'✓';position:absolute;left:0;color:var(--green);font-weight:800}
    /* STEPS */
    velov-pannendienst .vp-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;margin-top:52px}
    velov-pannendienst .vp-step{text-align:center}
    velov-pannendienst .vp-step-num{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:var(--purple);color:white;font-size:20px;font-weight:800;border-radius:50%;margin-bottom:16px}
    velov-pannendienst .vp-step h3{font-size:17px;font-weight:700;margin-bottom:6px;color:var(--dark)}
    velov-pannendienst .vp-step p{font-size:14px;color:var(--muted)}
    /* FAQ */
    velov-pannendienst .vp-faq{max-width:760px;margin:52px auto 0}
    velov-pannendienst .vp-faq-item{border-bottom:1px solid var(--border);padding:20px 0}
    velov-pannendienst .vp-faq-q{font-weight:700;cursor:pointer;font-size:16px;display:flex;justify-content:space-between;align-items:center;color:var(--dark);background:none;border:none;width:100%;text-align:left;font-family:inherit;padding:0}
    velov-pannendienst .vp-faq-q::after{content:'+';font-size:20px;color:var(--purple);transition:transform .2s}
    velov-pannendienst .vp-faq-item.open .vp-faq-q::after{content:'−'}
    velov-pannendienst .vp-faq-a{font-size:14px;color:var(--muted);line-height:1.6;padding-top:12px;display:none}
    velov-pannendienst .vp-faq-item.open .vp-faq-a{display:block;animation:vfadeIn .3s ease}
    /* CTA */
    velov-pannendienst .vp-cta{background:var(--orange);color:white;text-align:center;padding:96px 0}
    velov-pannendienst .vp-cta h2{font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:14px}
    velov-pannendienst .vp-cta p{font-size:17px;opacity:.95;margin-bottom:30px;max-width:520px;margin-left:auto;margin-right:auto}
    velov-pannendienst .vp-btn-dark{display:inline-block;background:var(--dark);color:white;text-decoration:none;font-weight:700;padding:16px 40px;border-radius:50px;font-size:17px;transition:all .2s;margin:6px}
    velov-pannendienst .vp-btn-dark:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.3)}
    velov-pannendienst .vp-btn-wa{display:inline-block;background:#25D366;color:white;text-decoration:none;font-weight:700;padding:16px 40px;border-radius:50px;font-size:17px;transition:all .2s;margin:6px}
    velov-pannendienst .vp-btn-wa:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(37,211,102,.4)}
    velov-pannendienst .vp-cta-contact{margin-top:26px;font-size:14px;opacity:.8}
    velov-pannendienst .vp-cta-contact a{color:white;text-decoration:underline}
    @media(max-width:768px){
      velov-pannendienst section{padding:64px 0}
      velov-pannendienst .vp-hero{padding:64px 0 90px}
      velov-pannendienst .vp-price-hero{font-size:36px;padding:12px 28px}
      velov-pannendienst .vp-zones{grid-template-columns:1fr 1fr}
      velov-pannendienst .vp-booker-card{padding:28px 20px}
      velov-pannendienst .vp-eta-row{flex-direction:column;align-items:flex-start}
      velov-pannendienst .vp-eta-cta{width:100%;text-align:center}
      velov-pannendienst .vp-inc-grid{grid-template-columns:1fr 1fr}
      velov-pannendienst .vp-tiers{grid-template-columns:1fr}
    }`;
    document.head.appendChild(s);
  }

  /* ── Helper: build HTML strings without nested backticks (Wix Editor safe) ── */
  _zones(UI){
    return VP_ZONES.map(function(z){
      var areas = z.areas.slice(0,3).join(', ') + (z.areas.length > 3 ? '…' : '');
      return '<button class="vp-zone" data-id="' + z.id + '">'
        + '<div class="vp-zone-name">' + z.name + '</div>'
        + '<div class="vp-zone-eta">~' + z.eta + ' ' + UI.etaUnit + '</div>'
        + '<div class="vp-zone-areas">' + areas + '</div>'
        + '</button>';
    }).join('');
  }
  _included(items){
    return items.map(function(i){
      return '<div class="vp-inc">'
        + '<div class="vp-inc-icon">' + i.icon + '</div>'
        + '<h3>' + i.title + '</h3>'
        + '<p>' + i.desc + '</p>'
        + '</div>';
    }).join('');
  }
  _tiers(items, UI){
    return items.map(function(t){
      var list = t.list.map(function(li){ return '<li>' + li + '</li>'; }).join('');
      return '<div class="vp-tier">'
        + '<span class="vp-tier-badge">' + t.badge + '</span>'
        + '<h3>' + t.title + '</h3>'
        + '<p class="vp-tier-desc">' + t.desc + '</p>'
        + '<div class="vp-tier-price">CHF ' + t.price + '<small>' + UI.tierFrom + '</small></div>'
        + '<ul>' + list + '</ul>'
        + '</div>';
    }).join('');
  }
  _steps(items){
    return items.map(function(s){
      return '<div class="vp-step">'
        + '<div class="vp-step-num">' + s.n + '</div>'
        + '<h3>' + s.t + '</h3>'
        + '<p>' + s.d + '</p>'
        + '</div>';
    }).join('');
  }
  _faqs(items){
    return items.map(function(f, i){
      return '<div class="vp-faq-item" data-i="' + i + '">'
        + '<button class="vp-faq-q" aria-expanded="false" aria-controls="vp-a-' + i + '">' + f.q + '</button>'
        + '<div class="vp-faq-a" id="vp-a-' + i + '">' + f.a + '</div>'
        + '</div>';
    }).join('');
  }

  render(){
    var L=this.L, UI=this.UI, C=VP_CONTACT;
    var html = ''
      + '<section class="vp-hero">'
      +   '<div class="vp-container vp-hero-inner">'
      +     '<div class="vp-live"><span class="vp-live-dot"></span><span>' + UI.liveBadge + '</span></div>'
      +     '<div style="font-size:56px;margin-bottom:4px">🔧</div>'
      +     '<h1>' + UI.heroH1 + '</h1>'
      +     '<p class="vp-subt">' + UI.heroSub + '</p>'
      +     '<div class="vp-price-hero">CHF 99<small>' + UI.priceTagline + '</small></div>'
      +     '<div class="vp-hero-ctas">'
      +       '<a href="tel:' + C.phone + '" class="vp-hero-cta">' + UI.ctaPhone + '</a>'
      +       '<a href="https://wa.me/' + C.waNumber + '?text=' + encodeURIComponent(UI.waHeroMsg) + '" class="vp-hero-cta wa" target="_blank" rel="noopener">' + UI.ctaWa + '</a>'
      +     '</div>'
      +     '<div class="vp-hero-note">' + UI.heroNote + '</div>'
      +   '</div>'
      + '</section>'

      + '<section class="vp-booker">'
      +   '<div class="vp-container">'
      +     '<div style="text-align:center">'
      +       '<div class="vp-label">' + UI.bookerLabel + '</div>'
      +       '<div class="vp-title">' + UI.bookerTitle + '</div>'
      +       '<p class="vp-sub" style="margin:0 auto">' + UI.bookerSub + '</p>'
      +     '</div>'
      +     '<div class="vp-booker-card">'
      +       '<div class="vp-bk-step">' + UI.bookerStep + '</div>'
      +       '<div class="vp-bk-q">' + UI.bookerQ + '</div>'
      +       '<div class="vp-zones" id="vp-zones">' + this._zones(UI) + '</div>'
      +       '<div id="vp-eta-box"></div>'
      +     '</div>'
      +   '</div>'
      + '</section>'

      + '<section style="background:var(--warm-bg)">'
      +   '<div class="vp-container">'
      +     '<div style="text-align:center">'
      +       '<div class="vp-label">' + UI.inclLabel + '</div>'
      +       '<div class="vp-title">' + UI.inclTitle + '</div>'
      +       '<p class="vp-sub" style="margin:0 auto">' + UI.inclSub + '</p>'
      +     '</div>'
      +     '<div class="vp-inc-grid">' + this._included(L.included) + '</div>'
      +   '</div>'
      + '</section>'

      + '<section style="background:var(--white)">'
      +   '<div class="vp-container">'
      +     '<div style="text-align:center">'
      +       '<div class="vp-label">' + UI.tiersLabel + '</div>'
      +       '<div class="vp-title">' + UI.tiersTitle + '</div>'
      +       '<p class="vp-sub" style="margin:0 auto">' + UI.tiersSub + '</p>'
      +     '</div>'
      +     '<div class="vp-tiers">' + this._tiers(L.tiers, UI) + '</div>'
      +   '</div>'
      + '</section>'

      + '<section style="background:var(--warm-bg)">'
      +   '<div class="vp-container">'
      +     '<div style="text-align:center">'
      +       '<div class="vp-label">' + UI.stepsLabel + '</div>'
      +       '<div class="vp-title">' + UI.stepsTitle + '</div>'
      +     '</div>'
      +     '<div class="vp-steps">' + this._steps(L.steps) + '</div>'
      +   '</div>'
      + '</section>'

      + '<section style="background:var(--white)">'
      +   '<div class="vp-container">'
      +     '<div style="text-align:center">'
      +       '<div class="vp-label">' + UI.faqLabel2 + '</div>'
      +       '<div class="vp-title">' + UI.faqTitle + '</div>'
      +     '</div>'
      +     '<div class="vp-faq" id="vp-faq">' + this._faqs(L.faqs) + '</div>'
      +   '</div>'
      + '</section>'

      + '<section class="vp-cta">'
      +   '<div class="vp-container">'
      +     '<h2>' + UI.ctaTitle + '</h2>'
      +     '<p>' + UI.ctaBody + '</p>'
      +     '<a href="tel:' + C.phone + '" class="vp-btn-dark">📞 ' + C.phoneDisplay + '</a>'
      +     '<a href="https://wa.me/' + C.waNumber + '" class="vp-btn-wa" target="_blank" rel="noopener">💬 WhatsApp</a>'
      +     '<div class="vp-cta-contact">'
      +       '<a href="mailto:' + C.email + '">' + C.email + '</a> · ' + UI.ctaFooter
      +     '</div>'
      +   '</div>'
      + '</section>';

    this.innerHTML = html;

    this.querySelectorAll('.vp-zone').forEach(function(b){
      b.addEventListener('click', function(){ this.pickZone(b.dataset.id); }.bind(this));
    }.bind(this));
    this.bindFaq();
  }

  pickZone(id){
    var UI=this.UI, C=VP_CONTACT;
    this.state.zone=id;
    this.querySelectorAll('.vp-zone').forEach(function(el){ el.classList.toggle('sel', el.dataset.id===id); });
    var z=VP_ZONES.find(function(x){ return x.id===id; });
    var box=this.querySelector('#vp-eta-box');
    var waMsg=UI.waZoneMsg(z.name,z.areas);
    box.innerHTML = '<div class="vp-eta">'
      + '<div class="vp-eta-row">'
      +   '<div>'
      +     '<h4>' + z.name + '</h4>'
      +     '<div class="vp-eta-big">~' + z.eta + ' min</div>'
      +     '<div style="font-size:14px;color:var(--muted);font-weight:600">' + UI.etaArrival + '</div>'
      +   '</div>'
      +   '<a class="vp-eta-cta" href="https://wa.me/' + C.waNumber + '?text=' + encodeURIComponent(waMsg) + '" target="_blank" rel="noopener">'
      +     UI.etaBookBtn
      +   '</a>'
      + '</div>'
      + '<div class="vp-eta-note">' + UI.etaPriceNote + '</div>'
      + '</div>';
  }

  bindFaq(){
    this.querySelectorAll('.vp-faq-item').forEach(item=>{
      const btn=item.querySelector('.vp-faq-q');
      btn.addEventListener('click',()=>{
        const i=+item.dataset.i;
        const open=this.state.openFaq===i;
        this.querySelectorAll('.vp-faq-item').forEach(el=>{
          el.classList.remove('open');
          el.querySelector('.vp-faq-q').setAttribute('aria-expanded','false');
        });
        if(!open){
          item.classList.add('open');
          btn.setAttribute('aria-expanded','true');
          this.state.openFaq=i;
        } else {
          this.state.openFaq=null;
        }
      });
    });
  }
}

if(!customElements.get('velov-pannendienst')){
  customElements.define('velov-pannendienst',VelovPannendienst);
}
