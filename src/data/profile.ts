export const profile = {
  fullName: "Dev Vyas",
  shortName: "Dev",
  duty: "Product & UX/UI Designer",
  // Kept to four lines at both desktop card widths (292px / 312px text
  // column): a fifth line pushes the greeting up into the "Available now"
  // tab on the card's left edge.
  introBio: "I design digital products from first research to a build-ready handover. MSc with Distinction and the Departmental Prize, University of York. Based in Leeds.",
  email: "vyasdev.6303@gmail.com",
  phone: "+447799752283",
  // Cycles after the static "I'm " on the profile card: the name first, then
  // the three titles, led by the primary identity (Product, then UX/UI).
  // The prefix is "I'm", NOT "Hey, I'm". That matters mechanically, not just
  // as tone: the prefix and the rotating word share one nowrap line, so the
  // prefix is a fixed tax on the space available to the longest title. At
  // 26px "Hey, I'm " costs about 130px and pushed "a Product Designer" past
  // the card's right edge; "I'm " costs about 58px and leaves it clear.
  rotatingNames: ["Dev Vyas", "a Product Designer", "a UX/UI Designer", "a Graphic Designer"],
  location: "Leeds, UK",
  availability: "Available now",
  // Two role-specific CVs, replacing the old combined Dev_Vyas_CV.pdf.
  cvs: [
    { label: "Product Designer CV", title: "Product Designer / UX/UI Designer CV", href: "/assets/Dev_Vyas_CV_Product_Designer.pdf" },
    { label: "Graphic Designer CV", title: "Visual / Graphic Designer CV", href: "/assets/Dev_Vyas_CV_Graphic_Designer.pdf" },
  ],
  socials: [
    { icon: "icon-linkin", href: "https://www.linkedin.com/in/dev-vyas6/", label: "LinkedIn" },
    { icon: "icon-instagram", href: "https://www.instagram.com/vyas.graphics/?hl=en", label: "Instagram" },
  ],
} as const;
