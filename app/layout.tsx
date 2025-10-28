import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CustomThemeProvider } from "@/app/ThemeProvider";
import ClientAnalytics from "@/components/Analytics";
import NcSearchDialog from "@/components/layout/Search";

const inter = Inter({
  subsets: ["latin"],
});

declare global {
  interface Window {
    ncClientId?: string | null;
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{ SearchDialog: NcSearchDialog }}
          theme={{ enabled: false }}
        >
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </RootProvider>
        <ClientAnalytics />
        <Toaster />
      </body>
    </html>
  );
}
