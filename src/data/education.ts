export type TimelineItem = {
  period: string;
  role: string;
  description: string;
  type: "education" | "work";
  org: string;
  icon: { light: string; dark?: string; width: number; height: number };
};

export const educationItems: TimelineItem[] = [
  {
    period: "Oct 2025 - Aug 2026",
    role: "Student Content Creator",
    org: "University of York · Contract, on-site",
    type: "work",
    description: "Created and refined university content with a focus on audience needs, accessibility and clear digital communication. I translated stakeholder briefs into structured content with a clearer information hierarchy, organised information around what readers needed, and refined each piece with university stakeholders against the project requirements and their feedback.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Sep 2025 - Sep 2026",
    role: "MSc Human-Centred Interactive Technologies",
    org: "University of York, UK",
    type: "education",
    description: "Awarded with Distinction (74%) by York's Department of Computer Science. Covered Research Methods, Interaction Design & Evaluation, Human Factors, and Player Experience. My dissertation investigated whether a person's ability to resist distraction predicts their performance on complex, cluttered user interfaces.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Aug - Dec 2024",
    role: "Graphic & UI Designer",
    org: "Panchal Softwares · Full-time, remote",
    type: "work",
    description: "Designed 30+ digital and UI assets for product launches across multiple platforms, and developed reusable typography, colour and layout guidelines to keep interfaces consistent. I prepared design assets, visual specifications and developer handover documentation, and worked across design and development to clarify UI requirements during implementation.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jan 2023 - Jan 2024",
    role: "Design Lead & Mentor",
    org: "Google Developer Student Clubs · Part-time",
    type: "work",
    description: "Led visual design for 8 technology events reaching a combined audience of 500+ attendees, while mentoring five team members through UI/UX workshops and design reviews. One of those roles where you learn just as much from teaching as from doing.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jun 2020 - Jun 2024",
    role: "B.E. Computer Science & Engineering",
    org: "Gujarat Technological University, India",
    type: "education",
    description: "Graduated with First Class with Distinction, CGPA 8.61/10. Four years of learning how technology actually works, which is why I can read the engineering constraints behind an interface rather than designing past them. Taken alongside a specialisation in Animation & Multimedia, which is what pulled me towards interfaces in the first place.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jun 2020 - Apr 2023",
    role: "UI/UX & Visual Consultant",
    org: "Non-profit Organisations · Remote",
    type: "work",
    description: "Independent design work for non-profit organisations. Created 20+ visual identities and brand assets, managing briefs and feedback through to final delivery, and mapped user journeys, wireframes and mobile-first web interfaces for selected projects. Completed 12 projects, with six clients coming back for more. An early lesson in working independently, managing expectations, and caring about the finish.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
];
