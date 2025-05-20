import type {ReactNode} from "react";
import Navbar from "@/components/layout/Navbar";
import TopBarNaigation from "@/components/layout/TopBarNaigation";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <main className="nc-docs-layout">
            <div className="border-b-1 fixed top-0 w-full backdrop-blur-sm z-10 bg-nc-background-default dark:bg-black border-nc-border-grey-light">
                <Navbar/>
                <TopBarNaigation/>
            </div>
            {children}
        </main>
    )
}