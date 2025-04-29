import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/app/layout.config';
import {Footer} from "@/components/Home/Footer";
import {Navbar} from "@/components/Home/Navbar";
import {Manrope} from "next/font/google";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const metadata = {
    icons: {
        icon: '/img/favicon.png',
    }
}

const inter = Manrope({
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