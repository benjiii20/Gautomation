# CLAUDE.md

This file gives Claude Code context about this project. Keep it up to date as the site evolves.

## Project

**Gautomation** — marketing website for a small business/workflow automation company (think: RPA, process automation, software automation for other businesses).

This is a simple, single-page website. No backend, no database, no CMS. The goal is a fast, clean, professional site that explains what Gautomation does and makes it easy for potential clients to get in touch.

## Tech stack

- Plain HTML, CSS, and vanilla JavaScript (no framework needed for a site this size)
- Single `index.html` file, plus `styles.css` and `script.js`
- No build step, no npm dependencies — should run by just opening `index.html` or serving the folder statically
- Fonts: use a modern web-safe or Google Font (e.g. Inter, Space Grotesk) via `<link>` tag
- Icons: simple inline SVGs, no icon library dependency required

## Design direction

- **Bold & modern, dark theme, tech feel**
- The brand has a logo: `assets/gautomation-logo.png`. **Important:** it's a large square (1254×1254) *full lockup* that already contains the G icon, the "GAUTOMATION" wordmark, AND the tagline "Intelligent Automation. Limitless Possibilities." Use it thoughtfully:
  - **Header/nav:** the full square is too tall for a nav bar. Either scale it down to a small square (~40–48px) sitting next to a plain "Gautomation" text wordmark, OR use it small on its own. Don't stretch it.
  - **Hero:** you can show the full logo larger here as the centerpiece. If you do, DON'T also repeat the tagline as separate text — it's already in the image. If you'd rather use a text headline + separate tagline in the hero, then keep the logo small in the header instead.
  - **Footer:** small version is fine.
- Pull the site's palette directly from the logo:
  - Background: near-black / gunmetal, e.g. `#0a0a0d`
  - Metal/neutral: brushed silver/gunmetal gradient for text and dividers, e.g. `#c8cdd3` → `#6e7378`
  - Accent gradient (used for the circuit-line motif in the logo, sweeping teal → gold → red): teal `#2bb3a3`, gold `#e0a52e`, red `#c23b3b`
  - Use the teal as the primary accent (links, CTA buttons, highlights); gold and red as secondary accents for small details (icons, hover states, dividers) — don't overuse all three at once
- Brand tagline is **"Intelligent Automation. Limitless Possibilities."** — it's already inside the logo image, so only add it as separate text if the logo is NOT shown large nearby (see hero note above).
- Generous spacing, strong typography hierarchy, subtle animations/transitions on scroll or hover (nothing over the top)
- Should feel like a modern SaaS/tech company landing page, not a generic template
- Fully responsive — must look good on mobile, tablet, and desktop

## Site structure (single page, sections in order)

1. **Header/Nav** — Gautomation logo/wordmark, anchor links to sections, a "Get in touch" button
2. **Hero** — headline + subheadline explaining the value prop (automating business workflows), a primary CTA button
3. **Services** — 3–4 cards/blocks describing automation services offered (e.g. workflow automation, RPA implementation, integrations, custom automation solutions)
4. **About** — short section on who Gautomation is / why clients should trust them
5. **Contact** — contact form (name, email, message) and/or contact details. Form does not need a real backend — can just show a "message sent" state on submit, or use a `mailto:` fallback
6. **Footer** — copyright, maybe social/contact links

## Content notes

- Placeholder copy is fine to start, but it should be realistic and specific to workflow/business automation (not generic "lorem ipsum" or vague filler)
- Keep copy concise — this is a small business site, not a long-form marketing page

## File organization

```
/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── gautomation-logo.png
```

## Conventions

- Use semantic HTML5 elements (`<header>`, `<section>`, `<nav>`, `<footer>`, etc.)
- CSS variables for colors/spacing so the theme is easy to tweak later
- Keep JS minimal — only for things like smooth scrolling, mobile nav toggle, and form interaction
- Comment sections in the HTML/CSS clearly so it's easy to navigate and edit later
