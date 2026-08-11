export type Organisation = {
  name: string;
  role: string;
};

// Text treatment, not logo images - no logo assets exist for these and
// downloading third-party marks (particularly Google's) to self-host
// risks misusing a trademark. The Portfolio Wireframe course itself notes
// this is fine: "not everyone has household names - include whatever
// companies you've worked with." "Non-profit Organisations" from the
// education timeline is deliberately left out here since it names no
// single entity - a credibility band needs something a reader can
// actually recognise or look up.
export const organisations: Organisation[] = [
  { name: "University of York", role: "Student Content Creator" },
  { name: "Google Developer Student Club", role: "Design Lead & Mentor" },
  { name: "Panchal Softwares", role: "Graphic & UI Designer" },
];
