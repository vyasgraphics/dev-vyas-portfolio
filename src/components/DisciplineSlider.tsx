import { disciplines } from "@/data/disciplines";
import AutoRepeatMarquee from "./AutoRepeatMarquee";

export function DisciplineSlider() {
    return (
        <AutoRepeatMarquee
            direction="left"
            className="infiniteSlide-brand"
            pauseOnHover={false}
            speed={40}
            gap={16}
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
