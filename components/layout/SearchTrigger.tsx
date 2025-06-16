"use client";
import { useSearchContext } from "fumadocs-ui/provider";
import { SearchIcon } from "lucide-react";

export function SearchTrigger() {
    const { setOpenSearch } = useSearchContext();
    return (
        <div onClick={() => setOpenSearch(true)}
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.08)" }}
            className="rounded-[8px] flex gap-2 h-[40px] w-96 absolute mx-auto inset-0 my-3 items-center cursor-pointer border-1 border-nc-border-grey-medium pl-3 pr-1.5 py-1">
            <SearchIcon className="w-4 h-4 text-nc-content-grey-muted" />
            <div className="text-nc-content-grey-muted flex-1 leading-5 font-[400]">
                Search Docs...
            </div>
            <div
                className="text-nc-content-grey-subtle-2 rounded-[6px] font-[400] leading-5 bg-nc-background-grey-medium px-1">
                ⌘ K
            </div>
        </div>
    )
}