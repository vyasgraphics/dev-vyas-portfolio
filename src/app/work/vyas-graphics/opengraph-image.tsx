import { caseStudyOgAlt, caseStudyOgSize, renderCaseStudyOgImage } from "@/lib/caseStudyOgImage";

export const alt = caseStudyOgAlt("vyas-graphics");
export const size = caseStudyOgSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderCaseStudyOgImage("vyas-graphics");
}
