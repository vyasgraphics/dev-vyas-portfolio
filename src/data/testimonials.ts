export type Testimonial = {
  text: string;
  authorName: string;
  authorRole: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    text: "Working with Isak was seamless. The website came out fast, modern, and easy to update-exactly what our team needed.",
    authorName: "Daniel Ruiz",
    authorRole: "Head of Product, Tempo App",
    image: "/assets/images/section/tes-1.jpg",
  },
  {
    text: "Isak shaped our vision into a strong brand. The process was clear, fast, and the result gave our startup the professional edge we needed.",
    authorName: "Sophia Lee",
    authorRole: "Co-Founder, Horizon Finance",
    image: "/assets/images/section/tes-2.jpg",
  },
  {
    text: "Despite a tight launch schedule, Isak delivered a clean, flexible site in Framer. It’s modern, easy to manage, and fits our needs perfectly.",
    authorName: "Michael Anders",
    authorRole: "Marketing Director, Flowly",
    image: "/assets/images/section/tes-3.jpg",
  },
];
