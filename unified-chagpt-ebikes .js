{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (function()\{\
  if(window.__VELOV_UNIFIED_SEO__) return;\
  window.__VELOV_UNIFIED_SEO__ = true;\
\
  /* =========================================================\
     CONFIG\
  ========================================================= */\
\
  const BRAND = \{\
    name: 'VELOV',\
    url: 'https://www.velov.ch',\
    phone: '+41762352126',\
    email: 'info@velov.ch',\
    image: 'https://www.velov.ch/og-image.jpg',\
    city: 'Z\'fcrich',\
    region: 'ZH',\
    country: 'CH'\
  \};\
\
  /* =========================================================\
     LANGUAGE DETECTION\
  ========================================================= */\
\
  function detectLanguage()\{\
    const path = location.pathname.toLowerCase();\
\
    if(path.startsWith('/en')) return 'en';\
    if(path.startsWith('/fr')) return 'fr';\
    if(path.startsWith('/it')) return 'it';\
    if(path.startsWith('/es')) return 'es';\
\
    return 'de';\
  \}\
\
  const LANG = detectLanguage();\
\
  /* =========================================================\
     TRANSLATIONS\
  ========================================================= */\
\
  const CONTENT = \{\
    de: \{\
      locale: 'de-CH',\
      h1: 'E-Bike Service Z\'fcrich \'96 mobile Wartung f\'fcr alle Marken',\
      intro: 'Mobiler E-Bike Service in Z\'fcrich f\'fcr Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.',\
      faqTitle: 'H\'e4ufige Fragen',\
      contactTitle: 'Kontakt',\
      businessName: 'VELOV \'97 Mobile Velowerkstatt Z\'fcrich',\
      description: 'Mobile Fahrradreparatur und E-Bike Service in Z\'fcrich. Wir kommen zu dir.',\
      keywords: [\
        'Velo Service Z\'fcrich',\
        'Mobile Velowerkstatt Z\'fcrich',\
        'E-Bike Service Z\'fcrich',\
        'Fahrrad Reparatur Z\'fcrich'\
      ]\
    \},\
\
    en: \{\
      locale: 'en-CH',\
      h1: 'E-Bike Service Zurich \'96 Mobile Maintenance for All Brands',\
      intro: 'Mobile e-bike service in Zurich for Bosch, Shimano, Yamaha, Brose, Fazua, TQ and Bafang.',\
      faqTitle: 'Frequently Asked Questions',\
      contactTitle: 'Contact',\
      businessName: 'VELOV \'97 Mobile Bike Workshop Zurich',\
      description: 'Mobile bike repair and e-bike service in Zurich. We come to you.',\
      keywords: [\
        'mobile bike repair Zurich',\
        'bicycle mechanic Zurich',\
        'e-bike service Zurich'\
      ]\
    \},\
\
    fr: \{\
      locale: 'fr-CH',\
      h1: 'Service E-Bike Zurich \'96 Entretien Mobile',\
      intro: 'Service e-bike mobile \'e0 Zurich pour toutes les marques.',\
      faqTitle: 'Questions fr\'e9quentes',\
      contactTitle: 'Contact',\
      businessName: 'VELOV \'97 Atelier Mobile de V\'e9lo Zurich',\
      description: 'R\'e9paration v\'e9lo mobile et service e-bike \'e0 Zurich.',\
      keywords: [\
        'r\'e9paration v\'e9lo Zurich',\
        'atelier v\'e9lo mobile Zurich'\
      ]\
    \},\
\
    it: \{\
      locale: 'it-CH',\
      h1: 'Servizio E-Bike Zurigo \'96 Manutenzione Mobile',\
      intro: 'Servizio e-bike mobile a Zurigo per tutte le marche.',\
      faqTitle: 'Domande frequenti',\
      contactTitle: 'Contatti',\
      businessName: 'VELOV \'97 Officina Bici Mobile Zurigo',\
      description: 'Riparazione bici mobile e servizio e-bike a Zurigo.',\
      keywords: [\
        'riparazione bici Zurigo',\
        'officina bici mobile Zurigo'\
      ]\
    \},\
\
    es: \{\
      locale: 'es',\
      h1: 'Servicio E\uc0\u8209 Bike Z\'farich \'96 Mantenimiento M\'f3vil',\
      intro: 'Servicio e-bike m\'f3vil en Z\'farich para todas las marcas.',\
      faqTitle: 'Preguntas frecuentes',\
      contactTitle: 'Contacto',\
      businessName: 'VELOV \'97 Taller de Bicicletas M\'f3vil Z\'farich',\
      description: 'Reparaci\'f3n m\'f3vil de bicicletas y servicio e-bike en Z\'farich.',\
      keywords: [\
        'reparaci\'f3n bicicleta Z\'farich',\
        'taller bici m\'f3vil Z\'farich'\
      ]\
    \}\
  \};\
\
  const T = CONTENT[LANG];\
\
  /* =========================================================\
     CANONICAL + HREFLANG\
  ========================================================= */\
\
  function injectCanonical()\{\
    let canonical = document.querySelector('link[rel="canonical"]');\
\
    if(!canonical)\{\
      canonical = document.createElement('link');\
      canonical.rel = 'canonical';\
      document.head.appendChild(canonical);\
    \}\
\
    canonical.href = location.href.split('?')[0];\
  \}\
\
  function injectHreflang()\{\
    const langs = \{\
      'de-CH': 'https://www.velov.ch/',\
      'en-CH': 'https://www.velov.ch/en/',\
      'fr-CH': 'https://www.velov.ch/fr/',\
      'it-CH': 'https://www.velov.ch/it/',\
      'es': 'https://www.velov.ch/es/'\
    \};\
\
    Object.entries(langs).forEach(([lang,url])=>\{\
      const link = document.createElement('link');\
      link.rel = 'alternate';\
      link.hreflang = lang;\
      link.href = url;\
      document.head.appendChild(link);\
    \});\
\
    const x = document.createElement('link');\
    x.rel = 'alternate';\
    x.hreflang = 'x-default';\
    x.href = 'https://www.velov.ch/';\
    document.head.appendChild(x);\
  \}\
\
  /* =========================================================\
     SCHEMA\
  ========================================================= */\
\
  function injectSchema()\{\
\
    const schema = [\
      \{\
        '@context': 'https://schema.org',\
        '@type': 'LocalBusiness',\
        '@id': BRAND.url + '/#business',\
        name: T.businessName,\
        url: location.origin,\
        telephone: BRAND.phone,\
        email: BRAND.email,\
        image: BRAND.image,\
        priceRange: 'CHF',\
\
        address: \{\
          '@type': 'PostalAddress',\
          streetAddress: 'Merkurstrasse 56',\
          addressLocality: 'Z\'fcrich',\
          postalCode: '8032',\
          addressRegion: 'ZH',\
          addressCountry: 'CH'\
        \},\
\
        geo: \{\
          '@type': 'GeoCoordinates',\
          latitude: 47.3769,\
          longitude: 8.5417\
        \},\
\
        areaServed: [\
          'Z\'fcrich',\
          'Winterthur',\
          'Altstetten',\
          'Wiedikon',\
          'Seefeld',\
          'Oerlikon'\
        ],\
\
        openingHoursSpecification: [\{\
          '@type': 'OpeningHoursSpecification',\
          dayOfWeek: [\
            'Monday',\
            'Tuesday',\
            'Wednesday',\
            'Thursday',\
            'Friday',\
            'Saturday'\
          ],\
          opens: '08:00',\
          closes: '18:00'\
        \}],\
\
        aggregateRating: \{\
          '@type': 'AggregateRating',\
          ratingValue: '4.8',\
          reviewCount: '500'\
        \},\
\
        knowsLanguage: ['de','en','fr','it','es'],\
        inLanguage: T.locale\
      \},\
\
      \{\
        '@context': 'https://schema.org',\
        '@type': 'Service',\
        serviceType: 'Mobile Bike Repair',\
        provider: \{\
          '@type': 'LocalBusiness',\
          name: T.businessName\
        \},\
        areaServed: 'Z\'fcrich',\
        offers: \{\
          '@type': 'Offer',\
          priceCurrency: 'CHF',\
          price: '199'\
        \}\
      \},\
\
      \{\
        '@context': 'https://schema.org',\
        '@type': 'FAQPage',\
        mainEntity: [\
          \{\
            '@type': 'Question',\
            name: 'Welche E-Bike Marken?',\
            acceptedAnswer: \{\
              '@type': 'Answer',\
              text: 'Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.'\
            \}\
          \}\
        ]\
      \}\
    ];\
\
    const existing = document.getElementById('velov-schema');\
    if(existing) existing.remove();\
\
    const script = document.createElement('script');\
    script.type = 'application/ld+json';\
    script.id = 'velov-schema';\
    script.textContent = JSON.stringify(schema);\
\
    document.head.appendChild(script);\
  \}\
\
  /* =========================================================\
     SEO MIRROR CONTENT\
  ========================================================= */\
\
  function injectSeoMirror()\{\
\
    if(document.querySelector('[data-velov-seo]')) return;\
\
    const div = document.createElement('div');\
\
    div.setAttribute('data-velov-seo','true');\
    div.setAttribute('aria-hidden','true');\
\
    div.style.cssText = `\
      position:absolute;\
      width:1px;\
      height:1px;\
      overflow:hidden;\
      clip:rect(0,0,0,0);\
      white-space:normal;\
    `;\
\
    div.innerHTML = `\
      <article lang="$\{LANG\}">\
        <h1>$\{T.h1\}</h1>\
        <p>$\{T.intro\}</p>\
\
        <section>\
          <h2>$\{BRAND.city\} Mobile Bike Repair</h2>\
          <p>$\{T.description\}</p>\
        </section>\
\
        <section>\
          <h2>$\{T.faqTitle\}</h2>\
          <h3>E-Bike Brands</h3>\
          <p>Bosch, Shimano, Yamaha, Brose, Fazua, TQ, Bafang.</p>\
        </section>\
\
        <section>\
          <h2>$\{T.contactTitle\}</h2>\
          <p>$\{BRAND.phone\}</p>\
          <p>$\{BRAND.email\}</p>\
        </section>\
      </article>\
    `;\
\
    document.body.appendChild(div);\
  \}\
\
  /* =========================================================\
     GA4 TRACKING\
  ========================================================= */\
\
  function pushEvent(name,data)\{\
    try\{\
      window.dataLayer = window.dataLayer || [];\
      window.dataLayer.push(Object.assign(\{event:name\},data||\{\}));\
\
      if(typeof window.gtag === 'function')\{\
        window.gtag('event',name,data||\{\});\
      \}\
    \}catch(e)\{\}\
  \}\
\
  function bindTracking()\{\
\
    document.addEventListener('click', function(e)\{\
\
      const a = e.target.closest('a');\
      if(!a) return;\
\
      const href = a.href || '';\
      const label = (a.textContent || '').trim();\
\
      if(href.includes('wa.me'))\{\
        pushEvent('whatsapp_click', \{label\});\
      \}\
\
      if(href.startsWith('tel:'))\{\
        pushEvent('phone_click', \{label\});\
      \}\
\
      if(href.startsWith('mailto:'))\{\
        pushEvent('email_click', \{label\});\
      \}\
\
    \}, true);\
  \}\
\
  /* =========================================================\
     PERFORMANCE\
  ========================================================= */\
\
  function optimize()\{\
    document.documentElement.lang = LANG;\
  \}\
\
  /* =========================================================\
     INIT\
  ========================================================= */\
\
  function init()\{\
    injectCanonical();\
    injectHreflang();\
    injectSchema();\
    injectSeoMirror();\
    bindTracking();\
    optimize();\
  \}\
\
  if(document.readyState === 'loading')\{\
    document.addEventListener('DOMContentLoaded', init);\
  \} else \{\
    init();\
  \}\
\
\})();}