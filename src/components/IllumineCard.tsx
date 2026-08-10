"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A category card that lights up on hover, throwing a cone of light down
 * over its logos and bringing them from desaturated to full colour.
 *
 * Originally built with an explicit on/off switch. That was replaced with
 * hover because a switch asks the visitor to do work before the section
 * shows them anything, and on a portfolio someone is skimming in under a
 * minute, nothing should need to be operated to be legible. Hovering is
 * free; a row of switches is a small chore.
 *
 * Touch devices have no hover, so the same states are driven by tap there,
 * and the card is only focusable/tappable on those devices. On a pointer
 * device the card is not a button at all, since making a non-interactive
 * display card announce itself as a control would be worse for anyone on a
 * screen reader than leaving it as plain content.
 *
 * The light layer is decorative: aria-hidden, pointer-events none, and a
 * sibling of the content rather than an ancestor, so its opacity never
 * creates a stacking context around anything that needs to sit above it.
 */
export function IllumineCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [lit, setLit] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Resolved after mount rather than during render: the server has no way
  // to know the pointer type, so deciding this during render would produce
  // markup that disagrees with the client and trip a hydration mismatch.
  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  // On touch, a tap anywhere else should put the card back to rest,
  // otherwise every card a visitor prods stays lit for the rest of the
  // visit and the effect stops meaning anything.
  useEffect(() => {
    if (!isTouch || !lit) return;
    const onDocPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setLit(false);
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [isTouch, lit]);

  const touchProps = isTouch
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-pressed": lit,
        "aria-label": `${label} tools`,
        onClick: () => setLit((v) => !v),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLit((v) => !v);
          }
        },
      }
    : {};

  return (
    <div
      ref={ref}
      className={`vg-illumine${lit ? " is-on" : ""}${isTouch ? " is-touch" : ""}`}
      {...touchProps}
    >
      <div className="vg-illumine-light" aria-hidden="true">
        <div className="vg-illumine-slit" />
        <div className="vg-illumine-lumen">
          <div className="lum-wide" />
          <div className="lum-core" />
        </div>
        <div className="vg-illumine-shade">
          <div className="shade-l" />
          <div className="shade-r" />
        </div>
      </div>

      <div className="vg-illumine-body">
        <span className="vg-illumine-label">{label}</span>
        <div className="vg-illumine-tools">{children}</div>
      </div>
    </div>
  );
}
