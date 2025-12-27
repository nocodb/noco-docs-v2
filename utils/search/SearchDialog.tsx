import { useOnChange } from "fumadocs-core/utils/use-on-change";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Client } from "typesense";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTypesenseSearch } from "@/utils/search/use-typesense-search";

interface TypesenseSearchDialogProps extends SharedProps {
  typesenseClient: Client;
  typesenseCollection: string;
  locale?: string;
  delayMs?: number;
  defaultTag?: string;
}

function TypesenseSearchDialog({
  typesenseClient,
  defaultTag,
  delayMs,
  locale,
  typesenseCollection,
  ...rest
}: TypesenseSearchDialogProps) {
  const pathname = usePathname();
  const [tag, setTag] = useState(defaultTag);
  const { trackEvent } = useAnalytics();
  const contentRef = useRef<HTMLDivElement>(null);

  // Determine filter based on current path
  const getPathBasedTag = (path: string) => {
    if (path.startsWith("/docs/product-docs")) {
      return "product-docs";
    }
    if (path.startsWith("/docs/scripts")) {
      return "scripts";
    }
    if (path.startsWith("/docs/self-hosting")) {
      return "self-hosting";
    }
    if (path.startsWith("/docs/workflows")) {
      return "workflows";
    }
    return;
  };

  const { search, setSearch, query } = useTypesenseSearch(
    typesenseClient,
    typesenseCollection,
    delayMs,
    true,
    locale,
    tag
  );

  // Update tag when path changes
  useEffect(() => {
    const pathBasedTag = getPathBasedTag(pathname);
    setTag(pathBasedTag || defaultTag);
  }, [pathname, defaultTag]);
  useOnChange(defaultTag, (v) => {
    setTag(v);
  });

  const handleSearchSubmit = () => {
    if (search.trim()) {
      trackEvent({
        event: "a:docs:search",
        query: search,
      });
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && search.trim()) {
        trackEvent({
          event: "a:docs:search",
          query: search,
          result_url: link.href,
          result_title: link.textContent?.trim() || "",
        });
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("click", handleClick);
      return () => {
        contentElement.removeEventListener("click", handleClick);
      };
    }
  }, [search, trackEvent]);

  return (
    <div style={{ fontFamily: "Inter" }}>
      <SearchDialog
        isLoading={query.isLoading}
        onSearchChange={setSearch}
        search={search}
        {...rest}
      >
        <SearchDialogOverlay className="bg-black/30" />
        <SearchDialogContent
          className="bg-nc-background-default"
          ref={contentRef}
        >
          <SearchDialogHeader>
            <SearchDialogIcon />
            <SearchDialogInput
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
            <SearchDialogClose />
          </SearchDialogHeader>
          <div className="border-nc-border-grey-medium border-b-1 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  tag
                    ? "bg-nc-background-grey-light text-nc-content-grey-subtle hover:bg-nc-background-grey-medium"
                    : "border border-nc-border-brand bg-nc-background-brand text-nc-content-brand-default"
                }`}
                onClick={() => setTag(undefined)}
                type="button"
              >
                All
              </button>
              <button
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  tag === "product-docs"
                    ? "border border-nc-border-brand bg-nc-background-brand text-nc-content-brand-default"
                    : "bg-nc-background-grey-light text-nc-content-grey-subtle hover:bg-nc-background-grey-medium"
                }`}
                onClick={() => setTag("product-docs")}
              >
                Product Docs
              </button>
              <button
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  tag === "scripts"
                    ? "border border-nc-border-brand bg-nc-background-brand text-nc-content-brand-default"
                    : "bg-nc-background-grey-light text-nc-content-grey-subtle hover:bg-nc-background-grey-medium"
                }`}
                onClick={() => setTag("scripts")}
                type="button"
              >
                Scripts
              </button>
              <button
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  tag === "workflows"
                    ? "border border-nc-border-brand bg-nc-background-brand text-nc-content-brand-default"
                    : "bg-nc-background-grey-light text-nc-content-grey-subtle hover:bg-nc-background-grey-medium"
                }`}
                onClick={() => setTag("workflows")}
                type="button"
              >
                Workflows
              </button>
              <button
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  tag === "self-hosting"
                    ? "border border-nc-border-brand bg-nc-background-brand text-nc-content-brand-default"
                    : "bg-nc-background-grey-light text-nc-content-grey-subtle hover:bg-nc-background-grey-medium"
                }`}
                onClick={() => setTag("self-hosting")}
                type="button"
              >
                Self-Hosting
              </button>
            </div>
          </div>
          {tag && (
            <div className="border-nc-border-grey-medium border-x-1 border-b-1 px-4 py-2 text-nc-content-grey-muted text-sm">
              Searching about:{" "}
              <span className="font-medium text-nc-content-grey-default">
                {tag === "product-docs" && "Product"}
                {tag === "scripts" && "Scripts"}
                {tag === "workflows" && "Workflows"}
                {tag === "self-hosting" && "Self-Hosting"}
              </span>
            </div>
          )}
          <SearchDialogList
            items={query.data !== "empty" ? query.data : null}
          />
        </SearchDialogContent>
      </SearchDialog>
    </div>
  );
}

export default TypesenseSearchDialog;
