import {useMemo, useRef, useState} from "react";
import {Client} from "typesense";
import {useDebounce} from "@/utils/useDebounce";
import {useOnChange} from "fumadocs-core/utils/use-on-change";
import {searchDocs} from "@/utils/search/client";
import {SortedResult} from "fumadocs-core/server";


export const useTypesenseSearch = (client: Client, typesenseCollection: string, delayMs = 100, allowEmpty = false, locale?: string, tag?: string, key?: string) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<"empty" | SortedResult[]>("empty");
    const [error, setError] = useState();
    const cache = new Map();

    const [isLoading, setIsLoading] = useState(false);
    const debouncedValue = useDebounce(search, delayMs);
    const onStart = useRef({});
    const cacheKey = useMemo(() => {
        return key ?? JSON.stringify([debouncedValue, locale, tag]);
    }, [debouncedValue, locale, tag, key]);

    useOnChange(cacheKey, () => {
        const cached = cache.get(cacheKey);
        if (onStart?.current && typeof onStart.current === "function") {
            onStart.current();
            onStart.current = {};
        }
        if (cached) {
            setIsLoading(false);
            setError(void 0);
            setResults(cached);
            return;
        }
        setIsLoading(true);
        let interrupt = false;
        onStart.current = () => {
            interrupt = true;
        };

        async function run() {
            if (debouncedValue.length === 0 && !allowEmpty) return "empty";
            return searchDocs(client, typesenseCollection, debouncedValue, tag);
        }

        void run().then((res) => {
            cache.set(cacheKey, res);
            if (interrupt) return;
            setError(void 0);
            setResults(res);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setIsLoading(false);
        });
    });
    return {search, setSearch, query: {isLoading, data: results, error}};
}