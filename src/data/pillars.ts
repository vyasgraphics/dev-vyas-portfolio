export type Pillar = {
  /** Displayed as the card's index. Two digits, matching .vg-work-progress. */
  number: string;
  title: string;
  /** The qualification that backs the claim - this is what stops each card
      reading as an unevidenced adjective. */
  credential: string;
  /** Three short lines, not a paragraph. Each one should stand on its own at
      a glance; the cards are ~280px wide on desktop, so anything over about
      70 characters wraps to three lines and stops being scannable. */
  points: string[];
  icon: string;
};

// Ordered by the WORKFLOW, not by chronology: research decides what to build,
// craft decides whether anyone wants to use it, code decides whether it ships.
//
// This deliberately runs opposite to the qualifications' actual dates (the BE
// came first, the MSc last), and opposite to the Education timeline further
// down the page, which stays in true date order because that section is
// explicitly about the route taken. The two orderings answer different
// questions - "how do you work?" here, "how did you get here?" there - and
// should not be re-synced to match each other.
export const pillars: Pillar[] = [
  {
    number: "01",
    title: "UI / UX",
    credential: "MSc Human-Centred Interactive Technologies",
    points: [
      "Where every project starts",
      "Research methods, interaction design and evaluation",
      "Designing around how people behave, not how I assume they will",
      "Finishing September 2026, University of York",
    ],
    icon: "icon-user-circle",
  },
  {
    number: "02",
    title: "Creative",
    credential: "Specialisation in Animation & Multimedia",
    points: [
      "Taken alongside my computer science degree",
      "Pixel-perfect as a discipline, not a preference",
      "It turns a correct design into one people want to use",
      "20+ brand identities built from scratch",
    ],
    icon: "icon-high-light",
  },
  {
    number: "03",
    title: "Code",
    credential: "BE Computer Science & Engineering",
    points: [
      "The degree that came first",
      "I read the engineering constraints rather than design past them",
      "I can build it myself when that is faster than describing it",
      "First Class with Distinction, CGPA 8.61",
    ],
    icon: "icon-gear",
  },
];
