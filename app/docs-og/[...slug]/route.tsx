import { getPageImage, blogSource } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = blogSource.getPage(slug.slice(0, -1));
  
  if (!page) notFound();

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        primaryColor="#3366ff"
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
