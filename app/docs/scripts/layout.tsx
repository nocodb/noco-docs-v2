import type { ReactNode } from "react";
import MobileSidebar from "@/app/docs/MobileSidebar";
import Sidebar from "@/components/layout/Sidebar";
import { scriptsSource } from "@/lib/source";
import { TreeContextProvider } from "@/provider/TreeContextProvider";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <TreeContextProvider tree={scriptsSource.pageTree}>
        <div className="mx-auto mt-30 flex max-w-screen-xl flex-col xl:flex-row">
          <Sidebar />
          {children}
        </div>
        <MobileSidebar />
      </TreeContextProvider>
    </div>
  );
}
