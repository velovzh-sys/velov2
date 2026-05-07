{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier-Bold;\f1\froman\fcharset0 Times-Bold;\f2\froman\fcharset0 Times-Roman;
\f3\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sa321\partightenfactor0

\f0\b\fs52 \cf0 \expnd0\expndtw0\kerning0
unified-chatgpt-ebikes.js
\f1\fs48 \
\pard\pardeftab720\sa240\partightenfactor0

\f2\b0\fs24 \cf0 Replace ALL old language files with this ONE Wix Custom Element file.\
Use in Wix:\
\pard\pardeftab720\sa298\partightenfactor0

\f1\b\fs36 \cf0 Custom Element URL\
\pard\pardeftab720\partightenfactor0

\f3\b0\fs26 \cf0 https://cdn.jsdelivr.net/gh/velovzh-sys/velov2@main/unified-chatgpt-ebikes.js\
\pard\pardeftab720\sa298\partightenfactor0

\f1\b\fs36 \cf0 Tag Name\
\pard\pardeftab720\partightenfactor0

\f3\b0\fs26 \cf0 velov-unified-ebike\
\pard\pardeftab720\sa240\partightenfactor0

\f2\fs24 \cf0 \
\uc0\u11835 \
\
\pard\pardeftab720\partightenfactor0

\f3\fs26 \cf0 class VelovUnifiedEbike extends HTMLElement \{\
\
  connectedCallback() \{\
\
    if (window.__VELOV_UNIFIED_EBIKE__) return;\
    window.__VELOV_UNIFIED_EBIKE__ = true;\
\
    /* =========================================================\
       CORE CONFIG\
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
    function detectLanguage() \{\
\
      const path = location.pathname.toLowerCase();\
\
      if (path.startsWith('/en')) return 'en';\
      if (path.startsWith('/fr')) return 'fr';\
      if (path.startsWith('/it')) return 'it';\
      if (path.startsWith('/es')) return 'es';\
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
\
      de: \{\
        locale: 'de-CH',\
        hreflang: 'de-CH',\
\
        title:\
          'E-Bike Service Z\'fcrich | Mobile Velowerkstatt | VELOV',\
\
        description:\
          'Mobiler E-Bike Service und Fahrradreparatur in Z\'fcrich. Bosch, Shimano, Yamaha, Cargo Bikes und Premium Velos.',\
\
        h1:\
          'E-Bike Service Z\'fcrich \'96 mobile Wartung f\'fcr alle Marken',\
\
        intro:\
          'VELOV bietet mobilen E-Bike Service in Z\'fcrich f\'fcr Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.',\
\
        faqTitle:\
          'H\'e4ufige Fragen',\
\
        contactTitle:\
          'Kontakt',\
\
        businessName:\
          'VELOV \'97 Mobile Velowerkstatt Z\'fcrich',\
\
        keywords: [\
          'Velo Service Z\'fcrich',\
          'Mobile Velowerkstatt Z\'fcrich',\
          'E-Bike Service Z\'fcrich',\
          'Fahrrad Reparatur Z\'fcrich',\
          'Cargo Bike Service Z\'fcrich',\
          'Bosch E-Bike Service Z\'fcrich'\
        ]\
      \},\
\
      en: \{\
        locale: 'en-CH',\
        hreflang: 'en-CH',\
\
        title:\
          'Mobile Bike Repair Zurich | E-Bike Service | VELOV',\
\
        description:\
          'Premium mobile bike repair and e-bike service in Zurich. Bosch, Shimano, cargo bikes and high-end bicycles.',\
\
        h1:\
          'E-Bike Service Zurich \'96 Mobile Maintenance for All Brands',\
\
        intro:\
          'VELOV provides premium mobile bike repair and e-bike service in Zurich.',\
\
        faqTitle:\
          'Frequently Asked Questions',\
\
        contactTitle:\
          'Contact',\
\
        businessName:\
          'VELOV \'97 Mobile Bike Workshop Zurich',\
\
        keywords: [\
          'mobile bike repair Zurich',\
          'bicycle mechanic Zurich',\
          'e-bike service Zurich',\
          'cargo bike repair Zurich'\
        ]\
      \},\
\
      fr: \{\
        locale: 'fr-CH',\
        hreflang: 'fr-CH',\
\
        title:\
          'R\'e9paration V\'e9lo Zurich | Service E-Bike Mobile | VELOV',\
\
        description:\
          'Atelier v\'e9lo mobile premium \'e0 Zurich pour v\'e9los \'e9lectriques et v\'e9los cargo.',\
\
        h1:\
          'Service E-Bike Zurich \'96 Atelier Mobile',\
\
        intro:\
          'Service mobile premium pour v\'e9los et e-bikes \'e0 Zurich.',\
\
        faqTitle:\
          'Questions fr\'e9quentes',\
\
        contactTitle:\
          'Contact',\
\
        businessName:\
          'VELOV \'97 Atelier V\'e9lo Mobile Zurich',\
\
        keywords: [\
          'r\'e9paration v\'e9lo Zurich',\
          'atelier v\'e9lo mobile Zurich'\
        ]\
      \},\
\
      it: \{\
        locale: 'it-CH',\
        hreflang: 'it-CH',\
\
        title:\
          'Riparazione Bici Zurigo | Servizio E-Bike Mobile | VELOV',\
\
        description:\
          'Officina bici mobile premium a Zurigo per e-bike e cargo bike.',\
\
        h1:\
          'Servizio E-Bike Zurigo \'96 Officina Mobile',\
\
        intro:\
          'Servizio mobile premium per biciclette ed e-bike a Zurigo.',\
\
        faqTitle:\
          'Domande frequenti',\
\
        contactTitle:\
          'Contatti',\
\
        businessName:\
          'VELOV \'97 Officina Bici Mobile Zurigo',\
\
        keywords: [\
          'riparazione bici Zurigo',\
          'officina bici mobile Zurigo'\
        ]\
      \},\
\
      es: \{\
        locale: 'es',\
        hreflang: 'es',\
\
        title:\
          'Reparaci\'f3n Bicicleta Z\'farich | Servicio E-Bike | VELOV',\
\
        description:\
          'Taller m\'f3vil premium de bicicletas y e-bikes en Z\'farich.',\
\
        h1:\
          'Servicio E-Bike Z\'farich \'96 Taller M\'f3vil',\
\
        intro:\
          'Servicio m\'f3vil premium de bicicletas en Z\'farich.',\
\
        faqTitle:\
          'Preguntas frecuentes',\
\
        contactTitle:\
          'Contacto',\
\
        businessName:\
          'VELOV \'97 Taller de Bicicletas M\'f3vil Z\'farich',\
\
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
       TITLE + META\
    ========================================================= */\
\
    function setMeta() \{\
\
      document.title = T.title;\
\
      function upsertMeta(name, content, attr = 'name') \{\
\
        let el = document.head.querySelector(\
          `meta[$\{attr\}="$\{name\}"]`\
        );\
\
        if (!el) \{\
          el = document.createElement('meta');\
          el.setAttribute(attr, name);\
          document.head.appendChild(el);\
        \}\
\
        el.setAttribute('content', content);\
      \}\
\
      upsertMeta(\
        'description',\
        T.description\
      );\
\
      upsertMeta(\
        'keywords',\
        T.keywords.join(', ')\
      );\
\
      upsertMeta(\
        'og:title',\
        T.title,\
        'property'\
      );\
\
      upsertMeta(\
        'og:description',\
        T.description,\
        'property'\
      );\
\
      upsertMeta(\
        'og:type',\
        'website',\
        'property'\
      );\
\
      upsertMeta(\
        'og:url',\
        location.href,\
        'property'\
      );\
\
      upsertMeta(\
        'og:image',\
        BRAND.image,\
        'property'\
      );\
\
      upsertMeta(\
        'twitter:card',\
        'summary_large_image'\
      );\
    \}\
\
    /* =========================================================\
       CANONICAL\
    ========================================================= */\
\
    function injectCanonical() \{\
\
      let canonical =\
        document.querySelector(\
          'link[rel="canonical"]'\
        );\
\
      if (!canonical) \{\
        canonical =\
          document.createElement('link');\
\
        canonical.rel = 'canonical';\
\
        document.head.appendChild(canonical);\
      \}\
\
      canonical.href =\
        location.href.split('?')[0];\
    \}\
\
    /* =========================================================\
       HREFLANG\
    ========================================================= */\
\
    function injectHreflang() \{\
\
      const hreflangs = \{\
\
        'de-CH':\
          'https://www.velov.ch/',\
\
        'en-CH':\
          'https://www.velov.ch/en/',\
\
        'fr-CH':\
          'https://www.velov.ch/fr/',\
\
        'it-CH':\
          'https://www.velov.ch/it/',\
\
        'es':\
          'https://www.velov.ch/es/'\
      \};\
\
      Object.entries(hreflangs)\
        .forEach(([lang, url]) => \{\
\
          if (\
            document.head.querySelector(\
              `link[hreflang="$\{lang\}"]`\
            )\
          ) return;\
\
          const link =\
            document.createElement('link');\
\
          link.rel = 'alternate';\
          link.hreflang = lang;\
          link.href = url;\
\
          document.head.appendChild(link);\
        \});\
\
      if (\
        !document.head.querySelector(\
          'link[hreflang="x-default"]'\
        )\
      ) \{\
\
        const x =\
          document.createElement('link');\
\
        x.rel = 'alternate';\
        x.hreflang = 'x-default';\
        x.href = 'https://www.velov.ch/';\
\
        document.head.appendChild(x);\
      \}\
    \}\
\
    /* =========================================================\
       SCHEMA\
    ========================================================= */\
\
    function injectSchema() \{\
\
      if (\
        document.getElementById(\
          'velov-unified-schema'\
        )\
      ) return;\
\
      const schema = [\
\
        \{\
          '@context':\
            'https://schema.org',\
\
          '@type':\
            'LocalBusiness',\
\
          '@id':\
            'https://www.velov.ch/#business',\
\
          name:\
            T.businessName,\
\
          url:\
            location.origin,\
\
          image:\
            BRAND.image,\
\
          telephone:\
            BRAND.phone,\
\
          email:\
            BRAND.email,\
\
          priceRange:\
            'CHF',\
\
          address: \{\
\
            '@type':\
              'PostalAddress',\
\
            streetAddress:\
              'Merkurstrasse 56',\
\
            addressLocality:\
              'Z\'fcrich',\
\
            postalCode:\
              '8032',\
\
            addressRegion:\
              'ZH',\
\
            addressCountry:\
              'CH'\
          \},\
\
          geo: \{\
\
            '@type':\
              'GeoCoordinates',\
\
            latitude:\
              47.3769,\
\
            longitude:\
              8.5417\
          \},\
\
          areaServed: [\
\
            'Z\'fcrich',\
            'Altstetten',\
            'Wiedikon',\
            'Seefeld',\
            'Oerlikon',\
            'Winterthur',\
            'Kilchberg',\
            'Adliswil'\
          ],\
\
          openingHoursSpecification: [\
\
            \{\
              '@type':\
                'OpeningHoursSpecification',\
\
              dayOfWeek: [\
\
                'Monday',\
                'Tuesday',\
                'Wednesday',\
                'Thursday',\
                'Friday',\
                'Saturday'\
              ],\
\
              opens:\
                '08:00',\
\
              closes:\
                '18:00'\
            \}\
          ],\
\
          aggregateRating: \{\
\
            '@type':\
              'AggregateRating',\
\
            ratingValue:\
              '4.8',\
\
            reviewCount:\
              '500'\
          \},\
\
          knowsLanguage: [\
            'de',\
            'en',\
            'fr',\
            'it',\
            'es'\
          ],\
\
          inLanguage:\
            T.locale\
        \},\
\
        \{\
          '@context':\
            'https://schema.org',\
\
          '@type':\
            'Service',\
\
          serviceType:\
            'Mobile Bike Repair',\
\
          provider: \{\
\
            '@type':\
              'LocalBusiness',\
\
            name:\
              T.businessName\
          \},\
\
          areaServed:\
            'Z\'fcrich',\
\
          offers: \{\
\
            '@type':\
              'Offer',\
\
            priceCurrency:\
              'CHF',\
\
            price:\
              '199'\
          \}\
        \},\
\
        \{\
          '@context':\
            'https://schema.org',\
\
          '@type':\
            'FAQPage',\
\
          mainEntity: [\
\
            \{\
              '@type':\
                'Question',\
\
              name:\
                'Welche E-Bike Marken repariert VELOV?',\
\
              acceptedAnswer: \{\
\
                '@type':\
                  'Answer',\
\
                text:\
                  'Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.'\
              \}\
            \},\
\
            \{\
              '@type':\
                'Question',\
\
              name:\
                'Bietet VELOV mobilen Service in Z\'fcrich an?',\
\
              acceptedAnswer: \{\
\
                '@type':\
                  'Answer',\
\
                text:\
                  'Ja, VELOV kommt direkt zu dir nach Hause oder ins B\'fcro.'\
              \}\
            \}\
          ]\
        \}\
      ];\
\
      const script =\
        document.createElement('script');\
\
      script.type =\
        'application/ld+json';\
\
      script.id =\
        'velov-unified-schema';\
\
      script.textContent =\
        JSON.stringify(schema);\
\
      document.head.appendChild(script);\
    \}\
\
    /* =========================================================\
       SEO MIRROR CONTENT\
    ========================================================= */\
\
    function injectSeoMirror() \{\
\
      if (\
        document.querySelector(\
          '[data-velov-seo]'\
        )\
      ) return;\
\
      const div =\
        document.createElement('div');\
\
      div.setAttribute(\
        'data-velov-seo',\
        'true'\
      );\
\
      div.setAttribute(\
        'aria-hidden',\
        'true'\
      );\
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
          <header>\
            <h1>$\{T.h1\}</h1>\
            <p>$\{T.intro\}</p>\
          </header>\
\
          <section>\
            <h2>Mobile Bike Repair Z\'fcrich</h2>\
            <p>$\{T.description\}</p>\
          </section>\
\
          <section>\
            <h2>E-Bike Service</h2>\
            <p>\
              Bosch, Shimano,\
              Yamaha, Brose,\
              Fazua, TQ, Bafang,\
              Cargo Bikes,\
              Urban Bikes,\
              Premium Bicycles.\
            </p>\
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
       TRACKING\
    ========================================================= */\
\
    function pushEvent(\
      name,\
      params = \{\}\
    ) \{\
\
      try \{\
\
        window.dataLayer =\
          window.dataLayer || [];\
\
        window.dataLayer.push(\{\
          event: name,\
          ...params\
        \});\
\
        if (\
          typeof window.gtag ===\
          'function'\
        ) \{\
\
          window.gtag(\
            'event',\
            name,\
            params\
          );\
        \}\
\
      \} catch(e)\{\}\
    \}\
\
    function bindTracking() \{\
\
      document.addEventListener(\
        'click',\
        function(e)\{\
\
          const a =\
            e.target.closest('a');\
\
          if(!a) return;\
\
          const href =\
            a.href || '';\
\
          if(\
            href.includes('wa.me')\
          ) \{\
\
            pushEvent(\
              'whatsapp_click'\
            );\
          \}\
\
          if(\
            href.startsWith('tel:')\
          ) \{\
\
            pushEvent(\
              'phone_click'\
            );\
          \}\
\
          if(\
            href.startsWith('mailto:')\
          ) \{\
\
            pushEvent(\
              'email_click'\
            );\
          \}\
\
        \},\
        true\
      );\
    \}\
\
    /* =========================================================\
       PERFORMANCE\
    ========================================================= */\
\
    function optimize() \{\
\
      document.documentElement\
        .setAttribute(\
          'lang',\
          LANG\
        );\
\
      document.documentElement\
        .setAttribute(\
          'data-velov-lang',\
          LANG\
        );\
    \}\
\
    /* =========================================================\
       INIT\
    ========================================================= */\
\
    function init() \{\
\
      setMeta();\
\
      injectCanonical();\
\
      injectHreflang();\
\
      injectSchema();\
\
      injectSeoMirror();\
\
      bindTracking();\
\
      optimize();\
    \}\
\
    if (\
      document.readyState ===\
      'loading'\
    ) \{\
\
      document.addEventListener(\
        'DOMContentLoaded',\
        init\
      );\
\
    \} else \{\
\
      init();\
    \}\
  \}\
\}\
\
customElements.define(\
  'velov-ebike',\
  VelovEbike\
);\
}