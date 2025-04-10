import type {BaseLayoutProps} from 'fumadocs-ui/layouts/shared';
import {Navbar} from "@/components/Home/Navbar";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        component: Navbar()
    },
    links: [],
    themeSwitch: {
        enabled: false
    }
};
