"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Custom control bar (play/pause, time, scrubber, duration, mute,
// fullscreen, close) in place of native browser video chrome - matches the
// site's dark/green language instead of each browser's own default skin,
// which otherwise looks out of place next to everything else hand-built on
// this page. Modelled on a WhatsApp-style media-viewer bar: one row, one
// job per control, nothing decorative.
export function VideoPlayer({
  src,
  poster,
  onClose,
}: {
  src: string;
  poster?: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onLoaded = () => setDuration(v.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onPause);
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapRef.current?.requestFullscreen?.();
    }
  };

  const seekFromClientX = (clientX: number) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = pct * duration;
    setCurrent(pct * duration);
  };

  const startSeek = (clientX: number) => {
    setDragging(true);
    seekFromClientX(clientX);
    const onMove = (ev: PointerEvent) => seekFromClientX(ev.clientX);
    const onUp = () => {
      setDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div ref={wrapRef} className="vg-vp" style={{ position: "relative", width: "100%", height: "100%", background: "#000" }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        onClick={togglePlay}
        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }}
      />

      <div className="vg-vp-bar">
        <button type="button" className="vg-vp-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><rect x="0" y="0" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="8.5" y="0" width="3.5" height="14" rx="1" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M0.5 1L11.5 7L0.5 13V1Z" fill="currentColor" /></svg>
          )}
        </button>

        <span className="vg-vp-time">{formatTime(current)}</span>

        <div
          ref={progressRef}
          className="vg-vp-progress"
          onPointerDown={(e) => startSeek(e.clientX)}
        >
          <div className="vg-vp-progress-track">
            <div className="vg-vp-progress-fill" style={{ width: `${pct}%` }} />
            <div className="vg-vp-progress-handle" style={{ left: `${pct}%`, opacity: dragging ? 1 : undefined }} />
          </div>
        </div>

        <span className="vg-vp-time">{formatTime(duration)}</span>

        <button type="button" className="vg-vp-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? (
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none"><path d="M1 5h2.2L6.5 2v10L3.2 9H1V5Z" fill="currentColor" /><path d="M9.5 4.5l4 5M13.5 4.5l-4 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          ) : (
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none"><path d="M1 5h2.2L6.5 2v10L3.2 9H1V5Z" fill="currentColor" /><path d="M9.3 4.6a4 4 0 0 1 0 4.8M11.3 2.8a7 7 0 0 1 0 8.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          )}
        </button>

        <button type="button" className="vg-vp-btn" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
          {fullscreen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 5H5V1M13 5H9V1M1 9H5V13M13 9H9V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1H1V5M9 1H13V5M5 13H1V9M9 13H13V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </button>

        <button type="button" className="vg-vp-btn" onClick={onClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      <style jsx>{`
        .vg-vp-bar {
          position: absolute;
          left: 6px;
          right: 6px;
          bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 7px;
          border-radius: 100px;
          background: rgba(10, 10, 10, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.2);
        }
        .vg-vp-btn {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
          transition: color 0.15s ease;
        }
        @media (hover: hover) {
          .vg-vp-btn:hover {
            color: #00de51;
          }
        }
        .vg-vp-time {
          flex: 0 0 auto;
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: rgba(255, 255, 255, 0.85);
          min-width: 22px;
        }
        .vg-vp-progress {
          flex: 1 1 auto;
          min-width: 16px;
          height: 18px;
          display: flex;
          align-items: center;
          cursor: pointer;
          touch-action: none;
        }
        .vg-vp-progress-track {
          position: relative;
          width: 100%;
          height: 3px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.28);
        }
        .vg-vp-progress-fill {
          position: absolute;
          inset: 0 auto 0 0;
          height: 100%;
          border-radius: 100px;
          background: #00de51;
        }
        .vg-vp-progress-handle {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00de51;
          box-shadow: 0 0 0 2px rgba(10, 10, 10, 0.72);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        @media (hover: hover) {
          .vg-vp-progress:hover .vg-vp-progress-handle {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
