import { generate as DefaultImage } from "fumadocs-ui/og";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { blogSource, getPageImage } from "@/lib/metadata";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = blogSource.getPage(slug.slice(0, -1));

  if (!page) {
    notFound();
  }

  return new ImageResponse(
    <DefaultImage
      description={page.data.description}
      primaryColor="#3366ff"
      title={page.data.title}
    />,
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
