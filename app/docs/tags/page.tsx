import Link from "next/link";
import { source } from "@/lib/source";

interface TagInfo {
  name: string;
  count: number;
  slug: string;
}

export default function TagsIndexPage() {
  // Collect all tags with their counts, normalizing case-insensitive duplicates
  const tagMap = new Map<string, { name: string; count: number }>();
  
  source.getPages().forEach((page) => {
    const tags = (page.data as any).tags as string[] | undefined;
    tags?.forEach((tag) => {
      const slug = tag.toLowerCase().replace(/\s+/g, "-");
      const existing = tagMap.get(slug);
      
      if (existing) {
        // Increment count, keep the first encountered name
        existing.count += 1;
      } else {
        tagMap.set(slug, { name: tag, count: 1 });
      }
    });
  });

  const tags: TagInfo[] = Array.from(tagMap.entries())
    .map(([slug, { name, count }]) => ({
      name,
      count,
      slug,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Group tags alphabetically by first letter
  const groupedTags = tags.reduce((acc, tag) => {
    const firstLetter = tag.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {} as Record<string, TagInfo[]>);

  const letters = Object.keys(groupedTags).sort();

  return (
    <div className="container relative mx-auto flex max-w-179 flex-1 shrink-1 flex-col gap-8 overflow-y-auto p-4 py-32">
      <div>
        <h1 className="text-4xl font-bold mb-2">All Tags</h1>
        <p className="text-muted-foreground">
          Browse documentation by tags
        </p>
      </div>

      <div className="space-y-8">
        {letters.map((letter) => (
          <div key={letter} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{letter}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedTags[letter].map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/docs/tags/${tag.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-nc-border-grey-light bg-nc-background-default p-4 transition-colors hover:border-nc-border-grey hover:bg-nc-background-grey-light"
                >
                  <span className="font-medium group-hover:text-nc-content-brand">
                    {tag.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "All Tags",
    description: "Browse all documentation tags",
  };
}
