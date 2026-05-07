/* =========================================================================
 * VELOV — SERVICES | <velov-services>
 * Interactive element: Live Service-Package calculator w/ side-by-side compare
 * Wix Setup: Tag = velov-services | Upload this JS file
 * ========================================================================= */

class VelovServices extends HTMLElement {
  static CONFIG = {
    phone:'+41762352126', waNumber:'41762352126', email:'info@velov.ch', domain:'https://www.velov.ch',
    packages: [
      { id:'basic',    badge:'Basic',    title:'Basic Check',      price:79,  subtitle:'15-Punkte-Inspektion',   desc:'Schneller Rundum-Check für Vielfahrer',
        features:['Bremsen prüfen & einstellen','Schaltung prüfen & einstellen','Reifendruck & Zustand','Kette schmieren','Licht & Reflektoren','Schrauben nachziehen'] },
      { id:'standard', badge:'Standard', title:'Standard Service', price:129, subtitle:'25-Punkte-Inspektion',   desc:'Unser beliebtester Service — gründlich & komplett', featured:true,
        features:['Alles aus dem Basic Check','Bremsen justieren & Beläge prüfen','Schaltung fein einstellen','Laufräder zentrieren','Steuersatz & Tretlager prüfen','Züge & Hüllen prüfen','Kette prüfen & schmieren'] },
      { id:'premium',  badge:'Premium',  title:'Premium Service',  price:189, subtitle:'35-Punkte-Inspektion',   desc:'Komplett-Service für Anspruchsvolle',
        features:['Alles aus dem Standard Service','Kettenreinigung (Deep Clean)','Komplettreinigung des Velos','Lager prüfen & nachstellen','Speichenspannung prüfen','Bremsflächen reinigen','Abschlussbericht & Empfehlungen'] },
    ],
    extras: [
      { id:'tire',   label:'Reifenwechsel (inkl. Schlauch)', price:29, icon:'🛞' },
      { id:'chain',  label:'Kettenwechsel',                  price:25, icon:'⛓️' },
      { id:'brake',  label:'Bremsbeläge (hydraulisch)',       price:35, icon:'🛑' },
      { id:'shift',  label:'Schaltung neu einstellen',        price:29, icon:'🔄' },
      { id:'wheel',  label:'Laufrad zentrieren',              price:25, icon:'🎯' },
      { id:'light',  label:'Licht montieren (LED-Set)',       price:19, icon:'💡' },
      { id:'cargo',  label:'Cargo-Bike Zuschlag',             price:20, icon:'📦' },
      { id:'ebike',  label:'E-Bike Motor-Check',              price:49, icon:'⚡' },
    ],
    faqs: [
      { q:'Was ist im Service-Preis enthalten?', a:'Arbeitszeit, Werkzeug, Anfahrt in Zürich sind inbegriffen. Verbrauchsmaterial (Schmiermittel, Putzmittel) auch. Ersatzteile werden transparent nach Aufwand verrechnet.' },
      { q:'Wie lange dauert ein Service?',       a:'Basic: ca. 30–45 Min. Standard: 60–75 Min. Premium: 90–120 Min. Wir arbeiten effizient, aber gründlich.' },
      { q:'Brauche ich spezielle Teile?',        a:'Meist haben wir alle gängigen Teile dabei. Spezialteile bestellen wir innert 2–3 Tagen und machen einen zweiten Termin.' },
      { q:'Kann ich den Service kombinieren?',   a:'Klar! Pakete + Extras frei kombinierbar. Mit dem Rechner oben siehst du den Gesamtpreis live.' },
    ],
  };

  connectedCallback(){
    this.state = { pkg:'standard', extras:new Set(), openFaq:null };
    this.injectBase(); this.injectStyles(); this.render(); this.injectSchema(); this.wire();
  }

  injectBase(){ if(document.getElementById('velov-base-styles'))return; const c=document.createElement('style');c.id='velov-base-styles';c.textContent=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');:root{--v-purple:#7B68EE;--v-purple-dark:#6354d4;--v-orange:#E8573A;--v-orange-dark:#d14a30;--v-dark:#2D2B3D;--v-warm:#F5F0EB;--v-white:#fff;--v-text:#2D2B3D;--v-muted:#6B6880;--v-border:#E8E4DF;--v-green:#4CAF50;--v-shadow:0 12px 32px rgba(123,104,238,.10);--v-shadow-lg:0 20px 50px rgba(45,43,61,.12)}`;document.head.appendChild(c); }

  injectStyles(){
    if(document.getElementById('velov-services-styles'))return;
    const css=`
    velov-services{display:block;font-family:'DM Sans',system-ui,sans-serif;color:var(--v-text);line-height:1.6;-webkit-font-smoothing:antialiased}
    velov-services *,velov-services *::before,velov-services *::after{margin:0;padding:0;box-sizing:border-box}
    velov-services .vs-wrap{max-width:1140px;margin:0 auto;padding:0 24px}
    velov-services .vs-section{padding:84px 0}
    velov-services .vs-lbl{display:inline-block;font-size:12px;font-weight:700;color:var(--v-purple);text-transform:uppercase;letter-spacing:1.8px;margin-bottom:12px}
    velov-services .vs-title{font-size:clamp(26px,3.6vw,40px);font-weight:800;color:var(--v-dark);line-height:1.15;margin-bottom:16px;letter-spacing:-.02em}
    velov-services .vs-sub{font-size:17px;color:var(--v-muted);max-width:620px;margin:0 auto;line-height:1.65}
    velov-services .vs-center{text-align:center}
    velov-services .vs-btn{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:700;font-size:16px;padding:16px 34px;border-radius:50px;border:none;cursor:pointer;transition:all .22s;font-family:inherit}

    velov-services .vs-hero{background:linear-gradient(135deg,#fbfafe 0%,var(--v-warm) 100%);padding:96px 0 80px;text-align:center;position:relative;overflow:hidden}
    velov-services .vs-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(123,104,238,.12),transparent 65%);filter:blur(50px)}
    velov-services .vs-hero-in{position:relative;z-index:2}
    velov-services .vs-hero-badge{display:inline-block;background:rgba(123,104,238,.12);color:var(--v-purple);font-size:13px;font-weight:700;padding:7px 18px;border-radius:50px;margin-bottom:22px;letter-spacing:1px;text-transform:uppercase}
    velov-services h1.vs-h1{font-size:clamp(34px,5.2vw,56px);font-weight:800;color:var(--v-dark);line-height:1.05;margin-bottom:22px;letter-spacing:-.03em}
    velov-services h1.vs-h1 .vs-grad{background:linear-gradient(90deg,var(--v-purple),#9B8AFF);-webkit-background-clip:text;background-clip:text;color:transparent}
    velov-services .vs-hero p.vs-lead{font-size:19px;color:var(--v-muted);max-width:620px;margin:0 auto 32px;line-height:1.55}

    /* Compare toggle tabs */
    velov-services .vs-tabs{display:inline-flex;background:#fff;border-radius:50px;padding:6px;margin:0 auto 40px;box-shadow:var(--v-shadow);border:1px solid var(--v-border)}
    velov-services .vs-tab{padding:10px 22px;border:none;background:transparent;font-family:inherit;font-size:14px;font-weight:700;color:var(--v-muted);cursor:pointer;border-radius:50px;transition:all .22s}
    velov-services .vs-tab.on{background:var(--v-purple);color:#fff;box-shadow:0 4px 12px rgba(123,104,238,.35)}

    /* Packages grid */
    velov-services .vs-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:32px}
    velov-services .vs-pkg{background:var(--v-white);border-radius:24px;padding:36px 30px;border:2px solid var(--v-border);transition:all .25s;position:relative;cursor:pointer}
    velov-services .vs-pkg:hover{border-color:var(--v-purple);transform:translateY(-4px);box-shadow:var(--v-shadow)}
    velov-services .vs-pkg.on{border-color:var(--v-purple);box-shadow:var(--v-shadow-lg);background:linear-gradient(135deg,#fff 0%,#fbfafe 100%)}
    velov-services .vs-pkg.featured::before{content:'⭐ BELIEBT';position:absolute;top:-14px;left:28px;background:var(--v-orange);color:#fff;font-size:11px;font-weight:800;padding:6px 14px;border-radius:50px;letter-spacing:1px}
    velov-services .vs-pkg-badge{display:inline-block;font-size:11px;font-weight:800;color:var(--v-purple);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px}
    velov-services .vs-pkg h3{font-size:24px;font-weight:800;color:var(--v-dark);margin-bottom:4px;letter-spacing:-.02em}
    velov-services .vs-pkg-desc{font-size:14px;color:var(--v-muted);margin-bottom:20px;min-height:42px}
    velov-services .vs-pkg-price{padding:18px 0;border-top:1px solid var(--v-border);border-bottom:1px solid var(--v-border);margin-bottom:22px}
    velov-services .vs-pkg-amt{font-size:40px;font-weight:800;color:var(--v-purple);line-height:1;letter-spacing:-.02em}
    velov-services .vs-pkg-amt small{font-size:15px;color:var(--v-muted);font-weight:600}
    velov-services .vs-pkg-sub{font-size:12px;color:var(--v-muted);margin-top:6px}
    velov-services .vs-pkg ul{list-style:none}
    velov-services .vs-pkg li{font-size:14px;padding:7px 0 7px 26px;position:relative;color:var(--v-text)}
    velov-services .vs-pkg li::before{content:'✓';position:absolute;left:0;color:var(--v-green);font-weight:800}
    velov-services .vs-pkg-select{display:block;margin-top:24px;background:var(--v-warm);color:var(--v-dark);text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:14px;transition:all .2s;border:none;width:100%;font-family:inherit;cursor:pointer}
    velov-services .vs-pkg.on .vs-pkg-select{background:var(--v-purple);color:#fff}
    velov-services .vs-pkg:not(.on) .vs-pkg-select:hover{background:#efe9e1}

    /* Extras block */
    velov-services .vs-extras{margin-top:44px;background:var(--v-white);border-radius:24px;padding:40px;box-shadow:var(--v-shadow);border:1px solid var(--v-border)}
    velov-services .vs-extras h3{font-size:19px;font-weight:700;margin-bottom:6px;color:var(--v-dark)}
    velov-services .vs-extras-hint{font-size:14px;color:var(--v-muted);margin-bottom:22px}
    velov-services .vs-ext-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
    velov-services .vs-ext{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:14px;background:var(--v-warm);cursor:pointer;border:2px solid transparent;transition:all .18s;font-size:13.5px}
    velov-services .vs-ext:hover{background:#efe9e1}
    velov-services .vs-ext.on{background:#ede9ff;border-color:var(--v-purple)}
    velov-services .vs-ext-ic{font-size:18px;flex-shrink:0}
    velov-services .vs-ext-lbl{flex:1;font-weight:500;line-height:1.3}
    velov-services .vs-ext-px{font-weight:700;color:var(--v-purple);font-size:13px;white-space:nowrap}

    /* Total bar */
    velov-services .vs-total{margin-top:28px;padding:24px;background:linear-gradient(135deg,var(--v-purple),var(--v-purple-dark));color:#fff;border-radius:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
    velov-services .vs-total-l{font-size:13px;text-transform:uppercase;letter-spacing:1.5px;opacity:.9;font-weight:600}
    velov-services .vs-total-a{font-size:42px;font-weight:800;letter-spacing:-.02em}
    velov-services .vs-total-f{font-size:12px;opacity:.8;margin-top:4px}
    velov-services .vs-wa{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;text-decoration:none;padding:14px 26px;border-radius:50px;font-weight:700;font-size:15px;transition:all .2s;box-shadow:0 8px 22px rgba(37,211,102,.4)}
    velov-services .vs-wa:hover{background:#1ebe5b;transform:translateY(-2px)}
    velov-services .vs-wa svg{width:20px;height:20px}

    /* FAQ */
    velov-services .vs-faq-list{margin-top:40px;max-width:780px;margin-left:auto;margin-right:auto}
    velov-services .vs-faq{background:var(--v-white);border-radius:16px;margin-bottom:12px;border:1px solid var(--v-border);overflow:hidden;transition:all .2s}
    velov-services .vs-faq.open{box-shadow:var(--v-shadow);border-color:var(--v-purple)}
    velov-services .vs-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:none;border:none;font-family:inherit;font-size:16px;font-weight:700;color:var(--v-dark);text-align:left;cursor:pointer;gap:16px}
    velov-services .vs-faq-ic{width:30px;height:30px;border-radius:50%;background:var(--v-warm);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s;color:var(--v-purple);font-weight:700}
    velov-services .vs-faq.open .vs-faq-ic{background:var(--v-purple);color:#fff;transform:rotate(45deg)}
    velov-services .vs-faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 24px}
    velov-services .vs-faq.open .vs-faq-a{max-height:400px}
    velov-services .vs-faq-ai{padding-bottom:20px;font-size:15px;color:var(--v-muted);line-height:1.65}

    /* CTA */
    velov-services .vs-cta{background:var(--v-purple);color:#fff;text-align:center;padding:84px 0;position:relative;overflow:hidden}
    velov-services .vs-cta h2{font-size:clamp(26px,3.5vw,40px);font-weight:800;margin-bottom:14px}
    velov-services .vs-cta p{font-size:17px;opacity:.9;margin-bottom:30px;max-width:540px;margin-left:auto;margin-right:auto}
    velov-services .vs-contact{margin-top:24px;font-size:14px;opacity:.8}
    velov-services .vs-contact a{color:#fff;text-decoration:underline}
    velov-services .vs-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

    @media(max-width:880px){
      velov-services .vs-section,velov-services .vs-hero{padding:60px 0}
      velov-services .vs-pkg-grid{grid-template-columns:1fr}
      velov-services .vs-ext-grid{grid-template-columns:1fr 1fr}
      velov-services .vs-extras{padding:26px 22px}
      velov-services .vs-total{flex-direction:column;align-items:stretch;text-align:center}
      velov-services .vs-wa{justify-content:center}
    }
    `;
    const s=document.createElement('style'); s.id='velov-services-styles'; s.textContent=css; document.head.appendChild(s);
  }

  render(){
    const c=VelovServices.CONFIG;
    this.innerHTML=`
    <section class="vs-hero">
      <div class="vs-wrap vs-hero-in">
        <div class="vs-hero-badge">Velo Service Zürich</div>
        <h1 class="vs-h1">Dein Velo.<br><span class="vs-grad">Perfekt gewartet.</span></h1>
        <p class="vs-lead">Drei Pakete, transparente Festpreise. Wähle dein Paket, füge Extras hinzu — der Gesamtpreis aktualisiert sich live. Wir kommen zu dir.</p>
        <a href="tel:${c.phone}" class="vs-btn" style="background:var(--v-orange);color:#fff">📞 Termin buchen</a>
      </div>
    </section>

    <section class="vs-section" style="background:var(--v-white)">
      <div class="vs-wrap">
        <div class="vs-center">
          <div class="vs-lbl">Pakete · Live-Rechner</div>
          <h2 class="vs-title">Wähle dein Service-Paket</h2>
          <p class="vs-sub">Klick auf ein Paket, füge Extras hinzu — du siehst sofort den Festpreis. Alles inkl. Anfahrt in Zürich.</p>
        </div>

        <div class="vs-pkg-grid">
          ${c.packages.map(p=>`
          <div class="vs-pkg ${p.featured?'featured':''} ${p.id===this.state.pkg?'on':''}" data-pkg="${p.id}">
            <div class="vs-pkg-badge">${p.badge}</div>
            <h3>${p.title}</h3>
            <div class="vs-pkg-desc">${p.desc}</div>
            <div class="vs-pkg-price">
              <div class="vs-pkg-amt">CHF ${p.price}<small> fest</small></div>
              <div class="vs-pkg-sub">${p.subtitle}</div>
            </div>
            <ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
            <button class="vs-pkg-select">${p.id===this.state.pkg?'✓ Ausgewählt':'Auswählen'}</button>
          </div>`).join('')}
        </div>

        <div class="vs-extras">
          <h3>Zusatzleistungen (optional)</h3>
          <div class="vs-extras-hint">Alles kombinierbar. Preise aktualisieren sich live unten.</div>
          <div class="vs-ext-grid">
            ${c.extras.map(e=>`
            <label class="vs-ext ${this.state.extras.has(e.id)?'on':''}" data-ext="${e.id}">
              <span class="vs-ext-ic">${e.icon}</span>
              <span class="vs-ext-lbl">${e.label}</span>
              <span class="vs-ext-px">+${e.price}</span>
            </label>`).join('')}
          </div>
        </div>

        <div class="vs-total">
          <div>
            <div class="vs-total-l">Dein Festpreis</div>
            <div class="vs-total-a" id="vs-tot">CHF ${c.packages.find(p=>p.id===this.state.pkg).price}</div>
            <div class="vs-total-f">Inkl. Anfahrt Zürich · Material nach Aufwand</div>
          </div>
          <a class="vs-wa" id="vs-wa" href="#" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Buchen via WhatsApp
          </a>
        </div>
      </div>
    </section>

    <section class="vs-section" style="background:var(--v-warm)">
      <div class="vs-wrap">
        <div class="vs-center"><div class="vs-lbl">FAQ</div><h2 class="vs-title">Häufige Fragen</h2></div>
        <div class="vs-faq-list">
          ${c.faqs.map((f,i)=>`
          <div class="vs-faq" data-faq="${i}">
            <button class="vs-faq-q" aria-expanded="false"><span>${f.q}</span><span class="vs-faq-ic">+</span></button>
            <div class="vs-faq-a"><div class="vs-faq-ai">${f.a}</div></div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="vs-cta">
      <div class="vs-wrap">
        <h2>Bereit für den nächsten Service?</h2>
        <p>Ruf an, schreib WhatsApp — wir kommen direkt zu dir.</p>
        <div class="vs-row">
          <a href="tel:${c.phone}" class="vs-btn" style="background:#fff;color:var(--v-purple)">📞 Jetzt anrufen</a>
          <a href="https://wa.me/${c.waNumber}" class="vs-btn" style="background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25)">WhatsApp</a>
        </div>
        <div class="vs-contact"><a href="mailto:${c.email}">${c.email}</a> · Mo–Sa 07:00–19:00</div>
      </div>
    </section>
    `;
  }

  wire(){
    this.querySelectorAll('.vs-pkg').forEach(el=>el.addEventListener('click',()=>{
      this.state.pkg=el.dataset.pkg;
      this.querySelectorAll('.vs-pkg').forEach(p=>{p.classList.toggle('on',p.dataset.pkg===this.state.pkg);const b=p.querySelector('.vs-pkg-select');b.textContent=p.dataset.pkg===this.state.pkg?'✓ Ausgewählt':'Auswählen';});
      this.updateTotal();
    }));
    this.querySelectorAll('.vs-ext').forEach(el=>el.addEventListener('click',e=>{
      e.preventDefault(); const id=el.dataset.ext;
      if(this.state.extras.has(id)) this.state.extras.delete(id); else this.state.extras.add(id);
      el.classList.toggle('on'); this.updateTotal();
    }));
    this.querySelectorAll('.vs-faq').forEach(it=>it.querySelector('.vs-faq-q').addEventListener('click',()=>{
      const o=it.classList.contains('open');
      this.querySelectorAll('.vs-faq').forEach(x=>{x.classList.remove('open');x.querySelector('.vs-faq-q').setAttribute('aria-expanded','false');});
      if(!o){it.classList.add('open');it.querySelector('.vs-faq-q').setAttribute('aria-expanded','true');}
    }));
    this.updateTotal();
  }

  updateTotal(){
    const c=VelovServices.CONFIG;
    const p=c.packages.find(x=>x.id===this.state.pkg);
    let t=p.price; const items=[];
    this.state.extras.forEach(id=>{const e=c.extras.find(x=>x.id===id);if(e){t+=e.price;items.push(e);}});
    const el=this.querySelector('#vs-tot'); if(el) el.textContent=`CHF ${t}`;
    const extrasTxt=items.length?items.map(e=>`• ${e.label} (+CHF ${e.price})`).join('\n'):'—';
    const msg=`Hi VELOV! 👋\nIch möchte einen Velo-Service buchen:\n\n📦 Paket: ${p.title} (CHF ${p.price})\n➕ Extras:\n${extrasTxt}\n\n💰 Total (Festpreis): CHF ${t}\n\nAdresse / Zeitfenster:\n(bitte ausfüllen)\n\nDanke!`;
    const wa=this.querySelector('#vs-wa'); if(wa) wa.setAttribute('href',`https://wa.me/${c.waNumber}?text=${encodeURIComponent(msg)}`);
  }

  injectSchema(){
    if(document.getElementById('velov-services-schema'))return;
    const c=VelovServices.CONFIG;
    const data=[{
      "@context":"https://schema.org","@type":["LocalBusiness","BicycleStore"],
      "@id":c.domain+"/services#biz","name":"VELOV — Velo Service Zürich","url":c.domain+"/services",
      "telephone":c.phone,"email":c.email,"priceRange":"CHF 79 – CHF 189",
      "address":{"@type":"PostalAddress","addressLocality":"Zürich","addressCountry":"CH"},
      "areaServed":{"@type":"City","name":"Zürich"},
      "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"500"}
    },{
      "@context":"https://schema.org","@type":"OfferCatalog","name":"Velo Service Pakete Zürich",
      "itemListElement":c.packages.map((p,i)=>({"@type":"Offer","position":i+1,"name":p.title,"description":p.desc,"priceCurrency":"CHF","price":p.price,"availability":"https://schema.org/InStock","areaServed":"Zürich"}))
    },{
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity":c.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
    }];
    const s=document.createElement('script');s.type='application/ld+json';s.id='velov-services-schema';s.textContent=JSON.stringify(data);
    document.head.appendChild(s);
  }
}
if(!customElements.get('velov-services')) customElements.define('velov-services',VelovServices);