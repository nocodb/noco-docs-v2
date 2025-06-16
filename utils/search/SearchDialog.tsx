import { useState } from "react";
import { useOnChange } from "fumadocs-core/utils/use-on-change";
import { useTypesenseSearch } from "@/utils/search/useTypesenseSearch";
import { SearchDialog, SearchDialogClose, SearchDialogContent, SearchDialogHeader, SearchDialogIcon, SearchDialogInput, SearchDialogList, SearchDialogOverlay, SharedProps, } from "fumadocs-ui/components/dialog/search";
import { Client } from "typesense";

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

    return (
        <div style={{ fontFamily: 'Inter' }}>
            <SearchDialog search={search} onSearchChange={setSearch}
                isLoading={query.isLoading} {...rest} >
                <SearchDialogOverlay className="bg-black/30" />
                <SearchDialogContent className="bg-nc-background-default">
                    <SearchDialogHeader>
                        <SearchDialogIcon />
                        <SearchDialogInput />
                        <SearchDialogClose />
                    </SearchDialogHeader>
                    <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
                </SearchDialogContent>
            </SearchDialog>

        </div>
    )
}

export default TypesenseSearchDialog