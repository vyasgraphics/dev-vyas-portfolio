"use client";

// Device-motion tilt for touch devices, mirroring the mouse-hover tilt on
// desktop. One shared `deviceorientation` listener feeds every subscribed
// TiltCard rather than each card attaching its own - orientation events
// can fire quite frequently, and there are usually several tilt cards on
// a page at once.
//
// iOS 13+ requires DeviceOrientationEvent.requestPermission(), which must
// be called from a real user gesture (a tap) - it can't be requested
// automatically on load. Android and older iOS don't gate it behind a
// permission prompt at all, but this still waits for the same explicit
// tap on both platforms: silently tilting cards the instant someone lands
// on the page (Android) is a worse surprise than just asking everyone,
// consistently, once - see TiltPermissionPrompt.tsx, which doubles as
// the on/off control once the effect is live.

type TiltListener = (px: number, py: number) => void;
type StateListener = (enabled: boolean) => void;

const listeners = new Set<TiltListener>();
const stateListeners = new Set<StateListener>();
let listening = false;
let baseline: { beta: number; gamma: number } | null = null;
let permissionGranted = false;
let enabled = false;

// How many degrees of physical tilt (from wherever the phone happened to
// be held when listening started) maps to the card's full range of
// motion. Smaller = more sensitive.
const DEGREES_FOR_FULL_TILT = 24;

function handleOrientation(e: DeviceOrientationEvent) {
  if (!enabled || e.beta === null || e.gamma === null) return;
  // First reading becomes the neutral baseline - people hold phones at
  // all sorts of resting angles, so calibrating to "flat" or "90°" would
  // feel arbitrary. Tilt is reported relative to however they were
  // already holding it when this started.
  if (!baseline) {
    baseline = { beta: e.beta, gamma: e.gamma };
    return;
  }
  const dGamma = e.gamma - baseline.gamma; // left/right
  const dBeta = e.beta - baseline.beta; // forward/back
  const px = Math.max(-0.5, Math.min(0.5, dGamma / DEGREES_FOR_FULL_TILT));
  const py = Math.max(-0.5, Math.min(0.5, dBeta / DEGREES_FOR_FULL_TILT));
  listeners.forEach((l) => l(px, py));
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("deviceorientation", handleOrientation);
}

export function deviceTiltNeedsPermission(): boolean {
  if (typeof window === "undefined") return false;
  const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  return typeof DOE?.requestPermission === "function";
}

export function isDeviceTiltGranted() {
  return permissionGranted;
}

export function isDeviceTiltEnabled() {
  return enabled;
}

// The toggle button's tap handler. First tap: requests OS permission if
// this platform needs it (iOS), otherwise just flips on. Every tap after
// that just flips the existing on/off state - no re-prompting.
export async function toggleDeviceTilt(): Promise<boolean> {
  if (enabled) {
    enabled = false;
    baseline = null; // re-calibrate to wherever the phone is next time it's turned on
    listeners.forEach((l) => l(0, 0)); // snap every card back to flat, not stuck mid-tilt
    stateListeners.forEach((l) => l(false));
    return false;
  }

  if (!permissionGranted) {
    if (deviceTiltNeedsPermission()) {
      try {
        const DOE = window.DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> };
        const result = await DOE.requestPermission();
        if (result !== "granted") return false;
      } catch {
        return false;
      }
    }
    permissionGranted = true;
  }

  ensureListening();
  enabled = true;
  stateListeners.forEach((l) => l(true));
  return true;
}

export function subscribeDeviceTilt(cb: TiltListener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function subscribeDeviceTiltState(cb: StateListener): () => void {
  stateListeners.add(cb);
  return () => {
    stateListeners.delete(cb);
  };
}
