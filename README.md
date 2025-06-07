# noco-docs

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Scripts

### Blog Sitemap Generation

The project includes a custom script to generate sitemaps specifically for blog content:

```bash
# Generate blog sitemap
npm run generate-blog-sitemap

# Generate with custom parameters
npm run generate-blog-sitemap -- --base-url https://example.com
npm run generate-blog-sitemap -- --output public/custom-sitemap.xml
npm run generate-blog-sitemap -- --help
```

The script automatically:
- Scans `content/blog/` for MDX files
- Extracts metadata from frontmatter
- Generates `public/sitemap-blog.xml`
- Runs automatically during the build process

For more details, see [scripts/README.md](scripts/README.md).

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
