import { pillars } from "@/data/pillars";

// The three-strand band, sitting between the hero and the organisations
// credibility row.
//
// It exists because the page lost its explicit skills breakdown when the
// Skills accordion was commented out of HomeShell, leaving nowhere that
// states what the three strands of the background actually are. A recruiter
// scanning for twenty seconds could read the hero, the case studies and the
// timeline and still not see the shape: computer science, then visual craft,
// then human-centred research.
//
// Deliberately placed HERE rather than lower down. The claim it makes is the
// differentiator against every other design applicant, so it has to land
// before the case studies rather than after them - by the time a reader
// reaches About they have already decided whether to keep scrolling.
//
// Each card carries a real qualification rather than a self-assessment.
// "Code" on its own is an adjective anyone can type; "BE Computer Science &
// Engineering" is a checkable fact, and it is the fact doing the persuading.
export function Pillars() {
    return (
        <div id="pillars" className="section-pillars flat-spacing" style={{ paddingTop: 0 }}>
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tes" />
                What I Bring
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                Three disciplines, <br className="d-none d-lg-block" />
                one way of working
            </h2>

            <ul className="vg-pillars">
                {pillars.map((p, i) => (
                    // .scrolling-effect.effectBottom with a per-item data-delay,
                    // the same stagger the About section's award list uses - not
                    // a new mechanism for the sake of one section.
                    <li
                        key={p.number}
                        className="vg-pillar scrolling-effect effectBottom"
                        data-delay={i * 0.1}
                    >
                        <div className="vg-pillar-head">
                            <span className="vg-pillar-number" aria-hidden="true">{p.number}</span>
                            <i className={`icon ${p.icon} vg-pillar-icon`} aria-hidden="true" />
                        </div>
                        <h3 className="vg-pillar-title letter-space--2">{p.title}</h3>
                        <p className="vg-pillar-credential">{p.credential}</p>
                        {/* Bullets rather than a paragraph: this band is read
                            in a few seconds on the way to the case studies, and
                            a four-line paragraph per card was being skimmed
                            past. Each point stands alone. */}
                        <ul className="vg-pillar-points">
                            {p.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* The fourth thing, deliberately not a fourth card. AI is not a
                discipline alongside the other three here - it is a layer over
                all of them, and giving it an equal-weight card would say the
                opposite of what the copy says. */}
            <p className="vg-pillar-ai effectFade fadeUp no-div">
                <span className="vg-pillar-ai-rule" aria-hidden="true" />
                <span className="vg-pillar-ai-text">
                    AI runs across all three. It takes the repetition; I keep the
                    judgement calls.
                </span>
                <span className="vg-pillar-ai-rule" aria-hidden="true" />
            </p>
        </div>
    );
}
