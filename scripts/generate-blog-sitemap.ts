import * as fs from 'node:fs';
import * as path from 'node:path';

interface BlogPost {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface SiteMapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl?: string;
  blogDir?: string;
  outputFile?: string;
  includeBlogIndex?: boolean;
  blogIndexPriority?: number;
  postPriority?: number;
  postChangefreq?: SiteMapUrl['changefreq'];
}

const DEFAULT_CONFIG: Required<SitemapConfig> = {
  baseUrl: 'https://nocodb.com',
  blogDir: 'content/blog',
  outputFile: 'public/sitemap-blog.xml',
  includeBlogIndex: true,
  blogIndexPriority: 0.8,
  postPriority: 0.7,
  postChangefreq: 'monthly'
};

function generateSitemapXml(urls: SiteMapUrl[], config: Required<SitemapConfig>): string {
  const urlEntries = urls.map(url => {
    let entry = `    <url>\n      <loc>${config.baseUrl}${url.loc}</loc>\n`;
    
    if (url.lastmod) {
      entry += `      <lastmod>${url.lastmod}</lastmod>\n`;
    }
    
    if (url.changefreq) {
      entry += `      <changefreq>${url.changefreq}</changefreq>\n`;
    }
    
    if (url.priority !== undefined) {
      entry += `      <priority>${url.priority}</priority>\n`;
    }
    
    entry += '    </url>';
    return entry;
  }).join('\n');

  const blogIndexUrl = config.includeBlogIndex 
    ? `  <url>
    <loc>${config.baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>${config.blogIndexPriority}</priority>
  </url>\n`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogIndexUrl}${urlEntries}
</urlset>`;
}

function formatDate(date: string | Date): string {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.warn(`⚠️  Invalid date format: ${date}, using current date`);
      return new Date().toISOString().split('T')[0];
    }
    return d.toISOString().split('T')[0];
  } catch {
    console.warn(`⚠️  Error parsing date: ${date}, using current date`);
    return new Date().toISOString().split('T')[0];
  }
}

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterStr = match[1];
  const bodyContent = match[2];
  
  // Simple YAML parser for frontmatter
  const frontmatter: Record<string, string> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        frontmatter[key] = value.slice(1, -1);
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content: bodyContent };
}

function getBlogPosts(config: Required<SitemapConfig>): BlogPost[] {
  const blogDir = path.join(process.cwd(), config.blogDir);
  
  if (!fs.existsSync(blogDir)) {
    throw new Error(`Blog directory not found: ${blogDir}`);
  }

  const files = fs.readdirSync(blogDir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) {
      continue;
    }

    try {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { frontmatter } = parseFrontmatter(fileContent);

      if (!frontmatter.title) {
        console.warn(`⚠️  Skipping ${file}: Missing title in frontmatter`);
        continue;
      }

      if (!frontmatter.date) {
        console.warn(`⚠️  Skipping ${file}: Missing date in frontmatter`);
        continue;
      }

      const slug = path.basename(file, path.extname(file));
      posts.push({
        slug,
        url: `/blog/${slug}`,
        title: frontmatter.title,
        description: frontmatter.description || '',
        date: frontmatter.date,
        author: frontmatter.author || '',
        category: frontmatter.category || '',
        image: frontmatter.image || ''
      });
    } catch (error) {
      console.warn(`⚠️  Error processing ${file}:`, error);
    }
  }

  return posts;
}

async function generateBlogSitemap(userConfig: SitemapConfig = {}) {
  try {
    const config: Required<SitemapConfig> = { ...DEFAULT_CONFIG, ...userConfig };
    
    console.log(`🔍 Scanning for blog posts in: ${config.blogDir}`);
    
    // Get all blog posts from the filesystem
    const posts = getBlogPosts(config);
    
    if (!posts || posts.length === 0) {
      console.log('⚠️  No blog posts found');
      return;
    }

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Create sitemap URLs for each blog post
    const sitemapUrls: SiteMapUrl[] = sortedPosts.map(post => ({
      loc: post.url,
      lastmod: formatDate(post.date),
      changefreq: config.postChangefreq,
      priority: config.postPriority
    }));

    // Generate the sitemap XML
    const sitemapXml = generateSitemapXml(sitemapUrls, config);

    // Ensure output directory exists
    const outputDir = path.dirname(config.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write sitemap to file
    fs.writeFileSync(config.outputFile, sitemapXml, 'utf8');

    console.log(`✅ Blog sitemap generated successfully!`);
    console.log(`📍 Location: ${path.resolve(config.outputFile)}`);
    console.log(`📊 Total blog posts: ${posts.length}`);
    console.log(`🌐 Base URL: ${config.baseUrl}`);
    console.log(`🔗 Blog URLs included:`);
    
    sortedPosts.forEach(post => {
      console.log(`   • ${post.url} (${formatDate(post.date)}) - ${post.title}`);
    });

  } catch (error) {
    console.error('❌ Error generating blog sitemap:', error);
    process.exit(1);
  }
}

// Run the script when executed directly
if (require.main === module) {
  // Check for command line arguments for customization
  const args = process.argv.slice(2);
  const config: SitemapConfig = {};
  
  // Simple argument parsing
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    
    switch (flag) {
      case '--base-url':
        config.baseUrl = value;
        break;
      case '--blog-dir':
        config.blogDir = value;
        break;
      case '--output':
        config.outputFile = value;
        break;
      case '--help':
        console.log(`
Blog Sitemap Generator

Usage: npm run generate-blog-sitemap [options]

Options:
  --base-url <url>    Base URL for the sitemap (default: https://nocodb.com)
  --blog-dir <dir>    Directory containing blog posts (default: content/blog)
  --output <file>     Output file path (default: public/sitemap-blog.xml)
  --help              Show this help message

Examples:
  npm run generate-blog-sitemap
  npm run generate-blog-sitemap -- --base-url https://example.com
  npm run generate-blog-sitemap -- --blog-dir content/posts --output public/posts-sitemap.xml
        `);
        process.exit(0);
    }
  }
  
  generateBlogSitemap(config);
}

export { generateBlogSitemap, type SitemapConfig }; 