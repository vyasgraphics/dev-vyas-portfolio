import { techCategories } from "@/data/tech";

// Tools whose SVG already contains the text label - don't repeat the name in the pill
const ICON_ONLY_LABELS = new Set(["Gemini Notebook"]);

export function Tech() {
    return (
        <div id="tech" className="section-tech-stack flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tech-stack" />
                Tools &amp; Tech
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                The tools I reach for every day
            </h2>

            <div className="tech-categories" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
                {techCategories.map((cat) => (
                    <div key={cat.label} className="tech-category effectFade fadeUp no-div">
                        <p style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--primary, #00C853)",
                            marginBottom: "14px",
                            paddingBottom: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}>
                            {cat.label}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            {cat.tools.map((tool) => {
                                const iconOnly = ICON_ONLY_LABELS.has(tool.name);
                                return (
                                    <div
                                        key={tool.name}
                                        className="tech-tool-pill"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "10px 16px",
                                            borderRadius: "100px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.09)",
                                            transition: "all 0.3s ease",
                                            cursor: "default",
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={tool.image}
                                            alt={tool.name}
                                            loading="lazy"
                                            style={{
                                                objectFit: "contain",
                                                width: iconOnly ? "24px" : "22px",
                                                height: iconOnly ? "24px" : "22px",
                                                flexShrink: 0,
                                            }}
                                        />
                                        {/* Only show text label if the SVG doesn't already contain it */}
                                        <span style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            color: "rgba(255,255,255,0.75)",
                                            whiteSpace: "nowrap",
                                            letterSpacing: "0.01em",
                                        }}>
                                            {tool.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
