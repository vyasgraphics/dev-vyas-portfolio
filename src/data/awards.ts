export type Award = {
  name: string;
  publisher: string;
  year: number;
  image: string;
  link: string;
  /** Spans the full row above the certificates, with a green rim. For
      prizes rather than courses - there should only ever be one or two. */
  featured?: boolean;
};

export const awards: Award[] = [
  {
    // Letter from the Chair of the Board of Examiners, 11 Nov 2026. Wording
    // matches both CVs and the LinkedIn post. The prize money is
    // deliberately not shown.
    name: "Departmental Prize - Highest Performing Student",
    publisher: "University of York · 2025/26 MSc Human-Centred Interactive Technologies cohort",
    year: 2026,
    image: "",
    link: "https://www.linkedin.com/posts/dev-vyas6_universityofyork-academicexcellence-humancentreddesign-share-7526595150370959360-L5bl/",
    featured: true,
  },
  {
    name: "Google UX Design Professional Certificate",
    publisher: "Coursera",
    year: 2025,
    image: "/assets/images/section/award-1.jpg",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/TUYJBE5G2KB2?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
  },
  {
    name: "Adobe Graphic Designer: Design that Demands Attention",
    publisher: "Coursera",
    year: 2025,
    image: "/assets/images/section/award-2.jpg",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/Q6V876IAF0YS",
  },
  {
    // Manual line break before "Business Intelligence" - this title runs
    // long enough on desktop that without it, the wrapped first line runs
    // right up against the "2025" year column, reading cramped. The break
    // relies on white-space: pre-line on .award_name (see styles.css).
    name: "Advanced Certification in Data Science with Specialisation in\nBusiness Intelligence & Data Analytics",
    publisher: "International Institute of Information Technology Bangalore",
    year: 2025,
    image: "/assets/images/section/award-4.jpg",
    link: "https://www.credential.net/599465c5-2e95-4faf-b0b8-de630c32e02d#acc.rUNpOE4W",
  },
  {
    name: "Specialisation in Animation & Multimedia",
    publisher: "Frameboxx Animation & Visual Effects",
    year: 2020,
    image: "/assets/images/section/award-3.jpg",
    // No public verification page for this one, so the row links straight
    // to the certificate image itself (opens in a new tab, same as the
    // other rows - target="_blank" is already set on every award link).
    link: "/assets/images/section/certificate-frameboxx.jpg",
  },
];
