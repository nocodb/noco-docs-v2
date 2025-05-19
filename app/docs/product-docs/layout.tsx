"use client";
import Sidebar from '@/components/Docs/Sidebar';
import { source } from '@/lib/source';
import { TreeContextProvider } from 'fumadocs-ui/provider';
import type {ReactNode} from 'react';

export default function Layout({children}: { children: ReactNode }) {
    console.log(source.pageTree);
    return (
        <TreeContextProvider tree={source.pageTree}>
            <div className="container h-[calc(100dvh-120px)] relative flex mt-30 mx-auto">
                <div className='w-64 hidden lg:block fixed bg-white top-29.25 h-full overflow-auto z-10 pr-2'>
                    <Sidebar />
                </div>
                {children}
            </div>
        </TreeContextProvider>
    );
}
