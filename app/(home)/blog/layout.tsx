import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/app/layout.config';
import {Footer} from "@/components/Home/Footer";
import {Navbar} from "@/components/Home/Navbar";

export const metadata = {
    icons: {
        icon: '/img/favicon.ico',
    }
}

export default function Layout({children,}: { children: ReactNode; }): React.ReactElement {
    return (
        <HomeLayout {...baseOptions} nav={{
            component: Navbar()
        }}>
            {children}
            <Footer/>
        </HomeLayout>
    )
}