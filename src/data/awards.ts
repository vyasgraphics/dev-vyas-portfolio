export type Award = {
  name: string;
  publisher: string;
  year: number;
  image: string;
  link: string;
};

export const awards: Award[] = [
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
    name: "Advanced Certification in Data Science with Specialisation in Business Intelligence & Data Analytics",
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
