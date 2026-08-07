import { disciplines } from "@/data/disciplines";
import AutoRepeatMarquee from "./AutoRepeatMarquee";

export function DisciplineSlider() {
    return (
        // repeat={8} ensures 64 pill instances render immediately on SSR
        // so the marquee has enough content to scroll before JS measures
        // the container width. autoFill in AutoRepeatMarquee backs this up.
        // Without an explicit repeat, the initial state is 1 set of 8 pills —
        // on mobile that's only 2-3 visible and the ResizeObserver hasn't
        // fired yet, so no scrolling animation appears.
        <AutoRepeatMarquee
            direction="left"
            className="infiniteSlide-brand"
            pauseOnHover={false}
            speed={40}
            gap={16}
            repeat={8}
        >
            {disciplines.map((d) => (
                <div
                    className="image-brand"
                    key={d.name}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.04)",
                        whiteSpace: "nowrap",
                    }}
                >
                    <i className={`icon ${d.icon}`} style={{ fontSize: "12px", color: "#00C853" }} />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                        {d.name}
                    </span>
                </div>
            ))}
        </AutoRepeatMarquee>
    );
}
