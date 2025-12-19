"use client";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";

export function SearchTriggerIcon() {
  const { setOpenSearch } = useSearchContext();
  return (
    <div
      className="cursor-pointer px-2 py-1"
      onClick={() => setOpenSearch(true)}
    >
      <SearchIcon className="h-4 w-4 text-nc-content-grey-subtle" />
    </div>
  );
}
