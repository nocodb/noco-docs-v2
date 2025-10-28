"use client";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

export function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const forcedThemeFromPathname = pathname.startsWith("/blog")
    ? "light"
    : undefined;
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      forcedTheme={forcedThemeFromPathname}
    >
      {children}
    </ThemeProvider>
  );
}
