import type {BaseLayoutProps} from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import {ThemeToggle} from "fumadocs-ui/components/layout/theme-toggle";
import Link from 'next/link';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    links: [],
    themeSwitch: {
        enabled: true
    },
    nav: {
        url: "https://www.nocodb.com",
        title: (
            <div className="flex hidden md:flex items-center gap-3">
                <Link href="https://www.nocodb.com">
                    <Image src="/img/nocodb-full-color.png" alt="NocoDB" width={120} height={40}/>

                </Link>
                <div className="w-[1px] py-2.5 border-1 border-r-0 border-nc-border-grey-medium"></div>
                <div className="font-semibold text-nc-content-grey-subtle-2 text-[14px] leading-5">
                    Docs
                </div>
                <div className="md:flex-1"/>
                <ThemeToggle/>
            </div>
        ),
        children: (
            <div className="flex md:hidden items-center gap-3">
                <Link href="https://www.nocodb.com">
                    <Image src="/img/nocodb-full-color.png" alt="NocoDB" width={120} height={40}/>

                </Link>
                <div className="w-[1px] py-2.5 border-1 border-r-0 border-nc-border-grey-medium"></div>
                <div className="font-semibold text-nc-content-grey-subtle-2 text-[14px] leading-5">
                    Docs
                </div>
                <div className="md:flex-1"/>
                <ThemeToggle/>
            </div>
        )
    }
};
