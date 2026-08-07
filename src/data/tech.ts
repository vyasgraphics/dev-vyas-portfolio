export type TechCategory = {
  label: string;
  tools: { name: string; image: string }[];
};

// Order follows the actual shape of the design process: designing first,
// then the AI-augmented layer on top of both design and development, then
// the quantitative/data side of the research work, then coding (AI-assisted
// and full custom), then the graphics/motion work that finishes a piece.
export const techCategories: TechCategory[] = [
  {
    label: "UI / UX",
    tools: [
      { name: "Figma",      image: "/assets/images/section/tech-figma.svg" },
      { name: "Adobe XD",   image: "/assets/images/section/tech-xd.svg" },
      { name: "Framer",     image: "/assets/images/section/tech-framer.svg" },
    ],
  },
  {
    label: "AI for UX",
    tools: [
      { name: "Claude",          image: "/assets/images/section/tech-claude.svg" },
      { name: "Gemini",          image: "/assets/images/section/tech-gemini.svg" },
      { name: "Gemini Notebook", image: "/assets/images/section/tech-gemini-notebook.svg" },
    ],
  },
  {
    label: "Quantitative Data Analysis",
    tools: [
      { name: "Python",         image: "/assets/images/section/tech-python.svg" },
      { name: "Jupyter Notebook", image: "/assets/images/section/tech-jupyter.svg" },
      { name: "Google Colab",   image: "/assets/images/section/tech-colab.svg" },
    ],
  },
  {
    label: "Vibe Coding",
    tools: [
      { name: "Claude Code", image: "/assets/images/section/tech-claude-code.svg" },
      { name: "Lovable",     image: "/assets/images/section/tech-lovable.svg" },
      { name: "Bolt",        image: "/assets/images/section/tech-bolt.svg" },
    ],
  },
  {
    label: "Web Development",
    tools: [
      { name: "HTML5",       image: "/assets/images/section/tech-html.svg" },
      { name: "CSS3",        image: "/assets/images/section/tech-css.svg" },
      { name: "JavaScript",  image: "/assets/images/section/tech-js.svg" },
      { name: "Next.js",     image: "/assets/images/section/tech-nextjs.svg" },
    ],
  },
  {
    label: "Graphics",
    tools: [
      { name: "Illustrator",   image: "/assets/images/section/tech-ai.svg" },
      { name: "Photoshop",     image: "/assets/images/section/tech-ps.svg" },
      { name: "After Effects", image: "/assets/images/section/tech-ae.svg" },
      { name: "InDesign",      image: "/assets/images/section/tech-id.svg" },
      { name: "Premiere Pro",  image: "/assets/images/section/tech-pr.svg" },
    ],
  },
];

export const techStack = techCategories.flatMap(c => c.tools.map(t => ({
  name: t.name, duty: "", image: { light: t.image, width: 28, height: 28 }, progress: 80,
})));
