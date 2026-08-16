import type { MetadataRoute } from "next";

const baseUrl = "https://dev-vyas-portfolio.vercel.app";

// Real dates rather than "now" for every route on every build - a sitemap
// that always reports the current moment as lastModified gives search
// engines no genuine signal about which pages have actually changed
// recently. Blog post dates come from blog.ts (kept in sync there);
// case study dates reflect when each one was last substantially updated.
const LAST_MODIFIED: Record<string, string> = {
  // Homepage rewritten around the three-pillar positioning on 16 Aug 2026
  // (new hero, pillar band, About, Tools, contact and footer copy).
  "": "2026-08-16",
  "/work/dissertation": "2026-08-09",
  "/work/move-app": "2026-08-09",
  "/work/vyas-graphics": "2026-08-09",
  "/blog/ai-in-ux-research": "2026-08-07",
  "/blog/dissertation-notes": "2026-08-08",
  "/blog/building-move-app": "2026-08-07",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(LAST_MODIFIED);

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_MODIFIED[route],
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
