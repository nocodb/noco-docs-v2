import {defineDocs, defineConfig, defineCollections, frontmatterSchema} from 'fumadocs-mdx/config';
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins';
import {z} from 'zod'
// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const blog = defineCollections({
    dir: 'content/blog',
    type: 'doc',
    schema: frontmatterSchema.extend({
        description: z.string(),
        author: z.string(),
        date: z.string().date().or(z.date()),
        category: z.string(),
        image: z.string()
    }),
})

export const scripts = defineDocs({
    dir: 'content/scripts',
    docs: {
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
})

export const selfHosting = defineDocs({
    dir: 'content/self-hosting',
    docs: {
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
})

export const changelog = defineDocs({
    dir: 'content/changelog',
    docs: {
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
})

export const legalDocs = defineDocs({
    dir: 'content/legal',
    docs: {
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
})

export default defineConfig({
  mdxOptions: {
      remarkPlugins: [remarkAdmonition],
  },
});
