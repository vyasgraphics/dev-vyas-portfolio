import { educationItems } from "@/data/education";

// Splits "Oct 2025 - Present" into "Oct 2025 -" / "Present" so every date
// in the timeline wraps onto two lines the same way, rather than only the
// longest ones wrapping naturally while shorter ones sit on one line.
function splitPeriod(period: string): [string, string] | null {
  const idx = period.indexOf(" - ");
  if (idx === -1) return null;
  return [period.slice(0, idx), period.slice(idx + 3)];
}

export function Education() {
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
        Computer science to design to research - a route that means I understand the theory behind good work and what it takes to ship it on time.
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
                <p className="timeline-desc text-body-3 text-black-56">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
