/* ===================================================================
   VELOV — UNIFIED Multilingual Pannendienst Custom Element
   Languages: de (primary) · en · fr · it · es
   Tag: <velov-pannendienst>
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

const VP_ZONES = [
  { id:'zentrum', name:'Zürich Zentrum', areas:['Altstadt','Niederdorf','Seefeld','Enge','Wiedikon'], eta:35 },
  { id:'west',    name:'Zürich West',    areas:['Kreis 4','Kreis 5','Aussersihl','Albisrieden','Altstetten'], eta:45 },
  { id:'nord',    name:'Zürich Nord',    areas:['Oerlikon','Seebach','Affoltern','Schwamendingen','Wipkingen'], eta:45 },
  { id:'ost',     name:'Zürich Ost',     areas:['Zürichberg','Hottingen','Fluntern','Witikon','Hirslanden'], eta:45 },
  { id:'sued',    name:'Zürich Süd',     areas:['Leimbach','Wollishofen','Adliswil','Kilchberg'], eta:55 },
  { id:'umland',  name:'Zürcher Umland', areas:['Dübendorf','Opfikon','Glattbrugg','Zollikon','Küsnacht'], eta:65 }
];

/* ===================================================================
   MULTILINGUAL CONTENT (Simplified for this example)
   =================================================================== */
const VP_LANG = {
  de: {
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
      etaPriceNote:'Festpreis CHF 99 all-inclusive für die meisten Fälle.',
      waZoneMsg:(zname,areas)=>`Hallo VELOV, ich brauche den Pannendienst!\n• Standort: ${zname}\n• Problem: Plattfuss`,
      inclLabel:'All-Inclusive',
      inclTitle:'Was ist im Preis von CHF 99 enthalten?',
      inclSub:'Alles, was ein Plattfuss wirklich braucht.',
      tiersLabel:'Preise nach Velo-Typ',
      tiersTitle:'Transparente Festpreise für Zürich',
      tiersSub:'Für 99 % unserer Einsätze gilt CHF 99.',
      tierFrom:'ab',
      stepsLabel:'Ablauf',
      stepsTitle:'So schnell geht\'s',
      faqLabel2:'FAQ',
      faqTitle:'Häufige Fragen zum Pannendienst',
      ctaTitle:'Plattfuss? Ruf jetzt an oder schreib per WhatsApp.',
      ctaBody:'CHF 99 all-inclusive in Zürich.',
      ctaFooter:'Mobiler Pannendienst für Velo, E-Bike und Cargo-Bike in Zürich'
    },
    seo: { id:'pannendienst-de', h1:'Velo Pannendienst Zürich', intro:'Plattfuss in Zürich?', sections:[], faqs:[], schema:[] }
  }
};

/* ===================================================================
   CUSTOM ELEMENT DEFINITION
   =================================================================== */
class VelovPannendienst extends HTMLElement {
  constructor() {
    super();
    this.state = { lang: 'de', zone: 'zentrum', openFaq: null };
  }

  connectedCallback() {
    const wixLang = (window.wixEmbedsAPI && window.wixEmbedsAPI.getLanguage) 
      ? window.wixEmbedsAPI.getLanguage() 
      : document.documentElement.lang || 'de';
    this.state.lang = VP_LANG[wixLang.slice(0,2)] ? wixLang.slice(0,2) : 'de';
    this.render();
    if (window.__velovTracker) window.__velovTracker.bind(this, this.state.lang);
    if (window.__velovSeoHelper) window.__velovSeoHelper.injectSeo(this, VP_LANG[this.state.lang].seo, VP_LANG[this.state.lang].ui.faqLabel, VP_LANG[this.state.lang].ui.contactLabel);
  }

  render() {
    const L = VP_LANG[this.state.lang];
    const UI = L.ui;
    this.innerHTML = `
      <style>
        :host { display: block; font-family: sans-serif; color: #1a1a1a; }
        .vp-hero { padding: 40px 20px; text-align: center; background: #f9f9f9; }
        .vp-cta-box { display: flex; gap: 10px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
        .vp-btn { padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; }
        .vp-btn-primary { background: #000; color: #fff; }
        .vp-btn-wa { background: #25D366; color: #fff; }
      </style>
      <div class="vp-hero">
        <h1>${UI.heroH1}</h1>
        <p>${UI.heroSub}</p>
        <div class="vp-cta-box">
          <a href="tel:${VP_CONTACT.phone}" class="vp-btn vp-btn-primary">${UI.ctaPhone}</a>
          <a href="https://wa.me/${VP_CONTACT.waNumber}?text=${encodeURIComponent(UI.waHeroMsg)}" class="vp-btn vp-btn-wa">${UI.ctaWa}</a>
        </div>
      </div>
    `;
  }
}

customElements.define('velov-pannendienst', VelovPannendienst);
