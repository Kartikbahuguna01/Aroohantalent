# Arohaan Talent Partners – Project Audit & Implementation Plan

Date: 2026-11-01 · Scope: the six-page static site in this folder.
Status labels: COMPLETED · NEEDS MY INPUT · REQUIRES CONFIGURATION · NOT APPLICABLE · NOT COMPLETED

## 1. What the project is

- Plain HTML + CSS + JavaScript. No framework, no package.json, no build step, no backend, no database, no API calls.
- 6 pages, 15 CSS files, 1 JS file, 19 images (about 610 KB). Page weight is already small.
- Consequence: React/TypeScript, lint, type-check, database, authentication and API items in the brief are NOT APPLICABLE until a backend is chosen. The real engineering work is forms, SEO, accessibility, performance packaging, legal pages and deployment.

## 2. Findings

### Bugs
| # | Finding | Status |
|---|---------|--------|
| B1 | Step-card numbers (01, 02, 03 …) lost their navy square when the code was reorganised. Cause: they were styled by tag name, not class. | COMPLETED (fixed and re-checked in all pages) |
| B2 | Homepage "Start with a quick inquiry" is not a real `<form>`: the Send Inquiry button does nothing. | NOT COMPLETED – needs decision on where submissions go |
| B3 | The three request forms (Hire Talent, Job Seekers, Contact) block submission on purpose. No input has a `name`, there is no validation, success or error state. Nothing is sent anywhere. | NOT COMPLETED – same decision |
| B4 | Footer links Privacy Policy, Terms of Services and Admin point to `#top`. "See More Proof" scrolls to the inquiry form. | NEEDS MY INPUT |
| B5 | No custom 404 page. | NOT COMPLETED |
| B6 | Heading order on the homepage jumps from h2 to h4 inside the problem cards. | NOT COMPLETED (safe, invisible fix) |

### Security
- Secret scan of HTML/CSS/JS: no API keys, passwords or tokens found. COMPLETED.
- Static site means no SQL injection or CSRF surface today. This changes the moment forms get a backend.
- Needs at hosting level: HTTPS, security headers (CSP, X-Content-Type-Options, Referrer-Policy, frame protection). REQUIRES CONFIGURATION.
- Google Fonts loads from Google servers on every visit. This sends visitor IP addresses to Google, which some privacy rules (e.g. GDPR) treat as personal data. Self-hosting the fonts removes it. NEEDS MY INPUT (do you have EU visitors?).
- The "Admin" footer link advertises an admin area that does not exist. NEEDS MY INPUT.

### Accessibility (WCAG 2.2 AA)
Measured colour contrast (AA needs 4.5:1 for body text, 3:1 for large text and icons):

| Element | Ratio | Result |
|---------|-------|--------|
| Eyebrow labels, #fde047 on white | 1.32 | FAIL |
| Active navbar link, #fde047 on white | 1.32 | FAIL |
| Yellow tick marks on white | 1.32 | FAIL (decorative, but the checklist text still reads) |
| Form placeholders, #9aa3af on white | 2.55 | FAIL |
| Orange testimonial stars | 2.19 | Below 3:1 (they have a text label, so acceptable) |
| Muted grey text, #6b7280 on white | 4.83 | Pass |
| Button text on yellow | 11.73 | Pass |
| Footer text on navy | 11.22 | Pass |

These colours are part of your design, so I have NOT changed them. NEEDS MY INPUT (options in section 5).

Other gaps: no `<main>` landmark and no "skip to content" link; testimonial quotes are not marked as quotes. Visible focus rings, form labels, aria-current, reduced-motion and keyboard menu support are already in place. COMPLETED.

### SEO
- Present: unique `<title>` and meta description per page, one h1 per page, descriptive alt text on logos.
- Missing: canonical URLs, Open Graph / Twitter tags, social share image, proper favicon set, sitemap.xml, robots.txt, structured data (Organization, LocalBusiness/EmploymentAgency), clean URLs without `.html`. NOT COMPLETED. REQUIRES the final domain.

### Performance
- Hero photo is 192 KB. Good, but can be smaller as WebP/AVIF and should be preloaded for LCP.
- `main.css` pulls 14 files with `@import`, which makes the browser fetch them one after another. For production they should be combined into one file. This is the largest easy speed win.
- Two Google font families (9 weights) block rendering a little. Self-hosting and trimming weights fixes this.
- Scroll animations are light (one small script). The glass panel uses `backdrop-filter`, which can be slow on very old phones.
- Lighthouse and Core Web Vitals have NOT been measured: no browser is available in this environment. NOT COMPLETED.

### Responsive / cross-browser
- Breakpoints exist at 960, 900, 700 and 640px and each component carries its own rules.
- Not tested in a real browser or on real devices, and Chrome/Firefox/Edge/Safari have not been compared. NOT COMPLETED (see how to run checks in section 6).

### Content and trust
- Testimonials (Sarah Chen, Marcus Webb, Priya Raman), "100+ HR & People Teams Served", client logo and company stories need confirmation that they are real and approved. I did not invent them; they came from your design. NEEDS MY INPUT.
- Contract Staffing says "W-2 contractors, we run payroll" and Contact says office hours in "PT". W-2 is a US payroll term and PT is Pacific Time, while the address is Gorakhpur, India. Likely design copy to review. NEEDS MY INPUT.
- Privacy Policy, Terms and cookie consent: needed if forms collect personal data or analytics are used. NEEDS MY INPUT (I will not invent legal text).

### Design-rule conflicts to confirm
- Your brief says no glassmorphism. The hero panel is glass because you asked for it earlier. Keep it? NEEDS MY INPUT.
- Dark-mode colours exist in the code, but the pages were never designed in dark, so dark mode would look half-finished (white navbar and form fields stay white). Remove it or design it? NEEDS MY INPUT.

## 3. Implementation plan

| Phase | Work | Needs you? |
|-------|------|------------|
| 1 | Safe fixes: h2→h4 heading order, `<main>` landmark, skip link, input `name`s, 404 page, form markup made real | No |
| 2 | Working forms: validation, spam protection, loading / success / error states, duplicate-submit protection, delivery to your inbox or CRM | Yes: delivery method and recipient |
| 3 | Production build: combine CSS into one file, minify, compress images (WebP/AVIF), preload hero, self-host fonts, caching rules | Font choice (privacy) |
| 4 | SEO pack: canonical, Open Graph, structured data, sitemap.xml, robots.txt, favicon set, clean URLs | Final domain, share image |
| 5 | Legal and trust pages, cookie consent if analytics are used | Your legal text or approval to draft for review |
| 6 | Hosting setup: HTTPS, security headers, 404 and redirects, deployment instructions | Hosting choice |
| 7 | QA: Lighthouse, accessibility scan, browser matrix, real devices, form tests | You run browser checks on my checklist |

## 4. Questions I need answered
1. Where should form submissions go (email address, CRM, spreadsheet) and who receives them?
2. Where will the site be hosted (Netlify, Vercel, cPanel/shared hosting, other) and what is the domain?
3. Privacy Policy and Terms: do you have text, or should I draft a starting version for a lawyer to review?
4. Do you want Google Analytics 4? If yes, send the Measurement ID. A cookie banner will then be required.
5. Contrast: keep the yellow text exactly as designed, or approve a darker yellow only for text on white?
6. Dark mode: remove it, or will you design it?
7. Are the testimonials, client names and "100+ teams" figure real and approved for publication?
8. What should "Admin" link to, or should it be removed? What should "See More Proof" open?
9. Confirm the W-2 / "PT" copy.
10. Keep the glass panel in the hero?

## 5. Contrast options (for question 5)
- A. Keep as designed (fails AA, higher legal and usability risk).
- B. Keep `#fde047` for backgrounds, underlines, ticks and dark-background text. Use a deeper yellow, about `#8a6d00`, for yellow text on white (passes AA).
- C. Use navy text with a yellow underline for the active link and eyebrows.

## 6. How to run the checks I cannot run here
1. Chrome → open a page → DevTools → Lighthouse → run for Mobile and Desktop. Aim for 90+ in each category.
2. Install the free "axe DevTools" extension and scan every page.
3. Open every page in Chrome, Firefox, Edge and Safari, and in DevTools device mode at 390px, 768px and 1440px.
4. Send me the Lighthouse scores and any screenshots of problems and I will fix them.
