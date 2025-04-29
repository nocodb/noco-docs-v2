"use client";
import {ThemeProvider} from "next-themes";
import {usePathname} from "next/navigation";

export function CustomThemeProvider({children}: { children: React.ReactNode }) {

    const pathname = usePathname();
    const forcedThemeFromPathname = pathname.startsWith('/blog') ? "light" : undefined;

    return (
        <ThemeProvider disableTransitionOnChange attribute="class" forcedTheme={forcedThemeFromPathname}>
            {children}
        </ThemeProvider>
    )
}