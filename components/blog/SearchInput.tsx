"use client";

import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

export function SearchInput() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });

  return (
    <div className="relative w-full max-w-md">
      <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-nc-content-grey-subtle" />
      <input
        className="w-full rounded-md border border-nc-border-grey-medium bg-transparent py-2 pr-4 pl-10 text-nc-content-grey-emphasis placeholder:text-nc-content-grey-subtle focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nc-content-brand-default"
        onChange={(e) => setSearch(e.target.value || null)}
        placeholder="Search blog posts..."
        type="text"
        value={search}
      />
    </div>
  );
}
