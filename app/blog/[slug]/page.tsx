import defaultMdxComponents from "fumadocs-ui/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import CustomToc from "@/components/blog/CustomToc";
import SignUp from "@/components/blog/SignUp";
import Subscribe from "@/components/blog/Subscribe";
import { getCategoryColor } from "@/lib/categoryColor";
import { getPageImage } from "@/lib/metadata";
import { blogSource } from "@/lib/source";
import { calculateReadingTime } from "@/lib/timeToRead";

export async function generateMetadata(props: {
  params: Promise<{ slug?: string }>;
}) {
  const params = await props.params;

  if (!params.slug) {
    return notFound();
  }

  const page = blogSource.getPage([params.slug]);
  if (!page) {
    notFound();
  }

  const imageUrl = getPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
    icons: {
      icon: "/img/favicon.png",
    },
  };
}

export default async function page(props: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);

  if (!page) {
    notFound();
  }

  const related = blogSource
    .getPages()
    .filter(
      (p) => p.data.category === page.data.category && p.slugs !== page.slugs
    )
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )
    .slice(0, 2);

  return (
    <div className="relative w-full bg-gradient-to-b from-blue-50/50 via-30% via-purple-50/30 to-60% to-white">
      {/* Decorative background elements */}
      <div className="-z-10 absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl" />
      <div className="-z-10 absolute top-[40%] left-0 h-[400px] w-[400px] rounded-full bg-purple-400/10 blur-3xl" />

      {/* Hero Section */}
      <div className="container py-4 lg:py-12">
        {/* Category Badge */}
        <Link
          className="mb-6 inline-block"
          href={`/blog?category=${page.data?.category}`}
        >
          <div
            className="rounded-lg px-3 py-1.5 font-medium text-nc-content-grey-default text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: getCategoryColor(page?.data?.category) }}
          >
            {page.data?.category}
          </div>
        </Link>

        {/* Title */}
        <h1 className="mb-6 max-w-4xl font-bold text-3xl text-nc-content-grey-emphasis leading-tight lg:text-5xl lg:leading-tight">
          {page.data?.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-nc-content-grey-subtle-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nc-background-grey-light font-semibold text-nc-content-grey-emphasis">
              {page?.data?.author?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{page?.data?.author}</span>
          </div>
          <span className="text-nc-content-grey-muted">•</span>
          <span>
            {new Date(page.data.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-nc-content-grey-muted">•</span>
          <span>{calculateReadingTime(page?.data?.structuredData)}</span>
        </div>
      </div>

      <article className="container mx-auto py-10 lg:py-16">
        <div className="nc-blog-layout relative flex gap-8">
          <div className="sticky top-8 hidden space-y-8 self-start lg:block">
            <CustomToc toc={page.data.toc} />
            <SignUp />
          </div>
          <div className="prose min-w-0 flex-1">
            <page.data.body components={defaultMdxComponents} />
          </div>
        </div>
      </article>
      <Subscribe />

      {related?.length === 2 ? (
        <div className="bg-nc-background-grey-extra-light/30 py-16">
          <div className="container mx-auto">
            <h2 className="mb-8 font-bold text-3xl text-nc-content-grey-emphasis lg:text-4xl">
              Related Articles
            </h2>
            <div className="flex flex-col gap-0">
              {related.map((post) => (
                <BlogCard key={post.url} post={post} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10" />
      )}
    </div>
  );
}
