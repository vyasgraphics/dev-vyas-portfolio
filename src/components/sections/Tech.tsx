import { techCategories } from "@/data/tech";
import { ToolFolder } from "@/components/ToolFolder";

export function Tech() {
    return (
        <div id="tech" className="section-tech-stack flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tech-stack" />
                What I Build With
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                {/* No manual <br>, and deliberately short. GSAP SplitText
                    bakes measured lines into real divs, and it treats a <br>
                    as a boundary even where CSS hides it (d-none below lg) -
                    so the longer wording orphaned "and the AI" on a 390px
                    screen with the break, and orphaned "three" on desktop
                    without it. Because the lines are baked, text-wrap: balance
                    cannot fix it after the fact; the string itself has to be
                    short enough to rag well unaided. At 30 characters this holds one line from tablet up and does not orphan a word on a phone. */}
                Tools from research to release
            </h2>

            {/* Each category is a ToolFolder: its tools fan out of a glass
                folder on hover (tap on touch), and every tool is also listed
                as a chip on the folder itself, so nothing depends on the
                interaction to be read. Two hint variants rather than one
                detected at runtime, matching how the rest of the site
                handles desktop/mobile copy (plain CSS d-none/d-lg-*). */}
            <p className="vg-hint-pill d-none d-lg-flex" style={{ marginBottom: "1.75rem" }}>
                <i className="icon icon-light" aria-hidden="true" />
                <span>Hover a folder to fan out its tools</span>
            </p>
            <p className="vg-hint-pill d-flex d-lg-none" style={{ marginBottom: "1.75rem" }}>
                <i className="icon icon-light" aria-hidden="true" />
                <span>Tap a folder to fan out its tools</span>
            </p>

            {/* Layout lives in CSS (.vg-folders): an auto-fill grid that
                drops to one column on narrow phones. No effectFade here,
                each folder runs its own entrance when it scrolls into view. */}
            <div className="vg-folders">
                {techCategories.map((cat, i) => (
                    <ToolFolder
                        key={cat.label}
                        title={cat.label}
                        tools={cat.tools}
                        index={i}
                        total={techCategories.length}
                    />
                ))}
            </div>
        </div>
    );
}
