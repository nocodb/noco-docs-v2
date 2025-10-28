import './global.css';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';
import ClientAnalytics from "@/components/Analytics";
import NcSearchDialog from "@/components/layout/Search";
import {CustomThemeProvider} from "@/app/ThemeProvider";
import {RootProvider} from "fumadocs-ui/provider/next";
import { Toaster } from "sonner";

const inter = Inter({
    subsets: ['latin'],
});


declare global {
  interface Window {
    ncClientId?: string | null;
  }
}


export default function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <RootProvider search={{SearchDialog: NcSearchDialog}} theme={{enabled: false}}>
                    <CustomThemeProvider>
                        {children}
                    </CustomThemeProvider>
                </RootProvider>
                <ClientAnalytics/>
                <Toaster />
            </body>
        </html>
    );
}
