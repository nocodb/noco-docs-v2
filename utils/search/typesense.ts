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

    function createIndex(
        section: string | undefined,
        sectionId: string | undefined,
        content: string,
        additionalFields: Partial<BaseIndex> = {}
    ): BaseIndex {
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
            ...(page.extra_data || {}),
            ...additionalFields
        };
    }

    if (page.description) {
        indexes.push(createIndex(undefined, undefined, page.description));
    }

    page.structured.contents.forEach((p) => {
        if (['img', 'iframe', 'center'].includes(p.content) || !p.content.trim()) {
            return;
        }

        const heading = p.heading
            ? page.structured.headings.find((h) => p.heading === h.id)
            : null;

        if (p.content && p.content !== heading?.content) {
            indexes.push(createIndex(heading?.content, heading?.id, p.content));
        }

        if (heading && !scannedHeadings.has(heading.id)) {
            scannedHeadings.add(heading.id);
            indexes.push(createIndex(heading.content, heading.id, heading.content));
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