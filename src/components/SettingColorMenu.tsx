"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { colorSwatches } from "@/data/colors";

const STORAGE_KEY = "isak-color-variant";
// The site ships with Forest Shadow (dark-v3) as its signature look.
// If the user has never opened the colour picker, we use this.
const DEFAULT_BODY_CLASS = "dark-v3";

type SettingColorMenuProps = {
    leftBarClass?: string;
};

export function SettingColorMenu({ leftBarClass = "" }: SettingColorMenuProps = {}) {
    const [open, setOpen] = useState(false);
    // Read saved variant from localStorage eagerly (lazy initialiser) so the
    // initial state is correct without needing a setState-in-effect.
    const [active, setActive] = useState<string>(() => {
        if (typeof window === "undefined") return DEFAULT_BODY_CLASS;
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_BODY_CLASS;
    });
    const { setTheme } = useTheme();

    const applyBodyClass = (cls: string) => {
        const body = document.body;
        body.classList.forEach((c) => {
            if (
                c === "body-default" ||
                c.startsWith("body-v") ||
                c.startsWith("dark-v")
            ) {
                body.classList.remove(c);
            }
        });
        body.classList.add(cls);
    };

    // On mount: apply the saved (or default) colour variant to the DOM and
    // sync the next-themes theme. This is a legitimate external-system sync
    // (document.body and next-themes), not a cascading state update.
    useEffect(() => {
        applyBodyClass(active);
        const swatch = colorSwatches.find((s) => s.bodyClass === active);
        setTheme(swatch ? swatch.mode : "dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChoose = (bodyClass: string) => {
        const swatch = colorSwatches.find((s) => s.bodyClass === bodyClass);
        if (!swatch) return;

        setTheme(swatch.mode);
        setActive(swatch.bodyClass);
        applyBodyClass(swatch.bodyClass);
        localStorage.setItem(STORAGE_KEY, swatch.bodyClass);
    };

    return (
        <>
            {/* Gear icon - fixed on right side */}
            <div className={`tf-left-bar${leftBarClass ? " " + leftBarClass : ""}`}>
                <button
                    type="button"
                    className="btn-setting-color tf-btn-icon style-2"
                    onClick={() => setOpen(true)}
                    aria-label="Open colour settings"
                >
                    <i className="icon-gear" />
                </button>
            </div>

            {/* Slide-in panel */}
            <div
                className={`offcanvas offcanvas-end offcanvas-color${open ? " show" : ""}`}
                id="settingColorMenu"
                style={{
                    visibility: open ? "visible" : "hidden",
                    transform: open ? "none" : undefined,
                }}
            >
                <div className="offcanvas-content">
                    <div className="canvas-header">
                        <h5 className="letter-space--2">Configuration</h5>
                        <span
                            className="icon-close-popup"
                            onClick={() => setOpen(false)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setOpen(false);
                                }
                            }}
                        >
                            <i className="icon-close" />
                        </span>
                    </div>

                    <div className="canvas-body">
                        <h6 className="title">Colour</h6>
                        <div className="settings-color list-choose">
                            {colorSwatches.map((swatch) => (
                                <button
                                    key={swatch.bodyClass}
                                    type="button"
                                    className={`btn-color theme-${swatch.mode} choose-item${
                                        active === swatch.bodyClass ? " active" : ""
                                    }`}
                                    onClick={() => handleChoose(swatch.bodyClass)}
                                >
                                    <span className={`color ${swatch.className}`} />
                                    <span className="text">{swatch.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <div
                    className="offcanvas-backdrop fade show"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
