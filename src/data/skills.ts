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
    description: "I design interfaces that feel natural to use - grounded in real user research, not assumptions. From lo-fi wireframes through to polished Figma prototypes, every decision is traceable back to what users actually need.",
    tags: ["Wireframing & Prototyping", "Usability Testing", "HCD Lifecycle", "A/B Study Design"],
    images: ["/assets/images/section/skill-1.jpg", "/assets/images/section/skill-2.jpg"],
    expanded: true,
  },
  {
    id: "skill-2",
    title: "User Research",
    description: "Qualitative interviews, thematic analysis, think-aloud studies, and persona development - the kind of work that makes sure you're solving the right problem before you start designing the solution.",
    tags: ["User Interviews", "Thematic Analysis", "Persona Development", "Insight Synthesis"],
    images: ["/assets/images/section/skill-3.jpg", "/assets/images/section/skill-4.jpg"],
    expanded: false,
  },
  {
    id: "skill-3",
    title: "AI-Augmented Design",
    description: "I use AI tools throughout the design process - generating rapid concept variations, accelerating research synthesis, and prototyping faster - while keeping human judgement and real user evidence firmly in the driver's seat.",
    tags: ["AI-Assisted Ideation", "Rapid Prototyping", "Research Synthesis", "Generative Workflows"],
    images: ["/assets/images/section/skill-5.jpg", "/assets/images/section/skill-6.jpg"],
    expanded: false,
  },
  {
    id: "skill-4",
    title: "Graphic Design & Brand Identity",
    description: "Logos, visual systems, social media campaigns, and print collateral - built to be consistent and recognisable. I've developed 20+ brand identities from scratch and know how to translate a client's personality into something that actually sticks.",
    tags: ["Logo Design", "Brand Guidelines", "Social Media Campaigns", "Print & Editorial"],
    images: ["/assets/images/section/skill-7.jpg", "/assets/images/section/skill-8.jpg"],
    expanded: false,
  },
];
