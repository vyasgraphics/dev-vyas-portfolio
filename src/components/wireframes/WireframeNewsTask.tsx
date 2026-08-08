"use client";

import { useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { WireframeIntro } from "./PhoneFrame";
import { ScaleToFit } from "@/components/ScaleToFit";
import { TiltCard } from "@/components/TiltCard";

// Recreates the actual research artefact built for the dissertation: a
// purpose-made news article search task, five rounds of a real search
// query against a grid of genuine and distractor headlines, with three
// sponsored boxes and a trending sidebar competing for attention on every
// round. Colours, copy and typeface are all taken directly from the real
// task (news_article_search_task.html - Segoe UI/Arial/Calibri, not a
// wireframe monospace) rather than invented for this mockup.
//
// One target sits sandwiched directly between two sponsored boxes - the
// exact construction used in the study, based on banner-blindness research
// showing that placement alone costs search time. Clicking either target
// card toggles selection, the same interaction participants used.
//
// The real task explicitly required a laptop or desktop computer (it's in
// the consent form participants saw), so this recreation is fixed-size
// desktop typography throughout rather than a responsive reflow - on
// narrow screens ScaleToFit shrinks the whole thing proportionally, the
// way a phone browser shows a shrunk desktop website rather than a
// redesigned mobile one.
export function WireframeNewsTask({
  showIntro = true,
  badge = "01",
  title = "The research artefact - a news search task",
  description = (
    <>
      <strong style={{ color: "#fff" }}>Component:</strong> the article grid participants searched, rebuilt from
      the real task. Click a headline to select it, the way participants did.
    </>
  ),
}: {
  showIntro?: boolean;
  badge?: string;
  title?: string;
  description?: React.ReactNode;
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>({ target1: true, target2: false });
  const count = Object.values(selected).filter(Boolean).length;

  const toggle = (key: string) => setSelected((s) => ({ ...s, [key]: !s[key] }));
  const reset = () => setSelected({ target1: true, target2: false });

  const cardBase: React.CSSProperties = {
    borderRadius: "8px",
    padding: "14px 16px",
    fontSize: "13.5px",
    lineHeight: 1.42,
  };

  const targetStyle = (isSelected: boolean): React.CSSProperties => ({
    ...cardBase,
    display: "block",
    width: "100%",
    background: isSelected ? "#e8f0fe" : "#fff",
    border: `2px solid ${isSelected ? "#1a73e8" : "#dddddd"}`,
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    transition: "background 0.15s ease, border-color 0.15s ease",
  });

  return (
    <div>
      {showIntro && <WireframeIntro badge={badge} title={title} description={description} />}
      <ScaleToFit width={720}>
        <TiltCard maxTilt={4}>
          <BrowserFrame>
            {/* Sticky-style header - red round label, bold query, counter/timer/submit */}
            <div style={{ padding: "18px 20px", borderBottom: "2px solid #dddddd", background: "#fff" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#d32f2f", marginBottom: "6px" }}>
                Query 3 of 5
              </div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "14px", lineHeight: 1.35 }}>
                Find all articles about remote working trends in the technology sector.
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12.5px", fontWeight: 700, padding: "6px 13px", borderRadius: "6px",
                    border: `1.5px solid ${count > 0 ? "#1a73e8" : "#dddddd"}`,
                    color: count > 0 ? "#1a73e8" : "#555555",
                  }}
                >
                  {count} selected
                </span>
                <span style={{ fontSize: "12.5px", fontWeight: 700, padding: "6px 13px", borderRadius: "6px", background: "#333", color: "#fff", letterSpacing: "0.03em" }}>
                  ⏱ 01:04
                </span>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    marginLeft: "auto", fontSize: "12.5px", fontWeight: 700, padding: "9px 16px", borderRadius: "6px",
                    background: "#1a73e8", color: "#fff", border: "none", cursor: "pointer",
                  }}
                >
                  I&apos;ve Found Them All ✓
                </button>
              </div>
            </div>

            {/* The "sandwich": sponsored - target - sponsored, plus a second
                target and a trending box completing the clutter */}
            <div style={{ padding: "18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              <div style={{ ...cardBase, background: "#C2185B", color: "#fff", border: "2px solid #a3134a" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, opacity: 0.85, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  📢 Sponsored
                </div>
                <div style={{ fontWeight: 700 }}>Compare home insurance quotes today</div>
              </div>

              <button type="button" onClick={() => toggle("target1")} style={targetStyle(selected.target1)}>
                {selected.target1 && (
                  <span style={{ position: "absolute", top: "8px", right: "10px", fontSize: "14px", color: "#0d47a1" }}>✓</span>
                )}
                <div style={{ fontWeight: 700, color: "#1a0dab", marginBottom: "5px" }}>Tech firms embrace hybrid working</div>
                <div style={{ color: "#555555", fontSize: "12px" }}>Major firms continue upholding flexible policies despite return-to-office pressure.</div>
              </button>

              <div style={{ ...cardBase, background: "#00BCD4", color: "#000", border: "2px solid #009aad" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, opacity: 0.75, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  📢 Sponsored
                </div>
                <div style={{ fontWeight: 700 }}>Start your free recipe box trial</div>
              </div>

              <button type="button" style={{ ...cardBase, display: "block", width: "100%", background: "#fff", border: "2px solid #dddddd", textAlign: "left", cursor: "default" }}>
                <div style={{ fontWeight: 700, color: "#1a0dab", marginBottom: "5px" }}>New recipe book tops bestseller list</div>
                <div style={{ color: "#555555", fontSize: "12px" }}>A cookbook of fast weeknight dinners has topped the charts for three weeks.</div>
              </button>

              <button type="button" onClick={() => toggle("target2")} style={targetStyle(selected.target2)}>
                {selected.target2 && (
                  <span style={{ position: "absolute", top: "8px", right: "10px", fontSize: "14px", color: "#0d47a1" }}>✓</span>
                )}
                <div style={{ fontWeight: 700, color: "#1a0dab", marginBottom: "5px" }}>Remote work reshapes office demand</div>
                <div style={{ color: "#555555", fontSize: "12px" }}>Demand for large open-plan office space in city centres continues to fall.</div>
              </button>

              <div style={{ ...cardBase, background: "#FF9800", color: "#000", border: "2px solid #d67e00" }}>
                <div style={{ fontSize: "10.5px", fontWeight: 700, opacity: 0.8, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  ↗ Trending Now
                </div>
                <div style={{ fontWeight: 600 }}>Weather: bank holiday outlook</div>
                <div style={{ fontWeight: 600 }}>Transfer window: latest updates</div>
              </div>
            </div>
          </BrowserFrame>
        </TiltCard>
      </ScaleToFit>
    </div>
  );
}
