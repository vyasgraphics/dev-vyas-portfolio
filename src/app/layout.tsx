import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
    title: {
        default: "Dev Vyas — Product Designer",
        template: "%s — Dev Vyas",
    },
    description: "Dev Vyas - Product Designer. Bridging visual craft and evidence-based design. Based in York, UK.",
    authors: [{ name: "Dev Vyas" }],
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
        <html lang="en-US" suppressHydrationWarning>
            <body className="dark-mode dark-v3" suppressHydrationWarning>
                <BootstrapClient />
                <SmoothScroll>
                    <ThemeProvider>{children}</ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
