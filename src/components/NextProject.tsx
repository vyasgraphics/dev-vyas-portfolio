import Link from "next/link";
import { works } from "@/data/works";

/**
 * "Next project" card at the foot of each case study, so a reader who has
 * finished one project can carry straight on to the next rather than
 * hitting a dead end. Follows the homepage order in works.ts and wraps
 * from the last project back to the first. Styles: .vg-next-* in
 * styles.css (CSS only, no SCSS twin).
 */
export function NextProject({ current }: { current: string }) {
  const index = works.findIndex((w) => w.slug === current);
  if (index === -1) return null;
  const next = works[(index + 1) % works.length];
  if (!next.link) return null;

  return (
    <nav className="vg-next-project-wrap" aria-label="Next project">
      <Link href={next.link} className="vg-next-project">
        <div>
          <p className="vg-next-eyebrow">Next project</p>
          <h2 className="vg-next-title">{next.title}</h2>
          <p className="vg-next-impact">{next.impact}</p>
          <span className="vg-next-cta">
            <span className="vg-next-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Read the case study
          </span>
        </div>
        <div className="vg-next-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={next.image} alt="" width={1400} height={854} loading="lazy" decoding="async" />
        </div>
      </Link>
    </nav>
  );
}

/** 2px reading-progress line across the top of a case study. CSS only. */
export function ReadingProgress() {
  return <div className="vg-read-progress" aria-hidden="true" />;
}
