"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useBodyThemeClass() {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");
        // Clears out a colour-variant preference that the site's theme
        // picker used to write before the theme was locked permanently to
        // dark-v3 - harmless to run even if nothing was ever stored under
        // this key.
        localStorage.removeItem("dev-vyas-color-variant");

        const body = document.body;
        body.classList.remove(
            "light-mode", "body-default", "body-v1", "body-v2", "body-v3", "dark-v1", "dark-v2"
        );
        body.classList.add("dark-mode", "dark-v3");
    }, [setTheme]);
}
