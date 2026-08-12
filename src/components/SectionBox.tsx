import type { ReactNode } from "react";

// Replaces SectionDivider (a number + a line that draws itself in on scroll)
// as the thing separating one major section from the next. A numbered line
// is a fine chapter marker for a linear document, but it doesn't give each
// section its own visual boundary - everything still reads as one
// continuous column of content with thin rules between. This wraps each
// section in its own bordered, softly-backgrounded card instead, so the
// separation is a real boundary (a box) rather than a divider line - the
// "bento" language carried through from the intro grid above these sections
// (see BentoIntro.tsx), just applied to the deep-content sections that are
// too content-heavy to fit inside a small bento tile themselves.
//
// Deliberately minimal: this only supplies the outer box and a small kicker
// tag. The existing SectionHeading/Body/gallery content inside each section
// is untouched - this is purely a recontainering, not a rebuild of what's
// inside.
export function SectionBox({
  id,
  tag,
  children,
}: {
  id: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        borderRadius: "28px",
        background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.09)",
        padding: "clamp(28px, 4vw, 48px) clamp(20px, 4.5vw, 52px) clamp(36px, 5vw, 56px)",
        // Must exceed this box's own inner padding, or the gap BETWEEN
        // sections reads as tighter than the space inside one - Gestalt
        // proximity then works against the chunking the box is there to
        // create. Inner bottom padding tops out at 56px, so this sits above
        // that rather than the 28px it used to be.
        marginBottom: "64px",
        scrollMarginTop: "24px",
        // Deliberately NOT overflow:hidden. The glass decks inside these
        // boxes rotate their resting cards and lift individual cards on
        // hover (translateY + scale) - both can extend a few pixels past a
        // card's nominal row position. Clipping the box would silently cut
        // those into an already-tuned interaction, undoing a lot of earlier
        // work getting the decks to never clip. The corner glow below is
        // sized and positioned to stay visually contained without needing
        // overflow control.
      }}
    >
      {/* Faint corner glow, purely decorative - gives each box a touch of
          the same depth language as the glass decks inside it, without
          competing with them. Kept fully inside the box's own bounds (no
          negative offset) so it never needs overflow:hidden to look tidy. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "260px",
          height: "200px",
          background: "#00DE51",
          opacity: 0.045,
          filter: "blur(70px)",
          pointerEvents: "none",
          borderRadius: "0 28px 0 100%",
        }}
      />
      <span
        style={{
          position: "relative",
          display: "inline-block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          // Deliberately NOT brand green any more. Squint-tested at 9px
          // blur, a green kicker was the brightest thing in its section -
          // an eyebrow label out-ranking the h2 it introduces. Muted white
          // keeps it legible (6.28:1) while letting the heading lead.
          color: "rgba(255,255,255,0.55)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "100px",
          padding: "6px 14px",
          marginBottom: "22px",
        }}
      >
        {tag}
      </span>
      <div style={{ position: "relative" }}>{children}</div>
    </section>
  );
}
