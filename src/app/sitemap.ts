import type { MetadataRoute } from "next";

const baseUrl = "https://dev-vyas-portfolio.vercel.app";

// Real dates rather than "now" for every route on every build - a sitemap
// that always reports the current moment as lastModified gives search
// engines no genuine signal about which pages have actually changed
// recently. Case study dates reflect when each was last substantially
// updated.
//
// The three /blog/* routes were removed on 16 Aug 2026 along with the posts
// themselves. Leaving them here would have been worse than never listing
// them: a sitemap that advertises URLs returning 404 is a crawl-budget waste
// and a quality signal against the site.
const LAST_MODIFIED: Record<string, string> = {
  // 10 Nov 2026 final polish pass. Homepage: new meta description and
  // ProfilePage structured data. All three case studies: their own share
  // image, a "Next project" card and richer structured data.
  "": "2026-11-10",
  "/work/dissertation": "2026-11-10",
  "/work/move-app": "2026-11-10",
  "/work/vyas-graphics": "2026-11-10",
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
