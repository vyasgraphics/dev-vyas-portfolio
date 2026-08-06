import { disciplines } from "@/data/disciplines";
import AutoRepeatMarquee from "./AutoRepeatMarquee";

export function DisciplineSlider() {
    return (
        <AutoRepeatMarquee
            direction="left"
            className="infiniteSlide-brand"
            pauseOnHover={true}
            speed={28}
            repeat={6}
        >
            {disciplines.map((d) => (
                <div
                    className="discipline-pill"
                    key={d.name}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        borderRadius: "100px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.03)",
                        whiteSpace: "nowrap",
                    }}
                >
                    <i className={`icon ${d.icon}`} style={{ fontSize: "13px", color: "#00C853" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.01em" }}>
                        {d.name}
                    </span>
                </div>
            ))}
        </AutoRepeatMarquee>
    );
}
