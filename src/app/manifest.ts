import type { MetadataRoute } from "next";

// Gives "Add to Home Screen" on Android a proper name, icon and dark splash
// screen rather than a screenshot tile on a white background.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dev Vyas - UI/UX, Product & Graphic Designer",
    short_name: "Dev Vyas",
    description: "Portfolio of Dev Vyas, UI/UX, Product & Graphic Designer based in the United Kingdom.",
    start_url: "/",
    display: "browser",
    background_color: "#0F0F0F",
    theme_color: "#0F0F0F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
