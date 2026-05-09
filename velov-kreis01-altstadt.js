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
        pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label, kreis: 'altstadt'}, ctx));
      } else if (/^tel:/i.test(href)) {
        pushEvent('phone_click', Object.assign({link_url: href, link_text: label, kreis: 'altstadt'}, ctx));
      } else if (/^mailto:/i.test(href)) {
        pushEvent('email_click', Object.assign({link_url: href, link_text: label, kreis: 'altstadt'}, ctx));
      } else if (/booking|termin|offerte/i.test(href + ' ' + label)) {
        pushEvent('booking_click', Object.assign({link_url: href, link_text: label, kreis: 'altstadt'}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* ===== VELOV — Kreis 1 Altstadt =====
 * Multilingual Wix Custom Element — DE / EN / FR / IT / ES
 * Detects language via:
 *   1. <velov-altstadt lang="en"> attribute
 *   2. <html lang="..."> attribute
 *   3. window.__VELOV_LANG__ override
 *   4. Fallback: DE
 * ============================================================ */

const VELOV_SEO_ALTSTADT_BY_LANG = {
  "DE": {
    "id": "altstadt_de",
    "h1": "Mobiler Velomechaniker Altstadt – Velo-Reparatur Kreis 1 (vor Ort)",
    "intro": "Plattfuss in Altstadt? VELOV ist deine mobile Velowerkstatt im Kreis 1 und kommt in der Regel innert 35 Minuten zu dir. Servicegebiet u.a.: Bahnhofstrasse, Niederdorf, Grossmünster, Fraumünster, Hauptbahnhof Zürich (HB), Limmatquai.",
    "sections": [
      {
        "h2": "Altstadt – wir kennen das Quartier",
        "body": "Der Kreis 1 ist Zürichs Herz – verkehrsberuhigte Altstadtgassen, Hauptbahnhof, Bahnhofstrasse. Wir sind oft am Bellevue, Paradeplatz oder im Niederdorf unterwegs. Pendler-Plattfuss vor dem HB? Wir sind meist innert 30 Minuten da, weil wir täglich Aufträge in der City fahren."
      },
      {
        "h2": "Hotspots im Quartier",
        "body": "In der Nähe vom Bellevue, am Limmatquai und rund um die Universität haben wir schon zahlreiche Pannendienst-Einsätze gefahren – Kuriere, Pendler, Studierende. Bahnhofstrasse · Niederdorf · Grossmünster · Fraumünster · Hauptbahnhof Zürich (HB) · Limmatquai · Lindenhof · Bellevue"
      }
    ],
    "faqs": [
      {
        "q": "Wie schnell seid ihr in Altstadt?",
        "a": "Meist 20–40 Minuten ab WhatsApp-Buchung – Altstadt ist regelmässig in unserer Tagesroute."
      },
      {
        "q": "Welche PLZ deckt ihr im Kreis 1 ab?",
        "a": "Wir bedienen alle Adressen im Kreis 1 (8001, 8021) ohne Aufschlag im Stadtgebiet."
      },
      {
        "q": "Muss ich zu Hause sein?",
        "a": "Nein. Du kannst dein Velo draussen oder im Veloraum stehen lassen, wir senden dir nach der Reparatur ein Foto und den Zahlungslink via TWINT."
      },
      {
        "q": "Macht ihr auch Aktionstage für Genossenschaften und Firmen?",
        "a": "Ja – B2B-Aktionstage in Altstadt sind ab CHF 49 Anfahrt buchbar. Mehr unter velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 für Plattfuss-Notfälle in Altstadt (Kreis 1) · info@velov.ch",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.velov.ch/altstadt#business",
        "name": "VELOV — Mobile Velowerkstatt Altstadt",
        "url": "https://www.velov.ch/altstadt",
        "telephone": "+41762352126",
        "email": "info@velov.ch",
        "image": "https://www.velov.ch/og-image.jpg",
        "priceRange": "CHF 99 - CHF 299",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Merkurstrasse 56",
          "addressLocality": "Zürich",
          "postalCode": "8032",
          "addressRegion": "ZH",
          "addressCountry": "CH"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 47.3769,
          "longitude": 8.5417
        },
        "areaServed": [
          {
            "@type": "Place",
            "name": "Lindenhof"
          },
          {
            "@type": "Place",
            "name": "Rathaus"
          },
          {
            "@type": "Place",
            "name": "Hochschulen"
          },
          {
            "@type": "Place",
            "name": "City"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8001"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8021"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "08:00",
            "closes": "20:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "500"
        },
        "sameAs": [
          "https://g.page/r/Cde-mb4tOTU-EAE"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.velov.ch"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Standorte",
            "item": "https://www.velov.ch/standorte"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Altstadt",
            "item": "https://www.velov.ch/altstadt"
          }
        ]
      }
    ]
  },
  "EN": {
    "id": "altstadt_en",
    "h1": "Mobile Bike Mechanic Old Town – Bicycle Repair Kreis 1 (on-site)",
    "intro": "Flat tyre in Old Town? VELOV is your mobile bike workshop in Kreis 1, usually on-site within 35 minutes. Service area includes: Bahnhofstrasse, Niederdorf, Grossmünster, Fraumünster, Hauptbahnhof Zürich (HB), Limmatquai.",
    "sections": [
      {
        "h2": "Old Town – we know the area",
        "body": "Kreis 1 is the heart of Zürich – pedestrian-friendly old town alleys, the main station, Bahnhofstrasse shopping district. We regularly cover Bellevue, Paradeplatz and the Niederdorf. Flat tyre at the main station before your train? We are usually on-site within 30 minutes because we run jobs in the city centre every day."
      },
      {
        "h2": "Hotspots in the area",
        "body": "Near Bellevue, along Limmatquai and around the University we have completed many emergency calls – couriers, commuters, students. Bahnhofstrasse · Niederdorf · Grossmünster · Fraumünster · Hauptbahnhof Zürich (HB) · Limmatquai · Lindenhof · Bellevue"
      }
    ],
    "faqs": [
      {
        "q": "How fast are you in Old Town?",
        "a": "Usually 20–40 minutes after WhatsApp booking – Old Town is on our daily route."
      },
      {
        "q": "Which postcodes do you cover in Kreis 1?",
        "a": "We serve all addresses in Kreis 1 (8001, 8021) with no surcharge inside the city."
      },
      {
        "q": "Do I need to be home?",
        "a": "No. Leave the bike outside or in the bike room, we send a photo and a TWINT payment link after the repair."
      },
      {
        "q": "Do you do service days for co-ops and companies?",
        "a": "Yes – B2B service days in Old Town bookable from CHF 49 travel fee. See velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 for flat-tyre emergencies in Old Town (Kreis 1) · info@velov.ch"
  },
  "FR": {
    "id": "altstadt_fr",
    "h1": "Mécanicien vélo mobile Vieille Ville – Réparation vélo Kreis 1 (sur place)",
    "intro": "Crevaison à Vieille Ville ? VELOV est votre atelier vélo mobile dans le Kreis 1, généralement sur place en 35 minutes. Zone de service : Bahnhofstrasse, Niederdorf, Grossmünster, Fraumünster, Hauptbahnhof Zürich (HB), Limmatquai.",
    "sections": [
      {
        "h2": "Vieille Ville – nous connaissons le quartier",
        "body": "Le Kreis 1 est le cœur de Zurich – ruelles piétonnes de la vieille ville, gare centrale, Bahnhofstrasse. Nous sommes régulièrement à Bellevue, Paradeplatz et au Niederdorf. Crevaison devant la gare avant votre train ? Nous arrivons généralement en 30 minutes car nous travaillons quotidiennement dans le centre."
      },
      {
        "h2": "Points clés du quartier",
        "body": "Près de Bellevue, le long du Limmatquai et autour de l'Université, nous avons effectué de nombreuses interventions d'urgence – coursiers, pendulaires, étudiants. Bahnhofstrasse · Niederdorf · Grossmünster · Fraumünster · Hauptbahnhof Zürich (HB) · Limmatquai · Lindenhof · Bellevue"
      }
    ],
    "faqs": [
      {
        "q": "À quelle vitesse arrivez-vous à Vieille Ville ?",
        "a": "Habituellement 20–40 minutes après la réservation WhatsApp – Vieille Ville est sur notre tournée quotidienne."
      },
      {
        "q": "Quels codes postaux couvrez-vous dans le Kreis 1 ?",
        "a": "Toutes les adresses du Kreis 1 (8001, 8021), sans supplément en ville."
      },
      {
        "q": "Dois-je être à la maison ?",
        "a": "Non. Laissez le vélo dehors ou au local, nous envoyons photo et lien de paiement TWINT après la réparation."
      },
      {
        "q": "Faites-vous des journées B2B pour coopératives et entreprises ?",
        "a": "Oui – journées B2B à Vieille Ville dès CHF 49 de déplacement. Voir velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 pour urgences crevaison à Vieille Ville (Kreis 1) · info@velov.ch"
  },
  "IT": {
    "id": "altstadt_it",
    "h1": "Meccanico bici mobile Città Vecchia – Riparazione bici Kreis 1 (sul posto)",
    "intro": "Foratura a Città Vecchia? VELOV è la tua officina mobile nel Kreis 1, di solito sul posto in 35 minuti. Zona di servizio: Bahnhofstrasse, Niederdorf, Grossmünster, Fraumünster, Hauptbahnhof Zürich (HB), Limmatquai.",
    "sections": [
      {
        "h2": "Città Vecchia – conosciamo il quartiere",
        "body": "Il Kreis 1 è il cuore di Zurigo – vicoli pedonali del centro storico, stazione centrale, Bahnhofstrasse. Siamo spesso a Bellevue, Paradeplatz e nel Niederdorf. Foratura davanti alla stazione prima del treno? Arriviamo di solito entro 30 minuti perché lavoriamo ogni giorno in centro."
      },
      {
        "h2": "Punti chiave del quartiere",
        "body": "Vicino a Bellevue, lungo il Limmatquai e intorno all'Università abbiamo svolto molti interventi d'emergenza – corrieri, pendolari, studenti. Bahnhofstrasse · Niederdorf · Grossmünster · Fraumünster · Hauptbahnhof Zürich (HB) · Limmatquai · Lindenhof · Bellevue"
      }
    ],
    "faqs": [
      {
        "q": "Quanto siete veloci a Città Vecchia?",
        "a": "Di solito 20–40 minuti dalla prenotazione WhatsApp – Città Vecchia è nel nostro giro quotidiano."
      },
      {
        "q": "Quali CAP coprite nel Kreis 1?",
        "a": "Tutti gli indirizzi del Kreis 1 (8001, 8021), senza supplemento in città."
      },
      {
        "q": "Devo essere a casa?",
        "a": "No. Lascia la bici fuori o nel locale, inviamo foto e link di pagamento TWINT dopo la riparazione."
      },
      {
        "q": "Fate giornate B2B per cooperative e aziende?",
        "a": "Sì – giornate B2B a Città Vecchia da CHF 49 di trasferta. Vedi velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 per emergenze foratura a Città Vecchia (Kreis 1) · info@velov.ch"
  },
  "ES": {
    "id": "altstadt_es",
    "h1": "Mecánico de bici móvil Casco Antiguo – Reparación de bicicleta Kreis 1 (in situ)",
    "intro": "¿Pinchazo en Casco Antiguo? VELOV es tu taller móvil de bicis en el Kreis 1, normalmente en el lugar en 35 minutos. Zona de servicio: Bahnhofstrasse, Niederdorf, Grossmünster, Fraumünster, Hauptbahnhof Zürich (HB), Limmatquai.",
    "sections": [
      {
        "h2": "Casco Antiguo – conocemos el barrio",
        "body": "El Kreis 1 es el corazón de Zúrich – callejuelas peatonales del casco antiguo, estación central, Bahnhofstrasse. Cubrimos regularmente Bellevue, Paradeplatz y el Niederdorf. ¿Pinchazo frente a la estación antes del tren? Solemos llegar en 30 minutos porque trabajamos a diario en el centro."
      },
      {
        "h2": "Puntos clave del barrio",
        "body": "Cerca de Bellevue, a lo largo del Limmatquai y alrededor de la Universidad hemos realizado muchas intervenciones de urgencia – mensajeros, viajeros, estudiantes. Bahnhofstrasse · Niederdorf · Grossmünster · Fraumünster · Hauptbahnhof Zürich (HB) · Limmatquai · Lindenhof · Bellevue"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuán rápido llegáis a Casco Antiguo?",
        "a": "Normalmente 20–40 minutos tras la reserva por WhatsApp – Casco Antiguo está en nuestra ruta diaria."
      },
      {
        "q": "¿Qué códigos postales cubrís en el Kreis 1?",
        "a": "Todas las direcciones del Kreis 1 (8001, 8021), sin recargo en la ciudad."
      },
      {
        "q": "¿Necesito estar en casa?",
        "a": "No. Deja la bici fuera o en el cuarto de bicis, enviamos foto y enlace TWINT tras la reparación."
      },
      {
        "q": "¿Hacéis jornadas B2B para cooperativas y empresas?",
        "a": "Sí – jornadas B2B en Casco Antiguo desde CHF 49 de desplazamiento. Ver velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 para urgencias de pinchazo en Casco Antiguo (Kreis 1) · info@velov.ch"
  }
};

const VELOV_SEO_ALTSTADT_I18N = {
  "DE": {
    "heroH1": "Mobiler Velomechaniker Altstadt – Velo-Reparatur Kreis 1 (vor Ort)",
    "heroTagline": "Mobile Fahrrad- & E-Bike Reparatur in Altstadt, Kreis 1 (8001, 8021). Wir kommen per Velo & Cargo-Bike zu dir nach Hause oder ins Büro. Anfahrt CHF 49.",
    "heroSub": "📍 Kreis 1 · Ø 35 Min Reaktionszeit · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "Alle Standorte",
    "kreisName": "Altstadt",
    "wizardTitle": "🩺 Velo-Check in 30 Sekunden",
    "wizardLead": "Wähle alle Symptome aus, die dein Velo hat — wir sagen dir, welcher Service passt, was es kostet, und wann wir da sind.",
    "step1": "Was ist kaputt? (Mehrfach-Auswahl)",
    "step2": "Wie dringend?",
    "boxPrice": "Preis ab",
    "boxDur": "Dauer",
    "boxEta": "Reaktion",
    "cta": "📱 Jetzt in Altstadt buchen →",
    "sectionServices": "Services in Altstadt",
    "sectionWhy": "Warum VELOV in Altstadt?",
    "sectionCommon": "Häufige Probleme in Altstadt — VELOV Lösung",
    "sectionStory": "Altstadt – wir kennen das Quartier",
    "finalH2": "Dein Fahrrad kaputt in Altstadt?",
    "finalP": "Same-day verfügbar. Schreib uns — Antwort in wenigen Minuten.",
    "finalBtn": "→ WhatsApp buchen (Altstadt)",
    "finalCallPrefix": "oder ruf an:",
    "waMsgPrefix": "Hi VELOV, ich bin in Altstadt und brauche eine Velo-Reparatur.",
    "waMsgSym": "Symptome:",
    "waMsgUrg": "Dringlichkeit:",
    "waMsgEnd": "Wann kannst du da sein?",
    "etaTomorrow": "Morgen",
    "etaFlex": "Flex",
    "etaSoonPrefix": "~",
    "etaSoonSuffix": " Min",
    "sectionNb": "Nachbar-Kreise",
    "symptoms": [
      {
        "id": "platten",
        "icon": "🛞",
        "label": "Platten / Reifen verliert Luft"
      },
      {
        "id": "bremse",
        "icon": "🛑",
        "label": "Bremsen quietschen / schwach"
      },
      {
        "id": "schaltung",
        "icon": "⚙️",
        "label": "Schaltung hakt / rutscht"
      },
      {
        "id": "kette",
        "icon": "🔗",
        "label": "Kette rasselt oder springt"
      },
      {
        "id": "licht",
        "icon": "💡",
        "label": "Licht / Elektrik defekt"
      },
      {
        "id": "rahmen",
        "icon": "🔧",
        "label": "Rahmen / Sattel / Lenker lose"
      },
      {
        "id": "ebike",
        "icon": "⚡",
        "label": "E-Bike: Motor / Akku / Display"
      },
      {
        "id": "noise",
        "icon": "🔊",
        "label": "Unbekannte Geräusche"
      },
      {
        "id": "inspect",
        "icon": "🧰",
        "label": "Jahreswartung / Inspektion"
      },
      {
        "id": "notfall",
        "icon": "🆘",
        "label": "Notfall — geht gar nichts mehr"
      }
    ],
    "urgencyOptions": [
      {
        "id": "jetzt",
        "label": "🆘 Sofort / Notfall",
        "etaBoost": -10
      },
      {
        "id": "heute",
        "label": "⚡ Heute (same-day)",
        "etaBoost": 0
      },
      {
        "id": "morgen",
        "label": "📅 Morgen",
        "etaBoost": 20
      },
      {
        "id": "woche",
        "label": "🗓️ Diese Woche",
        "etaBoost": 60
      }
    ],
    "packages": {
      "platten": {
        "name": "Platten-Service",
        "desc": "Reifen, Schlauch oder Mantel schnell vor Ort ersetzt.",
        "time": "30 Min"
      },
      "tune": {
        "name": "Tuning & Einstellung",
        "desc": "Bremsen, Schaltung und Kette justiert + Check.",
        "time": "45–60 Min"
      },
      "full": {
        "name": "Komplette Wartung",
        "desc": "Vollständige Inspektion — 18 Punkte, inkl. Nachjustierung.",
        "time": "60 Min"
      },
      "ebike": {
        "name": "E-Bike Service",
        "desc": "Spezialisierter E-Bike Service — Akku, Motor, Firmware, Drehmoment.",
        "time": "60–90 Min"
      },
      "notfall": {
        "name": "Notfall-Service",
        "desc": "Sofort-Intervention vor Ort — auch abends & Wochenende.",
        "time": "30–60 Min"
      }
    },
    "services": [
      {
        "emoji": "🛞",
        "name": "Platten Reparatur",
        "price": "99",
        "time": "30 Min"
      },
      {
        "emoji": "🔧",
        "name": "Komplette Wartung",
        "price": "149",
        "time": "60 Min"
      },
      {
        "emoji": "🆘",
        "name": "Notfall-Service",
        "price": "129",
        "time": "30–60 Min"
      },
      {
        "emoji": "⚙️",
        "name": "E-Bike Service",
        "price": "229",
        "time": "60–90 Min"
      }
    ],
    "features": [
      {
        "emoji": "⚡",
        "title": "Blitzschnell",
        "text": "Oft in unter 1 Stunde in Altstadt. Same-day Buchung."
      },
      {
        "emoji": "📍",
        "title": "Zu dir vor Ort",
        "text": "Wir reparieren dort, wo dein Velo steht. Keine Transportkosten."
      },
      {
        "emoji": "💯",
        "title": "Professionell",
        "text": "Expert-Mechaniker mit Jahren Erfahrung. Alle Fahrradtypen."
      },
      {
        "emoji": "💰",
        "title": "Transparent",
        "text": "Preis vor Buchung bekannt. Keine versteckten Kosten."
      },
      {
        "emoji": "🕐",
        "title": "24h Verfügbar",
        "text": "Notfall am Sonntag? Kein Problem — wir sind immer erreichbar."
      },
      {
        "emoji": "📸",
        "title": "Foto vorab senden",
        "text": "Schick uns Bilder/Videos per WhatsApp — wir schätzen direkt ab und machen oft sofort eine Offerte."
      }
    ],
    "commonProblems": [
      "<strong>Platten auf dem Weg zur Arbeit?</strong> → Ruf VELOV an, wir reparieren in Altstadt in 30 Min.",
      "<strong>Schaltung blockiert?</strong> → VELOV kommt und justiert vor Ort.",
      "<strong>E-Bike Motor kaputt?</strong> → Unsere E-Bike Spezialisten beheben das Problem.",
      "<strong>Sonntag Notfall?</strong> → 24h verfügbar — VELOV ist für dich da!"
    ],
    "story": "Der Kreis 1 ist Zürichs Herz – verkehrsberuhigte Altstadtgassen, Hauptbahnhof, Bahnhofstrasse. Wir sind oft am Bellevue, Paradeplatz oder im Niederdorf unterwegs. Pendler-Plattfuss vor dem HB? Wir sind meist innert 30 Minuten da, weil wir täglich Aufträge in der City fahren.",
    "storyShort": "In der Nähe vom Bellevue, am Limmatquai und rund um die Universität haben wir schon zahlreiche Pannendienst-Einsätze gefahren – Kuriere, Pendler, Studierende."
  },
  "EN": {
    "heroH1": "Mobile Bike Mechanic Old Town – Bicycle Repair Kreis 1 (on-site)",
    "heroTagline": "Mobile bicycle & e-bike repair in Old Town, Kreis 1 (8001, 8021). We come by bike & cargo bike to your home or office. Travel fee CHF 49.",
    "heroSub": "📍 Kreis 1 · Ø 35 min reaction time · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "All Locations",
    "kreisName": "Old Town",
    "wizardTitle": "🩺 30-second bike check",
    "wizardLead": "Pick all symptoms your bike has — we tell you which service fits, what it costs and when we arrive.",
    "step1": "What's broken? (multi-select)",
    "step2": "How urgent?",
    "boxPrice": "Price from",
    "boxDur": "Duration",
    "boxEta": "Arrival",
    "cta": "📱 Book Old Town now →",
    "sectionServices": "Services in Old Town",
    "sectionWhy": "Why VELOV in Old Town?",
    "sectionCommon": "Common problems in Old Town — VELOV solution",
    "sectionStory": "Old Town – we know the area",
    "finalH2": "Bike broken in Old Town?",
    "finalP": "Same-day available. Message us — reply in minutes.",
    "finalBtn": "→ Book on WhatsApp (Old Town)",
    "finalCallPrefix": "or call:",
    "waMsgPrefix": "Hi VELOV, I am in Old Town and need a bike repair.",
    "waMsgSym": "Symptoms:",
    "waMsgUrg": "Urgency:",
    "waMsgEnd": "When can you be here?",
    "etaTomorrow": "Tomorrow",
    "etaFlex": "Flexible",
    "etaSoonPrefix": "~",
    "etaSoonSuffix": " min",
    "sectionNb": "Neighbouring districts",
    "symptoms": [
      {
        "id": "platten",
        "icon": "🛞",
        "label": "Flat / tyre losing pressure"
      },
      {
        "id": "bremse",
        "icon": "🛑",
        "label": "Brakes squeaking / weak"
      },
      {
        "id": "schaltung",
        "icon": "⚙️",
        "label": "Gears skipping / sticky"
      },
      {
        "id": "kette",
        "icon": "🔗",
        "label": "Chain rattling or jumping"
      },
      {
        "id": "licht",
        "icon": "💡",
        "label": "Light / electrics broken"
      },
      {
        "id": "rahmen",
        "icon": "🔧",
        "label": "Frame / saddle / handlebar loose"
      },
      {
        "id": "ebike",
        "icon": "⚡",
        "label": "E-bike: motor / battery / display"
      },
      {
        "id": "noise",
        "icon": "🔊",
        "label": "Strange noises"
      },
      {
        "id": "inspect",
        "icon": "🧰",
        "label": "Annual service / inspection"
      },
      {
        "id": "notfall",
        "icon": "🆘",
        "label": "Emergency — totally stuck"
      }
    ],
    "urgencyOptions": [
      {
        "id": "jetzt",
        "label": "🆘 Right now / emergency",
        "etaBoost": -10
      },
      {
        "id": "heute",
        "label": "⚡ Today (same-day)",
        "etaBoost": 0
      },
      {
        "id": "morgen",
        "label": "📅 Tomorrow",
        "etaBoost": 20
      },
      {
        "id": "woche",
        "label": "🗓️ This week",
        "etaBoost": 60
      }
    ],
    "packages": {
      "platten": {
        "name": "Flat repair",
        "desc": "Tyre, tube or casing replaced fast on-site.",
        "time": "30 min"
      },
      "tune": {
        "name": "Tune-up",
        "desc": "Brakes, gears and chain adjusted + safety check.",
        "time": "45–60 min"
      },
      "full": {
        "name": "Full service",
        "desc": "Full 18-point inspection incl. all adjustments.",
        "time": "60 min"
      },
      "ebike": {
        "name": "E-bike service",
        "desc": "Specialist e-bike service — battery, motor, firmware, torque.",
        "time": "60–90 min"
      },
      "notfall": {
        "name": "Emergency service",
        "desc": "Immediate on-site intervention — evenings & weekends too.",
        "time": "30–60 min"
      }
    },
    "services": [
      {
        "emoji": "🛞",
        "name": "Flat repair",
        "price": "99",
        "time": "30 min"
      },
      {
        "emoji": "🔧",
        "name": "Full service",
        "price": "149",
        "time": "60 min"
      },
      {
        "emoji": "🆘",
        "name": "Emergency",
        "price": "129",
        "time": "30–60 min"
      },
      {
        "emoji": "⚙️",
        "name": "E-bike service",
        "price": "229",
        "time": "60–90 min"
      }
    ],
    "features": [
      {
        "emoji": "⚡",
        "title": "Lightning fast",
        "text": "Often under 1 hour in Old Town. Same-day booking."
      },
      {
        "emoji": "📍",
        "title": "On-site to you",
        "text": "We repair where your bike is parked. No transport costs."
      },
      {
        "emoji": "💯",
        "title": "Professional",
        "text": "Expert mechanics with years of experience. All bike types."
      },
      {
        "emoji": "💰",
        "title": "Transparent",
        "text": "Price known before booking. No hidden fees."
      },
      {
        "emoji": "🕐",
        "title": "24h available",
        "text": "Sunday emergency? No problem — we are always reachable."
      },
      {
        "emoji": "📸",
        "title": "Send a photo first",
        "text": "Send pictures/video via WhatsApp — we estimate immediately and quote on the spot."
      }
    ],
    "commonProblems": [
      "<strong>Flat on the way to work?</strong> → Call VELOV, we repair in Old Town within 30 min.",
      "<strong>Gears stuck?</strong> → VELOV comes and adjusts on-site.",
      "<strong>E-bike motor down?</strong> → Our e-bike specialists fix it.",
      "<strong>Sunday emergency?</strong> → 24h available — VELOV is here for you!"
    ],
    "story": "Kreis 1 is the heart of Zürich – pedestrian-friendly old town alleys, the main station, Bahnhofstrasse shopping district. We regularly cover Bellevue, Paradeplatz and the Niederdorf. Flat tyre at the main station before your train? We are usually on-site within 30 minutes because we run jobs in the city centre every day.",
    "storyShort": "Near Bellevue, along Limmatquai and around the University we have completed many emergency calls – couriers, commuters, students."
  },
  "FR": {
    "heroH1": "Mécanicien vélo mobile Vieille Ville – Réparation vélo Kreis 1 (sur place)",
    "heroTagline": "Réparation mobile de vélos & vélos électriques à Vieille Ville, Kreis 1 (8001, 8021). Nous venons à vélo & cargo bike chez vous ou au bureau. Frais de déplacement CHF 49.",
    "heroSub": "📍 Kreis 1 · ~35 min de réaction · Same-day 24h",
    "crumbHome": "Accueil",
    "crumbLocations": "Tous les sites",
    "kreisName": "Vieille Ville",
    "wizardTitle": "🩺 Check vélo en 30 secondes",
    "wizardLead": "Sélectionnez tous les symptômes de votre vélo — nous vous disons quel service convient, le prix et notre arrivée.",
    "step1": "Qu'est-ce qui est cassé ? (multi-sélection)",
    "step2": "Quelle urgence ?",
    "boxPrice": "Prix dès",
    "boxDur": "Durée",
    "boxEta": "Arrivée",
    "cta": "📱 Réserver à Vieille Ville →",
    "sectionServices": "Services à Vieille Ville",
    "sectionWhy": "Pourquoi VELOV à Vieille Ville ?",
    "sectionCommon": "Problèmes fréquents à Vieille Ville — solution VELOV",
    "sectionStory": "Vieille Ville – nous connaissons le quartier",
    "finalH2": "Vélo en panne à Vieille Ville ?",
    "finalP": "Disponible le jour même. Écrivez-nous — réponse en quelques minutes.",
    "finalBtn": "→ Réserver sur WhatsApp (Vieille Ville)",
    "finalCallPrefix": "ou appelez :",
    "waMsgPrefix": "Bonjour VELOV, je suis à Vieille Ville et j'ai besoin d'une réparation vélo.",
    "waMsgSym": "Symptômes :",
    "waMsgUrg": "Urgence :",
    "waMsgEnd": "Quand pouvez-vous arriver ?",
    "etaTomorrow": "Demain",
    "etaFlex": "Flexible",
    "etaSoonPrefix": "~",
    "etaSoonSuffix": " min",
    "sectionNb": "Quartiers voisins",
    "symptoms": [
      {
        "id": "platten",
        "icon": "🛞",
        "label": "Crevaison / pneu qui se dégonfle"
      },
      {
        "id": "bremse",
        "icon": "🛑",
        "label": "Freins qui couinent / faibles"
      },
      {
        "id": "schaltung",
        "icon": "⚙️",
        "label": "Vitesses qui sautent / coincent"
      },
      {
        "id": "kette",
        "icon": "🔗",
        "label": "Chaîne qui claque ou saute"
      },
      {
        "id": "licht",
        "icon": "💡",
        "label": "Éclairage / électrique défectueux"
      },
      {
        "id": "rahmen",
        "icon": "🔧",
        "label": "Cadre / selle / guidon desserrés"
      },
      {
        "id": "ebike",
        "icon": "⚡",
        "label": "E-bike : moteur / batterie / écran"
      },
      {
        "id": "noise",
        "icon": "🔊",
        "label": "Bruits étranges"
      },
      {
        "id": "inspect",
        "icon": "🧰",
        "label": "Service annuel / inspection"
      },
      {
        "id": "notfall",
        "icon": "🆘",
        "label": "Urgence — bloqué"
      }
    ],
    "urgencyOptions": [
      {
        "id": "jetzt",
        "label": "🆘 Maintenant / urgence",
        "etaBoost": -10
      },
      {
        "id": "heute",
        "label": "⚡ Aujourd'hui",
        "etaBoost": 0
      },
      {
        "id": "morgen",
        "label": "📅 Demain",
        "etaBoost": 20
      },
      {
        "id": "woche",
        "label": "🗓️ Cette semaine",
        "etaBoost": 60
      }
    ],
    "packages": {
      "platten": {
        "name": "Réparation crevaison",
        "desc": "Pneu, chambre ou enveloppe remplacés sur place.",
        "time": "30 min"
      },
      "tune": {
        "name": "Réglage",
        "desc": "Freins, vitesses et chaîne ajustés + check sécurité.",
        "time": "45–60 min"
      },
      "full": {
        "name": "Service complet",
        "desc": "Inspection complète 18 points + tous les réglages.",
        "time": "60 min"
      },
      "ebike": {
        "name": "Service e-bike",
        "desc": "Service e-bike spécialisé — batterie, moteur, firmware, couple.",
        "time": "60–90 min"
      },
      "notfall": {
        "name": "Service d'urgence",
        "desc": "Intervention immédiate sur place — soirs et week-ends.",
        "time": "30–60 min"
      }
    },
    "services": [
      {
        "emoji": "🛞",
        "name": "Réparation crevaison",
        "price": "99",
        "time": "30 min"
      },
      {
        "emoji": "🔧",
        "name": "Service complet",
        "price": "149",
        "time": "60 min"
      },
      {
        "emoji": "🆘",
        "name": "Urgence",
        "price": "129",
        "time": "30–60 min"
      },
      {
        "emoji": "⚙️",
        "name": "Service e-bike",
        "price": "229",
        "time": "60–90 min"
      }
    ],
    "features": [
      {
        "emoji": "⚡",
        "title": "Ultra-rapide",
        "text": "Souvent moins d'1 heure à Vieille Ville. Réservation le jour même."
      },
      {
        "emoji": "📍",
        "title": "Sur place chez vous",
        "text": "Réparation là où le vélo est garé. Pas de frais de transport."
      },
      {
        "emoji": "💯",
        "title": "Professionnel",
        "text": "Mécaniciens experts avec des années d'expérience. Tous types de vélos."
      },
      {
        "emoji": "💰",
        "title": "Transparent",
        "text": "Prix connu avant la réservation. Pas de frais cachés."
      },
      {
        "emoji": "🕐",
        "title": "24h disponible",
        "text": "Urgence dimanche ? Pas de problème — toujours joignable."
      },
      {
        "emoji": "📸",
        "title": "Envoyez une photo",
        "text": "Envoyez photos/vidéo via WhatsApp — estimation immédiate, devis sur place."
      }
    ],
    "commonProblems": [
      "<strong>Crevaison sur le chemin du travail ?</strong> → Appelez VELOV, réparation à Vieille Ville en 30 min.",
      "<strong>Vitesses bloquées ?</strong> → VELOV vient régler sur place.",
      "<strong>Moteur e-bike en panne ?</strong> → Nos spécialistes e-bike réparent.",
      "<strong>Urgence dimanche ?</strong> → 24h disponible — VELOV est là pour vous !"
    ],
    "story": "Le Kreis 1 est le cœur de Zurich – ruelles piétonnes de la vieille ville, gare centrale, Bahnhofstrasse. Nous sommes régulièrement à Bellevue, Paradeplatz et au Niederdorf. Crevaison devant la gare avant votre train ? Nous arrivons généralement en 30 minutes car nous travaillons quotidiennement dans le centre.",
    "storyShort": "Près de Bellevue, le long du Limmatquai et autour de l'Université, nous avons effectué de nombreuses interventions d'urgence – coursiers, pendulaires, étudiants."
  },
  "IT": {
    "heroH1": "Meccanico bici mobile Città Vecchia – Riparazione bici Kreis 1 (sul posto)",
    "heroTagline": "Riparazione mobile bici ed e-bike a Città Vecchia, Kreis 1 (8001, 8021). Veniamo in bici & cargo bike a casa o ufficio. Spostamento CHF 49.",
    "heroSub": "📍 Kreis 1 · ~35 min di reazione · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "Tutte le sedi",
    "kreisName": "Città Vecchia",
    "wizardTitle": "🩺 Check bici in 30 secondi",
    "wizardLead": "Seleziona tutti i sintomi della tua bici — ti diciamo quale servizio serve, quanto costa e quando arriviamo.",
    "step1": "Cosa è rotto? (selezione multipla)",
    "step2": "Quanto urgente?",
    "boxPrice": "Prezzo da",
    "boxDur": "Durata",
    "boxEta": "Arrivo",
    "cta": "📱 Prenota a Città Vecchia →",
    "sectionServices": "Servizi a Città Vecchia",
    "sectionWhy": "Perché VELOV a Città Vecchia?",
    "sectionCommon": "Problemi frequenti a Città Vecchia — soluzione VELOV",
    "sectionStory": "Città Vecchia – conosciamo il quartiere",
    "finalH2": "Bici rotta a Città Vecchia?",
    "finalP": "Disponibile in giornata. Scrivici — risposta in pochi minuti.",
    "finalBtn": "→ Prenota su WhatsApp (Città Vecchia)",
    "finalCallPrefix": "oppure chiama:",
    "waMsgPrefix": "Ciao VELOV, sono a Città Vecchia e ho bisogno di una riparazione.",
    "waMsgSym": "Sintomi:",
    "waMsgUrg": "Urgenza:",
    "waMsgEnd": "Quando puoi arrivare?",
    "etaTomorrow": "Domani",
    "etaFlex": "Flessibile",
    "etaSoonPrefix": "~",
    "etaSoonSuffix": " min",
    "sectionNb": "Quartieri vicini",
    "symptoms": [
      {
        "id": "platten",
        "icon": "🛞",
        "label": "Foratura / gomma che perde aria"
      },
      {
        "id": "bremse",
        "icon": "🛑",
        "label": "Freni che fischiano / deboli"
      },
      {
        "id": "schaltung",
        "icon": "⚙️",
        "label": "Cambio che salta / si blocca"
      },
      {
        "id": "kette",
        "icon": "🔗",
        "label": "Catena che salta o sferraglia"
      },
      {
        "id": "licht",
        "icon": "💡",
        "label": "Luce / elettrica rotta"
      },
      {
        "id": "rahmen",
        "icon": "🔧",
        "label": "Telaio / sella / manubrio allentati"
      },
      {
        "id": "ebike",
        "icon": "⚡",
        "label": "E-bike: motore / batteria / display"
      },
      {
        "id": "noise",
        "icon": "🔊",
        "label": "Rumori strani"
      },
      {
        "id": "inspect",
        "icon": "🧰",
        "label": "Servizio annuale / ispezione"
      },
      {
        "id": "notfall",
        "icon": "🆘",
        "label": "Emergenza — bici bloccata"
      }
    ],
    "urgencyOptions": [
      {
        "id": "jetzt",
        "label": "🆘 Subito / emergenza",
        "etaBoost": -10
      },
      {
        "id": "heute",
        "label": "⚡ Oggi",
        "etaBoost": 0
      },
      {
        "id": "morgen",
        "label": "📅 Domani",
        "etaBoost": 20
      },
      {
        "id": "woche",
        "label": "🗓️ Questa settimana",
        "etaBoost": 60
      }
    ],
    "packages": {
      "platten": {
        "name": "Riparazione foratura",
        "desc": "Gomma, camera d'aria o copertone sostituiti sul posto.",
        "time": "30 min"
      },
      "tune": {
        "name": "Tagliando rapido",
        "desc": "Freni, cambio e catena registrati + controllo sicurezza.",
        "time": "45–60 min"
      },
      "full": {
        "name": "Servizio completo",
        "desc": "Ispezione completa 18 punti, tutte le regolazioni incluse.",
        "time": "60 min"
      },
      "ebike": {
        "name": "Servizio e-bike",
        "desc": "Servizio specializzato — batteria, motore, firmware, coppia.",
        "time": "60–90 min"
      },
      "notfall": {
        "name": "Servizio d'emergenza",
        "desc": "Intervento immediato sul posto — sere e weekend.",
        "time": "30–60 min"
      }
    },
    "services": [
      {
        "emoji": "🛞",
        "name": "Riparazione foratura",
        "price": "99",
        "time": "30 min"
      },
      {
        "emoji": "🔧",
        "name": "Servizio completo",
        "price": "149",
        "time": "60 min"
      },
      {
        "emoji": "🆘",
        "name": "Emergenza",
        "price": "129",
        "time": "30–60 min"
      },
      {
        "emoji": "⚙️",
        "name": "Servizio e-bike",
        "price": "229",
        "time": "60–90 min"
      }
    ],
    "features": [
      {
        "emoji": "⚡",
        "title": "Velocissimo",
        "text": "Spesso meno di 1 ora a Città Vecchia. Prenotazione in giornata."
      },
      {
        "emoji": "📍",
        "title": "Sul posto da te",
        "text": "Ripariamo dove è parcheggiata la bici. Niente costi di trasporto."
      },
      {
        "emoji": "💯",
        "title": "Professionale",
        "text": "Meccanici esperti con anni di esperienza. Ogni tipo di bici."
      },
      {
        "emoji": "💰",
        "title": "Trasparente",
        "text": "Prezzo noto prima della prenotazione. Niente costi nascosti."
      },
      {
        "emoji": "🕐",
        "title": "24h disponibili",
        "text": "Emergenza domenica? Nessun problema — sempre raggiungibili."
      },
      {
        "emoji": "📸",
        "title": "Invia una foto",
        "text": "Foto/video via WhatsApp — stima immediata e preventivo sul posto."
      }
    ],
    "commonProblems": [
      "<strong>Foratura andando al lavoro?</strong> → Chiama VELOV, riparazione a Città Vecchia in 30 min.",
      "<strong>Cambio bloccato?</strong> → VELOV viene a registrare sul posto.",
      "<strong>Motore e-bike rotto?</strong> → I nostri specialisti e-bike risolvono.",
      "<strong>Emergenza domenica?</strong> → 24h disponibili — VELOV c'è!"
    ],
    "story": "Il Kreis 1 è il cuore di Zurigo – vicoli pedonali del centro storico, stazione centrale, Bahnhofstrasse. Siamo spesso a Bellevue, Paradeplatz e nel Niederdorf. Foratura davanti alla stazione prima del treno? Arriviamo di solito entro 30 minuti perché lavoriamo ogni giorno in centro.",
    "storyShort": "Vicino a Bellevue, lungo il Limmatquai e intorno all'Università abbiamo svolto molti interventi d'emergenza – corrieri, pendolari, studenti."
  },
  "ES": {
    "heroH1": "Mecánico de bici móvil Casco Antiguo – Reparación de bicicleta Kreis 1 (in situ)",
    "heroTagline": "Reparación móvil de bicis y e-bikes en Casco Antiguo, Kreis 1 (8001, 8021). Vamos en bici y cargo bike a tu casa u oficina. Desplazamiento CHF 49.",
    "heroSub": "📍 Kreis 1 · ~35 min de reacción · Same-day 24h",
    "crumbHome": "Inicio",
    "crumbLocations": "Todas las zonas",
    "kreisName": "Casco Antiguo",
    "wizardTitle": "🩺 Check bici en 30 segundos",
    "wizardLead": "Selecciona todos los síntomas de tu bici — te decimos qué servicio toca, cuánto cuesta y cuándo llegamos.",
    "step1": "¿Qué está roto? (selección múltiple)",
    "step2": "¿Cuán urgente?",
    "boxPrice": "Precio desde",
    "boxDur": "Duración",
    "boxEta": "Llegada",
    "cta": "📱 Reservar en Casco Antiguo →",
    "sectionServices": "Servicios en Casco Antiguo",
    "sectionWhy": "¿Por qué VELOV en Casco Antiguo?",
    "sectionCommon": "Problemas frecuentes en Casco Antiguo — solución VELOV",
    "sectionStory": "Casco Antiguo – conocemos el barrio",
    "finalH2": "¿Bici rota en Casco Antiguo?",
    "finalP": "Disponible el mismo día. Escríbenos — respuesta en pocos minutos.",
    "finalBtn": "→ Reservar por WhatsApp (Casco Antiguo)",
    "finalCallPrefix": "o llama:",
    "waMsgPrefix": "Hola VELOV, estoy en Casco Antiguo y necesito una reparación.",
    "waMsgSym": "Síntomas:",
    "waMsgUrg": "Urgencia:",
    "waMsgEnd": "¿Cuándo puedes venir?",
    "etaTomorrow": "Mañana",
    "etaFlex": "Flexible",
    "etaSoonPrefix": "~",
    "etaSoonSuffix": " min",
    "sectionNb": "Barrios vecinos",
    "symptoms": [
      {
        "id": "platten",
        "icon": "🛞",
        "label": "Pinchazo / rueda que pierde aire"
      },
      {
        "id": "bremse",
        "icon": "🛑",
        "label": "Frenos que chirrían / flojos"
      },
      {
        "id": "schaltung",
        "icon": "⚙️",
        "label": "Cambios que saltan / atascados"
      },
      {
        "id": "kette",
        "icon": "🔗",
        "label": "Cadena que salta o ruidosa"
      },
      {
        "id": "licht",
        "icon": "💡",
        "label": "Luz / eléctrica rota"
      },
      {
        "id": "rahmen",
        "icon": "🔧",
        "label": "Cuadro / sillín / manillar sueltos"
      },
      {
        "id": "ebike",
        "icon": "⚡",
        "label": "E-bike: motor / batería / pantalla"
      },
      {
        "id": "noise",
        "icon": "🔊",
        "label": "Ruidos extraños"
      },
      {
        "id": "inspect",
        "icon": "🧰",
        "label": "Servicio anual / inspección"
      },
      {
        "id": "notfall",
        "icon": "🆘",
        "label": "Emergencia — bici bloqueada"
      }
    ],
    "urgencyOptions": [
      {
        "id": "jetzt",
        "label": "🆘 Ahora / emergencia",
        "etaBoost": -10
      },
      {
        "id": "heute",
        "label": "⚡ Hoy",
        "etaBoost": 0
      },
      {
        "id": "morgen",
        "label": "📅 Mañana",
        "etaBoost": 20
      },
      {
        "id": "woche",
        "label": "🗓️ Esta semana",
        "etaBoost": 60
      }
    ],
    "packages": {
      "platten": {
        "name": "Reparación pinchazo",
        "desc": "Cubierta, cámara o forro sustituidos in situ.",
        "time": "30 min"
      },
      "tune": {
        "name": "Ajuste rápido",
        "desc": "Frenos, cambios y cadena ajustados + check seguridad.",
        "time": "45–60 min"
      },
      "full": {
        "name": "Servicio completo",
        "desc": "Inspección completa 18 puntos, todos los ajustes incluidos.",
        "time": "60 min"
      },
      "ebike": {
        "name": "Servicio e-bike",
        "desc": "Servicio especializado — batería, motor, firmware, par.",
        "time": "60–90 min"
      },
      "notfall": {
        "name": "Servicio de urgencia",
        "desc": "Intervención inmediata in situ — tardes y fines de semana.",
        "time": "30–60 min"
      }
    },
    "services": [
      {
        "emoji": "🛞",
        "name": "Reparación pinchazo",
        "price": "99",
        "time": "30 min"
      },
      {
        "emoji": "🔧",
        "name": "Servicio completo",
        "price": "149",
        "time": "60 min"
      },
      {
        "emoji": "🆘",
        "name": "Urgencia",
        "price": "129",
        "time": "30–60 min"
      },
      {
        "emoji": "⚙️",
        "name": "Servicio e-bike",
        "price": "229",
        "time": "60–90 min"
      }
    ],
    "features": [
      {
        "emoji": "⚡",
        "title": "Ultra rápido",
        "text": "Frecuente menos de 1 hora en Casco Antiguo. Reserva el mismo día."
      },
      {
        "emoji": "📍",
        "title": "In situ",
        "text": "Reparamos donde está aparcada la bici. Sin costes de transporte."
      },
      {
        "emoji": "💯",
        "title": "Profesional",
        "text": "Mecánicos expertos con años de experiencia. Todo tipo de bicis."
      },
      {
        "emoji": "💰",
        "title": "Transparente",
        "text": "Precio conocido antes de reservar. Sin costes ocultos."
      },
      {
        "emoji": "🕐",
        "title": "24h disponible",
        "text": "¿Urgencia domingo? Sin problema — siempre disponibles."
      },
      {
        "emoji": "📸",
        "title": "Envía una foto",
        "text": "Fotos/vídeo por WhatsApp — estimación inmediata y presupuesto in situ."
      }
    ],
    "commonProblems": [
      "<strong>¿Pinchazo de camino al trabajo?</strong> → Llama a VELOV, reparación en Casco Antiguo en 30 min.",
      "<strong>¿Cambios atascados?</strong> → VELOV ajusta in situ.",
      "<strong>¿Motor e-bike roto?</strong> → Nuestros especialistas e-bike lo arreglan.",
      "<strong>¿Urgencia domingo?</strong> → 24h disponibles — ¡VELOV está ahí!"
    ],
    "story": "El Kreis 1 es el corazón de Zúrich – callejuelas peatonales del casco antiguo, estación central, Bahnhofstrasse. Cubrimos regularmente Bellevue, Paradeplatz y el Niederdorf. ¿Pinchazo frente a la estación antes del tren? Solemos llegar en 30 minutos porque trabajamos a diario en el centro.",
    "storyShort": "Cerca de Bellevue, a lo largo del Limmatquai y alrededor de la Universidad hemos realizado muchas intervenciones de urgencia – mensajeros, viajeros, estudiantes."
  }
};

const VELOV_SEO_ALTSTADT_KREIS = {
  "id": "altstadt",
  "slug": "altstadt",
  "kreis": 1,
  "kreisLabel": "Kreis 1",
  "plz": [
    "8001",
    "8021"
  ],
  "neighbours": [
    "aussersihl",
    "industriequartier",
    "unterstrass",
    "riesbach"
  ],
  "landmarks": [
    "Bahnhofstrasse",
    "Niederdorf",
    "Grossmünster",
    "Fraumünster",
    "Hauptbahnhof Zürich (HB)",
    "Limmatquai",
    "Lindenhof",
    "Bellevue",
    "Paradeplatz",
    "Rathaus"
  ],
  "quartiere": [
    "Lindenhof",
    "Rathaus",
    "Hochschulen",
    "City"
  ],
  "baseEta": 35
};

class VelovAltstadt extends HTMLElement {
  constructor() {
    super();
    this.state = { symptoms: new Set(), urgency: 'heute' };
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

  static get CONFIG() {
    return {
      zone: 'Altstadt',
      kreisId: 'altstadt',
      kreisLabel: 'Kreis 1',
      phone: '+41762352126',
      phoneDisplay: '+41 076 235 21 26',
      whatsapp: '41762352126',
      email: 'velovzh@gmail.com',
      url: 'https://velov.ch/altstadt',
      baseEta: 35,
      neighbours: [{ slug: 'aussersihl', name: 'Aussersihl' }, { slug: 'industriequartier', name: 'Industriequartier' }, { slug: 'unterstrass-oberstrass', name: 'Unterstrass & Oberstrass' }, { slug: 'seefeld-riesbach', name: 'Seefeld & Riesbach' }]
    };
  }

  connectedCallback() {
    this.lang = this.detectLang();
    const seoCfg = VELOV_SEO_ALTSTADT_BY_LANG[this.lang] || VELOV_SEO_ALTSTADT_BY_LANG.DE;
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, seoCfg); } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this); } catch(e) {}

    this.injectStyles();
    this.render();
    this.bindEvents();
  }

  injectStyles() {
    const styleId = 'velov-altstadt-styles';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      velov-altstadt { display: block; width: 100%; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2B3D; box-sizing: border-box; }
      velov-altstadt *, velov-altstadt *::before, velov-altstadt *::after { box-sizing: border-box; }
      .vw-wrap { max-width: 1100px; margin: 0 auto; padding: 48px 24px; background: #F5F0EB; }
      .vw-crumb { background: #fff; padding: 12px 20px; border-radius: 999px; display: inline-block; font-size: .9rem; margin-bottom: 24px; color: #666; }
      .vw-crumb a { color: #7B68EE; text-decoration: none; font-weight: 600; }
      .vw-crumb strong { color: #2D2B3D; }
      .vw-hero { background: linear-gradient(135deg, #7B68EE 0%, #9B88FF 100%); color: #fff; padding: 48px 32px; border-radius: 24px; text-align: center; margin-bottom: 32px; }
      .vw-hero h1 { font-size: 2.2rem; margin: 0 0 12px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.15; }
      .vw-hero p { font-size: 1.05rem; opacity: .95; margin: 0; }
      .vw-hero .sub { display: inline-block; margin-top: 16px; padding: 8px 16px; background: rgba(255,255,255,.15); border-radius: 999px; font-size: .9rem; }
      .vw-story { background: #fff; padding: 28px; border-radius: 20px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vw-story h2 { color: #7B68EE; font-size: 1.4rem; margin: 0 0 12px; font-weight: 700; }
      .vw-story p { color: #444; margin: 0 0 12px; line-height: 1.55; }
      .vw-story .lm-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .vw-story .lm { background: #F3F0FF; color: #2D2B3D; padding: 6px 12px; border-radius: 999px; font-size: .85rem; font-weight: 600; }
      .vw-wizard { background: #fff; border-radius: 20px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.08); }
      .vw-wizard h2 { font-size: 1.6rem; margin: 0 0 8px; color: #2D2B3D; font-weight: 700; }
      .vw-wizard .lead { color: #666; margin-bottom: 20px; }
      .vw-step-label { font-size: .85rem; color: #7B68EE; text-transform: uppercase; font-weight: 700; letter-spacing: .5px; margin: 18px 0 10px; }
      .vw-count { background: #E8573A; color: #fff; padding: 2px 10px; border-radius: 999px; font-size: .75rem; margin-left: 6px; }
      .vw-symptoms { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
      .vw-sym { padding: 14px 16px; border-radius: 12px; border: 2px solid #E8E3D9; background: #fff; cursor: pointer; text-align: left; transition: all .2s; display: flex; align-items: center; gap: 10px; font-family: inherit; }
      .vw-sym:hover { border-color: #7B68EE; transform: translateY(-2px); }
      .vw-sym.selected { border-color: #7B68EE; background: #F3F0FF; }
      .vw-sym .vw-check { width: 22px; height: 22px; border: 2px solid #E8E3D9; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: .8rem; color: transparent; font-weight: 800; transition: all .2s; }
      .vw-sym.selected .vw-check { border-color: #7B68EE; background: #7B68EE; color: #fff; }
      .vw-sym .vw-icon { font-size: 1.3rem; }
      .vw-sym .vw-label { font-size: .95rem; color: #2D2B3D; font-weight: 600; flex: 1; }
      .vw-urg { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; }
      .vw-urg-btn { padding: 12px; border-radius: 10px; border: 2px solid #E8E3D9; background: #fff; cursor: pointer; font-size: .9rem; font-weight: 600; color: #2D2B3D; font-family: inherit; transition: all .2s; }
      .vw-urg-btn:hover { border-color: #7B68EE; }
      .vw-urg-btn.selected { background: #7B68EE; color: #fff; border-color: #7B68EE; }
      .vw-result { margin-top: 20px; padding: 28px; background: linear-gradient(135deg, #2D2B3D 0%, #3D3B4D 100%); color: #fff; border-radius: 16px; display: none; }
      .vw-result.show { display: block; }
      .vw-result h3 { margin: 0 0 8px; font-size: 1.4rem; font-weight: 700; }
      .vw-result .desc { opacity: .9; font-size: .95rem; margin: 0 0 16px; }
      .vw-result-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
      .vw-box { background: rgba(255,255,255,.08); padding: 14px; border-radius: 12px; }
      .vw-box .k { font-size: .75rem; opacity: .7; text-transform: uppercase; letter-spacing: .5px; }
      .vw-box .v { font-size: 1.3rem; font-weight: 800; color: #E8573A; margin-top: 4px; }
      @media (max-width: 600px) { .vw-result-grid { grid-template-columns: 1fr; } }
      .vw-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
      .vw-tag { background: rgba(255,255,255,.15); padding: 4px 10px; border-radius: 999px; font-size: .78rem; }
      .vw-cta { display: inline-block; padding: 14px 28px; background: #E8573A; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 700; transition: transform .2s; }
      .vw-cta:hover { transform: scale(1.04); }
      .vw-section-title { color: #2D2B3D; font-size: 1.5rem; margin: 0 0 16px; font-weight: 700; }
      .vw-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 40px; }
      .vw-svc { background: #fff; padding: 24px; border-radius: 16px; text-align: center; box-shadow: 0 4px 16px rgba(45,43,61,.06); border-top: 4px solid #7B68EE; }
      .vw-svc .emoji { font-size: 2rem; }
      .vw-svc h4 { margin: 10px 0 6px; color: #2D2B3D; font-size: 1.05rem; font-weight: 700; }
      .vw-svc .price { font-size: 1.5rem; font-weight: 800; color: #E8573A; margin-top: 8px; }
      .vw-svc .time { color: #999; font-size: .85rem; margin-top: 4px; }
      .vw-features { background: #fff; border-radius: 20px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vw-features h2 { color: #7B68EE; font-size: 1.5rem; margin: 0 0 20px; font-weight: 700; }
      .vw-fgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
      .vw-feat .emoji { font-size: 1.8rem; }
      .vw-feat h4 { color: #2D2B3D; margin: 8px 0 4px; font-size: 1.05rem; font-weight: 700; }
      .vw-feat p { color: #666; font-size: .95rem; margin: 0; }
      .vw-common { background: #fff; border-radius: 20px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vw-common h2 { color: #7B68EE; font-size: 1.5rem; margin: 0 0 16px; font-weight: 700; }
      .vw-common ul { list-style: none; padding: 0; margin: 0; }
      .vw-common li { padding: 14px 0; border-bottom: 1px solid #F5F0EB; color: #444; }
      .vw-common li:last-child { border-bottom: 0; }
      .vw-nb { background: #fff; padding: 24px; border-radius: 20px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vw-nb h3 { color: #7B68EE; font-size: 1.1rem; margin: 0 0 12px; font-weight: 700; }
      .vw-nb a { display: inline-block; background: #F3F0FF; color: #7B68EE; padding: 8px 14px; border-radius: 999px; margin: 4px 6px 4px 0; text-decoration: none; font-size: .9rem; font-weight: 600; }
      .vw-nb a:hover { background: #7B68EE; color: #fff; }
      .vw-finalcta { background: linear-gradient(135deg, #E8573A 0%, #FF7A5C 100%); color: #fff; padding: 44px 32px; border-radius: 24px; text-align: center; }
      .vw-finalcta h2 { font-size: 1.7rem; margin: 0 0 12px; font-weight: 800; }
      .vw-finalcta p { opacity: .95; margin: 0 0 20px; }
      .vw-finalcta .btn { display: inline-block; background: #fff; color: #E8573A; padding: 16px 32px; border-radius: 999px; font-weight: 800; text-decoration: none; transition: transform .2s; }
      .vw-finalcta .btn:hover { transform: scale(1.05); }
      .vw-finalcta .phone { display: block; margin-top: 16px; font-size: .95rem; opacity: .9; }
      .vw-finalcta .phone a { color: #fff; font-weight: 700; text-decoration: underline; }
      @media (max-width: 640px) {
        .vw-wrap { padding: 24px 16px; }
        .vw-hero { padding: 36px 20px; border-radius: 16px; }
        .vw-hero h1 { font-size: 1.7rem; }
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    const C = VelovAltstadt.CONFIG;
    const T = VELOV_SEO_ALTSTADT_I18N[this.lang] || VELOV_SEO_ALTSTADT_I18N.DE;

    const symptomsHtml = T.symptoms.map(function(s){
      return '<button class="vw-sym" data-id="'+s.id+'"><span class="vw-check">✓</span><span class="vw-icon">'+s.icon+'</span><span class="vw-label">'+s.label+'</span></button>';
    }).join('');

    const urgHtml = T.urgencyOptions.map(function(u){
      return '<button class="vw-urg-btn '+(u.id==='heute'?'selected':'')+'" data-id="'+u.id+'">'+u.label+'</button>';
    }).join('');

    const servicesHtml = T.services.map(function(s){
      return '<div class="vw-svc"><div class="emoji">'+s.emoji+'</div><h4>'+s.name+'</h4><div class="price">ab '+s.price+' CHF</div><div class="time">⏱️ '+s.time+'</div></div>';
    }).join('');

    const featsHtml = T.features.map(function(f){
      return '<div class="vw-feat"><div class="emoji">'+f.emoji+'</div><h4>'+f.title+'</h4><p>'+f.text+'</p></div>';
    }).join('');

    const commonHtml = T.commonProblems.map(function(p){ return '<li>'+p+'</li>'; }).join('');

    const lmHtml = VELOV_SEO_ALTSTADT_KREIS.landmarks.slice(0, 8).map(function(lm){
      return '<span class="lm">' + lm + '</span>';
    }).join('');

    const nbHtml = C.neighbours.map(function(nb){
      return '<a href="/' + nb.slug + '">' + nb.name + '</a>';
    }).join('');

    this.innerHTML = `
      <div class="vw-wrap">
        <div class="vw-crumb">
          <a href="/">${T.crumbHome}</a> · <a href="/standorte">${T.crumbLocations}</a> · <strong>${T.kreisName}</strong>
        </div>

        <div class="vw-hero">
          <h1>${T.heroH1}</h1>
          <p>${T.heroTagline}</p>
          <div class="sub">${T.heroSub}</div>
        </div>

        <section class="vw-story">
          <h2>${T.sectionStory}</h2>
          <p>${T.story}</p>
          <p>${T.storyShort}</p>
          <div class="lm-list">${lmHtml}</div>
        </section>

        <section class="vw-wizard">
          <h2>${T.wizardTitle}</h2>
          <p class="lead">${T.wizardLead}</p>

          <div class="vw-step-label">
            1. ${T.step1} <span class="vw-count" id="vw-count">0</span>
          </div>
          <div class="vw-symptoms" id="vw-symptoms">${symptomsHtml}</div>

          <div class="vw-step-label">2. ${T.step2}</div>
          <div class="vw-urg">${urgHtml}</div>

          <div class="vw-result" id="vw-result">
            <h3 id="vw-pname">—</h3>
            <p class="desc" id="vw-pdesc">—</p>
            <div class="vw-tags" id="vw-ptags"></div>
            <div class="vw-result-grid">
              <div class="vw-box"><div class="k">${T.boxPrice}</div><div class="v" id="vw-price">— CHF</div></div>
              <div class="vw-box"><div class="k">${T.boxDur}</div><div class="v" id="vw-dur">—</div></div>
              <div class="vw-box"><div class="k">${T.boxEta}</div><div class="v" id="vw-eta">— Min</div></div>
            </div>
            <a id="vw-cta" class="vw-cta" href="#" target="_blank" rel="noopener">${T.cta}</a>
          </div>
        </section>

        <h2 class="vw-section-title">${T.sectionServices}</h2>
        <div class="vw-services">${servicesHtml}</div>

        <section class="vw-features">
          <h2>${T.sectionWhy}</h2>
          <div class="vw-fgrid">${featsHtml}</div>
        </section>

        <section class="vw-common">
          <h2>${T.sectionCommon}</h2>
          <ul>${commonHtml}</ul>
        </section>

        <section class="vw-nb">
          <h3>${T.sectionNb}</h3>
          ${nbHtml}
        </section>

        <section class="vw-finalcta">
          <h2>${T.finalH2}</h2>
          <p>${T.finalP}</p>
          <a class="btn" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T.waMsgPrefix)}" target="_blank" rel="noopener">${T.finalBtn}</a>
          <span class="phone">${T.finalCallPrefix} <a href="tel:${C.phone}">${C.phoneDisplay}</a></span>
        </section>
      </div>
    `;
  }

  bindEvents() {
    const T = VELOV_SEO_ALTSTADT_I18N[this.lang] || VELOV_SEO_ALTSTADT_I18N.DE;
    this.querySelectorAll('.vw-sym').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (this.state.symptoms.has(id)) this.state.symptoms.delete(id);
        else this.state.symptoms.add(id);
        btn.classList.toggle('selected', this.state.symptoms.has(id));
        this.querySelector('#vw-count').textContent = this.state.symptoms.size;
        this.updateResult();
      });
    });
    this.querySelectorAll('.vw-urg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.querySelectorAll('.vw-urg-btn').forEach(b => b.classList.toggle('selected', b === btn));
        this.state.urgency = btn.dataset.id;
        this.updateResult();
      });
    });
  }

  pickPackage() {
    const T = VELOV_SEO_ALTSTADT_I18N[this.lang] || VELOV_SEO_ALTSTADT_I18N.DE;
    const ids = [...this.state.symptoms];
    if (ids.length === 0) return null;
    const has = id => ids.includes(id);
    if (has('notfall')) return Object.assign({ price: 129 }, T.packages.notfall);
    if (has('ebike'))   return Object.assign({ price: 229 }, T.packages.ebike);
    const mech = ['bremse','schaltung','kette','licht','rahmen','noise','inspect'].filter(has).length;
    if (has('inspect') || mech >= 2) return Object.assign({ price: 149 }, T.packages.full);
    if (mech >= 1) return Object.assign({ price: 129 }, T.packages.tune);
    if (has('platten')) return Object.assign({ price: 99 }, T.packages.platten);
    return Object.assign({ price: 129 }, T.packages.tune);
  }

  updateResult() {
    const C = VelovAltstadt.CONFIG;
    const T = VELOV_SEO_ALTSTADT_I18N[this.lang] || VELOV_SEO_ALTSTADT_I18N.DE;
    const pkg = this.pickPackage();
    const panel = this.querySelector('#vw-result');
    if (!pkg) { panel.classList.remove('show'); return; }

    const urg = T.urgencyOptions.find(u => u.id === this.state.urgency) || T.urgencyOptions[1];
    const baseEta = C.baseEta + urg.etaBoost;
    const eta = Math.max(20, baseEta);

    this.querySelector('#vw-pname').textContent = pkg.name;
    this.querySelector('#vw-pdesc').textContent = pkg.desc;
    this.querySelector('#vw-price').textContent = pkg.price + ' CHF';
    this.querySelector('#vw-dur').textContent = pkg.time;
    this.querySelector('#vw-eta').textContent = urg.id === 'woche' ? T.etaFlex : urg.id === 'morgen' ? T.etaTomorrow : (T.etaSoonPrefix + eta + T.etaSoonSuffix);

    const tagsEl = this.querySelector('#vw-ptags');
    tagsEl.innerHTML = [...this.state.symptoms].map(id => {
      const s = T.symptoms.find(x => x.id === id);
      return s ? '<span class="vw-tag">'+s.icon+' '+s.label+'</span>' : '';
    }).join('');

    const symptomList = [...this.state.symptoms].map(id => {
      const s = T.symptoms.find(x => x.id === id);
      return s ? '• ' + s.label : '';
    }).filter(Boolean).join('\n');

    const waMsgRecLine = T.packages[Object.keys(T.packages).find(k => T.packages[k].name === pkg.name)] ?
      'Service: ' + pkg.name + ' (ab ' + pkg.price + ' CHF, ' + pkg.time + ')' :
      pkg.name;

    const waMsg = [
      T.waMsgPrefix,
      '',
      T.waMsgSym,
      symptomList,
      '',
      waMsgRecLine,
      T.waMsgUrg + ' ' + urg.label,
      '',
      T.waMsgEnd
    ].join('\n');

    this.querySelector('#vw-cta').href = 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(waMsg);
    panel.classList.add('show');
  }
}

if (!customElements.get('velov-altstadt')) {
  customElements.define('velov-altstadt', VelovAltstadt);
}
