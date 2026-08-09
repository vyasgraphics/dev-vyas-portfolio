import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import { PageTransition } from "@/components/premium/PageTransition";
import { MagneticButtons } from "@/components/premium/MagneticButtons";
import "./globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL("https://dev-vyas-portfolio.vercel.app"),
    title: {
        default: "Dev Vyas - Product Designer",
        template: "%s - Dev Vyas",
    },
    description: "Dev Vyas - Product Designer. Bridging visual craft and evidence-based design. Based in York, UK.",
    authors: [{ name: "Dev Vyas" }],
    openGraph: {
        title: "Dev Vyas - Product Designer",
        description: "Bridging visual craft and evidence-based design, one user at a time. Based in York, UK.",
        url: "https://dev-vyas-portfolio.vercel.app",
        siteName: "Dev Vyas",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dev Vyas - Product Designer",
        description: "Bridging visual craft and evidence-based design, one user at a time. Based in York, UK.",
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
        apple: "/favicon-48.png?v=29",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-GB" suppressHydrationWarning>
            <body className="dark-mode dark-v3" suppressHydrationWarning>
                <BootstrapClient />
                {/* Route-change curtain: purely visual, Lenis-independent,
                    reduced-motion aware. Sits beside restoration logic. */}
                <PageTransition />
                {/* Magnetic CTAs across every route, including /work and /blog
                    detail pages that don't mount HomeShell. The enhancer is
                    idempotent (skips already-wired elements), so the homepage
                    mounting it too via HomeShell is harmless. */}
                <MagneticButtons />
                <SmoothScroll>
                    <ThemeProvider>{children}</ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
