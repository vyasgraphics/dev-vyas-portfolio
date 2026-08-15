import type { ReactNode } from "react";

// One stage of a case study's Process section: a number, a title, a
// one-line summary, and the supporting evidence in a panel the reader can
// collapse.
//
// OPEN by default, collapsible on demand - not the other way round. The
// section was restructured to fix a genuine problem (three or four
// full-sentence bullets under each of five stages, the largest block of
// prose on either page, with no visual separation between the claim and
// its evidence). Hiding the evidence behind a shut fold fixed the density
// but introduced a worse failure: evidence a recruiter never clicks is
// evidence they never see, and the whole point of these bullets is to
// prove the summary above them is not just a claim. Open by default keeps
// the proof in front of the reader; the toggle is there for someone who
// has read enough of a stage and wants it out of the way.
//
// What still does the work when everything is open is the HIERARCHY: the
// summary is 16px semibold white, the evidence is 14px at 72% opacity and
// indented behind a control. A scanning reader can follow the five
// summaries straight down and skim past the rest, which the flat version
// gave them no way to do.
//
// Native <details>/<summary> rather than React state, deliberately:
// keyboard operation, focus handling and the expanded/collapsed
// announcement are all built in and correct without being reimplemented,
// it needs no "use client" boundary, and it still works if JS fails. The
// case study pages have no ScrollTrigger with cached positions to
// invalidate when the height changes (ScrollReveal is an
// IntersectionObserver that disconnects after firing, SectionNav measures
// live), so nothing needs refreshing on toggle.
//
// `open` is safe to set statically here even though the user can change
// it: React diffs virtual props against the PREVIOUS virtual props, not
// against the live DOM, so a value that stays `true` across renders is
// never re-written and a reader's collapse is never undone. (The only
// re-render these get is ScrollReveal flipping visible once on entry.)
export function ProcessStep({
  index,
  title,
  summary,
  bullets,
  visual,
  defaultOpen = true,
}: {
  index: number;
  title: string;
  summary: string;
  bullets: ReactNode[];
  visual?: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <div className="vg-step">
      <div className="vg-step-head">
        <span className="vg-step-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="vg-step-title">{title}</h3>
      </div>

      <p className="vg-step-summary">{summary}</p>

      {bullets.length > 0 && (
        <details className="vg-step-details" open={defaultOpen}>
          {/* Both labels are real text rather than a CSS-generated string,
              so the control still reads correctly to a screen reader and
              to anything that ignores generated content. The count sits on
              the collapsed label, where it tells the reader how much is
              tucked away; open, the panel speaks for itself. */}
          <summary className="vg-step-toggle vg-tactile">
            <span className="vg-step-toggle-show">Show evidence ({bullets.length})</span>
            <span className="vg-step-toggle-hide">Hide evidence</span>
            <svg className="vg-step-chevron" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <ul className="vg-step-bullets">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Visuals stay OUT of the fold. They are the least text-heavy and
          most engaging thing in the section - hiding those alongside the
          prose would make the page shorter but blander, which is the
          opposite of the goal. */}
      {visual && <div className="vg-step-visual">{visual}</div>}
    </div>
  );
}
