import Sidebar from "@/components/layout/Sidebar";
import { changelogSource } from "@/lib/source";
import { TreeContextProvider } from '@/provider/TreeContextProvider';
import { ReactNode } from "react";
import MobileSidebar from "@/app/docs/MobileSidebar";

export default function Page({children}: {children: ReactNode}) {
    return (
        <div className='relative'>
            <TreeContextProvider tree={changelogSource.pageTree}>
                <div className="max-w-screen-xl flex flex-col xl:flex-row mt-30 mx-auto">
                    <Sidebar />
                    {children}
                </div>
                <MobileSidebar/>
            </TreeContextProvider>
        </div>
    )
}