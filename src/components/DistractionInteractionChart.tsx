"use client";

import { useState } from "react";
import { TiltCard } from "@/components/TiltCard";

// Illustrates the study's central result: encoding-stage and delay-stage
// distraction resistance don't add up independently, they trade off. This
// is a simplified, original recreation of the shape of that finding for a
// portfolio audience - not a reproduction of the dissertation's actual
// regression figure or its axis values, which stay in the write-up itself.
export function DistractionInteractionChart() {
  const [line, setLine] = useState<"weak" | "strong">("weak");

  return (
    <TiltCard maxTilt={4}>
      <div
        style={{
          background: "linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "20px",
          padding: "clamp(22px, 3vw, 32px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
            Predicted time on task
          </h4>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            How much encoding-stage resistance helps depends on delay-stage resistance
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "3px", background: "rgba(255,255,255,0.05)", padding: "3px", borderRadius: "100px", marginBottom: "24px", maxWidth: "420px", margin: "0 auto 24px" }}>
          {([
            { key: "weak", label: "Weaker delay-stage resistance", color: "#f87171" },
            { key: "strong", label: "Stronger delay-stage resistance", color: "#34d399" },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setLine(opt.key)}
              style={{
                flex: 1, padding: "9px 12px", borderRadius: "100px", fontSize: "11.5px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease", border: "1px solid transparent",
                background: line === opt.key ? "rgba(255,255,255,0.08)" : "transparent",
                color: line === opt.key ? opt.color : "rgba(255,255,255,0.4)",
                borderColor: line === opt.key ? `${opt.color}55` : "transparent",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 460 260" style={{ width: "100%", maxWidth: "460px", display: "block", margin: "0 auto" }}>
          {/* Axes */}
          <line x1="50" y1="20" x2="50" y2="212" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="50" y1="212" x2="440" y2="212" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

          {/* Weak delay-stage resistance: steep decline */}
          <path
            d="M 50 45 L 160 78 L 280 130 L 440 205"
            fill="none"
            stroke="#f87171"
            strokeWidth={line === "weak" ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={line === "weak" ? 1 : 0.22}
            style={{ transition: "opacity 0.25s ease, stroke-width 0.25s ease" }}
          />

          {/* Strong delay-stage resistance: near flat */}
          <path
            d="M 50 152 L 160 154 L 280 156 L 440 159"
            fill="none"
            stroke="#34d399"
            strokeWidth={line === "strong" ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={line === "strong" ? 1 : 0.22}
            style={{ transition: "opacity 0.25s ease, stroke-width 0.25s ease" }}
          />

          {/* End markers */}
          <circle cx="440" cy="205" r="4.5" fill="#f87171" opacity={line === "weak" ? 1 : 0.22} style={{ transition: "opacity 0.25s ease" }} />
          <circle cx="440" cy="159" r="4.5" fill="#34d399" opacity={line === "strong" ? 1 : 0.22} style={{ transition: "opacity 0.25s ease" }} />

          {/* Axis labels */}
          <text x="245" y="240" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.45)" fontWeight={600}>
            Encoding-stage resistance, low to high →
          </text>
          <text x="30" y="212" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" transform="rotate(-90 30 212)">
            Shorter
          </text>
          <text x="30" y="35" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" transform="rotate(-90 30 35)">
            Longer
          </text>
        </svg>

        <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.68)", textAlign: "center", maxWidth: "460px", margin: "18px auto 0" }}>
          {line === "weak" ? (
            <>
              For someone <strong style={{ color: "#f87171" }}>weaker</strong> at filtering distraction during the
              wait before recall, getting better at filtering while first taking something in makes a real
              difference to how long the task takes.
            </>
          ) : (
            <>
              For someone <strong style={{ color: "#34d399" }}>stronger</strong> at filtering during that wait,
              encoding-stage skill barely moves the needle - time on task stays roughly the same either way.
            </>
          )}
        </p>
      </div>
    </TiltCard>
  );
}
