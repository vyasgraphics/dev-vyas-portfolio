// Recoloured, enlarged recreations of the three pipeline diagrams for the
// dark theme - boxes and arrows only, laid out as SVG so spacing stays
// exact at any width. Two tones: neutral grey for external/boundary steps
// (platforms Dev didn't build - Prolific, the Sheet destination, SPSS/
// Jamovi), green accent for the steps that are Dev's own research artefact
// or analysis work, matching the accent already used for badges and
// callouts throughout the site rather than introducing new brand colours.
export type PipelineStep = { title: string; subtitle: string; tone: "neutral" | "accent" };

const BOX_W = 320;
const BOX_H = 62;
const GAP = 34;
const PAD = 16;

function toneStyle(tone: "neutral" | "accent") {
  return tone === "accent"
    ? { fill: "rgba(0,222,81,0.07)", stroke: "rgba(0,222,81,0.45)", title: "#00DE51", sub: "rgba(255,255,255,0.62)" }
    : { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.22)", title: "#fff", sub: "rgba(255,255,255,0.5)" };
}

function Arrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <line
      x1={x} y1={y1} x2={x} y2={y2}
      stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"
      markerEnd="url(#pipeline-arrow)"
    />
  );
}

function Box({ cx, y, step }: { cx: number; y: number; step: PipelineStep }) {
  const t = toneStyle(step.tone);
  return (
    <g>
      <rect x={cx - BOX_W / 2} y={y} width={BOX_W} height={BOX_H} rx="12" fill={t.fill} stroke={t.stroke} strokeWidth="1.3" />
      <text x={cx} y={y + 25} textAnchor="middle" fontSize="15.5" fontWeight="600" fill={t.title} fontFamily="inherit">
        {step.title}
      </text>
      <text x={cx} y={y + 45} textAnchor="middle" fontSize="12.5" fill={t.sub} fontFamily="inherit">
        {step.subtitle}
      </text>
    </g>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="pipeline-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

const CARD_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "20px",
  padding: "clamp(20px, 3vw, 32px) 20px",
};

// Simple top-to-bottom flow: Prolific -> Qualtrics -> ... one arrow per step.
export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  const width = BOX_W + PAD * 2;
  const height = PAD + steps.length * BOX_H + (steps.length - 1) * GAP + PAD;
  const cx = width / 2;

  return (
    <div style={CARD_STYLE}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: "420px", display: "block", margin: "0 auto", fontFamily: "'JetBrains Mono', monospace" }}>
        <ArrowDefs />
        {steps.map((step, i) => {
          const y = PAD + i * (BOX_H + GAP);
          return (
            <g key={i}>
              {i > 0 && <Arrow x={cx} y1={y - GAP} y2={y} />}
              <Box cx={cx} y={y} step={step} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Three sources converging into one merge step, then continuing linearly -
// used for the data merge pipeline specifically. The source row sizes
// itself to fit all boxes with a real gap between them (rather than reusing
// the single-column width), so short source boxes never overlap.
export function MergePipelineDiagram({
  sources,
  merge,
}: {
  sources: PipelineStep[];
  merge: PipelineStep[];
}) {
  const smallW = 148;
  const smallH = 54;
  const smallGap = 14;
  const sourcesRowWidth = sources.length * smallW + (sources.length - 1) * smallGap;
  const width = Math.max(BOX_W + PAD * 2, sourcesRowWidth + PAD * 2);
  const cx = width / 2;
  const rowLeft = cx - sourcesRowWidth / 2;
  const sourceY = PAD;
  const gapAfterSources = 46;
  const mergeStartY = sourceY + smallH + gapAfterSources;
  const height = mergeStartY + merge.length * BOX_H + (merge.length - 1) * GAP + PAD;

  const sourceXs = sources.map((_, i) => rowLeft + smallW / 2 + i * (smallW + smallGap));

  return (
    <div style={CARD_STYLE}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: "480px", display: "block", margin: "0 auto", fontFamily: "'JetBrains Mono', monospace" }}>
        <ArrowDefs />

        {sources.map((step, i) => {
          const t = toneStyle(step.tone);
          const x = sourceXs[i];
          return (
            <g key={i}>
              <rect x={x - smallW / 2} y={sourceY} width={smallW} height={smallH} rx="10" fill={t.fill} stroke={t.stroke} strokeWidth="1.2" />
              <text x={x} y={sourceY + smallH / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={t.title} fontFamily="inherit">
                {step.title}
              </text>
            </g>
          );
        })}

        {sourceXs.map((x, i) => (
          <line
            key={i}
            x1={x} y1={sourceY + smallH} x2={cx} y2={mergeStartY}
            stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"
            markerEnd="url(#pipeline-arrow)"
          />
        ))}

        {merge.map((step, i) => {
          const y = mergeStartY + i * (BOX_H + GAP);
          return (
            <g key={i}>
              {i > 0 && <Arrow x={cx} y1={y - GAP} y2={y} />}
              <Box cx={cx} y={y} step={step} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
