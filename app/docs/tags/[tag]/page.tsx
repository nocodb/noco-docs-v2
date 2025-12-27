import { Card, Cards } from "fumadocs-ui/components/card";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tagSlug = decodeURIComponent(params.tag);

  const pages = source.getPages().filter((page) => {
    const tags = (page.data as any).tags as string[] | undefined;
    return tags?.some(
      (t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug.toLowerCase()
    );
  });

  // Find the actual tag name (with proper casing) from the first matching page
  const actualTag =
    pages.length > 0
      ? ((pages[0].data as any).tags as string[] | undefined)?.find(
          (t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug.toLowerCase()
        ) || tagSlug
      : tagSlug;

  if (pages.length === 0) {
    notFound();
  }

  return (
    <div className="container relative mx-auto flex max-w-179 flex-1 shrink-1 flex-col gap-8 overflow-y-auto p-4 pt-32">
      <div>
        <h1 className="mb-2 font-bold text-4xl">{actualTag}</h1>
        <p className="text-muted-foreground">
          {pages.length} {pages.length === 1 ? "document" : "documents"} tagged
          with "{actualTag}"
        </p>
      </div>

      <Cards>
        {pages.map((page) => (
          <Card href={page.url} key={page.url} title={page.data.title}>
            {page.data.description}
          </Card>
        ))}
      </Cards>
    </div>
  );
}

export async function generateStaticParams() {
  const allTags = new Set<string>();

  source.getPages().forEach((page) => {
    const tags = (page.data as any).tags as string[] | undefined;
    tags?.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags).map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tagSlug = decodeURIComponent(params.tag);

  // Find the actual tag name with proper casing
  const pages = source.getPages();
  let actualTag = tagSlug;

  for (const page of pages) {
    const tags = (page.data as any).tags as string[] | undefined;
    const found = tags?.find(
      (t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug.toLowerCase()
    );
    if (found) {
      actualTag = found;
      break;
    }
  }

  return {
    title: `Tag: ${actualTag}`,
    description: `All documentation pages tagged with "${actualTag}"`,
  };
}
