import {blog, docs, scripts, selfHosting} from '@/.source';
import {loader} from 'fumadocs-core/source';
import {createMDXSource} from "fumadocs-mdx";
import {iconMap, IconNameType} from "@/lib/iconMap";
import {createElement} from "react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
    // it assigns a URL to your pages
    baseUrl: '/docs/product-docs',
    source: docs.toFumadocsSource(),
    icon(icon?: string) {

        if (!icon) {
            return;
        }
        if (icon in iconMap) {
            return createElement(iconMap[icon as IconNameType], {
                className: 'w-4 h-4',
                width: 16,
                height: 16,
            });
        } else {
            return createElement(iconMap['book']);
        }
    },
});

export const blogSource = loader({
    baseUrl: '/docs/blog',
    source: createMDXSource(blog, []),
})

export const scriptsSource = loader({
    baseUrl: '/docs/scripts',
    source: scripts.toFumadocsSource(),
})

export const selfHostingSource = loader({
    baseUrl: '/docs/self-hosting',
    source: selfHosting.toFumadocsSource(),
})
    