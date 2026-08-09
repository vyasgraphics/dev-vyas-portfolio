"use client";

import { useEffect, useState } from "react";
import { isDeviceTiltEnabled, subscribeDeviceTiltState, toggleDeviceTilt } from "@/hooks/useDeviceTilt";

// Same on/off control as the inline TiltPermissionPrompt banner up near
// the first persona card, just always reachable - stacked directly above
// Back to Top so both live in the same corner, and (unlike Back to Top)
// visible regardless of scroll position, since toggling the effect is
// useful the moment you land on the page, not just after scrolling away
// from the top.
//
// The switch itself is a dark-theme recolour of a reference pill-toggle
// design: the light-grey track / blue "on" state became the site's own
// tokens (dark card background at rest, #00DE51 green when on, matching the
// green used everywhere else for an active/enabled state). A real (visually
// hidden, not display:none) checkbox drives it, so it stays keyboard and
// screen-reader accessible - the reference markup's `display:none` on the
// checkbox would have removed it from the tab order entirely.
export function FloatingTiltToggle() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const isTouchPrimary = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouchPrimary) return;
    setVisible(true);
    setEnabled(isDeviceTiltEnabled());
    return subscribeDeviceTiltState(setEnabled);
  }, []);

  if (!visible) return null;

  const handleToggle = async () => {
    setBusy(true);
    const result = await toggleDeviceTilt();
    setDenied(result === "denied");
    setBusy(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "84px", right: "28px", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      {/* Same "iOS gives no dialog on a repeat denial" situation as
          TiltPermissionPrompt - doing nothing here reads as broken. */}
      {denied && (
        <p style={{
          fontSize: "11px", lineHeight: 1.5, color: "rgba(255,255,255,0.7)",
          background: "rgba(20,22,26,0.92)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "10px", padding: "8px 10px", maxWidth: "200px", textAlign: "right",
        }}>
          Motion access is off. Settings → Safari → Motion &amp; Orientation Access → on, then reload.
        </p>
      )}

      <div className="vg-tilt-pill">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: enabled ? "#00DE51" : "rgba(255,255,255,0.65)", flexShrink: 0 }}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>

        <label className="vg-tilt-switch">
          <input
            type="checkbox"
            className="vg-tilt-switch-input"
            checked={enabled}
            disabled={busy}
            onChange={handleToggle}
            aria-label={enabled ? "Turn off 3D tilt effect" : "Turn on 3D tilt effect"}
          />
          <span className="vg-tilt-switch-track" />
        </label>
      </div>

      <style jsx>{`
        .vg-tilt-pill {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 12px 7px 11px;
          border-radius: 999px;
          background: rgba(27, 30, 35, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 6px 18px -8px rgba(0, 0, 0, 0.6);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .vg-tilt-switch {
          position: relative;
          display: inline-flex;
          width: 46px;
          height: 27px;
          cursor: pointer;
        }
        .vg-tilt-switch-input:disabled {
          cursor: default;
        }
        .vg-tilt-switch:has(.vg-tilt-switch-input:disabled) {
          cursor: default;
          opacity: 0.65;
        }

        /* Visually hidden but still focusable/interactive - unlike
           display:none, this keeps the control in the tab order and
           announced correctly by screen readers as a checkbox. */
        .vg-tilt-switch-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          opacity: 0;
          cursor: pointer;
          z-index: 1;
        }

        .vg-tilt-switch-track {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: rgba(10, 11, 13, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.45);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          pointer-events: none;
        }
        .vg-tilt-switch-track::before {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.15s ease;
        }

        /* On state - the site's own green accent, not the reference's blue. */
        .vg-tilt-switch-input:checked ~ .vg-tilt-switch-track {
          background: #00de51;
          border-color: rgba(0, 222, 81, 0.6);
          box-shadow: 0 0 12px rgba(0, 222, 81, 0.35);
        }
        .vg-tilt-switch-input:checked ~ .vg-tilt-switch-track::before {
          transform: translateX(19px);
        }

        /* Small tactile widen on press, replacing the reference's
           translate(0)-on-active reset (which snapped the thumb back to its
           start position mid-press - reads as a glitch rather than
           feedback). */
        .vg-tilt-switch-input:active:not(:disabled) ~ .vg-tilt-switch-track::before {
          width: 23px;
        }
        .vg-tilt-switch-input:checked:active:not(:disabled) ~ .vg-tilt-switch-track::before {
          transform: translateX(15px);
        }

        .vg-tilt-switch-input:focus-visible ~ .vg-tilt-switch-track {
          outline: 2px solid #00de51;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
