# Opsistech Website — Claude Code Guidelines

## Project overview

Static HTML website for **Opsistech** (opsistech.ro), a machine vision company in Romania.
Hosted on GitHub Pages with a custom domain. Bilingual: English (`/`) and Romanian (`/ro/`).

## SEO requirements — apply to every change

Every HTML edit, new page, or structural change must comply with the following. No exceptions.

### Meta tags (every page)
- `<title>`: unique per page, 50–60 characters, primary keyword near the front
- `<meta name="description">`: unique, 140–160 characters, includes primary keyword naturally
- `<meta name="geo.region" content="RO" />` and `<meta name="geo.placename" content="Romania" />`

### Canonical tag (every page)
- Must be present and point to the production URL: `https://opsistech.ro/[path]`
- Never omit or duplicate across pages

### hreflang (every bilingual page)
- All three tags required — **bidirectional** (both language versions must reference each other):
  ```html
  <link rel="alternate" hreflang="en" href="https://opsistech.ro/[en-path]" />
  <link rel="alternate" hreflang="ro" href="https://opsistech.ro/services/ro/[ro-path]" />
  <link rel="alternate" hreflang="x-default" href="https://opsistech.ro/[en-path]" />
  ```
- If you add hreflang to a Romanian page, you **must** also add the reciprocal tags on the English page, and vice versa

### Open Graph tags (every page)
- `og:title`, `og:description`, `og:url`, `og:type`, `og:image` required on every page

### Structured data / schema.org (service pages)
- Service pages: `@type: Service` with `name`, `description`, `provider`, `areaServed`
- Homepage: `@type: Organization` with `name`, `url`, `logo`, `contactPoint`, `areaServed`
- Use `application/ld+json` format

### sitemap.xml
- Every new page must be added to `/sitemap.xml`
- Include `xhtml:link` hreflang entries for bilingual pages (matching HTML)
- Include `x-default` hreflang entry
- Update `<lastmod>` to today's date whenever a page is modified
- After any sitemap change, remind the user to resubmit in Google Search Console

### robots.txt
- Must always allow all pages: `Allow: /`
- Sitemap line must point to: `https://opsistech.ro/sitemap.xml`

### Content quality
- Each page must have unique body content — no copy-pasted sections across pages
- Romanian pages must be properly translated, not machine-translated word-for-word
- Headings (`h1`–`h3`) must include relevant keywords naturally
- Internal links: every service page must be linked from at least one other page

### New pages checklist
When creating any new page, always:
1. Add canonical tag
2. Add hreflang tags on both the new page and its language counterpart
3. Add meta description and title
4. Add OG tags
5. Add schema.org structured data
6. Add to sitemap.xml with correct lastmod date
7. Link to it from at least one existing page

## Performance requirements — apply to every change

Page speed directly affects both user experience and Google rankings. Every change must avoid degrading performance. Target: 90+ on PageSpeed Insights (mobile).

### Scripts — never block the main thread
- **Never** load a third-party script eagerly if it is only needed on user interaction. Use lazy/on-demand loading with a callback queue pattern (see `search.js` for the `ensureFuse()` example).
- External scripts must use `async` or `defer`. Never place a script tag without one of these unless it is a tiny inline snippet that must run synchronously.
- Inline scripts that traverse the DOM (e.g. `querySelectorAll`) must be kept minimal. Do not add new DOM-heavy initialisation that runs synchronously on every page load.

### Images — preload the LCP element
- Every page that uses a CSS `background-image` for the above-the-fold hero must have a `<link rel="preload">` in `<head>` so the browser discovers it immediately:
  ```html
  <link rel="preload" as="image" href="[path]-1280.webp" media="(max-width:899px)">
  <link rel="preload" as="image" href="[path]-2560.webp" media="(min-width:900px)">
  ```
- New hero images must be provided in WebP format and at two resolutions (1280px and 2560px wide).
- Do not add large unoptimised images. Always use WebP.

### CSS — keep it inline and minimal
- Critical CSS stays inline in `<style>` (already the pattern). Do not move it to external files.
- Non-critical CSS (search overlay, etc.) is lazy-loaded with `media="print" onload="this.media='all'"`.
- Do not add CSS frameworks or large CSS libraries.

### Fonts
- Google Fonts are loaded with `media="print" onload="this.media='all'"` to avoid render blocking. Keep this pattern on every page.

### Third-party services
- Google Analytics (`gtag.js`) is the only allowed analytics script. Do not add additional tracking pixels, chat widgets, or marketing scripts without explicit approval — each adds to TBT.
- Do not add any CDN-hosted library that loads on every page load without explicit approval.

## File structure

```
/                          → English homepage
/ro/                       → Romanian homepage
/services/[name].html      → English service pages
/services/ro/[name].html   → Romanian service pages
/sitemap.xml
/robots.txt
/search.js                 → Shared search (Fuse.js loaded lazily on search open)
/search.css                → Search overlay styles (lazy-loaded)
```

## Language pairs

| English | Romanian |
|---|---|
| `/services/automated-inspection.html` | `/services/ro/inspectie-automatizata.html` |
| `/services/robot-guidance.html` | `/services/ro/ghidare-robotica.html` |
| `/services/dimensional-measurement.html` | `/services/ro/masurare-dimensionala.html` |
| `/services/identification-tracking.html` | `/services/ro/identificare-urmarire.html` |
| `/services/ai-analysis.html` | `/services/ro/analiza-ai.html` |
| `/services/industries.html` | `/services/ro/industrii.html` |
