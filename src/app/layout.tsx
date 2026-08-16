import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL("https://dev-vyas-portfolio.vercel.app"),
    // Three disciplines sharing the noun once, rather than "UI/UX Designer -
    // Product Designer - Graphic Designer". That spelling runs to 63
    // characters, past the ~60 Google renders before truncating, and reads
    // as a list rather than an identity. This is 44 and fits every surface:
    // browser tab, search result, and the LinkedIn preview card.
    title: {
        default: "Dev Vyas - UI/UX, Product & Graphic Designer",
        template: "%s - Dev Vyas",
    },
    description: "Dev Vyas - Product Designer and UX Researcher. Human-centred research, visual craft, and a computer science grounding. Based in the United Kingdom.",
    authors: [{ name: "Dev Vyas" }],
    openGraph: {
        title: "Dev Vyas - UI/UX, Product & Graphic Designer",
        description: "Turning research, craft and code into products people actually use. Based in the United Kingdom.",
        url: "https://dev-vyas-portfolio.vercel.app",
        siteName: "Dev Vyas",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dev Vyas - UI/UX, Product & Graphic Designer",
        description: "Turning research, craft and code into products people actually use. Based in the United Kingdom.",
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
    // maximumScale deliberately left unset - capping it at 1 (as this used
    // to) blocks pinch-to-zoom entirely, which fails WCAG 1.4.4 (Resize
    // Text): anyone with low vision who relies on zooming to read content
    // couldn't. Leaving zoom unrestricted costs nothing for everyone else.
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
