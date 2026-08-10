import { techCategories } from "@/data/tech";
import { IllumineCard } from "@/components/IllumineCard";

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

            <div
                className="tech-categories"
                style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
                {techCategories.map((cat, i) => (
                    <div key={cat.label} className="effectFade fadeUp no-div">
                        {/* The first card starts lit so the effect is discoverable:
                            landing on a column of uniformly dark cards gives no hint
                            that there is anything to switch on. Everything below it
                            starts dark, which is what makes the row of switches read
                            as an invitation rather than decoration. */}
                        <IllumineCard label={cat.label} defaultOn={i === 0}>
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
                                        {!iconOnly && (
                                            <span style={{
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                color: "rgba(255,255,255,0.75)",
                                                whiteSpace: "nowrap",
                                                letterSpacing: "0.01em",
                                            }}>
                                                {tool.name}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </IllumineCard>
                    </div>
                ))}
            </div>
        </div>
    );
}
