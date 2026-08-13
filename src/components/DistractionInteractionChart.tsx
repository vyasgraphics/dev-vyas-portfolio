"use client";

import { useState } from "react";
import { TiltCard } from "@/components/TiltCard";

// Illustrates the study's central result: encoding-stage and delay-stage
// distraction resistance don't add up independently, they trade off. This
// is a simplified, original recreation of the shape of that finding for a
// portfolio audience - not a reproduction of the dissertation's actual
// regression figure or its axis values, which stay in the write-up itself.

// Simple smooth-curve helper: cubic bezier through each pair of points with
// control points at the horizontal midpoint, a lightweight way to get a
// nice S-curve interpolation without a full spline library.
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const PLOT = { left: 66, right: 540, top: 30, bottom: 244 };
const X_STEPS = 4;
const xAt = (i: number) => PLOT.left + ((PLOT.right - PLOT.left) / (X_STEPS - 1)) * i;

const WEAK_POINTS: [number, number][] = [
  [xAt(0), 48],
  [xAt(1), 100],
  [xAt(2), 168],
  [xAt(3), 232],
];
const STRONG_POINTS: [number, number][] = [
  [xAt(0), 142],
  [xAt(1), 150],
  [xAt(2), 157],
  [xAt(3), 163],
];

export function DistractionInteractionChart() {
  const [line, setLine] = useState<"weak" | "strong">("weak");

  const activePoints = line === "weak" ? WEAK_POINTS : STRONG_POINTS;
  const activeColor = line === "weak" ? "#f87171" : "#34d399";
  const endpoint = activePoints[activePoints.length - 1];

  return (
    <TiltCard maxTilt={3}>
      <div
        style={{
          background: "linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "22px",
          padding: "clamp(24px, 3.5vw, 40px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          {/* 16px to sit under the 17px h3 tier - see PhoneFrame.tsx */}
          <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
            Predicted time on task
          </h4>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
            How much encoding-stage resistance helps depends on delay-stage resistance
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "10px", maxWidth: "420px", margin: "0 auto 26px" }}>
          {([
            { key: "weak", label: "Weaker delay-stage resistance", color: "#f87171" },
            { key: "strong", label: "Stronger delay-stage resistance", color: "#34d399" },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setLine(opt.key)}
              style={{
                flex: 1, padding: "9px 10px", borderRadius: "7px", fontSize: "12px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease", border: "1px solid transparent",
                display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center",
                background: line === opt.key ? "rgba(255,255,255,0.09)" : "transparent",
                color: line === opt.key ? opt.color : "rgba(255,255,255,0.42)",
                borderColor: line === opt.key ? `${opt.color}50` : "transparent",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 580 300" style={{ width: "100%", maxWidth: "580px", display: "block", margin: "0 auto" }}>
          <defs>
            <filter id="chart-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Gridlines */}
          {[0, 1, 2, 3].map((i) => {
            const y = PLOT.top + ((PLOT.bottom - PLOT.top) / 3) * i;
            return <line key={i} x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 5" />;
          })}

          {/* Axes */}
          <line x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
          <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

          {/* Inactive line drawn first, dimmed */}
          {(["weak", "strong"] as const)
            .filter((k) => k !== line)
            .map((k) => {
              const pts = k === "weak" ? WEAK_POINTS : STRONG_POINTS;
              const color = k === "weak" ? "#f87171" : "#34d399";
              return (
                <g key={k} opacity={0.22} style={{ transition: "opacity 0.3s ease" }}>
                  <path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                  {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={4} fill={color} />
                  ))}
                </g>
              );
            })}

          {/* Active line drawn on top, full emphasis */}
          <g style={{ transition: "opacity 0.3s ease" }}>
            <path d={smoothPath(activePoints)} fill="none" stroke={activeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {activePoints.slice(0, -1).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={5} fill="#0a0a0a" stroke={activeColor} strokeWidth="2.5" />
            ))}
            <circle cx={endpoint[0]} cy={endpoint[1]} r={7} fill={activeColor} filter="url(#chart-glow)" />
          </g>

          {/* Axis labels */}
          <text x={PLOT.left - 10} y={PLOT.top + 12} textAnchor="end" fontSize="12" fontWeight={700} fill="rgba(255,255,255,0.55)">
            Longer
          </text>
          <text x={PLOT.left - 10} y={PLOT.bottom} textAnchor="end" fontSize="12" fontWeight={700} fill="rgba(255,255,255,0.55)">
            Shorter
          </text>
          <text x={(PLOT.left + PLOT.right) / 2} y={PLOT.bottom + 34} textAnchor="middle" fontSize="13" fill="rgba(255,255,255,0.45)" fontWeight={600}>
            Encoding-stage resistance, low to high →
          </text>
        </svg>

        <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.68)", textAlign: "center", maxWidth: "480px", margin: "20px auto 0" }}>
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
