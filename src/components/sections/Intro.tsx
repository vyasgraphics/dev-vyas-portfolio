import { DisciplineSlider } from "@/components/DisciplineSlider";

export function Intro() {
    return (
        <div id="home" className="section-intro flat-spacing">
            <div className="intro-author effectFade fadeUp no-div">
                <div className="author-info letter-space--05">
                    <p className="info_name text-black">Dev Vyas</p>
                    <p className="info_duty text-black-50 text-body-3">
                        Product Designer
                    </p>
                </div>
            </div>

            <h1 className="intro-title letter-space--2">
                Designing interfaces backed by{" "}
                <span className="type-2 is-bg" style={{ color: "var(--primary)" }}>research</span>,{" "}
                not guesswork
            </h1>

            <div className="intro-item">
                <div className="scribble-wrap">
                    <svg className="scribble" viewBox="0 0 772 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="paint0_linear_268_462" x1="12" y1="107" x2="752" y2="66" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#F5F5F5" />
                                <stop className="bred" offset="0.466346" stopColor="#00DE51" />
                                <stop offset="1" stopColor="#F5F5F5" />
                            </linearGradient>
                        </defs>
                        <path id="scribblePath"
                            d="M12 104.315C34.6667 116.269 92.8 137.913 144 128.853C208 117.528 317 33.5324 356 27.8698C395 22.2072 502 20 530 79.1463C557.711 137.682 582 217 477 281.743C423.902 314.483 308 281.433 365 188C422 94.5672 544 65.6205 597 81.6645C650 97.7085 732 88.2708 752 64.6767"
                            stroke="url(#paint0_linear_268_462)" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="wg-curve-text">
                    <div className="icon">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/images/logo/dv-logo-source.png"
                            alt="DV"
                            width={66}
                            height={66}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div className="text-rotate">
                        <div className="circle">
                            <div className="text" id="circularText"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box-counter effectFade fadeUp no-div">
                <div className="wg-counter">
                    <p className="counter h1 d-flex font-2 letter-space--2">
                        <span className="number" data-speed="1000" data-to="4">0</span>+
                    </p>
                    <p className="text text-black-56 text-body-3">Years designing commercially</p>
                </div>
                <div className="wg-counter">
                    <p className="counter h1 d-flex font-2 letter-space--2">
                        <span className="number" data-speed="1000" data-to="25">0</span>+
                    </p>
                    <p className="text text-black-56 text-body-3">Users researched &amp; tested</p>
                </div>
            </div>

            <p className="intro-client letter-space--05 text-body-3">
                <i className="icon icon-global-elip" />
                UK &nbsp;·&nbsp; Open to UK &amp; remote roles from Sep 2026
            </p>

            <DisciplineSlider />
        </div>
    );
}
