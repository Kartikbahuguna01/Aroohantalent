# Arohaan Talent Partners – Website

A six-page static website built with plain HTML, CSS and JavaScript.
No build step and no dependencies: open `index.html` in a browser.

## Pages

| File               | Page         |
| ------------------ | ------------ |
| `index.html`       | Homepage     |
| `services.html`    | Services     |
| `industries.html`  | Industries   |
| `hire-talent.html` | Hire Talent  |
| `job-seekers.html` | Job Seekers  |
| `contact.html`     | Contact Us   |

## Project structure

```
arohaan-website/
├── index.html … contact.html   Six pages sharing one navbar and footer
├── css/
│   ├── main.css                Entry point – imports every file below
│   ├── tokens.css              Colours, spacing, shadows, easing (edit here first)
│   ├── base.css                Reset, typography, layout helpers
│   ├── buttons.css             .btn, .btn--primary, .btn--outline
│   ├── navbar.css              Sticky navbar and mobile menu
│   ├── hero.css                Homepage hero, page hero, call-to-action band
│   ├── services.css            Service cards and checklist rows
│   ├── problem.css             Homepage problem/solution cards
│   ├── steps.css               Numbered step cards
│   ├── industries.css          Photo tiles, client logos, sector cards
│   ├── testimonials.css        Testimonial cards with corner shapes
│   ├── forms.css               Inquiry form and request forms
│   ├── info-split.css          Photo + details panel (Hire Talent, Contact)
│   ├── footer.css              Footer and yellow legal strip
│   └── animations.css          Page fade, scroll reveals, hover effects
├── js/
│   └── main.js                 Menu toggle, scroll effects, page transitions
└── assets/images/              Logos, hero photo, industry photos, icons, avatars
```

## Conventions

- **Class names follow BEM:** `block__element--modifier`, for example
  `service-card__label` or `problem-card__label--bad`.
- **Design tokens:** change brand colours in `css/tokens.css` and they update everywhere.
- **Responsive:** each CSS file keeps its own media queries at the bottom.
  Breakpoints are 960px (tablet), 900px, 700px and 640px (mobile).
- **Motion:** `animations.css` and `js/main.js` respect `prefers-reduced-motion`.
- **Dark mode:** follows the visitor's OS setting; tokens live in `tokens.css`.

## Things to do before launch

1. **Forms:** the forms on every page are demo-only. Connect them in
   `initDemoForms()` inside `js/main.js` (or point each `<form>` at your backend).
2. **Footer legal links:** *Privacy Policy*, *Terms of Services* and *Admin* currently
   point to the top of the page. Create those pages and update the links.
3. **Homepage "See More Proof" button** scrolls to the inquiry form. Point it at a
   case-studies page if you add one.
4. **Fonts** load from Google Fonts (Inter, Poppins). Self-host them if you need to
   work offline.
5. **Images:** photos were exported at web size. Replace files in `assets/images/`
   (keep the same names) to update them.

## Adding a new page

1. Copy an existing page, for example `services.html`, and edit the content.
2. Update the `<title>` and the description `<meta>`.
3. Move the `is-active` class and `aria-current="page"` to the matching navbar link.
4. Add the page to the navbar and footer links in every page.
