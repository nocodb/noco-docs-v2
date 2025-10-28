"use client";

import { usePathname, useSearchParams } from "next/navigation";
import TopBarNavigation from "./TopBarNavigation";

type TopBarNavigationClientProps = {
  categories: string[];
};

export default function TopBarNavigationClient({
  categories,
}: TopBarNavigationClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Only show on /blog page (not on individual blog posts like /blog/[slug])
  const isBlogListPage = pathname === "/blog";

  if (!isBlogListPage) {
    return null;
  }
  const selectedCategory = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  return (
    <div className="sticky top-18 z-5 border-nc-border-grey-medium border-b bg-nc-background-default/50 backdrop-blur-sm">
      <TopBarNavigation
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
