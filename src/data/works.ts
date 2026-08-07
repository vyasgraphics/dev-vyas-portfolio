export type Work = {
  slug: string;
  title: string;
  description: string;
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
    description: "MSc capstone research investigating whether a person's intrinsic ability to resist distraction predicts their performance on a visually cluttered news article search task. Conducted as a quantitative online study via Prolific, measuring Visual Working Memory distraction resistance against a complex real-world UI. Analysed in SPSS with reading speed as a control variable.",
    year: "2026",
    role: "UX Researcher · MSc Dissertation",
    tags: ["Quantitative Research", "Python", "Prolific", "Complex UI"],
    image: "/assets/images/section/work-1.jpg",
    imagePortrait: "/assets/images/section/work-1-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/dissertation",
  },
  {
    slug: "move-app",
    title: "Move - University Exercise App",
    description: "A full HCD lifecycle project tackling how to get students moving despite time pressures and fear of judgement. Ran user research (n=17), built personas, prototyped in Figma, and conducted think-aloud testing with 8 users - ending with an A/B study proposal.",
    year: "2025",
    role: "UX Researcher & Designer",
    tags: ["UX Research", "Figma", "Lo-Fi Prototype", "A/B Study"],
    image: "/assets/images/section/work-2.jpg",
    imagePortrait: "/assets/images/section/work-2-portrait.jpg",
    logo: "/assets/images/logo/logo-dv.svg",
    link: "/work/move-app",
  },
  {
    slug: "vyas-graphics",
    title: "Vyas Graphics - Brand Identity & Sports Media",
    description: "Self-directed brand and motion work spanning logo design in Illustrator, four animated logo reveal variants in After Effects, and a full sports media campaign for the ICC T20 World Cup 2026 - tournament promos, match-day posters, and a 15-player champions composite.",
    year: "2024-2026",
    role: "Brand & Motion Designer",
    tags: ["Illustrator", "After Effects", "Brand Identity", "Sports Media"],
    image: "/assets/images/section/work-3.jpg",
    imagePortrait: "/assets/images/section/work-3-portrait.jpg",
    logo: "/assets/images/logo/vg-logo-white.png",
    link: "/work/vyas-graphics",
  },
];
