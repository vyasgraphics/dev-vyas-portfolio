export type Scenario = {
  letter: string;
  color: string;
  title: string;
  subtitle: string;
  problem: { label: string; icon: "anxiety" | "gap"; badge?: string; context: string; outcome: string };
  solution: { label: string; icon: "video" | "smart-gap"; caption: string; context: string; outcome: string };
};

export const scenarios: Scenario[] = [
  {
    letter: "L",
    color: "#3b82f6",
    title: "Scenario Set 1: Liam (Psychological Safety)",
    subtitle: "Addressing \u201cFeeling self-conscious\u201d (18%) & \u201cIntention-Action Gap\u201d (47%).",
    problem: {
      label: "1. Problem: \u201cThe Retreat\u201d",
      icon: "anxiety",
      badge: "ANXIETY SPIKE",
      context: "Liam approaches the gym but sees a large group. Lacking info, his \u201cfear of looking stupid\u201d triggers a freeze response.",
      outcome: "He turns around and walks home.",
    },
    solution: {
      label: "2. Solution: \u201cVisual Proof\u201d",
      icon: "video",
      caption: "LOW CROWD",
      context: "App suggests \u201cHidden Library Walk\u201d and offers a 10s Video Preview (Requested by 53%).",
      outcome: "The video proves the path is empty. Ambiguity removed.",
    },
  },
  {
    letter: "M",
    color: "#10b981",
    title: "Scenario Set 2: Maya (Efficiency)",
    subtitle: "Addressing \u201cLack of free time\u201d (47%) & Timetable Consent (71%).",
    problem: {
      label: "1. Problem: \u201cLogistics Paralysis\u201d",
      icon: "gap",
      context: "Maya has a gap but tries to mentally calculate travel + workout + shower time. Cognitive load is too high.",
      outcome: "She decides \u201cI don\u2019t have time\u201d and scrolls on her phone.",
    },
    solution: {
      label: "2. Solution: \u201cSmart Gap\u201d",
      icon: "smart-gap",
      caption: "Gap Detected (2 hrs) - You have time for \u2018Campus East Loop\u2019 (20 mins).",
      context: "The app auto-syncs with her Outlook timetable, detects the gap, and performs the \u201cmental maths\u201d.",
      outcome: "Logistics solved instantly. Maya trusts the system and accepts.",
    },
  },
];
