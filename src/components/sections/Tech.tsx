import { techCategories } from "@/data/tech";
import { IllumineCard } from "@/components/IllumineCard";

// Tools whose SVG already contains the text label - don't repeat the name in the pill.
// "Gemini Notebook" used to be here on the assumption its SVG baked the
// wordmark in, but the asset's clip-path only exposes a 175x131 region while
// the wordmark's path data runs out past x=1500 - it was never rendering,
// clipped away regardless of colour. Removed rather than fixed in the SVG:
// the pill's own text label already does the job every other tool's pill
// relies on, with no dependency on a specific export being correct.
const ICON_ONLY_LABELS = new Set<string>([]);

export function Tech() {
    return (
        <div id="tech" className="section-tech-stack flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tech-stack" />
                What I Build With
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                Design, code, research, <br className="d-none d-lg-block" />
                and the AI layer across all three
            </h2>

            {/* Every card here is IllumineCard: resting state is deliberately
                desaturated (opacity 0.66, greyscale) and only comes into full
                colour on hover/tap - see IllumineCard.tsx. Without a card
                being obviously a control (no button chrome, no visible
                switch), a visitor skimming the page has no reason to try
                hovering one, so the interaction the whole section is built
                around was easy to miss entirely. Two variants rather than one
                detected-at-runtime string: matches how the rest of the site
                handles desktop/mobile copy differences (plain CSS
                d-none/d-lg-*), so this doesn't need its own client-side
                pointer detection on top of the one IllumineCard already
                does. */}
            <p className="vg-hint-pill d-none d-lg-flex" style={{ marginBottom: "1.75rem" }}>
                <i className="icon icon-light" aria-hidden="true" />
                <span>Hover a card to bring its tools into colour</span>
            </p>
            <p className="vg-hint-pill d-flex d-lg-none" style={{ marginBottom: "1.75rem" }}>
                <i className="icon icon-light" aria-hidden="true" />
                <span>Tap a card to bring its tools into colour</span>
            </p>

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
