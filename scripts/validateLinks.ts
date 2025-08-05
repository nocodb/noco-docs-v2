import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
  type ValidateConfig,
} from 'next-validate-link';
import { getSlugs, parseFilePath } from 'fumadocs-core/source';
import { getTableOfContents } from 'fumadocs-core/server';
import path from 'node:path';


async function checkLinks() {
  // Read all documentation files
  const docsFiles = await readFiles('content/docs/**/*.{md,mdx}');
  
  // Read blog files
  const blogFiles = await readFiles('content/blog/**/*.{md,mdx}');
  
  // Read self-hosting files
  const selfHostingFiles = await readFiles('content/self-hosting/**/*.{md,mdx}');
  
  // Read scripts files
  const scriptsFiles = await readFiles('content/scripts/**/*.{md,mdx}');
  
  // Read changelog files
  const changelogFiles = await readFiles('content/changelog/**/*.{md,mdx}');

  const legalDocsFiles = await readFiles('content/legal/**/*.{md,mdx}');

  const scanned = await scanURLs({
    populate: {
      // Blog routes
      '(home)/blog/[slug]': blogFiles.map((file) => {
        const info = parseFilePath(path.relative('content/blog', file.path));
        
        return {
          value: getSlugs(info)[0],
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),
      
      // Main docs routes
      'docs/product-docs/[[...slug]]': docsFiles.map((file) => {
        const info = parseFilePath(path.relative('content/docs', file.path));
        
        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),

      'docs/legal/[[...slug]]': legalDocsFiles.map((file) => {
        const info = parseFilePath(path.relative('content/legal', file.path));
        
        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),
      
      // Self-hosting docs routes
      'docs/self-hosting/[[...slug]]': selfHostingFiles.map((file) => {
        const info = parseFilePath(path.relative('content/self-hosting', file.path));
        
        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),
      
      // Scripts docs routes
      'docs/scripts/[[...slug]]': scriptsFiles.map((file) => {
        const info = parseFilePath(path.relative('content/scripts', file.path));
        
        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),
      
      // Changelog routes
      'docs/changelog/[slug]': changelogFiles.map((file) => {
        const info = parseFilePath(path.relative('content/changelog', file.path));
        
        return {
          value: getSlugs(info)[0],
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1),
          ),
        };
      }),
    },
  });

  const results = await validateFiles([...docsFiles, ...blogFiles, ...selfHostingFiles, ...scriptsFiles, ...changelogFiles], {
    scanned,
    pathToUrl: (file) => {
      return path.dirname(file);
    },
  });
  
  printErrors(results, true);
}

void checkLinks();