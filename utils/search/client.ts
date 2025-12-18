import type { SortedResult } from "fumadocs-core/search";
import type { Client } from "typesense";
import type { SearchResponseHit } from "typesense/lib/Typesense/Documents";
import type { BaseIndex } from "@/utils/search/typesense";

/**
 * Group and sort search results from Typesense
 */
export function groupResults(
  hits: SearchResponseHit<object>[]
): SortedResult[] {
  const grouped: SortedResult[] = [];
  const scannedPageIds = new Set<string>();
  const scannedDocIds = new Set<string>();
  const pageResults: Map<string, { 
    headings: SortedResult[], 
    content: SortedResult[],
    bestFieldWeight: number,
    bestScore: number 
  }> = new Map();

  // First pass: collect all results grouped by page
  for (const hit of hits) {
    const document = hit.document as BaseIndex;
    const textMatchScore = hit.text_match as number || 0;
    const textMatchInfo = hit.text_match_info as { best_field_weight?: number } | undefined;
    const fieldWeight = textMatchInfo?.best_field_weight || 0;

    // Skip if already processed this exact document
    if (scannedDocIds.has(document.id)) {
      continue;
    }
    scannedDocIds.add(document.id);
    
    // Initialize page results if not exists
    if (!pageResults.has(document.url)) {
      pageResults.set(document.url, { headings: [], content: [], bestFieldWeight: 0, bestScore: 0 });
    }

    const pageItems = pageResults.get(document.url)!;
    
    // Track best field weight and score for this page (title=6, section=4, content=1)
    if (fieldWeight > pageItems.bestFieldWeight) {
      pageItems.bestFieldWeight = fieldWeight;
    }
    if (textMatchScore > pageItems.bestScore) {
      pageItems.bestScore = textMatchScore;
    }

    // Add page title first (only once per page)
    if (!scannedPageIds.has(document.page_id)) {
      scannedPageIds.add(document.page_id);
      pageItems.headings.unshift({
        id: document.page_id,
        type: "page",
        url: document.url,
        content: document.title,
      });
    }

    // Determine if this is a heading based on heading_level
    const isHeading = typeof document.heading_level === 'number';
    const result: SortedResult = {
      id: document.id,
      type: isHeading ? "heading" : "text",
      url: document.section_id
        ? `${document.url}#${document.section_id}`
        : document.url,
      content: document.content,
    };

    // Add headings to headings array, content to content array
    if (isHeading) {
      pageItems.headings.push(result);
    } else {
      pageItems.content.push(result);
    }
  }

  // Sort pages by best field weight first (title > section > content), then by score
  const sortedPages = Array.from(pageResults.entries())
    .sort((a, b) => {
      // First sort by field weight (higher = better, title=6, section=4, content=1)
      if (b[1].bestFieldWeight !== a[1].bestFieldWeight) {
        return b[1].bestFieldWeight - a[1].bestFieldWeight;
      }
      // Then by text match score
      return b[1].bestScore - a[1].bestScore;
    });

  for (const [, items] of sortedPages) {
    grouped.push(...items.headings, ...items.content.slice(0, 2));
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
  tag?: string
): Promise<SortedResult[]> {
  // Define search parameters based on Typesense capabilities
  const searchParams: Record<string, unknown> = {
    q: query,
    query_by: "title,section,content",
    query_by_weights: "6,4,1", // Give even higher weight to title
    prefix: true, // Enable prefix searching
    infix: "always", // Enable infix searching to match parts of words
    typo_tolerance: true, // Enable typo tolerance
    num_typos: 2, // Allow up to 2 typos
    boost: {
      is_root_heading: 2, // Boost root headings
      heading_level: {
        value: 1, // Boost h1 headings
        function: "reciprocal", // Lower heading levels get less boost
      },
    },
    sort_by: "_text_match:asc",
    per_page: 15, // Increase results per page
    filter_by: undefined as string | undefined,
    contextual_search: true,
  };

  if (tag) {
    searchParams.filter_by = `tag:=${tag}`;
  }

  if (query.length === 0) {
    const results = await client
      .collections(collectionName)
      .documents()
      .search({
        ...searchParams,
        q: "*",
        per_page: 8,
        group_by: "page_id",
        group_limit: 1,
      });

    return groupResults(results.hits || []).filter(
      (hit) => hit.type === "page"
    );
  }

  const results = await client
    .collections(collectionName)
    .documents()
    .search(searchParams);

  return groupResults(results.hits || []);
}
