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
        pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label, kreis: 'hottingen'}, ctx));
      } else if (/^tel:/i.test(href)) {
        pushEvent('phone_click', Object.assign({link_url: href, link_text: label, kreis: 'hottingen'}, ctx));
      } else if (/^mailto:/i.test(href)) {
        pushEvent('email_click', Object.assign({link_url: href, link_text: label, kreis: 'hottingen'}, ctx));
      } else if (/booking|termin|offerte/i.test(href + ' ' + label)) {
        pushEvent('booking_click', Object.assign({link_url: href, link_text: label, kreis: 'hottingen'}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* ===== VELOV — Kreis 7 Hottingen, Hirslanden & Witikon =====
 * Multilingual Wix Custom Element — DE / EN / FR / IT / ES
 * Detects language via:
 *   1. <velov-hottingen lang="en"> attribute
 *   2. <html lang="..."> attribute
 *   3. window.__VELOV_LANG__ override
 *   4. Fallback: DE
 * ============================================================ */

const VELOV_SEO_HOTTINGEN_BY_LANG = {
  "DE": {
    "id": "hottingen_de",
    "h1": "Mobiler Velomechaniker Hottingen, Hirslanden & Witikon – Velo-Reparatur Kreis 7 (vor Ort)",
    "intro": "Plattfuss in Hottingen, Hirslanden & Witikon? VELOV ist deine mobile Velowerkstatt im Kreis 7 und kommt in der Regel innert 50 Minuten zu dir. Servicegebiet u.a.: Kreuzplatz, Klinik Hirslanden, Römerhof, Dolder, Zürichberg, Forch.",
    "sections": [
      {
        "h2": "Hottingen, Hirslanden & Witikon – wir kennen das Quartier",
        "body": "Kreis 7 – Kreuzplatz, Klinik Hirslanden, Witikon, Dolder, Zürichberg. Premium-Quartier mit vielen E-Bikes und hochwertigen Velos. Wir machen hier viele E-Bike-Services und auch Spezial-Aufträge wie Riemenantrieb-Umbauten. Witikon und Forch oben am Hügel: 5–10 Minuten mehr Anfahrt, kein Problem mit Cargo-Bike."
      },
      {
        "h2": "Hotspots im Quartier",
        "body": "In der Nähe vom Kreuzplatz, an der Klinik Hirslanden und in Witikon Zentrum betreuen wir hochwertige Velos – auch Riemenantrieb-Umbauten und enviolo TR-Hubs sind hier oft gefragt. Kreuzplatz · Klinik Hirslanden · Römerhof · Dolder · Zürichberg · Forch · Witikon Zentrum · Burgwies"
      }
    ],
    "faqs": [
      {
        "q": "Wie schnell seid ihr in Hottingen, Hirslanden & Witikon?",
        "a": "Meist 35–55 Minuten ab WhatsApp-Buchung – Hottingen, Hirslanden & Witikon ist regelmässig in unserer Tagesroute."
      },
      {
        "q": "Welche PLZ deckt ihr im Kreis 7 ab?",
        "a": "Wir bedienen alle Adressen im Kreis 7 (8008, 8032, 8044, 8053) ohne Aufschlag im Stadtgebiet."
      },
      {
        "q": "Muss ich zu Hause sein?",
        "a": "Nein. Du kannst dein Velo draussen oder im Veloraum stehen lassen, wir senden dir nach der Reparatur ein Foto und den Zahlungslink via TWINT."
      },
      {
        "q": "Macht ihr auch Aktionstage für Genossenschaften und Firmen?",
        "a": "Ja – B2B-Aktionstage in Hottingen, Hirslanden & Witikon sind ab CHF 49 Anfahrt buchbar. Mehr unter velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 für Plattfuss-Notfälle in Hottingen, Hirslanden & Witikon (Kreis 7) · info@velov.ch",
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.velov.ch/hottingen-witikon#business",
        "name": "VELOV — Mobile Velowerkstatt Hottingen, Hirslanden & Witikon",
        "url": "https://www.velov.ch/hottingen-witikon",
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
            "name": "Hottingen"
          },
          {
            "@type": "Place",
            "name": "Hirslanden"
          },
          {
            "@type": "Place",
            "name": "Witikon"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8008"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8032"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8044"
          },
          {
            "@type": "PostalCodeSpec",
            "postalCode": "8053"
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
            "name": "Hottingen, Hirslanden & Witikon",
            "item": "https://www.velov.ch/hottingen-witikon"
          }
        ]
      }
    ]
  },
  "EN": {
    "id": "hottingen_en",
    "h1": "Mobile Bike Mechanic Hottingen, Hirslanden & Witikon – Bicycle Repair Kreis 7 (on-site)",
    "intro": "Flat tyre in Hottingen, Hirslanden & Witikon? VELOV is your mobile bike workshop in Kreis 7, usually on-site within 50 minutes. Service area includes: Kreuzplatz, Klinik Hirslanden, Römerhof, Dolder, Zürichberg, Forch.",
    "sections": [
      {
        "h2": "Hottingen, Hirslanden & Witikon – we know the area",
        "body": "Kreis 7 – Kreuzplatz, Hirslanden Clinic, Witikon, Dolder, Zürichberg. Premium district with many e-bikes and high-end bicycles. We do many e-bike services here and special jobs like belt-drive conversions. Witikon and Forch up on the hill: 5–10 minutes extra travel, no problem with our cargo bike."
      },
      {
        "h2": "Hotspots in the area",
        "body": "Around Kreuzplatz, Hirslanden Clinic and Witikon centre we look after premium bikes – belt-drive conversions and enviolo TR hubs are often requested here. Kreuzplatz · Klinik Hirslanden · Römerhof · Dolder · Zürichberg · Forch · Witikon Zentrum · Burgwies"
      }
    ],
    "faqs": [
      {
        "q": "How fast are you in Hottingen, Hirslanden & Witikon?",
        "a": "Usually 35–55 minutes after WhatsApp booking – Hottingen, Hirslanden & Witikon is on our daily route."
      },
      {
        "q": "Which postcodes do you cover in Kreis 7?",
        "a": "We serve all addresses in Kreis 7 (8008, 8032, 8044, 8053) with no surcharge inside the city."
      },
      {
        "q": "Do I need to be home?",
        "a": "No. Leave the bike outside or in the bike room, we send a photo and a TWINT payment link after the repair."
      },
      {
        "q": "Do you do service days for co-ops and companies?",
        "a": "Yes – B2B service days in Hottingen, Hirslanden & Witikon bookable from CHF 49 travel fee. See velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 for flat-tyre emergencies in Hottingen, Hirslanden & Witikon (Kreis 7) · info@velov.ch"
  },
  "FR": {
    "id": "hottingen_fr",
    "h1": "Mécanicien vélo mobile Hottingen, Hirslanden & Witikon – Réparation vélo Kreis 7 (sur place)",
    "intro": "Crevaison à Hottingen, Hirslanden & Witikon ? VELOV est votre atelier vélo mobile dans le Kreis 7, généralement sur place en 50 minutes. Zone de service : Kreuzplatz, Klinik Hirslanden, Römerhof, Dolder, Zürichberg, Forch.",
    "sections": [
      {
        "h2": "Hottingen, Hirslanden & Witikon – nous connaissons le quartier",
        "body": "Kreis 7 – Kreuzplatz, Clinique Hirslanden, Witikon, Dolder, Zürichberg. Quartier premium avec nombreux vélos électriques et haut de gamme. Beaucoup de services e-bike et travaux spéciaux comme conversions courroie. Witikon et Forch en haut : 5–10 minutes de plus, sans problème avec notre cargo bike."
      },
      {
        "h2": "Points clés du quartier",
        "body": "Autour du Kreuzplatz, de la Clinique Hirslanden et du centre de Witikon – conversions courroie et moyeux enviolo TR souvent demandés. Kreuzplatz · Klinik Hirslanden · Römerhof · Dolder · Zürichberg · Forch · Witikon Zentrum · Burgwies"
      }
    ],
    "faqs": [
      {
        "q": "À quelle vitesse arrivez-vous à Hottingen, Hirslanden & Witikon ?",
        "a": "Habituellement 35–55 minutes après la réservation WhatsApp – Hottingen, Hirslanden & Witikon est sur notre tournée quotidienne."
      },
      {
        "q": "Quels codes postaux couvrez-vous dans le Kreis 7 ?",
        "a": "Toutes les adresses du Kreis 7 (8008, 8032, 8044, 8053), sans supplément en ville."
      },
      {
        "q": "Dois-je être à la maison ?",
        "a": "Non. Laissez le vélo dehors ou au local, nous envoyons photo et lien de paiement TWINT après la réparation."
      },
      {
        "q": "Faites-vous des journées B2B pour coopératives et entreprises ?",
        "a": "Oui – journées B2B à Hottingen, Hirslanden & Witikon dès CHF 49 de déplacement. Voir velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 pour urgences crevaison à Hottingen, Hirslanden & Witikon (Kreis 7) · info@velov.ch"
  },
  "IT": {
    "id": "hottingen_it",
    "h1": "Meccanico bici mobile Hottingen, Hirslanden & Witikon – Riparazione bici Kreis 7 (sul posto)",
    "intro": "Foratura a Hottingen, Hirslanden & Witikon? VELOV è la tua officina mobile nel Kreis 7, di solito sul posto in 50 minuti. Zona di servizio: Kreuzplatz, Klinik Hirslanden, Römerhof, Dolder, Zürichberg, Forch.",
    "sections": [
      {
        "h2": "Hottingen, Hirslanden & Witikon – conosciamo il quartiere",
        "body": "Kreis 7 – Kreuzplatz, Clinica Hirslanden, Witikon, Dolder, Zürichberg. Quartiere premium con molte e-bike e bici di fascia alta. Molti servizi e-bike e lavori speciali come conversioni a cinghia. Witikon e Forch in alto: 5–10 minuti in più, nessun problema con la cargo bike."
      },
      {
        "h2": "Punti chiave del quartiere",
        "body": "Intorno a Kreuzplatz, Clinica Hirslanden e centro Witikon – conversioni a cinghia e mozzi enviolo TR spesso richiesti. Kreuzplatz · Klinik Hirslanden · Römerhof · Dolder · Zürichberg · Forch · Witikon Zentrum · Burgwies"
      }
    ],
    "faqs": [
      {
        "q": "Quanto siete veloci a Hottingen, Hirslanden & Witikon?",
        "a": "Di solito 35–55 minuti dalla prenotazione WhatsApp – Hottingen, Hirslanden & Witikon è nel nostro giro quotidiano."
      },
      {
        "q": "Quali CAP coprite nel Kreis 7?",
        "a": "Tutti gli indirizzi del Kreis 7 (8008, 8032, 8044, 8053), senza supplemento in città."
      },
      {
        "q": "Devo essere a casa?",
        "a": "No. Lascia la bici fuori o nel locale, inviamo foto e link di pagamento TWINT dopo la riparazione."
      },
      {
        "q": "Fate giornate B2B per cooperative e aziende?",
        "a": "Sì – giornate B2B a Hottingen, Hirslanden & Witikon da CHF 49 di trasferta. Vedi velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 per emergenze foratura a Hottingen, Hirslanden & Witikon (Kreis 7) · info@velov.ch"
  },
  "ES": {
    "id": "hottingen_es",
    "h1": "Mecánico de bici móvil Hottingen, Hirslanden & Witikon – Reparación de bicicleta Kreis 7 (in situ)",
    "intro": "¿Pinchazo en Hottingen, Hirslanden & Witikon? VELOV es tu taller móvil de bicis en el Kreis 7, normalmente en el lugar en 50 minutos. Zona de servicio: Kreuzplatz, Klinik Hirslanden, Römerhof, Dolder, Zürichberg, Forch.",
    "sections": [
      {
        "h2": "Hottingen, Hirslanden & Witikon – conocemos el barrio",
        "body": "Kreis 7 – Kreuzplatz, Clínica Hirslanden, Witikon, Dolder, Zürichberg. Barrio premium con muchas e-bikes y bicis de gama alta. Muchos servicios de e-bike y trabajos especiales como conversiones a correa. Witikon y Forch arriba: 5–10 minutos extra, sin problema con la cargo bike."
      },
      {
        "h2": "Puntos clave del barrio",
        "body": "Alrededor de Kreuzplatz, Clínica Hirslanden y centro de Witikon – conversiones a correa y bujes enviolo TR muy solicitados. Kreuzplatz · Klinik Hirslanden · Römerhof · Dolder · Zürichberg · Forch · Witikon Zentrum · Burgwies"
      }
    ],
    "faqs": [
      {
        "q": "¿Cuán rápido llegáis a Hottingen, Hirslanden & Witikon?",
        "a": "Normalmente 35–55 minutos tras la reserva por WhatsApp – Hottingen, Hirslanden & Witikon está en nuestra ruta diaria."
      },
      {
        "q": "¿Qué códigos postales cubrís en el Kreis 7?",
        "a": "Todas las direcciones del Kreis 7 (8008, 8032, 8044, 8053), sin recargo en la ciudad."
      },
      {
        "q": "¿Necesito estar en casa?",
        "a": "No. Deja la bici fuera o en el cuarto de bicis, enviamos foto y enlace TWINT tras la reparación."
      },
      {
        "q": "¿Hacéis jornadas B2B para cooperativas y empresas?",
        "a": "Sí – jornadas B2B en Hottingen, Hirslanden & Witikon desde CHF 49 de desplazamiento. Ver velov.ch/b2b."
      }
    ],
    "contact": "WhatsApp +41 76 235 21 26 para urgencias de pinchazo en Hottingen, Hirslanden & Witikon (Kreis 7) · info@velov.ch"
  }
};

const VELOV_SEO_HOTTINGEN_I18N = {
  "DE": {
    "heroH1": "Mobiler Velomechaniker Hottingen, Hirslanden & Witikon – Velo-Reparatur Kreis 7 (vor Ort)",
    "heroTagline": "Mobile Fahrrad- & E-Bike Reparatur in Hottingen, Hirslanden & Witikon, Kreis 7 (8008, 8032, 8044, 8053). Wir kommen per Velo & Cargo-Bike zu dir nach Hause oder ins Büro. Anfahrt CHF 49.",
    "heroSub": "📍 Kreis 7 · Ø 50 Min Reaktionszeit · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "Alle Standorte",
    "kreisName": "Hottingen, Hirslanden & Witikon",
    "wizardTitle": "🩺 Velo-Check in 30 Sekunden",
    "wizardLead": "Wähle alle Symptome aus, die dein Velo hat — wir sagen dir, welcher Service passt, was es kostet, und wann wir da sind.",
    "step1": "Was ist kaputt? (Mehrfach-Auswahl)",
    "step2": "Wie dringend?",
    "boxPrice": "Preis ab",
    "boxDur": "Dauer",
    "boxEta": "Reaktion",
    "cta": "📱 Jetzt in Hottingen, Hirslanden & Witikon buchen →",
    "sectionServices": "Services in Hottingen, Hirslanden & Witikon",
    "sectionWhy": "Warum VELOV in Hottingen, Hirslanden & Witikon?",
    "sectionCommon": "Häufige Probleme in Hottingen, Hirslanden & Witikon — VELOV Lösung",
    "sectionStory": "Hottingen, Hirslanden & Witikon – wir kennen das Quartier",
    "finalH2": "Dein Fahrrad kaputt in Hottingen, Hirslanden & Witikon?",
    "finalP": "Same-day verfügbar. Schreib uns — Antwort in wenigen Minuten.",
    "finalBtn": "→ WhatsApp buchen (Hottingen, Hirslanden & Witikon)",
    "finalCallPrefix": "oder ruf an:",
    "waMsgPrefix": "Hi VELOV, ich bin in Hottingen, Hirslanden & Witikon und brauche eine Velo-Reparatur.",
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
        "text": "Oft in unter 1 Stunde in Hottingen, Hirslanden & Witikon. Same-day Buchung."
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
      "<strong>Platten auf dem Weg zur Arbeit?</strong> → Ruf VELOV an, wir reparieren in Hottingen, Hirslanden & Witikon in 30 Min.",
      "<strong>Schaltung blockiert?</strong> → VELOV kommt und justiert vor Ort.",
      "<strong>E-Bike Motor kaputt?</strong> → Unsere E-Bike Spezialisten beheben das Problem.",
      "<strong>Sonntag Notfall?</strong> → 24h verfügbar — VELOV ist für dich da!"
    ],
    "story": "Kreis 7 – Kreuzplatz, Klinik Hirslanden, Witikon, Dolder, Zürichberg. Premium-Quartier mit vielen E-Bikes und hochwertigen Velos. Wir machen hier viele E-Bike-Services und auch Spezial-Aufträge wie Riemenantrieb-Umbauten. Witikon und Forch oben am Hügel: 5–10 Minuten mehr Anfahrt, kein Problem mit Cargo-Bike.",
    "storyShort": "In der Nähe vom Kreuzplatz, an der Klinik Hirslanden und in Witikon Zentrum betreuen wir hochwertige Velos – auch Riemenantrieb-Umbauten und enviolo TR-Hubs sind hier oft gefragt."
  },
  "EN": {
    "heroH1": "Mobile Bike Mechanic Hottingen, Hirslanden & Witikon – Bicycle Repair Kreis 7 (on-site)",
    "heroTagline": "Mobile bicycle & e-bike repair in Hottingen, Hirslanden & Witikon, Kreis 7 (8008, 8032, 8044, 8053). We come by bike & cargo bike to your home or office. Travel fee CHF 49.",
    "heroSub": "📍 Kreis 7 · Ø 50 min reaction time · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "All Locations",
    "kreisName": "Hottingen, Hirslanden & Witikon",
    "wizardTitle": "🩺 30-second bike check",
    "wizardLead": "Pick all symptoms your bike has — we tell you which service fits, what it costs and when we arrive.",
    "step1": "What's broken? (multi-select)",
    "step2": "How urgent?",
    "boxPrice": "Price from",
    "boxDur": "Duration",
    "boxEta": "Arrival",
    "cta": "📱 Book Hottingen, Hirslanden & Witikon now →",
    "sectionServices": "Services in Hottingen, Hirslanden & Witikon",
    "sectionWhy": "Why VELOV in Hottingen, Hirslanden & Witikon?",
    "sectionCommon": "Common problems in Hottingen, Hirslanden & Witikon — VELOV solution",
    "sectionStory": "Hottingen, Hirslanden & Witikon – we know the area",
    "finalH2": "Bike broken in Hottingen, Hirslanden & Witikon?",
    "finalP": "Same-day available. Message us — reply in minutes.",
    "finalBtn": "→ Book on WhatsApp (Hottingen, Hirslanden & Witikon)",
    "finalCallPrefix": "or call:",
    "waMsgPrefix": "Hi VELOV, I am in Hottingen, Hirslanden & Witikon and need a bike repair.",
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
        "text": "Often under 1 hour in Hottingen, Hirslanden & Witikon. Same-day booking."
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
      "<strong>Flat on the way to work?</strong> → Call VELOV, we repair in Hottingen, Hirslanden & Witikon within 30 min.",
      "<strong>Gears stuck?</strong> → VELOV comes and adjusts on-site.",
      "<strong>E-bike motor down?</strong> → Our e-bike specialists fix it.",
      "<strong>Sunday emergency?</strong> → 24h available — VELOV is here for you!"
    ],
    "story": "Kreis 7 – Kreuzplatz, Hirslanden Clinic, Witikon, Dolder, Zürichberg. Premium district with many e-bikes and high-end bicycles. We do many e-bike services here and special jobs like belt-drive conversions. Witikon and Forch up on the hill: 5–10 minutes extra travel, no problem with our cargo bike.",
    "storyShort": "Around Kreuzplatz, Hirslanden Clinic and Witikon centre we look after premium bikes – belt-drive conversions and enviolo TR hubs are often requested here."
  },
  "FR": {
    "heroH1": "Mécanicien vélo mobile Hottingen, Hirslanden & Witikon – Réparation vélo Kreis 7 (sur place)",
    "heroTagline": "Réparation mobile de vélos & vélos électriques à Hottingen, Hirslanden & Witikon, Kreis 7 (8008, 8032, 8044, 8053). Nous venons à vélo & cargo bike chez vous ou au bureau. Frais de déplacement CHF 49.",
    "heroSub": "📍 Kreis 7 · ~50 min de réaction · Same-day 24h",
    "crumbHome": "Accueil",
    "crumbLocations": "Tous les sites",
    "kreisName": "Hottingen, Hirslanden & Witikon",
    "wizardTitle": "🩺 Check vélo en 30 secondes",
    "wizardLead": "Sélectionnez tous les symptômes de votre vélo — nous vous disons quel service convient, le prix et notre arrivée.",
    "step1": "Qu'est-ce qui est cassé ? (multi-sélection)",
    "step2": "Quelle urgence ?",
    "boxPrice": "Prix dès",
    "boxDur": "Durée",
    "boxEta": "Arrivée",
    "cta": "📱 Réserver à Hottingen, Hirslanden & Witikon →",
    "sectionServices": "Services à Hottingen, Hirslanden & Witikon",
    "sectionWhy": "Pourquoi VELOV à Hottingen, Hirslanden & Witikon ?",
    "sectionCommon": "Problèmes fréquents à Hottingen, Hirslanden & Witikon — solution VELOV",
    "sectionStory": "Hottingen, Hirslanden & Witikon – nous connaissons le quartier",
    "finalH2": "Vélo en panne à Hottingen, Hirslanden & Witikon ?",
    "finalP": "Disponible le jour même. Écrivez-nous — réponse en quelques minutes.",
    "finalBtn": "→ Réserver sur WhatsApp (Hottingen, Hirslanden & Witikon)",
    "finalCallPrefix": "ou appelez :",
    "waMsgPrefix": "Bonjour VELOV, je suis à Hottingen, Hirslanden & Witikon et j'ai besoin d'une réparation vélo.",
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
        "text": "Souvent moins d'1 heure à Hottingen, Hirslanden & Witikon. Réservation le jour même."
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
      "<strong>Crevaison sur le chemin du travail ?</strong> → Appelez VELOV, réparation à Hottingen, Hirslanden & Witikon en 30 min.",
      "<strong>Vitesses bloquées ?</strong> → VELOV vient régler sur place.",
      "<strong>Moteur e-bike en panne ?</strong> → Nos spécialistes e-bike réparent.",
      "<strong>Urgence dimanche ?</strong> → 24h disponible — VELOV est là pour vous !"
    ],
    "story": "Kreis 7 – Kreuzplatz, Clinique Hirslanden, Witikon, Dolder, Zürichberg. Quartier premium avec nombreux vélos électriques et haut de gamme. Beaucoup de services e-bike et travaux spéciaux comme conversions courroie. Witikon et Forch en haut : 5–10 minutes de plus, sans problème avec notre cargo bike.",
    "storyShort": "Autour du Kreuzplatz, de la Clinique Hirslanden et du centre de Witikon – conversions courroie et moyeux enviolo TR souvent demandés."
  },
  "IT": {
    "heroH1": "Meccanico bici mobile Hottingen, Hirslanden & Witikon – Riparazione bici Kreis 7 (sul posto)",
    "heroTagline": "Riparazione mobile bici ed e-bike a Hottingen, Hirslanden & Witikon, Kreis 7 (8008, 8032, 8044, 8053). Veniamo in bici & cargo bike a casa o ufficio. Spostamento CHF 49.",
    "heroSub": "📍 Kreis 7 · ~50 min di reazione · Same-day 24h",
    "crumbHome": "Home",
    "crumbLocations": "Tutte le sedi",
    "kreisName": "Hottingen, Hirslanden & Witikon",
    "wizardTitle": "🩺 Check bici in 30 secondi",
    "wizardLead": "Seleziona tutti i sintomi della tua bici — ti diciamo quale servizio serve, quanto costa e quando arriviamo.",
    "step1": "Cosa è rotto? (selezione multipla)",
    "step2": "Quanto urgente?",
    "boxPrice": "Prezzo da",
    "boxDur": "Durata",
    "boxEta": "Arrivo",
    "cta": "📱 Prenota a Hottingen, Hirslanden & Witikon →",
    "sectionServices": "Servizi a Hottingen, Hirslanden & Witikon",
    "sectionWhy": "Perché VELOV a Hottingen, Hirslanden & Witikon?",
    "sectionCommon": "Problemi frequenti a Hottingen, Hirslanden & Witikon — soluzione VELOV",
    "sectionStory": "Hottingen, Hirslanden & Witikon – conosciamo il quartiere",
    "finalH2": "Bici rotta a Hottingen, Hirslanden & Witikon?",
    "finalP": "Disponibile in giornata. Scrivici — risposta in pochi minuti.",
    "finalBtn": "→ Prenota su WhatsApp (Hottingen, Hirslanden & Witikon)",
    "finalCallPrefix": "oppure chiama:",
    "waMsgPrefix": "Ciao VELOV, sono a Hottingen, Hirslanden & Witikon e ho bisogno di una riparazione.",
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
        "text": "Spesso meno di 1 ora a Hottingen, Hirslanden & Witikon. Prenotazione in giornata."
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
      "<strong>Foratura andando al lavoro?</strong> → Chiama VELOV, riparazione a Hottingen, Hirslanden & Witikon in 30 min.",
      "<strong>Cambio bloccato?</strong> → VELOV viene a registrare sul posto.",
      "<strong>Motore e-bike rotto?</strong> → I nostri specialisti e-bike risolvono.",
      "<strong>Emergenza domenica?</strong> → 24h disponibili — VELOV c'è!"
    ],
    "story": "Kreis 7 – Kreuzplatz, Clinica Hirslanden, Witikon, Dolder, Zürichberg. Quartiere premium con molte e-bike e bici di fascia alta. Molti servizi e-bike e lavori speciali come conversioni a cinghia. Witikon e Forch in alto: 5–10 minuti in più, nessun problema con la cargo bike.",
    "storyShort": "Intorno a Kreuzplatz, Clinica Hirslanden e centro Witikon – conversioni a cinghia e mozzi enviolo TR spesso richiesti."
  },
  "ES": {
    "heroH1": "Mecánico de bici móvil Hottingen, Hirslanden & Witikon – Reparación de bicicleta Kreis 7 (in situ)",
    "heroTagline": "Reparación móvil de bicis y e-bikes en Hottingen, Hirslanden & Witikon, Kreis 7 (8008, 8032, 8044, 8053). Vamos en bici y cargo bike a tu casa u oficina. Desplazamiento CHF 49.",
    "heroSub": "📍 Kreis 7 · ~50 min de reacción · Same-day 24h",
    "crumbHome": "Inicio",
    "crumbLocations": "Todas las zonas",
    "kreisName": "Hottingen, Hirslanden & Witikon",
    "wizardTitle": "🩺 Check bici en 30 segundos",
    "wizardLead": "Selecciona todos los síntomas de tu bici — te decimos qué servicio toca, cuánto cuesta y cuándo llegamos.",
    "step1": "¿Qué está roto? (selección múltiple)",
    "step2": "¿Cuán urgente?",
    "boxPrice": "Precio desde",
    "boxDur": "Duración",
    "boxEta": "Llegada",
    "cta": "📱 Reservar en Hottingen, Hirslanden & Witikon →",
    "sectionServices": "Servicios en Hottingen, Hirslanden & Witikon",
    "sectionWhy": "¿Por qué VELOV en Hottingen, Hirslanden & Witikon?",
    "sectionCommon": "Problemas frecuentes en Hottingen, Hirslanden & Witikon — solución VELOV",
    "sectionStory": "Hottingen, Hirslanden & Witikon – conocemos el barrio",
    "finalH2": "¿Bici rota en Hottingen, Hirslanden & Witikon?",
    "finalP": "Disponible el mismo día. Escríbenos — respuesta en pocos minutos.",
    "finalBtn": "→ Reservar por WhatsApp (Hottingen, Hirslanden & Witikon)",
    "finalCallPrefix": "o llama:",
    "waMsgPrefix": "Hola VELOV, estoy en Hottingen, Hirslanden & Witikon y necesito una reparación.",
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
        "text": "Frecuente menos de 1 hora en Hottingen, Hirslanden & Witikon. Reserva el mismo día."
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
      "<strong>¿Pinchazo de camino al trabajo?</strong> → Llama a VELOV, reparación en Hottingen, Hirslanden & Witikon en 30 min.",
      "<strong>¿Cambios atascados?</strong> → VELOV ajusta in situ.",
      "<strong>¿Motor e-bike roto?</strong> → Nuestros especialistas e-bike lo arreglan.",
      "<strong>¿Urgencia domingo?</strong> → 24h disponibles — ¡VELOV está ahí!"
    ],
    "story": "Kreis 7 – Kreuzplatz, Clínica Hirslanden, Witikon, Dolder, Zürichberg. Barrio premium con muchas e-bikes y bicis de gama alta. Muchos servicios de e-bike y trabajos especiales como conversiones a correa. Witikon y Forch arriba: 5–10 minutos extra, sin problema con la cargo bike.",
    "storyShort": "Alrededor de Kreuzplatz, Clínica Hirslanden y centro de Witikon – conversiones a correa y bujes enviolo TR muy solicitados."
  }
};

const VELOV_SEO_HOTTINGEN_KREIS = {
  "id": "hottingen",
  "slug": "hottingen-witikon",
  "kreis": 7,
  "kreisLabel": "Kreis 7",
  "plz": [
    "8008",
    "8032",
    "8044",
    "8053"
  ],
  "neighbours": [
    "altstadt",
    "unterstrass",
    "riesbach"
  ],
  "landmarks": [
    "Kreuzplatz",
    "Klinik Hirslanden",
    "Römerhof",
    "Dolder",
    "Zürichberg",
    "Forch",
    "Witikon Zentrum",
    "Burgwies",
    "Tobelhof"
  ],
  "quartiere": [
    "Hottingen",
    "Hirslanden",
    "Witikon"
  ],
  "baseEta": 50
};

class VelovHottingen extends HTMLElement {
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
      zone: 'Hottingen, Hirslanden & Witikon',
      kreisId: 'hottingen',
      kreisLabel: 'Kreis 7',
      phone: '+41762352126',
      phoneDisplay: '+41 076 235 21 26',
      whatsapp: '41762352126',
      email: 'velovzh@gmail.com',
      url: 'https://velov.ch/hottingen-witikon',
      baseEta: 50,
      neighbours: [{ slug: 'altstadt', name: 'Altstadt' }, { slug: 'unterstrass-oberstrass', name: 'Unterstrass & Oberstrass' }, { slug: 'seefeld-riesbach', name: 'Seefeld & Riesbach' }]
    };
  }

  connectedCallback() {
    this.lang = this.detectLang();
    const seoCfg = VELOV_SEO_HOTTINGEN_BY_LANG[this.lang] || VELOV_SEO_HOTTINGEN_BY_LANG.DE;
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, seoCfg); } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this); } catch(e) {}

    this.injectStyles();
    this.render();
    this.bindEvents();
  }

  injectStyles() {
    const styleId = 'velov-hottingen-styles';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      velov-hottingen { display: block; width: 100%; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2B3D; box-sizing: border-box; }
      velov-hottingen *, velov-hottingen *::before, velov-hottingen *::after { box-sizing: border-box; }
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
    const C = VelovHottingen.CONFIG;
    const T = VELOV_SEO_HOTTINGEN_I18N[this.lang] || VELOV_SEO_HOTTINGEN_I18N.DE;

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

    const lmHtml = VELOV_SEO_HOTTINGEN_KREIS.landmarks.slice(0, 8).map(function(lm){
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
    const T = VELOV_SEO_HOTTINGEN_I18N[this.lang] || VELOV_SEO_HOTTINGEN_I18N.DE;
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
    const T = VELOV_SEO_HOTTINGEN_I18N[this.lang] || VELOV_SEO_HOTTINGEN_I18N.DE;
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
    const C = VelovHottingen.CONFIG;
    const T = VELOV_SEO_HOTTINGEN_I18N[this.lang] || VELOV_SEO_HOTTINGEN_I18N.DE;
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

if (!customElements.get('velov-hottingen')) {
  customElements.define('velov-hottingen', VelovHottingen);
}
