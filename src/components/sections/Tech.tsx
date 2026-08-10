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
                Design, research, code and deployment
            </h2>

            {/* Layout lives in CSS (.tech-categories) rather than inline styles,
                because it changes at two breakpoints: a fluid auto-fit grid on
                desktop, two columns on tablet, one on phones. */}
            <div className="tech-categories effectFade fadeUp no-div" style={{ marginTop: "1.75rem" }}>
                {techCategories.map((cat) => (
                    /* IllumineCard is the grid item itself, with no wrapper
                       div. A wrapper would be what the grid stretches, leaving
                       the card inside it at its natural height, so cards in the
                       same row ended up different heights. */
                    <IllumineCard key={cat.label} label={cat.label}>
                        {cat.tools.map((tool) => {
                            const iconOnly = ICON_ONLY_LABELS.has(tool.name);
                            return (
                                <div
                                    key={tool.name}
                                    className="tech-tool-pill"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px 13px",
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
                                            width: iconOnly ? "21px" : "19px",
                                            height: iconOnly ? "21px" : "19px",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {/* Only show text label if the SVG doesn't already contain it */}
                                    {!iconOnly && (
                                        <span style={{
                                            fontSize: "12.5px",
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
                ))}
            </div>
        </div>
    );
}
