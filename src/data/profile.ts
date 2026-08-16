export const profile = {
  fullName: "Dev Vyas",
  shortName: "Dev",
  duty: "UI/UX, Product & Graphic Designer",
  introBio: "I come at design from research into how people really behave, from visual craft, and from code. Four years of commercial work and an MSc in human-centred technology, based in the United Kingdom.",
  email: "vyasdev.6303@gmail.com",
  phone: "+447799752283",
  // Rotates on the SECOND line of the profile card greeting; the name is now
  // static on the first line. Splitting them is what stopped the longest
  // title running off the card's right edge - previously "Hey, I'm " and the
  // rotating title shared one nowrap line and overflowed.
  // Order matches the site's UI/UX-first ordering.
  rotatingRoles: ["a UI/UX Designer", "a Product Designer", "a Graphic Designer"],
  location: "United Kingdom",
  availability: "Available Sep 2026",
  cvUrl: "/assets/Dev_Vyas_CV.pdf",
  socials: [
    { icon: "icon-linkin", href: "https://www.linkedin.com/in/dev-vyas6/", label: "LinkedIn" },
    { icon: "icon-instagram", href: "https://www.instagram.com/vyas.graphics/?hl=en", label: "Instagram" },
  ],
} as const;
