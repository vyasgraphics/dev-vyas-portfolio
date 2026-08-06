"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useBodyThemeClass() {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");
        localStorage.removeItem("isak-color-variant");

        const body = document.body;
        body.classList.remove(
            "light-mode", "body-default", "body-v1", "body-v2", "body-v3", "dark-v1", "dark-v2"
        );
        body.classList.add("dark-mode", "dark-v3");
    }, [setTheme]);
}
