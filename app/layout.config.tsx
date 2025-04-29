import type {BaseLayoutProps} from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import Link from 'next/link';
import {ThemeSwitch} from "@/components/Docs/ThemeSwitch";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    links: [],
    nav: {
        url: "https://www.nocodb.com",
        title: (
            <div className="hidden md:flex items-center gap-3">
                <Link href="https://www.nocodb.com">
                    <Image src="/img/nocodb-full-color.png" alt="NocoDB" width={120} height={40}/>
                </Link>
                <div className="w-[1px] py-2.5 border-1 border-r-0 border-nc-border-grey-medium"></div>
                <div className="font-[600] text-nc-content-grey-muted text-[14px] leading-5">
                    Docs
                </div>
                <div className="md:flex-1"/>
                <ThemeSwitch/>
            </div>
        ),
        children: (
            <div className="flex md:hidden items-center gap-3">
                <Link href="https://www.nocodb.com">
                    <Image src="/img/nocodb-full-color.png" alt="NocoDB" width={120} height={40}/>
                </Link>
                <div className="w-[1px] py-2.5 border-1 border-r-0 border-nc-border-grey-medium"></div>
                <div className="text-nc-content-grey-muted font-[600] text-[14px] leading-5">
                    Docs
                </div>
                <div className="md:flex-1"/>
                <ThemeSwitch/>
            </div>
        )
    }
};
