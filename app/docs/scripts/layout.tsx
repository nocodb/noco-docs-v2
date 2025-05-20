import Sidebar from "@/components/layout/Sidebar";
import { scriptsSource } from "@/lib/source";
import { TreeContextProvider } from "fumadocs-ui/provider";
import { ReactNode } from "react";

export default function Page({children}: {children: ReactNode}) {
    return (
        <div className='relative'>
            <TreeContextProvider tree={scriptsSource.pageTree}>
                <div className="max-w-screen-xl flex flex-col xl:flex-row mt-30 mx-auto">
                    <Sidebar />
                    {children}
                </div>
            </TreeContextProvider>
        </div>
    )
}