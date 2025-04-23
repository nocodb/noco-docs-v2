import {SearchResponseHit} from "typesense/lib/Typesense/Documents";
import {SortedResult} from "fumadocs-core/server";
import {Client} from "typesense";
import {BaseIndex} from "@/utils/search/typesense";

/**
 * Group and sort search results from Typesense
 */
export function groupResults(hits: SearchResponseHit<object>[]): SortedResult[] {
    const grouped: SortedResult[] = [];
    const scannedUrls = new Set<string>();
    const scannedIds = new Set<string>();

    for (const hit of hits) {
        const document = hit.document as BaseIndex;

        if (scannedIds.has(document.id)) {
            continue;
        }
        if (!scannedUrls.has(document.url)) {
            scannedUrls.add(document.url);
            scannedIds.add(document.id);

            grouped.push({
                id: document.id,
                type: 'page',
                url: document.url,
                content: document.title,
            });
        }

        const sectionId = document.section_id ? `${document.id}-${document.section_id}` : document.id;
        if (!scannedIds.has(sectionId)) {
            scannedIds.add(sectionId);

            grouped.push({
                id: sectionId,
                type: document.content === document.section ? 'heading' : 'text',
                url: document.section_id ? `${document.url}#${document.section_id}` : document.url,
                content: document.content,
            });
        }
    }

    return grouped;
}

/**
 * Search documents using Typesense
 */
export async function searchDocs(
    client: Client,
    collectionName: string,
    query: string,
    tag?: string,
): Promise<SortedResult[]> {
    const searchParams = {
        q: query,
        query_by: 'title,section,content',
        sort_by: '_text_match:desc',
        per_page: 10,
        filter_by: undefined as string | undefined,
    };

    if (tag) {
        searchParams.filter_by = `tag:=${tag}`;
    }

    if (query.length === 0) {
        const results = await client.collections(collectionName)
            .documents()
            .search({
                ...searchParams,
                q: '*',
                per_page: 8,
                group_by: 'page_id',
                group_limit: 1
            });

        return groupResults(results.hits || [])
            .filter((hit) => hit.type === 'page');
    }

    const results = await client.collections(collectionName)
        .documents()
        .search(searchParams);

    return groupResults(results.hits || []);
}