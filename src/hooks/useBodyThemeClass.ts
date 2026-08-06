"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const STORAGE_KEY = "isak-color-variant";

type BodyThemeClassOptions = {
    defaultMode?: "dark" | "light";
};

export function useBodyThemeClass({ defaultMode = "dark" }: BodyThemeClassOptions = {}) {
    const { resolvedTheme, setTheme } = useTheme();

    // On first mount, apply the saved color variant (if any) or the default.
    // We do NOT force-lock dark: the SettingColorMenu's handleChoose sets both
    // the next-themes theme AND the body class together, so they stay in sync.
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            // No saved preference - apply defaultMode
            setTheme(defaultMode);
        }
        // If there IS a saved variant, SettingColorMenu's own useEffect on
        // mount will re-apply it (including calling setTheme). No need to do
        // anything here in that case - avoid double-setting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep body classes in sync whenever the resolved theme changes
    useEffect(() => {
        const body = document.body;
        const currentTheme = resolvedTheme || defaultMode;

        body.classList.remove("dark-mode", "light-mode");
        body.classList.add(currentTheme === "dark" ? "dark-mode" : "light-mode");
    }, [resolvedTheme, defaultMode]);
}
