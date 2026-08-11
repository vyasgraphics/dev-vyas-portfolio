export type Skill = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  expanded: boolean;
};

// order: UI/UX → Research → AI → Graphics
export const skills: Skill[] = [
  {
    id: "skill-1",
    title: "UI / UX Design",
    description: "Interfaces people can use without thinking. Lo-fi wireframes to polished Figma prototypes, every screen traceable to a real user need.",
    tags: ["Wireframing & Prototyping", "Usability Testing", "HCD Lifecycle", "A/B Study Design"],
    images: ["/assets/images/section/skill-1.jpg", "/assets/images/section/skill-2.jpg"],
    expanded: true,
  },
  {
    id: "skill-2",
    title: "User Research",
    description: "Making sure you're solving the right problem before a single pixel moves. Interviews, thematic analysis, think-aloud studies, personas.",
    tags: ["User Interviews", "Thematic Analysis", "Persona Development", "Insight Synthesis"],
    images: ["/assets/images/section/skill-3.jpg", "/assets/images/section/skill-4.jpg"],
    expanded: false,
  },
  {
    id: "skill-3",
    title: "AI-Augmented Design",
    description: "AI for the speed, me for the judgement. Rapid concepts, faster synthesis, quicker prototypes - with real evidence still calling the shots.",
    tags: ["AI-Assisted Ideation", "Rapid Prototyping", "Research Synthesis", "Generative Workflows"],
    images: ["/assets/images/section/skill-5.jpg", "/assets/images/section/skill-6.jpg"],
    expanded: false,
  },
  {
    id: "skill-4",
    title: "Graphic Design & Brand Identity",
    description: "20+ brand identities built from scratch. Logos, systems, campaigns and print that stay recognisable and actually stick.",
    tags: ["Logo Design", "Brand Guidelines", "Social Media Campaigns", "Print & Editorial"],
    images: ["/assets/images/section/skill-7.jpg", "/assets/images/section/skill-8.jpg"],
    expanded: false,
  },
];
