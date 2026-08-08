export type RejectedConcept = {
  number: string;
  title: string;
  target: string;
  conflict: string;
  accent: string; // hex
  accentSoft: string; // rgba
  hypothesis: string;
  dataPoints: string[];
  conclusion: React.ReactNode;
  conclusionText: string;
  panels: { label: string; icon: "trigger" | "feature-leaderboard" | "reaction" | "rejection-trash" | "opportunity" | "feature-form" | "friction" | "rejection-coffee"; caption: string }[];
};

export const rejectedConcepts: RejectedConcept[] = [
  {
    number: "1",
    title: "Rejected: \u201cThe Social Leaderboard\u201d",
    target: "Liam (Anxiety)",
    conflict: "Fear of Judgement",
    accent: "#f87171",
    accentSoft: "rgba(248,113,113,0.12)",
    hypothesis: "Gamification would drive motivation.",
    dataPoints: [
      "18% cited \u201cFeeling judged\u201d as a barrier.",
      "Users explicitly stated a hatred for competitive sports.",
    ],
    conclusion: null,
    conclusionText: "Replaced with \u201cQuiet Mode\u201d.",
    panels: [
      { label: "1. The Trigger", icon: "trigger", caption: "Liam finishes a walk. Feels proud." },
      { label: "2. The Feature", icon: "feature-leaderboard", caption: "App compares him to athletes." },
      { label: "3. The Reaction", icon: "reaction", caption: "Anxiety spike. \u201cI don\u2019t belong here.\u201d" },
      { label: "4. Rejection", icon: "rejection-trash", caption: "Abandonment." },
    ],
  },
  {
    number: "2",
    title: "Rejected: \u201cThe Manual Planner\u201d",
    target: "Maya (Efficiency)",
    conflict: "High Interaction Cost",
    accent: "#fb923c",
    accentSoft: "rgba(251,146,60,0.12)",
    hypothesis: "Users want manual control.",
    dataPoints: [
      "47% blocked by \u201cLack of free time\u201d. Manual entry adds friction.",
      "71% willing to share timetable data.",
    ],
    conclusion: null,
    conclusionText: "Replaced with \u201cAuto-Sync\u201d (Gap Finder).",
    panels: [
      { label: "1. Opportunity", icon: "opportunity", caption: "Maya has a brief gap." },
      { label: "2. The Feature", icon: "feature-form", caption: "Manual form filling." },
      { label: "3. The Friction", icon: "friction", caption: "\u201cI don\u2019t have time for this.\u201d" },
      { label: "4. Rejection", icon: "rejection-coffee", caption: "Goes to cafe. Opportunity missed." },
    ],
  },
];
