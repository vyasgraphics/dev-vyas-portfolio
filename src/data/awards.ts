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
    link: "https://drive.google.com/drive/folders/1cbHejNRtJGICVBTJgvrGhkEwzK6HPi-g",
  },
  {
    name: "Specialisation in Animation & Multimedia",
    publisher: "Frameboxx Animation & Visual Effects",
    year: 2020,
    image: "/assets/images/section/award-3.jpg",
    link: "https://drive.google.com/drive/folders/1cbHejNRtJGICVBTJgvrGhkEwzK6HPi-g",
  },
];
