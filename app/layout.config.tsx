import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/img/nocodb-full-color.png" alt="NocoDB" width={120} height={40} />
      </>
    ),
  },
  links: [],
};
