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
    description: "Rewrote university content around what readers needed, with accessibility and plain language built in, and refined each page with the stakeholders who commissioned it.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Sep 2025 - Sep 2026",
    role: "MSc Human-Centred Interactive Technologies",
    org: "University of York, UK",
    type: "education",
    description: "Distinction (74%) and the Departmental Prize for the highest performing student in the 2025/26 cohort. Dissertation on whether resistance to distraction predicts performance on cluttered interfaces.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Aug - Dec 2024",
    role: "Graphic & UI Designer",
    org: "Panchal Softwares · Full-time, remote",
    type: "work",
    description: "Designed 30+ UI and digital assets for product launches, set up shared typography, colour and layout guidelines, and wrote the handover specs for developers.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jan 2023 - Jan 2024",
    role: "Design Lead & Mentor",
    org: "Google Developer Student Clubs · Part-time",
    type: "work",
    description: "Led visual design for 8 tech events reaching 500+ attendees, and mentored five team members through UI/UX workshops and design reviews.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jun 2020 - Jun 2024",
    role: "B.E. Computer Science & Engineering",
    org: "Gujarat Technological University, India",
    type: "education",
    description: "First Class with Distinction, CGPA 8.61/10. Knowing how software is built still shapes how I hand designs over to developers.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jun 2020 - Apr 2023",
    role: "UI/UX & Visual Consultant",
    org: "Non-profit Organisations · Remote",
    type: "work",
    description: "Created 20+ visual identities and brand assets for non-profit organisations, plus user journeys, wireframes and mobile-first web interfaces. 12 projects, six repeat clients.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
];
