export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
};

// Placeholder posts - replace with real writing when ready
export const blogPosts: BlogPost[] = [
  {
    slug: "ai-in-ux-research",
    title: "How AI Actually Fits Into a UX Research Workflow (And Where It Still Can't Replace You)",
    excerpt: "Notes from using AI tools alongside traditional research methods - what speeds things up, and where human judgement still has to lead.",
    date: "Coming soon",
    readTime: "8 min read",
    tag: "UX Research",
    image: "/assets/images/section/blog-1.jpg",
  },
  {
    slug: "dissertation-notes",
    title: "What My Dissertation Taught Me About Complex Interfaces",
    excerpt: "A behind-the-scenes look at designing a distraction-resistance study, and what the early data is starting to show.",
    date: "Coming soon",
    readTime: "7 min read",
    tag: "Research",
    image: "/assets/images/section/blog-2.jpg",
  },
  {
    slug: "building-move-app",
    title: "From Lo-Fi to Live: Building Move App End to End",
    excerpt: "A full walkthrough of the HCD lifecycle behind Move - from the first user interview to the final A/B study proposal.",
    date: "Coming soon",
    readTime: "6 min read",
    tag: "Case Study",
    image: "/assets/images/section/blog-3.jpg",
  },
];
