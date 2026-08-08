"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

// Shows a still frame with a play-button overlay for motion/video pieces.
// Pass `videoSrc` once a real export is available and this switches to an
// actual inline <video> on click - no layout change needed when files land.
export function PlayableStill({
  poster,
  videoSrc,
  alt,
  width,
  height,
  caption,
  duration,
}: {
  poster: string;
  videoSrc?: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  duration?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        className={videoSrc && !playing ? "vg-playable vg-card" : undefined}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          borderRadius: "14px",
          overflow: "hidden",
          background: "#000",
          cursor: videoSrc && !playing ? "pointer" : "default",
        }}
        onClick={() => {
          if (videoSrc && !playing) setPlaying(true);
        }}
      >
        {playing && videoSrc ? (
          <VideoPlayer src={videoSrc} poster={poster} onClose={() => setPlaying(false)} />
        ) : (
          <>
            <Image
              src={poster}
              alt={alt}
              width={width}
              height={height}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {videoSrc && (
              <>
                <div className="vg-playable-scrim" />
                <div className="vg-playable-ring" aria-hidden />
                <div className="vg-playable-btn">
                  <svg width="20" height="22" viewBox="0 0 18 20" fill="none">
                    <path d="M1 1.5L17 10L1 18.5V1.5Z" fill="#0a0a0a" />
                  </svg>
                </div>
                {duration && <span className="vg-playable-duration">{duration}</span>}
              </>
            )}
          </>
        )}
      </div>
      {caption && (
        <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
          {caption}
        </span>
      )}

      <style jsx>{`
        .vg-playable-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.05) 35%, rgba(0, 0, 0, 0.15) 100%);
          transition: background 0.3s ease;
        }
        .vg-playable-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 222, 81, 0.5);
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
          animation: vg-pulse 2.4s ease-out infinite;
        }
        @keyframes vg-pulse {
          0% { transform: translate(-50%, -50%) scale(0.75); opacity: 0.6; }
          70% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
          100% { opacity: 0; }
        }
        .vg-playable-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #00de51;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          box-shadow: 0 8px 24px -6px rgba(0, 222, 81, 0.55), 0 0 0 6px rgba(255, 255, 255, 0.08);
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease;
        }
        .vg-playable-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 11.5px;
          font-weight: 600;
          color: #fff;
          background: rgba(10, 10, 10, 0.6);
          padding: 3px 8px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
          letter-spacing: 0.02em;
        }
        @media (hover: hover) {
          :global(.vg-playable:hover) .vg-playable-btn {
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 10px 28px -6px rgba(0, 222, 81, 0.7), 0 0 0 7px rgba(255, 255, 255, 0.12);
          }
          :global(.vg-playable:hover) .vg-playable-scrim {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.02) 35%, rgba(0, 0, 0, 0.1) 100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vg-playable-ring {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
