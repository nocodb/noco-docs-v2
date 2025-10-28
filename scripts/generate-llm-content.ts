import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

type SitemapUrl = {
  url: string;
  title?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  category?: string;
};

type StructuredContent = {
  title: string;
  tagline: string;
  whySection: string[];
  quickstart: string[];
  docs: {
    [category: string]: { title: string; url: string; description: string }[];
  };
  blog: { title: string; url: string; description: string }[];
};

class LLMContentGenerator {
  private readonly siteUrl: string;
  private readonly outputFile: string;

  constructor(siteUrl: string, outputFile = "llms.txt") {
    this.siteUrl = siteUrl;
    this.outputFile = outputFile;
  }

  async generateLLMContent() {
    console.log("🚀 Starting metadata extraction from built files...");

    // Extract from built files
    const processedUrls = await this.extractFromBuiltFiles();
    console.log(`📄 Found ${processedUrls.length} documentation files`);

    // Generate structured content
    const structuredContent =
      await this.generateStructuredContent(processedUrls);

    // Generate final overview document
    await this.generateOverviewDocument(structuredContent);

    console.log(`✅ llms.txt file generated: ${this.outputFile}`);
  }

  private async extractFromBuiltFiles(): Promise<SitemapUrl[]> {
    const results: SitemapUrl[] = [];

    // Check for Next.js build output (App Router)
    const nextAppDir = path.join(process.cwd(), ".next", "server", "app");
    const outDir = path.join(process.cwd(), "out");

    let buildDir: string;

    if (fs.existsSync(outDir)) {
      buildDir = outDir; // Static export
    } else if (fs.existsSync(nextAppDir)) {
      buildDir = nextAppDir; // App Router build
    } else {
      throw new Error(
        'No build output found. Please run "npm run build" first.'
      );
    }

    console.log(`📁 Reading from build directory: ${buildDir}`);

    // Find HTML files recursively
    const htmlFiles = await this.findHtmlFiles(buildDir);
    console.log(`📄 Found ${htmlFiles.length} HTML files`);

    for (const filePath of htmlFiles) {
      const urlData = await this.extractMetaFromFile(filePath, buildDir);
      if (urlData) {
        results.push(urlData);
      }
    }

    return results;
  }

  private async findHtmlFiles(dir: string): Promise<string[]> {
    const htmlFiles: string[] = [];

    const traverse = (currentDir: string) => {
      if (!fs.existsSync(currentDir)) {
        return;
      }

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          // Skip certain directories
          if (["node_modules", ".git", "_next", "static"].includes(item)) {
            continue;
          }
          traverse(itemPath);
        } else if (item.endsWith(".html")) {
          htmlFiles.push(itemPath);
        }
      }
    };

    traverse(dir);
    return htmlFiles;
  }

  private async extractMetaFromFile(
    filePath: string,
    buildDir: string
  ): Promise<SitemapUrl | null> {
    try {
      const html = fs.readFileSync(filePath, "utf-8");
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract title
      const title = document.querySelector("title")?.textContent?.trim() || "";

      // Extract meta description
      const metaDescription =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content")
          ?.trim() || "";

      // Extract Open Graph tags
      const ogTitle =
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content")
          ?.trim() || "";
      const ogDescription =
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content")
          ?.trim() || "";

      // Extract keywords
      const keywords =
        document
          .querySelector('meta[name="keywords"]')
          ?.getAttribute("content")
          ?.trim() || "";

      // Skip if no meaningful metadata found
      if (!(title || metaDescription || ogTitle || ogDescription)) {
        return null;
      }

      // Convert file path to URL
      const url = this.filePathToUrl(filePath, buildDir);

      // Skip non-docs URLs for now
      if (!url.includes("/docs")) {
        return null;
      }

      // Skip tags URLs
      if (url.includes("/docs/tags")) {
        return null;
      }

      console.log(`📖 Processing: ${url}`);

      // Categorize URL
      const category = this.categorizeUrl(url);

      return {
        url,
        title: title || ogTitle || "Untitled",
        metaDescription,
        ogTitle,
        ogDescription,
        keywords,
        category,
      };
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      return null;
    }
  }

  private filePathToUrl(filePath: string, buildDir: string): string {
    // Convert file path to URL path
    let urlPath = path.relative(buildDir, filePath);

    // Handle Next.js App Router file structure
    if (urlPath.endsWith(".html")) {
      urlPath = urlPath.replace(".html", "");
    }

    // Handle special cases for App Router
    if (urlPath === "index") {
      urlPath = "";
    }

    // Normalize path separators
    urlPath = urlPath.replace(/\\/g, "/");

    // Ensure it starts with / (unless it's the root)
    if (urlPath && !urlPath.startsWith("/")) {
      urlPath = `/${urlPath}`;
    }

    return this.siteUrl + urlPath;
  }

  private categorizeUrl(url: string): string {
    const path = url.toLowerCase();

    if (path.includes("/blog")) {
      return "blog";
    }

    // More specific categorization for docs
    if (path.includes("/docs/scripts")) {
      return "scripts";
    }
    if (path.includes("/docs/self-hosting")) {
      return "self-hosting";
    }
    if (path.includes("/docs/product-docs")) {
      return "product-docs";
    }
    if (path.includes("/docs/changelog")) {
      return "changelog";
    }
    if (path.includes("/docs") && !path.includes("/docs/")) {
      return "docs-overview";
    }

    // Fallback for other docs
    if (path.includes("/docs") || path.includes("/documentation")) {
      return "docs";
    }
    if (path.includes("/api")) {
      return "api";
    }
    if (path.includes("/tutorial") || path.includes("/guide")) {
      return "tutorial";
    }
    if (path.includes("/getting-started") || path.includes("/quickstart")) {
      return "quickstart";
    }
    if (path.includes("/install") || path.includes("/setup")) {
      return "installation";
    }
    if (path.includes("/feature") || path.includes("/capability")) {
      return "features";
    }

    return "general";
  }

  private getDocCategory(url: string): string {
    const path = url.toLowerCase();

    if (path.includes("/docs/scripts")) {
      return "Scripts";
    }
    if (path.includes("/docs/self-hosting")) {
      return "Self-hosting";
    }
    if (path.includes("/docs/product-docs/getting-started")) {
      return "Getting Started";
    }
    if (path.includes("/docs/product-docs/bases")) {
      return "Bases";
    }
    if (path.includes("/docs/product-docs/tables")) {
      return "Tables";
    }
    if (path.includes("/docs/product-docs/fields")) {
      return "Fields";
    }
    if (path.includes("/docs/product-docs/records")) {
      return "Records";
    }
    if (path.includes("/docs/product-docs/views")) {
      return "Views";
    }
    if (path.includes("/docs/product-docs/collaboration")) {
      return "Collaboration";
    }
    if (path.includes("/docs/product-docs/automation")) {
      return "Automation";
    }
    if (path.includes("/docs/product-docs/data-sources")) {
      return "Data Sources";
    }
    if (path.includes("/docs/product-docs/developer-resources")) {
      return "Developer Resources";
    }
    if (path.includes("/docs/product-docs/extensions")) {
      return "Extensions";
    }
    if (path.includes("/docs/product-docs/integrations")) {
      return "Integrations";
    }
    if (path.includes("/docs/product-docs/roles-and-permissions")) {
      return "Roles & Permissions";
    }
    if (path.includes("/docs/product-docs/account-settings")) {
      return "Account Settings";
    }
    if (path.includes("/docs/product-docs/workspaces")) {
      return "Workspaces";
    }
    if (path.includes("/docs/product-docs/table-operations")) {
      return "Table Operations";
    }
    if (path.includes("/docs/product-docs/table-details")) {
      return "Table Details";
    }
    if (path.includes("/docs/product-docs/engineering")) {
      return "Engineering";
    }
    if (path.includes("/docs/product-docs/cloud-enterprise-edition")) {
      return "Cloud & Enterprise";
    }
    if (path.includes("/docs/product-docs")) {
      return "Product Documentation";
    }
    if (path.includes("/docs/changelog")) {
      return "Changelog";
    }
    if (path.includes("/docs") && !path.includes("/docs/")) {
      return "Overview";
    }

    return "Other";
  }

  private groupDocsByCategory(urls: SitemapUrl[]): {
    [category: string]: { title: string; url: string; description: string }[];
  } {
    const grouped: {
      [category: string]: { title: string; url: string; description: string }[];
    } = {};

    for (const url of urls) {
      const category = this.getDocCategory(url.url);

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push({
        title: url.title || "Untitled",
        url: url.url,
        description: this.getBestDescription(url),
      });
    }

    return grouped;
  }

  private async generateStructuredContent(
    urls: SitemapUrl[]
  ): Promise<StructuredContent> {
    // Group docs by categories - filter for documentation URLs
    const docUrls = urls.filter(
      (url) =>
        url.url.includes("/docs/") ||
        url.category === "docs" ||
        url.category === "documentation"
    );

    const docs = this.groupDocsByCategory(docUrls);

    const blog = urls
      .filter((url) => url.category === "blog")
      .map((url) => ({
        title: url.title || "Untitled",
        url: url.url,
        description: this.getBestDescription(url),
      }))
      .slice(0, 20); // Limit to recent blog posts

    // Extract quickstart from getting started pages
    const quickstartPages = urls.filter(
      (url) =>
        url.category === "quickstart" ||
        url.title?.toLowerCase().includes("getting started") ||
        url.title?.toLowerCase().includes("quickstart") ||
        url.title?.toLowerCase().includes("installation")
    );

    const quickstart = this.generateQuickstartFromMeta(quickstartPages);

    // Generate why section from homepage and feature pages
    const featurePages = urls.filter(
      (url) =>
        url.category === "features" ||
        url.url.includes("features") ||
        url.url === this.siteUrl ||
        url.url === `${this.siteUrl}/` ||
        url.title?.toLowerCase().includes("feature") ||
        url.title?.toLowerCase().includes("benefit")
    );

    const whySection = this.generateWhySectionFromMeta(featurePages);

    // Extract tagline from homepage
    const homepage = urls.find(
      (url) => url.url === this.siteUrl || url.url === `${this.siteUrl}/`
    );
    const tagline = this.extractTagline(homepage);

    return {
      title: "NocoDB",
      tagline,
      whySection,
      quickstart,
      docs,
      blog,
    };
  }

  private getBestDescription(url: SitemapUrl): string {
    // Prioritize meta description, fall back to OG description
    const description = url.metaDescription || url.ogDescription || "";
    return description.length > 150
      ? `${description.substring(0, 147)}...`
      : description;
  }

  private extractTagline(homepage?: SitemapUrl): string {
    if (homepage) {
      const description =
        homepage.metaDescription || homepage.ogDescription || "";
      if (description) {
        return description;
      }
    }

    // Fallback tagline
    return "Open Source Airtable Alternative - Turn any MySQL, PostgreSQL, SQL Server, SQLite & MariaDB into a smart spreadsheet.";
  }

  private generateQuickstartFromMeta(pages: SitemapUrl[]): string[] {
    // Default steps based on common NocoDB patterns
    const defaultSteps = [
      "Visit [NocoDB.com](https://nocodb.com) and create a free account",
      "Install NocoDB using Docker: `docker run -d --name nocodb -p 8080:8080 nocodb/nocodb:latest`",
      "Open your browser and navigate to `http://localhost:8080`",
      "Connect your database or start with a new project",
      "Create your first table and start building your app",
    ];

    // Try to generate steps from installation/quickstart page titles and descriptions
    const steps: string[] = [];

    for (const page of pages) {
      const description = this.getBestDescription(page);
      if (description) {
        // Look for step-like language in descriptions
        if (
          description.toLowerCase().includes("install") ||
          description.toLowerCase().includes("setup")
        ) {
          steps.push(`Install NocoDB - ${description}`);
        } else if (
          description.toLowerCase().includes("connect") ||
          description.toLowerCase().includes("database")
        ) {
          steps.push(`Connect your database - ${description}`);
        } else if (
          description.toLowerCase().includes("start") ||
          description.toLowerCase().includes("begin")
        ) {
          steps.push(`Get started - ${description}`);
        }
      }
    }

    return steps.length >= 3 ? steps.slice(0, 5) : defaultSteps;
  }

  private generateWhySectionFromMeta(pages: SitemapUrl[]): string[] {
    const benefits: string[] = [];

    // Extract benefits from feature page descriptions
    for (const page of pages) {
      const description = this.getBestDescription(page);
      if (description && description.length > 30) {
        // Clean up description to make it benefit-focused
        let benefit = description;

        // Remove common prefixes
        benefit = benefit.replace(
          /^(Learn|Discover|Explore|Find out|See how)/i,
          ""
        );
        benefit = benefit.replace(/^(about|how to|the way to)/i, "");
        benefit = benefit.trim();

        // Ensure it starts with capital letter
        if (benefit) {
          benefit = benefit.charAt(0).toUpperCase() + benefit.slice(1);
          benefits.push(benefit);
        }
      }
    }

    // If we have good extracted benefits, use them
    if (benefits.length >= 4) {
      return benefits.slice(0, 8);
    }

    // Fallback benefits
    return [
      "Transform any database into a collaborative workspace with rich data types, formulas, and views",
      "No vendor lock-in - works with MySQL, PostgreSQL, SQL Server, SQLite & MariaDB",
      "Open source with enterprise features like advanced permissions, audit logs, and SSO",
      "REST & GraphQL APIs auto-generated for seamless integration",
      "Rich collaboration features including comments, notifications, and shared views",
      "Advanced data visualization with charts, kanban boards, and calendar views",
    ];
  }

  private async generateOverviewDocument(content: StructuredContent) {
    let output = `# ${content.title}\n`;
    output += `> ${content.tagline}\n\n`;

    // Why section
    output += `## Why ${content.title}?\n`;
    for (const benefit of content.whySection) {
      output += `- ${benefit}\n`;
    }
    output += "\n";

    // Quickstart section
    output += "## Quickstart\n";
    content.quickstart.forEach((step, index) => {
      output += `${index + 1}. ${step}\n`;
    });
    output += "\n";

    // Documentation section - organized by categories
    output += "## Docs\n\n";

    // Define category order for better organization
    const categoryOrder = [
      "Overview",
      "Getting Started",
      "Scripts",
      "Self-hosting",
      "Bases",
      "Tables",
      "Fields",
      "Records",
      "Views",
      "Data Sources",
      "Automation",
      "Collaboration",
      "Extensions",
      "Developer Resources",
      "Account Settings",
      "Workspaces",
      "Roles & Permissions",
      "Table Operations",
      "Engineering",
      "Cloud & Enterprise",
      "Changelog",
      "Product Documentation",
      "Other",
    ];

    for (const category of categoryOrder) {
      if (content.docs[category] && content.docs[category].length > 0) {
        for (const doc of content.docs[category]) {
          output += `- [${doc.title}](${doc.url})`;
          if (doc.description) {
            output += `: ${doc.description}`;
          }
          output += "\n";
        }
      }
    }
    output += "\n";

    // Additional API v3 documentation URLs
    output += "## API v3 Documentation\n\n";
    output +=
      "- [NocoDB API v3 - Data](https://nocodb.com/apis/v3/data): Comprehensive documentation for NocoDB API v3 data operations including CRUD operations, filtering, sorting, and data manipulation endpoints\n";
    output +=
      "- [NocoDB API v3 - Meta](https://nocodb.com/apis/v3/meta): Comprehensive documentation for NocoDB API v3 metadata operations including base definitions, table definitions, field definitions, and other metadata endpoints\n\n";

    // Blog section
    if (content.blog.length > 0) {
      output += "## Blog\n\n";
      for (const post of content.blog) {
        output += `- [${post.title}](${post.url})`;
        if (post.description) {
          output += `: ${post.description}`;
        }
        output += "\n";
      }
    }

    // Write to file
    fs.writeFileSync(this.outputFile, output, "utf-8");
  }
}

// Main execution
async function main() {
  const siteUrl = process.env.SITE_URL || "https://nocodb.com";
  const outputFile = process.argv[2] || "public/llms.txt";

  const generator = new LLMContentGenerator(siteUrl, outputFile);

  try {
    await generator.generateLLMContent();
  } catch (error) {
    console.error("❌ Error generating overview:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { LLMContentGenerator };
