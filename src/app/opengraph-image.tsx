import { ImageResponse } from "next/og";

export const alt = "Dev Vyas - Product & UX/UI Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(0,222,81,0.16), transparent 45%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "84px",
            height: "84px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.04)",
            color: "#fff",
            fontSize: "34px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          DV
        </div>
          {/* The two academic results a recruiter scans for, shown on every
              homepage share card (LinkedIn, Slack, WhatsApp). */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px",
              borderRadius: "100px",
              border: "1px solid rgba(0,222,81,0.35)",
              background: "rgba(0,222,81,0.08)",
              color: "#fff",
              fontSize: "24px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00DE51" }} />
            MSc Distinction &amp; Departmental Prize, University of York
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Dev Vyas
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "22px",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: "#00DE51",
                fontWeight: 600,
              }}
            >
              Product &amp; UX/UI Designer
            </div>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.55)" }}>
              Leeds, United Kingdom
            </div>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.45)",
              marginTop: "28px",
              maxWidth: "1040px",
              lineHeight: 1.5,
            }}
          >
            Turning research, creative craft and code into products people actually use.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
