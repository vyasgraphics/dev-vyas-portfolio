export type Work = {
  slug: string;
  title: string;
  description: string;
  impact: string; // Short outcome line for front-loading on the work card
  year: string;
  role: string;
  // Industry and platform are the two fields a recruiter scans for when
  // filtering candidates, and the card previously showed neither.
  industry: string;
  platform: string;
  tags: string[];
  image: string;
  imagePortrait: string;
  logo: string;
  link?: string;
};

export const works: Work[] = [
  // Recruiter-friendly order: end-to-end product process first, then the
  // quantitative HCI research, then the visual craft.
  {
    slug: "move-app",
    title: "Move - University Exercise App",
    impact: "A critical usability issue identified during testing, in the one feature built to protect anxious users, and redesigned before development",
    description: "A team concept project for an iOS exercise app. 17 questionnaire responses showed the real barrier was anxiety, not motivation, and testing with eight users showed exactly which feature needed rethinking.",
    year: "2026",
    role: "UX Researcher & Designer · Team of 4",
    industry: "EdTech · Health & Fitness",
    platform: "iOS Mobile",
    tags: ["UX Research", "Figma", "Health & Fitness", "iOS"],
    image: "/assets/images/section/work-2.jpg",
    imagePortrait: "/assets/images/section/work-2-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/move-app",
  },
  {
    slug: "dissertation",
    title: "Distraction Resistance & Complex User Interfaces",
    impact: "Surfaced a completion-time cost that success-rate metrics miss entirely",
    description: "Clutter doesn't cost everyone the same. A 42-participant quantitative study found that a person's distraction resistance tracked how long a cluttered interface took them, while accuracy barely moved.",
    year: "2026",
    role: "UX Researcher · MSc Dissertation",
    industry: "Academic Research · HCI",
    platform: "Desktop Web",
    tags: ["Academic Research", "Quantitative UX", "Prolific", "Python"],
    image: "/assets/images/section/work-1.jpg",
    imagePortrait: "/assets/images/section/work-1-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/dissertation",
  },
  {
    slug: "vyas-graphics",
    title: "Vyas Graphics - Brand Identity & Sports Media",
    impact: "20+ identities, four logo reveals and two self-initiated cricket campaigns",
    description: "Six years of self-directed brand and motion work: 20+ identities built from scratch, four animated logo reveals in After Effects, and independent, non-commercial sports media for the ICC T20 World Cup 2026.",
    year: "2020-2026",
    role: "Brand & Motion Designer",
    industry: "Brand · Sports Media",
    platform: "Print · Social · Motion",
    tags: ["Illustrator", "After Effects", "Brand Identity", "Sports Media"],
    image: "/assets/images/section/work-3.jpg",
    imagePortrait: "/assets/images/section/work-3-portrait.jpg",
    logo: "/assets/images/logo/vg-logo-white.png",
    link: "/work/vyas-graphics",
  },
];
