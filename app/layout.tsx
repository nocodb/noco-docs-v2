import './global.css';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';
import ClientAnalytics from "@/components/Analytics";
import NcSearchDialog from "@/components/Docs/Search";
import {CustomThemeProvider} from "@/app/ThemeProvider";
import {RootProvider} from "fumadocs-ui/provider";

const inter = Inter({
    subsets: ['latin'],
});

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
            </body>
        </html>
    );
}
