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
  logo: string;
  link?: string;
};

export const works: Work[] = [
  // Recruiter-friendly order: end-to-end product process first, then the
  // quantitative HCI research, then the visual craft.
  {
    slug: "move-app",
    title: "Move - University Exercise App",
    impact: "Testing caught a flaw in the feature built for anxious users, redesigned before build",
    description: "An iOS app concept that helps anxious students start exercising, designed and tested by a team of four.",
    year: "2026",
    role: "UX Researcher & Designer · Team of 4",
    industry: "EdTech · Health & Fitness",
    platform: "iOS Mobile",
    tags: ["UX Research", "Figma", "iOS"],
    image: "/assets/images/section/work-2.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/move-app",
  },
  {
    slug: "dissertation",
    title: "Distraction Resistance & Complex User Interfaces",
    impact: "Found a time cost of clutter that success-rate metrics miss",
    description: "MSc research into whether cluttered interfaces slow some people down more than others.",
    year: "2026",
    role: "UX Researcher · MSc Dissertation",
    industry: "Academic Research · HCI",
    platform: "Desktop Web",
    tags: ["Quantitative UX", "Prolific", "Python"],
    image: "/assets/images/section/work-1.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/dissertation",
  },
  {
    slug: "vyas-graphics",
    title: "Vyas Graphics - Brand Identity & Sports Media",
    impact: "20+ identities, four logo reveals and two cricket campaigns",
    description: "Six years of self-directed brand and motion design, from logos to cricket campaigns.",
    year: "2020-2026",
    role: "Brand & Motion Designer",
    industry: "Brand · Sports Media",
    platform: "Print · Social · Motion",
    tags: ["Brand Identity", "Illustrator", "After Effects"],
    image: "/assets/images/section/work-3.jpg",
    logo: "/assets/images/logo/vg-logo-white.png",
    link: "/work/vyas-graphics",
  },
];
