# Dev Vyas - Portfolio

Personal portfolio for **Dev Vyas**, a UI/UX, Product and Graphic Designer based in the United Kingdom.

**Live: [dev-vyas-portfolio.vercel.app](https://dev-vyas-portfolio.vercel.app)**

The site is built around three strands, in the order a project actually runs:
research decides what to build, craft decides whether anyone wants to use it,
and code decides whether it ships.

---

## Built with

| | |
|---|---|
| Framework | Next.js (App Router), React 19, TypeScript |
| Styling | Custom CSS + SCSS, Bootstrap 5 grid |
| Motion | GSAP with ScrollTrigger, Lenis smooth scroll |
| Graphics | Hand-written WebGL/GLSL terrain on the landing screen |
| Email | Resend, via a validated API route |
| Hosting | Vercel, deployed from `main` |

## What is in here

- **Three case studies** - an MSc research study, a full human-centred design
  lifecycle project, and four years of brand and motion work
- **Custom components throughout** - the animated terrain landing screen, the
  interactive wireframe prototypes on the case study pages, before/after
  sliders, flipbook cards and the scroll-driven work cards are all built for
  this site rather than pulled from a library

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The contact form needs a Resend API key to send. Create `.env.local`:

```bash
RESEND_API_KEY=your_key_here
```

Everything else runs without configuration. `.env*` is gitignored - never
commit the key.

## Notes

Accessibility and correctness are checked before each release: one `h1` per
page with no skipped heading levels, every image carries alt text, body copy
clears 4.5:1 contrast, pinch-zoom is never disabled, and all motion respects
`prefers-reduced-motion`.

Copy is British English throughout.

---

© 2026 Dev Vyas. Code is available to read; the written content, case studies,
photography and brand assets are not licensed for reuse.
