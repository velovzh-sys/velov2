/* ===== VELOV Shared SEO Helper ===== */
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

/* ===== VELOV Tracker ===== */
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
        pushEvent('whatsapp_click', Object.assign({link_url: href, link_text: label, component: 'locations'}, ctx));
      } else if (/^tel:/i.test(href)) {
        pushEvent('phone_click', Object.assign({link_url: href, link_text: label, component: 'locations'}, ctx));
      } else if (/^mailto:/i.test(href)) {
        pushEvent('email_click', Object.assign({link_url: href, link_text: label, component: 'locations'}, ctx));
      } else if (/booking|termin|offerte/i.test(href + ' ' + label)) {
        pushEvent('booking_click', Object.assign({link_url: href, link_text: label, component: 'locations'}, ctx));
      }
    }, {passive: true, capture: true});
  }
  window.__velovTracker = {bind: bind, pushEvent: pushEvent};
})();

/* =============================================================
 * VELOV — Locations Hub (Multilingual v2.2 · Züri-Edition)
 * Languages: DE / EN / FR / IT / ES (auto-detected from <html lang>)
 *
 * Features:
 *   - 30+ Quartiere & Gemeinden, jedes mit eigenem Witz pro Sprache
 *   - Rotating "Did you know" Züri facts (Sechseläuten, Föhn, Üetliberg etc.)
 *   - Search + filter (Stadt / Umland / All)
 *   - Live ETA + WhatsApp deep-link
 *
 * Wix install:
 *   Editor → Add (+) → Embed → Custom Element
 *   Tag: velov-locations
 * ============================================================= */

const VELOV_LOC_ZONES = [
  /* ─── STADT ZÜRICH ─── */
  { slug:'altstadt', type:'city', eta:35,
    names:{DE:'Altstadt (Kreis 1)',EN:'Old Town (Kreis 1)',FR:'Vieille Ville (Kreis 1)',IT:'Città Vecchia (Kreis 1)',ES:'Casco Antiguo (Kreis 1)'},
    jokes:{
      DE:'Plattfuss am Niederdorf-Kopfsteinpflaster? Klassiker. Wir sind schneller da als der nächste 11er.',
      EN:'Flat tyre on Niederdorf cobblestones? Classic. We arrive faster than the next tram 11.',
      FR:'Crevaison sur les pavés du Niederdorf ? Classique. On arrive avant le prochain tram 11.',
      IT:'Foratura sui sanpietrini del Niederdorf? Classico. Arriviamo prima del prossimo tram 11.',
      ES:'¿Pinchazo en los adoquines del Niederdorf? Clásico. Llegamos antes que el próximo tranvía 11.'} },
  { slug:'enge', type:'city', eta:45,
    names:{DE:'Enge (Kreis 2)',EN:'Enge (Kreis 2)',FR:'Enge (Kreis 2)',IT:'Enge (Kreis 2)',ES:'Enge (Kreis 2)'},
    jokes:{
      DE:'Auf dem Weg zum Strandbad Mythenquai wars noch flüssig. Jetzt nur dein Reifen. Same-day.',
      EN:'On the way to the Mythenquai lido it was still fluid. Now only your tyre is. Same-day.',
      FR:'Sur le chemin du Strandbad Mythenquai, l\'eau coulait. Maintenant seul votre pneu fuit.',
      IT:'Andando al lido Mythenquai era ancora liquido. Ora solo la tua gomma.',
      ES:'Camino del Strandbad Mythenquai aún corría el agua. Ahora solo tu rueda.'} },
  { slug:'wollishofen', type:'city', eta:50,
    names:{DE:'Wollishofen (Kreis 2)',EN:'Wollishofen (Kreis 2)',FR:'Wollishofen (Kreis 2)',IT:'Wollishofen (Kreis 2)',ES:'Wollishofen (Kreis 2)'},
    jokes:{
      DE:'Wo der Bahnhof Wollishofen anfängt und Adliswil noch nicht beginnt — wir kommen rüber.',
      EN:'Where Wollishofen station ends and Adliswil hasn\'t quite started — we come over.',
      FR:'Où la gare Wollishofen finit et Adliswil n\'a pas commencé — on y va.',
      IT:'Dove finisce la stazione Wollishofen e Adliswil non è cominciata — arriviamo.',
      ES:'Donde acaba la estación Wollishofen y Adliswil no empieza — vamos allá.'} },
  { slug:'wiedikon', type:'city', eta:40,
    names:{DE:'Wiedikon (Kreis 3)',EN:'Wiedikon (Kreis 3)',FR:'Wiedikon (Kreis 3)',IT:'Wiedikon (Kreis 3)',ES:'Wiedikon (Kreis 3)'},
    jokes:{
      DE:'Vom Idaplatz bis Goldbrunnen — unser Stamm-Quartier. Kalkbreite-Bewohner kennen uns beim Vornamen.',
      EN:'From Idaplatz to Goldbrunnen — our home turf. Kalkbreite residents know us by first name.',
      FR:'De l\'Idaplatz au Goldbrunnen — notre QG. Les habitants de Kalkbreite nous appellent par prénom.',
      IT:'Da Idaplatz a Goldbrunnen — la nostra zona. Alla Kalkbreite ci chiamano per nome.',
      ES:'De Idaplatz a Goldbrunnen — nuestro territorio. En Kalkbreite nos llaman por el nombre.'} },
  { slug:'aussersihl', type:'city', eta:35,
    names:{DE:'Aussersihl (Kreis 4)',EN:'Aussersihl (Kreis 4)',FR:'Aussersihl (Kreis 4)',IT:'Aussersihl (Kreis 4)',ES:'Aussersihl (Kreis 4)'},
    jokes:{
      DE:'Langstrasse-Klassiker: Notfall um 22:00, weil du noch Apéro hast. Wir kommen.',
      EN:'Langstrasse classic: emergency at 10 pm because aperitivo is still on. We come.',
      FR:'Classique Langstrasse : urgence à 22h parce que l\'apéro continue. On arrive.',
      IT:'Classico Langstrasse: emergenza alle 22 perché l\'aperitivo continua.',
      ES:'Clásico de la Langstrasse: urgencia a las 22:00 porque el apéro sigue. Vamos.'} },
  { slug:'industriequartier', type:'city', eta:35,
    names:{DE:'Industriequartier (Kreis 5)',EN:'Industrial District (Kreis 5)',FR:'Quartier industriel (Kreis 5)',IT:'Quartiere industriale (Kreis 5)',ES:'Distrito industrial (Kreis 5)'},
    jokes:{
      DE:'Prime Tower, Hardbrücke, Frau Gerolds Garten. Pendler-Velo gibt den Geist auf? Velov übernimmt.',
      EN:'Prime Tower, Hardbrücke, Frau Gerolds Garten. Commuter bike giving up? Velov handles it.',
      FR:'Prime Tower, Hardbrücke, Frau Gerolds Garten. Vélo qui rend l\'âme ? Velov gère.',
      IT:'Prime Tower, Hardbrücke, Frau Gerolds Garten. Bici da pendolare in agonia? Ci pensa Velov.',
      ES:'Prime Tower, Hardbrücke, Frau Gerolds Garten. ¿Bici de pendular agotada? Velov se encarga.'} },
  { slug:'unterstrass', type:'city', eta:45,
    names:{DE:'Unterstrass (Kreis 6)',EN:'Unterstrass (Kreis 6)',FR:'Unterstrass (Kreis 6)',IT:'Unterstrass (Kreis 6)',ES:'Unterstrass (Kreis 6)'},
    jokes:{
      DE:'ETH-Studierende mit kaputter Schaltung — vor der Prüfung gar keine Zeit. 30 Min und du bist startklar.',
      EN:'ETH student with broken gears — no time before exams. 30 min and you\'re ready.',
      FR:'Étudiant EPF avec vitesses cassées — pas de temps avant l\'examen. 30 min et c\'est réglé.',
      IT:'Studente ETH con cambio rotto — niente tempo prima dell\'esame. 30 min e via.',
      ES:'Estudiante de la ETH con cambios rotos — sin tiempo antes del examen. 30 min y listo.'} },
  { slug:'oberstrass', type:'city', eta:45,
    names:{DE:'Oberstrass (Kreis 6)',EN:'Oberstrass (Kreis 6)',FR:'Oberstrass (Kreis 6)',IT:'Oberstrass (Kreis 6)',ES:'Oberstrass (Kreis 6)'},
    jokes:{
      DE:'Universität Irchel rauf, Kette runter. Wir richten sie wieder, im Sitzen.',
      EN:'Up to Irchel, chain dropped. We put it back. While seated.',
      FR:'Montée à Irchel, chaîne tombée. On la remet. Assis.',
      IT:'Salita all\'Irchel, catena giù. La rimettiamo, da seduti.',
      ES:'Subida al Irchel, cadena caída. La ponemos otra vez. Sentados.'} },
  { slug:'hottingen', type:'city', eta:50,
    names:{DE:'Hottingen (Kreis 7)',EN:'Hottingen (Kreis 7)',FR:'Hottingen (Kreis 7)',IT:'Hottingen (Kreis 7)',ES:'Hottingen (Kreis 7)'},
    jokes:{
      DE:'Kreuzplatz-Bezirk, viele E-Bikes. Mechanisch alles bei uns — Akku-Diagnose beim Markenhändler.',
      EN:'Kreuzplatz area, lots of e-bikes. All mechanics with us — battery diagnostics at the dealer.',
      FR:'Zone Kreuzplatz, beaucoup de e-bikes. Toute la mécanique chez nous — batterie chez le concessionnaire.',
      IT:'Zona Kreuzplatz, molte e-bike. Tutta la meccanica con noi — diagnosi batteria dal concessionario.',
      ES:'Zona Kreuzplatz, muchas e-bikes. Toda la mecánica con nosotros — diagnóstico de batería en el concesionario.'} },
  { slug:'hirslanden', type:'city', eta:50,
    names:{DE:'Hirslanden (Kreis 7)',EN:'Hirslanden (Kreis 7)',FR:'Hirslanden (Kreis 7)',IT:'Hirslanden (Kreis 7)',ES:'Hirslanden (Kreis 7)'},
    jokes:{
      DE:'Klinik-Quartier. Wir flicken Velos, nicht Knochen — aber genauso schnell.',
      EN:'Hospital district. We fix bikes, not bones — but just as quickly.',
      FR:'Quartier de la clinique. On répare les vélos, pas les os — aussi vite.',
      IT:'Zona della clinica. Ripariamo bici, non ossa — altrettanto veloci.',
      ES:'Zona de la clínica. Arreglamos bicis, no huesos — igual de rápido.'} },
  { slug:'witikon', type:'city', eta:60,
    names:{DE:'Witikon (Kreis 7)',EN:'Witikon (Kreis 7)',FR:'Witikon (Kreis 7)',IT:'Witikon (Kreis 7)',ES:'Witikon (Kreis 7)'},
    jokes:{
      DE:'Oben am Hügel. E-Bike Akku leer auf der Forch? Wir sammeln dich ein.',
      EN:'Up on the hill. E-bike battery dead near Forch? We pick you up.',
      FR:'En haut. Batterie morte vers Forch ? On vient.',
      IT:'In alto. Batteria morta verso Forch? Veniamo.',
      ES:'Arriba en la colina. ¿Batería muerta cerca de Forch? Vamos.'} },
  { slug:'seefeld', type:'city', eta:40,
    names:{DE:'Seefeld (Kreis 8)',EN:'Seefeld (Kreis 8)',FR:'Seefeld (Kreis 8)',IT:'Seefeld (Kreis 8)',ES:'Seefeld (Kreis 8)'},
    jokes:{
      DE:'Schwumm im See, Espresso am Bürkliplatz, Plattfuss am Bellevue. Wir machen Schritt drei rückgängig.',
      EN:'Swim in the lake, espresso at Bürkliplatz, flat tyre at Bellevue. We undo step three.',
      FR:'Baignade au lac, espresso au Bürkliplatz, crevaison au Bellevue. On annule l\'étape trois.',
      IT:'Bagno nel lago, caffè al Bürkliplatz, foratura al Bellevue. Annulliamo il passo tre.',
      ES:'Baño en el lago, café en Bürkliplatz, pinchazo en Bellevue. Deshacemos el paso tres.'} },
  { slug:'riesbach', type:'city', eta:45,
    names:{DE:'Riesbach (Kreis 8)',EN:'Riesbach (Kreis 8)',FR:'Riesbach (Kreis 8)',IT:'Riesbach (Kreis 8)',ES:'Riesbach (Kreis 8)'},
    jokes:{
      DE:'Tiefenbrunnen-Pendler, hochpreisige Velos, anspruchsvoll. Genau unser Ding.',
      EN:'Tiefenbrunnen commuters, premium bikes, demanding. Exactly our turf.',
      FR:'Pendulaires Tiefenbrunnen, vélos haut de gamme, exigeants. Notre terrain.',
      IT:'Pendolari Tiefenbrunnen, bici di alta gamma, esigenti. Roba nostra.',
      ES:'Pendulares de Tiefenbrunnen, bicis premium, exigentes. Nuestro terreno.'} },
  { slug:'altstetten', type:'city', eta:50,
    names:{DE:'Altstetten (Kreis 9)',EN:'Altstetten (Kreis 9)',FR:'Altstetten (Kreis 9)',IT:'Altstetten (Kreis 9)',ES:'Altstetten (Kreis 9)'},
    jokes:{
      DE:'Kreis 9 wächst schneller als FCZ-Tabellenplätze. Wir wachsen mit — auch im Letzigrund.',
      EN:'Kreis 9 grows faster than FCZ table positions. We grow with it — even at Letzigrund.',
      FR:'Kreis 9 grandit plus vite que les places du FCZ. On grandit aussi — jusqu\'au Letzigrund.',
      IT:'Kreis 9 cresce più dei piazzamenti del FCZ. Cresciamo con lui — anche al Letzigrund.',
      ES:'Kreis 9 crece más rápido que las posiciones del FCZ. Nosotros también — hasta el Letzigrund.'} },
  { slug:'albisrieden', type:'city', eta:50,
    names:{DE:'Albisrieden (Kreis 9)',EN:'Albisrieden (Kreis 9)',FR:'Albisrieden (Kreis 9)',IT:'Albisrieden (Kreis 9)',ES:'Albisrieden (Kreis 9)'},
    jokes:{
      DE:'Lindenplatz-Familien-Cargo mit Kindern an Bord. Wir reparieren bevor die Quengelei losgeht.',
      EN:'Lindenplatz family cargo with kids onboard. We fix it before the whining starts.',
      FR:'Cargo familial Lindenplatz avec enfants. On répare avant le concert de pleurs.',
      IT:'Cargo familiare Lindenplatz con bambini a bordo. Ripariamo prima dei pianti.',
      ES:'Cargo familiar Lindenplatz con niños a bordo. Reparamos antes de que empiecen los lloros.'} },
  { slug:'wipkingen', type:'city', eta:50,
    names:{DE:'Wipkingen (Kreis 10)',EN:'Wipkingen (Kreis 10)',FR:'Wipkingen (Kreis 10)',IT:'Wipkingen (Kreis 10)',ES:'Wipkingen (Kreis 10)'},
    jokes:{
      DE:'Bahnhof Wipkingen, fünf Minuten von der Hardbrücke. Klassisches Notfall-Rendezvous.',
      EN:'Wipkingen station, five minutes from Hardbrücke. Classic emergency rendezvous.',
      FR:'Gare Wipkingen, cinq minutes de la Hardbrücke. Lieu d\'urgence classique.',
      IT:'Stazione Wipkingen, cinque minuti dalla Hardbrücke. Classico ritrovo d\'emergenza.',
      ES:'Estación Wipkingen, cinco minutos de la Hardbrücke. Punto clásico de urgencias.'} },
  { slug:'hoengg', type:'city', eta:55,
    names:{DE:'Höngg (Kreis 10)',EN:'Höngg (Kreis 10)',FR:'Höngg (Kreis 10)',IT:'Höngg (Kreis 10)',ES:'Höngg (Kreis 10)'},
    jokes:{
      DE:'Werdinsel im Sommer, Höngg-Hügel im Winter. Beides braucht ab und zu neue Bremsbeläge.',
      EN:'Werdinsel in summer, Höngg hill in winter. Both occasionally need new brake pads.',
      FR:'Werdinsel l\'été, colline de Höngg l\'hiver. Les deux veulent parfois de nouvelles plaquettes.',
      IT:'Werdinsel d\'estate, collina di Höngg d\'inverno. Entrambe a volte chiedono pastiglie nuove.',
      ES:'Werdinsel en verano, colina de Höngg en invierno. Ambas piden pastillas nuevas a veces.'} },
  { slug:'affoltern', type:'city', eta:55,
    names:{DE:'Affoltern (Kreis 11)',EN:'Affoltern (Kreis 11)',FR:'Affoltern (Kreis 11)',IT:'Affoltern (Kreis 11)',ES:'Affoltern (Kreis 11)'},
    jokes:{
      DE:'Neue Wohnsiedlungen, neue Veloräume. Genossenschafts-Aktionstage hier? Stark im Aufbau.',
      EN:'New estates, new bike rooms. Co-op service days here? Strong build-up.',
      FR:'Nouveaux ensembles, nouveaux locaux à vélos. Journées coopératives en plein essor.',
      IT:'Nuovi complessi, nuove sale bici. Giornate cooperative in forte crescita.',
      ES:'Nuevos bloques, nuevas salas de bicis. Jornadas en cooperativas en pleno auge.'} },
  { slug:'oerlikon', type:'city', eta:50,
    names:{DE:'Oerlikon (Kreis 11)',EN:'Oerlikon (Kreis 11)',FR:'Oerlikon (Kreis 11)',IT:'Oerlikon (Kreis 11)',ES:'Oerlikon (Kreis 11)'},
    jokes:{
      DE:'Hallenstadion-Konzert, ZSC-Heimspiel, Messe — wir sind schneller als sich die Tramendstation füllt.',
      EN:'Hallenstadion concert, ZSC home game, Messe — we beat the tram terminus crowds.',
      FR:'Concert au Hallenstadion, match du ZSC, foire — on bat la foule du terminus.',
      IT:'Concerto Hallenstadion, partita ZSC, fiera — battiamo la folla al capolinea.',
      ES:'Concierto en el Hallenstadion, partido del ZSC, feria — ganamos a la multitud del terminal.'} },
  { slug:'seebach', type:'city', eta:55,
    names:{DE:'Seebach (Kreis 11)',EN:'Seebach (Kreis 11)',FR:'Seebach (Kreis 11)',IT:'Seebach (Kreis 11)',ES:'Seebach (Kreis 11)'},
    jokes:{
      DE:'Wachstumsquartier mit Familien-Velos. E-Bike-Wartung vor dem Schulwochen-Stress: beliebt.',
      EN:'Growing area with family bikes. E-bike service before the school-week chaos: popular.',
      FR:'Quartier en croissance, vélos familiaux. Service e-bike avant le chaos scolaire — demandé.',
      IT:'Zona in crescita, bici di famiglia. Servizio e-bike prima del caos scolastico — richiesto.',
      ES:'Zona en crecimiento, bicis familiares. Servicio e-bike antes del caos escolar — popular.'} },
  { slug:'schwamendingen', type:'city', eta:55,
    names:{DE:'Schwamendingen (Kreis 12)',EN:'Schwamendingen (Kreis 12)',FR:'Schwamendingen (Kreis 12)',IT:'Schwamendingen (Kreis 12)',ES:'Schwamendingen (Kreis 12)'},
    jokes:{
      DE:'Grosse Genossenschafts-Siedlungen, viele Velos. Aktionstag = 8 Velos pro Vormittag.',
      EN:'Large co-op estates, lots of bikes. Service day = 8 bikes per morning.',
      FR:'Grands ensembles, beaucoup de vélos. Journée de service = 8 vélos le matin.',
      IT:'Grandi cooperative, molte bici. Giornata di servizio = 8 bici per mattinata.',
      ES:'Grandes cooperativas, muchas bicis. Jornada de servicio = 8 bicis por mañana.'} },

  /* ─── UMLAND ─── */
  { slug:'schlieren', type:'umland', eta:60,
    names:{DE:'Schlieren',EN:'Schlieren',FR:'Schlieren',IT:'Schlieren',ES:'Schlieren'},
    jokes:{
      DE:'Westlich der Stadt — Same-day möglich. Anfahrt-Aufschlag CHF 20.',
      EN:'West of the city — same-day possible. Travel surcharge CHF 20.',
      FR:'À l\'ouest — le jour même possible. Supplément CHF 20.',
      IT:'A ovest — stesso giorno possibile. Supplemento CHF 20.',
      ES:'Al oeste — mismo día posible. Recargo CHF 20.'} },
  { slug:'kilchberg', type:'umland', eta:65,
    names:{DE:'Kilchberg',EN:'Kilchberg',FR:'Kilchberg',IT:'Kilchberg',ES:'Kilchberg'},
    jokes:{
      DE:'Heimat von Lindt-Schoggi und ordentlichen Wohnvierteln. Wir bringen Werkzeug, kein Schoggi.',
      EN:'Home of Lindt chocolate and tidy neighbourhoods. We bring tools, not chocolate.',
      FR:'Patrie du chocolat Lindt et de quartiers propres. On apporte des outils, pas du chocolat.',
      IT:'Patria del cioccolato Lindt e di quartieri ordinati. Portiamo attrezzi, non cioccolato.',
      ES:'Cuna del chocolate Lindt y barrios ordenados. Traemos herramientas, no chocolate.'} },
  { slug:'zollikon', type:'umland', eta:60,
    names:{DE:'Zollikon',EN:'Zollikon',FR:'Zollikon',IT:'Zollikon',ES:'Zollikon'},
    jokes:{
      DE:'Goldküste-Adresse, hochwertige Velos. Hausbesuch im Vorgarten? Selbstverständlich.',
      EN:'Gold Coast address, premium bikes. House call in the front garden? Of course.',
      FR:'Adresse Côte d\'Or, vélos haut de gamme. Visite au jardin ? Évidemment.',
      IT:'Indirizzo Costa d\'Oro, bici pregiate. Visita in giardino? Ovvio.',
      ES:'Dirección Costa de Oro, bicis premium. ¿Visita en el jardín? Por supuesto.'} },
  { slug:'horgen', type:'umland', eta:80,
    names:{DE:'Horgen',EN:'Horgen',FR:'Horgen',IT:'Horgen',ES:'Horgen'},
    jokes:{
      DE:'Südlich am See. Anfahrt etwas länger — aber wir kommen, wenn der Termin steht.',
      EN:'South by the lake. Slightly longer travel — but we come if the slot is set.',
      FR:'Au sud, près du lac. Trajet un peu plus long — mais on vient si le créneau est pris.',
      IT:'A sud sul lago. Trasferta un po\' più lunga — veniamo se l\'orario è preso.',
      ES:'Al sur junto al lago. Trayecto algo más largo — vamos si la cita está fija.'} },
  { slug:'thalwil', type:'umland', eta:75,
    names:{DE:'Thalwil',EN:'Thalwil',FR:'Thalwil',IT:'Thalwil',ES:'Thalwil'},
    jokes:{
      DE:'Pendler-Hochburg am Zürichsee. Wartung Samstag-Morgen, danach freier Tag. Klingt fair.',
      EN:'Commuter hub on Lake Zürich. Service Saturday morning, free day after. Fair deal.',
      FR:'Pôle de pendulaires sur le lac. Entretien samedi matin, journée libre après. Deal correct.',
      IT:'Roccaforte di pendolari sul lago. Manutenzione sabato mattina, poi giornata libera.',
      ES:'Bastión de pendulares en el lago. Servicio sábado mañana, día libre después. Justo.'} },
  { slug:'opfikon', type:'umland', eta:65,
    names:{DE:'Opfikon / Glattpark',EN:'Opfikon / Glattpark',FR:'Opfikon / Glattpark',IT:'Opfikon / Glattpark',ES:'Opfikon / Glattpark'},
    jokes:{
      DE:'Glattpark — moderne Wohnungen, viele E-Bikes. Wir füllen die Veloräume mit servicierten.',
      EN:'Glattpark — modern flats, lots of e-bikes. We refill the bike rooms with serviced ones.',
      FR:'Glattpark — appartements modernes, beaucoup de e-bikes. On remplit les locaux de vélos révisés.',
      IT:'Glattpark — appartamenti moderni, molte e-bike. Riempiamo le sale di mezzi revisionati.',
      ES:'Glattpark — pisos modernos, muchas e-bikes. Llenamos las salas con bicis revisadas.'} },
  { slug:'glattbrugg', type:'umland', eta:70,
    names:{DE:'Glattbrugg',EN:'Glattbrugg',FR:'Glattbrugg',IT:'Glattbrugg',ES:'Glattbrugg'},
    jokes:{
      DE:'Flughafen-Nähe. Falls dein Velo am Flughafen-Bahnhof streikt: ja, auch dort.',
      EN:'Near the airport. If your bike strikes at the airport station: yes, there too.',
      FR:'Près de l\'aéroport. Si votre vélo lâche à la gare aéroport : oui, on y va.',
      IT:'Vicino all\'aeroporto. Se la tua bici molla alla stazione aeroporto: sì, ci veniamo.',
      ES:'Cerca del aeropuerto. Si tu bici se rinde en la estación del aeropuerto: sí, también vamos.'} },
  { slug:'wallisellen', type:'umland', eta:70,
    names:{DE:'Wallisellen',EN:'Wallisellen',FR:'Wallisellen',IT:'Wallisellen',ES:'Wallisellen'},
    jokes:{
      DE:'Glatt-Center und Bürotürme. Mittagspausen-Reparatur möglich.',
      EN:'Glatt-Center and office towers. Lunch-break repair possible.',
      FR:'Glatt-Center et bureaux. Réparation pause-déjeuner possible.',
      IT:'Glatt-Center e uffici. Riparazione in pausa pranzo possibile.',
      ES:'Glatt-Center y oficinas. Reparación en la pausa de la comida posible.'} },
  { slug:'duebendorf', type:'umland', eta:70,
    names:{DE:'Dübendorf',EN:'Dübendorf',FR:'Dübendorf',IT:'Dübendorf',ES:'Dübendorf'},
    jokes:{
      DE:'Innovationspark und Familien. Beide brauchen funktionierende Velos.',
      EN:'Innovation park and families. Both need bikes that work.',
      FR:'Parc d\'innovation et familles. Tous deux ont besoin de vélos qui roulent.',
      IT:'Parco innovazione e famiglie. Entrambi hanno bisogno di bici funzionanti.',
      ES:'Parque de innovación y familias. Ambos necesitan bicis que funcionen.'} },
  { slug:'ruemlang', type:'umland', eta:70,
    names:{DE:'Rümlang',EN:'Rümlang',FR:'Rümlang',IT:'Rümlang',ES:'Rümlang'},
    jokes:{
      DE:'Nördlich von Zürich — feste Termine bevorzugt. Same-day nach Absprache.',
      EN:'North of Zürich — fixed slots preferred. Same-day on request.',
      FR:'Au nord de Zurich — créneaux fixes préférés. Le jour même sur demande.',
      IT:'A nord di Zurigo — slot fissi preferiti. Stesso giorno su richiesta.',
      ES:'Al norte de Zúrich — preferimos cita fija. Mismo día bajo demanda.'} },
  { slug:'adliswil', type:'umland', eta:65,
    names:{DE:'Adliswil',EN:'Adliswil',FR:'Adliswil',IT:'Adliswil',ES:'Adliswil'},
    jokes:{
      DE:'Sihltal-Pendler, Familien, viele Hügel. Bremsen-Service ist hier ein Klassiker.',
      EN:'Sihltal commuters, families, many hills. Brake service is the local classic.',
      FR:'Pendulaires Sihltal, familles, collines. Le service freins est le classique local.',
      IT:'Pendolari Sihltal, famiglie, colline. Il servizio freni è il classico.',
      ES:'Pendulares de Sihltal, familias, colinas. El servicio de frenos es el clásico.'} }
];

const VELOV_LOC_I18N = {
  DE: {
    seoH1:'VELOV Standorte Zürich – mobile Velowerkstatt in allen Quartieren',
    seoIntro:'VELOV bedient alle 12 Zürcher Stadtkreise und die Agglomeration. Wir sind mobil – kein fester Standort, sondern direkt bei dir. Hier eine Übersicht unserer Service-Quartiere mit ehrlichen Reaktionszeiten.',
    heroH1:'Mobile Veloreparatur — in ganz Züri & Umland',
    heroP:'VELOV kommt zu dir. 30+ Quartiere & Gemeinden. Same-day-Buchung. 30–90 Min Reaktionszeit – meistens.',
    heroSub:'Stadt Zürich · Schlieren · Kilchberg · Zollikon · Opfikon · Wallisellen · Dübendorf · Adliswil · und mehr',
    didYouKnowLabel:'🎲 Züri-Wahrheit',
    didYouKnow:[
      'Auf der Bahnhofstrasse Velo zu fahren ist wie Yoga: langsam atmen, niemandem reinfahren.',
      'Sechseläuten 2025: der Böögg explodierte nach 50 Min. Ein Velov-Plattfuss-Service ist schneller.',
      'Der Üetliberg ist 871 m hoch. Mit kaputter Schaltung fühlt er sich an wie 2871 m.',
      'Der Föhn drückt im Winter über 100 km/h auf den Üetliberg. Schuld an deinem Plattfuss? Vielleicht.',
      '"Das Tram fährt eh in 4 Minuten" — sagt jeder Zürcher, immer. VELOV: meistens schneller.',
      'Limmatschwumm 2024: 23\'000 Teilnehmende. Wir hoffen, niemand musste dabei sein Velo flicken.',
      'Im Kreis 4 fahren mehr Velos als Autos. Wir sind dort fast Stammgäste.',
      'Goldküste oder Pfnüselküste — wir kommen zu beiden Ufern.'
    ],
    pickerTitle:'📍 Wähl dein Quartier — sieh, wann wir da sind',
    pickerLead:'Klick auf dein Quartier oder such direkt. Du kriegst eine ehrliche Reaktionszeit + direkte WhatsApp-Buchung. Probier verschiedene aus – jedes hat seine eigene Geschichte.',
    searchPh:'z. B. Oerlikon, Wiedikon, Schlieren …',
    chipAll:'Alle',
    chipCity:'Stadt Zürich',
    chipUmland:'Umland',
    resultLead:'Geschätzte Reaktionszeit ab Anruf:',
    resultMins:'Minuten',
    ctaHere:'Jetzt in',
    ctaBookSuffix:'buchen →',
    waMsgFn:(n)=>`Hi VELOV, ich bin in ${n} und brauche eine Velo-Reparatur. Wann kannst du da sein?`,
    servicesH2:'Unsere Services — überall gleicher Preis',
    services:[
      {emoji:'🛞',name:'Platten Reparatur',price:'99',time:'30 Min'},
      {emoji:'🔧',name:'Komplette Wartung',price:'149',time:'60 Min'},
      {emoji:'🆘',name:'Notfall-Service',price:'129',time:'30–60 Min'},
      {emoji:'⚙️',name:'E-Bike Service',price:'229',time:'60–90 Min'}
    ],
    beneH2:'Warum Zürich uns wählt',
    benefits:[
      {emoji:'⚡',t:'Blitzschnell',p:'Oft in unter 1 Stunde vor Ort. Same-day-Buchung. 24h erreichbar.'},
      {emoji:'📍',t:'Mobile Service',p:'Wir kommen zu dir. Keine Ladenöffnungszeiten. Keine Transportkosten.'},
      {emoji:'💯',t:'Profi-Mechaniker',p:'500+ Google Reviews · 4.8 Sterne. Alle Velo-Typen, alle Marken.'},
      {emoji:'💰',t:'Festpreis',p:'Preis bekannt vor der Buchung. Keine Überraschungen. TWINT, Bar, Karte.'}
    ],
    finalH2:'Bereit fürs Flicken? Same-day verfügbar.',
    finalP:'Wir kommen zu dir — ganz Züri und Umland.',
    finalBtn:'→ Jetzt per WhatsApp buchen',
    finalCallPrefix:'oder ruf an:',
    waGeneric:'Hi VELOV, ich brauche eine Reparatur in Zürich. Kannst du mir helfen?'
  },

  EN: {
    seoH1:'VELOV Locations Zürich — mobile bike workshop across all districts',
    seoIntro:'VELOV covers all 12 Zürich city districts and the surrounding region. We\'re mobile — no shop, we come straight to you. Here\'s an overview of our service area with honest reaction times.',
    heroH1:'Mobile bike repair — all of Zürich & beyond',
    heroP:'VELOV comes to you. 30+ neighbourhoods & towns. Same-day booking. 30–90 min reaction time — usually.',
    heroSub:'Zürich city · Schlieren · Kilchberg · Zollikon · Opfikon · Wallisellen · Dübendorf · Adliswil · and more',
    didYouKnowLabel:'🎲 Zürich truth',
    didYouKnow:[
      'Cycling on Bahnhofstrasse is like yoga: breathe slowly, don\'t crash into anyone.',
      'Sechseläuten 2025: the Böögg\'s head exploded after 50 minutes. A Velov flat repair is faster.',
      'The Üetliberg is 871 m high. With broken gears it feels like 2,871 m.',
      'In winter the Föhn wind hits the Üetliberg at 100+ km/h. To blame for your flat? Maybe.',
      '"Tram\'s coming in 4 min anyway" — every Zürcher, always. VELOV: usually faster.',
      'Limmatschwumm 2024: 23,000 swimmers. We hope no one had to fix their bike during it.',
      'In Kreis 4 there are more bikes than cars. We\'re basically regulars.',
      'Goldküste or Pfnüselküste — we come to both shores.'
    ],
    pickerTitle:'📍 Pick your area — see when we\'ll be there',
    pickerLead:'Click your neighbourhood or search directly. You get an honest reaction time + direct WhatsApp booking. Try a few — each has its own story.',
    searchPh:'e.g. Oerlikon, Wiedikon, Schlieren …',
    chipAll:'All',
    chipCity:'Zürich city',
    chipUmland:'Surroundings',
    resultLead:'Estimated reaction time from your call:',
    resultMins:'minutes',
    ctaHere:'Book in',
    ctaBookSuffix:'now →',
    waMsgFn:(n)=>`Hi VELOV, I am in ${n} and need a bike repair. When can you be here?`,
    servicesH2:'Our services — same price everywhere',
    services:[
      {emoji:'🛞',name:'Flat repair',price:'99',time:'30 min'},
      {emoji:'🔧',name:'Full service',price:'149',time:'60 min'},
      {emoji:'🆘',name:'Emergency',price:'129',time:'30–60 min'},
      {emoji:'⚙️',name:'E-bike service',price:'229',time:'60–90 min'}
    ],
    beneH2:'Why Zürich picks us',
    benefits:[
      {emoji:'⚡',t:'Lightning fast',p:'Often under 1 hour on-site. Same-day booking. 24 h reachable.'},
      {emoji:'📍',t:'Mobile service',p:'We come to you. No shop hours. No transport costs.'},
      {emoji:'💯',t:'Pro mechanics',p:'500+ Google reviews · 4.8 stars. Every bike type, every brand.'},
      {emoji:'💰',t:'Fixed price',p:'Price known before booking. No surprises. TWINT, cash, card.'}
    ],
    finalH2:'Ready to fix? Same-day available.',
    finalP:'We come to you — all of Zürich and surroundings.',
    finalBtn:'→ Book on WhatsApp',
    finalCallPrefix:'or call:',
    waGeneric:'Hi VELOV, I need a bike repair in Zürich. Can you help?'
  },

  FR: {
    seoH1:'Sites VELOV Zurich — atelier vélo mobile dans tous les quartiers',
    seoIntro:'VELOV couvre les 12 arrondissements de Zurich et l\'agglomération. Nous sommes mobiles — pas de boutique, nous venons à vous. Voici notre zone de service avec des temps d\'arrivée honnêtes.',
    heroH1:'Réparation vélo mobile — tout Zurich & au-delà',
    heroP:'VELOV vient à vous. 30+ quartiers & communes. Réservation le jour même. 30–90 min — en général.',
    heroSub:'Ville de Zurich · Schlieren · Kilchberg · Zollikon · Opfikon · Wallisellen · Dübendorf · Adliswil · et plus',
    didYouKnowLabel:'🎲 Vérité zurichoise',
    didYouKnow:[
      'Faire du vélo sur la Bahnhofstrasse, c\'est du yoga : respirer doucement, ne percuter personne.',
      'Sechseläuten 2025 : la tête du Böögg a explosé après 50 minutes. Une crevaison Velov, plus rapide.',
      'L\'Üetliberg fait 871 m. Avec un dérailleur cassé, on dirait 2871 m.',
      'En hiver, le Föhn dépasse 100 km/h sur l\'Üetliberg. Coupable de votre crevaison ? Peut-être.',
      '« Le tram arrive dans 4 min de toute façon » — chaque Zurichois, toujours. VELOV : souvent plus vite.',
      'Limmatschwumm 2024 : 23 000 nageurs. On espère qu\'aucun n\'a dû réparer son vélo pendant.',
      'Dans le Kreis 4, il y a plus de vélos que de voitures. On y est presque chez nous.',
      'Goldküste ou Pfnüselküste — on dessert les deux rives.'
    ],
    pickerTitle:'📍 Choisissez votre quartier — voyez quand on arrive',
    pickerLead:'Cliquez sur votre quartier ou cherchez. Temps de réaction honnête + réservation WhatsApp directe. Essayez-en plusieurs — chacun a son histoire.',
    searchPh:'ex. Oerlikon, Wiedikon, Schlieren …',
    chipAll:'Tous',
    chipCity:'Ville Zurich',
    chipUmland:'Environs',
    resultLead:'Temps de réaction estimé après votre appel :',
    resultMins:'minutes',
    ctaHere:'Réserver à',
    ctaBookSuffix:'maintenant →',
    waMsgFn:(n)=>`Bonjour VELOV, je suis à ${n} et j\'ai besoin d\'une réparation vélo. Quand pouvez-vous venir ?`,
    servicesH2:'Nos services — même prix partout',
    services:[
      {emoji:'🛞',name:'Réparation crevaison',price:'99',time:'30 min'},
      {emoji:'🔧',name:'Service complet',price:'149',time:'60 min'},
      {emoji:'🆘',name:'Urgence',price:'129',time:'30–60 min'},
      {emoji:'⚙️',name:'Service e-bike',price:'229',time:'60–90 min'}
    ],
    beneH2:'Pourquoi Zurich nous choisit',
    benefits:[
      {emoji:'⚡',t:'Ultra-rapide',p:'Souvent moins d\'1 heure sur place. Réservation le jour même. Joignables 24 h.'},
      {emoji:'📍',t:'Service mobile',p:'On vient à vous. Pas d\'horaires de magasin. Pas de frais de transport.'},
      {emoji:'💯',t:'Mécanos pros',p:'500+ avis Google · 4.8 étoiles. Tous types de vélos, toutes marques.'},
      {emoji:'💰',t:'Prix fixe',p:'Prix connu avant réservation. Pas de surprise. TWINT, cash, carte.'}
    ],
    finalH2:'Prêt à réparer ? Le jour même disponible.',
    finalP:'On vient à vous — tout Zurich et environs.',
    finalBtn:'→ Réserver sur WhatsApp',
    finalCallPrefix:'ou appelez :',
    waGeneric:'Bonjour VELOV, j\'ai besoin d\'une réparation vélo à Zurich. Pouvez-vous m\'aider ?'
  },

  IT: {
    seoH1:'Sedi VELOV Zurigo — officina mobile in tutti i quartieri',
    seoIntro:'VELOV copre tutti i 12 quartieri di Zurigo e l\'agglomerato. Siamo mobili — niente negozio, veniamo da te. Ecco la nostra zona di servizio con tempi onesti.',
    heroH1:'Riparazione bici mobile — tutta Zurigo & dintorni',
    heroP:'VELOV viene da te. 30+ quartieri & comuni. Prenotazione in giornata. 30–90 min di reazione — di solito.',
    heroSub:'Città di Zurigo · Schlieren · Kilchberg · Zollikon · Opfikon · Wallisellen · Dübendorf · Adliswil · e altri',
    didYouKnowLabel:'🎲 Verità zurighese',
    didYouKnow:[
      'Andare in bici sulla Bahnhofstrasse è come yoga: respirare piano, non investire nessuno.',
      'Sechseläuten 2025: la testa del Böögg è esplosa dopo 50 min. Una foratura Velov è più rapida.',
      'L\'Üetliberg è 871 m. Con il cambio rotto sembrano 2871 m.',
      'D\'inverno il Föhn supera i 100 km/h sull\'Üetliberg. Colpa della tua foratura? Forse.',
      '"Il tram passa fra 4 min comunque" — ogni zurighese, sempre. VELOV: di solito più veloce.',
      'Limmatschwumm 2024: 23.000 nuotatori. Speriamo nessuno abbia dovuto riparare la bici durante.',
      'Nel Kreis 4 ci sono più bici che auto. Siamo praticamente clienti abituali.',
      'Goldküste o Pfnüselküste — copriamo entrambe le sponde.'
    ],
    pickerTitle:'📍 Scegli il quartiere — vedi quando arriviamo',
    pickerLead:'Clicca sul quartiere o cerca. Tempo onesto + prenotazione WhatsApp diretta. Provane diversi — ognuno ha la sua storia.',
    searchPh:'es. Oerlikon, Wiedikon, Schlieren …',
    chipAll:'Tutti',
    chipCity:'Città Zurigo',
    chipUmland:'Dintorni',
    resultLead:'Tempo di reazione stimato dalla chiamata:',
    resultMins:'minuti',
    ctaHere:'Prenota a',
    ctaBookSuffix:'subito →',
    waMsgFn:(n)=>`Ciao VELOV, sono a ${n} e ho bisogno di una riparazione. Quando puoi arrivare?`,
    servicesH2:'I nostri servizi — stesso prezzo ovunque',
    services:[
      {emoji:'🛞',name:'Riparazione foratura',price:'99',time:'30 min'},
      {emoji:'🔧',name:'Servizio completo',price:'149',time:'60 min'},
      {emoji:'🆘',name:'Emergenza',price:'129',time:'30–60 min'},
      {emoji:'⚙️',name:'Servizio e-bike',price:'229',time:'60–90 min'}
    ],
    beneH2:'Perché Zurigo ci sceglie',
    benefits:[
      {emoji:'⚡',t:'Velocissimi',p:'Spesso meno di 1 ora sul posto. Prenotazione in giornata. Reperibili 24 h.'},
      {emoji:'📍',t:'Servizio mobile',p:'Veniamo da te. Niente orari del negozio. Niente costi di trasporto.'},
      {emoji:'💯',t:'Meccanici pro',p:'500+ recensioni Google · 4.8 stelle. Ogni tipo di bici, ogni marca.'},
      {emoji:'💰',t:'Prezzo fisso',p:'Prezzo noto prima della prenotazione. TWINT, contanti, carta.'}
    ],
    finalH2:'Pronto a riparare? Disponibili in giornata.',
    finalP:'Veniamo da te — tutta Zurigo e dintorni.',
    finalBtn:'→ Prenota su WhatsApp',
    finalCallPrefix:'oppure chiama:',
    waGeneric:'Ciao VELOV, ho bisogno di una riparazione bici a Zurigo. Puoi aiutarmi?'
  },

  ES: {
    seoH1:'Ubicaciones VELOV Zúrich — taller móvil de bicis en todos los barrios',
    seoIntro:'VELOV cubre los 12 barrios de Zúrich y la aglomeración. Somos móviles — sin tienda, vamos donde estés. Aquí nuestra zona de servicio con tiempos honestos.',
    heroH1:'Reparación de bici móvil — todo Zúrich & alrededores',
    heroP:'VELOV va a ti. 30+ barrios & municipios. Reserva el mismo día. 30–90 min de reacción — normalmente.',
    heroSub:'Ciudad de Zúrich · Schlieren · Kilchberg · Zollikon · Opfikon · Wallisellen · Dübendorf · Adliswil · y más',
    didYouKnowLabel:'🎲 Verdad de Zúrich',
    didYouKnow:[
      'Ir en bici por la Bahnhofstrasse es como yoga: respirar despacio, no chocar con nadie.',
      'Sechseläuten 2025: la cabeza del Böögg estalló a los 50 min. Un pinchazo Velov es más rápido.',
      'El Üetliberg mide 871 m. Con cambios rotos parece 2.871 m.',
      'En invierno el Föhn supera los 100 km/h en el Üetliberg. ¿Culpable de tu pinchazo? Puede.',
      '"El tranvía llega en 4 min igual" — todo zuriqués, siempre. VELOV: normalmente más rápido.',
      'Limmatschwumm 2024: 23.000 nadadores. Esperamos que nadie tuviera que arreglar la bici durante.',
      'En el Kreis 4 hay más bicis que coches. Somos prácticamente habituales.',
      'Goldküste o Pfnüselküste — cubrimos ambas orillas.'
    ],
    pickerTitle:'📍 Elige tu barrio — mira cuándo llegamos',
    pickerLead:'Haz clic en tu barrio o busca. Tiempo honesto + reserva por WhatsApp. Prueba varios — cada uno tiene su historia.',
    searchPh:'p. ej. Oerlikon, Wiedikon, Schlieren …',
    chipAll:'Todos',
    chipCity:'Ciudad Zúrich',
    chipUmland:'Alrededores',
    resultLead:'Tiempo estimado de reacción tras tu llamada:',
    resultMins:'minutos',
    ctaHere:'Reservar en',
    ctaBookSuffix:'ya →',
    waMsgFn:(n)=>`Hola VELOV, estoy en ${n} y necesito reparar la bici. ¿Cuándo puedes venir?`,
    servicesH2:'Nuestros servicios — mismo precio en todas partes',
    services:[
      {emoji:'🛞',name:'Reparación pinchazo',price:'99',time:'30 min'},
      {emoji:'🔧',name:'Servicio completo',price:'149',time:'60 min'},
      {emoji:'🆘',name:'Urgencia',price:'129',time:'30–60 min'},
      {emoji:'⚙️',name:'Servicio e-bike',price:'229',time:'60–90 min'}
    ],
    beneH2:'Por qué Zúrich nos elige',
    benefits:[
      {emoji:'⚡',t:'Ultra rápidos',p:'A menudo menos de 1 hora in situ. Reserva el mismo día. 24 h disponibles.'},
      {emoji:'📍',t:'Servicio móvil',p:'Vamos a ti. Sin horarios de tienda. Sin costes de transporte.'},
      {emoji:'💯',t:'Mecánicos pro',p:'500+ reseñas Google · 4.8 estrellas. Todo tipo de bici, todas las marcas.'},
      {emoji:'💰',t:'Precio fijo',p:'Precio conocido antes de reservar. TWINT, efectivo, tarjeta.'}
    ],
    finalH2:'¿Listo para arreglar? Disponibles el mismo día.',
    finalP:'Vamos a ti — todo Zúrich y alrededores.',
    finalBtn:'→ Reservar por WhatsApp',
    finalCallPrefix:'o llama:',
    waGeneric:'Hola VELOV, necesito reparar mi bici en Zúrich. ¿Puedes ayudarme?'
  }
};

/* SEO config builder per language */
function _velovLocBuildSeo(lang) {
  const t = VELOV_LOC_I18N[lang] || VELOV_LOC_I18N.DE;
  const cfg = {
    id: 'locations_' + lang.toLowerCase(),
    h1: t.seoH1,
    intro: t.seoIntro,
    sections: [
      { h2: t.pickerTitle, body: t.pickerLead, h3items: VELOV_LOC_ZONES.slice(0, 12).map(z => ({ h3: z.names[lang] || z.names.DE, body: z.jokes[lang] || z.jokes.DE })) }
    ],
    contact: 'WhatsApp +41 76 235 21 26 · info@velov.ch'
  };
  if (lang === 'DE') {
    cfg.schema = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.velov.ch/#business",
        "name": "VELOV — Mobile Velowerkstatt Zürich",
        "url": "https://www.velov.ch",
        "telephone": "+41762352126",
        "email": "info@velov.ch",
        "image": "https://www.velov.ch/og-image.jpg",
        "priceRange": "CHF 99 - CHF 299",
        "address": { "@type": "PostalAddress", "streetAddress": "Merkurstrasse 56", "addressLocality": "Zürich", "postalCode": "8032", "addressRegion": "ZH", "addressCountry": "CH" },
        "geo": { "@type": "GeoCoordinates", "latitude": 47.3769, "longitude": 8.5417 },
        "areaServed": VELOV_LOC_ZONES.map(z => ({ "@type": "Place", "name": z.names.DE })),
        "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "08:00", "closes": "20:00" }],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "500" },
        "sameAs": ["https://g.page/r/Cde-mb4tOTU-EAE"]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.velov.ch" },
          { "@type": "ListItem", "position": 2, "name": "Standorte", "item": "https://www.velov.ch/standorte" }
        ]
      }
    ];
  }
  return cfg;
}

class VelovLocations extends HTMLElement {
  static CONFIG = {
    phone:        '+41762352126',
    phoneDisplay: '+41 76 235 21 26',
    whatsapp:     '41762352126',
    email:        'velovzh@gmail.com'
  };

  constructor() {
    super();
    this.state = { filter: 'all', selected: null, query: '', factIdx: 0 };
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

  connectedCallback() {
    this.lang = this.detectLang();
    this.t = VELOV_LOC_I18N[this.lang] || VELOV_LOC_I18N.DE;
    try { window.__velovSeoHelper && window.__velovSeoHelper.injectSeo(this, _velovLocBuildSeo(this.lang)); } catch(e) {}
    try { window.__velovTracker && window.__velovTracker.bind(this); } catch(e) {}

    this.injectStyles();
    this.render();
    this.bindEvents();
    this.startFactRotator();
  }

  disconnectedCallback() {
    if (this._factTimer) clearInterval(this._factTimer);
  }

  injectStyles() {
    if (document.getElementById('velov-locations-styles')) return;
    const style = document.createElement('style');
    style.id = 'velov-locations-styles';
    style.textContent = `
      velov-locations { display: block; width: 100%; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2B3D; box-sizing: border-box; }
      velov-locations *, velov-locations *::before, velov-locations *::after { box-sizing: border-box; }
      .vl-wrap { max-width: 1200px; margin: 0 auto; padding: 48px 24px; background: #F5F0EB; }
      .vl-hero { background: linear-gradient(135deg, #7B68EE 0%, #9B88FF 100%); color: #fff; padding: 56px 32px; border-radius: 24px; text-align: center; margin-bottom: 24px; position: relative; overflow: hidden; }
      .vl-hero::before { content:''; position:absolute; top:-30%; right:-10%; width:400px; height:400px; background: radial-gradient(circle, rgba(255,255,255,.1), transparent 65%); filter: blur(40px); }
      .vl-hero h1, .vl-hero p, .vl-hero .sub { position: relative; z-index: 2; }
      .vl-hero h1 { font-size: 2.4rem; margin: 0 0 12px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.15; }
      .vl-hero p { font-size: 1.1rem; opacity: .95; max-width: 720px; margin: 0 auto 8px; }
      .vl-hero .sub { font-size: .9rem; opacity: .8; margin-top: 12px; }

      .vl-fact { background: #fff; border-radius: 16px; padding: 18px 24px; margin-bottom: 32px; display: flex; align-items: flex-start; gap: 14px; box-shadow: 0 4px 14px rgba(45,43,61,.06); border-left: 4px solid #E8573A; transition: opacity .3s; }
      .vl-fact .vl-fact-label { background: #E8573A; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: .75rem; font-weight: 700; flex-shrink: 0; white-space: nowrap; }
      .vl-fact .vl-fact-text { color: #2D2B3D; font-size: .95rem; line-height: 1.5; flex: 1; }
      .vl-fact.fading { opacity: 0; }

      .vl-picker { background: #fff; border-radius: 20px; padding: 28px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.08); }
      .vl-picker h2 { font-size: 1.4rem; margin: 0 0 8px; color: #2D2B3D; font-weight: 700; line-height: 1.3; }
      .vl-picker .lead { color: #666; margin-bottom: 18px; font-size: .95rem; }
      .vl-search { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
      .vl-search input { flex: 1; min-width: 220px; padding: 14px 16px; border: 2px solid #E8E3D9; border-radius: 12px; font-size: 1rem; font-family: inherit; outline: none; transition: border-color .2s; }
      .vl-search input:focus { border-color: #7B68EE; }
      .vl-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
      .vl-chip { padding: 8px 16px; border-radius: 999px; background: #F5F0EB; border: 2px solid transparent; color: #2D2B3D; font-size: .9rem; cursor: pointer; font-weight: 600; transition: all .2s; font-family: inherit; }
      .vl-chip:hover { background: #E8E3D9; }
      .vl-chip.active { background: #7B68EE; color: #fff; }

      .vl-zones { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
      .vl-zone { background: #F5F0EB; border-radius: 12px; padding: 14px 16px; cursor: pointer; border: 2px solid transparent; transition: all .2s; text-align: left; font-family: inherit; }
      .vl-zone:hover { background: #fff; border-color: #7B68EE; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(123,104,238,.15); }
      .vl-zone.selected { background: #fff; border-color: #E8573A; box-shadow: 0 4px 16px rgba(232,87,58,.2); }
      .vl-zone .vl-zname { font-weight: 700; color: #2D2B3D; font-size: .98rem; margin-bottom: 4px; }
      .vl-zone .vl-zeta { color: #E8573A; font-size: .85rem; font-weight: 600; }
      .vl-zone.umland .vl-zname::before { content: '🏘️ '; }
      .vl-zone.city .vl-zname::before { content: '🏢 '; }

      .vl-result { margin-top: 24px; padding: 28px; background: linear-gradient(135deg, #2D2B3D 0%, #3D3B4D 100%); border-radius: 16px; color: #fff; display: none; }
      .vl-result.show { display: block; }
      .vl-result h3 { margin: 0 0 8px; font-size: 1.4rem; font-weight: 700; }
      .vl-result .vl-eta-big { font-size: 2.2rem; font-weight: 800; color: #E8573A; margin: 8px 0; line-height: 1; }
      .vl-result .vl-joke { font-style: italic; opacity: .95; margin: 12px 0 16px; font-size: 1.02rem; line-height: 1.5; padding-left: 12px; border-left: 3px solid #E8573A; }
      .vl-result .vl-cta { display: inline-block; padding: 14px 28px; background: #E8573A; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 700; transition: transform .2s; }
      .vl-result .vl-cta:hover { transform: scale(1.04); }

      .vl-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px; }
      .vl-service { background: #fff; padding: 24px; border-radius: 16px; text-align: center; box-shadow: 0 4px 16px rgba(45,43,61,.06); border-top: 4px solid #7B68EE; }
      .vl-service .emoji { font-size: 2rem; }
      .vl-service h4 { margin: 10px 0 6px; color: #2D2B3D; font-size: 1.05rem; font-weight: 700; }
      .vl-service .price { font-size: 1.5rem; font-weight: 800; color: #E8573A; margin-top: 8px; }
      .vl-service .time { color: #999; font-size: .85rem; margin-top: 4px; }

      .vl-bene { background: #fff; border-radius: 20px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(45,43,61,.06); }
      .vl-bene h2 { color: #7B68EE; font-size: 1.5rem; margin: 0 0 20px; font-weight: 700; }
      .vl-bene-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
      .vl-bene-item .emoji { font-size: 1.8rem; }
      .vl-bene-item h4 { color: #2D2B3D; margin: 8px 0 4px; font-size: 1.05rem; font-weight: 700; }
      .vl-bene-item p { color: #666; font-size: .95rem; margin: 0; }

      .vl-finalcta { background: linear-gradient(135deg, #E8573A 0%, #FF7A5C 100%); color: #fff; padding: 44px 32px; border-radius: 24px; text-align: center; margin-bottom: 24px; }
      .vl-finalcta h2 { font-size: 1.7rem; margin: 0 0 12px; font-weight: 800; }
      .vl-finalcta p { font-size: 1.05rem; opacity: .95; margin: 0 0 22px; }
      .vl-finalcta .btn { display: inline-block; background: #fff; color: #E8573A; padding: 16px 32px; border-radius: 999px; font-weight: 800; text-decoration: none; font-size: 1.02rem; transition: transform .2s; }
      .vl-finalcta .btn:hover { transform: scale(1.05); }
      .vl-finalcta .phone { display: block; margin-top: 16px; color: #fff; opacity: .9; font-size: .92rem; }
      .vl-finalcta .phone a { color: #fff; font-weight: 700; text-decoration: underline; }

      .vl-h2-section { color: #2D2B3D; font-size: 1.4rem; margin: 0 0 16px; font-weight: 700; }

      @media (max-width: 640px) {
        .vl-wrap { padding: 24px 16px; }
        .vl-hero { padding: 36px 18px; border-radius: 16px; }
        .vl-hero h1 { font-size: 1.7rem; }
        .vl-zones { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
        .vl-fact { flex-direction: column; gap: 8px; }
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    const C = VelovLocations.CONFIG;
    const T = this.t;

    const zonesHtml = VELOV_LOC_ZONES.map(z => `
      <button class="vl-zone ${z.type}" data-slug="${z.slug}" data-type="${z.type}" data-name="${(z.names[this.lang] || z.names.DE).replace(/"/g, '&quot;')}">
        <div class="vl-zname">${z.names[this.lang] || z.names.DE}</div>
        <div class="vl-zeta">~${z.eta} ${this.lang === 'DE' ? 'Min' : 'min'}</div>
      </button>
    `).join('');

    const cityCount = VELOV_LOC_ZONES.filter(z => z.type === 'city').length;
    const umlandCount = VELOV_LOC_ZONES.filter(z => z.type === 'umland').length;

    const servicesHtml = T.services.map(s => `
      <div class="vl-service">
        <div class="emoji">${s.emoji}</div>
        <h4>${s.name}</h4>
        <div class="price">${this.lang === 'DE' || this.lang === 'IT' ? 'ab' : this.lang === 'EN' ? 'from' : this.lang === 'FR' ? 'dès' : 'desde'} ${s.price} CHF</div>
        <div class="time">⏱️ ${s.time}</div>
      </div>
    `).join('');

    const beneHtml = T.benefits.map(b => `
      <div class="vl-bene-item">
        <div class="emoji">${b.emoji}</div>
        <h4>${b.t}</h4>
        <p>${b.p}</p>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="vl-wrap">
        <div class="vl-hero">
          <h1>${T.heroH1}</h1>
          <p>${T.heroP}</p>
          <div class="sub">${T.heroSub}</div>
        </div>

        <div class="vl-fact" id="vl-fact">
          <span class="vl-fact-label">${T.didYouKnowLabel}</span>
          <span class="vl-fact-text" id="vl-fact-text">${T.didYouKnow[0]}</span>
        </div>

        <section class="vl-picker">
          <h2>${T.pickerTitle}</h2>
          <p class="lead">${T.pickerLead}</p>
          <div class="vl-search">
            <input type="text" id="vl-q" placeholder="${T.searchPh}" autocomplete="off" />
          </div>
          <div class="vl-filter">
            <button class="vl-chip active" data-filter="all">${T.chipAll} (${VELOV_LOC_ZONES.length})</button>
            <button class="vl-chip" data-filter="city">${T.chipCity} (${cityCount})</button>
            <button class="vl-chip" data-filter="umland">${T.chipUmland} (${umlandCount})</button>
          </div>
          <div class="vl-zones" id="vl-zones">${zonesHtml}</div>

          <div class="vl-result" id="vl-result">
            <h3 id="vl-rname">—</h3>
            <p>${T.resultLead}</p>
            <div class="vl-eta-big" id="vl-reta">—</div>
            <div class="vl-joke" id="vl-rjoke">—</div>
            <a id="vl-rcta" class="vl-cta" href="#" target="_blank" rel="noopener">${T.ctaHere} <span id="vl-rname2">—</span> ${T.ctaBookSuffix}</a>
          </div>
        </section>

        <h2 class="vl-h2-section">${T.servicesH2}</h2>
        <div class="vl-services">${servicesHtml}</div>

        <section class="vl-bene">
          <h2>${T.beneH2}</h2>
          <div class="vl-bene-grid">${beneHtml}</div>
        </section>

        <section class="vl-finalcta">
          <h2>${T.finalH2}</h2>
          <p>${T.finalP}</p>
          <a class="btn" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T.waGeneric)}" target="_blank" rel="noopener">${T.finalBtn}</a>
          <span class="phone">${T.finalCallPrefix} <a href="tel:${C.phone}">${C.phoneDisplay}</a></span>
        </section>
      </div>
    `;
  }

  bindEvents() {
    this.querySelectorAll('.vl-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.state.filter = chip.dataset.filter;
        this.querySelectorAll('.vl-chip').forEach(c => c.classList.toggle('active', c === chip));
        this.applyFilter();
      });
    });

    this.querySelectorAll('.vl-zone').forEach(zone => {
      zone.addEventListener('click', () => this.selectZone(zone.dataset.slug));
    });

    const q = this.querySelector('#vl-q');
    if (q) q.addEventListener('input', e => {
      this.state.query = e.target.value.toLowerCase().trim();
      this.applyFilter();
    });
  }

  applyFilter() {
    const { filter, query } = this.state;
    this.querySelectorAll('.vl-zone').forEach(zone => {
      const typeOk = filter === 'all' || zone.dataset.type === filter;
      const nameOk = !query || zone.dataset.name.toLowerCase().includes(query);
      zone.style.display = (typeOk && nameOk) ? '' : 'none';
    });
  }

  selectZone(slug) {
    const C = VelovLocations.CONFIG;
    const T = this.t;
    const z = VELOV_LOC_ZONES.find(x => x.slug === slug);
    if (!z) return;
    this.state.selected = slug;
    this.querySelectorAll('.vl-zone').forEach(el => el.classList.toggle('selected', el.dataset.slug === slug));

    const panel = this.querySelector('#vl-result');
    const name = z.names[this.lang] || z.names.DE;
    const joke = z.jokes[this.lang] || z.jokes.DE;

    this.querySelector('#vl-rname').textContent = name;
    this.querySelector('#vl-rname2').textContent = name;
    this.querySelector('#vl-reta').textContent = `~${z.eta} ${T.resultMins}`;
    this.querySelector('#vl-rjoke').textContent = joke;
    this.querySelector('#vl-rcta').href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T.waMsgFn(name))}`;

    panel.classList.add('show');
    try { if (panel.scrollIntoView) panel.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e) {}
  }

  startFactRotator() {
    if (this._factTimer) clearInterval(this._factTimer);
    const facts = this.t.didYouKnow;
    if (!facts || facts.length < 2) return;
    this._factTimer = setInterval(() => {
      const el = this.querySelector('#vl-fact');
      const txt = this.querySelector('#vl-fact-text');
      if (!el || !txt) return;
      el.classList.add('fading');
      setTimeout(() => {
        this.state.factIdx = (this.state.factIdx + 1) % facts.length;
        txt.textContent = facts[this.state.factIdx];
        el.classList.remove('fading');
      }, 300);
    }, 7000);
  }
}

if (!customElements.get('velov-locations')) {
  customElements.define('velov-locations', VelovLocations);
}
