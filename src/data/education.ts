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
    description: "Wrote and restructured university content around what readers needed, with accessibility and plain language built in from the start. I turned stakeholder briefs into pages with a clear information hierarchy, then refined each piece with the people who commissioned it until it met the brief.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Sep 2025 - Sep 2026",
    role: "MSc Human-Centred Interactive Technologies",
    org: "University of York, UK",
    type: "education",
    description: "Awarded with Distinction (74%) by York's Department of Computer Science, along with the Departmental Prize for the highest performing student in the 2025/26 cohort. Covered Research Methods, Interaction Design & Evaluation, Human Factors, and Player Experience. My dissertation investigated whether a person's ability to resist distraction predicts their performance on complex, cluttered user interfaces.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Aug - Dec 2024",
    role: "Graphic & UI Designer",
    org: "Panchal Softwares · Full-time, remote",
    type: "work",
    description: "Designed 30+ digital and UI assets for product launches across several platforms, and set up reusable typography, colour and layout guidelines that kept the interfaces consistent. I also wrote the visual specs and handover documentation, and worked with the developers to settle UI questions as they came up during the build.",
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
    description: "Graduated with First Class with Distinction, CGPA 8.61/10. Four years of learning how software is put together, which still shapes how I hand designs over to developers. I studied Animation & Multimedia at the same time, and that is what first pulled me towards interfaces.",
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
