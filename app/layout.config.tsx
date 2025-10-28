import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import Link from "next/link";

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
      <div className="hidden items-center gap-3 md:flex">
        <Link href="https://www.nocodb.com">
          <Image
            alt="NocoDB"
            height={40}
            src="/img/nocodb-full-color.png"
            width={120}
          />
        </Link>
        <div className="w-[1px] border-1 border-nc-border-grey-medium border-r-0 py-2.5" />
        <div className="font-[600] text-[14px] text-nc-content-grey-muted leading-5">
          Docs
        </div>
        <div className="md:flex-1" />
      </div>
    ),
    children: (
      <div className="flex items-center gap-3 md:hidden">
        <Link href="https://www.nocodb.com">
          <Image
            alt="NocoDB"
            height={40}
            src="/img/nocodb-full-color.png"
            width={120}
          />
        </Link>
        <div className="w-[1px] border-1 border-nc-border-grey-medium border-r-0 py-2.5" />
        <div className="font-[600] text-[14px] text-nc-content-grey-muted leading-5">
          Docs
        </div>
        <div className="md:flex-1" />
      </div>
    ),
  },
};
