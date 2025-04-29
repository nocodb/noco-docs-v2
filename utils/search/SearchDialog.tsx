import {useState} from "react";
import {useOnChange} from "fumadocs-core/utils/use-on-change";
import {useTypesenseSearch} from "@/utils/search/useTypesenseSearch";
import {SearchDialog, SharedProps,} from "fumadocs-ui/components/dialog/search";
import {Client} from "typesense";

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
    const {search, setSearch, query} = useTypesenseSearch(
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
        <div style={{fontFamily: 'Inter'}}>
            <SearchDialog search={search} onSearchChange={setSearch} results={query?.data || []}
                          isLoading={query.isLoading} {...rest} />

        </div>
    )
}

export default TypesenseSearchDialog