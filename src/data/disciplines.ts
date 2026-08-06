export type Discipline = {
  name: string;
  icon: string; // icon class from the site's icon font
};

// Shown as a scrolling marquee on the homepage - mirrors Skills section order
export const disciplines: Discipline[] = [
  { name: "UI / UX Design",         icon: "icon-service" },
  { name: "User Research",          icon: "icon-user-circle" },
  { name: "AI-Augmented Design",    icon: "icon-tech-stack" },
  { name: "Brand Identity",         icon: "icon-high-light" },
  { name: "Motion Design",          icon: "icon-edu" },
  { name: "Usability Testing",      icon: "icon-service" },
  { name: "Wireframing",            icon: "icon-high-light" },
  { name: "Print Design",           icon: "icon-edu" },
];
