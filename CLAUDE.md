# Dev Vyas Portfolio - CLAUDE.md

Product designer / UX researcher portfolio. Next.js App Router, TypeScript, React 19, GSAP + ScrollTrigger, Lenis smooth scroll, Bootstrap 5. Deployed on Vercel from `main`. Full architecture, page-by-page detail, and component reference: `Dev-Vyas-Portfolio-Reference.md` in this same folder - read it before any non-trivial change, especially the "Things to be careful about" section.

## Non-negotiable rules

- **British English throughout.** -ise not -ize, colour, behaviour, judgement, organise, analyse.
- **No em dashes or en dashes, anywhere.** Plain hyphens only, including in code comments and commit messages.
- **Conservative, surgical edits only.** No drive-by refactors of working code. This site has been burned by broad rewrites before.
- **Never `git init` in this folder. Never force-push.** The repo holds a long commit history; both risk losing it.
- **Never suggest replacing the project folder wholesale.** Deploy workflow below is the only sanctioned path.

## Deploy workflow

```bash
rsync -a --exclude='.git' zip/dev-nextjs/ dev-nextjs/   # only if merging an external zip
git add .
git commit -m "..."
git push origin main
```
Vercel redeploys automatically from `main`.

## Styling: the #1 source of silent no-ops

Styles are defined **twice**: `public/assets/css/styles.css` (compiled, what actually ships) and `public/assets/scss/` (source). Both feed the build for properties the original template SCSS already defines - theme colours, typography scale, spacing on template-inherited components. Edit only the CSS and the SCSS recompile silently reverts it; the edit will look correct, the build will succeed, and the page won't change. **Grep the SCSS folder for the old value before assuming a cache problem.**

The SCSS files use **CRLF line endings** - preserve them if editing programmatically (open in binary, or write with `newline=''`).

Exception: genuinely new custom components added since the original template (`SectionNav`, `BackToTop`, anything prefixed `vg-`) were added as CSS-only rules and don't exist in SCSS at all - nothing to mirror for those specifically.

Other CSS gotchas:
- `button { display: inline-flex }` site-wide - `text-align: center` is a no-op on buttons, use `justify-content` + `align-items`.
- Mobile-specific overrides may need `!important` - source order isn't reliably preserved across media-query boundaries in this build.
- A rule written for a tag (`h4.foo`) breaks silently if that element's semantic tag later changes (e.g. accessibility fix from h4 to h2) - keep size/spacing tied to classes, not tags.

## Dev server in this sandbox

`fuser` and `lsof` are not installed; `pkill -f` matches unreliably. Reliable kill pattern:
```bash
ps aux | grep next-server | grep -v grep | awk '{print $2}' | xargs -r kill -9
```
Confirm with a second `ps aux` before restarting. Always `rm -rf .next` before `npm run build`. Verify freshness via `.next/BUILD_ID` timestamp or a changed PID.

## Locked/reverted - do not reintroduce without being asked

- **Theme**: permanently locked to the dark "Forest Shadow" theme. A light/dark switcher was built and explicitly reverted.
- **WireframeNewsTask**: desktop-only fixed typography, `ScaleToFit` scales it down on narrow viewports. A responsive/clamp version was tried and reverted.
- **WireframeCirclesTest**: must stay a static three-panel diagram. An interactive version was built and reverted.
- **Illumine tech cards**: hover/tap driven, resting opacity held at 0.66 (contrast floor). A per-card on/off switch was built then replaced by hover - don't reintroduce switches.
- **Homepage welcome reveal / hero copy / stats**: current headline, stats and footer tagline are the result of a deliberate copywriting pass - don't revert to generic template phrasing.

## Motion and animation

- Lenis `SmoothScroll.tsx` must use `syncTouch: false`.
- GSAP `registerPlugin` only in `useScrollAnimations.ts`, never duplicated elsewhere.
- `prefers-reduced-motion` CSS must NOT disable `.infiniteSlide-brand` or `.scribble path` - the original template never checks this OS setting for those two.
- Never add a static `transform` to `.text-rotate` (circular badge) - conflicts with its spin animation and freezes it.
- Use `getBoundingClientRect()` for scroll-position maths, never `offsetTop` - `#wrapper` has `position: relative`, and an ancestor's position throws off `offsetTop` silently.

## Accessibility floors (don't trade away for looks)

- Body/label text stays above 4.5:1 contrast.
- Pinch-zoom stays enabled - never set `maximumScale` in viewport meta.
- One `h1` per page, `h2` sections, `h3` items.
- Any new fixed element near the right edge on mobile - check the menu button's 16-56px strip first, it's collided with other controls before.

## Content

- Dissertation case study content stays high-level (no exact stats/p-values) until the dissertation is formally submitted.
- Move App collaborators: Haokai, Lanqing, Yechen - credit accurately if mentioned.
