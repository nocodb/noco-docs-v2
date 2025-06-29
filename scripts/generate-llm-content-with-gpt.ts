import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import OpenAI from 'openai';

interface SitemapUrl {
  url: string;
  title?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  category?: string;
  content?: string;
}

interface EnhancedStructuredContent {
  title: string;
  tagline: string;
  overview: string;
  keyFeatures: string[];
  gettingStarted: {
    title: string;
    steps: string[];
  };
  documentation: {
    [category: string]: {
      title: string;
      description: string;
      pages: {
        title: string;
        url: string;
        description: string;
        keyPoints: string[];
      }[];
    };
  };
  faq: {
    question: string;
    answer: string;
  }[];
  useCases: string[];
}

class GPTEnhancedLLMGenerator {
  private openai: OpenAI;
  private siteUrl: string;
  private outputFile: string;
  private maxConcurrent: number = 5;

  constructor(apiKey: string, siteUrl: string, outputFile: string = 'llms-enhanced.txt') {
    this.openai = new OpenAI({ apiKey });
    this.siteUrl = siteUrl;
    this.outputFile = outputFile;
  }

  async generateEnhancedLLMContent() {
    console.log('🚀 Starting GPT-enhanced LLM content generation...');
    
    // Extract content from built files
    const processedUrls = await this.extractFromBuiltFiles();
    console.log(`📄 Found ${processedUrls.length} documentation files`);
    
    // Enhance content with GPT
    const enhancedContent = await this.enhanceWithGPT(processedUrls);
    
    // Generate the enhanced LLM file
    await this.generateEnhancedDocument(enhancedContent);
    
    console.log(`✅ Enhanced llms.txt file generated: ${this.outputFile}`);
  }

  private async extractFromBuiltFiles(): Promise<SitemapUrl[]> {
    const results: SitemapUrl[] = [];
    
    // Check for Next.js build output
    const nextAppDir = path.join(process.cwd(), '.next', 'server', 'app');
    const outDir = path.join(process.cwd(), 'out');
    
    let buildDir: string;
    
    if (fs.existsSync(outDir)) {
      buildDir = outDir;
    } else if (fs.existsSync(nextAppDir)) {
      buildDir = nextAppDir;
    } else {
      throw new Error('No build output found. Please run "npm run build" first.');
    }
    
    console.log(`📁 Reading from build directory: ${buildDir}`);
    
    // Find HTML files recursively
    const htmlFiles = await this.findHtmlFiles(buildDir);
    console.log(`📄 Found ${htmlFiles.length} HTML files`);
    
    // Process files in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < htmlFiles.length; i += batchSize) {
      const batch = htmlFiles.slice(i, i + batchSize);
      const batchPromises = batch.map(filePath => this.extractContentFromFile(filePath, buildDir));
      const batchResults = await Promise.all(batchPromises);
      
      results.push(...batchResults.filter(Boolean) as SitemapUrl[]);
      
      // Add a small delay to be respectful to the API
      if (i + batchSize < htmlFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  private async findHtmlFiles(dir: string): Promise<string[]> {
    const htmlFiles: string[] = [];
    
    const traverse = (currentDir: string) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          if (['node_modules', '.git', '_next', 'static'].includes(item)) {
            continue;
          }
          traverse(itemPath);
        } else if (item.endsWith('.html')) {
          htmlFiles.push(itemPath);
        }
      }
    };
    
    traverse(dir);
    return htmlFiles;
  }

  private async extractContentFromFile(filePath: string, buildDir: string): Promise<SitemapUrl | null> {
    try {
      const html = fs.readFileSync(filePath, 'utf-8');
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract metadata
      const title = document.querySelector('title')?.textContent?.trim() || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() || '';
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() || '';
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')?.trim() || '';

      // Extract main content text
      const mainContent = document.querySelector('main, [role="main"], .main-content, #main-content, article');
      let content = '';
      
      if (mainContent) {
        // Remove script tags, style tags, and navigation elements
        const elementsToRemove = mainContent.querySelectorAll('script, style, nav, .nav, .navigation, .sidebar, .breadcrumb, .header, .footer');
        elementsToRemove.forEach(el => el.remove());
        
        content = mainContent.textContent?.replace(/\s+/g, ' ').trim() || '';
      }

      // Skip if no meaningful content found
      if (!title && !metaDescription && !content) {
        return null;
      }

      const url = this.filePathToUrl(filePath, buildDir);
      
      // Focus on documentation pages
      if (!url.includes('/docs') && !url.includes('/blog')) {
        return null;
      }

      console.log(`📖 Processing: ${url}`);

      const category = this.categorizeUrl(url);

      return {
        url,
        title: title || ogTitle || 'Untitled',
        metaDescription,
        ogTitle,
        ogDescription,
        keywords,
        category,
        content: content.substring(0, 2000) // Limit content length for API efficiency
      };

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      return null;
    }
  }

  private filePathToUrl(filePath: string, buildDir: string): string {
    let urlPath = path.relative(buildDir, filePath);
    
    if (urlPath.endsWith('.html')) {
      urlPath = urlPath.replace('.html', '');
    }
    
    if (urlPath === 'index') {
      urlPath = '';
    }
    
    urlPath = urlPath.replace(/\\/g, '/');
    
    if (urlPath && !urlPath.startsWith('/')) {
      urlPath = '/' + urlPath;
    }
    
    return this.siteUrl + urlPath;
  }

  private categorizeUrl(url: string): string {
    const path = url.toLowerCase();
    
    if (path.includes('/blog')) return 'blog';
    if (path.includes('/docs/scripts')) return 'automation-scripts';
    if (path.includes('/docs/self-hosting')) return 'deployment';
    if (path.includes('/docs/product-docs')) return 'core-features';
    if (path.includes('/docs/changelog')) return 'updates';
    if (path.includes('/docs/getting-started')) return 'getting-started';
    if (path.includes('/docs/api')) return 'api-reference';
    if (path.includes('/docs')) return 'documentation';
    
    return 'general';
  }

  private async enhanceWithGPT(urls: SitemapUrl[]): Promise<EnhancedStructuredContent> {
    console.log('🤖 Enhancing content with GPT...');

    // Group content by category
    const categorizedContent = this.groupByCategory(urls);
    
    // Create a comprehensive content summary for GPT
    const contentSummary = this.createContentSummary(categorizedContent);
    
    const prompt = `
You are an expert technical writer creating comprehensive documentation for NocoDB, a no-code database platform. 

Based on the following content from the NocoDB documentation website, create a well-structured, comprehensive overview that would be perfect for an LLM training document.

Content Summary:
${contentSummary}

Please create a structured response with the following sections:

1. **Project Overview**: A clear, compelling description of what NocoDB is and what problems it solves
2. **Key Features**: List the main features and capabilities 
3. **Getting Started**: Step-by-step guide for new users
4. **Documentation Structure**: Organized breakdown of different documentation areas with descriptions
5. **Common Use Cases**: Real-world scenarios where NocoDB excels
6. **FAQ**: Address common questions and concerns

Make the content:
- Clear and accessible to both technical and non-technical users
- Well-organized with proper hierarchy
- Comprehensive but concise
- Professional and engaging
- Include specific examples where relevant

Format your response as a JSON object with the structure matching the EnhancedStructuredContent interface.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical writer specializing in creating comprehensive documentation for software platforms. Respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      });

      const gptResponse = response.choices[0]?.message?.content;
      if (!gptResponse) {
        throw new Error('Empty response from GPT');
      }

      // Parse GPT response
      let enhancedContent: EnhancedStructuredContent;
      try {
        enhancedContent = JSON.parse(gptResponse);
      } catch (parseError) {
        console.warn('⚠️ Failed to parse GPT JSON response, using fallback structure');
        enhancedContent = this.createFallbackStructure(urls);
      }

      // Enhance with detailed page information
      enhancedContent.documentation = await this.enhanceDocumentationSections(categorizedContent, enhancedContent.documentation);

      return enhancedContent;

    } catch (error) {
      console.error('❌ Error with GPT API:', error);
      console.log('📝 Falling back to manual content generation...');
      return this.createFallbackStructure(urls);
    }
  }

  private groupByCategory(urls: SitemapUrl[]): { [category: string]: SitemapUrl[] } {
    const grouped: { [category: string]: SitemapUrl[] } = {};
    
    for (const url of urls) {
      const category = url.category || 'general';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(url);
    }
    
    return grouped;
  }

  private createContentSummary(categorizedContent: { [category: string]: SitemapUrl[] }): string {
    let summary = '';
    
    for (const [category, pages] of Object.entries(categorizedContent)) {
      summary += `\n## ${category.toUpperCase()}\n`;
      for (const page of pages.slice(0, 5)) { // Limit to avoid token limits
        summary += `- ${page.title}: ${page.metaDescription || page.content?.substring(0, 200) || 'No description available'}\n`;
      }
    }
    
    return summary;
  }

  private async enhanceDocumentationSections(
    categorizedContent: { [category: string]: SitemapUrl[] },
    baseDocumentation: any
  ): Promise<any> {
    const enhanced: any = {};
    
    for (const [category, pages] of Object.entries(categorizedContent)) {
      if (category === 'blog') continue; // Skip blog posts for documentation
      
      const categoryInfo = baseDocumentation?.[category] || {
        title: this.formatCategoryTitle(category),
        description: `Documentation for ${category}`,
      };
      
      enhanced[category] = {
        ...categoryInfo,
        pages: pages.map(page => ({
          title: page.title || 'Untitled',
          url: page.url,
          description: page.metaDescription || page.ogDescription || 'No description available',
          keyPoints: this.extractKeyPoints(page.content || '')
        }))
      };
    }
    
    return enhanced;
  }

  private formatCategoryTitle(category: string): string {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private extractKeyPoints(content: string): string[] {
    if (!content) return [];
    
    // Simple extraction of key points from content
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).map(s => s.trim());
  }

  private createFallbackStructure(urls: SitemapUrl[]): EnhancedStructuredContent {
    const categorized = this.groupByCategory(urls);
    
    return {
      title: "NocoDB - Open Source Airtable Alternative",
      tagline: "Turn any database into a smart spreadsheet with a no-code platform",
      overview: "NocoDB is an open-source no-code platform that transforms any database into a collaborative workspace similar to Airtable. It provides a spreadsheet interface for your databases, making data management accessible to both technical and non-technical users.",
      keyFeatures: [
        "Connect to existing databases (MySQL, PostgreSQL, SQLite, SQL Server, etc.)",
        "Rich spreadsheet interface with collaborative features",
        "REST & GraphQL APIs with JWT authentication",
        "Team collaboration with fine-grained access control",
        "App store for third-party integrations",
        "Programmatic access via APIs and SDKs"
      ],
      gettingStarted: {
        title: "Quick Start Guide",
        steps: [
          "Install NocoDB using Docker, npm, or our cloud service",
          "Connect your existing database or create a new one",
          "Configure your tables and relationships",
          "Set up user access and permissions",
          "Start collaborating with your team"
        ]
      },
      documentation: {},
      faq: [
        {
          question: "What databases does NocoDB support?",
          answer: "NocoDB supports MySQL, PostgreSQL, SQLite, SQL Server, and many other popular databases."
        },
        {
          question: "Is NocoDB really free?",
          answer: "Yes, NocoDB is open-source and free to use. We also offer cloud hosting and enterprise features."
        }
      ],
      useCases: [
        "Project management and tracking",
        "Customer relationship management (CRM)",
        "Content management systems",
        "Inventory and asset management",
        "Data analysis and reporting"
      ]
    };
  }

  private async generateEnhancedDocument(content: EnhancedStructuredContent): Promise<void> {
    let document = '';
    
    // Header
    document += `# ${content.title}\n\n`;
    document += `${content.tagline}\n\n`;
    
    // Overview
    document += `## Overview\n\n${content.overview}\n\n`;
    
    // Key Features
    document += `## Key Features\n\n`;
    content.keyFeatures.forEach(feature => {
      document += `- ${feature}\n`;
    });
    document += '\n';
    
    // Getting Started
    document += `## ${content.gettingStarted.title}\n\n`;
    content.gettingStarted.steps.forEach((step, index) => {
      document += `${index + 1}. ${step}\n`;
    });
    document += '\n';
    
    // Documentation
    document += `## Documentation\n\n`;
    for (const [category, info] of Object.entries(content.documentation)) {
      document += `### ${info.title}\n`;
      document += `${info.description}\n\n`;
      
      info.pages.forEach((page: any) => {
        document += `#### ${page.title}\n`;
        document += `${page.description}\n`;
        document += `URL: ${page.url}\n`;
        if (page.keyPoints.length > 0) {
          document += `Key Points:\n`;
          page.keyPoints.forEach((point: string) => {
            document += `- ${point}\n`;
          });
        }
        document += '\n';
      });
    }
    
    // Use Cases
    document += `## Common Use Cases\n\n`;
    content.useCases.forEach(useCase => {
      document += `- ${useCase}\n`;
    });
    document += '\n';
    
    // FAQ
    document += `## Frequently Asked Questions\n\n`;
    content.faq.forEach(item => {
      document += `**Q: ${item.question}**\n`;
      document += `A: ${item.answer}\n\n`;
    });
    
    // Footer
    document += `---\n`;
    document += `Generated on: ${new Date().toISOString()}\n`;
    document += `Total pages processed: ${Object.values(content.documentation).reduce((acc: number, cat: any) => acc + cat.pages.length, 0)}\n`;
    
    // Write to file
    fs.writeFileSync(this.outputFile, document, 'utf-8');
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    console.log('💡 Set your OpenAI API key: export OPENAI_API_KEY="your-api-key-here"');
    process.exit(1);
  }
  
  const siteUrl = process.env.SITE_URL || 'https://docs.nocodb.com';
  const outputFile = process.env.OUTPUT_FILE || 'llms-enhanced.txt';
  
  const generator = new GPTEnhancedLLMGenerator(apiKey, siteUrl, outputFile);
  
  try {
    await generator.generateEnhancedLLMContent();
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 