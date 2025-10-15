import { getLLMText } from '@/lib/get-llm-txt';
import { source, scriptsSource, selfHostingSource, changelogSource, legalDocsSource } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug?: string[] }> },
) {
  const params = await props.params;
  const slug = params.slug || [];
  
  // Determine which source to use based on the path
  let page = null;
  
  if (slug[0] === 'product-docs') {
    page = source.getPage(slug.slice(1));
  } else if (slug[0] === 'scripts') {
    page = scriptsSource.getPage(slug.slice(1));
  } else if (slug[0] === 'self-hosting') {
    page = selfHostingSource.getPage(slug.slice(1));
  } else if (slug[0] === 'changelog') {
    page = changelogSource.getPage(slug.slice(1));
  } else if (slug[0] === 'legal') {
    page = legalDocsSource.getPage(slug.slice(1));
  }
  
  if (!page) notFound();
  
  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return [
    ...source.generateParams().map(param => ({ slug: ['product-docs', ...(param.slug || [])] })),
    ...scriptsSource.generateParams().map(param => ({ slug: ['scripts', ...(param.slug || [])] })),
    ...selfHostingSource.generateParams().map(param => ({ slug: ['self-hosting', ...(param.slug || [])] })),
    ...changelogSource.generateParams().map(param => ({ slug: ['changelog', ...(param.slug || [])] })),
    ...legalDocsSource.generateParams().map(param => ({ slug: ['legal', ...(param.slug || [])] })),
  ];
}
