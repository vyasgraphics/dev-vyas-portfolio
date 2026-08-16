export const profile = {
  fullName: "Dev Vyas",
  shortName: "Dev",
  duty: "UI/UX, Product & Graphic Designer",
  introBio: "I come at design from research into how people really behave, from visual craft, and from code. Four years of commercial work and an MSc in human-centred technology, based in the United Kingdom.",
  email: "vyasdev.6303@gmail.com",
  phone: "+447799752283",
  // Cycles after the static "I'm " on the profile card: the name first, then
  // the three titles in the site's UI/UX-first order.
  // The prefix is "I'm", NOT "Hey, I'm". That matters mechanically, not just
  // as tone: the prefix and the rotating word share one nowrap line, so the
  // prefix is a fixed tax on the space available to the longest title. At
  // 26px "Hey, I'm " costs about 130px and pushed "a Product Designer" past
  // the card's right edge; "I'm " costs about 58px and leaves it clear.
  rotatingNames: ["Dev Vyas", "a UI/UX Designer", "a Product Designer", "a Graphic Designer"],
  location: "United Kingdom",
  availability: "Available Sep 2026",
  cvUrl: "/assets/Dev_Vyas_CV.pdf",
  socials: [
    { icon: "icon-linkin", href: "https://www.linkedin.com/in/dev-vyas6/", label: "LinkedIn" },
    { icon: "icon-instagram", href: "https://www.instagram.com/vyas.graphics/?hl=en", label: "Instagram" },
  ],
} as const;
