import type { MetadataRoute } from "next";

const baseUrl = "https://dev-vyas-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work/dissertation",
    "/work/move-app",
    "/work/vyas-graphics",
    "/blog/ai-in-ux-research",
    "/blog/dissertation-notes",
    "/blog/building-move-app",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
