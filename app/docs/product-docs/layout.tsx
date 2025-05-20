"use client";
import Sidebar from '@/components/layout/Sidebar';
import { source } from '@/lib/source';
import { TreeContextProvider } from 'fumadocs-ui/provider';
import type {ReactNode} from 'react';

export default function Layout({children}: { children: ReactNode }) {
    console.log(source.pageTree);
    return (
        <div className='relative'>
            <TreeContextProvider tree={source.pageTree}>
                <div className="max-w-screen-xl flex flex-col xl:flex-row mt-30 mx-auto">
                    <Sidebar />
                    {children}
                </div>
            </TreeContextProvider>
        </div>
    );
}
