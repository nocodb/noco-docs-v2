import {Client} from 'typesense';
import {CollectionCreateSchema} from 'typesense/lib/Typesense/Collections';
import {StructuredData} from 'fumadocs-core/mdx-plugins';

export interface DocumentRecord {
    /**
     * The ID of document, must be unique
     */
    _id: string;

    title: string;
    description?: string;

    /**
     * URL to the page
     */
    url: string;
    structured: StructuredData;

    /**
     * Tag to filter results
     */
    tag?: string;

    /**
     * Data to be added to each section index
     */
    extra_data?: object;
}

export interface BaseIndex {
    id: string;
    title: string;
    url: string;
    page_id: string;
    tag?: string;
    section?: string;
    section_id?: string;
    content: string;
    description?: string;
    
    // DocSearch-style hierarchy
    lvl0?: string;  // Main section/category
    lvl1?: string;  // Page title
    lvl2?: string;  // Major headings (h2)
    lvl3?: string;  // Subsections (h3)
    lvl4?: string;  // Minor headings (h4)
    lvl5?: string;  // Smallest headings (h5)
    
    // Enhanced fields
    type: 'lvl0' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'content';
    hierarchy: {
        lvl0?: string;
        lvl1?: string;
        lvl2?: string;
        lvl3?: string;
        lvl4?: string;
        lvl5?: string;
    };
    anchor?: string;
    heading_level?: number;
    is_root_heading?: boolean;
    is_main_content: boolean;
    [key: string]: unknown;
}

export interface SyncOptions {
    /**
     * Collection Name for documents
     */
    collection?: string;

    /**
     * Search documents
     */
    documents: DocumentRecord[];
}

/**
 * Update collection schema and replace all documents
 *
 * @param client - Typesense Client
 * @param options - Collection Options
 */
export async function sync(
    client: Client,
    options: SyncOptions,
): Promise<void> {
    const {collection = 'documents', documents} = options;

    await createOrUpdateCollection(client, collection);

    // Update documents
    await updateDocuments(client, collection, documents);
}

export async function createOrUpdateCollection(
    client: Client,
    collectionName: string
): Promise<void> {
    const collectionSchema: CollectionCreateSchema = {
        name: collectionName,
        fields: [
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string', optional: true},
            {name: 'url', type: 'string'},
            {name: 'page_id', type: 'string', facet: false},
            {name: 'tag', type: 'string', facet: true, optional: true},
            {name: 'section', type: 'string', optional: true},
            {name: 'section_id', type: 'string', optional: true},
            {name: 'content', type: 'string'},
            {name: 'heading_level', type: 'int32', optional: true},
            {name: 'is_root_heading', type: 'bool', optional: true},
            
            // DocSearch-style hierarchy fields
            {name: 'lvl0', type: 'string', optional: true},
            {name: 'lvl1', type: 'string', optional: true},
            {name: 'lvl2', type: 'string', optional: true},
            {name: 'lvl3', type: 'string', optional: true},
            {name: 'lvl4', type: 'string', optional: true},
            {name: 'lvl5', type: 'string', optional: true},
            {name: 'type', type: 'string', facet: true, sort: true},
            {name: 'anchor', type: 'string', optional: true},
            {name: 'is_main_content', type: 'bool', optional: true},
        ],
    };

    try {
        await client.collections(collectionName).retrieve();
        await client.collections(collectionName).delete();
        await client.collections().create(collectionSchema);
    } catch {
        await client.collections().create(collectionSchema);
    }
}

function toIndex(page: DocumentRecord): BaseIndex[] {
    let id = 0;
    const indexes: BaseIndex[] = [];
    const scannedHeadings = new Set<string>();
    let relatedTopicsFound = false;

    // Track hierarchical context
    const hierarchyContext = {
        lvl0: getPageCategory(page),
        lvl1: page.title,
        lvl2: undefined as string | undefined,
        lvl3: undefined as string | undefined,
        lvl4: undefined as string | undefined,
        lvl5: undefined as string | undefined,
    };

    // Get heading level (h1, h2, etc.)
    function getHeadingLevel(heading: any): number {
        if (!heading || !heading.depth) return 0;
        return heading.depth;
    }

    // Get page category from URL or tag
    function getPageCategory(page: DocumentRecord): string {
        if (page.tag) return page.tag;
        
        // Extract category from URL path
        const urlPath = page.url.replace(/^.*\/docs\//, '');
        const pathParts = urlPath.split('/');
        
        if (pathParts.length > 1) {
            return pathParts[0].replace(/-/g, ' ');
        }
        
        return 'Documentation';
    }

    // Update hierarchy context based on heading level
    function updateHierarchyContext(heading: any, content: string) {
        const level = getHeadingLevel(heading);
        
        switch (level) {
            case 1:
                hierarchyContext.lvl1 = content;
                hierarchyContext.lvl2 = undefined;
                hierarchyContext.lvl3 = undefined;
                hierarchyContext.lvl4 = undefined;
                hierarchyContext.lvl5 = undefined;
                break;
            case 2:
                hierarchyContext.lvl2 = content;
                hierarchyContext.lvl3 = undefined;
                hierarchyContext.lvl4 = undefined;
                hierarchyContext.lvl5 = undefined;
                break;
            case 3:
                hierarchyContext.lvl3 = content;
                hierarchyContext.lvl4 = undefined;
                hierarchyContext.lvl5 = undefined;
                break;
            case 4:
                hierarchyContext.lvl4 = content;
                hierarchyContext.lvl5 = undefined;
                break;
            case 5:
            case 6:
                hierarchyContext.lvl5 = content;
                break;
        }
    }

    // Create hierarchical index record
    function createIndex(
        section: string | undefined,
        sectionId: string | undefined,
        content: string,
        type: BaseIndex['type'] = 'content',
        additionalFields: Partial<BaseIndex> = {}
    ): BaseIndex {
        const currentHierarchy = { ...hierarchyContext };
        
        return {
            id: `${page._id}-${(id++).toString()}`,
            title: page.title,
            url: page.url,
            page_id: page._id,
            tag: page.tag,
            section,
            section_id: sectionId,
            content,
            description: page.description,
            
            // DocSearch-style hierarchy
            lvl0: currentHierarchy.lvl0,
            lvl1: currentHierarchy.lvl1,
            lvl2: currentHierarchy.lvl2,
            lvl3: currentHierarchy.lvl3,
            lvl4: currentHierarchy.lvl4,
            lvl5: currentHierarchy.lvl5,
            
            // Enhanced fields
            type,
            hierarchy: currentHierarchy,
            anchor: sectionId,
            is_main_content: type === 'content',
            
            ...(page.extra_data || {}),
            ...additionalFields
        };
    }

    // Add page title as lvl1 record
    indexes.push(createIndex(undefined, undefined, page.title, 'lvl1', {
        heading_level: 1,
        is_root_heading: true
    }));

    // Add page description as content if available
    if (page.description) {
        indexes.push(createIndex(undefined, undefined, page.description, 'content'));
    }

    // Find if there's a "Related topics" heading
    const relatedTopicsHeading = page.structured.headings.find(h => 
        h.content.toLowerCase() === 'related topics' || 
        h.content.toLowerCase() === 'related topic' || 
        h.content.toLowerCase() === 'related resources' || 
        h.content.toLowerCase() === 'related resource' || 
        h.content.toLowerCase() === 'related fields' ||
        h.content.toLowerCase() === 'available tools'
    );

    page.structured.contents.forEach((p) => {
        if (['img', 'iframe', 'center'].includes(p.content) || !p.content.trim()) {
            return;
        }

        const heading = p.heading
            ? page.structured.headings.find((h) => p.heading === h.id)
            : null;
            
        // Check if we've reached the "Related topics" section
        if (heading && relatedTopicsHeading && heading.id === relatedTopicsHeading.id) {
            relatedTopicsFound = true;
            return;
        }
        
        // Skip content if we're after the "Related topics" section
        if (relatedTopicsFound) {
            return;
        }

        // Process heading first to update hierarchy context
        if (heading && !scannedHeadings.has(heading.id)) {
            scannedHeadings.add(heading.id);
            const headingLevel = getHeadingLevel(heading);
            const isRootHeading = headingLevel === 1 || heading.content === page.title;
            
            // Update hierarchy context
            updateHierarchyContext(heading, heading.content);
            
            // Determine record type based on heading level
            let recordType: BaseIndex['type'] = 'content';
            if (headingLevel >= 1 && headingLevel <= 5) {
                recordType = `lvl${headingLevel}` as BaseIndex['type'];
            }
            
            // Add heading as separate record
            indexes.push(createIndex(heading.content, heading.id, heading.content, recordType, {
                heading_level: headingLevel,
                is_root_heading: isRootHeading
            }));
        }

        // Add content record with current hierarchy context
        if (p.content && p.content !== heading?.content) {
            indexes.push(createIndex(heading?.content, heading?.id, p.content, 'content'));
        }
    });

    return indexes;
}

export async function updateDocuments(
    client: Client,
    collectionName: string,
    documents: DocumentRecord[],
): Promise<void> {
    const objects = documents.flatMap(toIndex);

    const batchSize = 100;

    for (let i = 0; i < objects.length; i += batchSize) {
        const batch = objects.slice(i, i + batchSize);
        await client.collections(collectionName).documents().import(batch, {action: 'upsert'});
    }
}