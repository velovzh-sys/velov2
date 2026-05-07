class VelovUnifiedEbike extends HTMLElement {

  connectedCallback() {

    if (window.__VELOV_UNIFIED_EBIKE__) return;
    window.__VELOV_UNIFIED_EBIKE__ = true;

    /* =========================================================
       CORE CONFIG
    ========================================================= */

    const BRAND = {
      name: 'VELOV',
      url: 'https://www.velov.ch',
      phone: '+41762352126',
      email: 'info@velov.ch',
      image: 'https://www.velov.ch/og-image.jpg',
      city: 'Zürich',
      region: 'ZH',
      country: 'CH'
    };

    /* =========================================================
       LANGUAGE DETECTION
    ========================================================= */

    function detectLanguage() {

      const path = location.pathname.toLowerCase();

      if (path.startsWith('/en')) return 'en';
      if (path.startsWith('/fr')) return 'fr';
      if (path.startsWith('/it')) return 'it';
      if (path.startsWith('/es')) return 'es';

      return 'de';
    }

    const LANG = detectLanguage();

    /* =========================================================
       TRANSLATIONS
    ========================================================= */

    const CONTENT = {

      de: {
        locale: 'de-CH',
        hreflang: 'de-CH',

        title:
          'E-Bike Service Zürich | Mobile Velowerkstatt | VELOV',

        description:
          'Mobiler E-Bike Service und Fahrradreparatur in Zürich. Bosch, Shimano, Yamaha, Cargo Bikes und Premium Velos.',

        h1:
          'E-Bike Service Zürich – mobile Wartung für alle Marken',

        intro:
          'VELOV bietet mobilen E-Bike Service in Zürich für Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.',

        faqTitle:
          'Häufige Fragen',

        contactTitle:
          'Kontakt',

        businessName:
          'VELOV — Mobile Velowerkstatt Zürich',

        keywords: [
          'Velo Service Zürich',
          'Mobile Velowerkstatt Zürich',
          'E-Bike Service Zürich',
          'Fahrrad Reparatur Zürich',
          'Cargo Bike Service Zürich',
          'Bosch E-Bike Service Zürich'
        ]
      },

      en: {
        locale: 'en-CH',
        hreflang: 'en-CH',

        title:
          'Mobile Bike Repair Zurich | E-Bike Service | VELOV',

        description:
          'Premium mobile bike repair and e-bike service in Zurich. Bosch, Shimano, cargo bikes and high-end bicycles.',

        h1:
          'E-Bike Service Zurich – Mobile Maintenance for All Brands',

        intro:
          'VELOV provides premium mobile bike repair and e-bike service in Zurich.',

        faqTitle:
          'Frequently Asked Questions',

        contactTitle:
          'Contact',

        businessName:
          'VELOV — Mobile Bike Workshop Zurich',

        keywords: [
          'mobile bike repair Zurich',
          'bicycle mechanic Zurich',
          'e-bike service Zurich',
          'cargo bike repair Zurich'
        ]
      },

      fr: {
        locale: 'fr-CH',
        hreflang: 'fr-CH',

        title:
          'Réparation Vélo Zurich | Service E-Bike Mobile | VELOV',

        description:
          'Atelier vélo mobile premium à Zurich pour vélos électriques et vélos cargo.',

        h1:
          'Service E-Bike Zurich – Atelier Mobile',

        intro:
          'Service mobile premium pour vélos et e-bikes à Zurich.',

        faqTitle:
          'Questions fréquentes',

        contactTitle:
          'Contact',

        businessName:
          'VELOV — Atelier Vélo Mobile Zurich',

        keywords: [
          'réparation vélo Zurich',
          'atelier vélo mobile Zurich'
        ]
      },

      it: {
        locale: 'it-CH',
        hreflang: 'it-CH',

        title:
          'Riparazione Bici Zurigo | Servizio E-Bike Mobile | VELOV',

        description:
          'Officina bici mobile premium a Zurigo per e-bike e cargo bike.',

        h1:
          'Servizio E-Bike Zurigo – Officina Mobile',

        intro:
          'Servizio mobile premium per biciclette ed e-bike a Zurigo.',

        faqTitle:
          'Domande frequenti',

        contactTitle:
          'Contatti',

        businessName:
          'VELOV — Officina Bici Mobile Zurigo',

        keywords: [
          'riparazione bici Zurigo',
          'officina bici mobile Zurigo'
        ]
      },

      es: {
        locale: 'es',
        hreflang: 'es',

        title:
          'Reparación Bicicleta Zúrich | Servicio E-Bike | VELOV',

        description:
          'Taller móvil premium de bicicletas y e-bikes en Zúrich.',

        h1:
          'Servicio E-Bike Zúrich – Taller Móvil',

        intro:
          'Servicio móvil premium de bicicletas en Zúrich.',

        faqTitle:
          'Preguntas frecuentes',

        contactTitle:
          'Contacto',

        businessName:
          'VELOV — Taller de Bicicletas Móvil Zúrich',

        keywords: [
          'reparación bicicleta Zúrich',
          'taller bici móvil Zúrich'
        ]
      }
    };

    const T = CONTENT[LANG];

    /* =========================================================
       TITLE + META
    ========================================================= */

    function setMeta() {

      document.title = T.title;

      function upsertMeta(name, content, attr = 'name') {

        let el = document.head.querySelector(
          `meta[${attr}="${name}"]`
        );

        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }

        el.setAttribute('content', content);
      }

      upsertMeta(
        'description',
        T.description
      );

      upsertMeta(
        'keywords',
        T.keywords.join(', ')
      );

      upsertMeta(
        'og:title',
        T.title,
        'property'
      );

      upsertMeta(
        'og:description',
        T.description,
        'property'
      );

      upsertMeta(
        'og:type',
        'website',
        'property'
      );

      upsertMeta(
        'og:url',
        location.href,
        'property'
      );

      upsertMeta(
        'og:image',
        BRAND.image,
        'property'
      );

      upsertMeta(
        'twitter:card',
        'summary_large_image'
      );
    }

    /* =========================================================
       CANONICAL
    ========================================================= */

    function injectCanonical() {

      let canonical =
        document.querySelector(
          'link[rel="canonical"]'
        );

      if (!canonical) {
        canonical =
          document.createElement('link');

        canonical.rel = 'canonical';

        document.head.appendChild(canonical);
      }

      canonical.href =
        location.href.split('?')[0];
    }

    /* =========================================================
       HREFLANG
    ========================================================= */

    function injectHreflang() {

      const hreflangs = {

        'de-CH':
          'https://www.velov.ch/',

        'en-CH':
          'https://www.velov.ch/en/',

        'fr-CH':
          'https://www.velov.ch/fr/',

        'it-CH':
          'https://www.velov.ch/it/',

        'es':
          'https://www.velov.ch/es/'
      };

      Object.entries(hreflangs)
        .forEach(([lang, url]) => {

          if (
            document.head.querySelector(
              `link[hreflang="${lang}"]`
            )
          ) return;

          const link =
            document.createElement('link');

          link.rel = 'alternate';
          link.hreflang = lang;
          link.href = url;

          document.head.appendChild(link);
        });

      if (
        !document.head.querySelector(
          'link[hreflang="x-default"]'
        )
      ) {

        const x =
          document.createElement('link');

        x.rel = 'alternate';
        x.hreflang = 'x-default';
        x.href = 'https://www.velov.ch/';

        document.head.appendChild(x);
      }
    }

    /* =========================================================
       SCHEMA
    ========================================================= */

    function injectSchema() {

      if (
        document.getElementById(
          'velov-unified-schema'
        )
      ) return;

      const schema = [

        {
          '@context':
            'https://schema.org',

          '@type':
            'LocalBusiness',

          '@id':
            'https://www.velov.ch/#business',

          name:
            T.businessName,

          url:
            location.origin,

          image:
            BRAND.image,

          telephone:
            BRAND.phone,

          email:
            BRAND.email,

          priceRange:
            'CHF',

          address: {

            '@type':
              'PostalAddress',

            streetAddress:
              'Merkurstrasse 56',

            addressLocality:
              'Zürich',

            postalCode:
              '8032',

            addressRegion:
              'ZH',

            addressCountry:
              'CH'
          },

          geo: {

            '@type':
              'GeoCoordinates',

            latitude:
              47.3769,

            longitude:
              8.5417
          },

          areaServed: [

            'Zürich',
            'Altstetten',
            'Wiedikon',
            'Seefeld',
            'Oerlikon',
            'Winterthur',
            'Kilchberg',
            'Adliswil'
          ],

          openingHoursSpecification: [

            {
              '@type':
                'OpeningHoursSpecification',

              dayOfWeek: [

                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
              ],

              opens:
                '08:00',

              closes:
                '18:00'
            }
          ],

          aggregateRating: {

            '@type':
              'AggregateRating',

            ratingValue:
              '4.8',

            reviewCount:
              '500'
          },

          knowsLanguage: [
            'de',
            'en',
            'fr',
            'it',
            'es'
          ],

          inLanguage:
            T.locale
        },

        {
          '@context':
            'https://schema.org',

          '@type':
            'Service',

          serviceType:
            'Mobile Bike Repair',

          provider: {

            '@type':
              'LocalBusiness',

            name:
              T.businessName
          },

          areaServed:
            'Zürich',

          offers: {

            '@type':
              'Offer',

            priceCurrency:
              'CHF',

            price:
              '199'
          }
        },

        {
          '@context':
            'https://schema.org',

          '@type':
            'FAQPage',

          mainEntity: [

            {
              '@type':
                'Question',

              name:
                'Welche E-Bike Marken repariert VELOV?',

              acceptedAnswer: {

                '@type':
                  'Answer',

                text:
                  'Bosch, Shimano, Yamaha, Brose, Fazua, TQ und Bafang.'
              }
            },

            {
              '@type':
                'Question',

              name:
                'Bietet VELOV mobilen Service in Zürich an?',

              acceptedAnswer: {

                '@type':
                  'Answer',

                text:
                  'Ja, VELOV kommt direkt zu dir nach Hause oder ins Büro.'
              }
            }
          ]
        }
      ];

      const script =
        document.createElement('script');

      script.type =
        'application/ld+json';

      script.id =
        'velov-unified-schema';

      script.textContent =
        JSON.stringify(schema);

      document.head.appendChild(script);
    }

    /* =========================================================
       SEO MIRROR CONTENT
    ========================================================= */

    function injectSeoMirror() {

      if (
        document.querySelector(
          '[data-velov-seo]'
        )
      ) return;

      const div =
        document.createElement('div');

      div.setAttribute(
        'data-velov-seo',
        'true'
      );

      div.setAttribute(
        'aria-hidden',
        'true'
      );

      div.style.cssText = `
        position:absolute;
        width:1px;
        height:1px;
        overflow:hidden;
        clip:rect(0,0,0,0);
        white-space:normal;
      `;

      div.innerHTML = `
        <article lang="${LANG}">
          <header>
            <h1>${T.h1}</h1>
            <p>${T.intro}</p>
          </header>

          <section>
            <h2>Mobile Bike Repair Zürich</h2>
            <p>${T.description}</p>
          </section>

          <section>
            <h2>E-Bike Service</h2>
            <p>
              Bosch, Shimano,
              Yamaha, Brose,
              Fazua, TQ, Bafang,
              Cargo Bikes,
              Urban Bikes,
              Premium Bicycles.
            </p>
          </section>

          <section>
            <h2>${T.contactTitle}</h2>
            <p>${BRAND.phone}</p>
            <p>${BRAND.email}</p>
          </section>
        </article>
      `;

      document.body.appendChild(div);
    }

    /* =========================================================
       TRACKING
    ========================================================= */

    function pushEvent(
      name,
      params = {}
    ) {

      try {

        window.dataLayer =
          window.dataLayer || [];

        window.dataLayer.push({
          event: name,
          ...params
        });

        if (
          typeof window.gtag ===
          'function'
        ) {

          window.gtag(
            'event',
            name,
            params
          );
        }

      } catch(e){}
    }

    function bindTracking() {

      document.addEventListener(
        'click',
        function(e){

          const a =
            e.target.closest('a');

          if(!a) return;

          const href =
            a.href || '';

          if(
            href.includes('wa.me')
          ) {

            pushEvent(
              'whatsapp_click'
            );
          }

          if(
            href.startsWith('tel:')
          ) {

            pushEvent(
              'phone_click'
            );
          }

          if(
            href.startsWith('mailto:')
          ) {

            pushEvent(
              'email_click'
            );
          }

        },
        true
      );
    }

    /* =========================================================
       PERFORMANCE
    ========================================================= */

    function optimize() {

      document.documentElement
        .setAttribute(
          'lang',
          LANG
        );

      document.documentElement
        .setAttribute(
          'data-velov-lang',
          LANG
        );
    }

    /* =========================================================
       INIT
    ========================================================= */

    function init() {

      setMeta();

      injectCanonical();

      injectHreflang();

      injectSchema();

      injectSeoMirror();

      bindTracking();

      optimize();
    }

    if (
      document.readyState ===
      'loading'
    ) {

      document.addEventListener(
        'DOMContentLoaded',
        init
      );

    } else {

      init();
    }
  }
}

customElements.define(
  'velov-unified-ebike',
  VelovUnifiedEbike
);
