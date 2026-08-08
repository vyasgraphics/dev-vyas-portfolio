"use client";

import { useEffect, useState } from "react";
import { isDeviceTiltEnabled, subscribeDeviceTiltState, toggleDeviceTilt } from "@/hooks/useDeviceTilt";

// Shows on any touch-primary device (Android and iOS alike) - not just
// where iOS's permission prompt is required. A tap always does something
// useful: first tap turns the effect on (requesting OS permission first
// if this platform needs it), and the button itself becomes the on/off
// indicator and control from then on, rather than a one-shot prompt that
// disappears once granted.
export function TiltPermissionPrompt() {
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
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await toggleDeviceTilt();
        setBusy(false);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 12px 8px 14px",
        borderRadius: "100px",
        background: enabled ? "rgba(0,222,81,0.14)" : "rgba(0,222,81,0.06)",
        border: `1px solid ${enabled ? "rgba(0,222,81,0.5)" : "rgba(0,222,81,0.25)"}`,
        color: "#00DE51",
        fontSize: "11.5px",
        fontWeight: 600,
        cursor: busy ? "default" : "pointer",
        marginBottom: "20px",
        opacity: busy ? 0.7 : 1,
        transition: "background 0.2s ease, border-color 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
      <span>{enabled ? "Tilt effect is on" : "Press here \u2014 tilt your phone for 3D cards"}</span>
      {/* A real toggle-switch visual, matching the same component already
          used inside the wireframe screens, so on/off reads instantly. */}
      <span
        style={{
          width: "30px",
          height: "17px",
          borderRadius: "999px",
          background: enabled ? "#00DE51" : "rgba(255,255,255,0.18)",
          border: `1.5px solid ${enabled ? "#00DE51" : "rgba(255,255,255,0.3)"}`,
          position: "relative",
          flexShrink: 0,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "1px",
            left: enabled ? "14px" : "1px",
            width: "11px",
            height: "11px",
            borderRadius: "50%",
            background: enabled ? "#0a0a0a" : "#fff",
            transition: "left 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </span>
    </button>
  );
}
