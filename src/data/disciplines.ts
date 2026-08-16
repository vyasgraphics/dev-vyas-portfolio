export type Discipline = {
  name: string;
  icon: string; // icon class from the site's icon font
};

// Shown as a scrolling marquee on the homepage. Ordered to follow the three
// pillars the page is built around - UI/UX, then the research under it, then
// the AI layer, then the code and the creative craft either side of it.
export const disciplines: Discipline[] = [
  { name: "UI / UX Design",         icon: "icon-service" },
  { name: "User Research",          icon: "icon-user-circle" },
  { name: "AI-Augmented Design",    icon: "icon-tech-stack" },
  { name: "Front-End Development",  icon: "icon-gear" },
  { name: "Brand Identity",         icon: "icon-high-light" },
  { name: "Motion Design",          icon: "icon-edu" },
  { name: "Usability Testing",      icon: "icon-service" },
  { name: "Wireframing",            icon: "icon-high-light" },
  { name: "Print Design",           icon: "icon-edu" },
];
