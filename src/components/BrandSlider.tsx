import { ImageSwitch } from "./ImageSwitch";
import { brands } from "@/data/brands";
import AutoRepeatMarquee from "./AutoRepeatMarquee";

export function BrandSlider() {
    return (
        <>
            <AutoRepeatMarquee
                direction="left"
                className="infiniteSlide-brand"
                pauseOnHover={true}
                speed={30}
                repeat={10}
            >
                {brands.map((b) => (
                    <div className="image-brand" key={b.name}>
                        <ImageSwitch
                            light={b.light}
                            dark={b.dark}
                            width={b.width}
                            height={24}
                            alt={b.name}
                        />
                    </div>
                ))}
            </AutoRepeatMarquee>
        </>
    );
}
