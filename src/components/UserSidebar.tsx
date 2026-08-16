"use client";

import { ImageSwitch } from "./ImageSwitch";
import { profile } from "@/data/profile";
import { smoothScrollTo } from "@/lib/smoothScroll";

type UserSidebarProps = {
    variant?: "v1" | "v2" | "v3";
};

export function UserSidebar({ variant = "v1" }: UserSidebarProps) {
    const showMetaLeft = variant !== "v2";
    const dotIsInline = variant === "v2";

    return (
        <div className="sidebar-user">
            <div className="wrap">
                <div className="user-image">
                    <div className="image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            width={468}
                            height={856}
                            src="/assets/images/avatar/avatar.webp"
                            alt="Dev Vyas"
                            fetchPriority="high"
                            decoding="async"
                            style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                    </div>
                    {/* Gradient overlay so bottom text is always readable */}
                    <div style={{
                        position: "absolute",
                        bottom: 0, left: 0, right: 0,
                        height: "85%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 65%, transparent 100%)",
                        borderRadius: "0 0 18px 18px",
                        pointerEvents: "none",
                        zIndex: 1,
                    }} />
                    {showMetaLeft && (
                        <div className="meta-left d-none d-sm-block">
                            <div className="bg-item-svg">
                                <ImageSwitch
                                    light="/assets/images/item/vector-user.svg"
                                    dark="/assets/images/item/vector-user_dark.svg"
                                    width={32}
                                    height={227}
                                />
                            </div>
                            {/* Force white: original uses text-black-72 which goes invisible in dark */}
                            <p className="avaiable-dot vertical fw-medium text-body-3"
                               style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                                <span className="text-vertical">Available Sep 2026</span>
                                <span className="dot" />
                            </p>
                        </div>
                    )}
                </div>

                {/* DV logo - Dev's own design */}
                <div className="user-logo d-none d-lg-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/images/logo/dv-logo-source.png"
                        alt="Dev Vyas"
                        width={40}
                        height={40}
                        style={{ objectFit: "contain", width: "40px", height: "40px" }}
                    />
                </div>

                {/* Social icons - real SVGs for LinkedIn, Instagram, Behance, Gmail */}
                <ul className="tf-social-icon-2 user-social d-grid">
                    <li>
                        <a href="https://www.linkedin.com/in/dev-vyas6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/images/social/linkedin.svg" width={20} height={20} alt="LinkedIn" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/vyas.graphics/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/images/social/instagram.svg" width={20} height={20} alt="Instagram" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.behance.net/devvyas_graphics" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/images/social/behance.svg" width={20} height={20} alt="Behance" />
                        </a>
                    </li>
                    <li>
                        <a href={`mailto:${profile.email}`} aria-label="Email">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/assets/images/social/gmail.svg" width={20} height={20} alt="Gmail" />
                        </a>
                    </li>
                </ul>

                <div className="user-info">
                    <p className={dotIsInline
                        ? "avaiable-dot text-body-3 text-white-72 fw-medium"
                        : "avaiable-dot text-body-3 fw-medium d-sm-none"}
                    >
                        <span className="dot" />
                        <span>Available Sep 2026</span>
                    </p>
                    {/* A <p>, not the <h5> this used to be. It is a greeting,
                        not a section heading: as an h5 it was the FIRST
                        heading in the document, so the page outline opened at
                        level 5 before reaching the h1, and anyone navigating
                        by heading landed on rotating text that rewrites
                        itself every few seconds. Styling is unaffected -
                        .greeting is targeted by class everywhere, never by
                        tag, and its font-size is set explicitly. */}
                    <p className="greeting letter-space--2 text-white animationtext clip">
                        Hey, I&apos;m{" "}
                        <span className="cd-words-wrapper">
                            {profile.rotatingNames.map((name, i) => (
                                <span key={name} className={`item-text ${i === 0 ? "is-visible" : "is-hidden"}`}>
                                    {name}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p className="introduce text-white-56 letter-space--05 text-body-3">
                        {profile.introBio}
                    </p>
                    <div className="br-line" />
                    <div className="action-group">
                        <a
                            href="#contact"
                            className="tf-btn-action"
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo("#contact", { pushHistory: "#contact" });
                            }}
                        >
                            <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                            <span className="text text-body-3 letter-space--05 fw-medium">Let&apos;s talk</span>
                            <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                        </a>
                        <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="action-down">
                            <i className="icon icon-download" />
                            <span className="text-body-3">Download CV</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
