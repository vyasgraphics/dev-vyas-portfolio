import { ImageResponse } from "next/og";
import { works } from "@/data/works";

/**
 * Social preview card for a case study page. Every case study used to share
 * the homepage's card, so a Move App link pasted into LinkedIn or Slack
 * previewed as "Dev Vyas - Product & UX/UI Designer" with nothing about the
 * project itself. Same dark panel, green glow and DV mark as the root
 * opengraph-image.tsx so the two read as one set; title and outcome come
 * from works.ts, the same source the homepage cards use.
 */
export const caseStudyOgSize = { width: 1200, height: 630 };

export function caseStudyOgAlt(slug: string) {
  const work = works.find((w) => w.slug === slug);
  return work ? `${work.title} - case study by Dev Vyas` : "Case study by Dev Vyas";
}

export function renderCaseStudyOgImage(slug: string) {
  const work = works.find((w) => w.slug === slug);
  const title = work?.title ?? "Case study";
  const impact = work?.impact ?? "";
  const meta = work ? `${work.industry}  ·  ${work.year}` : "";

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
          backgroundImage: "radial-gradient(circle at 82% 18%, rgba(0,222,81,0.16), transparent 45%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "76px",
              height: "76px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            DV
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "rgba(255,255,255,0.55)" }}>{meta}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "#00DE51",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "22px",
            }}
          >
            Case study
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "62px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "27px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "24px",
              maxWidth: "980px",
              lineHeight: 1.45,
            }}
          >
            {impact}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px" }}>
          <div style={{ display: "flex", color: "#fff", fontWeight: 600 }}>Dev Vyas</div>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
          <div style={{ display: "flex", color: "rgba(255,255,255,0.55)" }}>Product &amp; UX/UI Designer</div>
        </div>
      </div>
    ),
    { ...caseStudyOgSize }
  );
}
