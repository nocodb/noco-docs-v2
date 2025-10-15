import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/app/layout.config';
import {Footer} from "@/components/blog/home/Footer";
import {Navbar} from "@/components/blog/home/Navbar";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import {blogSource} from "@/lib/source";
import TopBarNavigationClient from "@/components/blog/TopBarNavigationClient";
import {Suspense} from "react";

export const metadata = {
    icons: {
        icon: '/img/favicon.png',
    }
}

export default function Layout({children,}: { children: ReactNode; }): React.ReactElement {
    const posts = blogSource.getPages();
    const categories = new Set<string>();
    posts.forEach((post) => {
        categories.add(post.data.category ?? "Uncategorized");
    });

    return (
        <HomeLayout className='!pt-0' {...baseOptions} nav={{
            component: Navbar()
        }}>
            <Suspense fallback={<div className="h-12 border-b border-nc-border-grey-medium" />}>
                <TopBarNavigationClient categories={Array.from(categories)} />
            </Suspense>
            <NuqsAdapter>
                <ReCaptchaProvider reCaptchaKey="6LcdnI0oAAAAAHYW3hwztfZw9qAjX4TiviE4fWip">
                    {children}
                </ReCaptchaProvider>
            </NuqsAdapter>
            <Footer/>
        </HomeLayout>
    )
}