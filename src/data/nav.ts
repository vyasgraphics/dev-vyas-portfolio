export type NavItem = {
  href: string;
  label: string;
  icon: string;
  separator?: "before" | "after";
};

export const navItems: NavItem[] = [
  { href: "#home",      label: "Home",        icon: "icon-home",         separator: "after" },
  { href: "#work",      label: "Work",         icon: "icon-high-light" },
  { href: "#about",     label: "About",        icon: "icon-user-circle" },
  // { href: "#skill",   label: "Skills",       icon: "icon-service" }, // "How I Work" section commented out
  { href: "#education", label: "Background",   icon: "icon-edu" },
  { href: "#tech",      label: "Tools",        icon: "icon-tech-stack",  separator: "after" },
  { href: "#contact",   label: "Contact",      icon: "icon-send" },
];
