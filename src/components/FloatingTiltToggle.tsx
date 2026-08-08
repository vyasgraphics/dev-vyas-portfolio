"use client";

import { useEffect, useState } from "react";
import { isDeviceTiltEnabled, subscribeDeviceTiltState, toggleDeviceTilt } from "@/hooks/useDeviceTilt";

// Same on/off control as the inline TiltPermissionPrompt banner up near
// the first persona card, just always reachable - stacked directly above
// Back to Top so both live in the same corner, and (unlike Back to Top)
// visible regardless of scroll position, since toggling the effect is
// useful the moment you land on the page, not just after scrolling away
// from the top.
export function FloatingTiltToggle() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const isTouchPrimary = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouchPrimary) return;
    setVisible(true);
    setEnabled(isDeviceTiltEnabled());
    return subscribeDeviceTiltState(setEnabled);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={enabled ? "Turn off 3D tilt effect" : "Turn on 3D tilt effect"}
      aria-pressed={enabled}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await toggleDeviceTilt();
        setBusy(false);
      }}
      style={{
        position: "fixed",
        bottom: "84px",
        right: "28px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: `1px solid ${enabled ? "rgba(0,222,81,0.55)" : "rgba(255,255,255,0.2)"}`,
        background: enabled ? "rgba(0,222,81,0.18)" : "rgba(27,30,35,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: enabled ? "#00DE51" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: busy ? "default" : "pointer",
        zIndex: 40,
        opacity: busy ? 0.7 : 1,
        boxShadow: enabled ? "0 0 14px rgba(0,222,81,0.3)" : "none",
        transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          background: enabled ? "#00DE51" : "rgba(255,255,255,0.25)",
          border: "1.5px solid #0a0a0a",
          transition: "background 0.2s ease",
        }}
      />
    </button>
  );
}
