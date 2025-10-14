import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/app/layout.config';
import {Footer} from "@/components/blog/home/Footer";
import {Navbar} from "@/components/blog/home/Navbar";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const metadata = {
    icons: {
        icon: '/img/favicon.png',
    }
}

export default function Layout({children,}: { children: ReactNode; }): React.ReactElement {
    return (
        <HomeLayout {...baseOptions} nav={{
            component: Navbar()
        }}>
            <NuqsAdapter>
                <ReCaptchaProvider reCaptchaKey="6LcdnI0oAAAAAHYW3hwztfZw9qAjX4TiviE4fWip">
                    {children}
                </ReCaptchaProvider>
            </NuqsAdapter>
            <Footer/>
        </HomeLayout>
    )
}