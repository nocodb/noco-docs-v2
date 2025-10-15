import { source, blogSource, scriptsSource, selfHostingSource, changelogSource, legalDocsSource } from '@/lib/source';
import type { InferPageType } from 'fumadocs-core/source';

export async function getLLMText(page: InferPageType<typeof source | typeof blogSource | typeof scriptsSource | typeof selfHostingSource | typeof changelogSource | typeof legalDocsSource>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description || ''}

${processed}`;
}