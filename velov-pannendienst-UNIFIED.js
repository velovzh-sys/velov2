{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /* ===================================================================\
   VELOV \'97 UNIFIED Multilingual Pannendienst Custom Element\
   Languages: de (primary) \'b7 en \'b7 fr \'b7 it \'b7 es\
   Tag: <velov-pannendienst>\
\
   IMPROVEMENTS over original files:\
   \uc0\u9989  All 5 languages fully translated (UI, steps, included, tiers, FAQs)\
   \uc0\u9989  WhatsApp messages in correct language per visitor\
   \uc0\u9989  Zone ETA box text in correct language\
   \uc0\u9989  Richer FAQPage schema (8 Q&As per language vs 3 in original)\
   \uc0\u9989  EmergencyService + LocalBusiness + AutoRepair schema per language\
   \uc0\u9989  Breadcrumb schema with localised page names\
   \uc0\u9989  hreflang-aware schema urls per language\
   \uc0\u9989  Same language detection logic as velov-home-UNIFIED.js\
   =================================================================== */\
\
/* ===== VELOV Shared SEO Helper ===== */\
(function()\{\
  if (window.__velovSeoHelper) return;\
  function safe(s)\{return String(s==null?'':s).replace(/[\\u0000-\\u001F]/g,' ');\}\
  function buildMirror(s,faqLabel,contactLabel)\{\
    var h='<article itemscope itemtype="https://schema.org/Article">';\
    h+='<header><h1>'+safe(s.h1)+'</h1>';\
    if(s.intro) h+='<p>'+safe(s.intro)+'</p>';\
    h+='</header>';\
    (s.sections||[]).forEach(function(sec)\{\
      h+='<section>';\
      if(sec.h2) h+='<h2>'+safe(sec.h2)+'</h2>';\
      if(sec.body) h+='<p>'+safe(sec.body)+'</p>';\
      if(Array.isArray(sec.h3items)) sec.h3items.forEach(function(it)\{\
        h+='<h3>'+safe(it.h3)+'</h3>';\
        if(it.body) h+='<p>'+safe(it.body)+'</p>';\
      \});\
      h+='</section>';\
    \});\
    if(Array.isArray(s.faqs)&&s.faqs.length)\{\
      h+='<section><h2>'+(faqLabel||'FAQ')+'</h2>';\
      s.faqs.forEach(function(f)\{h+='<h3>'+safe(f.q)+'</h3><p>'+safe(f.a)+'</p>';\});\
      h+='</section>';\
    \}\
    if(s.contact) h+='<section><h2>'+(contactLabel||'Contact')+'</h2><p>'+safe(s.contact)+'</p></section>';\
    h+='</article>';\
    return h;\
  \}\
  function injectSeo(host,cfg,faqLabel,contactLabel)\{\
    if(!host||!cfg) return;\
    function appendMirror()\{\
      if(host.querySelector('[data-velov-seo]')) return;\
      var m=document.createElement('div');\
      m.setAttribute('data-velov-seo','');\
      m.setAttribute('aria-hidden','true');\
      m.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:normal;border:0';\
      m.innerHTML=buildMirror(cfg,faqLabel,contactLabel);\
      host.appendChild(m);\
    \}\
    setTimeout(appendMirror,0);\
    setTimeout(appendMirror,100);\
    if(typeof requestAnimationFrame==='function') requestAnimationFrame(function()\{requestAnimationFrame(appendMirror);\});\
    if(Array.isArray(cfg.schema)&&cfg.schema.length)\{\
      var id='velov-schema-'+(cfg.id||host.tagName.toLowerCase());\
      var ex=document.getElementById(id); if(ex) ex.remove();\
      var sc=document.createElement('script');\
      sc.id=id; sc.type='application/ld+json';\
      try\{sc.textContent=JSON.stringify(cfg.schema);\}catch(e)\{return;\}\
      document.head.appendChild(sc);\
    \}\
  \}\
  window.__velovSeoHelper=\{injectSeo:injectSeo,buildMirror:buildMirror\};\
\})();\
\
/* ===== VELOV Tracker ===== */\
(function()\{\
  if(window.__velovTracker) return;\
  function pushEvent(name,params)\{\
    try\{\
      window.dataLayer=window.dataLayer||[];\
      window.dataLayer.push(Object.assign(\{event:name\},params||\{\}));\
      if(typeof window.gtag==='function') window.gtag('event',name,params||\{\});\
    \}catch(e)\{\}\
  \}\
  function pageContext(host,lang)\{\
    return\{page_component:(host&&host.tagName)?host.tagName.toLowerCase():'unknown',\
      page_path:(typeof location!=='undefined')?location.pathname:'',language:lang||'de'\};\
  \}\
  function bind(host,lang)\{\
    if(!host||host.__velovBound) return;\
    host.__velovBound=true;\
    host.addEventListener('click',function(e)\{\
      var a=e.target.closest&&e.target.closest('a');\
      if(!a) return;\
      var href=a.getAttribute('href')||'';\
      var ctx=pageContext(host,lang);\
      var label=(a.textContent||'').replace(/\\s+/g,' ').trim().slice(0,60);\
      if(/^https?:\\/\\/(?:wa\\.me|api\\.whatsapp\\.com)/i.test(href)||/whatsapp/i.test(href))\{\
        pushEvent('whatsapp_click',Object.assign(\{link_url:href,link_text:label\},ctx));\
      \}else if(/^tel:/i.test(href))\{\
        pushEvent('phone_click',Object.assign(\{link_url:href,link_text:label\},ctx));\
      \}else if(/^mailto:/i.test(href))\{\
        pushEvent('email_click',Object.assign(\{link_url:href,link_text:label\},ctx));\
      \}\
    \},\{passive:true,capture:true\});\
  \}\
  window.__velovTracker=\{bind:bind,pushEvent:pushEvent\};\
\})();\
\
/* ===================================================================\
   SHARED CONSTANTS\
   =================================================================== */\
const VP_CONTACT = \{\
  phone: '+41762352126',\
  phoneDisplay: '+41 76 235 21 26',\
  waNumber: '41762352126',\
  email: 'info@velov.ch'\
\};\
\
/* Zones \'97 names stay in local German (neighbourhoods) */\
const VP_ZONES = [\
  \{ id:'zentrum', name:'Z\'fcrich Zentrum', areas:['Altstadt','Niederdorf','Seefeld','Enge','Wiedikon'], eta:35 \},\
  \{ id:'west',    name:'Z\'fcrich West',    areas:['Kreis 4','Kreis 5','Aussersihl','Albisrieden','Altstetten'], eta:45 \},\
  \{ id:'nord',    name:'Z\'fcrich Nord',    areas:['Oerlikon','Seebach','Affoltern','Schwamendingen','Wipkingen'], eta:45 \},\
  \{ id:'ost',     name:'Z\'fcrich Ost',     areas:['Z\'fcrichberg','Hottingen','Fluntern','Witikon','Hirslanden'], eta:45 \},\
  \{ id:'sued',    name:'Z\'fcrich S\'fcd',     areas:['Leimbach','Wollishofen','Adliswil','Kilchberg'], eta:55 \},\
  \{ id:'umland',  name:'Z\'fcrcher Umland', areas:['D\'fcbendorf','Opfikon','Glattbrugg','Zollikon','K\'fcsnacht'], eta:65 \}\
];\
\
/* ===================================================================\
   MULTILINGUAL CONTENT\
   =================================================================== */\
const VP_LANG = \{\
\
  /* \uc0\u9472 \u9472  DEUTSCH \u9472 \u9472  */\
  de: \{\
    seo: \{\
      id: 'pannendienst-de',\
      h1: 'Velo Pannendienst Z\'fcrich \'96 Plattfuss-Notfall? Wir kommen in 60 Minuten',\
      intro: 'Plattfuss in Z\'fcrich? VELOV ist Z\'fcrichs schnellster mobiler Pannendienst. CHF 99 all-inclusive: Anfahrt, neuer Schlauch, Sicherheitscheck. WhatsApp uns \'96 wir sind in der Regel in 60 Minuten bei dir.',\
      sections: [\
        \{ h2:'Velo Pannendienst Z\'fcrich \'96 CHF 99 all-inclusive', body:'Ein Festpreis, keine versteckten Kosten. Wir kommen mit dem Service-Velo zu dir, wechseln den Schlauch, pr\'fcfen Reifen und Bremsen, und du f\'e4hrst weiter. Reaktionszeit unter 60 Minuten in der Stadt Z\'fcrich.' \},\
        \{ h2:'Wie der Pannendienst abl\'e4uft', body:'1. WhatsApp uns Standort + Foto. 2. Wir best\'e4tigen ETA. 3. Wir kommen, reparieren vor Ort, du bezahlst per TWINT. Du musst nicht einmal anwesend sein.',\
          h3items:[\
            \{h3:'Schritt 1 \'96 WhatsApp Foto', body:'Schick uns deinen Standort und ein Foto vom Velo.'\},\
            \{h3:'Schritt 2 \'96 Best\'e4tigung & ETA', body:'Du bekommst eine fixe Ankunftszeit und CHF 99 schriftlich.'\},\
            \{h3:'Schritt 3 \'96 Reparatur vor Ort', body:'Schlauchwechsel, Reifen-Check, Bremsen pr\'fcfen, Sicherheitscheck.'\},\
            \{h3:'Schritt 4 \'96 TWINT-Zahlung', body:'Zahlung nach erbrachter Leistung per TWINT.'\}\
          ]\},\
        \{ h2:'In allen Z\'fcrcher Quartieren', body:'Pannendienst in allen 12 Kreisen der Stadt Z\'fcrich und der Agglomeration.' \}\
      ],\
      faqs: [\
        \{q:'Was kostet die Plattfuss-Reparatur?', a:'CHF 99 all-inclusive: Anfahrt, Schlauch, Arbeitszeit, Sicherheitscheck.'\},\
        \{q:'Wie schnell kommt ihr?', a:'In der Regel unter 60 Minuten in der Stadt Z\'fcrich.'\},\
        \{q:'Repariert ihr auch E-Bike-Reifen?', a:'Ja, alle Velos und E-Bikes \'96 auch Cargo-Bikes.'\},\
        \{q:'Was wenn der Reifen nicht zu retten ist?', a:'Wir tauschen den Schlauch. Falls auch der Reifen Schaden hat, machen wir eine transparente Offerte vor Ort.'\}\
      ],\
      contact: 'WhatsApp +41 76 235 21 26 f\'fcr Notf\'e4lle \'b7 info@velov.ch',\
      schema: [\
        \{"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV \'97 Mobiler Velo-Pannendienst Z\'fcrich","url":"https://www.velov.ch/pannendienst","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99\'96CHF 119","address":\{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Z\'fcrich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"\},"geo":\{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417\},"openingHoursSpecification":\{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"\},"aggregateRating":\{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"\},"offers":[\{"@type":"Offer","name":"Pannendienst all-inclusive \'97 normales Velo","price":"99","priceCurrency":"CHF","description":"Anfahrt + Diagnose + neuer Schlauch + Montage + Reifen aufpumpen + Ketten\'f6l"\},\{"@type":"Offer","name":"Pannendienst E-Bike Nabenmotor hinten","price":"109","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Pannendienst Cargo-Bike Hinterrad","price":"119","priceCurrency":"CHF"\}],"inLanguage":"de","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]\},\
        \{"@context":"https://schema.org","@type":"FAQPage","inLanguage":"de","mainEntity":[\{"@type":"Question","name":"Ist CHF 99 wirklich all-inclusive?","acceptedAnswer":\{"@type":"Answer","text":"Ja. CHF 99 enth\'e4lt Anfahrt, Diagnose, neuer Schlauch, Montage, beide Reifen aufpumpen und Ketten\'f6l. Keine versteckten Kosten."\}\},\{"@type":"Question","name":"Wann kostet es mehr als CHF 99?","acceptedAnswer":\{"@type":"Answer","text":"Nur bei Cargo-Bike-Hinterrad (ab CHF 119) oder E-Bike-Nabenmotor hinten (ab CHF 109)."\}\},\{"@type":"Question","name":"Wie schnell seid ihr in Z\'fcrich da?","acceptedAnswer":\{"@type":"Answer","text":"Innerhalb der Stadt Z\'fcrich in der Regel innert 45 Minuten \'97 oft schneller."\}\},\{"@type":"Question","name":"Seid ihr 24h erreichbar?","acceptedAnswer":\{"@type":"Answer","text":"Wir versuchen rund um die Uhr erreichbar zu sein. Schreib uns per WhatsApp \'97 wir antworten so schnell wie m\'f6glich."\}\},\{"@type":"Question","name":"Repariert ihr auch E-Bike-Elektronik?","acceptedAnswer":\{"@type":"Answer","text":"Nein. VELOV repariert ausschliesslich mechanische Teile. Akku, Display und Motor-Elektronik machen wir nicht."\}\},\{"@type":"Question","name":"Muss ich zuhause sein?","acceptedAnswer":\{"@type":"Answer","text":"Nein \'97 wenn das Velo zug\'e4nglich ist, reparieren wir auch ohne dich. Bezahlung per TWINT nach Foto-Best\'e4tigung."\}\}]\},\
        \{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch"\},\{"@type":"ListItem","position":2,"name":"Pannendienst","item":"https://www.velov.ch/pannendienst"\}]\}\
      ]\
    \},\
    ui: \{\
      faqLabel:'H\'e4ufige Fragen', contactLabel:'Kontakt',\
      liveBadge:'24/7 nah erreichbar \'b7 Mobiler Pannendienst Z\'fcrich',\
      heroH1:'Plattfuss in Z\'fcrich? Kein Problem.',\
      heroSub:'Mobiler Velo-Pannendienst \'97 wir kommen mit Velo und Cargo-Bike zu dir. \'dcberall in der Stadt Z\'fcrich.',\
      priceTagline:'All-inclusive \'b7 Anfahrt, Schlauch, Montage, Luft, Ketten\'f6l',\
      ctaPhone:'\uc0\u55357 \u56542  Jetzt Pannendienst rufen',\
      ctaWa:'\uc0\u55357 \u56492  WhatsApp \'b7 Antwort in Minuten',\
      heroNote:'Mechanische Velo-Reparatur \'b7 Elektronik und Akku reparieren wir nicht',\
      waHeroMsg:'Hallo VELOV, ich habe einen Plattfuss / Panne. Standort: ',\
      bookerLabel:'Quick-Booker',\
      bookerTitle:'Wo bist du gerade in Z\'fcrich?',\
      bookerSub:'W\'e4hle dein Quartier \'97 wir zeigen dir sofort deine Reaktionszeit und buchen direkt per WhatsApp.',\
      bookerStep:'Schritt 1 von 1',\
      bookerQ:'In welchem Stadtteil stehst du gerade?',\
      etaUnit:'Min Reaktion',\
      etaArrival:'Erwartete Ankunft ab Anfrage',\
      etaBookBtn:'\uc0\u55357 \u56562  Jetzt per WhatsApp buchen',\
      etaPriceNote:'Festpreis CHF 99 all-inclusive f\'fcr die meisten F\'e4lle. Cargo-Bike hinten ab CHF 119 \'b7 E-Bike Nabenmotor hinten ab CHF 109.',\
      waZoneMsg:(zname,areas)=>`Hallo VELOV, ich brauche den Pannendienst!\\n\'95 Standort: $\{zname\} ($\{areas.slice(0,2).join(', ')\} \'85)\\n\'95 Problem: Plattfuss / Panne\\nK\'f6nnt ihr kommen?`,\
      inclLabel:'All-Inclusive',\
      inclTitle:'Was ist im Preis von CHF 99 enthalten?',\
      inclSub:'Alles, was ein Plattfuss wirklich braucht. Du zahlst genau CHF 99 \'97 Fixpreis, keine \'dcberraschungen.',\
      tiersLabel:'Preise nach Velo-Typ',\
      tiersTitle:'Transparente Festpreise f\'fcr Z\'fcrich',\
      tiersSub:'F\'fcr 99 % unserer Eins\'e4tze gilt CHF 99. Nur bei Cargo-Bike-Hinterrad oder E-Bike-Nabenmotor hinten ist ein leichter Aufpreis fair.',\
      tierFrom:'ab',\
      stepsLabel:'Ablauf',\
      stepsTitle:'So schnell geht\\'s',\
      faqLabel2:'FAQ',\
      faqTitle:'H\'e4ufige Fragen zum Pannendienst',\
      ctaTitle:'Plattfuss? Ruf jetzt an oder schreib per WhatsApp.',\
      ctaBody:'CHF 99 all-inclusive in Z\'fcrich. Wir versuchen rund um die Uhr zu kommen \'97 oft innert 45 Minuten.',\
      ctaFooter:'Mobiler Pannendienst f\'fcr Velo, E-Bike und Cargo-Bike in Z\'fcrich'\
    \},\
    included:[\
      \{icon:'\uc0\u55357 \u56976 ',title:'Anfahrt',          desc:'Wir kommen per Velo oder Cargo-Bike direkt zu dir \'97 \'fcberall in Z\'fcrich.'\},\
      \{icon:'\uc0\u55357 \u56589 ',title:'Diagnose vor Ort', desc:'Wir finden das Problem sofort \'97 transparent erkl\'e4rt.'\},\
      \{icon:'\uc0\u55357 \u57054 ',title:'Neuer Schlauch',   desc:'Hochwertiger Ersatzschlauch passend zu deinem Velo \'97 inklusive.'\},\
      \{icon:'\uc0\u55357 \u56615 ',title:'Montage',          desc:'Professioneller Reifenwechsel, korrekt montiert und ausgerichtet.'\},\
      \{icon:'\uc0\u55357 \u56488 ',title:'Beide Reifen Luft',desc:'Wir pumpen beide Reifen auf den optimalen Druck auf.'\},\
      \{icon:'\uc0\u55357 \u57058 \u65039 ',title:'Ketten\'f6l',         desc:'Kette gereinigt und ge\'f6lt \'97 du f\'e4hrst wie neu weiter.'\}\
    ],\
    tiers:[\
      \{badge:'Standard',    title:'Normale Velos \'97 Vorder- oder Hinterrad', price:99,  desc:'Gilt f\'fcr alle Stadt-, City-, Renn- und Trekking-Velos.',\
       list:['Alle Vorderr\'e4der aller Velos','Hinterrad bei klassischen Fahrr\'e4dern','Alle Punkte im All-Inclusive-Paket','Fixpreis \'97 keine \'dcberraschung']\},\
      \{badge:'E-Bike hinten',title:'E-Bike mit Nabenmotor \'97 Hinterrad',      price:109, desc:'Aufpreis f\'fcr Demontage des Motors / der Steckachse hinten.',\
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Mehraufwand durch Nabenmotor','Spezialwerkzeug inklusive','Rein mechanisch \'97 kein Akku-/Elektronik-Service']\},\
      \{badge:'Cargo-Bike',   title:'Cargo-Bike \'97 Hinterrad',                 price:119, desc:'Gr\'f6ssere Laufr\'e4der, schwerere Konstruktion, mehr Zeit.',\
       list:['Riese & M\'fcller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt u.a.','L\'e4ngere Hinterrad-Demontage','Spezielle Werkzeuge f\'fcr breite Achsen','Alle Punkte im All-Inclusive-Paket']\}\
    ],\
    steps:[\
      \{n:1, t:'WhatsApp oder Anruf',       d:'Schreib uns per WhatsApp oder ruf an. Sag uns, wo du bist und was dran ist.'\},\
      \{n:2, t:'Foto / Video (optional)',    d:'Schick ein Bild vom Velo / Schaden \'97 so kommen wir mit den richtigen Teilen.'\},\
      \{n:3, t:'Wir kommen zu dir',          d:'In der Stadt Z\'fcrich oft innerhalb 45 Minuten. Wir kommen per Velo & Cargo-Bike.'\},\
      \{n:4, t:'Repariert & weiterfahren',   d:'Reparatur vor Ort, Reifen aufgepumpt, Kette ge\'f6lt \'97 du f\'e4hrst weiter.'\}\
    ],\
    faqs:[\
      \{q:'Ist CHF 99 wirklich all-inclusive?', a:'Ja. CHF 99 enth\'e4lt Anfahrt, Diagnose, neuer Schlauch, Montage, beide Reifen aufpumpen und Ketten\'f6l. Keine versteckten Kosten. Gilt f\'fcr normale Velos (Vorder- & Hinterrad) und alle Vorderr\'e4der.'\},\
      \{q:'Wann kostet es mehr als CHF 99?', a:'Nur bei Cargo-Bike-Hinterrad (ab CHF 119) oder E-Bike-Nabenmotor hinten (ab CHF 109). Vorderr\'e4der bleiben \'fcberall bei CHF 99.'\},\
      \{q:'Wie schnell seid ihr in Z\'fcrich da?', a:'Innerhalb der Stadt Z\'fcrich in der Regel innert 45 Minuten \'97 oft schneller. In der Agglomeration 55\'9665 Minuten.'\},\
      \{q:'Seid ihr 24h erreichbar?', a:'Wir versuchen rund um die Uhr erreichbar zu sein. Schreib uns auch abends oder am Wochenende per WhatsApp.'\},\
      \{q:'Repariert ihr auch E-Bike-Elektronik?', a:'Nein. VELOV repariert ausschliesslich mechanische Teile. Akku, Display und Motor-Elektronik machen wir nicht.'\},\
      \{q:'Muss ich zuhause sein?', a:'Nein \'97 wenn das Velo zug\'e4nglich ist, reparieren wir auch ohne dich. Zahlung per TWINT nach Foto-Best\'e4tigung.'\},\
      \{q:'Wie bezahle ich?', a:'TWINT, Bargeld oder Rechnung. Transparenter Fixpreis vor der Reparatur \'97 du weisst genau, was du bezahlst.'\},\
      \{q:'Welche Velos repariert ihr?', a:'Stadtvelos, Rennvelos, Gravel, MTB, Trekking, E-Bikes aller Marken, Cargo-Bikes aller Marken \'97 alles was mechanisch ist.'\}\
    ]\
  \},\
\
  /* \uc0\u9472 \u9472  ENGLISH \u9472 \u9472  */\
  en: \{\
    seo: \{\
      id: 'emergency-en',\
      h1: 'Bike Emergency Service Zurich \'96 Flat Tyre? We Come in 60 Minutes',\
      intro: 'Flat tyre in Zurich? VELOV is Zurich\\'s fastest mobile bike emergency service. CHF 99 all-inclusive: travel, new inner tube, safety check. WhatsApp us \'97 we\\'re typically with you in 60 minutes.',\
      sections: [\
        \{h2:'Bike Emergency Service Zurich \'96 CHF 99 All-Inclusive', body:'One fixed price, no hidden fees. We come to you with a service bike, replace the inner tube, check tyres and brakes, and you\\'re back on the road. Response time under 60 minutes in Zurich city.'\},\
        \{h2:'How the Emergency Service Works', body:'1. WhatsApp us your location and a photo. 2. We confirm ETA. 3. We come, repair on-site, you pay via TWINT. You don\\'t even need to be present \'97 just leave the bike accessible.',\
         h3items:[\
           \{h3:'Step 1 \'96 WhatsApp Photo', body:'Send us your location and a photo of the bike. We usually reply within minutes.'\},\
           \{h3:'Step 2 \'96 Confirmation & ETA', body:'You get a fixed arrival time and CHF 99 fixed price in writing.'\},\
           \{h3:'Step 3 \'96 On-Site Repair', body:'Inner tube replacement, tyre check, brake inspection, safety check.'\},\
           \{h3:'Step 4 \'96 TWINT Payment', body:'Pay after the repair via TWINT.'\}\
         ]\},\
        \{h2:'In All Zurich Districts', body:'Emergency service across all 12 districts and the greater Zurich agglomeration.'\}\
      ],\
      faqs: [\
        \{q:'How much is the flat tyre repair?', a:'CHF 99 all-inclusive: travel, inner tube, labour, safety check.'\},\
        \{q:'How fast do you come?', a:'Typically under 60 minutes within Zurich city.'\},\
        \{q:'Do you repair e-bike tyres?', a:'Yes \'97 all bikes and e-bikes, including cargo bikes.'\},\
        \{q:'What if the tyre is beyond repair?', a:'We replace the inner tube. If the tyre is also damaged, we give you a transparent quote on-site.'\}\
      ],\
      contact: 'WhatsApp +41 76 235 21 26 for emergencies \'b7 info@velov.ch',\
      schema: [\
        \{"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV \'97 Mobile Bike Emergency Service Zurich","url":"https://www.velov.ch/en/emergency","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99\'96CHF 119","address":\{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"\},"geo":\{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417\},"openingHoursSpecification":\{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"\},"aggregateRating":\{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"\},"offers":[\{"@type":"Offer","name":"Flat tyre repair all-inclusive \'97 standard bike","price":"99","priceCurrency":"CHF","description":"Travel + diagnosis + new inner tube + fitting + tyre inflation + chain lube"\},\{"@type":"Offer","name":"Flat tyre \'97 e-bike rear hub motor","price":"109","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Flat tyre \'97 cargo bike rear wheel","price":"119","priceCurrency":"CHF"\}],"inLanguage":"en","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]\},\
        \{"@context":"https://schema.org","@type":"FAQPage","inLanguage":"en","mainEntity":[\{"@type":"Question","name":"Is CHF 99 really all-inclusive?","acceptedAnswer":\{"@type":"Answer","text":"Yes. CHF 99 includes travel, diagnosis, new inner tube, fitting, inflating both tyres and chain lube. No hidden costs."\}\},\{"@type":"Question","name":"When does it cost more than CHF 99?","acceptedAnswer":\{"@type":"Answer","text":"Only for cargo bike rear wheel (from CHF 119) or e-bike rear hub motor (from CHF 109). Front wheels are always CHF 99."\}\},\{"@type":"Question","name":"How quickly can you reach me in Zurich?","acceptedAnswer":\{"@type":"Answer","text":"Within Zurich city typically within 45 minutes \'97 often faster. Agglomeration 55\'9665 minutes."\}\},\{"@type":"Question","name":"Are you available 24 hours?","acceptedAnswer":\{"@type":"Answer","text":"We aim to be available around the clock. WhatsApp us any time \'97 evenings and weekends included."\}\},\{"@type":"Question","name":"Do you repair e-bike electronics?","acceptedAnswer":\{"@type":"Answer","text":"No. VELOV repairs mechanical components only. Battery, display and motor electronics are not our service."\}\},\{"@type":"Question","name":"Do I need to be present?","acceptedAnswer":\{"@type":"Answer","text":"No \'97 if the bike is accessible outdoors, we repair it without you present. Payment via TWINT after photo confirmation."\}\}]\},\
        \{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/en"\},\{"@type":"ListItem","position":2,"name":"Emergency Service","item":"https://www.velov.ch/en/emergency"\}]\}\
      ]\
    \},\
    ui: \{\
      faqLabel:'Frequently Asked Questions', contactLabel:'Contact',\
      liveBadge:'Available 24/7 \'b7 Mobile Bike Emergency Service Zurich',\
      heroH1:'Flat tyre in Zurich? No problem.',\
      heroSub:'Mobile bike emergency service \'97 we come to you by bike & cargo bike. Anywhere in Zurich city.',\
      priceTagline:'All-inclusive \'b7 Travel, inner tube, fitting, inflation, chain lube',\
      ctaPhone:'\uc0\u55357 \u56542  Call Emergency Service Now',\
      ctaWa:'\uc0\u55357 \u56492  WhatsApp \'b7 Reply in Minutes',\
      heroNote:'Mechanical bike repair only \'b7 We do not repair electronics or batteries',\
      waHeroMsg:'Hi VELOV, I have a flat tyre / breakdown. Location: ',\
      bookerLabel:'Quick Booker',\
      bookerTitle:'Where are you in Zurich right now?',\
      bookerSub:'Select your area \'97 we\\'ll show you your personal response time and you can book directly via WhatsApp.',\
      bookerStep:'Step 1 of 1',\
      bookerQ:'Which part of the city are you in?',\
      etaUnit:'min response',\
      etaArrival:'Expected arrival from request',\
      etaBookBtn:'\uc0\u55357 \u56562  Book now via WhatsApp',\
      etaPriceNote:'Fixed price CHF 99 all-inclusive for most cases. Cargo bike rear from CHF 119 \'b7 E-bike rear hub motor from CHF 109.',\
      waZoneMsg:(zname,areas)=>`Hi VELOV, I need emergency bike service!\\n\'95 Location: $\{zname\} ($\{areas.slice(0,2).join(', ')\} \'85)\\n\'95 Problem: Flat tyre / breakdown\\nCan you come?`,\
      inclLabel:'All-Inclusive',\
      inclTitle:'What\\'s included in the CHF 99 price?',\
      inclSub:'Everything a flat tyre really needs. You pay exactly CHF 99 \'97 fixed price, no surprises.',\
      tiersLabel:'Price by Bike Type',\
      tiersTitle:'Transparent Fixed Prices for Zurich',\
      tiersSub:'For 99% of callouts, CHF 99 applies. A small surcharge is fair only for cargo bike rear wheels or e-bike rear hub motors.',\
      tierFrom:'from',\
      stepsLabel:'How It Works',\
      stepsTitle:'This is how fast it goes',\
      faqLabel2:'FAQ',\
      faqTitle:'Common Questions About the Emergency Service',\
      ctaTitle:'Flat tyre? Call now or WhatsApp us.',\
      ctaBody:'CHF 99 all-inclusive in Zurich. We aim to come around the clock \'97 often within 45 minutes in the city.',\
      ctaFooter:'Mobile emergency service for bikes, e-bikes and cargo bikes in Zurich'\
    \},\
    included:[\
      \{icon:'\uc0\u55357 \u56976 ',title:'Travel',            desc:'We come to you by bike or cargo bike \'97 anywhere in Zurich.'\},\
      \{icon:'\uc0\u55357 \u56589 ',title:'On-site diagnosis', desc:'We find the problem immediately \'97 explained transparently.'\},\
      \{icon:'\uc0\u55357 \u57054 ',title:'New inner tube',    desc:'High-quality replacement tube for your bike \'97 included.'\},\
      \{icon:'\uc0\u55357 \u56615 ',title:'Fitting',           desc:'Professional tyre fitting, correctly mounted and aligned.'\},\
      \{icon:'\uc0\u55357 \u56488 ',title:'Both tyres inflated',desc:'We inflate both tyres to optimal pressure.'\},\
      \{icon:'\uc0\u55357 \u57058 \u65039 ',title:'Chain lube',        desc:'Chain cleaned and lubed \'97 you ride like new.'\}\
    ],\
    tiers:[\
      \{badge:'Standard',     title:'Standard Bikes \'97 Front or Rear Wheel', price:99,  desc:'Applies to all city, road, gravel and trekking bikes.',\
       list:['All front wheels of all bikes','Rear wheel of standard bikes','All items in the all-inclusive package','Fixed price \'97 no surprises']\},\
      \{badge:'E-Bike rear',  title:'E-Bike with Rear Hub Motor',           price:109, desc:'Surcharge for motor / thru-axle disassembly.',\
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Extra work due to hub motor','Special tools included','Mechanical work only \'97 no battery/electronics service']\},\
      \{badge:'Cargo Bike',   title:'Cargo Bike \'97 Rear Wheel',              price:119, desc:'Larger wheels, heavier build, more time required.',\
       list:['Riese & M\'fcller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','Longer rear wheel removal','Specialist tools for wide axles','All items in the all-inclusive package']\}\
    ],\
    steps:[\
      \{n:1, t:'WhatsApp or call',          d:'Tell us where you are and what\\'s wrong. We reply within minutes.'\},\
      \{n:2, t:'Photo / video (optional)',   d:'Send a picture of the bike/damage \'97 we\\'ll bring the right parts.'\},\
      \{n:3, t:'We come to you',             d:'Within Zurich city often within 45 minutes. We travel by bike & cargo bike.'\},\
      \{n:4, t:'Repaired & back on the road',d:'Fixed on-site, tyres pumped, chain lubed \'97 off you go.'\}\
    ],\
    faqs:[\
      \{q:'Is CHF 99 really all-inclusive?', a:'Yes. CHF 99 includes travel, diagnosis, new inner tube, fitting, inflating both tyres and chain lube. No hidden costs.'\},\
      \{q:'When does it cost more than CHF 99?', a:'Only for cargo bike rear wheel (from CHF 119) or e-bike rear hub motor (from CHF 109). Front wheels are always CHF 99.'\},\
      \{q:'How quickly can you reach me in Zurich?', a:'Within Zurich city typically within 45 minutes \'97 often faster. Agglomeration 55\'9665 minutes.'\},\
      \{q:'Are you available 24 hours?', a:'We aim to be available around the clock. WhatsApp us any time \'97 evenings and weekends included.'\},\
      \{q:'Do you repair e-bike electronics?', a:'No. VELOV repairs mechanical components only. Battery, display and motor electronics are not our service.'\},\
      \{q:'Do I need to be present?', a:'No \'97 if the bike is accessible outdoors, we repair it without you. Payment via TWINT after photo confirmation.'\},\
      \{q:'How do I pay?', a:'TWINT, cash or invoice. Transparent fixed price before the repair \'97 you know exactly what you\\'ll pay.'\},\
      \{q:'Which bikes do you repair?', a:'City bikes, road bikes, gravel, MTB, trekking, e-bikes of all brands, cargo bikes of all brands \'97 anything mechanical.'\}\
    ]\
  \},\
\
  /* \uc0\u9472 \u9472  FRAN\'c7AIS \u9472 \u9472  */\
  fr: \{\
    seo: \{\
      id: 'depannage-fr',\
      h1: 'D\'e9pannage V\'e9lo Zurich \'96 Crevaison ? Nous arrivons en 60 minutes',\
      intro: 'Crevaison \'e0 Zurich ? VELOV est le service de d\'e9pannage v\'e9lo mobile le plus rapide de Zurich. CHF 99 tout inclus : d\'e9placement, chambre \'e0 air neuve, contr\'f4le de s\'e9curit\'e9. WhatsApp \'97 nous sommes g\'e9n\'e9ralement chez vous en 60 minutes.',\
      sections: [\
        \{h2:'D\'e9pannage V\'e9lo Zurich \'96 CHF 99 Tout Inclus', body:'Un prix fixe, sans frais cach\'e9s. Nous venons avec notre v\'e9lo de service, rempla\'e7ons la chambre \'e0 air, contr\'f4lons pneus et freins, et vous repartez. D\'e9lai d\\'intervention sous 60 minutes en ville de Zurich.'\},\
        \{h2:'Comment se D\'e9roule le D\'e9pannage', body:'1. Envoyez position + photo par WhatsApp. 2. Confirmation ETA. 3. Nous venons, r\'e9parons sur place, paiement TWINT. Pas besoin d\\'\'eatre pr\'e9sent.',\
         h3items:[\
           \{h3:'\'c9tape 1 \'96 Photo WhatsApp', body:'Envoyez votre position et une photo du v\'e9lo. R\'e9ponse g\'e9n\'e9ralement en quelques minutes.'\},\
           \{h3:'\'c9tape 2 \'96 Confirmation & Heure', body:'Vous recevez une heure d\\'arriv\'e9e pr\'e9cise et le prix fixe CHF 99 par \'e9crit.'\},\
           \{h3:'\'c9tape 3 \'96 R\'e9paration sur Place', body:'Remplacement chambre \'e0 air, contr\'f4le pneus, freins, contr\'f4le de s\'e9curit\'e9.'\},\
           \{h3:'\'c9tape 4 \'96 Paiement TWINT', body:'Paiement apr\'e8s la r\'e9paration par TWINT.'\}\
         ]\},\
        \{h2:'Dans Tous les Arrondissements de Zurich', body:'Service de d\'e9pannage dans les 12 cercles de Zurich et l\\'agglom\'e9ration.'\}\
      ],\
      faqs: [\
        \{q:'Combien co\'fbte la r\'e9paration crevaison ?', a:'CHF 99 tout inclus : trajet, chambre \'e0 air, main d\\'\'9cuvre, contr\'f4le de s\'e9curit\'e9.'\},\
        \{q:'\'c0 quelle vitesse arrivez-vous ?', a:'G\'e9n\'e9ralement sous 60 minutes en ville de Zurich.'\},\
        \{q:'R\'e9parez-vous aussi les e-bikes ?', a:'Oui \'97 tous les v\'e9los et e-bikes, y compris les v\'e9los cargo.'\},\
        \{q:'Que faire si le pneu est irr\'e9parable ?', a:'Nous rempla\'e7ons la chambre \'e0 air. Si le pneu est ab\'eem\'e9, devis transparent sur place.'\}\
      ],\
      contact: 'WhatsApp +41 76 235 21 26 pour urgences \'b7 info@velov.ch',\
      schema: [\
        \{"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV \'97 Service D\'e9pannage V\'e9lo Mobile Zurich","url":"https://www.velov.ch/fr/depannage","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99\'96CHF 119","address":\{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"\},"geo":\{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417\},"openingHoursSpecification":\{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"\},"aggregateRating":\{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"\},"offers":[\{"@type":"Offer","name":"D\'e9pannage tout inclus \'97 v\'e9lo standard","price":"99","priceCurrency":"CHF"\},\{"@type":"Offer","name":"D\'e9pannage e-bike moteur arri\'e8re","price":"109","priceCurrency":"CHF"\},\{"@type":"Offer","name":"D\'e9pannage cargo bike roue arri\'e8re","price":"119","priceCurrency":"CHF"\}],"inLanguage":"fr","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]\},\
        \{"@context":"https://schema.org","@type":"FAQPage","inLanguage":"fr","mainEntity":[\{"@type":"Question","name":"CHF 99 est-il vraiment tout inclus ?","acceptedAnswer":\{"@type":"Answer","text":"Oui. CHF 99 comprend le d\'e9placement, le diagnostic, la chambre \'e0 air neuve, le montage, le gonflage des deux pneus et la lubrification cha\'eene. Aucun frais cach\'e9."\}\},\{"@type":"Question","name":"Quand cela co\'fbte-t-il plus de CHF 99 ?","acceptedAnswer":\{"@type":"Answer","text":"Uniquement pour la roue arri\'e8re d'un cargo bike (d\'e8s CHF 119) ou d'un e-bike \'e0 moteur dans le moyeu arri\'e8re (d\'e8s CHF 109)."\}\},\{"@type":"Question","name":"\'c0 quelle vitesse arrivez-vous \'e0 Zurich ?","acceptedAnswer":\{"@type":"Answer","text":"En ville de Zurich, g\'e9n\'e9ralement en 45 minutes \'97 souvent plus vite. Dans l'agglom\'e9ration 55\'9665 minutes."\}\},\{"@type":"Question","name":"\'cates-vous disponibles 24h/24 ?","acceptedAnswer":\{"@type":"Answer","text":"Nous essayons d'\'eatre disponibles en permanence. Envoyez-nous un WhatsApp \'e0 n'importe quelle heure."\}\}]\},\
        \{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.velov.ch/fr"\},\{"@type":"ListItem","position":2,"name":"D\'e9pannage","item":"https://www.velov.ch/fr/depannage"\}]\}\
      ]\
    \},\
    ui: \{\
      faqLabel:'Questions fr\'e9quentes', contactLabel:'Contact',\
      liveBadge:'Disponible 24/7 \'b7 D\'e9pannage V\'e9lo Mobile Zurich',\
      heroH1:'Crevaison \'e0 Zurich ? Pas de probl\'e8me.',\
      heroSub:'D\'e9pannage v\'e9lo mobile \'97 nous venons \'e0 v\'e9lo et cargo bike. Partout en ville de Zurich.',\
      priceTagline:'Tout inclus \'b7 D\'e9placement, chambre \'e0 air, montage, gonflage, lubrification',\
      ctaPhone:'\uc0\u55357 \u56542  Appeler le d\'e9pannage maintenant',\
      ctaWa:'\uc0\u55357 \u56492  WhatsApp \'b7 R\'e9ponse en quelques minutes',\
      heroNote:'R\'e9paration m\'e9canique uniquement \'b7 Nous ne r\'e9parons pas l\\'\'e9lectronique ni les batteries',\
      waHeroMsg:'Bonjour VELOV, j\\'ai une crevaison / panne. Position : ',\
      bookerLabel:'R\'e9servation rapide',\
      bookerTitle:'O\'f9 \'eates-vous en ce moment \'e0 Zurich ?',\
      bookerSub:'S\'e9lectionnez votre quartier \'97 nous vous indiquons imm\'e9diatement votre d\'e9lai et r\'e9servez par WhatsApp.',\
      bookerStep:'\'c9tape 1 sur 1',\
      bookerQ:'Dans quel quartier \'eates-vous ?',\
      etaUnit:'min de r\'e9ponse',\
      etaArrival:'Arriv\'e9e estim\'e9e \'e0 partir de la demande',\
      etaBookBtn:'\uc0\u55357 \u56562  R\'e9server maintenant par WhatsApp',\
      etaPriceNote:'Prix fixe CHF 99 tout inclus pour la plupart des cas. Cargo bike arri\'e8re d\'e8s CHF 119 \'b7 E-bike moteur arri\'e8re d\'e8s CHF 109.',\
      waZoneMsg:(zname,areas)=>`Bonjour VELOV, j'ai besoin du service d\'e9pannage !\\n\'95 Position : $\{zname\} ($\{areas.slice(0,2).join(', ')\} \'85)\\n\'95 Probl\'e8me : Crevaison / panne\\nPouvez-vous venir ?`,\
      inclLabel:'Tout Inclus',\
      inclTitle:'Qu\\'est-ce qui est compris dans le prix de CHF 99 ?',\
      inclSub:'Tout ce dont une crevaison a vraiment besoin. Vous payez exactement CHF 99 \'97 prix fixe, aucune surprise.',\
      tiersLabel:'Prix selon le type de v\'e9lo',\
      tiersTitle:'Tarifs fixes transparents pour Zurich',\
      tiersSub:'Pour 99 % de nos interventions, CHF 99 s\\'applique. Un petit suppl\'e9ment est justifi\'e9 uniquement pour la roue arri\'e8re cargo bike ou l\\'e-bike \'e0 moteur dans le moyeu.',\
      tierFrom:'d\'e8s',\
      stepsLabel:'D\'e9roulement',\
      stepsTitle:'Comment \'e7a se passe',\
      faqLabel2:'FAQ',\
      faqTitle:'Questions fr\'e9quentes sur le d\'e9pannage',\
      ctaTitle:'Crevaison ? Appelez maintenant ou \'e9crivez par WhatsApp.',\
      ctaBody:'CHF 99 tout inclus \'e0 Zurich. Nous essayons de venir \'e0 toute heure \'97 souvent en 45 minutes en ville.',\
      ctaFooter:'Service d\'e9pannage mobile pour v\'e9los, e-bikes et cargo bikes \'e0 Zurich'\
    \},\
    included:[\
      \{icon:'\uc0\u55357 \u56976 ',title:'D\'e9placement',          desc:'Nous venons \'e0 v\'e9lo ou cargo bike directement chez vous \'97 partout \'e0 Zurich.'\},\
      \{icon:'\uc0\u55357 \u56589 ',title:'Diagnostic sur place',  desc:'Nous trouvons le probl\'e8me imm\'e9diatement \'97 expliqu\'e9 de fa\'e7on transparente.'\},\
      \{icon:'\uc0\u55357 \u57054 ',title:'Chambre \'e0 air neuve',   desc:'Chambre \'e0 air de remplacement de qualit\'e9 pour votre v\'e9lo \'97 incluse.'\},\
      \{icon:'\uc0\u55357 \u56615 ',title:'Montage',               desc:'Montage professionnel du pneu, correctement mont\'e9 et align\'e9.'\},\
      \{icon:'\uc0\u55357 \u56488 ',title:'Les deux pneus gonfl\'e9s',desc:'Nous gonflons les deux pneus \'e0 la pression optimale.'\},\
      \{icon:'\uc0\u55357 \u57058 \u65039 ',title:'Lubrification cha\'eene',  desc:'Cha\'eene nettoy\'e9e et lubrifi\'e9e \'97 vous roulez comme neuf.'\}\
    ],\
    tiers:[\
      \{badge:'Standard',       title:'V\'e9los standard \'97 Roue avant ou arri\'e8re', price:99,  desc:'Valable pour tous les v\'e9los de ville, route, gravel et trekking.',\
       list:['Toutes les roues avant de tous les v\'e9los','Roue arri\'e8re des v\'e9los classiques','Tous les \'e9l\'e9ments du pack tout inclus','Prix fixe \'97 aucune surprise']\},\
      \{badge:'E-bike arri\'e8re',  title:'E-bike avec moteur dans le moyeu arri\'e8re', price:109, desc:'Suppl\'e9ment pour d\'e9montage du moteur / axe traversant arri\'e8re.',\
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Travail suppl\'e9mentaire d\'fb au moteur dans le moyeu','Outils sp\'e9ciaux inclus','Travail m\'e9canique uniquement \'97 pas de service batterie/\'e9lectronique']\},\
      \{badge:'Cargo bike',      title:'Cargo bike \'97 Roue arri\'e8re',               price:119, desc:'Roues plus grandes, construction plus lourde, plus de temps.',\
       list:['Riese & M\'fcller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','D\'e9montage roue arri\'e8re plus long','Outils sp\'e9ciaux pour axes larges','Tous les \'e9l\'e9ments du pack tout inclus']\}\
    ],\
    steps:[\
      \{n:1, t:'WhatsApp ou appel',              d:'Dites-nous o\'f9 vous \'eates et ce qui ne va pas. R\'e9ponse en quelques minutes.'\},\
      \{n:2, t:'Photo / vid\'e9o (optionnel)',       d:'Envoyez une photo du v\'e9lo/dommage \'97 nous arriverons avec les bonnes pi\'e8ces.'\},\
      \{n:3, t:'Nous venons chez vous',           d:'En ville de Zurich souvent en 45 minutes. Nous venons \'e0 v\'e9lo & cargo bike.'\},\
      \{n:4, t:'R\'e9par\'e9 & de nouveau en route',   d:'R\'e9par\'e9 sur place, pneus gonfl\'e9s, cha\'eene lubrifi\'e9e \'97 repartez !'\}\
    ],\
    faqs:[\
      \{q:'CHF 99 est-il vraiment tout inclus ?', a:'Oui. CHF 99 comprend d\'e9placement, diagnostic, chambre \'e0 air neuve, montage, gonflage des deux pneus et lubrification. Aucun frais cach\'e9.'\},\
      \{q:'Quand cela co\'fbte-t-il plus de CHF 99 ?', a:'Uniquement pour cargo bike roue arri\'e8re (d\'e8s CHF 119) ou e-bike moteur moyeu arri\'e8re (d\'e8s CHF 109). Les roues avant sont toujours CHF 99.'\},\
      \{q:'\'c0 quelle vitesse arrivez-vous \'e0 Zurich ?', a:'En ville g\'e9n\'e9ralement en 45 minutes \'97 souvent plus vite. Agglom\'e9ration 55\'9665 minutes.'\},\
      \{q:'\'cates-vous disponibles 24h/24 ?', a:'Nous essayons d\\'\'eatre disponibles \'e0 toute heure. \'c9crivez-nous par WhatsApp, soirs et week-ends inclus.'\},\
      \{q:'R\'e9parez-vous l\\'\'e9lectronique e-bike ?', a:'Non. VELOV r\'e9pare uniquement les pi\'e8ces m\'e9caniques. Batterie, \'e9cran et \'e9lectronique moteur ne font pas partie de notre service.'\},\
      \{q:'Dois-je \'eatre pr\'e9sent ?', a:'Non \'97 si le v\'e9lo est accessible en ext\'e9rieur, nous r\'e9parons sans vous. Paiement TWINT apr\'e8s confirmation photo.'\},\
      \{q:'Comment payer ?', a:'TWINT, esp\'e8ces ou facture. Prix fixe transparent avant la r\'e9paration.'\},\
      \{q:'Quels v\'e9los r\'e9parez-vous ?', a:'V\'e9los de ville, route, gravel, VTT, trekking, e-bikes de toutes marques, cargo bikes de toutes marques \'97 tout ce qui est m\'e9canique.'\}\
    ]\
  \},\
\
  /* \uc0\u9472 \u9472  ITALIANO \u9472 \u9472  */\
  it: \{\
    seo: \{\
      id: 'emergenza-it',\
      h1: 'Servizio Emergenza Bici Zurigo \'96 Foratura? Arriviamo in 60 Minuti',\
      intro: 'Foratura a Zurigo? VELOV \'e8 il servizio di emergenza bici mobile pi\'f9 rapido di Zurigo. CHF 99 tutto compreso: spostamento, camera d\\'aria nuova, controllo sicurezza. WhatsApp \'97 siamo da te di solito in 60 minuti.',\
      sections: [\
        \{h2:'Servizio Emergenza Bici Zurigo \'96 CHF 99 Tutto Compreso', body:'Un prezzo fisso, nessun costo nascosto. Veniamo con la nostra bici di servizio, sostituiamo la camera d\\'aria, controlliamo pneumatici e freni, e tu riparti. Tempo di intervento sotto 60 minuti in citt\'e0.'\},\
        \{h2:'Come Funziona il Servizio Emergenza', body:'1. Inviaci posizione + foto via WhatsApp. 2. Confermiamo l\\'orario. 3. Veniamo, ripariamo sul posto, paghi via TWINT. Non devi nemmeno essere presente.',\
         h3items:[\
           \{h3:'Passo 1 \'96 Foto WhatsApp', body:'Inviaci posizione e foto della bici. Rispondiamo di solito in pochi minuti.'\},\
           \{h3:'Passo 2 \'96 Conferma & Orario', body:'Ricevi un orario d\\'arrivo preciso e il prezzo fisso CHF 99 per iscritto.'\},\
           \{h3:'Passo 3 \'96 Riparazione sul Posto', body:'Sostituzione camera d\\'aria, controllo pneumatici, freni, controllo sicurezza.'\},\
           \{h3:'Passo 4 \'96 Pagamento TWINT', body:'Paghi dopo la riparazione via TWINT.'\}\
         ]\},\
        \{h2:'In Tutti i Quartieri di Zurigo', body:'Servizio emergenza in tutti i 12 cerchi di Zurigo e nell\\'agglomerato.'\}\
      ],\
      faqs: [\
        \{q:'Quanto costa la riparazione foratura?', a:'CHF 99 tutto compreso: spostamento, camera d\\'aria, manodopera, controllo sicurezza.'\},\
        \{q:'Quanto velocemente arrivate?', a:'Tipicamente sotto 60 minuti in citt\'e0 di Zurigo.'\},\
        \{q:'Riparate anche gli e-bike?', a:'S\'ec \'97 tutte le bici ed e-bike, anche cargo bike.'\},\
        \{q:'Cosa succede se il pneumatico \'e8 irrecuperabile?', a:'Sostituiamo la camera d\\'aria. Se il pneumatico \'e8 danneggiato, preventivo trasparente sul posto.'\}\
      ],\
      contact: 'WhatsApp +41 76 235 21 26 per emergenze \'b7 info@velov.ch',\
      schema: [\
        \{"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV \'97 Servizio Emergenza Bici Mobile Zurigo","url":"https://www.velov.ch/it/emergenza","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99\'96CHF 119","address":\{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurigo","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"\},"geo":\{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417\},"openingHoursSpecification":\{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"\},"aggregateRating":\{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"\},"offers":[\{"@type":"Offer","name":"Riparazione foratura tutto compreso \'97 bici standard","price":"99","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Foratura e-bike motore posteriore","price":"109","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Foratura cargo bike ruota posteriore","price":"119","priceCurrency":"CHF"\}],"inLanguage":"it","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]\},\
        \{"@context":"https://schema.org","@type":"FAQPage","inLanguage":"it","mainEntity":[\{"@type":"Question","name":"CHF 99 \'e8 davvero tutto compreso?","acceptedAnswer":\{"@type":"Answer","text":"S\'ec. CHF 99 include spostamento, diagnosi, camera d'aria nuova, montaggio, gonfiaggio di entrambi i pneumatici e lubrificazione catena. Nessun costo nascosto."\}\},\{"@type":"Question","name":"Quando costa pi\'f9 di CHF 99?","acceptedAnswer":\{"@type":"Answer","text":"Solo per cargo bike ruota posteriore (da CHF 119) o e-bike con motore nel mozzo posteriore (da CHF 109)."\}\},\{"@type":"Question","name":"Quanto velocemente arrivate?","acceptedAnswer":\{"@type":"Answer","text":"In citt\'e0 di Zurigo di solito in 45 minuti \'97 spesso prima. Agglomerato 55\'9665 minuti."\}\},\{"@type":"Question","name":"Siete disponibili 24 ore?","acceptedAnswer":\{"@type":"Answer","text":"Cerchiamo di essere disponibili tutto il giorno. Scriveteci via WhatsApp a qualsiasi ora."\}\}]\},\
        \{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/it"\},\{"@type":"ListItem","position":2,"name":"Emergenza","item":"https://www.velov.ch/it/emergenza"\}]\}\
      ]\
    \},\
    ui: \{\
      faqLabel:'Domande frequenti', contactLabel:'Contatto',\
      liveBadge:'Disponibile 24/7 \'b7 Servizio Emergenza Bici Mobile Zurigo',\
      heroH1:'Foratura a Zurigo? Nessun problema.',\
      heroSub:'Servizio emergenza bici mobile \'97 veniamo da te in bici e cargo bike. Ovunque in citt\'e0.',\
      priceTagline:'Tutto compreso \'b7 Spostamento, camera d\\'aria, montaggio, gonfiaggio, lubrificazione',\
      ctaPhone:'\uc0\u55357 \u56542  Chiama il servizio emergenza ora',\
      ctaWa:'\uc0\u55357 \u56492  WhatsApp \'b7 Risposta in pochi minuti',\
      heroNote:'Riparazione meccanica bici \'b7 Non ripariamo elettronica n\'e9 batterie',\
      waHeroMsg:'Ciao VELOV, ho una foratura / problema. Posizione: ',\
      bookerLabel:'Prenotazione rapida',\
      bookerTitle:'Dove ti trovi a Zurigo adesso?',\
      bookerSub:'Seleziona il tuo quartiere \'97 ti mostriamo subito il tuo tempo di risposta e prenoti direttamente via WhatsApp.',\
      bookerStep:'Passo 1 di 1',\
      bookerQ:'In quale zona della citt\'e0 sei?',\
      etaUnit:'min di risposta',\
      etaArrival:'Arrivo stimato dalla richiesta',\
      etaBookBtn:'\uc0\u55357 \u56562  Prenota ora via WhatsApp',\
      etaPriceNote:'Prezzo fisso CHF 99 tutto compreso per la maggior parte dei casi. Cargo bike posteriore da CHF 119 \'b7 E-bike motore posteriore da CHF 109.',\
      waZoneMsg:(zname,areas)=>`Ciao VELOV, ho bisogno del servizio emergenza!\\n\'95 Posizione: $\{zname\} ($\{areas.slice(0,2).join(', ')\} \'85)\\n\'95 Problema: Foratura / guasto\\nPuoi venire?`,\
      inclLabel:'Tutto Compreso',\
      inclTitle:'Cosa \'e8 incluso nel prezzo di CHF 99?',\
      inclSub:'Tutto ci\'f2 di cui una foratura ha davvero bisogno. Paghi esattamente CHF 99 \'97 prezzo fisso, nessuna sorpresa.',\
      tiersLabel:'Prezzi per tipo di bici',\
      tiersTitle:'Prezzi fissi trasparenti per Zurigo',\
      tiersSub:'Per il 99% degli interventi si applica CHF 99. Un piccolo supplemento \'e8 giustificato solo per cargo bike ruota posteriore o e-bike con motore nel mozzo.',\
      tierFrom:'da',\
      stepsLabel:'Come funziona',\
      stepsTitle:'Ecco quanto \'e8 veloce',\
      faqLabel2:'FAQ',\
      faqTitle:'Domande frequenti sul servizio emergenza',\
      ctaTitle:'Foratura? Chiama ora o scrivi via WhatsApp.',\
      ctaBody:'CHF 99 tutto compreso a Zurigo. Cerchiamo di venire a qualsiasi ora \'97 spesso in 45 minuti in citt\'e0.',\
      ctaFooter:'Servizio emergenza mobile per bici, e-bike e cargo bike a Zurigo'\
    \},\
    included:[\
      \{icon:'\uc0\u55357 \u56976 ',title:'Spostamento',             desc:'Veniamo da te in bici o cargo bike \'97 ovunque a Zurigo.'\},\
      \{icon:'\uc0\u55357 \u56589 ',title:'Diagnosi sul posto',       desc:'Troviamo subito il problema \'97 spiegato in modo trasparente.'\},\
      \{icon:'\uc0\u55357 \u57054 ',title:'Camera d\\'aria nuova',     desc:'Camera di ricambio di qualit\'e0 per la tua bici \'97 inclusa.'\},\
      \{icon:'\uc0\u55357 \u56615 ',title:'Montaggio',                desc:'Montaggio professionale del pneumatico, correttamente montato e allineato.'\},\
      \{icon:'\uc0\u55357 \u56488 ',title:'Entrambi i pneumatici',    desc:'Gonfiamo entrambi i pneumatici alla pressione ottimale.'\},\
      \{icon:'\uc0\u55357 \u57058 \u65039 ',title:'Lubrificazione catena',    desc:'Catena pulita e lubrificata \'97 riparti come nuovo.'\}\
    ],\
    tiers:[\
      \{badge:'Standard',      title:'Bici standard \'97 Ruota ant. o post.', price:99,  desc:'Valido per tutte le bici da citt\'e0, strada, gravel e trekking.',\
       list:['Tutte le ruote anteriori di tutte le bici','Ruota posteriore delle bici classiche','Tutti gli elementi del pacchetto tutto compreso','Prezzo fisso \'97 nessuna sorpresa']\},\
      \{badge:'E-bike post.',  title:'E-bike con motore nel mozzo post.',   price:109, desc:'Supplemento per smontaggio motore / asse passante posteriore.',\
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Lavoro aggiuntivo per il motore nel mozzo','Attrezzi speciali inclusi','Solo lavoro meccanico \'97 nessun servizio batteria/elettronica']\},\
      \{badge:'Cargo bike',    title:'Cargo bike \'97 Ruota posteriore',       price:119, desc:'Ruote pi\'f9 grandi, costruzione pi\'f9 pesante, pi\'f9 tempo necessario.',\
       list:['Riese & M\'fcller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt ecc.','Smontaggio ruota posteriore pi\'f9 lungo','Attrezzi speciali per assali larghi','Tutti gli elementi del pacchetto tutto compreso']\}\
    ],\
    steps:[\
      \{n:1, t:'WhatsApp o chiama',              d:'Dicci dove sei e cosa non va. Risposta in pochi minuti.'\},\
      \{n:2, t:'Foto / video (opzionale)',        d:'Manda una foto della bici/danno \'97 porteremo i pezzi giusti.'\},\
      \{n:3, t:'Veniamo da te',                   d:'In citt\'e0 di Zurigo spesso in 45 minuti. Veniamo in bici & cargo bike.'\},\
      \{n:4, t:'Riparata & di nuovo in marcia',   d:'Riparata sul posto, pneumatici gonfiati, catena lubrificata \'97 via!'\}\
    ],\
    faqs:[\
      \{q:'CHF 99 \'e8 davvero tutto compreso?', a:'S\'ec. CHF 99 include spostamento, diagnosi, camera d\\'aria nuova, montaggio, gonfiaggio e lubrificazione catena. Nessun costo nascosto.'\},\
      \{q:'Quando costa pi\'f9 di CHF 99?', a:'Solo per cargo bike ruota posteriore (da CHF 119) o e-bike motore mozzo posteriore (da CHF 109). Le ruote anteriori sono sempre CHF 99.'\},\
      \{q:'Quanto velocemente arrivate?', a:'In citt\'e0 di Zurigo di solito in 45 minuti \'97 spesso prima. Agglomerato 55\'9665 minuti.'\},\
      \{q:'Siete disponibili 24 ore?', a:'Cerchiamo di essere disponibili tutto il giorno. Scriveteci via WhatsApp a qualsiasi ora.'\},\
      \{q:'Riparate l\\'elettronica e-bike?', a:'No. VELOV ripara solo componenti meccanici. Batteria, display ed elettronica motore non rientrano nel nostro servizio.'\},\
      \{q:'Devo essere presente?', a:'No \'97 se la bici \'e8 accessibile all\\'esterno, ripariamo senza di te. Pagamento TWINT dopo conferma foto.'\},\
      \{q:'Come pago?', a:'TWINT, contanti o fattura. Prezzo fisso trasparente prima della riparazione.'\},\
      \{q:'Quali bici riparate?', a:'Bici da citt\'e0, strada, gravel, MTB, trekking, e-bike di tutte le marche, cargo bike di tutte le marche \'97 tutto ci\'f2 che \'e8 meccanico.'\}\
    ]\
  \},\
\
  /* \uc0\u9472 \u9472  ESPA\'d1OL \u9472 \u9472  */\
  es: \{\
    seo: \{\
      id: 'asistencia-es',\
      h1: 'Asistencia Bici Z\'farich \'96 \'bfPinchazo? Llegamos en 60 Minutos',\
      intro: '\'bfPinchazo en Z\'farich? VELOV es el servicio de asistencia bici m\'f3vil m\'e1s r\'e1pido de Z\'farich. CHF 99 todo incluido: desplazamiento, c\'e1mara nueva, control de seguridad. WhatsApp \'97 normalmente estamos contigo en 60 minutos.',\
      sections: [\
        \{h2:'Asistencia Bici Z\'farich \'96 CHF 99 Todo Incluido', body:'Un precio fijo, sin costes ocultos. Vamos a ti con nuestra bici de servicio, sustituimos la c\'e1mara, revisamos neum\'e1ticos y frenos, y vuelves a rodar. Tiempo de respuesta menos de 60 minutos en la ciudad.'\},\
        \{h2:'C\'f3mo Funciona la Asistencia', body:'1. M\'e1ndanos ubicaci\'f3n + foto por WhatsApp. 2. Confirmamos ETA. 3. Vamos, reparamos en el sitio, pagas con TWINT. No necesitas estar presente.',\
         h3items:[\
           \{h3:'Paso 1 \'96 Foto por WhatsApp', body:'M\'e1ndanos tu ubicaci\'f3n y una foto de la bici. Solemos contestar en pocos minutos.'\},\
           \{h3:'Paso 2 \'96 Confirmaci\'f3n y Hora', body:'Recibes una hora de llegada concreta y el precio fijo CHF 99 por escrito.'\},\
           \{h3:'Paso 3 \'96 Reparaci\'f3n en el Sitio', body:'Sustituci\'f3n de c\'e1mara, revisi\'f3n neum\'e1ticos, frenos, control de seguridad.'\},\
           \{h3:'Paso 4 \'96 Pago TWINT', body:'Pagas tras la reparaci\'f3n con TWINT.'\}\
         ]\},\
        \{h2:'En Todos los Distritos de Z\'farich', body:'Asistencia en los 12 distritos de Z\'farich y el \'e1rea metropolitana.'\}\
      ],\
      faqs: [\
        \{q:'\'bfCu\'e1nto cuesta la reparaci\'f3n de pinchazo?', a:'CHF 99 todo incluido: desplazamiento, c\'e1mara, mano de obra, control de seguridad.'\},\
        \{q:'\'bfEn cu\'e1nto tiempo lleg\'e1is?', a:'Normalmente en menos de 60 minutos en la ciudad de Z\'farich.'\},\
        \{q:'\'bfTambi\'e9n repar\'e1is pinchazos de e-bike?', a:'S\'ed \'97 todas las bicis y e-bikes, tambi\'e9n cargo bikes.'\},\
        \{q:'\'bfY si el neum\'e1tico no se puede salvar?', a:'Sustituimos la c\'e1mara. Si el neum\'e1tico tambi\'e9n est\'e1 da\'f1ado, presupuesto transparente en el sitio.'\}\
      ],\
      contact: 'WhatsApp +41 76 235 21 26 para emergencias \'b7 info@velov.ch',\
      schema: [\
        \{"@context":"https://schema.org","@type":["LocalBusiness","EmergencyService","AutoRepair"],"@id":"https://www.velov.ch/#business","name":"VELOV \'97 Servicio Asistencia Bici M\'f3vil Z\'farich","url":"https://www.velov.ch/es/asistencia","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF 99\'96CHF 119","address":\{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Z\'farich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"\},"geo":\{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417\},"openingHoursSpecification":\{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"\},"aggregateRating":\{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"\},"offers":[\{"@type":"Offer","name":"Reparaci\'f3n pinchazo todo incluido \'97 bici est\'e1ndar","price":"99","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Pinchazo e-bike motor trasero","price":"109","priceCurrency":"CHF"\},\{"@type":"Offer","name":"Pinchazo cargo bike rueda trasera","price":"119","priceCurrency":"CHF"\}],"inLanguage":"es","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]\},\
        \{"@context":"https://schema.org","@type":"FAQPage","inLanguage":"es","mainEntity":[\{"@type":"Question","name":"\'bfCHF 99 es realmente todo incluido?","acceptedAnswer":\{"@type":"Answer","text":"S\'ed. CHF 99 incluye desplazamiento, diagn\'f3stico, c\'e1mara nueva, montaje, inflado de ambos neum\'e1ticos y lubricaci\'f3n de cadena. Sin costes ocultos."\}\},\{"@type":"Question","name":"\'bfCu\'e1ndo cuesta m\'e1s de CHF 99?","acceptedAnswer":\{"@type":"Answer","text":"Solo para cargo bike rueda trasera (desde CHF 119) o e-bike con motor en buje trasero (desde CHF 109)."\}\},\{"@type":"Question","name":"\'bfCon qu\'e9 rapidez lleg\'e1is?","acceptedAnswer":\{"@type":"Answer","text":"En la ciudad de Z\'farich normalmente en 45 minutos \'97 a menudo antes. \'c1rea metropolitana 55\'9665 minutos."\}\},\{"@type":"Question","name":"\'bfEst\'e1is disponibles 24 horas?","acceptedAnswer":\{"@type":"Answer","text":"Intentamos estar disponibles en todo momento. Escribidnos por WhatsApp a cualquier hora."\}\}]\},\
        \{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.velov.ch/es"\},\{"@type":"ListItem","position":2,"name":"Asistencia","item":"https://www.velov.ch/es/asistencia"\}]\}\
      ]\
    \},\
    ui: \{\
      faqLabel:'Preguntas frecuentes', contactLabel:'Contacto',\
      liveBadge:'Disponible 24/7 \'b7 Asistencia Bici M\'f3vil Z\'farich',\
      heroH1:'\'bfPinchazo en Z\'farich? Sin problema.',\
      heroSub:'Asistencia bici m\'f3vil \'97 vamos a ti en bici y cargo bike. En toda la ciudad de Z\'farich.',\
      priceTagline:'Todo incluido \'b7 Desplazamiento, c\'e1mara, montaje, inflado, lubricaci\'f3n',\
      ctaPhone:'\uc0\u55357 \u56542  Llamar asistencia ahora',\
      ctaWa:'\uc0\u55357 \u56492  WhatsApp \'b7 Respuesta en minutos',\
      heroNote:'Reparaci\'f3n mec\'e1nica de bici \'fanicamente \'b7 No reparamos electr\'f3nica ni bater\'edas',\
      waHeroMsg:'Hola VELOV, tengo un pinchazo / aver\'eda. Ubicaci\'f3n: ',\
      bookerLabel:'Reserva r\'e1pida',\
      bookerTitle:'\'bfD\'f3nde est\'e1s ahora en Z\'farich?',\
      bookerSub:'Selecciona tu zona \'97 te mostramos tu tiempo de respuesta personal y reservas directamente por WhatsApp.',\
      bookerStep:'Paso 1 de 1',\
      bookerQ:'\'bfEn qu\'e9 parte de la ciudad est\'e1s?',\
      etaUnit:'min de respuesta',\
      etaArrival:'Llegada estimada desde la solicitud',\
      etaBookBtn:'\uc0\u55357 \u56562  Reservar ahora por WhatsApp',\
      etaPriceNote:'Precio fijo CHF 99 todo incluido para la mayor\'eda de casos. Cargo bike trasera desde CHF 119 \'b7 E-bike motor trasero desde CHF 109.',\
      waZoneMsg:(zname,areas)=>`Hola VELOV, \'a1necesito asistencia!\\n\'95 Ubicaci\'f3n: $\{zname\} ($\{areas.slice(0,2).join(', ')\} \'85)\\n\'95 Problema: Pinchazo / aver\'eda\\n\'bfPod\'e9is venir?`,\
      inclLabel:'Todo Incluido',\
      inclTitle:'\'bfQu\'e9 est\'e1 incluido en el precio de CHF 99?',\
      inclSub:'Todo lo que un pinchazo realmente necesita. Pagas exactamente CHF 99 \'97 precio fijo, sin sorpresas.',\
      tiersLabel:'Precios por tipo de bici',\
      tiersTitle:'Precios fijos transparentes para Z\'farich',\
      tiersSub:'Para el 99% de nuestras intervenciones se aplica CHF 99. Un peque\'f1o suplemento solo es justo para cargo bike rueda trasera o e-bike con motor en buje.',\
      tierFrom:'desde',\
      stepsLabel:'C\'f3mo funciona',\
      stepsTitle:'As\'ed de r\'e1pido va',\
      faqLabel2:'FAQ',\
      faqTitle:'Preguntas frecuentes sobre la asistencia',\
      ctaTitle:'\'bfPinchazo? Llama ahora o escr\'edbenos por WhatsApp.',\
      ctaBody:'CHF 99 todo incluido en Z\'farich. Intentamos venir a cualquier hora \'97 a menudo en 45 minutos en la ciudad.',\
      ctaFooter:'Servicio de asistencia m\'f3vil para bicis, e-bikes y cargo bikes en Z\'farich'\
    \},\
    included:[\
      \{icon:'\uc0\u55357 \u56976 ',title:'Desplazamiento',        desc:'Vamos a ti en bici o cargo bike \'97 en cualquier parte de Z\'farich.'\},\
      \{icon:'\uc0\u55357 \u56589 ',title:'Diagn\'f3stico in situ',    desc:'Encontramos el problema de inmediato \'97 explicado de forma transparente.'\},\
      \{icon:'\uc0\u55357 \u57054 ',title:'C\'e1mara nueva',           desc:'C\'e1mara de repuesto de calidad para tu bici \'97 incluida.'\},\
      \{icon:'\uc0\u55357 \u56615 ',title:'Montaje',                desc:'Montaje profesional del neum\'e1tico, correctamente montado y alineado.'\},\
      \{icon:'\uc0\u55357 \u56488 ',title:'Ambos neum\'e1ticos',       desc:'Inflamos ambos neum\'e1ticos a la presi\'f3n \'f3ptima.'\},\
      \{icon:'\uc0\u55357 \u57058 \u65039 ',title:'Lubricaci\'f3n cadena',     desc:'Cadena limpiada y lubricada \'97 ruedas como nueva.'\}\
    ],\
    tiers:[\
      \{badge:'Est\'e1ndar',      title:'Bicis est\'e1ndar \'97 Rueda delantera o trasera', price:99,  desc:'Aplicable a todas las bicis de ciudad, carretera, gravel y trekking.',\
       list:['Todas las ruedas delanteras de todas las bicis','Rueda trasera de bicis cl\'e1sicas','Todos los elementos del paquete todo incluido','Precio fijo \'97 sin sorpresas']\},\
      \{badge:'E-bike trasera',title:'E-bike con motor en buje trasero',            price:109, desc:'Suplemento por desmontaje del motor / eje pasante trasero.',\
       list:['Bosch, Shimano, Bafang, FAZUA, Brose, Yamaha','Trabajo adicional por el motor en buje','Herramientas especiales incluidas','Solo trabajo mec\'e1nico \'97 sin servicio bater\'eda/electr\'f3nica']\},\
      \{badge:'Cargo bike',    title:'Cargo bike \'97 Rueda trasera',                  price:119, desc:'Ruedas m\'e1s grandes, construcci\'f3n m\'e1s pesada, m\'e1s tiempo.',\
       list:['Riese & M\'fcller, Ca Go, Urban Arrow, Tern, Yuba, Babboe, Bullitt etc.','Desmontaje rueda trasera m\'e1s largo','Herramientas especiales para ejes anchos','Todos los elementos del paquete todo incluido']\}\
    ],\
    steps:[\
      \{n:1, t:'WhatsApp o llama',               d:'Dinos d\'f3nde est\'e1s y qu\'e9 pasa. Respuesta en minutos.'\},\
      \{n:2, t:'Foto / v\'eddeo (opcional)',          d:'Manda una foto de la bici/da\'f1o \'97 traeremos las piezas correctas.'\},\
      \{n:3, t:'Vamos a donde est\'e1s',             d:'En la ciudad de Z\'farich a menudo en 45 minutos. Vamos en bici & cargo bike.'\},\
      \{n:4, t:'Reparada y de nuevo en marcha',   d:'Reparada in situ, neum\'e1ticos inflados, cadena lubricada \'97 \'a1a rodar!'\}\
    ],\
    faqs:[\
      \{q:'\'bfCHF 99 es realmente todo incluido?', a:'S\'ed. CHF 99 incluye desplazamiento, diagn\'f3stico, c\'e1mara nueva, montaje, inflado y lubricaci\'f3n cadena. Sin costes ocultos.'\},\
      \{q:'\'bfCu\'e1ndo cuesta m\'e1s de CHF 99?', a:'Solo para cargo bike rueda trasera (desde CHF 119) o e-bike motor buje trasero (desde CHF 109). Las ruedas delanteras siempre son CHF 99.'\},\
      \{q:'\'bfCon qu\'e9 rapidez lleg\'e1is?', a:'En la ciudad de Z\'farich normalmente en 45 minutos \'97 a menudo antes. \'c1rea metropolitana 55\'9665 minutos.'\},\
      \{q:'\'bfEst\'e1is disponibles 24 horas?', a:'Intentamos estar disponibles en todo momento. Escribidnos por WhatsApp a cualquier hora, incluso noches y fines de semana.'\},\
      \{q:'\'bfRepar\'e1is la electr\'f3nica de e-bike?', a:'No. VELOV repara \'fanicamente piezas mec\'e1nicas. Bater\'eda, pantalla y electr\'f3nica del motor no forman parte de nuestro servicio.'\},\
      \{q:'\'bfTengo que estar presente?', a:'No \'97 si la bici est\'e1 accesible en el exterior, reparamos sin ti. Pago con TWINT tras confirmaci\'f3n por foto.'\},\
      \{q:'\'bfC\'f3mo pago?', a:'TWINT, efectivo o factura. Precio fijo transparente antes de la reparaci\'f3n.'\},\
      \{q:'\'bfQu\'e9 bicis repar\'e1is?', a:'Bicis de ciudad, carretera, gravel, MTB, trekking, e-bikes de todas las marcas, cargo bikes de todas las marcas \'97 todo lo que sea mec\'e1nico.'\}\
    ]\
  \}\
\};\
\
/* ===================================================================\
   LANGUAGE DETECTION (same logic as velov-home-UNIFIED.js)\
   =================================================================== */\
function detectVpLang()\{\
  try\{ if(window.wixDevelopersAnalytics&&window.wixDevelopersAnalytics.currentLanguage) return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2); \}catch(e)\{\}\
  try\{ var dl=document.documentElement.lang||''; if(dl) return dl.toLowerCase().substring(0,2); \}catch(e)\{\}\
  try\{ var m=window.location.pathname.match(/^\\/(en|fr|it|es)(\\/|$)/i); if(m) return m[1].toLowerCase(); \}catch(e)\{\}\
  try\{ var nav=(navigator.language||'de').toLowerCase().substring(0,2); if(['en','fr','it','es'].includes(nav)) return nav; \}catch(e)\{\}\
  return 'de';\
\}\
\
/* ===================================================================\
   CUSTOM ELEMENT\
   =================================================================== */\
class VelovPannendienst extends HTMLElement \{\
  constructor()\{\
    super();\
    this.state=\{zone:null,openFaq:null\};\
    this._lang=detectVpLang();\
    if(!VP_LANG[this._lang]) this._lang='de';\
  \}\
\
  get L()\{ return VP_LANG[this._lang]; \}\
  get UI()\{ return this.L.ui; \}\
\
  connectedCallback()\{\
    try\{ window.__velovSeoHelper&&window.__velovSeoHelper.injectSeo(this,this.L.seo,this.UI.faqLabel,this.UI.contactLabel); \}catch(e)\{\}\
    try\{ window.__velovTracker&&window.__velovTracker.bind(this,this._lang); \}catch(e)\{\}\
    this.injectStyles();\
    this.render();\
  \}\
\
  injectStyles()\{\
    if(document.getElementById('velov-pannendienst-styles')) return;\
    const s=document.createElement('style');\
    s.id='velov-pannendienst-styles';\
    s.textContent=`\
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');\
    velov-pannendienst\{--purple:#7B68EE;--purple-dark:#6354d4;--orange:#E8573A;--dark:#2D2B3D;--warm-bg:#F5F0EB;--white:#fff;--text:#2D2B3D;--muted:#6B6880;--border:#E8E4DF;--green:#4CAF50;\
      display:block;font-family:'DM Sans',system-ui,sans-serif;color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased\}\
    velov-pannendienst *\{margin:0;padding:0;box-sizing:border-box\}\
    velov-pannendienst .vp-container\{max-width:1100px;margin:0 auto;padding:0 24px\}\
    velov-pannendienst section\{padding:96px 0\}\
    velov-pannendienst .vp-label\{font-size:12px;font-weight:700;color:var(--purple);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px\}\
    velov-pannendienst .vp-title\{font-size:clamp(24px,3vw,36px);font-weight:800;color:var(--dark);margin-bottom:14px;line-height:1.2\}\
    velov-pannendienst .vp-sub\{font-size:16px;color:var(--muted);max-width:620px;line-height:1.6\}\
    /* HERO */\
    velov-pannendienst .vp-hero\{background:linear-gradient(135deg,var(--dark),#1a1833);color:white;padding:96px 0 120px;text-align:center;position:relative;overflow:hidden\}\
    velov-pannendienst .vp-hero::after\{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--white);clip-path:ellipse(55% 100% at 50% 100%)\}\
    velov-pannendienst .vp-hero::before\{content:'';position:absolute;top:-80px;left:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(232,87,58,.25),transparent 70%);border-radius:50%\}\
    velov-pannendienst .vp-hero-inner\{position:relative;z-index:1\}\
    velov-pannendienst .vp-live\{display:inline-flex;align-items:center;gap:8px;background:rgba(76,175,80,.18);border:1px solid rgba(76,175,80,.45);color:#a7e9a9;font-size:13px;font-weight:700;padding:8px 18px;border-radius:50px;margin-bottom:20px;text-transform:uppercase;letter-spacing:.5px\}\
    velov-pannendienst .vp-live-dot\{width:8px;height:8px;background:var(--green);border-radius:50%;animation:vpulse 1.8s infinite\}\
    @keyframes vpulse\{0%,100%\{opacity:1;transform:scale(1)\}50%\{opacity:.5;transform:scale(1.4)\}\}\
    velov-pannendienst .vp-hero h1\{font-size:clamp(32px,5vw,52px);font-weight:800;line-height:1.1;margin-bottom:10px\}\
    velov-pannendienst .vp-hero .vp-subt\{font-size:20px;opacity:.85;margin-bottom:16px\}\
    velov-pannendienst .vp-price-hero\{display:inline-block;background:var(--orange);color:white;font-size:48px;font-weight:800;padding:18px 42px;border-radius:20px;margin:20px 0;line-height:1\}\
    velov-pannendienst .vp-price-hero small\{font-size:16px;font-weight:500;display:block;margin-top:4px;opacity:.95\}\
    velov-pannendienst .vp-hero-ctas\{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:16px\}\
    velov-pannendienst .vp-hero-cta\{display:inline-block;background:var(--purple);color:white;text-decoration:none;font-size:18px;font-weight:700;padding:18px 40px;border-radius:50px;transition:all .2s\}\
    velov-pannendienst .vp-hero-cta:hover\{background:var(--purple-dark);transform:translateY(-2px)\}\
    velov-pannendienst .vp-hero-cta.wa\{background:#25D366\}\
    velov-pannendienst .vp-hero-cta.wa:hover\{background:#1fb855\}\
    velov-pannendienst .vp-hero-note\{font-size:13px;opacity:.7;margin-top:18px\}\
    /* BOOKER */\
    velov-pannendienst .vp-booker\{background:var(--white)\}\
    velov-pannendienst .vp-booker-card\{max-width:860px;margin:44px auto 0;background:var(--warm-bg);border-radius:28px;padding:48px;box-shadow:0 16px 40px rgba(45,43,61,.06);border:1px solid var(--border)\}\
    velov-pannendienst .vp-bk-step\{font-size:13px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px\}\
    velov-pannendienst .vp-bk-q\{font-size:22px;font-weight:700;color:var(--dark);margin-bottom:24px\}\
    velov-pannendienst .vp-zones\{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:8px\}\
    velov-pannendienst .vp-zone\{background:var(--white);border:2px solid var(--border);border-radius:14px;padding:18px 14px;cursor:pointer;transition:all .2s;font-family:inherit;text-align:left\}\
    velov-pannendienst .vp-zone:hover\{border-color:var(--purple);transform:translateY(-2px);box-shadow:0 8px 20px rgba(123,104,238,.12)\}\
    velov-pannendienst .vp-zone.sel\{border-color:var(--purple);background:var(--purple);color:white\}\
    velov-pannendienst .vp-zone-name\{font-weight:800;font-size:15px;margin-bottom:4px\}\
    velov-pannendienst .vp-zone-eta\{font-size:12px;opacity:.75\}\
    velov-pannendienst .vp-zone-areas\{font-size:11px;opacity:.65;margin-top:6px;line-height:1.3\}\
    velov-pannendienst .vp-eta\{margin-top:28px;padding:26px;background:var(--white);border-radius:16px;border-left:6px solid var(--green);animation:vfadeIn .4s ease\}\
    @keyframes vfadeIn\{from\{opacity:0;transform:translateY(8px)\}to\{opacity:1;transform:translateY(0)\}\}\
    velov-pannendienst .vp-eta h4\{font-size:17px;font-weight:800;color:var(--dark);margin-bottom:4px\}\
    velov-pannendienst .vp-eta-big\{font-size:36px;font-weight:800;color:var(--purple);line-height:1;margin:8px 0\}\
    velov-pannendienst .vp-eta-row\{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap\}\
    velov-pannendienst .vp-eta-cta\{background:var(--green);color:white;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:700;transition:all .2s;white-space:nowrap;font-size:15px\}\
    velov-pannendienst .vp-eta-cta:hover\{background:#3d8b40;transform:translateY(-2px)\}\
    velov-pannendienst .vp-eta-note\{font-size:13px;color:var(--muted);margin-top:10px\}\
    /* INCLUDED */\
    velov-pannendienst .vp-inc-grid\{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:48px\}\
    velov-pannendienst .vp-inc\{background:var(--warm-bg);border-radius:16px;padding:32px 24px;text-align:center;transition:transform .2s\}\
    velov-pannendienst .vp-inc:hover\{transform:translateY(-3px)\}\
    velov-pannendienst .vp-inc-icon\{font-size:36px;margin-bottom:12px\}\
    velov-pannendienst .vp-inc h3\{font-size:16px;font-weight:700;margin-bottom:6px;color:var(--dark)\}\
    velov-pannendienst .vp-inc p\{font-size:14px;color:var(--muted)\}\
    /* TIERS */\
    velov-pannendienst .vp-tiers\{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:48px\}\
    velov-pannendienst .vp-tier\{background:var(--white);border:2px solid var(--border);border-radius:20px;padding:32px 26px;transition:all .2s\}\
    velov-pannendienst .vp-tier:hover\{border-color:var(--purple);transform:translateY(-4px);box-shadow:0 12px 32px rgba(123,104,238,.1)\}\
    velov-pannendienst .vp-tier-badge\{display:inline-block;background:var(--purple);color:white;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding:4px 10px;border-radius:8px;margin-bottom:14px\}\
    velov-pannendienst .vp-tier h3\{font-size:18px;font-weight:800;color:var(--dark);margin-bottom:6px;line-height:1.3\}\
    velov-pannendienst .vp-tier-desc\{font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.5\}\
    velov-pannendienst .vp-tier-price\{font-size:36px;font-weight:800;color:var(--orange);line-height:1;margin-bottom:18px\}\
    velov-pannendienst .vp-tier-price small\{font-size:14px;font-weight:600;color:var(--muted);margin-left:4px\}\
    velov-pannendienst .vp-tier ul\{list-style:none;padding:0;margin:0\}\
    velov-pannendienst .vp-tier li\{font-size:14px;color:var(--text);padding:6px 0 6px 22px;position:relative;line-height:1.45\}\
    velov-pannendienst .vp-tier li::before\{content:'\uc0\u10003 ';position:absolute;left:0;color:var(--green);font-weight:800\}\
    /* STEPS */\
    velov-pannendienst .vp-steps\{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;margin-top:52px\}\
    velov-pannendienst .vp-step\{text-align:center\}\
    velov-pannendienst .vp-step-num\{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:var(--purple);color:white;font-size:20px;font-weight:800;border-radius:50%;margin-bottom:16px\}\
    velov-pannendienst .vp-step h3\{font-size:17px;font-weight:700;margin-bottom:6px;color:var(--dark)\}\
    velov-pannendienst .vp-step p\{font-size:14px;color:var(--muted)\}\
    /* FAQ */\
    velov-pannendienst .vp-faq\{max-width:760px;margin:52px auto 0\}\
    velov-pannendienst .vp-faq-item\{border-bottom:1px solid var(--border);padding:20px 0\}\
    velov-pannendienst .vp-faq-q\{font-weight:700;cursor:pointer;font-size:16px;display:flex;justify-content:space-between;align-items:center;color:var(--dark);background:none;border:none;width:100%;text-align:left;font-family:inherit;padding:0\}\
    velov-pannendienst .vp-faq-q::after\{content:'+';font-size:20px;color:var(--purple);transition:transform .2s\}\
    velov-pannendienst .vp-faq-item.open .vp-faq-q::after\{content:'\uc0\u8722 '\}\
    velov-pannendienst .vp-faq-a\{font-size:14px;color:var(--muted);line-height:1.6;padding-top:12px;display:none\}\
    velov-pannendienst .vp-faq-item.open .vp-faq-a\{display:block;animation:vfadeIn .3s ease\}\
    /* CTA */\
    velov-pannendienst .vp-cta\{background:var(--orange);color:white;text-align:center;padding:96px 0\}\
    velov-pannendienst .vp-cta h2\{font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:14px\}\
    velov-pannendienst .vp-cta p\{font-size:17px;opacity:.95;margin-bottom:30px;max-width:520px;margin-left:auto;margin-right:auto\}\
    velov-pannendienst .vp-btn-dark\{display:inline-block;background:var(--dark);color:white;text-decoration:none;font-weight:700;padding:16px 40px;border-radius:50px;font-size:17px;transition:all .2s;margin:6px\}\
    velov-pannendienst .vp-btn-dark:hover\{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.3)\}\
    velov-pannendienst .vp-btn-wa\{display:inline-block;background:#25D366;color:white;text-decoration:none;font-weight:700;padding:16px 40px;border-radius:50px;font-size:17px;transition:all .2s;margin:6px\}\
    velov-pannendienst .vp-btn-wa:hover\{transform:translateY(-2px);box-shadow:0 8px 20px rgba(37,211,102,.4)\}\
    velov-pannendienst .vp-cta-contact\{margin-top:26px;font-size:14px;opacity:.8\}\
    velov-pannendienst .vp-cta-contact a\{color:white;text-decoration:underline\}\
    @media(max-width:768px)\{\
      velov-pannendienst section\{padding:64px 0\}\
      velov-pannendienst .vp-hero\{padding:64px 0 90px\}\
      velov-pannendienst .vp-price-hero\{font-size:36px;padding:12px 28px\}\
      velov-pannendienst .vp-zones\{grid-template-columns:1fr 1fr\}\
      velov-pannendienst .vp-booker-card\{padding:28px 20px\}\
      velov-pannendienst .vp-eta-row\{flex-direction:column;align-items:flex-start\}\
      velov-pannendienst .vp-eta-cta\{width:100%;text-align:center\}\
      velov-pannendienst .vp-inc-grid\{grid-template-columns:1fr 1fr\}\
      velov-pannendienst .vp-tiers\{grid-template-columns:1fr\}\
    \}`;\
    document.head.appendChild(s);\
  \}\
\
  render()\{\
    const L=this.L, UI=this.UI, C=VP_CONTACT;\
    this.innerHTML=`\
      <section class="vp-hero">\
        <div class="vp-container vp-hero-inner">\
          <div class="vp-live"><span class="vp-live-dot"></span><span>$\{UI.liveBadge\}</span></div>\
          <div style="font-size:56px;margin-bottom:4px">\uc0\u55357 \u56615 </div>\
          <h1>$\{UI.heroH1\}</h1>\
          <p class="vp-subt">$\{UI.heroSub\}</p>\
          <div class="vp-price-hero">CHF 99<small>$\{UI.priceTagline\}</small></div>\
          <div class="vp-hero-ctas">\
            <a href="tel:$\{C.phone\}" class="vp-hero-cta">$\{UI.ctaPhone\}</a>\
            <a href="https://wa.me/$\{C.waNumber\}?text=$\{encodeURIComponent(UI.waHeroMsg)\}" class="vp-hero-cta wa" target="_blank" rel="noopener">$\{UI.ctaWa\}</a>\
          </div>\
          <div class="vp-hero-note">$\{UI.heroNote\}</div>\
        </div>\
      </section>\
\
      <section class="vp-booker">\
        <div class="vp-container">\
          <div style="text-align:center">\
            <div class="vp-label">$\{UI.bookerLabel\}</div>\
            <div class="vp-title">$\{UI.bookerTitle\}</div>\
            <p class="vp-sub" style="margin:0 auto">$\{UI.bookerSub\}</p>\
          </div>\
          <div class="vp-booker-card">\
            <div class="vp-bk-step">$\{UI.bookerStep\}</div>\
            <div class="vp-bk-q">$\{UI.bookerQ\}</div>\
            <div class="vp-zones" id="vp-zones">\
              $\{VP_ZONES.map(z=>`\
                <button class="vp-zone" data-id="$\{z.id\}">\
                  <div class="vp-zone-name">$\{z.name\}</div>\
                  <div class="vp-zone-eta">~$\{z.eta\} $\{UI.etaUnit\}</div>\
                  <div class="vp-zone-areas">$\{z.areas.slice(0,3).join(', ')\}$\{z.areas.length>3?'\'85':''\}</div>\
                </button>`).join('')\}\
            </div>\
            <div id="vp-eta-box"></div>\
          </div>\
        </div>\
      </section>\
\
      <section style="background:var(--warm-bg)">\
        <div class="vp-container">\
          <div style="text-align:center">\
            <div class="vp-label">$\{UI.inclLabel\}</div>\
            <div class="vp-title">$\{UI.inclTitle\}</div>\
            <p class="vp-sub" style="margin:0 auto">$\{UI.inclSub\}</p>\
          </div>\
          <div class="vp-inc-grid">\
            $\{L.included.map(i=>`\
              <div class="vp-inc">\
                <div class="vp-inc-icon">$\{i.icon\}</div>\
                <h3>$\{i.title\}</h3>\
                <p>$\{i.desc\}</p>\
              </div>`).join('')\}\
          </div>\
        </div>\
      </section>\
\
      <section style="background:var(--white)">\
        <div class="vp-container">\
          <div style="text-align:center">\
            <div class="vp-label">$\{UI.tiersLabel\}</div>\
            <div class="vp-title">$\{UI.tiersTitle\}</div>\
            <p class="vp-sub" style="margin:0 auto">$\{UI.tiersSub\}</p>\
          </div>\
          <div class="vp-tiers">\
            $\{L.tiers.map(t=>`\
              <div class="vp-tier">\
                <span class="vp-tier-badge">$\{t.badge\}</span>\
                <h3>$\{t.title\}</h3>\
                <p class="vp-tier-desc">$\{t.desc\}</p>\
                <div class="vp-tier-price">CHF $\{t.price\}<small>$\{UI.tierFrom\}</small></div>\
                <ul>$\{t.list.map(li=>`<li>$\{li\}</li>`).join('')\}</ul>\
              </div>`).join('')\}\
          </div>\
        </div>\
      </section>\
\
      <section style="background:var(--warm-bg)">\
        <div class="vp-container">\
          <div style="text-align:center">\
            <div class="vp-label">$\{UI.stepsLabel\}</div>\
            <div class="vp-title">$\{UI.stepsTitle\}</div>\
          </div>\
          <div class="vp-steps">\
            $\{L.steps.map(s=>`\
              <div class="vp-step">\
                <div class="vp-step-num">$\{s.n\}</div>\
                <h3>$\{s.t\}</h3>\
                <p>$\{s.d\}</p>\
              </div>`).join('')\}\
          </div>\
        </div>\
      </section>\
\
      <section style="background:var(--white)">\
        <div class="vp-container">\
          <div style="text-align:center">\
            <div class="vp-label">$\{UI.faqLabel2\}</div>\
            <div class="vp-title">$\{UI.faqTitle\}</div>\
          </div>\
          <div class="vp-faq" id="vp-faq">\
            $\{L.faqs.map((f,i)=>`\
              <div class="vp-faq-item" data-i="$\{i\}">\
                <button class="vp-faq-q" aria-expanded="false" aria-controls="vp-a-$\{i\}">$\{f.q\}</button>\
                <div class="vp-faq-a" id="vp-a-$\{i\}">$\{f.a\}</div>\
              </div>`).join('')\}\
          </div>\
        </div>\
      </section>\
\
      <section class="vp-cta">\
        <div class="vp-container">\
          <h2>$\{UI.ctaTitle\}</h2>\
          <p>$\{UI.ctaBody\}</p>\
          <a href="tel:$\{C.phone\}" class="vp-btn-dark">\uc0\u55357 \u56542  $\{C.phoneDisplay\}</a>\
          <a href="https://wa.me/$\{C.waNumber\}" class="vp-btn-wa" target="_blank" rel="noopener">\uc0\u55357 \u56492  WhatsApp</a>\
          <div class="vp-cta-contact">\
            <a href="mailto:$\{C.email\}">$\{C.email\}</a> \'b7 $\{UI.ctaFooter\}\
          </div>\
        </div>\
      </section>\
    `;\
    this.querySelectorAll('.vp-zone').forEach(b=>\{\
      b.addEventListener('click',()=>this.pickZone(b.dataset.id));\
    \});\
    this.bindFaq();\
  \}\
\
  pickZone(id)\{\
    const UI=this.UI, C=VP_CONTACT;\
    this.state.zone=id;\
    this.querySelectorAll('.vp-zone').forEach(el=>el.classList.toggle('sel',el.dataset.id===id));\
    const z=VP_ZONES.find(x=>x.id===id);\
    const box=this.querySelector('#vp-eta-box');\
    const waMsg=UI.waZoneMsg(z.name,z.areas);\
    box.innerHTML=`\
      <div class="vp-eta">\
        <div class="vp-eta-row">\
          <div>\
            <h4>$\{z.name\}</h4>\
            <div class="vp-eta-big">~$\{z.eta\} min</div>\
            <div style="font-size:14px;color:var(--muted);font-weight:600">$\{UI.etaArrival\}</div>\
          </div>\
          <a class="vp-eta-cta" href="https://wa.me/$\{C.waNumber\}?text=$\{encodeURIComponent(waMsg)\}" target="_blank" rel="noopener">\
            $\{UI.etaBookBtn\}\
          </a>\
        </div>\
        <div class="vp-eta-note">$\{UI.etaPriceNote\}</div>\
      </div>`;\
  \}\
\
  bindFaq()\{\
    this.querySelectorAll('.vp-faq-item').forEach(item=>\{\
      const btn=item.querySelector('.vp-faq-q');\
      btn.addEventListener('click',()=>\{\
        const i=+item.dataset.i;\
        const open=this.state.openFaq===i;\
        this.querySelectorAll('.vp-faq-item').forEach(el=>\{\
          el.classList.remove('open');\
          el.querySelector('.vp-faq-q').setAttribute('aria-expanded','false');\
        \});\
        if(!open)\{\
          item.classList.add('open');\
          btn.setAttribute('aria-expanded','true');\
          this.state.openFaq=i;\
        \} else \{\
          this.state.openFaq=null;\
        \}\
      \});\
    \});\
  \}\
\}\
\
if(!customElements.get('velov-pannendienst'))\{\
  customElements.define('velov-pannendienst',VelovPannendienst);\
\}}