import {defineDocs, defineConfig, defineCollections, frontmatterSchema} from 'fumadocs-mdx/config';
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins';
import {z} from 'zod'
// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
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

export default defineConfig({
  mdxOptions: {
      remarkPlugins: [remarkAdmonition],
    // MDX options
  },
});
