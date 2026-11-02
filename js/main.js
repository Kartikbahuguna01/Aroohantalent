/**
 * Arohaan Talent Partners – site behaviour
 *
 *  1. Mobile navigation toggle
 *  2. Navbar shadow once the page is scrolled
 *  3. Fade transition between pages
 *  4. Scroll-reveal animations
 *  5. Demo form handling
 *
 * No dependencies. All motion is skipped when the visitor has
 * "reduce motion" enabled in their operating system.
 */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. Mobile navigation toggle
     ------------------------------------------------------------------ */
  function initNavToggle() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    const setOpen = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
     2. Navbar shadow on scroll
     ------------------------------------------------------------------ */
  function initNavbarScrollState() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const update = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     3. Page transitions: fade out, then navigate
     ------------------------------------------------------------------ */
  const LEAVE_DELAY_MS = 240;

  function isInternalPageLink(link) {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^(mailto|tel):/.test(href)) return false;
    return link.origin === window.location.origin && link.pathname !== window.location.pathname;
  }

  function initPageTransitions() {
    // Back/forward cache can restore a page that is mid-fade; reset it.
    window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));

    if (prefersReducedMotion) return;

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (!link || link.target || event.defaultPrevented || event.button !== 0 || isModified) return;
      if (!isInternalPageLink(link)) return;

      event.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = link.href;
      }, LEAVE_DELAY_MS);
    });
  }

  /* ------------------------------------------------------------------
     4. Scroll reveal
     Elements matching REVEAL_TARGETS fade up once when they enter the
     viewport. Siblings are staggered by STAGGER_MS (max MAX_STAGGER steps).
     ------------------------------------------------------------------ */
  const REVEAL_TARGETS = [
    ".page-hero .container > *",
    ".hero__content > *",
    ".glass-panel",
    "section .container > .eyebrow",
    "section .container > h2",
    "section .container > .section-intro",
    ".service-card",
    ".step-card",
    ".problem-card",
    ".sector-card",
    ".testimonial",
    ".checklist",
    ".info-split",
    ".request-form",
    ".inquiry-form",
    ".logo-row > *",
    ".industry-tile",
    ".actions-center",
    ".cta-band .container > *",
    ".footer__grid > *",
  ].join(",");

  const STAGGER_MS = 90;
  const MAX_STAGGER = 5;
  const CLEANUP_AFTER_MS = 1000; // lets hover transitions take over afterwards

  function initScrollReveal() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const siblingCount = new Map();
    const alreadyTagged = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          observer.unobserve(element);
          element.classList.add("is-visible");

          const delay = parseInt(element.style.getPropertyValue("--reveal-delay"), 10) || 0;
          window.setTimeout(() => element.classList.remove("reveal", "is-visible"), CLEANUP_AFTER_MS + delay);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll(REVEAL_TARGETS).forEach((element) => {
      if (alreadyTagged.has(element)) return;
      alreadyTagged.add(element);

      const parent = element.parentElement;
      const index = siblingCount.get(parent) || 0;
      siblingCount.set(parent, index + 1);

      element.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  /* ------------------------------------------------------------------
     5. Demo forms
     TODO: replace with a real submit handler (fetch to your backend,
     a form service, etc.). For now the page just stays put.
     ------------------------------------------------------------------ */
  function initDemoForms() {
    document.querySelectorAll("form[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (event) => event.preventDefault());
    });
  }

  /* ------------------------------------------------------------------ */
  initNavToggle();
  initNavbarScrollState();
  initPageTransitions();
  initScrollReveal();
  initDemoForms();
})();
