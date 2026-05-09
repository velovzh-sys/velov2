/* ===================================================================
   VELOV — UNIFIED Multilingual Locations Custom Element
   Languages: de (primary) · en · fr · it · es
   Tag: <velov-locations>

   PROVEN WORKING PATTERN:
   ✅ CSS targets .vl-wrap — NOT velov-locations tag
   ✅ No @import — Google Fonts via <link>
   ✅ No nested backticks — string concatenation only
   ✅ .vl-wrap has background:#F5F0EB + min-height:200px in CSS
   ✅ display:block + background + overflow:visible on connectedCallback
   ✅ const at top level
   ✅ _fixHeight() + ResizeObserver + 3 timers
   ✅ All 5 languages: zones, stories, services, FAQs, WhatsApp messages
   ✅ Zürich personality: real neighbourhood stories, local humour,
      landmarks, Züri-Deutsch flavour in DE, localised fun in EN/FR/IT/ES
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
      var ctx={page_component:host.tagName.toLowerCase(),page_path:(typeof location!=='undefined'?location.pathname:''),language:lang||'de'};
      if(/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href)) pushEvent('whatsapp_click',Object.assign({link_url:href,link_text:label},ctx));
      else if(/^tel:/i.test(href)) pushEvent('phone_click',Object.assign({link_url:href,link_text:label},ctx));
    },{passive:true,capture:true});
  }
  window.__velovTracker={bind:bind,pushEvent:pushEvent};
})();

/* ===================================================================
   SHARED CONSTANTS
=================================================================== */
const VL_CONTACT = {
  phone: '+41762352126',
  phoneDisplay: '+41 76 235 21 26',
  waNumber: '41762352126',
  email: 'info@velov.ch'
};

/* Zones — names are Zürich local names, stay consistent across languages.
   Each zone has a story: a real Zürich landmark / moment for the fun factor */
const VL_ZONES = [
  /* CITY */
  { slug:'enge',             name:'Enge',             type:'city',   eta:35, landmark:'Bürkliplatz', storyKey:'enge' },
  { slug:'wollishofen',      name:'Wollishofen',      type:'city',   eta:40, landmark:'Zürichsee',  storyKey:'wollishofen' },
  { slug:'leimbach',         name:'Leimbach',         type:'city',   eta:45, landmark:'Allmend',    storyKey:'leimbach' },
  { slug:'wiedikon',         name:'Wiedikon',         type:'city',   eta:35, landmark:'Schmiede Wiedikon', storyKey:'wiedikon' },
  { slug:'aussersihl',       name:'Aussersihl',       type:'city',   eta:30, landmark:'Langstrasse', storyKey:'aussersihl' },
  { slug:'industriequartier',name:'Industriequartier',type:'city',   eta:30, landmark:'Prime Tower', storyKey:'industriequartier' },
  { slug:'schwamendingen',   name:'Schwamendingen',   type:'city',   eta:50, landmark:'Schwamendingerplatz', storyKey:'schwamendingen' },
  { slug:'oerlikon',         name:'Oerlikon',         type:'city',   eta:40, landmark:'MFO-Park',   storyKey:'oerlikon' },
  { slug:'hoengg',           name:'Höngg',            type:'city',   eta:45, landmark:'Wipkingerpark', storyKey:'hoengg' },
  { slug:'affoltern',        name:'Affoltern',        type:'city',   eta:50, landmark:'Affoltern Dorfkern', storyKey:'affoltern' },
  { slug:'seefeld',          name:'Seefeld',          type:'city',   eta:35, landmark:'Opernhaus',  storyKey:'seefeld' },
  { slug:'witikon',          name:'Witikon',          type:'city',   eta:55, landmark:'Zürichberg', storyKey:'witikon' },
  { slug:'hirslanden',       name:'Hirslanden',       type:'city',   eta:40, landmark:'Klinik Hirslanden', storyKey:'hirslanden' },
  /* UMLAND */
  { slug:'schlieren',        name:'Schlieren',        type:'umland', eta:55, landmark:'Zentrum Schlieren', storyKey:'schlieren' },
  { slug:'kilchberg',        name:'Kilchberg',        type:'umland', eta:60, landmark:'Lindt Schokolade',  storyKey:'kilchberg' },
  { slug:'ruemlang',         name:'Rümlang',          type:'umland', eta:65, landmark:'Flughafen',  storyKey:'ruemlang' },
  { slug:'opfikon',          name:'Opfikon',          type:'umland', eta:60, landmark:'Glattpark',  storyKey:'opfikon' },
  { slug:'glattbrugg',       name:'Glattbrugg',       type:'umland', eta:65, landmark:'Shoppi Tivoli', storyKey:'glattbrugg' },
  { slug:'wallisellen',      name:'Wallisellen',      type:'umland', eta:65, landmark:'Dietlikon',  storyKey:'wallisellen' },
  { slug:'zollikon',         name:'Zollikon',         type:'umland', eta:55, landmark:'Zürichsee Ufer', storyKey:'zollikon' },
  { slug:'horgen',           name:'Horgen',           type:'umland', eta:75, landmark:'Dampfschiff', storyKey:'horgen' },
  { slug:'thalwil',          name:'Thalwil',          type:'umland', eta:70, landmark:'Thalwil Badi', storyKey:'thalwil' }
];

/* ===================================================================
   LANGUAGE DETECTION
=================================================================== */
function detectVlLang(){
  try{ if(window.wixDevelopersAnalytics&&window.wixDevelopersAnalytics.currentLanguage) return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2); }catch(e){}
  try{ var dl=document.documentElement.lang||''; if(dl) return dl.toLowerCase().substring(0,2); }catch(e){}
  try{ var m=window.location.pathname.match(/^\/(en|fr|it|es)(\/|$)/i); if(m) return m[1].toLowerCase(); }catch(e){}
  try{ var nav=(navigator.language||'de').toLowerCase().substring(0,2); if(['en','fr','it','es'].indexOf(nav)>-1) return nav; }catch(e){}
  return 'de';
}

/* ===================================================================
   MULTILINGUAL CONTENT
=================================================================== */
const VL_LANG = {

  /* ── DEUTSCH ── */
  de: {
    seo: {
      id:'locations-de',
      h1:'VELOV Standorte Zürich – mobile Velowerkstatt in allen Quartieren',
      intro:'VELOV bedient alle 12 Zürcher Stadtkreise und die Agglomeration. 100% mobil — wir kommen direkt zu dir. Reaktionszeit 30–75 Minuten je nach Quartier.',
      sections:[
        {h2:'Stadt Zürich — alle 12 Kreise', body:'Wir kommen in jeden Zürcher Stadtkreis. Anfahrt im Stadtgebiet CHF 49. Reaktionszeit in der Regel unter 45 Minuten.'},
        {h2:'Agglomeration & Umland', body:'Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil. Anfahrt-Aufschlag CHF 20 je nach Distanz.'}
      ],
      faqs:[
        {q:'Bedient ihr auch ausserhalb der Stadt?', a:'Ja, mit kleinem Anfahrts-Aufschlag von CHF 20.'},
        {q:'Habt ihr einen festen Laden?', a:'Nein — 100% mobil. Wir kommen zu dir, wo du bist.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema:[
        {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Velowerkstatt Zürich","url":"https://www.velov.ch/standorte","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zürich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"areaServed":[{"@type":"City","name":"Zürich"},{"@type":"AdministrativeArea","name":"Kanton Zürich"}],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"de","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch"},{"@type":"ListItem","position":2,"name":"Standorte","item":"https://www.velov.ch/standorte"}]}
      ]
    },
    ui:{
      faqLabel:'Häufige Fragen', contactLabel:'Kontakt',
      heroBadge:'22+ Quartiere · Ganz Zürich',
      heroH1:'Zürichs schnellste mobile Velowerkstatt.',
      heroSub:'Platten in Wiedikon? Velo hin in Oerlikon? Bremse versagt am Bürkliplatz? Wir kommen. Überall in Zürich. Meistens schneller als du eine freie Werkstatt findest.',
      heroStats:[
        {num:'22+', label:'Quartiere'},
        {num:'4.8 ⭐', label:'Google'},
        {num:'≤45 Min', label:'Reaktion Stadt'},
        {num:'CHF 49', label:'Anfahrt fix'}
      ],
      pickerTitle:'📍 Wähl dis Quartier — mir sägeds dir sofort',
      pickerLead:'Klick auf dein Quartier oder such direkt. Du kriegst deine persönliche Reaktionszeit und einen direkten WhatsApp-Link.',
      searchPlaceholder:'z. B. Oerlikon, Wiedikon, Schlieren...',
      filterAll:'Alle',
      filterCity:'Stadt Zürich',
      filterUmland:'Umland',
      etaLabel:'Reaktionszeit ab Nachricht:',
      etaUnit:'Minuten',
      resultBookBtn: function(name){ return 'Jetzt in '+name+' buchen →'; },
      waZoneMsg: function(name){ return 'Hi VELOV! Ich bin in '+name+' und brauche eine Velo-Reparatur. Wann kannst du da sein?'; },
      storiesTitle:'Züri-Geschichten 🚴‍♂️',
      storiesLead:'Wir kennen jeden Kopfsteinpflaster. Jede Tramschiene. Jede Steigung. Kurz: wir sind Züri.',
      servicesTitle:'Unsere Services — überall gleich',
      benefitsTitle:'Warum VELOV?',
      ctaTitle:'Bereit, dein Velo reparieren zu lassen?',
      ctaBody:'Same-day verfügbar. Wir kommen zu dir — in ganz Zürich & Umgebung.',
      ctaBtn:'→ Jetzt per WhatsApp buchen',
      orCall:'oder ruf an:',
      waMainMsg:'Hi VELOV, ich brauche eine Reparatur in Zürich. Kannst du mir helfen?',
      cityBadge:'🏢 Stadt',
      umlandBadge:'🏘️ Umland',
      minuteUnit:'Min'
    },
    services:[
      {emoji:'🛞', name:'Platten Reparatur',  price:'99',  time:'30 Min'},
      {emoji:'🔧', name:'Standard Service',   price:'179', time:'60–90 Min'},
      {emoji:'🆘', name:'Notfall-Service',    price:'99',  time:'30–60 Min'},
      {emoji:'⚡', name:'E-Bike Service',     price:'179', time:'60–90 Min'}
    ],
    benefits:[
      {emoji:'⚡', title:'Blitzschnell',    text:'Oft unter 45 Minuten in der Stadt. Same-day Buchung. 7 Tage die Woche.'},
      {emoji:'📍', title:'100% Mobil',      text:'Wir kommen zu dir — Haustür, Büro, Bahnhof. Kein Schleppen, kein Transport.'},
      {emoji:'💯', title:'Professionell',   text:'Ausgebildete Mechaniker. Alle Velo-Typen. Festpreise, keine Überraschungen.'},
      {emoji:'💰', title:'Transparent',     text:'Preis vor Buchung bekannt. TWINT, Bar oder Rechnung. Einfach & ehrlich.'}
    ],
    /* Zone stories — Zürich personality, local references, fun */
    stories:{
      enge:             {title:'Enge & Bürkliplatz', story:'Am Bürkliplatz wissen alle: Zürich fährt Velo. Und wenn dann die Tramschiene den Reifen erwischt — wir sind da, bevor der nächste Tram kommt.'},
      wollishofen:      {title:'Wollishofen', story:'Seebadi, Brunau, Morgensonne. Die perfekte Route — bis der Reifen aufgibt. Wir kommen zum See, damit du bald wieder am See bist.'},
      leimbach:         {title:'Leimbach', story:'Das grüne Zürich. Waldwege, Sihlbrücken, Ruhe. Manchmal auch: Platten mitten im Nirgendwo. Wir kennen den Weg.'},
      wiedikon:         {title:'Wiedikon', story:'Goldbrunnenplatz, Schmiede Wiedikon, Quartierbeiz. Das Herz von Zürich West. Dein Velo kennt diese Kopfsteinpflaster — manchmal zu gut.'},
      aussersihl:       {title:'Aussersihl & Langstrasse', story:'Langstrasse um Mitternacht, Rote Fabrik am Nachmittag — Aussersihl schläft nie. Wir auch nicht. Platten-Notfall? Wir sind in 30 Minuten da.'},
      industriequartier:{title:'Industriequartier', story:'Prime Tower, Schiffbau, Viadukt. Das alte Zürich trifft Startup-Flair. Und zwischen Velostationen und Hipster-Cafés: manchmal ein Platten. Wir kommen.'},
      schwamendingen:   {title:'Schwamendingen', story:'Schwamendingen hat einen Ruf — zu Unrecht. Wir lieben dieses Quartier. Grosse Strassen, direkte Verbindungen, und ein Mechaniker, der auch dorthin kommt.'},
      oerlikon:         {title:'Oerlikon', story:'MFO-Park, Hallenstadion, Max-Bill-Platz. Zürich Nord boomt. Kein Wunder, dass hier täglich hunderte Velos unterwegs sind. Und manchmal einer von uns.'},
      hoengg:           {title:'Höngg', story:'Das Weinbauerdorf mitten in der Stadt. Steile Wege, Rebberge, Weitsicht. Hier kommt man per Velo — und wenn der Antrieb streikt, kommen wir.'},
      affoltern:        {title:'Affoltern', story:'Ruhiges Nordquartier, viel Grün, kurze Wege zum Wald. VELOV kommt auch dorthin — und der Mechaniker kennt den Dorfkern.'},
      seefeld:          {title:'Seefeld', story:'Seefeldstrasse, Opernhaus, Zürichhorn. Zürichs feinste Adresse. Natürlich kommen wir auch hier vorbei — Velos sind ja demokratisch.'},
      witikon:          {title:'Witikon', story:'Zürichs höchstes Stadtquartier. Was da raufgeht, muss auch runterkommen. Wir reparieren bergauf und bergab.'},
      hirslanden:       {title:'Hirslanden', story:'Grosser Zürichberg-Hang, Klinik, Villen. Viele E-Bikes hier — Stichwort Steigung. Mechanische Wartung vor Ort, Akku bleibt wie er ist.'},
      schlieren:        {title:'Schlieren', story:'Direkt an der Stadtgrenze, fast schon Zürich. Die Limmat trennt uns kaum. Same-day Service wie in der Stadt — mit CHF 20 Umland-Zuschlag.'},
      kilchberg:        {title:'Kilchberg', story:'Lindt & Sprüngli kommt von hier. Wir nicht — aber wir kommen trotzdem. Schokoladenduft inklusive, Platten-Fix auch.'},
      ruemlang:         {title:'Rümlang', story:'Zwischen Zürich und Flughafen. Wer hier wohnt, kennt Flugzeuge und kurze Wege. Wir kennen auch den Weg dorthin.'},
      opfikon:          {title:'Opfikon & Glattpark', story:'Neues Quartier, viele Pendler, viel Bewegung. Glattpark-Velowege sind toll — bis Kette oder Reifen streiken. Wir sind nah.'},
      glattbrugg:       {title:'Glattbrugg', story:'Shoppi-Tivoli-Veloständer, Flughafen-Shuttles, Businesspark. VELOV kommt auch in die Agglomeration. Reaktionszeit ~65 Min.'},
      wallisellen:      {title:'Wallisellen', story:'Östlich von Zürich, gut erschlossen. Hier fährt man viel Velo — und wir kommen, wenn es mal nicht mehr fährt.'},
      zollikon:         {title:'Zollikon', story:'Zürichsee-Ufer, Villen, Ruhe. Ein Ort, wo Velo Lifestyle ist. Und wo ein guter Mechaniker hin kommt, wenn man ihn braucht.'},
      horgen:           {title:'Horgen', story:'Mit dem Dampfschiff oder mit dem Velo am See — Horgen ist schön. Wir kommen auch dorthin, brauchen aber ~75 Min. Lohnt sich.'},
      thalwil:          {title:'Thalwil', story:'Endstation Goldbahn, Anfang See. Thalwil ist der Süden — ruhig, schön, und VELOV kommt auch hierher.'}
    },
    faqs:[
      {q:'Bedient ihr auch ausserhalb der Stadt Zürich?', a:'Ja — Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil und mehr. Kleiner Anfahrts-Aufschlag von CHF 20, sonst alles gleich.'},
      {q:'Habt ihr einen festen Laden oder Standort?', a:'Nein — wir sind 100% mobil. Das ist unser Vorteil: wir kommen zu dir, egal wo du in Zürich bist. Kein Schleppen, kein Öffnungszeiten-Stress.'},
      {q:'Wie schnell seid ihr in der Stadt Zürich?', a:'In der Regel unter 45 Minuten innerhalb der Stadtkreise 1–12. Bei Notfällen (Plattfuss) oft sogar noch schneller.'},
      {q:'Wie erkenne ich, ob mein Quartier abgedeckt ist?', a:'Klick einfach auf dein Quartier oben — du siehst sofort deine Reaktionszeit und einen direkten WhatsApp-Buchungslink.'},
      {q:'Was kostet die Anfahrt?', a:'Stadtgebiet Zürich CHF 49 fix. Umland CHF 49 + CHF 20 Aufschlag = CHF 69. Alles transparent vor der Buchung.'}
    ]
  },

  /* ── ENGLISH ── */
  en: {
    seo: {
      id:'locations-en',
      h1:'VELOV Locations Zurich – Mobile Bike Workshop in Every District',
      intro:'VELOV covers all 12 Zurich city districts and the agglomeration. 100% mobile — we come to you. Response time 30–75 minutes depending on your district.',
      sections:[
        {h2:'City of Zurich — all 12 districts', body:'We come to every Zurich district. Travel fee in city CHF 49. Response time typically under 45 minutes.'},
        {h2:'Agglomeration & surroundings', body:'Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil. Travel surcharge CHF 20 depending on distance.'}
      ],
      faqs:[
        {q:'Do you cover areas outside the city?', a:'Yes, with a small travel surcharge of CHF 20.'},
        {q:'Do you have a fixed shop?', a:'No — 100% mobile. We come to wherever you are.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema:[
        {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://www.velov.ch/#business","name":"VELOV — Mobile Bike Workshop Zurich","url":"https://www.velov.ch/en/locations","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"areaServed":[{"@type":"City","name":"Zurich"},{"@type":"AdministrativeArea","name":"Canton Zurich"}],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"en","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/en"},{"@type":"ListItem","position":2,"name":"Locations","item":"https://www.velov.ch/en/locations"}]}
      ]
    },
    ui:{
      faqLabel:'Frequently Asked Questions', contactLabel:'Contact',
      heroBadge:'22+ Neighbourhoods · All of Zurich',
      heroH1:'Zurich\'s fastest mobile bike workshop.',
      heroSub:'Flat tyre in Wiedikon? Chain snapped in Oerlikon? Brakes gone at Bürkliplatz? We come to you. Anywhere in Zurich. Usually faster than finding a bike shop with an open slot.',
      heroStats:[
        {num:'22+', label:'Neighbourhoods'},
        {num:'4.8 ⭐', label:'Google'},
        {num:'≤45 min', label:'City response'},
        {num:'CHF 49', label:'Fixed travel'}
      ],
      pickerTitle:'📍 Pick your neighbourhood — see your ETA instantly',
      pickerLead:'Click your area or search directly. You get a personal response time and a direct WhatsApp booking link.',
      searchPlaceholder:'e.g. Oerlikon, Wiedikon, Schlieren...',
      filterAll:'All',
      filterCity:'Zurich City',
      filterUmland:'Agglomeration',
      etaLabel:'Response time from message:',
      etaUnit:'minutes',
      resultBookBtn: function(name){ return 'Book in '+name+' now →'; },
      waZoneMsg: function(name){ return 'Hi VELOV! I\'m in '+name+' and need a bike repair. When can you come?'; },
      storiesTitle:'Zurich Stories 🚴‍♂️',
      storiesLead:'We know every cobblestone. Every tram rail. Every hill. In short: we know Zurich.',
      servicesTitle:'Our services — same everywhere',
      benefitsTitle:'Why VELOV?',
      ctaTitle:'Ready to get your bike fixed?',
      ctaBody:'Same-day available. We come to you — anywhere in Zurich & surroundings.',
      ctaBtn:'→ Book now via WhatsApp',
      orCall:'or call:',
      waMainMsg:'Hi VELOV, I need a bike repair in Zurich. Can you help?',
      cityBadge:'🏢 City',
      umlandBadge:'🏘️ Suburbs',
      minuteUnit:'min'
    },
    services:[
      {emoji:'🛞', name:'Flat Tyre Repair',   price:'99',  time:'30 min'},
      {emoji:'🔧', name:'Standard Service',   price:'179', time:'60–90 min'},
      {emoji:'🆘', name:'Emergency Service',  price:'99',  time:'30–60 min'},
      {emoji:'⚡', name:'E-Bike Service',     price:'179', time:'60–90 min'}
    ],
    benefits:[
      {emoji:'⚡', title:'Lightning fast',  text:'Often under 45 min in the city. Same-day booking. 7 days a week.'},
      {emoji:'📍', title:'100% Mobile',     text:'We come to you — doorstep, office, station. No hauling, no transport.'},
      {emoji:'💯', title:'Professional',    text:'Trained mechanics. All bike types. Fixed prices, no surprises.'},
      {emoji:'💰', title:'Transparent',     text:'Price known before booking. TWINT, cash or invoice. Simple & honest.'}
    ],
    stories:{
      enge:             {title:'Enge & Bürkliplatz', story:'The tram rails at Bürkliplatz have claimed more tyres than any pothole. We know — we\'ve been called there more times than we can count.'},
      wollishofen:      {title:'Wollishofen', story:'Seebad, Brunau, morning sun on the lake. Perfect cycling territory — until the tyre gives up. We come to the lake so you can get back to the lake.'},
      leimbach:         {title:'Leimbach', story:'Green Zurich at its best. Forest paths, Sihl bridges, calm. Sometimes also: flat tyre in the middle of nowhere. We know the way.'},
      wiedikon:         {title:'Wiedikon', story:'Goldbrunnenplatz, neighbourhood pubs, cobblestones that have their own opinions about your tyres. We know Wiedikon like our own pocket.'},
      aussersihl:       {title:'Aussersihl & Langstrasse', story:'Langstrasse at midnight, Rote Fabrik on a Sunday — Aussersihl never sleeps. Neither do we. Emergency flat? We\'re there in 30 minutes.'},
      industriequartier:{title:'Industriequartier', story:'Prime Tower, Viadukt, Schiffbau. Old Zurich meets startup scene. And between bike racks and espresso bars: sometimes a flat. We\'ve got it.'},
      schwamendingen:   {title:'Schwamendingen', story:'Schwamendingen has a reputation — unfairly. We love this neighbourhood. Big streets, good access, and a mechanic who actually shows up.'},
      oerlikon:         {title:'Oerlikon', story:'MFO-Park, Hallenstadion, Max-Bill-Platz. Zurich North is booming. No wonder hundreds of bikes roll here daily. And sometimes we do too.'},
      hoengg:           {title:'Höngg', story:'The vineyard village in the middle of the city. Steep lanes, grapes, views. You get there by bike — and when the drivetrain protests, we come to you.'},
      affoltern:        {title:'Affoltern', story:'Quiet northern neighbourhood, lots of green, short routes to the forest. VELOV comes there too — and our mechanic knows the village centre.'},
      seefeld:          {title:'Seefeld', story:'Seefeldstrasse, Opera House, Zürichhorn. Zurich\'s most elegant address. Of course we come here too — bikes are democratic.'},
      witikon:          {title:'Witikon', story:'Zurich\'s highest city neighbourhood. What goes up must come down — and whatever breaks on the way, we fix.'},
      hirslanden:       {title:'Hirslanden', story:'Big Zürichberg slope, clinic, villas. Lots of e-bikes here — see: gradient. Mechanical service on-site. Battery stays as-is.'},
      schlieren:        {title:'Schlieren', story:'Right on the city border, almost Zurich already. The Limmat barely separates us. Same-day service like in the city — plus CHF 20 surcharge.'},
      kilchberg:        {title:'Kilchberg', story:'Lindt & Sprüngli is from here. We\'re not — but we come anyway. Smell of chocolate included, flat fix too.'},
      ruemlang:         {title:'Rümlang', story:'Between Zurich and the airport. Whoever lives here knows planes and short distances. We know the way too.'},
      opfikon:          {title:'Opfikon & Glattpark', story:'New neighbourhood, lots of commuters, lots of movement. Glattpark cycle paths are great — until chain or tyre disagrees. We\'re nearby.'},
      glattbrugg:       {title:'Glattbrugg', story:'Shoppi Tivoli bike racks, airport shuttles, business parks. VELOV comes to the agglomeration too. Response ~65 min.'},
      wallisellen:      {title:'Wallisellen', story:'East of Zurich, well connected. Lots of cycling here — and we come when it stops working.'},
      zollikon:         {title:'Zollikon', story:'Lake Zurich shore, villas, quiet. A place where cycling is a lifestyle. And where a good mechanic comes when needed.'},
      horgen:           {title:'Horgen', story:'Steamboat or bike along the lake — Horgen is beautiful. We come there too, give us ~75 min. Worth it.'},
      thalwil:          {title:'Thalwil', story:'End of the Goldbahn, start of the lake. Thalwil is the south — calm, beautiful, and VELOV comes here too.'}
    },
    faqs:[
      {q:'Do you cover areas outside Zurich city?', a:'Yes — Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil and more. Small travel surcharge of CHF 20, everything else the same.'},
      {q:'Do you have a fixed shop or location?', a:'No — 100% mobile. That\'s our advantage: we come to you wherever you are in Zurich. No hauling, no opening hours stress.'},
      {q:'How fast are you in Zurich city?', a:'Typically under 45 minutes within city districts 1–12. For emergencies (flat tyre) often even faster.'},
      {q:'How do I know if my area is covered?', a:'Just click your neighbourhood above — you instantly see your response time and a direct WhatsApp booking link.'},
      {q:'What does the travel fee cost?', a:'Zurich city CHF 49 fixed. Agglomeration CHF 49 + CHF 20 surcharge = CHF 69. All transparent before booking.'}
    ]
  },

  /* ── FRANÇAIS ── */
  fr: {
    seo: {
      id:'locations-fr',
      h1:'VELOV Zones Zurich – Atelier Vélo Mobile dans Tous les Quartiers',
      intro:'VELOV couvre les 12 arrondissements de Zurich et l\'agglomération. 100% mobile — nous venons chez vous. Délai d\'intervention 30–75 minutes selon le quartier.',
      sections:[
        {h2:'Ville de Zurich — 12 arrondissements', body:'Nous intervenons dans chaque arrondissement. Déplacement en ville CHF 49. Délai d\'intervention en général sous 45 minutes.'},
        {h2:'Agglomération', body:'Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil. Supplément déplacement CHF 20 selon distance.'}
      ],
      faqs:[
        {q:'Intervenez-vous hors de la ville ?', a:'Oui, avec un petit supplément de déplacement de CHF 20.'},
        {q:'Avez-vous une boutique fixe ?', a:'Non — 100% mobile. Nous venons chez vous.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema:[
        {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://www.velov.ch/#business","name":"VELOV — Atelier Vélo Mobile Zurich","url":"https://www.velov.ch/fr/locations","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"fr","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.velov.ch/fr"},{"@type":"ListItem","position":2,"name":"Zones","item":"https://www.velov.ch/fr/locations"}]}
      ]
    },
    ui:{
      faqLabel:'Questions fréquentes', contactLabel:'Contact',
      heroBadge:'22+ Quartiers · Tout Zurich',
      heroH1:'L\'atelier vélo mobile le plus rapide de Zurich.',
      heroSub:'Crevaison à Wiedikon ? Chaîne cassée à Oerlikon ? Freins morts au Bürkliplatz ? Nous venons. Partout à Zurich. Souvent plus vite que vous ne trouvez un atelier disponible.',
      heroStats:[
        {num:'22+', label:'Quartiers'},
        {num:'4.8 ⭐', label:'Google'},
        {num:'≤45 min', label:'Réponse ville'},
        {num:'CHF 49', label:'Déplacement fixe'}
      ],
      pickerTitle:'📍 Choisissez votre quartier — voyez votre délai instantanément',
      pickerLead:'Cliquez sur votre zone ou cherchez directement. Vous obtenez votre délai personnalisé et un lien WhatsApp direct.',
      searchPlaceholder:'ex. Oerlikon, Wiedikon, Schlieren...',
      filterAll:'Tous',
      filterCity:'Ville de Zurich',
      filterUmland:'Agglomération',
      etaLabel:'Délai d\'intervention depuis message :',
      etaUnit:'minutes',
      resultBookBtn: function(name){ return 'Réserver à '+name+' maintenant →'; },
      waZoneMsg: function(name){ return 'Bonjour VELOV ! Je suis à '+name+' et j\'ai besoin d\'une réparation vélo. Quand pouvez-vous venir ?'; },
      storiesTitle:'Histoires de Zurich 🚴‍♂️',
      storiesLead:'Nous connaissons chaque pavé. Chaque rail de tram. Chaque côte. Bref : nous connaissons Zurich.',
      servicesTitle:'Nos services — partout identiques',
      benefitsTitle:'Pourquoi VELOV ?',
      ctaTitle:'Prêt à faire réparer votre vélo ?',
      ctaBody:'Disponible le jour même. Nous venons chez vous — partout à Zurich et alentours.',
      ctaBtn:'→ Réserver via WhatsApp',
      orCall:'ou appelez :',
      waMainMsg:'Bonjour VELOV, j\'ai besoin d\'une réparation vélo à Zurich. Pouvez-vous m\'aider ?',
      cityBadge:'🏢 Ville',
      umlandBadge:'🏘️ Agglomération',
      minuteUnit:'min'
    },
    services:[
      {emoji:'🛞', name:'Réparation crevaison', price:'99',  time:'30 min'},
      {emoji:'🔧', name:'Service Standard',     price:'179', time:'60–90 min'},
      {emoji:'🆘', name:'Service d\'urgence',   price:'99',  time:'30–60 min'},
      {emoji:'⚡', name:'Service E-Bike',       price:'179', time:'60–90 min'}
    ],
    benefits:[
      {emoji:'⚡', title:'Ultra rapide',      text:'Souvent moins de 45 min en ville. Réservation le jour même. 7 jours sur 7.'},
      {emoji:'📍', title:'100% Mobile',       text:'Nous venons chez vous — domicile, bureau, gare. Sans transport, sans stress.'},
      {emoji:'💯', title:'Professionnel',     text:'Mécaniciens formés. Tous types de vélos. Prix fixes, sans surprises.'},
      {emoji:'💰', title:'Transparent',       text:'Prix connu avant réservation. TWINT, espèces ou facture. Simple et honnête.'}
    ],
    stories:{
      enge:             {title:'Enge & Bürkliplatz', story:'Les rails du tram au Bürkliplatz ont eu raison de plus de pneus qu\'aucun nid-de-poule. Nous le savons — on nous appelle là-bas plus souvent qu\'on ne peut compter.'},
      wollishofen:      {title:'Wollishofen', story:'Seebad, Brunau, soleil du matin sur le lac. Territoire cycliste parfait — jusqu\'à ce que le pneu abandonne. Nous venons au bord du lac pour que vous puissiez y retourner.'},
      leimbach:         {title:'Leimbach', story:'Le Zurich vert à son meilleur. Sentiers forestiers, ponts de la Sihl, calme. Parfois aussi : crevaison au milieu de nulle part. Nous connaissons le chemin.'},
      wiedikon:         {title:'Wiedikon', story:'Goldbrunnenplatz, bistrots de quartier, pavés qui ont leur propre avis sur vos pneus. Nous connaissons Wiedikon comme notre poche.'},
      aussersihl:       {title:'Aussersihl & Langstrasse', story:'La Langstrasse à minuit, la Rote Fabrik un dimanche — Aussersihl ne dort jamais. Nous non plus. Urgence crevaison ? Nous sommes là en 30 minutes.'},
      industriequartier:{title:'Industriequartier', story:'Prime Tower, Viadukt, Schiffbau. Le vieux Zurich rencontre la scène startup. Et entre racks à vélos et espressos : parfois une crevaison. On s\'en occupe.'},
      schwamendingen:   {title:'Schwamendingen', story:'Schwamendingen a une réputation — injustement. Nous adorons ce quartier. Grandes rues, bon accès, et un mécanicien qui vient vraiment.'},
      oerlikon:         {title:'Oerlikon', story:'MFO-Park, Hallenstadion, Max-Bill-Platz. Zurich Nord est en plein essor. Pas étonnant que des centaines de vélos y roulent chaque jour. Et parfois nous aussi.'},
      hoengg:           {title:'Höngg', story:'Le village viticole au cœur de la ville. Ruelles escarpées, vignes, panorama. On y va à vélo — et quand la transmission proteste, nous venons.'},
      affoltern:        {title:'Affoltern', story:'Quartier nord tranquille, beaucoup de vert, courtes routes vers la forêt. VELOV y vient aussi — et notre mécanicien connaît le centre du village.'},
      seefeld:          {title:'Seefeld', story:'Seefeldstrasse, Opéra, Zürichhorn. L\'adresse la plus élégante de Zurich. Bien sûr que nous venons aussi — les vélos sont démocratiques.'},
      witikon:          {title:'Witikon', story:'Le quartier le plus haut de Zurich. Ce qui monte doit redescendre — et ce qui casse en chemin, nous le réparons.'},
      hirslanden:       {title:'Hirslanden', story:'Grand versant du Zürichberg, clinique, villas. Beaucoup d\'e-bikes ici — voir : dénivelé. Service mécanique sur place. La batterie reste comme elle est.'},
      schlieren:        {title:'Schlieren', story:'À la frontière de la ville, presque Zurich déjà. La Limmat nous sépare à peine. Service le jour même comme en ville — plus CHF 20 de supplément.'},
      kilchberg:        {title:'Kilchberg', story:'Lindt & Sprüngli vient d\'ici. Nous non — mais nous venons quand même. Odeur de chocolat comprise, réparation de crevaison aussi.'},
      ruemlang:         {title:'Rümlang', story:'Entre Zurich et l\'aéroport. Qui habite ici connaît les avions et les courtes distances. Nous connaissons aussi le chemin.'},
      opfikon:          {title:'Opfikon & Glattpark', story:'Nouveau quartier, beaucoup de pendulaires, beaucoup de mouvement. Les pistes cyclables du Glattpark sont super — jusqu\'à ce que la chaîne ou le pneu refuse. Nous sommes proches.'},
      glattbrugg:       {title:'Glattbrugg', story:'Racks à vélos du Shoppi Tivoli, navettes aéroport, parcs d\'affaires. VELOV vient aussi dans l\'agglomération. Délai ~65 min.'},
      wallisellen:      {title:'Wallisellen', story:'À l\'est de Zurich, bien desservi. On y fait beaucoup de vélo — et nous venons quand ça ne roule plus.'},
      zollikon:         {title:'Zollikon', story:'Rive du lac de Zurich, villas, calme. Un endroit où le vélo est un art de vivre. Et où un bon mécanicien vient quand on en a besoin.'},
      horgen:           {title:'Horgen', story:'En bateau à vapeur ou à vélo le long du lac — Horgen est magnifique. Nous y venons aussi, comptez ~75 min. Ça vaut la peine.'},
      thalwil:          {title:'Thalwil', story:'Terminus du Goldbahn, début du lac. Thalwil c\'est le sud — calme, beau, et VELOV y vient aussi.'}
    },
    faqs:[
      {q:'Intervenez-vous hors de la ville de Zurich ?', a:'Oui — Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil et plus. Petit supplément de CHF 20, tout le reste identique.'},
      {q:'Avez-vous une boutique ou un lieu fixe ?', a:'Non — 100% mobile. C\'est notre avantage : nous venons chez vous où que vous soyez à Zurich. Sans transport, sans contrainte d\'horaires.'},
      {q:'À quelle vitesse intervenez-vous en ville ?', a:'En général moins de 45 minutes dans les arrondissements 1–12. Pour les urgences (crevaison) souvent encore plus vite.'},
      {q:'Comment savoir si mon quartier est couvert ?', a:'Cliquez simplement sur votre quartier ci-dessus — vous voyez immédiatement votre délai et un lien de réservation WhatsApp direct.'},
      {q:'Combien coûte le déplacement ?', a:'Ville de Zurich CHF 49 fixe. Agglomération CHF 49 + CHF 20 supplément = CHF 69. Tout transparent avant la réservation.'}
    ]
  },

  /* ── ITALIANO ── */
  it: {
    seo: {
      id:'locations-it',
      h1:'VELOV Zone Zurigo – Officina Mobile in Tutti i Quartieri',
      intro:'VELOV copre tutti i 12 circoli di Zurigo e l\'agglomerato. 100% mobile — veniamo da te. Tempi di risposta 30–75 minuti a seconda del quartiere.',
      sections:[
        {h2:'Città di Zurigo — 12 circoli', body:'Interveniamo in ogni circolo di Zurigo. Trasferta in città CHF 49. Tempo di risposta in genere sotto i 45 minuti.'},
        {h2:'Agglomerato', body:'Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil. Supplemento trasferta CHF 20 a seconda della distanza.'}
      ],
      faqs:[
        {q:'Intervenite anche fuori dalla città ?', a:'Sì, con un piccolo supplemento di CHF 20.'},
        {q:'Avete un negozio fisso ?', a:'No — 100% mobile. Veniamo da te dove sei.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema:[
        {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://www.velov.ch/#business","name":"VELOV — Officina Mobile Biciclette Zurigo","url":"https://www.velov.ch/it/locations","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zurigo","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"it","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/it"},{"@type":"ListItem","position":2,"name":"Zone","item":"https://www.velov.ch/it/locations"}]}
      ]
    },
    ui:{
      faqLabel:'Domande frequenti', contactLabel:'Contatto',
      heroBadge:'22+ Quartieri · Tutta Zurigo',
      heroH1:'L\'officina mobile più veloce di Zurigo.',
      heroSub:'Foratura a Wiedikon? Catena rotta a Oerlikon? Freni morti al Bürkliplatz? Veniamo da te. Ovunque a Zurigo. Spesso più velocemente di quanto tu trovi un\'officina disponibile.',
      heroStats:[
        {num:'22+', label:'Quartieri'},
        {num:'4.8 ⭐', label:'Google'},
        {num:'≤45 min', label:'Risposta città'},
        {num:'CHF 49', label:'Trasferta fissa'}
      ],
      pickerTitle:'📍 Scegli il tuo quartiere — vedi subito il tempo di risposta',
      pickerLead:'Clicca sulla tua zona o cerca direttamente. Ottieni il tuo tempo di risposta personalizzato e un link WhatsApp diretto.',
      searchPlaceholder:'es. Oerlikon, Wiedikon, Schlieren...',
      filterAll:'Tutti',
      filterCity:'Città di Zurigo',
      filterUmland:'Agglomerato',
      etaLabel:'Tempo di risposta dal messaggio:',
      etaUnit:'minuti',
      resultBookBtn: function(name){ return 'Prenota a '+name+' ora →'; },
      waZoneMsg: function(name){ return 'Ciao VELOV! Sono a '+name+' e ho bisogno di una riparazione bici. Quando puoi venire?'; },
      storiesTitle:'Storie di Zurigo 🚴‍♂️',
      storiesLead:'Conosciamo ogni sampietrino. Ogni binario del tram. Ogni salita. In breve: conosciamo Zurigo.',
      servicesTitle:'I nostri servizi — uguali ovunque',
      benefitsTitle:'Perché VELOV?',
      ctaTitle:'Pronto a far riparare la tua bici?',
      ctaBody:'Disponibile lo stesso giorno. Veniamo da te — ovunque a Zurigo e dintorni.',
      ctaBtn:'→ Prenota ora via WhatsApp',
      orCall:'o chiama:',
      waMainMsg:'Ciao VELOV, ho bisogno di una riparazione bici a Zurigo. Puoi aiutarmi?',
      cityBadge:'🏢 Città',
      umlandBadge:'🏘️ Agglomerato',
      minuteUnit:'min'
    },
    services:[
      {emoji:'🛞', name:'Riparazione foratura', price:'99',  time:'30 min'},
      {emoji:'🔧', name:'Servizio Standard',    price:'179', time:'60–90 min'},
      {emoji:'🆘', name:'Servizio Emergenza',   price:'99',  time:'30–60 min'},
      {emoji:'⚡', name:'Servizio E-Bike',      price:'179', time:'60–90 min'}
    ],
    benefits:[
      {emoji:'⚡', title:'Velocissimo',     text:'Spesso meno di 45 min in città. Prenotazione in giornata. 7 giorni su 7.'},
      {emoji:'📍', title:'100% Mobile',     text:'Veniamo da te — porta di casa, ufficio, stazione. Senza trasporto, senza stress.'},
      {emoji:'💯', title:'Professionale',   text:'Meccanici qualificati. Tutti i tipi di bici. Prezzi fissi, nessuna sorpresa.'},
      {emoji:'💰', title:'Trasparente',     text:'Prezzo noto prima della prenotazione. TWINT, contanti o fattura. Semplice e onesto.'}
    ],
    stories:{
      enge:             {title:'Enge & Bürkliplatz', story:'I binari del tram al Bürkliplatz hanno bucato più pneumatici di qualsiasi buca. Lo sappiamo — ci chiamano lì più volte di quante riusciamo a contare.'},
      wollishofen:      {title:'Wollishofen', story:'Seebad, Brunau, sole mattutino sul lago. Territorio ciclabile perfetto — finché il pneumatico si arrende. Veniamo al lago perché tu possa tornarci.'},
      leimbach:         {title:'Leimbach', story:'Il Zurigo verde al suo meglio. Sentieri forestali, ponti sulla Sihl, tranquillità. A volte anche: foratura in mezzo al nulla. Conosciamo la strada.'},
      wiedikon:         {title:'Wiedikon', story:'Goldbrunnenplatz, bistrot di quartiere, sampietrini con opinioni proprie sui tuoi pneumatici. Conosciamo Wiedikon come le nostre tasche.'},
      aussersihl:       {title:'Aussersihl & Langstrasse', story:'La Langstrasse a mezzanotte, la Rote Fabrik la domenica — Aussersihl non dorme mai. Nemmeno noi. Foratura d\'emergenza? Siamo lì in 30 minuti.'},
      industriequartier:{title:'Industriequartier', story:'Prime Tower, Viadukt, Schiffbau. La vecchia Zurigo incontra la scena startup. E tra rastrelliere e caffè speciality: a volte una foratura. Ci pensiamo noi.'},
      schwamendingen:   {title:'Schwamendingen', story:'Schwamendingen ha una reputazione — ingiustamente. Amiamo questo quartiere. Strade ampie, buon accesso, e un meccanico che arriva davvero.'},
      oerlikon:         {title:'Oerlikon', story:'MFO-Park, Hallenstadion, Max-Bill-Platz. Zurigo Nord è in piena espansione. Non c\'è da stupirsi che centinaia di bici scorrano qui ogni giorno. E a volte anche noi.'},
      hoengg:           {title:'Höngg', story:'Il villaggio viticolo nel cuore della città. Vicoli ripidi, vigneti, panorami. Ci si arriva in bici — e quando la trasmissione protesta, veniamo noi.'},
      affoltern:        {title:'Affoltern', story:'Quartiere nord tranquillo, molto verde, breve distanza dalla foresta. VELOV viene anche lì — e il nostro meccanico conosce il centro del paese.'},
      seefeld:          {title:'Seefeld', story:'Seefeldstrasse, Opera, Zürichhorn. L\'indirizzo più elegante di Zurigo. Naturalmente veniamo anche qui — le bici sono democratiche.'},
      witikon:          {title:'Witikon', story:'Il quartiere più alto di Zurigo. Quel che sale deve scendere — e quel che si rompe nel tragitto, lo ripariamo noi.'},
      hirslanden:       {title:'Hirslanden', story:'Grande versante dello Zürichberg, clinica, ville. Molte e-bike qui — vedi: pendenza. Servizio meccanico in loco. La batteria rimane com\'è.'},
      schlieren:        {title:'Schlieren', story:'Proprio sul confine della città, quasi già Zurigo. La Limmat ci separa appena. Servizio in giornata come in città — più CHF 20 di supplemento.'},
      kilchberg:        {title:'Kilchberg', story:'Lindt & Sprüngli viene da qui. Noi no — ma veniamo lo stesso. Profumo di cioccolato incluso, riparazione foratura anche.'},
      ruemlang:         {title:'Rümlang', story:'Tra Zurigo e l\'aeroporto. Chi abita qui conosce gli aerei e le distanze brevi. Conosciamo anche la strada.'},
      opfikon:          {title:'Opfikon & Glattpark', story:'Quartiere nuovo, molti pendolari, molto movimento. Le piste ciclabili del Glattpark sono ottime — finché catena o pneumatico dissentono. Siamo vicini.'},
      glattbrugg:       {title:'Glattbrugg', story:'Rastrelliere del Shoppi Tivoli, navette aeroporto, parchi aziendali. VELOV viene anche nell\'agglomerato. Tempo di risposta ~65 min.'},
      wallisellen:      {title:'Wallisellen', story:'A est di Zurigo, ben collegata. Si pedala molto qui — e veniamo quando non funziona più.'},
      zollikon:         {title:'Zollikon', story:'Riva del lago di Zurigo, ville, tranquillità. Un posto dove la bici è uno stile di vita. E dove un buon meccanico viene quando serve.'},
      horgen:           {title:'Horgen', story:'In battello a vapore o in bici lungo il lago — Horgen è bellissima. Veniamo anche lì, dateci ~75 min. Ne vale la pena.'},
      thalwil:          {title:'Thalwil', story:'Capolinea della Goldbahn, inizio del lago. Thalwil è il sud — tranquilla, bella, e VELOV viene anche qui.'}
    },
    faqs:[
      {q:'Intervenite fuori dalla città di Zurigo ?', a:'Sì — Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil e altro. Piccolo supplemento di CHF 20, tutto il resto uguale.'},
      {q:'Avete un negozio o una sede fissa ?', a:'No — 100% mobile. Questo è il nostro vantaggio: veniamo da te ovunque tu sia a Zurigo. Senza trasporto, senza stress da orari.'},
      {q:'Quanto siete veloci in città ?', a:'In genere meno di 45 minuti nei circoli 1–12. Per emergenze (foratura) spesso anche più veloce.'},
      {q:'Come so se la mia zona è coperta ?', a:'Clicca semplicemente sul tuo quartiere sopra — vedi subito il tuo tempo di risposta e un link di prenotazione WhatsApp diretto.'},
      {q:'Quanto costa la trasferta ?', a:'Città di Zurigo CHF 49 fisso. Agglomerato CHF 49 + CHF 20 supplemento = CHF 69. Tutto trasparente prima della prenotazione.'}
    ]
  },

  /* ── ESPAÑOL ── */
  es: {
    seo: {
      id:'locations-es',
      h1:'VELOV Zonas Zúrich – Taller Móvil en Todos los Barrios',
      intro:'VELOV cubre los 12 distritos de Zúrich y el área metropolitana. 100% móvil — vamos a donde estés. Tiempo de respuesta 30–75 minutos según el barrio.',
      sections:[
        {h2:'Ciudad de Zúrich — 12 distritos', body:'Intervenimos en cada distrito de Zúrich. Desplazamiento en ciudad CHF 49. Tiempo de respuesta generalmente bajo 45 minutos.'},
        {h2:'Área metropolitana', body:'Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil. Suplemento de desplazamiento CHF 20 según distancia.'}
      ],
      faqs:[
        {q:'¿Cubrís zonas fuera de la ciudad ?', a:'Sí, con un pequeño suplemento de CHF 20.'},
        {q:'¿Tenéis una tienda fija ?', a:'No — 100% móvil. Vamos a donde estés.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch',
      schema:[
        {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://www.velov.ch/#business","name":"VELOV — Taller Móvil de Bicicletas Zúrich","url":"https://www.velov.ch/es/locations","telephone":"+41762352126","email":"info@velov.ch","image":"https://www.velov.ch/og-image.jpg","priceRange":"CHF","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zúrich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"geo":{"@type":"GeoCoordinates","latitude":47.3769,"longitude":8.5417},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"inLanguage":"es","sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.velov.ch/es"},{"@type":"ListItem","position":2,"name":"Zonas","item":"https://www.velov.ch/es/locations"}]}
      ]
    },
    ui:{
      faqLabel:'Preguntas frecuentes', contactLabel:'Contacto',
      heroBadge:'22+ Barrios · Todo Zúrich',
      heroH1:'El taller de bicicletas móvil más rápido de Zúrich.',
      heroSub:'¿Pinchazo en Wiedikon? ¿Cadena rota en Oerlikon? ¿Frenos muertos en el Bürkliplatz? Vamos a donde estés. En toda Zúrich. Normalmente antes de que encuentres un taller disponible.',
      heroStats:[
        {num:'22+', label:'Barrios'},
        {num:'4.8 ⭐', label:'Google'},
        {num:'≤45 min', label:'Resp. ciudad'},
        {num:'CHF 49', label:'Despl. fijo'}
      ],
      pickerTitle:'📍 Elige tu barrio — ve tu tiempo de respuesta al instante',
      pickerLead:'Haz clic en tu zona o busca directamente. Obtienes tu tiempo de respuesta personalizado y un enlace WhatsApp directo.',
      searchPlaceholder:'ej. Oerlikon, Wiedikon, Schlieren...',
      filterAll:'Todos',
      filterCity:'Ciudad de Zúrich',
      filterUmland:'Área metropolitana',
      etaLabel:'Tiempo de respuesta desde mensaje:',
      etaUnit:'minutos',
      resultBookBtn: function(name){ return 'Reservar en '+name+' ahora →'; },
      waZoneMsg: function(name){ return '¡Hola VELOV! Estoy en '+name+' y necesito una reparación de bici. ¿Cuándo puedes venir?'; },
      storiesTitle:'Historias de Zúrich 🚴‍♂️',
      storiesLead:'Conocemos cada adoquín. Cada carril de tranvía. Cada cuesta. En resumen: conocemos Zúrich.',
      servicesTitle:'Nuestros servicios — iguales en todas partes',
      benefitsTitle:'¿Por qué VELOV?',
      ctaTitle:'¿Listo para reparar tu bici?',
      ctaBody:'Disponible el mismo día. Vamos a donde estés — en toda Zúrich y alrededores.',
      ctaBtn:'→ Reservar ahora por WhatsApp',
      orCall:'o llama:',
      waMainMsg:'Hola VELOV, necesito una reparación de bici en Zúrich. ¿Puedes ayudarme?',
      cityBadge:'🏢 Ciudad',
      umlandBadge:'🏘️ Área metro.',
      minuteUnit:'min'
    },
    services:[
      {emoji:'🛞', name:'Reparación pinchazo', price:'99',  time:'30 min'},
      {emoji:'🔧', name:'Servicio Estándar',   price:'179', time:'60–90 min'},
      {emoji:'🆘', name:'Servicio Urgente',    price:'99',  time:'30–60 min'},
      {emoji:'⚡', name:'Servicio E-Bike',     price:'179', time:'60–90 min'}
    ],
    benefits:[
      {emoji:'⚡', title:'Ultrarrápido',    text:'A menudo menos de 45 min en la ciudad. Reserva el mismo día. 7 días a la semana.'},
      {emoji:'📍', title:'100% Móvil',      text:'Vamos a donde estés — puerta, oficina, estación. Sin transporte, sin estrés.'},
      {emoji:'💯', title:'Profesional',     text:'Mecánicos formados. Todos los tipos de bici. Precios fijos, sin sorpresas.'},
      {emoji:'💰', title:'Transparente',    text:'Precio conocido antes de reservar. TWINT, efectivo o factura. Simple y honesto.'}
    ],
    stories:{
      enge:             {title:'Enge & Bürkliplatz', story:'Los raíles del tranvía en el Bürkliplatz han reventado más neumáticos que ningún bache. Lo sabemos — nos llaman allí más veces de las que podemos contar.'},
      wollishofen:      {title:'Wollishofen', story:'Seebad, Brunau, sol de mañana sobre el lago. Territorio ciclista perfecto — hasta que el neumático se rinde. Vamos al lago para que puedas volver al lago.'},
      leimbach:         {title:'Leimbach', story:'El Zúrich verde en su máximo esplendor. Senderos forestales, puentes sobre el Sihl, calma. A veces también: pinchazo en medio de la nada. Conocemos el camino.'},
      wiedikon:         {title:'Wiedikon', story:'Goldbrunnenplatz, bares de barrio, adoquines con opiniones propias sobre tus neumáticos. Conocemos Wiedikon como el bolsillo.'},
      aussersihl:       {title:'Aussersihl & Langstrasse', story:'La Langstrasse a medianoche, la Rote Fabrik un domingo — Aussersihl nunca duerme. Nosotros tampoco. ¿Urgencia de pinchazo? En 30 minutos.'},
      industriequartier:{title:'Industriequartier', story:'Prime Tower, Viadukt, Schiffbau. El viejo Zúrich se encuentra con la escena startup. Y entre aparcabicis y cafeterías de especialidad: a veces un pinchazo. Nosotros nos encargamos.'},
      schwamendingen:   {title:'Schwamendingen', story:'Schwamendingen tiene fama — injustamente. Adoramos este barrio. Calles amplias, buen acceso, y un mecánico que realmente aparece.'},
      oerlikon:         {title:'Oerlikon', story:'MFO-Park, Hallenstadion, Max-Bill-Platz. El norte de Zúrich está en auge. No es de extrañar que cientos de bicis rueden aquí a diario. Y a veces también nosotros.'},
      hoengg:           {title:'Höngg', story:'El pueblo vitícola en el corazón de la ciudad. Callejuelas empinadas, viñas, vistas. Se llega en bici — y cuando la transmisión protesta, venimos nosotros.'},
      affoltern:        {title:'Affoltern', story:'Barrio norte tranquilo, mucho verde, rutas cortas al bosque. VELOV también va allí — y nuestro mecánico conoce el centro del pueblo.'},
      seefeld:          {title:'Seefeld', story:'Seefeldstrasse, Ópera, Zürichhorn. La dirección más elegante de Zúrich. Claro que también venimos aquí — las bicis son democráticas.'},
      witikon:          {title:'Witikon', story:'El barrio más alto de Zúrich. Lo que sube tiene que bajar — y lo que se rompe en el camino, lo reparamos nosotros.'},
      hirslanden:       {title:'Hirslanden', story:'Gran ladera del Zürichberg, clínica, villas. Muchas e-bikes aquí — véase: desnivel. Servicio mecánico in situ. La batería se queda como está.'},
      schlieren:        {title:'Schlieren', story:'Justo en la frontera de la ciudad, casi ya Zúrich. El Limmat apenas nos separa. Servicio el mismo día como en la ciudad — más CHF 20 de suplemento.'},
      kilchberg:        {title:'Kilchberg', story:'Lindt & Sprüngli viene de aquí. Nosotros no — pero venimos igual. Olor a chocolate incluido, reparación de pinchazo también.'},
      ruemlang:         {title:'Rümlang', story:'Entre Zúrich y el aeropuerto. Quien vive aquí conoce los aviones y las distancias cortas. Nosotros también conocemos el camino.'},
      opfikon:          {title:'Opfikon & Glattpark', story:'Barrio nuevo, muchos commuters, mucho movimiento. Los carriles bici del Glattpark son geniales — hasta que cadena o neumático discrepan. Estamos cerca.'},
      glattbrugg:       {title:'Glattbrugg', story:'Aparcabicis del Shoppi Tivoli, lanzaderas al aeropuerto, parques empresariales. VELOV también va al área metropolitana. Tiempo de respuesta ~65 min.'},
      wallisellen:      {title:'Wallisellen', story:'Al este de Zúrich, bien comunicada. Se pedalea mucho aquí — y venimos cuando ya no funciona.'},
      zollikon:         {title:'Zollikon', story:'Orilla del lago de Zúrich, villas, tranquilidad. Un lugar donde la bici es un estilo de vida. Y donde un buen mecánico viene cuando se necesita.'},
      horgen:           {title:'Horgen', story:'En barco de vapor o en bici junto al lago — Horgen es preciosa. También vamos allí, danos ~75 min. Vale la pena.'},
      thalwil:          {title:'Thalwil', story:'Término del Goldbahn, inicio del lago. Thalwil es el sur — tranquila, bonita, y VELOV también viene aquí.'}
    },
    faqs:[
      {q:'¿Cubrís zonas fuera de la ciudad de Zúrich ?', a:'Sí — Schlieren, Kilchberg, Rümlang, Opfikon, Wallisellen, Zollikon, Horgen, Thalwil y más. Pequeño suplemento de CHF 20, todo lo demás igual.'},
      {q:'¿Tenéis tienda o sede fija ?', a:'No — 100% móvil. Esa es nuestra ventaja: vamos a donde estés en Zúrich. Sin transporte, sin estrés de horarios.'},
      {q:'¿Qué rapidez tenéis en la ciudad ?', a:'Generalmente menos de 45 minutos en los distritos 1–12. Para urgencias (pinchazo) a menudo incluso más rápido.'},
      {q:'¿Cómo sé si mi zona está cubierta ?', a:'Haz clic en tu barrio arriba — ves inmediatamente tu tiempo de respuesta y un enlace de reserva WhatsApp directo.'},
      {q:'¿Cuánto cuesta el desplazamiento ?', a:'Ciudad de Zúrich CHF 49 fijo. Área metropolitana CHF 49 + CHF 20 suplemento = CHF 69. Todo transparente antes de reservar.'}
    ]
  }
};

/* ===================================================================
   CUSTOM ELEMENT
=================================================================== */
class VelovLocations extends HTMLElement {

  constructor(){
    super();
    this.state = { filter:'all', selected:null, query:'' };
    this._lang = detectVlLang();
    if(!VL_LANG[this._lang]) this._lang = 'de';
  }

  get L(){ return VL_LANG[this._lang]; }
  get UI(){ return this.L.ui; }

  connectedCallback(){
    /* ── WIX VISIBILITY FIX ── */
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
    if(document.getElementById('velov-locations-styles')) return;
    if(!document.getElementById('velov-loc-font')){
      try{
        var lnk=document.createElement('link');
        lnk.id='velov-loc-font'; lnk.rel='stylesheet';
        lnk.href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(lnk);
      }catch(e){}
    }
    var s=document.createElement('style');
    s.id='velov-locations-styles';
    s.textContent = `
      .vl-wrap { display:block; width:100%; min-height:200px; background:#F5F0EB; font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif; color:#2D2B3D; line-height:1.6; -webkit-font-smoothing:antialiased; }
      .vl-wrap *, .vl-wrap *::before, .vl-wrap *::after { margin:0; padding:0; box-sizing:border-box; }
      .vl-wrap a { text-decoration:none; }

      .vl-inner { max-width:1200px; margin:0 auto; padding:0 24px; }
      .vl-section { padding:80px 0; }

      /* HERO */
      .vl-hero { background:linear-gradient(135deg,#7B68EE 0%,#9B88FF 60%,#B9AEFF 100%); color:#fff; padding:96px 0 120px; text-align:center; position:relative; overflow:hidden; }
      .vl-hero::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:60px; background:#F5F0EB; border-radius:60% 60% 0 0 / 100% 100% 0 0; }
      .vl-hero::before { content:''; position:absolute; top:-80px; right:-80px; width:400px; height:400px; background:radial-gradient(circle,rgba(232,87,58,.25),transparent 65%); filter:blur(40px); }
      .vl-hero-inner { position:relative; z-index:2; }
      .vl-hero-badge { display:inline-block; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2); padding:7px 18px; border-radius:50px; font-size:13px; font-weight:600; margin-bottom:22px; letter-spacing:.8px; }
      .vl-h1 { font-size:clamp(32px,5vw,54px); font-weight:800; line-height:1.05; margin:0 auto 20px; max-width:860px; letter-spacing:-.025em; color:#fff; }
      .vl-hero-sub { font-size:18px; opacity:.9; max-width:680px; margin:0 auto 36px; line-height:1.55; color:#fff; }
      .vl-stats { display:flex; justify-content:center; gap:32px; flex-wrap:wrap; margin-top:36px; }
      .vl-stat { text-align:center; }
      .vl-stat-num { font-size:28px; font-weight:800; color:#fff; display:block; line-height:1; }
      .vl-stat-lbl { font-size:12px; opacity:.8; margin-top:4px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#fff; }

      /* PICKER */
      .vl-picker { background:#fff; border-radius:24px; padding:40px; box-shadow:0 16px 40px rgba(45,43,61,.08); }
      .vl-picker-title { font-size:22px; font-weight:800; color:#2D2B3D; margin-bottom:8px; }
      .vl-picker-lead { color:#6B6880; margin-bottom:24px; font-size:16px; }
      .vl-search { margin-bottom:18px; }
      .vl-search input { width:100%; padding:14px 18px; border:2px solid #E8E4DF; border-radius:14px; font-size:16px; font-family:inherit; outline:none; transition:border-color .2s; color:#2D2B3D; background:#fff; }
      .vl-search input:focus { border-color:#7B68EE; }
      .vl-filter { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
      .vl-chip { padding:9px 18px; border-radius:50px; background:#F5F0EB; border:2px solid transparent; color:#2D2B3D; font-size:14px; cursor:pointer; font-weight:600; transition:all .18s; font-family:inherit; }
      .vl-chip:hover { background:#E8E3D9; }
      .vl-chip.active { background:#7B68EE; color:#fff; border-color:#7B68EE; }
      .vl-zones { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:10px; }
      .vl-zone { background:#F5F0EB; border-radius:14px; padding:14px 16px; cursor:pointer; border:2px solid transparent; transition:all .2s; text-align:left; font-family:inherit; width:100%; }
      .vl-zone:hover { background:#fff; border-color:#7B68EE; transform:translateY(-2px); box-shadow:0 6px 16px rgba(123,104,238,.12); }
      .vl-zone.selected { background:#fff; border-color:#E8573A; box-shadow:0 6px 16px rgba(232,87,58,.15); }
      .vl-zname { font-weight:700; color:#2D2B3D; font-size:15px; margin-bottom:4px; }
      .vl-zeta { color:#E8573A; font-size:13px; font-weight:600; }

      /* RESULT */
      .vl-result { margin-top:28px; padding:32px; background:linear-gradient(135deg,#2D2B3D,#3D3B4D); border-radius:20px; color:#fff; display:none; }
      .vl-result.show { display:block; }
      .vl-result-top { display:flex; justify-content:space-between; align-items:flex-start; gap:20px; flex-wrap:wrap; margin-bottom:16px; }
      .vl-result h3 { font-size:22px; font-weight:800; margin:0 0 4px; }
      .vl-result .vl-landmark { font-size:13px; opacity:.7; }
      .vl-eta-big { font-size:44px; font-weight:800; color:#E8573A; line-height:1; }
      .vl-eta-unit { font-size:15px; opacity:.8; margin-top:4px; }
      .vl-result-story { background:rgba(255,255,255,.08); border-radius:14px; padding:18px; margin:16px 0; font-size:15px; line-height:1.6; font-style:italic; opacity:.95; border-left:4px solid #7B68EE; }
      .vl-result-cta { display:inline-flex; align-items:center; gap:10px; background:#25D366; color:#fff; padding:14px 28px; border-radius:50px; font-weight:700; font-size:15px; transition:all .2s; }
      .vl-result-cta:hover { background:#1ebe5b; transform:translateY(-2px); }

      /* STORIES */
      .vl-stories-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; margin-top:40px; }
      .vl-story-card { background:#fff; border-radius:18px; padding:28px; border:1px solid #E8E4DF; transition:all .22s; cursor:default; }
      .vl-story-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(123,104,238,.1); border-color:#7B68EE; }
      .vl-story-title { font-size:16px; font-weight:800; color:#2D2B3D; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
      .vl-story-title::before { content:'📍'; font-size:14px; }
      .vl-story-text { font-size:14px; color:#6B6880; line-height:1.65; }

      /* SERVICES */
      .vl-svc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-top:32px; }
      .vl-svc { background:#fff; padding:28px 24px; border-radius:18px; text-align:center; border-top:4px solid #7B68EE; box-shadow:0 4px 16px rgba(45,43,61,.06); }
      .vl-svc-emoji { font-size:2.2rem; margin-bottom:10px; }
      .vl-svc h4 { font-size:16px; font-weight:700; color:#2D2B3D; margin-bottom:8px; }
      .vl-svc-price { font-size:24px; font-weight:800; color:#E8573A; margin-bottom:4px; }
      .vl-svc-time { color:#999; font-size:13px; }

      /* BENEFITS */
      .vl-bene-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; margin-top:32px; }
      .vl-bene-item { background:#fff; border-radius:16px; padding:28px 24px; text-align:center; box-shadow:0 4px 16px rgba(45,43,61,.06); }
      .vl-bene-emoji { font-size:2rem; margin-bottom:10px; }
      .vl-bene-item h4 { font-size:16px; font-weight:700; color:#2D2B3D; margin-bottom:6px; }
      .vl-bene-item p { font-size:14px; color:#6B6880; line-height:1.6; }

      /* FAQ */
      .vl-faq-list { margin-top:36px; max-width:760px; margin-left:auto; margin-right:auto; }
      .vl-faq { background:#fff; border-radius:14px; margin-bottom:10px; border:1px solid #E8E4DF; overflow:hidden; }
      .vl-faq.open { border-color:#7B68EE; box-shadow:0 8px 24px rgba(123,104,238,.08); }
      .vl-faq-q { width:100%; display:flex; justify-content:space-between; align-items:center; padding:18px 22px; background:none; border:none; font-family:inherit; font-size:15px; font-weight:700; color:#2D2B3D; text-align:left; cursor:pointer; gap:12px; }
      .vl-faq-ico { width:28px; height:28px; border-radius:50%; background:#F5F0EB; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; color:#7B68EE; font-weight:700; transition:all .22s; }
      .vl-faq.open .vl-faq-ico { background:#7B68EE; color:#fff; transform:rotate(45deg); }
      .vl-faq-a { max-height:0; overflow:hidden; transition:max-height .3s; padding:0 22px; }
      .vl-faq.open .vl-faq-a { max-height:300px; }
      .vl-faq-ai { padding-bottom:18px; font-size:14px; color:#6B6880; line-height:1.65; }

      /* FINAL CTA */
      .vl-finalcta { background:linear-gradient(135deg,#E8573A,#FF7A5C); color:#fff; padding:96px 0; text-align:center; }
      .vl-finalcta h2 { font-size:clamp(24px,3.5vw,38px); font-weight:800; margin-bottom:14px; }
      .vl-finalcta p { font-size:17px; opacity:.95; margin-bottom:28px; max-width:540px; margin-left:auto; margin-right:auto; }
      .vl-finalcta-btn { display:inline-block; background:#fff; color:#E8573A; padding:16px 36px; border-radius:50px; font-weight:800; font-size:17px; transition:all .2s; }
      .vl-finalcta-btn:hover { transform:scale(1.05); box-shadow:0 8px 24px rgba(0,0,0,.2); }
      .vl-phone { display:block; margin-top:18px; font-size:14px; opacity:.9; }
      .vl-phone a { color:#fff; font-weight:700; text-decoration:underline; }

      @media(max-width:768px){
        .vl-section { padding:56px 0; }
        .vl-hero { padding:64px 0 90px; }
        .vl-picker { padding:24px 18px; }
        .vl-stats { gap:20px; }
        .vl-result-top { flex-direction:column; }
        .vl-stories-grid { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── HTML builders — no nested backticks ── */
  _buildStats(){
    return this.UI.heroStats.map(function(s){
      return '<div class="vl-stat">'
        + '<span class="vl-stat-num">'+s.num+'</span>'
        + '<span class="vl-stat-lbl">'+s.label+'</span>'
        + '</div>';
    }).join('');
  }

  _buildZones(){
    var me = this;
    var UI = this.UI;
    return VL_ZONES.map(function(z){
      var badge = z.type === 'city' ? UI.cityBadge : UI.umlandBadge;
      return '<button class="vl-zone" data-slug="'+z.slug+'" data-type="'+z.type+'" data-name="'+z.name+'">'
        + '<div class="vl-zname">'+badge+' '+z.name+'</div>'
        + '<div class="vl-zeta">~'+z.eta+' '+UI.minuteUnit+'</div>'
        + '</button>';
    }).join('');
  }

  _buildStoriesGrid(){
    var L = this.L;
    /* Show a curated selection of 6 stories */
    var picks = ['aussersihl','seefeld','oerlikon','hoengg','kilchberg','wiedikon'];
    return picks.map(function(key){
      var s = L.stories[key];
      if(!s) return '';
      return '<div class="vl-story-card">'
        + '<div class="vl-story-title">'+s.title+'</div>'
        + '<div class="vl-story-text">'+s.story+'</div>'
        + '</div>';
    }).join('');
  }

  _buildServices(){
    return this.L.services.map(function(s){
      return '<div class="vl-svc">'
        + '<div class="vl-svc-emoji">'+s.emoji+'</div>'
        + '<h4>'+s.name+'</h4>'
        + '<div class="vl-svc-price">ab CHF '+s.price+'</div>'
        + '<div class="vl-svc-time">⏱️ '+s.time+'</div>'
        + '</div>';
    }).join('');
  }

  _buildBenefits(){
    return this.L.benefits.map(function(b){
      return '<div class="vl-bene-item">'
        + '<div class="vl-bene-emoji">'+b.emoji+'</div>'
        + '<h4>'+b.title+'</h4>'
        + '<p>'+b.text+'</p>'
        + '</div>';
    }).join('');
  }

  _buildFaqs(){
    return this.L.faqs.map(function(f, i){
      return '<div class="vl-faq" data-i="'+i+'">'
        + '<button class="vl-faq-q" aria-expanded="false">'
        + '<span>'+f.q+'</span>'
        + '<span class="vl-faq-ico">+</span>'
        + '</button>'
        + '<div class="vl-faq-a"><div class="vl-faq-ai">'+f.a+'</div></div>'
        + '</div>';
    }).join('');
  }

  _countZones(type){
    if(type === 'all') return VL_ZONES.length;
    return VL_ZONES.filter(function(z){ return z.type === type; }).length;
  }

  render(){
    var UI = this.UI;
    var L = this.L;
    var C = VL_CONTACT;

    this.innerHTML = '<div class="vl-wrap">'

      /* HERO */
      + '<div class="vl-hero"><div class="vl-inner vl-hero-inner">'
      + '<div class="vl-hero-badge">'+UI.heroBadge+'</div>'
      + '<h1 class="vl-h1">'+UI.heroH1+'</h1>'
      + '<p class="vl-hero-sub">'+UI.heroSub+'</p>'
      + '<div class="vl-stats">'+this._buildStats()+'</div>'
      + '</div></div>'

      /* PICKER */
      + '<div class="vl-section" style="background:#fff"><div class="vl-inner">'
      + '<div class="vl-picker">'
      + '<div class="vl-picker-title">'+UI.pickerTitle+'</div>'
      + '<div class="vl-picker-lead">'+UI.pickerLead+'</div>'
      + '<div class="vl-search"><input type="text" id="vl-q" placeholder="'+UI.searchPlaceholder+'" autocomplete="off"/></div>'
      + '<div class="vl-filter">'
      + '<button class="vl-chip active" data-filter="all">'+UI.filterAll+' ('+this._countZones('all')+')</button>'
      + '<button class="vl-chip" data-filter="city">'+UI.filterCity+' ('+this._countZones('city')+')</button>'
      + '<button class="vl-chip" data-filter="umland">'+UI.filterUmland+' ('+this._countZones('umland')+')</button>'
      + '</div>'
      + '<div class="vl-zones" id="vl-zones">'+this._buildZones()+'</div>'
      + '<div class="vl-result" id="vl-result">'
      + '<div class="vl-result-top">'
      + '<div><h3 id="vl-rname">—</h3><div class="vl-landmark" id="vl-rlm">—</div></div>'
      + '<div><div class="vl-eta-big" id="vl-reta">—</div><div class="vl-eta-unit">'+UI.etaLabel+'</div></div>'
      + '</div>'
      + '<div class="vl-result-story" id="vl-rstory"></div>'
      + '<a id="vl-rcta" class="vl-result-cta" href="#" target="_blank" rel="noopener">💬 <span id="vl-rbtn">—</span></a>'
      + '</div>'
      + '</div>'
      + '</div></div>'

      /* ZÜRICH STORIES */
      + '<div class="vl-section" style="background:#F5F0EB"><div class="vl-inner">'
      + '<div style="text-align:center">'
      + '<div style="display:inline-block;font-size:12px;font-weight:700;color:#7B68EE;text-transform:uppercase;letter-spacing:1.8px;margin-bottom:12px">'+UI.storiesTitle+'</div>'
      + '<h2 style="font-size:clamp(24px,3vw,36px);font-weight:800;color:#2D2B3D;margin-bottom:14px;letter-spacing:-.02em">'+UI.storiesLead+'</h2>'
      + '</div>'
      + '<div class="vl-stories-grid">'+this._buildStoriesGrid()+'</div>'
      + '</div></div>'

      /* SERVICES */
      + '<div class="vl-section" style="background:#fff"><div class="vl-inner">'
      + '<div style="text-align:center">'
      + '<h2 style="font-size:clamp(24px,3vw,36px);font-weight:800;color:#2D2B3D;margin-bottom:14px">'+UI.servicesTitle+'</h2>'
      + '</div>'
      + '<div class="vl-svc-grid">'+this._buildServices()+'</div>'
      + '</div></div>'

      /* BENEFITS */
      + '<div class="vl-section" style="background:#F5F0EB"><div class="vl-inner">'
      + '<div style="text-align:center">'
      + '<h2 style="font-size:clamp(24px,3vw,36px);font-weight:800;color:#2D2B3D;margin-bottom:14px">'+UI.benefitsTitle+'</h2>'
      + '</div>'
      + '<div class="vl-bene-grid">'+this._buildBenefits()+'</div>'
      + '</div></div>'

      /* FAQ */
      + '<div class="vl-section" style="background:#fff"><div class="vl-inner">'
      + '<div style="text-align:center">'
      + '<div style="display:inline-block;font-size:12px;font-weight:700;color:#7B68EE;text-transform:uppercase;letter-spacing:1.8px;margin-bottom:12px">FAQ</div>'
      + '<h2 style="font-size:clamp(24px,3vw,36px);font-weight:800;color:#2D2B3D;margin-bottom:14px">'+UI.faqLabel+'</h2>'
      + '</div>'
      + '<div class="vl-faq-list">'+this._buildFaqs()+'</div>'
      + '</div></div>'

      /* FINAL CTA */
      + '<div class="vl-finalcta"><div class="vl-inner">'
      + '<h2>'+UI.ctaTitle+'</h2>'
      + '<p>'+UI.ctaBody+'</p>'
      + '<a class="vl-finalcta-btn" href="https://wa.me/'+C.waNumber+'?text='+encodeURIComponent(UI.waMainMsg)+'" target="_blank" rel="noopener">'+UI.ctaBtn+'</a>'
      + '<span class="vl-phone">'+UI.orCall+' <a href="tel:'+C.phone+'">'+C.phoneDisplay+'</a></span>'
      + '</div></div>'

      + '</div>'; /* end .vl-wrap */
  }

  bindEvents(){
    var me = this;

    /* Filter chips */
    this.querySelectorAll('.vl-chip').forEach(function(chip){
      chip.addEventListener('click', function(){
        me.state.filter = chip.dataset.filter;
        me.querySelectorAll('.vl-chip').forEach(function(c){ c.classList.toggle('active', c === chip); });
        me.applyFilter();
      });
    });

    /* Zone clicks */
    this.querySelectorAll('.vl-zone').forEach(function(zone){
      zone.addEventListener('click', function(){ me.selectZone(zone.dataset.slug); });
    });

    /* Search */
    var q = this.querySelector('#vl-q');
    if(q){
      q.addEventListener('input', function(e){
        me.state.query = e.target.value.toLowerCase().trim();
        me.applyFilter();
      });
    }

    /* FAQ */
    this.querySelectorAll('.vl-faq').forEach(function(item){
      item.querySelector('.vl-faq-q').addEventListener('click', function(){
        var wasOpen = item.classList.contains('open');
        me.querySelectorAll('.vl-faq').forEach(function(x){
          x.classList.remove('open');
          x.querySelector('.vl-faq-q').setAttribute('aria-expanded','false');
        });
        if(!wasOpen){
          item.classList.add('open');
          item.querySelector('.vl-faq-q').setAttribute('aria-expanded','true');
        }
      });
    });
  }

  applyFilter(){
    var filter = this.state.filter;
    var query = this.state.query;
    this.querySelectorAll('.vl-zone').forEach(function(zone){
      var typeOk = filter === 'all' || zone.dataset.type === filter;
      var nameOk = !query || zone.dataset.name.toLowerCase().indexOf(query) > -1;
      zone.style.display = (typeOk && nameOk) ? '' : 'none';
    });
  }

  selectZone(slug){
    var me = this;
    var UI = this.UI;
    var L = this.L;
    var C = VL_CONTACT;

    var z = VL_ZONES.find(function(x){ return x.slug === slug; });
    if(!z) return;
    this.state.selected = slug;

    this.querySelectorAll('.vl-zone').forEach(function(el){
      el.classList.toggle('selected', el.dataset.slug === slug);
    });

    var story = L.stories[z.storyKey] || {title:z.name, story:''};
    var waMsg = UI.waZoneMsg(z.name);

    var rname  = this.querySelector('#vl-rname');
    var rlm    = this.querySelector('#vl-rlm');
    var reta   = this.querySelector('#vl-reta');
    var rstory = this.querySelector('#vl-rstory');
    var rbtn   = this.querySelector('#vl-rbtn');
    var rcta   = this.querySelector('#vl-rcta');
    var panel  = this.querySelector('#vl-result');

    if(rname)  rname.textContent  = z.name;
    if(rlm)    rlm.textContent    = '📍 '+z.landmark;
    if(reta)   reta.textContent   = '~'+z.eta;
    if(rstory) rstory.textContent = story.story;
    if(rbtn)   rbtn.textContent   = UI.resultBookBtn(z.name);
    if(rcta)   rcta.setAttribute('href', 'https://wa.me/'+C.waNumber+'?text='+encodeURIComponent(waMsg));
    if(panel){
      panel.classList.add('show');
      try{ panel.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
    }
  }
}

if(!customElements.get('velov-locations')){
  customElements.define('velov-locations', VelovLocations);
}
