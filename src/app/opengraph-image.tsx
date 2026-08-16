import { ImageResponse } from "next/og";

export const alt = "Dev Vyas - UI/UX, Product & Graphic Designer";
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
              UI/UX, Product &amp; Graphic Designer
            </div>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.55)" }}>
              York, UK
            </div>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.45)",
              marginTop: "28px",
              maxWidth: "900px",
              lineHeight: 1.5,
            }}
          >
            Turning research, craft and code into products people actually use.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
