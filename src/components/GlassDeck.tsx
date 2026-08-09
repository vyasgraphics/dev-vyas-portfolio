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
  angles,
  labels,
  min = "280px",
}: {
  children: ReactNode;
  // Resting rotation (deg) per card, in order. When omitted, a symmetric
  // spread is generated from the card count so decks of any size (2-7) fan
  // evenly around centre.
  angles?: number[];
  // Optional per-card caption shown in a translucent bottom bar, matching the
  // reference deck's data-text label. Index-aligned with children; omit or
  // pass "" for cards that should have no bar.
  labels?: string[];
  // Min column width for the mobile grid fallback (matches AutoGrid usage).
  min?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const n = items.length;

  // Symmetric fan: spread cards evenly across a total arc, centred on 0deg.
  // Tighter per-card step as the deck grows so a 7-card stack doesn't over-
  // rotate the outer cards. e.g. 3 cards -> [-12, 0, 12]; 4 -> [-15,-5,5,15].
  const step = n <= 4 ? 10 : n <= 5 ? 8 : 6;
  const computed = items.map((_, i) => Math.round((i - (n - 1) / 2) * step * 10) / 10);
  const resolved = angles ?? computed;

  return (
    <div
      className="vg-deck"
      style={{ ["--vg-deck-min" as string]: min, ["--vg-deck-count" as string]: n }}
    >
      {items.map((child, i) => (
        <div
          key={i}
          className="vg-deck-card"
          style={{ ["--vg-deck-r" as string]: resolved[i] ?? 0 }}
        >
          {child}
          {labels?.[i] ? <span className="vg-deck-label">{labels[i]}</span> : null}
        </div>
      ))}
    </div>
  );
}
