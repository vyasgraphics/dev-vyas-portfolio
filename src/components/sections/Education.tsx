"use client";

import { useState, useSyncExternalStore } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { educationItems } from "@/data/education";

// Splits "Oct 2025 - Present" into "Oct 2025 -" / "Present" so every date
// in the timeline wraps onto two lines the same way, rather than only the
// longest ones wrapping naturally while shorter ones sit on one line.
function splitPeriod(period: string): [string, string] | null {
  const idx = period.indexOf(" - ");
  if (idx === -1) return null;
  return [period.slice(0, idx), period.slice(idx + 3)];
}

const MOBILE_QUERY = "(max-width: 991px)";

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

// Server snapshot is false, so SSR emits the desktop markup with every
// description present - the collapse only ever takes effect after
// hydration, which keeps the descriptions in the initial HTML for search
// engines and for anyone who never gets the JS.
function useIsMobile() {
  return useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

export function Education() {
  const isMobile = useIsMobile();
  // The six descriptions are 720px of a 2198px section at 375px wide -
  // a third of it - while date, role, org and type tag all stay visible
  // when they're collapsed, so the timeline still scans without them.
  // The most recent entry stays open so the pattern is self-evident
  // rather than looking like six identical unexplained buttons.
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => {
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
    // Every item below this one just moved, and the progress line's own
    // end position with them - without this the timeline dots activate
    // against stale measurements for the rest of the page.
    ScrollTrigger.refresh();
  };

  return (
    <div id="education" className="section-education-experience flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu" />
        The Path Here
      </div>
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Where I studied <br className="d-none d-lg-block" />
        and who I have worked for
      </h2>
      <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ marginBottom: "2.5rem" }}>
        Computer science to design to research - a route that means I understand the theory behind good work, the craft that finishes it, and what it takes to ship on time.
      </p>
      <div className="timeline scroll-down">
        <div className="timeline-line">
          <div className="prg-line" />
        </div>
        {educationItems.map((item, i) => {
          const split = splitPeriod(item.period);
          return (
            <div className="timeline-item effectFade fadeUp no-div" key={i}>
              <p className="timeline-date text-black-56">
                {split ? (
                  <>
                    {split[0]} -<br />
                    {split[1]}
                  </>
                ) : (
                  item.period
                )}
              </p>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "2px 9px", borderRadius: "100px",
                    background: item.type === "education" ? "rgba(99,102,241,0.12)" : "rgba(0,200,83,0.12)",
                    color: item.type === "education" ? "#818cf8" : "#00C853",
                    border: `1px solid ${item.type === "education" ? "rgba(99,102,241,0.3)" : "rgba(0,200,83,0.3)"}`,
                  }}>
                    {item.type === "education" ? "Education" : "Work"}
                  </span>
                  <span className="text-black-56" style={{ fontSize: "12px" }}>{item.org}</span>
                </div>
                <p className="timeline-role fw-medium text-black-72">{item.role}</p>
                {(!isMobile || expanded[i]) && (
                  <p id={`timeline-desc-${i}`} className="timeline-desc text-body-3 text-black-56">
                    {item.description}
                  </p>
                )}
                {isMobile && (
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={!!expanded[i]}
                    aria-controls={`timeline-desc-${i}`}
                    style={{
                      marginTop: expanded[i] ? "4px" : "6px",
                      padding: "6px 0",
                      // 44px, not the ~36px this text sizes to on its own -
                      // it is a primary control repeated six times down the
                      // section, so it holds the same tap-target floor as
                      // the rest of the mobile controls.
                      minHeight: "44px",
                      background: "none",
                      border: "none",
                      color: "#00C853",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {expanded[i] ? "Show less" : "Read more"}
                    <span aria-hidden style={{ display: "inline-block", transform: expanded[i] ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", fontSize: "9px" }}>
                      &#9660;
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
