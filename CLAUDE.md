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

## File structure

```
/                          → English homepage
/ro/                       → Romanian homepage
/services/[name].html      → English service pages
/services/ro/[name].html   → Romanian service pages
/sitemap.xml
/robots.txt
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
