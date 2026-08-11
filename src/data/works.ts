export type Work = {
  slug: string;
  title: string;
  description: string;
  impact: string; // Short outcome line for front-loading on the work card
  year: string;
  role: string;
  tags: string[];
  image: string;
  imagePortrait: string;
  logo: string;
  link?: string;
};

export const works: Work[] = [
  {
    slug: "dissertation",
    title: "Distraction Resistance & Complex User Interfaces",
    impact: "Surfaced a completion-time cost that success-rate metrics miss entirely",
    description: "Visual clutter is not a flat tax - it costs some users nearly half their time and barely touches others. A quantitative study (via Prolific, analysed in SPSS) that measured a hidden cognitive trait against real-world UI performance, surfacing a cost that success-rate metrics never catch.",
    year: "2026",
    role: "UX Researcher · MSc Dissertation",
    tags: ["Academic Research", "Quantitative UX", "Prolific", "SPSS"],
    image: "/assets/images/section/work-1.jpg",
    imagePortrait: "/assets/images/section/work-1-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/dissertation",
  },
  {
    slug: "move-app",
    title: "Move - University Exercise App",
    impact: "Reduced anxiety friction enough that stalled users finished their first session",
    description: "Cutting choices and hiding the crowd got test participants who had stalled on other apps to actually finish a session. A full HCD lifecycle - 17 user interviews, personas, Figma prototyping, think-aloud testing with 8 users - that found the barrier was anxiety, not motivation.",
    year: "2025",
    role: "UX Researcher & Designer",
    tags: ["UX Research", "Figma", "Health & Fitness", "iOS"],
    image: "/assets/images/section/work-2.jpg",
    imagePortrait: "/assets/images/section/work-2-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/move-app",
  },
  {
    slug: "vyas-graphics",
    title: "Vyas Graphics - Brand Identity & Sports Media",
    impact: "20+ identities and a full ICC tournament campaign, all shipped to deadline",
    description: "Six years of self-directed brand and motion work - 20+ identities built from scratch, four animated logo reveal variants in After Effects, and a full ICC T20 World Cup 2026 sports media campaign shipped to deadline.",
    year: "2020-2026",
    role: "Brand & Motion Designer",
    tags: ["Illustrator", "After Effects", "Brand Identity", "Sports Media"],
    image: "/assets/images/section/work-3.jpg",
    imagePortrait: "/assets/images/section/work-3-portrait.jpg",
    logo: "/assets/images/logo/vg-logo-white.png",
    link: "/work/vyas-graphics",
  },
];
