import { z } from 'zod';
import { Client } from 'typesense';
import { searchDocs } from '@/utils/search/client';
import { source, scriptsSource, selfHostingSource, changelogSource, legalDocsSource } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-txt';

// Initialize Typesense client for server-side use
const typesenseClient = new Client({
  apiKey: process.env.TYPESENSE_API_KEY || 'lNKDTZdJrE76Sg8WEyeN9mXT29l1xq7Q',
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || 'rqf5uvajyeczwt3xp-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
    },
  ],
});

const COLLECTION_NAME = 'noco-docs-v2';

// Helper to get page from URL path
function getPageFromUrl(url: string) {
  // Remove leading slash and split path
  const path = url.replace(/^\//, '').split('/');
  
  // Handle /docs/product-docs/... format
  if (path[0] === 'docs') {
    const section = path[1];
    const slug = path.slice(2);
    
    if (section === 'product-docs') {
      return source.getPage(slug);
    } else if (section === 'scripts') {
      return scriptsSource.getPage(slug);
    } else if (section === 'self-hosting') {
      return selfHostingSource.getPage(slug);
    } else if (section === 'changelog') {
      return changelogSource.getPage(slug);
    } else if (section === 'legal') {
      return legalDocsSource.getPage(slug);
    }
  }
  
  // Fallback for direct paths without /docs/ prefix
  if (path[0] === 'product-docs') {
    return source.getPage(path.slice(1));
  } else if (path[0] === 'scripts') {
    return scriptsSource.getPage(path.slice(1));
  } else if (path[0] === 'self-hosting') {
    return selfHostingSource.getPage(path.slice(1));
  } else if (path[0] === 'changelog') {
    return changelogSource.getPage(path.slice(1));
  } else if (path[0] === 'legal') {
    return legalDocsSource.getPage(path.slice(1));
  }
  
  return null;
}

/**
 * Search documentation using Typesense and fetch actual page content
 * Returns markdown formatted content for AI context
 */
export async function searchAndFetchDocs(
  query: string,
  limit: number = 3
): Promise<{ markdown: string; links: Array<{ url: string; title: string; label: string }> }> {
  try {
    // Search using Typesense
    const results = await searchDocs(typesenseClient, COLLECTION_NAME, query);
    
    if (results.length === 0) {
      return {
        markdown: 'No relevant documentation found for your query.',
        links: [],
      };
    }
    

    // Get unique page URLs (remove duplicates and hash fragments)
    const uniquePages = new Map<string, { url: string; content: string }>();
    
    for (const result of results) {
      // Accept all result types - we just need the page URL
      const pageUrl = result.url.split('#')[0];
      if (!uniquePages.has(pageUrl)) {
        uniquePages.set(pageUrl, {
          url: result.url,
          content: result.content,
        });
      }
      
      if (uniquePages.size >= limit) break;
    }
    
    // Fetch actual page content
    let markdown = '# Relevant Documentation\n\n';
    const links: Array<{ url: string; title: string; label: string }> = [];
    let linkIndex = 1;

    for (const [pageUrl] of uniquePages) {
      try {
        const page = getPageFromUrl(pageUrl);
        
        if (page) {
          // Get the full processed text content
          const pageContent = await getLLMText(page);
          markdown += `${pageContent}\n\n[${linkIndex}]\n\n---\n\n`;
          
          links.push({
            url: page.url,
            title: page.data.title,
            label: linkIndex.toString(),
          });
          
          linkIndex++;
        } else {
        }
      } catch {
        // Continue with next page
      }
    }

    if (links.length === 0) {
      return {
        markdown: 'Could not fetch documentation content.',
        links: [],
      };
    }

    return { markdown, links };
  } catch {
    return {
      markdown: 'An error occurred while searching the documentation.',
      links: [],
    };
  }
}

export const SearchDocsToolSchema = z.object({
  query: z.string().describe('The search query to find relevant documentation'),
});
