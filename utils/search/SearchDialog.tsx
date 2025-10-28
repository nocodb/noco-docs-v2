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
  const [tag, setTag] = useState(defaultTag);
  const { trackEvent } = useAnalytics();
  const contentRef = useRef<HTMLDivElement>(null);
  const { search, setSearch, query } = useTypesenseSearch(
    typesenseClient,
    typesenseCollection,
    delayMs,
    true,
    locale,
    tag
  );
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
          <SearchDialogList
            items={query.data !== "empty" ? query.data : null}
          />
        </SearchDialogContent>
      </SearchDialog>
    </div>
  );
}

export default TypesenseSearchDialog;
