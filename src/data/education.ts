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
    org: "University of York, UK",
    type: "work",
    description: "Took complex university briefs and restructured them around what readers actually needed, building clear information hierarchies and refining each piece with stakeholders against accessibility and readability principles. A good reminder that good design and good writing come from the same place: knowing your audience.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Sep 2025 - Sep 2026",
    role: "MSc Human-Centred Interactive Technologies",
    org: "University of York, UK",
    type: "education",
    description: "Studies completed at York's Department of Computer Science with a provisional credit-weighted average of 74.1%, final award pending. Covered Research Methods, Interaction Design & Evaluation, Human Factors, and Player Experience. My dissertation, provisionally marked at 75%, investigated whether a person's ability to resist distraction predicts their performance on complex, cluttered user interfaces.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Aug - Dec 2024",
    role: "Graphic & UI Designer",
    org: "Panchal Softwares · Remote",
    type: "work",
    description: "Designed 30+ digital and visual assets for product launches across multiple platforms, and wrote reusable typography, colour and layout guidelines so design and development worked from one shared reference. Organising assets and specs for developer handover was a small structural change that made a real practical difference to the whole team.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jan 2023 - Jan 2024",
    role: "Design Lead & Mentor",
    org: "Google Developer Student Club",
    type: "work",
    description: "Led visual design for 8 technology events reaching a combined audience of 500+ attendees, while mentoring five team members through UI/UX workshops and design reviews. One of those roles where you learn just as much from teaching as from doing.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "2020 - 2024",
    role: "B.E. Computer Science & Engineering",
    org: "Gujarat Technological University, India",
    type: "education",
    description: "Graduated with a CGPA of 8.61, First Class with Distinction. Four years of learning how technology actually works, which is why I can read the engineering constraints behind an interface rather than designing past them. Taken alongside a specialisation in Animation & Multimedia, which is what pulled me towards interfaces in the first place.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jun 2020 - Apr 2023",
    role: "UI/UX & Visual Consultant",
    org: "Non-profit Organisations · Remote",
    type: "work",
    description: "Created 20+ visual identities and brand assets, managing briefs and feedback through to final delivery, and mapped user journeys, wireframes and mobile-first web interfaces for selected clients. Completed 12 projects, with six clients coming back for more. An early lesson in working independently, managing expectations, and caring about the finish.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
];
