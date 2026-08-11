import { organisations } from "@/data/organisations";

// Wireframe: "Companies I've worked with" band, sitting right after the
// personal intro and before the case study cards - a fast credibility
// signal before a hiring manager has had to scroll or read anything.
export function Organisations() {
  return (
    <div id="organisations" className="flat-spacing" style={{ paddingTop: 0 }}>
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-stack" />
        Organisations I&apos;ve Worked With
      </div>
      <div
        className="scrolling-effect effectTop"
        style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "1.5rem" }}
      >
        {organisations.map((org) => (
          <div
            key={org.name}
            style={{
              padding: "10px 18px",
              borderRadius: "100px",
              border: "1px solid var(--black-6)",
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span className="text-body-2 fw-medium text-black-72">{org.name}</span>
            <span className="text-body-3 text-black-56">{org.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
