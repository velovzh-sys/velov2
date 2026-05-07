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
      heroSub: 'Wir warten dein E-Bike mechanisch direkt bei dir vor der Tür. Alle Marken — gleicher
