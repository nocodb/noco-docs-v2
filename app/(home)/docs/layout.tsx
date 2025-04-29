"use client";
import {DocsLayout} from 'fumadocs-ui/layouts/docs';
import type {ReactNode} from 'react';
import {baseOptions} from '@/app/layout.config';
import {source} from '@/lib/source';
import Sidebar from "@/components/Docs/Sidebar";
import {Inter} from 'next/font/google'

const inter = Inter({
    subsets: ['latin', "latin-ext"]
})

export default function Layout({children}: { children: ReactNode }) {
    return (
        <main className={inter.className}>
            <DocsLayout tree={source.pageTree} {...baseOptions} sidebar={{
                component: (<Sidebar {...baseOptions} />),
            }}>
                {children}
            </DocsLayout>

        </main>

    );
}
