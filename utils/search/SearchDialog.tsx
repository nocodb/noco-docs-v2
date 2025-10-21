import { useState, useEffect, useRef } from "react";
import { useOnChange } from "fumadocs-core/utils/use-on-change";
import { useTypesenseSearch } from "@/utils/search/useTypesenseSearch";
import { SearchDialog, SearchDialogClose, SearchDialogContent, SearchDialogHeader, SearchDialogIcon, SearchDialogInput, SearchDialogList, SearchDialogOverlay, SharedProps, } from "fumadocs-ui/components/dialog/search";
import { Client } from "typesense";
import { useAnalytics } from "@/hooks/useAnalytics";

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
        tag,
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
            const link = target.closest('a');
            
            if (link && search.trim()) {
                trackEvent({
                    event: "a:docs:search",
                    query: search,
                    result_url: link.href,
                    result_title: link.textContent?.trim() || '',
                });
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('click', handleClick);
            return () => {
                contentElement.removeEventListener('click', handleClick);
            };
        }
    }, [search, trackEvent]);

    return (
        <div style={{ fontFamily: 'Inter' }}>
            <SearchDialog search={search} onSearchChange={setSearch}
                isLoading={query.isLoading} {...rest} >
                <SearchDialogOverlay className="bg-black/30" />
                <SearchDialogContent className="bg-nc-background-default" ref={contentRef}>
                    <SearchDialogHeader>
                        <SearchDialogIcon />
                        <SearchDialogInput onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchSubmit();
                            }
                        }} />
                        <SearchDialogClose />
                    </SearchDialogHeader>
                    <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
                </SearchDialogContent>
            </SearchDialog>

        </div>
    )
}

export default TypesenseSearchDialog