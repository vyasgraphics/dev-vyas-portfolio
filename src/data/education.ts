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
    period: "Oct 2025 - Present",
    role: "Student Content Creator",
    org: "University of York, UK",
    type: "work",
    description: "Took complex university briefs and turned them into clear, readable blog posts that people actually wanted to read - lifting engagement by 30% across three articles. A good reminder that good design and good writing come from the same place: knowing your audience.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "2025 - Present",
    role: "MSc Human-Centred Interactive Technologies",
    org: "University of York, UK",
    type: "education",
    description: "Completing September 2026 at York's Department of Computer Science, covering Research Methods, Interaction Design & Evaluation, Human Factors, and Player Experience. My dissertation investigates whether a person's ability to resist distraction predicts their performance on complex, cluttered user interfaces.",
    icon: { light: "/assets/images/item/edu-2.svg", dark: "/assets/images/item/edu-2_dark.svg", width: 29, height: 32 },
  },
  {
    period: "Aug - Dec 2024",
    role: "Graphic & UI Designer",
    org: "Panchal Softwares · Remote",
    type: "work",
    description: "Designed 30+ social media visuals for product launches and properly sorted the design-to-dev handoff - organising 500+ files in a way that cut developer back-and-forth by 25%. A small structural change that made a real practical difference to the whole team.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
  {
    period: "Jan 2023 - Jan 2024",
    role: "Design Lead & Mentor",
    org: "Google Developer Student Club",
    type: "work",
    description: "Led the visual identity for 8 events reaching 500+ students, while mentoring five junior designers through real UI/UX projects. Created 15+ promo graphics that boosted event sign-ups by 50 attendees. One of those roles where you learn just as much from teaching as from doing.",
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
    description: "Built 20+ brand identities from scratch and delivered wireframes and mobile-first designs for five clients across different sectors - completing all 12 projects on schedule. An early lesson in working independently, managing expectations, and caring about the finish.",
    icon: { light: "/assets/images/item/edu-3.svg", dark: "/assets/images/item/edu-3_dark.svg", width: 120, height: 32 },
  },
];
