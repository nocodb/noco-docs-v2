import Sidebar from '@/components/layout/Sidebar';
import { source } from '@/lib/source';
import { TreeContextProvider } from '@/provider/TreeContextProvider';
import type { ReactNode } from 'react';
import MobileSidebar from '@/app/docs/MobileSidebar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='relative'>
            <TreeContextProvider tree={source.pageTree}>
                <div className="max-w-screen-xl flex flex-col xl:flex-row mt-30 mx-auto">
                    <Sidebar />
                    {children}
                </div>
                <MobileSidebar />   
            </TreeContextProvider>

        </div>
    );
}
