import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/app/layout.config';
import {Footer} from "@/components/blog/home/Footer";
import {Navbar} from "@/components/blog/home/Navbar";
import {Inter} from "next/font/google";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const metadata = {
    icons: {
        icon: '/img/favicon.png',
    }
}

const inter = Inter({
    subsets: ['latin']
})

export default function Layout({children,}: { children: ReactNode; }): React.ReactElement {
    return (
        <HomeLayout {...baseOptions} nav={{
            component: Navbar()
        }}>
            <ReCaptchaProvider reCaptchaKey="6LcdnI0oAAAAAHYW3hwztfZw9qAjX4TiviE4fWip">
            <div className={inter.className}>
                {children}
            </div>
            <Footer/>
            </ReCaptchaProvider>
        </HomeLayout>
    )
}