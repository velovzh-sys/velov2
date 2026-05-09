# VELOV — 12 Kreise Custom Elements · Wix Einbau-Guide

## Was du bekommst

12 multilinguale Wix Custom Element Files (DE / EN / FR / IT / ES) — einer pro Zürcher Kreis. Jedes File ist self-contained: Helper, Tracker, SEO-Mirror, JSON-LD Schema und der interaktive Velo-Check Wizard sind alle drin. Keine externen Dependencies.

| File | Tag | URL-Slug | Sprache wechselt via |
|---|---|---|---|
| `velov-kreis01-altstadt.js` | `<velov-altstadt>` | `/altstadt` | `<html lang>` |
| `velov-kreis02-enge.js` | `<velov-enge>` | `/enge` | `<html lang>` |
| `velov-kreis03-wiedikon.js` | `<velov-wiedikon>` | `/wiedikon` | `<html lang>` |
| `velov-kreis04-aussersihl.js` | `<velov-aussersihl>` | `/aussersihl` | `<html lang>` |
| `velov-kreis05-industriequartier.js` | `<velov-industriequartier>` | `/industriequartier` | `<html lang>` |
| `velov-kreis06-unterstrass.js` | `<velov-unterstrass>` | `/unterstrass-oberstrass` | `<html lang>` |
| `velov-kreis07-hottingen.js` | `<velov-hottingen>` | `/hottingen-witikon` | `<html lang>` |
| `velov-kreis08-riesbach.js` | `<velov-riesbach>` | `/seefeld-riesbach` | `<html lang>` |
| `velov-kreis09-albisrieden.js` | `<velov-albisrieden>` | `/albisrieden-altstetten` | `<html lang>` |
| `velov-kreis10-wipkingen.js` | `<velov-wipkingen>` | `/wipkingen-hoengg` | `<html lang>` |
| `velov-kreis11-affoltern.js` | `<velov-affoltern>` | `/affoltern-oerlikon-seebach` | `<html lang>` |
| `velov-kreis12-schwamendingen.js` | `<velov-schwamendingen>` | `/schwamendingen` | `<html lang>` |

## Wie die Sprache erkannt wird

Jedes Element prüft in dieser Reihenfolge:

1. `<velov-wiedikon lang="en">` — explizites Attribut (höchste Priorität)
2. `window.__VELOV_LANG__ = 'EN'` — globale Override (z.B. via Wix Custom Code)
3. `<html lang="en">` — der Wix Multilingual Default
4. Fallback: `DE`

Wix Multilingual setzt automatisch `<html lang>` korrekt. Du musst **nichts manuell switchen** — derselbe Component-Code rendert in jeder Sprachversion automatisch korrekt.

## Wix Einbau Schritt-für-Schritt

### 1. Custom Element registrieren (pro Kreis einmalig)

Wix Editor → linke Sidebar → **Add Elements (+)** → **Embed Code** → **Custom Element**.

Drag das Custom Element auf die Zielseite, dann in den Einstellungen:

- **Server URL**: Pfad zum hochgeladenen File (z.B. via Wix File Manager hosted, oder externer CDN/GitHub Pages — siehe Schritt 2)
- **Tag Name**: `velov-wiedikon` (oder den Tag-Name des jeweiligen Kreises aus der Tabelle oben)

### 2. Wo das JS-File hosten

**Option A — Wix Media Manager (einfachst):**
1. Wix Editor → File Manager (oben in Settings) → Upload das `.js` File
2. URL kopieren (sieht aus wie `https://static.wixstatic.com/...`)
3. Diese URL als **Server URL** ins Custom Element einfügen

**Option B — GitHub Pages (empfohlen, weil Update via git push):**
1. Privates Repo `velov-components` erstellen
2. Files reinpushen
3. GitHub Pages aktivieren → URLs werden `https://<user>.github.io/velov-components/velov-kreis03-wiedikon.js`

**Option C — Cloudflare R2 / eigener CDN:** wenn du es bereits hast, nutz das.

### 3. Pro Sprachversion einbauen

In Wix Multilingual gibt es eine Seite pro Kreis × Sprache. Beispiel für Wiedikon:

- DE: `velov.ch/wiedikon` → Custom Element `<velov-wiedikon>` einbauen
- EN: `en.velov.ch/wiedikon` → **dasselbe** Custom Element einbauen
- FR: `velov.ch/fr/wiedikon` → **dasselbe** Custom Element einbauen
- IT/ES analog

Dasselbe File. Dieselbe URL. Wix setzt die `<html lang>` automatisch, das Element rendert sich in der richtigen Sprache.

### 4. Wix Multilingual aktivieren (falls noch nicht aktiv)

Wix Dashboard → **Settings** → **Multilingual** → Sprachen hinzufügen:
- Deutsch (Default)
- Englisch
- Französisch
- Italienisch
- Spanisch

Wix erstellt dann pro Seite automatisch Sprachkopien. Da das Custom Element den `<html lang>` Wert liest, brauchst du **keine separaten Wix-Texte** für die 5 Sprachen — der Component bringt sie alle mit.

### 5. SEO Sitemap

Wix generiert die Sitemap automatisch. Wichtig: in **Wix SEO Tools → Multilingual** aktivieren, damit `hreflang` Tags pro Sprachversion korrekt gesetzt werden. Google erkennt dann:

```html
<link rel="alternate" hreflang="de" href="https://velov.ch/wiedikon" />
<link rel="alternate" hreflang="en" href="https://en.velov.ch/wiedikon" />
<link rel="alternate" hreflang="fr" href="https://velov.ch/fr/wiedikon" />
```

## Was die Files automatisch machen

✅ **SEO-Mirror**: jedes File rendert eine versteckte aber crawlable HTML-Version mit H1, Story, FAQs, Kontakt — Google findet alles, auch wenn JavaScript langsam lädt.

✅ **JSON-LD Schema**: LocalBusiness + BreadcrumbList wird ins `<head>` injiziert, mit allen 12 Kreisen als `areaServed`, PLZ, Quartier-Namen, Öffnungszeiten, AggregateRating (4.8 / 500 reviews).

✅ **Tracker**: WhatsApp/Phone/Email/Booking Klicks werden automatisch an `dataLayer` und GA4 (`gtag`) gepusht. Der `kreis` Parameter ist im Event mit dabei → Du kannst in GA4 sehen, welche Kreise am meisten Klicks generieren.

✅ **Diagnose-Wizard**: User wählt Symptome + Dringlichkeit → bekommt Service-Empfehlung, Preis, ETA → CTA öffnet WhatsApp mit vorausgefülltem Text inkl. Symptom-Liste. Conversions sollten messbar steigen.

✅ **Hyperlokale Inhalte**: Story-Absatz, 8-10 Landmarks, FAQ und Nachbar-Kreis-Links pro Kreis — alles unique pro Kreis. Kein Duplicate-Content-Risiko.

## Test-Checkliste nach dem Einbau

1. Lade `velov.ch/wiedikon` → **View Source** → such nach `application/ld+json` → sollte LocalBusiness Schema enthalten
2. Lade `en.velov.ch/wiedikon` → suche nach "Mobile Bike Mechanic" im rendered HTML → muss da sein
3. Klick im Wizard 2 Symptome an → Resultat-Box sollte erscheinen mit Preis und WhatsApp-Link
4. Klick den finalen WhatsApp Button → sollte `wa.me/41762352126?text=...` mit korrektem Sprachtext öffnen
5. **Google Rich Results Test** (search.google.com/test/rich-results) → URL einfügen → LocalBusiness sollte als gültig erkannt werden
6. **Google Search Console**: nach 1-2 Wochen sollte Google alle 12 neuen URLs indexieren

## Was als nächstes (proaktiv von mir)

1. **Sitemap-Update**: pro Kreis × Sprache eine URL — total 60 URLs neu in Sitemap
2. **Internal Linking**: auf der Homepage einen "Standort-Picker" (12 Karten) einbauen, der zu allen 12 Kreis-Seiten linkt → kanonisches Hub-Spoke-Modell
3. **Google Business Profile**: für jeden Kreis kannst du nicht eigene GBP machen (du hast nur einen Standort), aber im Hauptprofil sollten die 12 Kreise als "Service Areas" hinzugefügt werden — das pusht lokales Ranking massiv
4. **Backlink-Outreach**: Genossenschaften (Kalkbreite, Kraftwerk, Mehr als Wohnen) und Quartiervereine pro Kreis kontaktieren → "Wir machen B2B-Aktionstage in eurem Quartier" → Backlink + Service-Lead in einem
5. **Schema FAQPage**: aktuell nur in den Files als HTML — ich kann FAQPage Schema separat bauen, falls gewünscht (würde rich snippets in Google Search auslösen)

Sag Bescheid welcher von diesen 5 nächsten Punkten zuerst dran ist — oder direkt alle 5 in einem Rutsch.
