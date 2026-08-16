export const profile = {
  fullName: "Dev Vyas",
  shortName: "Dev",
  duty: "UI/UX, Product & Graphic Designer",
  introBio: "I come at design from research into how people really behave, from visual craft, and from code. Four years of commercial work and an MSc in human-centred technology, based in York, UK.",
  email: "vyasdev.6303@gmail.com",
  phone: "+447799752283",
  // The profile card is now the only place in the identity block that says
  // "UX Researcher" out loud - the hero duty line gave that slot to the
  // third design title. Keep it here: the research credential is the
  // differentiator, it just is not the job title being applied for.
  rotatingNames: ["Dev Vyas", "a Product Designer", "a UI/UX Designer", "a UX Researcher", "a Graphic Designer"],
  location: "York, United Kingdom",
  availability: "Available Sep 2026",
  cvUrl: "/assets/Dev_Vyas_CV.pdf",
  socials: [
    { icon: "icon-linkin", href: "https://www.linkedin.com/in/dev-vyas6/", label: "LinkedIn" },
    { icon: "icon-instagram", href: "https://www.instagram.com/vyas.graphics/?hl=en", label: "Instagram" },
  ],
} as const;
