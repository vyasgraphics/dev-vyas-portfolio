"use client";

import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";

// GlassDeck - literal "fanned glass deck" treatment.
//
// A small, fixed row of equal-size cards that OVERLAP at rest (pulled together
// with negative margins + a per-card resting rotation), then FAN APART and
// straighten together when the pointer enters the group - directly adapting
// the reference effect (container:hover .glass { transform: rotate(0); margin }).
//
// This is a group-hover interaction, not per-card: hovering anywhere over the
// deck resolves every card at once, which is what makes it read as a hand of
// cards being spread rather than a grid of independent tiles.
//
// Desktop-only flourish. Below the mobile breakpoint the whole thing collapses
// to a normal responsive grid (no overlap, no rotation, no group-hover) so a
// single-column stack never turns into an unreadable overlapping pile - hover
// doesn't exist on touch anyway. The breakpoint + fan geometry live in CSS
// (.vg-deck in styles.css) so media queries and :hover can drive them; this
// component only assigns each child its resting angle via --vg-deck-r.
//
// `angles` supplies the resting rotation (deg) per card, in order. Defaults to
// a symmetric spread. Pass exactly as many cards as angles (extra cards fall
// back to 0deg).

export function GlassDeck({
  children,
  angles = [-15, -5, 5, 15],
  min = "280px",
}: {
  children: ReactNode;
  angles?: number[];
  // Min column width for the mobile grid fallback (matches AutoGrid usage).
  min?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <div
      className="vg-deck"
      style={{ ["--vg-deck-min" as string]: min }}
    >
      {items.map((child, i) => (
        <div
          key={i}
          className="vg-deck-card"
          style={{ ["--vg-deck-r" as string]: angles[i] ?? 0 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
