"use client";
import { useSearchContext } from "fumadocs-ui/provider";
import { SearchIcon } from "lucide-react";

export function SearchTriggerIcon() {
    const { setOpenSearch } = useSearchContext();
    return (
        <div className="cursor-pointer px-2 py-1" onClick={() => setOpenSearch(true)}>
            <SearchIcon className="w-4 h-4 text-nc-content-grey-subtle" />
        </div>
    )
}