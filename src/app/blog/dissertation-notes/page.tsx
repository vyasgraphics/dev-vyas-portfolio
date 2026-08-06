import { BackLink } from "@/components/BackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What My Dissertation Taught Me About Complex Interfaces",
  description: "A behind-the-scenes look at designing a distraction-resistance study, and what the early data is starting to show.",
};

export default function WorkDetailPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#fff",
      padding: "24px",
      textAlign: "center",
      gap: "20px",
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10 L4 38 L17 38 C25.8 38 32 32.4 32 24 C32 15.6 25.8 10 17 10 Z" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M35 10 L44 28 L53 10" fill="none" stroke="#00C853" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="44" cy="37" r="3.5" fill="#00C853"/>
      </svg>
      <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, maxWidth: "600px", lineHeight: 1.3 }}>
        What My Dissertation Taught Me About Complex Interfaces
      </h1>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", maxWidth: "440px", lineHeight: 1.6 }}>
        Full case study coming soon - write-up, process, and visuals are on the way.
      </p>
      <BackLink href="/#blog" label="← Back to Writing" />
    </div>
  );
}
