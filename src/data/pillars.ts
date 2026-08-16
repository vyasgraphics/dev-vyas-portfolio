export type Pillar = {
  /** Displayed as the card's index. Two digits, matching .vg-work-progress. */
  number: string;
  title: string;
  /** The qualification that backs the claim - this is what stops each card
      reading as an unevidenced adjective. */
  credential: string;
  description: string;
  icon: string;
};

// The three strands the homepage is written around, in the order they
// actually happened: the engineering degree, the animation specialisation
// taken alongside it, then the MSc that turned both towards interfaces.
// Chronology is doing real work here - it is what makes the route read as a
// deliberate progression rather than three unrelated qualifications.
export const pillars: Pillar[] = [
  {
    number: "01",
    title: "Code",
    credential: "BE Computer Science & Engineering",
    description:
      "Four years of computer science before any of the design. I read the engineering constraint behind an interface rather than designing past it, and I can build the thing when that is faster than describing it.",
    icon: "icon-gear",
  },
  {
    number: "02",
    title: "Creative",
    credential: "Specialisation in Animation & Multimedia",
    description:
      "Taken alongside the degree. It taught me that pixel-perfect is a discipline rather than a preference, and it is what pulled me from writing software towards designing the surface people actually meet.",
    icon: "icon-high-light",
  },
  {
    number: "03",
    title: "UI / UX",
    credential: "MSc Human-Centred Interactive Technologies",
    description:
      "Finishing September 2026 at the University of York. Research methods, interaction design and evaluation: the habit of designing around how people behave rather than how I assume they will.",
    icon: "icon-user-circle",
  },
];
