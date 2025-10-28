"use client";
import { useSearchContext } from "fumadocs-ui/provider";
import { SearchIcon } from "lucide-react";

export function SearchTrigger() {
  const { setOpenSearch } = useSearchContext();
  return (
    <div
      className="absolute inset-0 mx-auto my-3 flex h-[40px] w-96 cursor-pointer items-center gap-2 rounded-[8px] border-1 border-nc-border-grey-medium py-1 pr-1.5 pl-3"
      onClick={() => setOpenSearch(true)}
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <SearchIcon className="h-4 w-4 text-nc-content-grey-muted" />
      <div className="flex-1 font-[400] text-nc-content-grey-muted leading-5">
        Search Docs...
      </div>
      <div className="rounded-[6px] bg-nc-background-grey-medium px-1 font-[400] text-nc-content-grey-subtle-2 leading-5">
        ⌘ K
      </div>
    </div>
  );
}
