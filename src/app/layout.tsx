import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL("https://dev-vyas-portfolio.vercel.app"),
    // Product & UX/UI leads, matching the LinkedIn headline. The tagline
    // after the hyphen is the site's narrative; it is the part Google may
    // truncate on narrow results, so the name and title come first.
    title: {
        default: "Dev Vyas | Product & UX/UI Designer - Research, Creative Craft & Code",
        template: "%s - Dev Vyas",
    },
    // 148 characters: under the ~155 Google shows before truncating (the
    // previous one ran to 165 and lost "University of York"). Leads with the
    // name and role, the two things someone searching for him types.
    description: "Dev Vyas is a Leeds-based Product & UX/UI Designer (MSc Distinction, University of York) combining user research, graphic design and front-end code.",
    authors: [{ name: "Dev Vyas" }],
    openGraph: {
        title: "Dev Vyas | Product & UX/UI Designer - Research, Creative Craft & Code",
        description: "Product and UX/UI designer bringing together human-centred research, graphic design and front-end development. MSc with Distinction, University of York.",
        url: "https://dev-vyas-portfolio.vercel.app",
        siteName: "Dev Vyas",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dev Vyas | Product & UX/UI Designer - Research, Creative Craft & Code",
        description: "Product and UX/UI designer bringing together human-centred research, graphic design and front-end development. MSc with Distinction, University of York.",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: "/favicon-32.png?v=29", type: "image/png", sizes: "32x32" },
            { url: "/favicon-16.png?v=29", type: "image/png", sizes: "16x16" },
            { url: "/favicon.ico?v=29" },
        ],
        // iOS uses this for "Add to Home Screen" and expects 180x180; the
        // 48px favicon it used to point at was upscaled into a blurry tile.
        apple: { url: "/apple-touch-icon.png?v=30", sizes: "180x180", type: "image/png" },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    // maximumScale deliberately left unset - capping it at 1 (as this used
    // to) blocks pinch-to-zoom entirely, which fails WCAG 1.4.4 (Resize
    // Text): anyone with low vision who relies on zooming to read content
    // couldn't. Leaving zoom unrestricted costs nothing for everyone else.
    // Tints the phone browser's address bar and status bar to the page
    // background (#0F0F0F) instead of a default light or grey bar.
    themeColor: "#0F0F0F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-GB" suppressHydrationWarning>
            <body className="dark-mode dark-v3" suppressHydrationWarning>
                <BootstrapClient />
                <SmoothScroll>
                    <ThemeProvider>{children}</ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
