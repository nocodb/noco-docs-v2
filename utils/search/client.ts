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
    // Define search parameters with DocSearch-style hierarchical boosting
    const searchParams: any = {
        q: query,
        query_by: 'title,lvl0,lvl1,lvl2,lvl3,lvl4,lvl5,section,content',
        query_by_weights: '10,9,8,6,4,3,2,5,1',  // Hierarchical weighting
        typo_tolerance: true,      // Enable typo tolerance
        num_typos: 4,             // Reduced typos for better precision
        boost: {
            type: {
                'lvl0': 10,        // Highest boost for main sections
                'lvl1': 8,         // High boost for page titles
                'lvl2': 6,         // Medium-high boost for major headings
                'lvl3': 4,         // Medium boost for subsections
                'lvl4': 3,         // Lower boost for minor headings
                'lvl5': 2,         // Lowest boost for smallest headings
                'content': 1       // Base boost for content
            },
            is_root_heading: 2,    // Additional boost for root headings
            is_main_content: 1     // Boost main content
        },
        sort_by: '_text_match:desc',  // Sort by relevance
        per_page: 12,             // Increase results per page
        filter_by: undefined as string | undefined,
        contextual_search: false,
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
                per_page: 12,
                group_by: 'page_id',
                group_limit: 1,
                sort_by: 'type:asc'  // Show pages first
            });

        return groupResults(results.hits || [])
            .filter((hit) => hit.type === 'page');
    }

    const results = await client.collections(collectionName)
        .documents()
        .search(searchParams);

    return groupResults(results.hits || []);
}