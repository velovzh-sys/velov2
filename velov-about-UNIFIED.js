/* ===================================================================
   VELOV — UNIFIED Multilingual About Us Custom Element
   Languages: de (primary) · en · fr · it · es
   Tag: <velov-about>

   SEO STRATEGY — Google E-E-A-T maximised:
   ✅ Person schema with real founder biography
   ✅ Organization schema with founding year, area served, awards
   ✅ FAQPage schema — 6 Q&As per language
   ✅ BreadcrumbList schema per language
   ✅ AboutPage schema type
   ✅ Real founder story (gymnasium → bike shops abroad → Altstetten
      shop → bikepacking winter → mobile revolution)
   ✅ Timeline with milestones — Google loves structured history
   ✅ Values section with green mobility / car-free Zürich angle
   ✅ Trust signals: 10+ years, 500+ repairs, 4.8 stars, solo+collab
   ✅ Localised content — all 5 languages, WhatsApp CTAs per language

   WIX PROVEN PATTERN:
   ✅ CSS targets .va-wrap — NOT velov-about tag
   ✅ No @import — Google Fonts via <link>
   ✅ No nested backticks — string concat only
   ✅ .va-wrap background:#F5F0EB + min-height:200px in CSS
   ✅ display:block + background + overflow:visible in connectedCallback
   ✅ const at top level
   ✅ _fixHeight() + ResizeObserver + 3 timers
=================================================================== */

/* ===== Shared SEO Helper ===== */
(function(){
  if(window.__velovSeoHelper) return;
  function safe(s){ return String(s==null?'':s).replace(/[\u0000-\u001F]/g,' '); }
  function buildMirror(s, faqLabel, contactLabel){
    var h='<article itemscope itemtype="https://schema.org/AboutPage">';
    h+='<header><h1>'+safe(s.h1)+'</h1>';
    if(s.intro) h+='<p>'+safe(s.intro)+'</p>';
    h+='</header>';
    (s.sections||[]).forEach(function(sec){
      h+='<section>';
      if(sec.h2) h+='<h2>'+safe(sec.h2)+'</h2>';
      if(sec.body) h+='<p>'+safe(sec.body)+'</p>';
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
      window.dataLayer.push(Object.assign({event:name},params||{}));
      if(typeof window.gtag==='function') window.gtag('event',name,params||{});
    }catch(e){}
  }
  function bind(host, lang){
    if(!host||host.__velovBound) return;
    host.__velovBound=true;
    host.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a');
      if(!a) return;
      var href=a.getAttribute('href')||'';
      var label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
      var ctx={page_component:host.tagName.toLowerCase(),page_path:(typeof location!=='undefined'?location.pathname:''),language:lang||'de'};
      if(/^https?:\/\/(?:wa\.me|api\.whatsapp\.com)/i.test(href)) pushEvent('whatsapp_click',Object.assign({link_url:href,link_text:label},ctx));
      else if(/^tel:/i.test(href)) pushEvent('phone_click',Object.assign({link_url:href,link_text:label},ctx));
      else if(/^mailto:/i.test(href)) pushEvent('email_click',Object.assign({link_url:href,link_text:label},ctx));
    },{passive:true,capture:true});
  }
  window.__velovTracker={bind:bind,pushEvent:pushEvent};
})();

/* ===================================================================
   SHARED CONSTANTS
=================================================================== */
const VA_CONTACT = {
  phone: '+41762352126',
  phoneDisplay: '+41 76 235 21 26',
  waNumber: '41762352126',
  email: 'info@velov.ch',
  address: 'Merkurstrasse 56, 8032 Zürich'
};

/* Timeline milestones — years are real, content accurate */
const VA_TIMELINE = [
  { year:'Jugend',  icon:'🚲', key:'youth'    },
  { year:'Früher',  icon:'🔧', key:'shops'    },
  { year:'Altstetten', icon:'🏪', key:'shop'  },
  { year:'Winter',  icon:'🏔️', key:'bikepack' },
  { year:'Heute',   icon:'📱', key:'mobile'   }
];

/* Values — shared IDs, labels per language */
const VA_VALUES_IDS = ['mobile','green','honest','passion','community'];

/* Stats */
const VA_STATS = [
  { num:'10+',   key:'years'   },
  { num:'500+',  key:'repairs' },
  { num:'4.8 ⭐', key:'stars'  },
  { num:'22+',   key:'zones'   }
];

/* ===================================================================
   LANGUAGE DETECTION
=================================================================== */
function detectVaLang(){
  try{ if(window.wixDevelopersAnalytics&&window.wixDevelopersAnalytics.currentLanguage) return window.wixDevelopersAnalytics.currentLanguage.toLowerCase().substring(0,2); }catch(e){}
  try{ var dl=document.documentElement.lang||''; if(dl) return dl.toLowerCase().substring(0,2); }catch(e){}
  try{ var m=window.location.pathname.match(/^\/(en|fr|it|es)(\/|$)/i); if(m) return m[1].toLowerCase(); }catch(e){}
  try{ var nav=(navigator.language||'de').toLowerCase().substring(0,2); if(['en','fr','it','es'].indexOf(nav)>-1) return nav; }catch(e){}
  return 'de';
}

/* ===================================================================
   MULTILINGUAL CONTENT
=================================================================== */
const VA_LANG = {

  /* ── DEUTSCH ── */
  de: {
    seo: {
      id:'about-de',
      h1:'Über VELOV — Zürichs erste mobile Velowerkstatt',
      intro:'VELOV ist Zürichs erste und meistbewertete mobile Velowerkstatt. Gegründet von einem passionierten Velofahrer, der seit der Schulzeit Velos repariert, im Ausland Werkstatterfahrung sammelte, eine kleine Werkstatt in Altstetten betrieb und nach einem Bikepacking-Winter VELOV als mobilen Service neu erfand. Über 500 Reparaturen. 4,8 Sterne. Für Zürich.',
      sections:[
        {h2:'Die Geschichte von VELOV', body:'Als Kind schon Velos repariert und auf dem Gymnasium verkauft. Danach Erfahrung in Veloshops im Ausland gesammelt. In Altstetten eine kleine Werkstatt mit Freunden betrieben — bis das Lokal nicht mehr tragbar war. Ein Bikepacking-Winter ohne Instagram, nur Natur und Pässe. Zurückgekehrt mit einer Idee: mobile Velowerkstatt, die zum Kunden kommt. Das war die Geburtsstunde von VELOV — der ersten mobilen Veloreparatur per Velo in der Schweiz.'},
        {h2:'Was VELOV einzigartig macht', body:'VELOV kommt per Velo oder Cargo-Bike zu dir. Kein Laden, kein Warten, kein Transport. Festpreise, die du vorher kennst. Reparatur vor Haustür, im Büro, am Bahnhof. Und wenn nötig, mit erfahrenen Zürcher Velomechanikern zusammengearbeitet.'},
        {h2:'Mission: Velo statt Auto in Zürich', body:'Jedes reparierte Velo ist ein Auto weniger auf Zürichs Strassen. VELOV glaubt an die emissionsfreie Stadt — und hilft täglich dabei, dass mehr Menschen sicher und gerne Velo fahren.'}
      ],
      faqs:[
        {q:'Wer steckt hinter VELOV?', a:'Ein leidenschaftlicher Velomechaniker, der seit der Schulzeit Velos repariert, im Ausland gearbeitet hat und VELOV als Zürichs erste mobile Velowerkstatt per Velo gegründet hat.'},
        {q:'Seit wann gibt es VELOV?', a:'VELOV existiert in verschiedenen Formen seit über 10 Jahren — zuerst als Werkstatt in Altstetten, dann als mobiler Service.'},
        {q:'Arbeitet ihr alleine oder im Team?', a:'Hauptsächlich solo, mit gelegentlicher Unterstützung von erfahrenen Zürcher Velomechanikern bei grösserem Aufkommen.'},
        {q:'Was unterscheidet VELOV von anderen Veloshops?', a:'Wir kommen zu dir — per Velo. Keine Öffnungszeiten, kein Transport, Festpreise. Das gibt es in der Schweiz nur bei VELOV.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zürich',
      schema:[
        {"@context":"https://schema.org","@type":"AboutPage","@id":"https://www.velov.ch/ueber-uns","name":"Über VELOV — Zürichs erste mobile Velowerkstatt","description":"VELOV ist Zürichs erste mobile Velowerkstatt. Gegründet von einem Velo-Enthusiasten. Über 500 Reparaturen, 4.8 Sterne Google.","url":"https://www.velov.ch/ueber-uns","inLanguage":"de","publisher":{"@type":"Organization","@id":"https://www.velov.ch/#org"}},
        {"@context":"https://schema.org","@type":"Organization","@id":"https://www.velov.ch/#org","name":"VELOV","alternateName":"VELOV Mobile Velowerkstatt Zürich","url":"https://www.velov.ch","logo":"https://www.velov.ch/og-image.jpg","foundingDate":"2014","foundingLocation":{"@type":"Place","name":"Zürich, Schweiz"},"description":"Zürichs erste und meistbewertete mobile Velowerkstatt. Reparatur per Velo direkt zu dir — in allen 12 Stadtkreisen und der Agglomeration.","areaServed":{"@type":"City","name":"Zürich"},"telephone":"+41762352126","email":"info@velov.ch","address":{"@type":"PostalAddress","streetAddress":"Merkurstrasse 56","addressLocality":"Zürich","postalCode":"8032","addressRegion":"ZH","addressCountry":"CH"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"sameAs":["https://g.page/r/Cde-mb4tOTU-EAE"]},
        {"@context":"https://schema.org","@type":"Person","@id":"https://www.velov.ch/#founder","name":"Gründer VELOV","jobTitle":"Velomechaniker & Gründer","worksFor":{"@id":"https://www.velov.ch/#org"},"description":"Leidenschaftlicher Velomechaniker seit der Jugend. Erfahrung in Veloshops in der Schweiz und im Ausland. Gründer von VELOV — der ersten mobilen Velowerkstatt per Velo in der Schweiz. Bikepacking-Enthusiast.","knowsAbout":["Fahrradreparatur","E-Bike Wartung","Cargo Bike Service","Mobile Werkstatt","Bikepacking"],"address":{"@type":"PostalAddress","addressLocality":"Zürich","addressCountry":"CH"}},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"de","mainEntity":[{"@type":"Question","name":"Wer gründete VELOV?","acceptedAnswer":{"@type":"Answer","text":"Ein leidenschaftlicher Velomechaniker, der seit dem Gymnasium Velos repariert, in Veloshops im Ausland gearbeitet hat und nach dem Scheitern eines stationären Ladens in Altstetten VELOV als mobilen Service neu erfand."}},{"@type":"Question","name":"Was ist das Besondere an VELOV?","acceptedAnswer":{"@type":"Answer","text":"VELOV kommt per Velo zu dir — kein Transport, keine Öffnungszeiten, Festpreise. Als erste mobile Velowerkstatt per Velo in der Schweiz."}},{"@type":"Question","name":"Seit wann gibt es VELOV?","acceptedAnswer":{"@type":"Answer","text":"VELOV existiert seit über 10 Jahren in verschiedenen Formen — zuerst als Ladengeschäft in Altstetten, dann als mobiler Service."}},{"@type":"Question","name":"Wie viele Velos hat VELOV schon repariert?","acceptedAnswer":{"@type":"Answer","text":"Über 500 dokumentierte Reparaturen im mobilen Betrieb, plus viele weitere aus der Zeit des stationären Ladens."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch"},{"@type":"ListItem","position":2,"name":"Über uns","item":"https://www.velov.ch/ueber-uns"}]}
      ]
    },
    ui:{
      faqLabel:'Häufige Fragen', contactLabel:'Kontakt',
      heroBadge:'Zürichs erste mobile Velowerkstatt',
      heroH1:'Wir sind VELOV.',
      heroSpan:'Velo repariert. Seit immer.',
      heroLead:'Gegründet von jemandem, der nie aufgehört hat, Velos zu lieben. Mobil, weil Zürich sich bewegt. Transparent, weil Velo demokratisch ist.',
      statLabels:{ years:'Jahre Erfahrung', repairs:'Reparaturen', stars:'Google Stars', zones:'Quartiere' },
      storyLabel:'Die Geschichte',
      storyTitle:'Von der Schulbank zur Velolane.',
      timelineItems:{
        youth:    { year:'Am Gymnasium',   title:'Der erste Schraubenzieher',          body:'Velos reparieren und verkaufen — schon auf dem Schulhof. Was für andere ein Hobby war, war für den Gründer von VELOV eine Berufung. Schlauchpatchen im Pausenhof, Getriebetuning nach der Schule.' },
        shops:    { year:'Im Ausland',      title:'Werkstatterfahrung jenseits der Grenze', body:'Veloshops ausserhalb der Schweiz. Andere Marken, andere Techniken, andere Tempi. Die Erkenntnis: Velos sind überall gleich — aber der Service nicht. Hier wächst das Know-how, das VELOV heute ausmacht.' },
        shop:     { year:'Altstetten',      title:'Ein kleiner Laden, grosse Pläne',    body:'Eine Werkstatt in Altstetten mit Freunden. Kundschaft aus dem Quartier, Velos aller Art, das Feeling von etwas Eigenem. Bis der Vermieter die Pläne durchkreuzte — das Lokal wurde zu teuer.' },
        bikepack: { year:'Der Winter',      title:'Rucksack, Velo, Stille',            body:'Kein Instagram. Kein Laden. Nur Pässe, Natur und die Frage: Was jetzt? Ein Bikepacking-Winter als Reset. Unterwegs die Idee, die alles verändert: Was, wenn die Werkstatt zum Kunden kommt — per Velo?' },
        mobile:   { year:'Heute',           title:'VELOV — die Werkstatt fährt zu dir', body:'Zurück in Zürich. Die Idee wird Realität. VELOV startet als erste mobile Velowerkstatt, die per Velo zu den Kunden kommt. Keine Miete, kein Leerlauf, keine Wartezeiten. Nur Velo, Werkzeug und Zürichs Velolanes.' }
      },
      missionLabel:'Mission',
      missionTitle:'Velos fahren. Autos weniger.',
      missionBody:'Jedes reparierte Velo ist ein kleiner Sieg für die Stadt. VELOV glaubt an ein Zürich, das sich auf zwei Rädern bewegt — und hilft täglich dabei, dass mehr Menschen sicher und gerne Velo fahren. Mobile Werkstatt, minimaler Fussabdruck, maximaler Nutzen.',
      valuesLabel:'Werte',
      valuesTitle:'Was uns antreibt.',
      values:{
        mobile:    { icon:'🚲', title:'Mobile First',      body:'Die Werkstatt kommt zu dir. Nicht umgekehrt. Das spart Zeit, CO₂ und Nerven.' },
        green:     { icon:'🌱', title:'Velo statt Auto',   body:'Emissionsfreie Mobilität. Jedes reparierte Velo hält ein Auto von der Strasse.' },
        honest:    { icon:'💯', title:'Transparenz',       body:'Preis vorher bekannt. Keine Überraschungen. Keine Mondpreise. Punkt.' },
        passion:   { icon:'❤️', title:'Leidenschaft',      body:'Velos sind keine Geräte — sie sind Freiheit. Wir reparieren sie mit dem Respekt, den sie verdienen.' },
        community: { icon:'🤝', title:'Zürich Community',  body:'Manchmal mit anderen Zürcher Velomechanikern zusammen. Lokales Netz, lokale Stärke.' }
      },
      teamLabel:'Team',
      teamTitle:'Solo. Manchmal zu zweit. Immer mit Leidenschaft.',
      teamDesc:'VELOV ist hauptsächlich ein Ein-Mann-Betrieb — mit gelegentlicher Unterstützung von erfahrenen Zürcher Velomechanikern, wenn der Bedarf es verlangt. Das hält die Qualität hoch und die Preise fair.',
      founderName:'VELOV Gründer',
      founderRole:'Velomechaniker & Gründer',
      founderBio:'Velos reparieren seit dem Gymnasium. Auslanderfahrung in Veloshops. Ehemaliger Ladenbesitzer in Altstetten. Bikepacking-Enthusiast. Gründer von Zürichs erster mobiler Velowerkstatt per Velo. Liebt Velolanes, Pässe und guten Espresso.',
      founderTags:['🚲 Velomechaniker', '🏔️ Bikepacker', '🔧 10+ Jahre Erfahrung', '📍 Zürich'],
      ctaTitle:'Bereit für den besten Velo-Service Zürichs?',
      ctaBody:'Schreib uns auf WhatsApp — wir kommen zu dir. Überall in Zürich.',
      ctaWa:'💬 WhatsApp schreiben',
      ctaCall:'📞 Anrufen',
      waMsg:'Hi VELOV! Ich habe eure Geschichte gelesen und möchte einen Termin buchen. Könnt ihr zu mir kommen?',
      faqSectionLabel:'FAQ',
      faqTitle:'Fragen über VELOV'
    },
    faqs:[
      {q:'Wer steckt hinter VELOV?', a:'Ein leidenschaftlicher Velomechaniker, der seit dem Gymnasium Velos repariert, in Veloshops im Ausland Erfahrung gesammelt hat, eine kleine Werkstatt in Altstetten betrieb — und nach einem Bikepacking-Winter VELOV als Zürichs erste mobile Velowerkstatt per Velo gegründet hat.'},
      {q:'Seit wann gibt es VELOV in Zürich?', a:'VELOV existiert in verschiedenen Formen seit über 10 Jahren — zuerst als stationäre Werkstatt in Altstetten, dann als mobiler Service. Die mobile Form ist die Erfindung, die Zürichs Veloszene verändert hat.'},
      {q:'Arbeitet ihr alleine oder als Team?', a:'Hauptsächlich solo — gelegentlich mit erfahrenen Zürcher Velomechanikern, wenn der Bedarf es erfordert. So bleibt die Qualität konstant hoch.'},
      {q:'Warum ist VELOV per Velo unterwegs?', a:'Weil wir praktizieren, was wir predigen. Kein Van, kein Auto — das Service-Velo oder Cargo-Bike fährt zu dir. Schnell, emissionsfrei, Zürich-typisch.'},
      {q:'Was kostet ein Service bei VELOV?', a:'Festpreise: Anfahrt CHF 49, Platten-Fix CHF 99 all-in, Standard Service CHF 179, Premium Service CHF 229. Alles transparent, kein Wenn und Aber.'},
      {q:'Wie buche ich einen Termin?', a:'Per WhatsApp an +41 76 235 21 26 oder per Anruf. Wir antworten innerhalb von Minuten und kommen meist noch am selben Tag.'}
    ]
  },

  /* ── ENGLISH ── */
  en: {
    seo: {
      id:'about-en',
      h1:'About VELOV — Zurich\'s First Mobile Bike Workshop',
      intro:'VELOV is Zurich\'s first and highest-rated mobile bike workshop. Founded by a passionate cyclist who has been repairing bikes since school, gained experience in workshops abroad, ran a small shop in Altstetten, and reinvented VELOV as a mobile service after a bikepacking winter. Over 500 repairs. 4.8 stars. Built for Zurich.',
      sections:[
        {h2:'The Story of VELOV', body:'Repairing and selling bikes at school from a young age. Then gaining hands-on experience in bike workshops outside Switzerland. Running a small shop in Altstetten with friends — until the lease became unsustainable. A bikepacking winter off-grid, no Instagram, just nature and mountain passes. Back with one idea: a mobile bike workshop that comes to you. That was the birth of VELOV — Switzerland\'s first mobile bike repair service by bike.'},
        {h2:'What Makes VELOV Unique', body:'VELOV comes to you by bike or cargo bike. No shop, no waiting, no transport hassle. Fixed prices you know upfront. Repair at your front door, office or station. And when needed, collaborating with experienced Zurich bike mechanics.'},
        {h2:'Mission: Bikes Over Cars in Zurich', body:'Every repaired bike is one fewer car on Zurich\'s streets. VELOV believes in the emission-free city — and helps daily to keep more people cycling safely and happily.'}
      ],
      faqs:[
        {q:'Who is behind VELOV?', a:'A passionate bike mechanic who has been repairing bikes since school, worked in workshops abroad and founded VELOV as Zurich\'s first mobile bike workshop by bike.'},
        {q:'How long has VELOV existed?', a:'VELOV has existed in different forms for over 10 years — first as a shop in Altstetten, then as a mobile service.'},
        {q:'Do you work alone or as a team?', a:'Mainly solo, occasionally with experienced Zurich bike mechanics when demand requires it.'},
        {q:'What makes VELOV different from other bike shops?', a:'We come to you — by bike. No opening hours, no transport, fixed prices. That only exists at VELOV in Switzerland.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema:[
        {"@context":"https://schema.org","@type":"AboutPage","@id":"https://www.velov.ch/en/about","name":"About VELOV — Zurich's First Mobile Bike Workshop","description":"VELOV is Zurich's first mobile bike workshop. Founded by a bike enthusiast. Over 500 repairs, 4.8 Google stars.","url":"https://www.velov.ch/en/about","inLanguage":"en","publisher":{"@type":"Organization","@id":"https://www.velov.ch/#org"}},
        {"@context":"https://schema.org","@type":"FAQPage","inLanguage":"en","mainEntity":[{"@type":"Question","name":"Who founded VELOV?","acceptedAnswer":{"@type":"Answer","text":"A passionate bike mechanic who has been repairing bikes since school, worked in workshops abroad, ran a shop in Altstetten, and reinvented VELOV as a mobile service after a bikepacking winter."}},{"@type":"Question","name":"What makes VELOV special?","acceptedAnswer":{"@type":"Answer","text":"VELOV comes to you by bike — no transport, no opening hours, fixed prices. Switzerland's first mobile bike workshop by bike."}},{"@type":"Question","name":"How long has VELOV existed?","acceptedAnswer":{"@type":"Answer","text":"VELOV has existed for over 10 years in different forms — first as a fixed shop in Altstetten, then as a mobile service."}},{"@type":"Question","name":"How many bikes has VELOV repaired?","acceptedAnswer":{"@type":"Answer","text":"Over 500 documented repairs in the mobile service, plus many more from the time of the fixed shop."}}]},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/en"},{"@type":"ListItem","position":2,"name":"About","item":"https://www.velov.ch/en/about"}]}
      ]
    },
    ui:{
      faqLabel:'Frequently Asked Questions', contactLabel:'Contact',
      heroBadge:'Zurich\'s first mobile bike workshop',
      heroH1:'We are VELOV.',
      heroSpan:'Repairing bikes. Since always.',
      heroLead:'Founded by someone who never stopped loving bikes. Mobile, because Zurich keeps moving. Transparent, because cycling is for everyone.',
      statLabels:{ years:'years experience', repairs:'repairs', stars:'Google stars', zones:'neighbourhoods' },
      storyLabel:'The Story',
      storyTitle:'From school desk to Zurich\'s bike lanes.',
      timelineItems:{
        youth:    { year:'At school',      title:'The first screwdriver',            body:'Repairing and selling bikes on the school playground. What was a hobby for others was a calling for VELOV\'s founder. Patching tubes at break time, tuning gears after class.' },
        shops:    { year:'Abroad',         title:'Workshop experience beyond the border', body:'Bike workshops outside Switzerland. Different brands, different techniques, different pace. The insight: bikes are the same everywhere — but service isn\'t. This is where the expertise that defines VELOV today was built.' },
        shop:     { year:'Altstetten',     title:'A small shop, big plans',          body:'A workshop in Altstetten with friends. Local customers, bikes of all kinds, the feeling of something truly their own. Until the landlord changed those plans — the premises became too expensive.' },
        bikepack: { year:'The winter',     title:'Backpack, bike, silence',          body:'No Instagram. No shop. Just mountain passes, nature and one question: what now? A bikepacking winter as a reset. And on the road, the idea that changes everything: what if the workshop comes to the customer — by bike?' },
        mobile:   { year:'Today',          title:'VELOV — the workshop rides to you', body:'Back in Zurich. The idea becomes reality. VELOV launches as the first mobile bike workshop that comes to customers by bike. No rent, no downtime, no waiting. Just bike, tools and Zurich\'s bike lanes.' }
      },
      missionLabel:'Mission',
      missionTitle:'Bikes rolling. Fewer cars.',
      missionBody:'Every repaired bike is a small victory for the city. VELOV believes in a Zurich that moves on two wheels — and helps daily to keep more people cycling safely and joyfully. Mobile workshop, minimal footprint, maximum impact.',
      valuesLabel:'Values',
      valuesTitle:'What drives us.',
      values:{
        mobile:    { icon:'🚲', title:'Mobile First',      body:'The workshop comes to you. Not the other way around. That saves time, CO₂ and frustration.' },
        green:     { icon:'🌱', title:'Bikes over cars',   body:'Emission-free mobility. Every repaired bike keeps a car off the road.' },
        honest:    { icon:'💯', title:'Transparency',      body:'Price known upfront. No surprises. No inflated quotes. Full stop.' },
        passion:   { icon:'❤️', title:'Passion',           body:'Bikes aren\'t appliances — they\'re freedom. We repair them with the respect they deserve.' },
        community: { icon:'🤝', title:'Zurich community',  body:'Occasionally working with other Zurich bike mechanics. Local network, local strength.' }
      },
      teamLabel:'Team',
      teamTitle:'Solo. Sometimes two. Always passionate.',
      teamDesc:'VELOV is mainly a one-person operation — occasionally supported by experienced Zurich bike mechanics when demand requires. This keeps quality consistently high and prices fair.',
      founderName:'VELOV Founder',
      founderRole:'Bike Mechanic & Founder',
      founderBio:'Repairing bikes since school. Workshop experience abroad. Former shop owner in Altstetten. Bikepacking enthusiast. Founder of Zurich\'s first mobile bike workshop by bike. Loves bike lanes, mountain passes and good espresso.',
      founderTags:['🚲 Bike mechanic', '🏔️ Bikepacker', '🔧 10+ years experience', '📍 Zurich'],
      ctaTitle:'Ready for the best bike service in Zurich?',
      ctaBody:'WhatsApp us — we come to you. Anywhere in Zurich.',
      ctaWa:'💬 WhatsApp us',
      ctaCall:'📞 Call us',
      waMsg:'Hi VELOV! I read your story and would like to book an appointment. Can you come to me?',
      faqSectionLabel:'FAQ',
      faqTitle:'Questions about VELOV'
    },
    faqs:[
      {q:'Who is behind VELOV?', a:'A passionate bike mechanic who has been repairing bikes since school, gained experience in workshops abroad, ran a small shop in Altstetten — and after a bikepacking winter founded VELOV as Zurich\'s first mobile bike workshop by bike.'},
      {q:'How long has VELOV existed in Zurich?', a:'VELOV has existed in different forms for over 10 years — first as a fixed workshop in Altstetten, then as a mobile service. The mobile form is the invention that changed Zurich\'s bike scene.'},
      {q:'Do you work alone or as a team?', a:'Mainly solo — occasionally with experienced Zurich bike mechanics when demand requires it. This keeps quality consistently high.'},
      {q:'Why does VELOV travel by bike?', a:'Because we practise what we preach. No van, no car — the service bike or cargo bike comes to you. Fast, emission-free, typically Zurich.'},
      {q:'How much does a VELOV service cost?', a:'Fixed prices: Travel CHF 49, flat fix CHF 99 all-in, Standard Service CHF 179, Premium Service CHF 229. All transparent, no ifs or buts.'},
      {q:'How do I book an appointment?', a:'Via WhatsApp at +41 76 235 21 26 or by phone. We reply within minutes and usually come the same day.'}
    ]
  },

  /* ── FRANÇAIS ── */
  fr: {
    seo: {
      id:'about-fr',
      h1:'À propos de VELOV — Premier Atelier Vélo Mobile de Zurich',
      intro:'VELOV est le premier atelier vélo mobile de Zurich et le mieux noté. Fondé par un passionné de vélo qui répare des vélos depuis l\'école, a acquis de l\'expérience dans des ateliers à l\'étranger, a tenu une petite boutique à Altstetten et a réinventé VELOV comme service mobile après un hiver de bikepacking.',
      sections:[
        {h2:'L\'Histoire de VELOV', body:'Réparer et vendre des vélos à l\'école dès le plus jeune âge. Puis acquérir une expérience pratique dans des ateliers vélo hors de Suisse. Tenir une petite boutique à Altstetten avec des amis — jusqu\'à ce que le loyer devienne insupportable. Un hiver de bikepacking sans Instagram, juste la nature et les cols. De retour avec une idée : un atelier vélo mobile qui vient chez vous. C\'est la naissance de VELOV — le premier service de réparation vélo mobile par vélo en Suisse.'},
        {h2:'Ce qui rend VELOV unique', body:'VELOV vient chez vous à vélo ou cargo bike. Pas de boutique, pas d\'attente, pas de transport. Prix fixes connus à l\'avance. Réparation à votre porte, bureau ou gare. Et si nécessaire, collaboration avec des mécaniciens vélo expérimentés à Zurich.'},
        {h2:'Mission : Vélos plutôt que voitures à Zurich', body:'Chaque vélo réparé est une voiture en moins dans les rues de Zurich. VELOV croit en la ville sans émissions — et aide chaque jour plus de personnes à pédaler en sécurité et avec plaisir.'}
      ],
      faqs:[
        {q:'Qui se cache derrière VELOV?', a:'Un mécanicien vélo passionné qui répare des vélos depuis l\'école, a travaillé dans des ateliers à l\'étranger et a fondé VELOV comme premier atelier vélo mobile de Zurich.'},
        {q:'Depuis combien de temps VELOV existe-t-il?', a:'VELOV existe sous différentes formes depuis plus de 10 ans — d\'abord comme boutique à Altstetten, puis comme service mobile.'},
        {q:'Travaillez-vous seul ou en équipe?', a:'Principalement seul, avec parfois le soutien de mécaniciens vélo expérimentés de Zurich quand la demande l\'exige.'},
        {q:'Qu\'est-ce qui différencie VELOV des autres ateliers?', a:'Nous venons chez vous — à vélo. Pas d\'horaires, pas de transport, prix fixes. Ça n\'existe qu\'à VELOV en Suisse.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurich',
      schema:[
        {"@context":"https://schema.org","@type":"AboutPage","@id":"https://www.velov.ch/fr/about","name":"À propos de VELOV — Premier Atelier Vélo Mobile de Zurich","url":"https://www.velov.ch/fr/about","inLanguage":"fr","publisher":{"@type":"Organization","@id":"https://www.velov.ch/#org"}},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.velov.ch/fr"},{"@type":"ListItem","position":2,"name":"À propos","item":"https://www.velov.ch/fr/about"}]}
      ]
    },
    ui:{
      faqLabel:'Questions fréquentes', contactLabel:'Contact',
      heroBadge:'Premier atelier vélo mobile de Zurich',
      heroH1:'Nous sommes VELOV.',
      heroSpan:'Des vélos réparés. Depuis toujours.',
      heroLead:'Fondé par quelqu\'un qui n\'a jamais cessé d\'aimer les vélos. Mobile, parce que Zurich avance. Transparent, parce que le vélo est pour tout le monde.',
      statLabels:{ years:'ans d\'expérience', repairs:'réparations', stars:'étoiles Google', zones:'quartiers' },
      storyLabel:'L\'histoire',
      storyTitle:'Du banc d\'école aux pistes cyclables de Zurich.',
      timelineItems:{
        youth:    { year:'À l\'école',      title:'Le premier tournevis',             body:'Réparer et vendre des vélos dans la cour de récréation. Ce qui était un hobby pour les autres était une vocation pour le fondateur de VELOV. Réparer des chambres à air à la pause, régler des vitesses après les cours.' },
        shops:    { year:'À l\'étranger',   title:'Expérience d\'atelier au-delà des frontières', body:'Des ateliers vélo hors de Suisse. D\'autres marques, d\'autres techniques, d\'autres rythmes. La prise de conscience : les vélos sont partout les mêmes — mais le service ne l\'est pas. C\'est ici que se forge le savoir-faire qui définit VELOV aujourd\'hui.' },
        shop:     { year:'Altstetten',      title:'Une petite boutique, de grands projets', body:'Un atelier à Altstetten avec des amis. Une clientèle de quartier, des vélos de toutes sortes, la sensation de quelque chose de vraiment personnel. Jusqu\'à ce que le propriétaire change tout — le local est devenu trop cher.' },
        bikepack: { year:'L\'hiver',        title:'Sac à dos, vélo, silence',         body:'Pas d\'Instagram. Pas de boutique. Juste des cols, la nature et une question : et maintenant ? Un hiver de bikepacking comme remise à zéro. Et sur la route, l\'idée qui change tout : et si l\'atelier venait chez le client — à vélo ?' },
        mobile:   { year:'Aujourd\'hui',    title:'VELOV — l\'atelier roule vers vous', body:'De retour à Zurich. L\'idée devient réalité. VELOV naît comme premier atelier vélo mobile qui vient chez les clients à vélo. Pas de loyer, pas de temps mort, pas d\'attente. Juste un vélo, des outils et les pistes cyclables de Zurich.' }
      },
      missionLabel:'Mission',
      missionTitle:'Des vélos qui roulent. Moins de voitures.',
      missionBody:'Chaque vélo réparé est une petite victoire pour la ville. VELOV croit en un Zurich qui avance sur deux roues — et aide chaque jour plus de personnes à pédaler en sécurité et avec joie. Atelier mobile, empreinte minimale, impact maximal.',
      valuesLabel:'Valeurs',
      valuesTitle:'Ce qui nous pousse.',
      values:{
        mobile:    { icon:'🚲', title:'Mobile d\'abord',    body:'L\'atelier vient chez vous. Pas l\'inverse. Ça économise du temps, du CO₂ et de l\'énergie.' },
        green:     { icon:'🌱', title:'Vélo plutôt que voiture', body:'Mobilité sans émissions. Chaque vélo réparé garde une voiture hors de la rue.' },
        honest:    { icon:'💯', title:'Transparence',       body:'Prix connu à l\'avance. Pas de surprises. Pas de tarifs gonflés. Un point c\'est tout.' },
        passion:   { icon:'❤️', title:'Passion',           body:'Les vélos ne sont pas des appareils — ce sont des libertés. Nous les réparons avec le respect qu\'ils méritent.' },
        community: { icon:'🤝', title:'Communauté Zurich',  body:'Parfois avec d\'autres mécaniciens zurichois. Réseau local, force locale.' }
      },
      teamLabel:'Équipe',
      teamTitle:'Solo. Parfois à deux. Toujours passionné.',
      teamDesc:'VELOV est principalement une opération individuelle — avec parfois le soutien de mécaniciens vélo expérimentés de Zurich quand la demande l\'exige. Cela maintient une qualité constamment élevée et des prix justes.',
      founderName:'Fondateur VELOV',
      founderRole:'Mécanicien Vélo & Fondateur',
      founderBio:'Répare des vélos depuis l\'école. Expérience dans des ateliers à l\'étranger. Ancien propriétaire de boutique à Altstetten. Passionné de bikepacking. Fondateur du premier atelier vélo mobile de Zurich. Aime les pistes cyclables, les cols et le bon espresso.',
      founderTags:['🚲 Mécanicien vélo', '🏔️ Bikepacker', '🔧 10+ ans d\'expérience', '📍 Zurich'],
      ctaTitle:'Prêt pour le meilleur service vélo de Zurich ?',
      ctaBody:'Écrivez-nous sur WhatsApp — nous venons chez vous. Partout à Zurich.',
      ctaWa:'💬 WhatsApp',
      ctaCall:'📞 Appeler',
      waMsg:'Bonjour VELOV ! J\'ai lu votre histoire et je souhaite prendre rendez-vous. Pouvez-vous venir chez moi ?',
      faqSectionLabel:'FAQ',
      faqTitle:'Questions sur VELOV'
    },
    faqs:[
      {q:'Qui se cache derrière VELOV ?', a:'Un mécanicien vélo passionné qui répare des vélos depuis l\'école, a acquis de l\'expérience dans des ateliers à l\'étranger, a tenu une petite boutique à Altstetten — et après un hiver de bikepacking a fondé VELOV comme premier atelier vélo mobile de Zurich.'},
      {q:'Depuis combien de temps VELOV existe-t-il à Zurich ?', a:'VELOV existe sous différentes formes depuis plus de 10 ans — d\'abord comme atelier fixe à Altstetten, puis comme service mobile.'},
      {q:'Travaillez-vous seul ou en équipe ?', a:'Principalement seul — parfois avec des mécaniciens vélo expérimentés de Zurich quand la demande l\'exige. La qualité reste ainsi constamment élevée.'},
      {q:'Pourquoi VELOV se déplace-t-il à vélo ?', a:'Parce que nous pratiquons ce que nous prêchons. Pas de camionnette, pas de voiture — le vélo de service ou le cargo bike vient chez vous. Rapide, sans émissions, typiquement zurichois.'},
      {q:'Combien coûte un service VELOV ?', a:'Prix fixes : Déplacement CHF 49, réparation crevaison CHF 99 tout compris, Service Standard CHF 179, Service Premium CHF 229. Tout transparent, pas de conditions.'},
      {q:'Comment prendre rendez-vous ?', a:'Par WhatsApp au +41 76 235 21 26 ou par téléphone. Nous répondons en quelques minutes et venons généralement le jour même.'}
    ]
  },

  /* ── ITALIANO ── */
  it: {
    seo: {
      id:'about-it',
      h1:'Chi Siamo — VELOV, Prima Officina Mobile di Biciclette a Zurigo',
      intro:'VELOV è la prima e meglio valutata officina mobile di biciclette di Zurigo. Fondata da un appassionato ciclista che ripara bici dalla scuola, ha acquisito esperienza in officine all\'estero, ha gestito un piccolo negozio ad Altstetten e ha reinventato VELOV come servizio mobile dopo un inverno di bikepacking.',
      sections:[
        {h2:'La Storia di VELOV', body:'Riparare e vendere bici fin da piccolo. Poi acquisire esperienza pratica in officine ciclistiche fuori dalla Svizzera. Gestire un piccolo negozio ad Altstetten con amici — fino a quando l\'affitto è diventato insostenibile. Un inverno di bikepacking off-grid, senza Instagram, solo natura e passi di montagna. Di ritorno con un\'idea: un\'officina mobile che viene da te. È la nascita di VELOV — il primo servizio di riparazione bici mobile in bicicletta in Svizzera.'},
        {h2:'Cosa rende VELOV unico', body:'VELOV viene da te in bici o cargo bike. Nessun negozio, nessuna attesa, nessun trasporto. Prezzi fissi che conosci in anticipo. Riparazione a casa tua, in ufficio o in stazione. E se necessario, collaborazione con meccanici di bici esperti di Zurigo.'},
        {h2:'Missione: Bici al posto delle auto a Zurigo', body:'Ogni bici riparata è un\'auto in meno nelle strade di Zurigo. VELOV crede nella città senza emissioni — e aiuta ogni giorno più persone a pedalare in sicurezza e con gioia.'}
      ],
      faqs:[
        {q:'Chi c\'è dietro VELOV?', a:'Un meccanico di bici appassionato che ripara bici dalla scuola, ha lavorato in officine all\'estero e ha fondato VELOV come prima officina mobile di Zurigo.'},
        {q:'Da quanto tempo esiste VELOV?', a:'VELOV esiste in varie forme da oltre 10 anni — prima come negozio ad Altstetten, poi come servizio mobile.'},
        {q:'Lavorate da soli o in team?', a:'Principalmente in solitaria, con occasionale supporto di meccanici di bici esperti di Zurigo quando la domanda lo richiede.'},
        {q:'Cosa differenzia VELOV dalle altre officine?', a:'Veniamo da te — in bici. Nessun orario, nessun trasporto, prezzi fissi. Esiste solo da VELOV in Svizzera.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zurigo',
      schema:[
        {"@context":"https://schema.org","@type":"AboutPage","@id":"https://www.velov.ch/it/about","name":"Chi Siamo — VELOV, Prima Officina Mobile di Biciclette a Zurigo","url":"https://www.velov.ch/it/about","inLanguage":"it","publisher":{"@type":"Organization","@id":"https://www.velov.ch/#org"}},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.velov.ch/it"},{"@type":"ListItem","position":2,"name":"Chi siamo","item":"https://www.velov.ch/it/about"}]}
      ]
    },
    ui:{
      faqLabel:'Domande frequenti', contactLabel:'Contatto',
      heroBadge:'Prima officina mobile di bici a Zurigo',
      heroH1:'Siamo VELOV.',
      heroSpan:'Bici riparate. Da sempre.',
      heroLead:'Fondato da qualcuno che non ha mai smesso di amare le bici. Mobile, perché Zurigo si muove. Trasparente, perché la bici è per tutti.',
      statLabels:{ years:'anni di esperienza', repairs:'riparazioni', stars:'stelle Google', zones:'quartieri' },
      storyLabel:'La storia',
      storyTitle:'Dal banco di scuola alle piste ciclabili di Zurigo.',
      timelineItems:{
        youth:    { year:'A scuola',        title:'Il primo cacciavite',              body:'Riparare e vendere bici nel cortile della scuola. Quello che per gli altri era un hobby, per il fondatore di VELOV era una vocazione. Riparare camere d\'aria durante la pausa, regolare i cambi dopo le lezioni.' },
        shops:    { year:'All\'estero',     title:'Esperienza in officina oltre confine', body:'Officine ciclistiche fuori dalla Svizzera. Marche diverse, tecniche diverse, ritmi diversi. La consapevolezza: le bici sono uguali ovunque — ma il servizio no. Qui si costruisce il know-how che definisce VELOV oggi.' },
        shop:     { year:'Altstetten',      title:'Un piccolo negozio, grandi piani', body:'Un\'officina ad Altstetten con amici. Clienti del quartiere, bici di ogni tipo, la sensazione di qualcosa di proprio. Finché il padrone di casa non ha cambiato i piani — il locale è diventato troppo caro.' },
        bikepack: { year:'L\'inverno',      title:'Zaino, bici, silenzio',            body:'Niente Instagram. Niente negozio. Solo passi di montagna, natura e una domanda: e adesso? Un inverno di bikepacking come reset. E lungo la strada, l\'idea che cambia tutto: e se l\'officina venisse dal cliente — in bici?' },
        mobile:   { year:'Oggi',            title:'VELOV — l\'officina arriva da te', body:'Di ritorno a Zurigo. L\'idea diventa realtà. VELOV nasce come prima officina mobile che va dai clienti in bici. Nessun affitto, nessun tempo morto, nessuna attesa. Solo bici, attrezzi e le piste ciclabili di Zurigo.' }
      },
      missionLabel:'Missione',
      missionTitle:'Bici in marcia. Meno auto.',
      missionBody:'Ogni bici riparata è una piccola vittoria per la città. VELOV crede in una Zurigo che si muove su due ruote — e aiuta ogni giorno più persone a pedalare in sicurezza e con gioia. Officina mobile, impronta minima, impatto massimo.',
      valuesLabel:'Valori',
      valuesTitle:'Cosa ci spinge.',
      values:{
        mobile:    { icon:'🚲', title:'Mobile prima di tutto', body:'L\'officina viene da te. Non il contrario. Questo risparmia tempo, CO₂ e frustrazione.' },
        green:     { icon:'🌱', title:'Bici invece di auto',   body:'Mobilità senza emissioni. Ogni bici riparata tiene un\'auto fuori dalla strada.' },
        honest:    { icon:'💯', title:'Trasparenza',           body:'Prezzo noto in anticipo. Nessuna sorpresa. Nessun preventivo gonfiato. Punto.' },
        passion:   { icon:'❤️', title:'Passione',             body:'Le bici non sono apparecchi — sono libertà. Le ripariamo con il rispetto che meritano.' },
        community: { icon:'🤝', title:'Community Zurigo',      body:'A volte con altri meccanici zurighesi. Rete locale, forza locale.' }
      },
      teamLabel:'Team',
      teamTitle:'In solitaria. A volte in due. Sempre con passione.',
      teamDesc:'VELOV è principalmente un\'operazione individuale — con occasionale supporto di meccanici di bici esperti di Zurigo quando la domanda lo richiede. Questo mantiene la qualità costantemente alta e i prezzi equi.',
      founderName:'Fondatore VELOV',
      founderRole:'Meccanico di Bici & Fondatore',
      founderBio:'Ripara bici dalla scuola. Esperienza in officine all\'estero. Ex proprietario di negozio ad Altstetten. Appassionato di bikepacking. Fondatore della prima officina mobile di bici a Zurigo. Ama le piste ciclabili, i passi di montagna e il buon espresso.',
      founderTags:['🚲 Meccanico bici', '🏔️ Bikepacker', '🔧 10+ anni esperienza', '📍 Zurigo'],
      ctaTitle:'Pronto per il miglior servizio bici di Zurigo?',
      ctaBody:'Scrivici su WhatsApp — veniamo da te. Ovunque a Zurigo.',
      ctaWa:'💬 WhatsApp',
      ctaCall:'📞 Chiama',
      waMsg:'Ciao VELOV! Ho letto la vostra storia e vorrei prenotare un appuntamento. Potete venire da me?',
      faqSectionLabel:'FAQ',
      faqTitle:'Domande su VELOV'
    },
    faqs:[
      {q:'Chi c\'è dietro VELOV?', a:'Un meccanico di bici appassionato che ripara bici dalla scuola, ha acquisito esperienza in officine all\'estero, ha gestito un piccolo negozio ad Altstetten — e dopo un inverno di bikepacking ha fondato VELOV come prima officina mobile di Zurigo.'},
      {q:'Da quanto tempo esiste VELOV a Zurigo?', a:'VELOV esiste in varie forme da oltre 10 anni — prima come officina fissa ad Altstetten, poi come servizio mobile.'},
      {q:'Lavorate da soli o in team?', a:'Principalmente in solitaria — a volte con meccanici di bici esperti di Zurigo quando la domanda lo richiede. La qualità rimane così costantemente alta.'},
      {q:'Perché VELOV si sposta in bici?', a:'Perché pratichiamo quello che predichiamo. Nessun furgone, nessuna auto — la bici di servizio o il cargo bike viene da te. Veloce, senza emissioni, tipicamente zurighese.'},
      {q:'Quanto costa un servizio VELOV?', a:'Prezzi fissi: Trasferta CHF 49, riparazione foratura CHF 99 tutto compreso, Servizio Standard CHF 179, Servizio Premium CHF 229. Tutto trasparente, nessuna condizione.'},
      {q:'Come prenoto un appuntamento?', a:'Via WhatsApp al +41 76 235 21 26 o per telefono. Rispondiamo in pochi minuti e di solito veniamo lo stesso giorno.'}
    ]
  },

  /* ── ESPAÑOL ── */
  es: {
    seo: {
      id:'about-es',
      h1:'Sobre Nosotros — VELOV, Primer Taller Móvil de Bicicletas de Zúrich',
      intro:'VELOV es el primer y mejor valorado taller móvil de bicicletas de Zúrich. Fundado por un apasionado ciclista que repara bicicletas desde la escuela, ganó experiencia en talleres en el extranjero, gestionó una pequeña tienda en Altstetten y reinventó VELOV como servicio móvil tras un invierno de bikepacking.',
      sections:[
        {h2:'La Historia de VELOV', body:'Reparar y vender bicicletas desde pequeño. Luego adquirir experiencia práctica en talleres de bicicletas fuera de Suiza. Gestionar una pequeña tienda en Altstetten con amigos — hasta que el alquiler se hizo insostenible. Un invierno de bikepacking sin Instagram, solo naturaleza y puertos de montaña. De vuelta con una idea: un taller móvil que va a donde estés. Ese fue el nacimiento de VELOV — el primer servicio de reparación de bicicletas móvil en bicicleta de Suiza.'},
        {h2:'Lo que hace único a VELOV', body:'VELOV va a donde estés en bici o cargo bike. Sin tienda, sin esperas, sin transporte. Precios fijos que conoces de antemano. Reparación en tu puerta, oficina o estación. Y si es necesario, colaborando con mecánicos de bicicletas experimentados de Zúrich.'},
        {h2:'Misión: Bicis en lugar de coches en Zúrich', body:'Cada bici reparada es un coche menos en las calles de Zúrich. VELOV cree en la ciudad sin emisiones — y ayuda cada día a que más personas circulen en bici de forma segura y con alegría.'}
      ],
      faqs:[
        {q:'¿Quién está detrás de VELOV?', a:'Un mecánico de bicicletas apasionado que repara bicicletas desde la escuela, trabajó en talleres en el extranjero y fundó VELOV como el primer taller móvil de bicicletas de Zúrich.'},
        {q:'¿Desde cuándo existe VELOV?', a:'VELOV existe en distintas formas desde hace más de 10 años — primero como tienda en Altstetten, luego como servicio móvil.'},
        {q:'¿Trabajáis solos o en equipo?', a:'Principalmente en solitario, con apoyo ocasional de mecánicos de bicicletas con experiencia de Zúrich cuando la demanda lo requiere.'},
        {q:'¿Qué diferencia a VELOV de otros talleres?', a:'Vamos a donde estás — en bici. Sin horarios, sin transporte, precios fijos. Solo existe en VELOV en Suiza.'}
      ],
      contact:'WhatsApp +41 76 235 21 26 · info@velov.ch · Merkurstrasse 56, 8032 Zúrich',
      schema:[
        {"@context":"https://schema.org","@type":"AboutPage","@id":"https://www.velov.ch/es/about","name":"Sobre Nosotros — VELOV, Primer Taller Móvil de Bicicletas de Zúrich","url":"https://www.velov.ch/es/about","inLanguage":"es","publisher":{"@type":"Organization","@id":"https://www.velov.ch/#org"}},
        {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.velov.ch/es"},{"@type":"ListItem","position":2,"name":"Sobre nosotros","item":"https://www.velov.ch/es/about"}]}
      ]
    },
    ui:{
      faqLabel:'Preguntas frecuentes', contactLabel:'Contacto',
      heroBadge:'Primer taller móvil de bicicletas de Zúrich',
      heroH1:'Somos VELOV.',
      heroSpan:'Bicicletas reparadas. Desde siempre.',
      heroLead:'Fundado por alguien que nunca dejó de amar las bicicletas. Móvil, porque Zúrich se mueve. Transparente, porque la bici es para todos.',
      statLabels:{ years:'años de experiencia', repairs:'reparaciones', stars:'estrellas Google', zones:'barrios' },
      storyLabel:'La historia',
      storyTitle:'Del pupitre escolar a los carriles bici de Zúrich.',
      timelineItems:{
        youth:    { year:'En la escuela',    title:'El primer destornillador',         body:'Reparar y vender bicicletas en el patio del colegio. Lo que para otros era un hobby, para el fundador de VELOV era una vocación. Parchar cámaras en el recreo, ajustar cambios después de clase.' },
        shops:    { year:'En el extranjero', title:'Experiencia en taller más allá de la frontera', body:'Talleres de bicicletas fuera de Suiza. Otras marcas, otras técnicas, otros ritmos. La conclusión: las bicicletas son iguales en todas partes — pero el servicio no. Aquí se forja el conocimiento que define VELOV hoy.' },
        shop:     { year:'Altstetten',       title:'Una pequeña tienda, grandes planes', body:'Un taller en Altstetten con amigos. Clientes del barrio, bicicletas de todo tipo, la sensación de algo propio. Hasta que el propietario cambió los planes — el local se volvió demasiado caro.' },
        bikepack: { year:'El invierno',      title:'Mochila, bici, silencio',          body:'Sin Instagram. Sin tienda. Solo puertos de montaña, naturaleza y una pregunta: ¿y ahora qué? Un invierno de bikepacking como reset. Y en la ruta, la idea que lo cambia todo: ¿y si el taller fuera al cliente — en bici?' },
        mobile:   { year:'Hoy',             title:'VELOV — el taller va a donde estés', body:'De vuelta en Zúrich. La idea se hace realidad. VELOV nace como el primer taller móvil que va a los clientes en bici. Sin alquiler, sin tiempos muertos, sin esperas. Solo bici, herramientas y los carriles bici de Zúrich.' }
      },
      missionLabel:'Misión',
      missionTitle:'Bicis rodando. Menos coches.',
      missionBody:'Cada bici reparada es una pequeña victoria para la ciudad. VELOV cree en un Zúrich que se mueve sobre dos ruedas — y ayuda cada día a que más personas circulen en bici con seguridad y alegría. Taller móvil, huella mínima, impacto máximo.',
      valuesLabel:'Valores',
      valuesTitle:'Lo que nos impulsa.',
      values:{
        mobile:    { icon:'🚲', title:'Mobile First',       body:'El taller va a ti. No al revés. Eso ahorra tiempo, CO₂ y nervios.' },
        green:     { icon:'🌱', title:'Bici en lugar de coche', body:'Movilidad sin emisiones. Cada bici reparada mantiene un coche fuera de la calle.' },
        honest:    { icon:'💯', title:'Transparencia',      body:'Precio conocido antes de reservar. Sin sorpresas. Sin presupuestos inflados. Punto.' },
        passion:   { icon:'❤️', title:'Pasión',            body:'Las bicicletas no son aparatos — son libertad. Las reparamos con el respeto que merecen.' },
        community: { icon:'🤝', title:'Comunidad Zúrich',   body:'A veces con otros mecánicos zurichenses. Red local, fuerza local.' }
      },
      teamLabel:'Equipo',
      teamTitle:'En solitario. A veces en pareja. Siempre con pasión.',
      teamDesc:'VELOV es principalmente una operación individual — con apoyo ocasional de mecánicos de bicicletas experimentados de Zúrich cuando la demanda lo requiere. Esto mantiene la calidad consistentemente alta y los precios justos.',
      founderName:'Fundador VELOV',
      founderRole:'Mecánico de Bicicletas & Fundador',
      founderBio:'Reparando bicicletas desde la escuela. Experiencia en talleres en el extranjero. Ex propietario de tienda en Altstetten. Apasionado del bikepacking. Fundador del primer taller móvil de bicicletas de Zúrich. Le encantan los carriles bici, los puertos de montaña y el buen espresso.',
      founderTags:['🚲 Mecánico bici', '🏔️ Bikepacker', '🔧 10+ años experiencia', '📍 Zúrich'],
      ctaTitle:'¿Listo para el mejor servicio de bici de Zúrich?',
      ctaBody:'Escríbenos por WhatsApp — vamos a donde estés. En toda Zúrich.',
      ctaWa:'💬 WhatsApp',
      ctaCall:'📞 Llamar',
      waMsg:'¡Hola VELOV! He leído vuestra historia y me gustaría reservar una cita. ¿Podéis venir a donde estoy?',
      faqSectionLabel:'FAQ',
      faqTitle:'Preguntas sobre VELOV'
    },
    faqs:[
      {q:'¿Quién está detrás de VELOV?', a:'Un mecánico de bicicletas apasionado que repara bicicletas desde la escuela, adquirió experiencia en talleres en el extranjero, gestionó una pequeña tienda en Altstetten — y tras un invierno de bikepacking fundó VELOV como el primer taller móvil de Zúrich.'},
      {q:'¿Desde cuándo existe VELOV en Zúrich?', a:'VELOV existe en distintas formas desde hace más de 10 años — primero como taller fijo en Altstetten, luego como servicio móvil.'},
      {q:'¿Trabajáis solos o en equipo?', a:'Principalmente en solitario — a veces con mecánicos de bicicletas experimentados de Zúrich cuando la demanda lo requiere. La calidad se mantiene así consistentemente alta.'},
      {q:'¿Por qué VELOV se desplaza en bici?', a:'Porque practicamos lo que predicamos. Sin furgoneta, sin coche — la bici de servicio o el cargo bike va a donde estés. Rápido, sin emisiones, típicamente zurichense.'},
      {q:'¿Cuánto cuesta un servicio VELOV?', a:'Precios fijos: Desplazamiento CHF 49, reparación pinchazo CHF 99 todo incluido, Servicio Estándar CHF 179, Servicio Premium CHF 229. Todo transparente, sin condiciones.'},
      {q:'¿Cómo reservo una cita?', a:'Por WhatsApp al +41 76 235 21 26 o por teléfono. Respondemos en minutos y solemos ir el mismo día.'}
    ]
  }
};

/* ===================================================================
   CUSTOM ELEMENT
=================================================================== */
class VelovAbout extends HTMLElement {

  constructor(){
    super();
    this._lang = detectVaLang();
    if(!VA_LANG[this._lang]) this._lang = 'de';
    this._openFaq = null;
  }

  get L(){ return VA_LANG[this._lang]; }
  get UI(){ return this.L.ui; }

  connectedCallback(){
    /* ── WIX VISIBILITY FIX — proven pattern ── */
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
    if(document.getElementById('velov-about-styles')) return;
    if(!document.getElementById('velov-about-font')){
      try{
        var lnk=document.createElement('link');
        lnk.id='velov-about-font'; lnk.rel='stylesheet';
        lnk.href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(lnk);
      }catch(e){}
    }
    var s=document.createElement('style');
    s.id='velov-about-styles';
    /* ALL rules target .va-wrap — NEVER velov-about tag */
    s.textContent = `
      .va-wrap { display:block; width:100%; min-height:200px; background:#F5F0EB; font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif; color:#2D2B3D; line-height:1.6; -webkit-font-smoothing:antialiased; }
      .va-wrap *, .va-wrap *::before, .va-wrap *::after { margin:0; padding:0; box-sizing:border-box; }
      .va-wrap a { text-decoration:none; }
      .va-inner { max-width:1120px; margin:0 auto; padding:0 24px; }
      .va-section { padding:96px 0; }
      .va-lbl { display:inline-block; font-size:12px; font-weight:700; color:#7B68EE; text-transform:uppercase; letter-spacing:2px; margin-bottom:12px; }
      .va-title { font-size:clamp(26px,3.5vw,40px); font-weight:800; color:#2D2B3D; line-height:1.15; margin-bottom:16px; letter-spacing:-.02em; }
      .va-sub { font-size:17px; color:#6B6880; max-width:620px; line-height:1.65; }
      .va-center { text-align:center; margin:0 auto; }

      /* HERO */
      .va-hero { background:linear-gradient(150deg,#2D2B3D 0%,#3d3960 50%,#1a1833 100%); color:#fff; padding:112px 0 140px; text-align:center; position:relative; overflow:hidden; }
      .va-hero::before { content:''; position:absolute; top:-60%; left:-10%; width:700px; height:700px; background:radial-gradient(circle,rgba(123,104,238,.2),transparent 65%); filter:blur(60px); }
      .va-hero::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:70px; background:#F5F0EB; border-radius:60% 60% 0 0 / 100% 100% 0 0; }
      .va-hero-in { position:relative; z-index:2; }
      .va-hero-badge { display:inline-block; background:rgba(123,104,238,.2); border:1px solid rgba(123,104,238,.4); color:#b9aeff; padding:8px 20px; border-radius:50px; font-size:13px; font-weight:600; margin-bottom:24px; letter-spacing:.8px; }
      .va-h1 { font-size:clamp(38px,6vw,68px); font-weight:800; line-height:1; margin:0 auto 18px; letter-spacing:-.03em; color:#fff; }
      .va-h1 .va-grad { background:linear-gradient(90deg,#7B68EE,#a394ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .va-hero-lead { font-size:19px; opacity:.85; max-width:600px; margin:0 auto 40px; line-height:1.55; color:#fff; }

      /* STATS BAR */
      .va-stats { display:flex; justify-content:center; gap:0; flex-wrap:wrap; max-width:800px; margin:0 auto; }
      .va-stat { flex:1; min-width:140px; padding:24px 16px; text-align:center; border-right:1px solid rgba(255,255,255,.1); }
      .va-stat:last-child { border-right:0; }
      .va-stat-num { font-size:30px; font-weight:800; color:#fff; display:block; line-height:1; }
      .va-stat-lbl { font-size:12px; opacity:.75; margin-top:5px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#fff; display:block; }

      /* STORY / TIMELINE */
      .va-timeline { position:relative; margin-top:60px; }
      .va-timeline::before { content:''; position:absolute; left:32px; top:0; bottom:0; width:3px; background:linear-gradient(180deg,#7B68EE,#E8573A); border-radius:3px; }
      .va-tl-item { display:flex; gap:28px; margin-bottom:52px; position:relative; }
      .va-tl-icon { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg,#7B68EE,#6354d4); color:#fff; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; box-shadow:0 8px 24px rgba(123,104,238,.35); border:4px solid #F5F0EB; position:relative; z-index:2; }
      .va-tl-content { flex:1; padding-top:10px; }
      .va-tl-year { font-size:12px; font-weight:700; color:#7B68EE; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:4px; }
      .va-tl-title { font-size:20px; font-weight:800; color:#2D2B3D; margin-bottom:8px; }
      .va-tl-body { font-size:15px; color:#6B6880; line-height:1.65; max-width:540px; }

      /* MISSION */
      .va-mission { background:linear-gradient(135deg,#7B68EE,#6354d4); color:#fff; padding:96px 0; text-align:center; }
      .va-mission .va-lbl { color:rgba(255,255,255,.7); }
      .va-mission .va-title { color:#fff; }
      .va-mission p { font-size:18px; opacity:.92; max-width:680px; margin:0 auto; line-height:1.65; color:#fff; }

      /* VALUES */
      .va-values-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px; margin-top:48px; }
      .va-val { background:#fff; border-radius:20px; padding:32px 24px; text-align:center; border:1px solid #E8E4DF; transition:all .22s; }
      .va-val:hover { transform:translateY(-5px); box-shadow:0 12px 32px rgba(123,104,238,.1); border-color:#7B68EE; }
      .va-val-icon { font-size:2.4rem; margin-bottom:12px; }
      .va-val h3 { font-size:17px; font-weight:700; color:#2D2B3D; margin-bottom:8px; }
      .va-val p { font-size:14px; color:#6B6880; line-height:1.6; }

      /* FOUNDER CARD */
      .va-founder { background:#fff; border-radius:28px; padding:48px; box-shadow:0 16px 40px rgba(45,43,61,.08); border:1px solid #E8E4DF; max-width:700px; margin:48px auto 0; }
      .va-founder-top { display:flex; gap:28px; align-items:flex-start; flex-wrap:wrap; margin-bottom:24px; }
      .va-avatar { width:96px; height:96px; border-radius:50%; background:linear-gradient(135deg,#7B68EE,#E8573A); display:flex; align-items:center; justify-content:center; font-size:3rem; flex-shrink:0; }
      .va-founder-info h3 { font-size:22px; font-weight:800; color:#2D2B3D; margin-bottom:4px; }
      .va-founder-role { font-size:14px; color:#7B68EE; font-weight:600; margin-bottom:8px; }
      .va-founder-bio { font-size:15px; color:#6B6880; line-height:1.65; }
      .va-founder-tags { display:flex; gap:8px; flex-wrap:wrap; margin-top:20px; }
      .va-tag { background:#F5F0EB; color:#2D2B3D; padding:6px 14px; border-radius:50px; font-size:13px; font-weight:600; }

      /* FAQ */
      .va-faq-list { margin-top:40px; max-width:760px; margin-left:auto; margin-right:auto; }
      .va-faq { background:#fff; border-radius:16px; margin-bottom:10px; border:1px solid #E8E4DF; overflow:hidden; transition:all .2s; }
      .va-faq.open { border-color:#7B68EE; box-shadow:0 8px 24px rgba(123,104,238,.1); }
      .va-faq-q { width:100%; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; background:none; border:none; font-family:inherit; font-size:16px; font-weight:700; color:#2D2B3D; text-align:left; cursor:pointer; gap:12px; }
      .va-faq-ico { width:30px; height:30px; border-radius:50%; background:#F5F0EB; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; color:#7B68EE; font-weight:700; transition:all .22s; }
      .va-faq.open .va-faq-ico { background:#7B68EE; color:#fff; transform:rotate(45deg); }
      .va-faq-a { max-height:0; overflow:hidden; transition:max-height .3s; padding:0 24px; }
      .va-faq.open .va-faq-a { max-height:400px; }
      .va-faq-ai { padding-bottom:20px; font-size:15px; color:#6B6880; line-height:1.65; }

      /* CTA */
      .va-cta { background:linear-gradient(135deg,#E8573A,#FF7A5C); color:#fff; text-align:center; padding:96px 0; }
      .va-cta h2 { font-size:clamp(26px,4vw,40px); font-weight:800; margin-bottom:16px; }
      .va-cta p { font-size:18px; opacity:.95; margin-bottom:32px; max-width:560px; margin-left:auto; margin-right:auto; }
      .va-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
      .va-cta-btn { display:inline-flex; align-items:center; gap:10px; padding:17px 36px; border-radius:50px; font-weight:700; font-size:17px; transition:all .22s; cursor:pointer; }
      .va-cta-wa { background:#25D366; color:#fff; }
      .va-cta-wa:hover { background:#1ebe5b; transform:translateY(-2px); }
      .va-cta-tel { background:rgba(255,255,255,.12); color:#fff; border:1px solid rgba(255,255,255,.25); }
      .va-cta-tel:hover { background:rgba(255,255,255,.2); transform:translateY(-2px); }
      .va-cta-contact { margin-top:22px; font-size:13px; opacity:.8; }
      .va-cta-contact a { color:#fff; text-decoration:underline; }

      @media(max-width:768px){
        .va-section { padding:64px 0; }
        .va-hero { padding:72px 0 100px; }
        .va-stats { gap:0; }
        .va-stat { min-width:50%; border-right:0; border-bottom:1px solid rgba(255,255,255,.1); }
        .va-tl-item { gap:16px; }
        .va-timeline::before { left:24px; }
        .va-tl-icon { width:48px; height:48px; font-size:18px; }
        .va-founder { padding:28px 20px; }
        .va-founder-top { flex-direction:column; gap:16px; }
        .va-values-grid { grid-template-columns:1fr 1fr; }
        .va-mission { padding:64px 0; }
        .va-cta { padding:64px 0; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ── HTML builders — no nested backticks ── */
  _buildStats(){
    var L = this.L;
    var UI = this.UI;
    return VA_STATS.map(function(s){
      return '<div class="va-stat">'
        + '<span class="va-stat-num">'+s.num+'</span>'
        + '<span class="va-stat-lbl">'+UI.statLabels[s.key]+'</span>'
        + '</div>';
    }).join('');
  }

  _buildTimeline(){
    var UI = this.UI;
    return VA_TIMELINE.map(function(t){
      var item = UI.timelineItems[t.key];
      return '<div class="va-tl-item">'
        + '<div class="va-tl-icon">'+t.icon+'</div>'
        + '<div class="va-tl-content">'
        + '<div class="va-tl-year">'+item.year+'</div>'
        + '<h3 class="va-tl-title">'+item.title+'</h3>'
        + '<p class="va-tl-body">'+item.body+'</p>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  _buildValues(){
    var UI = this.UI;
    return VA_VALUES_IDS.map(function(key){
      var v = UI.values[key];
      return '<div class="va-val">'
        + '<div class="va-val-icon">'+v.icon+'</div>'
        + '<h3>'+v.title+'</h3>'
        + '<p>'+v.body+'</p>'
        + '</div>';
    }).join('');
  }

  _buildTags(){
    var UI = this.UI;
    return UI.founderTags.map(function(t){
      return '<span class="va-tag">'+t+'</span>';
    }).join('');
  }

  _buildFaqs(){
    var L = this.L;
    return L.faqs.map(function(f, i){
      return '<div class="va-faq" data-i="'+i+'">'
        + '<button class="va-faq-q" aria-expanded="false">'
        + '<span>'+f.q+'</span>'
        + '<span class="va-faq-ico">+</span>'
        + '</button>'
        + '<div class="va-faq-a"><div class="va-faq-ai">'+f.a+'</div></div>'
        + '</div>';
    }).join('');
  }

  render(){
    var UI = this.UI;
    var C = VA_CONTACT;

    this.innerHTML = '<div class="va-wrap">'

      /* HERO */
      + '<div class="va-hero"><div class="va-inner va-hero-in">'
      + '<div class="va-hero-badge">'+UI.heroBadge+'</div>'
      + '<h1 class="va-h1">'+UI.heroH1+'<br><span class="va-grad">'+UI.heroSpan+'</span></h1>'
      + '<p class="va-hero-lead">'+UI.heroLead+'</p>'
      + '<div class="va-stats">'+this._buildStats()+'</div>'
      + '</div></div>'

      /* STORY / TIMELINE */
      + '<div class="va-section" style="background:#F5F0EB"><div class="va-inner">'
      + '<div class="va-lbl">'+UI.storyLabel+'</div>'
      + '<h2 class="va-title">'+UI.storyTitle+'</h2>'
      + '<div class="va-timeline">'+this._buildTimeline()+'</div>'
      + '</div></div>'

      /* MISSION */
      + '<div class="va-mission"><div class="va-inner va-center">'
      + '<div class="va-lbl">'+UI.missionLabel+'</div>'
      + '<h2 class="va-title">'+UI.missionTitle+'</h2>'
      + '<p>'+UI.missionBody+'</p>'
      + '</div></div>'

      /* VALUES */
      + '<div class="va-section" style="background:#F5F0EB"><div class="va-inner">'
      + '<div class="va-center">'
      + '<div class="va-lbl">'+UI.valuesLabel+'</div>'
      + '<h2 class="va-title">'+UI.valuesTitle+'</h2>'
      + '</div>'
      + '<div class="va-values-grid">'+this._buildValues()+'</div>'
      + '</div></div>'

      /* FOUNDER / TEAM */
      + '<div class="va-section" style="background:#fff"><div class="va-inner">'
      + '<div class="va-center">'
      + '<div class="va-lbl">'+UI.teamLabel+'</div>'
      + '<h2 class="va-title">'+UI.teamTitle+'</h2>'
      + '<p class="va-sub va-center">'+UI.teamDesc+'</p>'
      + '</div>'
      + '<div class="va-founder">'
      + '<div class="va-founder-top">'
      + '<div class="va-avatar">🚲</div>'
      + '<div class="va-founder-info">'
      + '<h3>'+UI.founderName+'</h3>'
      + '<div class="va-founder-role">'+UI.founderRole+'</div>'
      + '<p class="va-founder-bio">'+UI.founderBio+'</p>'
      + '</div>'
      + '</div>'
      + '<div class="va-founder-tags">'+this._buildTags()+'</div>'
      + '</div>'
      + '</div></div>'

      /* FAQ */
      + '<div class="va-section" style="background:#F5F0EB"><div class="va-inner">'
      + '<div class="va-center">'
      + '<div class="va-lbl">'+UI.faqSectionLabel+'</div>'
      + '<h2 class="va-title">'+UI.faqTitle+'</h2>'
      + '</div>'
      + '<div class="va-faq-list">'+this._buildFaqs()+'</div>'
      + '</div></div>'

      /* FINAL CTA */
      + '<div class="va-cta"><div class="va-inner">'
      + '<h2>'+UI.ctaTitle+'</h2>'
      + '<p>'+UI.ctaBody+'</p>'
      + '<div class="va-cta-row">'
      + '<a href="https://wa.me/'+C.waNumber+'?text='+encodeURIComponent(UI.waMsg)+'" class="va-cta-btn va-cta-wa" target="_blank" rel="noopener">'+UI.ctaWa+'</a>'
      + '<a href="tel:'+C.phone+'" class="va-cta-btn va-cta-tel">'+UI.ctaCall+' '+C.phoneDisplay+'</a>'
      + '</div>'
      + '<div class="va-cta-contact"><a href="mailto:'+C.email+'">'+C.email+'</a> · '+C.address+'</div>'
      + '</div></div>'

      + '</div>'; /* end .va-wrap */
  }

  bindEvents(){
    var me = this;
    this.querySelectorAll('.va-faq').forEach(function(item){
      item.querySelector('.va-faq-q').addEventListener('click', function(){
        var wasOpen = item.classList.contains('open');
        me.querySelectorAll('.va-faq').forEach(function(x){
          x.classList.remove('open');
          x.querySelector('.va-faq-q').setAttribute('aria-expanded','false');
        });
        if(!wasOpen){
          item.classList.add('open');
          item.querySelector('.va-faq-q').setAttribute('aria-expanded','true');
        }
      });
    });
  }
}

if(!customElements.get('velov-about')){
  customElements.define('velov-about', VelovAbout);
}
