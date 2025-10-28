import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import Subscribe from "@/components/blog/Subscribe";
import { Separator } from "@/components/ui/separator";
import { blogSource } from "@/lib/source";

export const metadata = {
  title: "Blog | NocoDB",
  description:
    "Insights, tutorials, and updates from the team building the future of no-code databases.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const posts = blogSource
    .getPages()
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  const categories = new Set<string>();
  posts.forEach((post) => {
    categories.add(post.data.category ?? "Uncategorized");
  });

  const selectedCategory = (await searchParams)?.category;
  const searchQuery = (await searchParams)?.search?.toLowerCase() || "";
  const currentPage = Number.parseInt((await searchParams)?.page || "1", 10);
  const postsPerPage = 15;

  const categoryFilteredPosts = selectedCategory
    ? posts.filter(
        (post) => (post.data.category ?? "Uncategorized") === selectedCategory
      )
    : posts;

  const searchFilteredPosts = searchQuery
    ? categoryFilteredPosts.filter((post) => {
        const titleMatch = post.data.title?.toLowerCase().includes(searchQuery);
        const descriptionMatch = post.data.description
          ?.toLowerCase()
          .includes(searchQuery);
        const authorMatch = post.data.author
          ?.toLowerCase()
          .includes(searchQuery);
        return titleMatch || descriptionMatch || authorMatch;
      })
    : categoryFilteredPosts;

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = searchFilteredPosts.slice(0, endIndex);

  const hasMorePosts = endIndex < searchFilteredPosts.length;
  const nextPage = currentPage + 1;
  return (
    <main className="w-full bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-white">
      <div className="container relative py-10">
        {/* Decorative background elements */}
        <div className="-z-10 absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="-z-10 absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-3xl" />

        <h1 className="font-semibold text-[40px] text-nc-content-grey-emphasis leading-15.5">
          Blog
        </h1>
        <h5 className="mt-6 font-medium text-base text-nc-content-grey-subtle leading-6 lg:mt-2">
          Insights, tutorials, and updates from the team building the future of
          no-code databases.
        </h5>
      </div>
      <Separator className="mb-12" />

      <div className="container">
        {displayedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Image
              alt="No results found"
              className="mb-6"
              height={300}
              src="/img/no-search-result-found.png"
              width={400}
            />
            <h2 className="mb-2 font-semibold text-2xl text-nc-content-grey-emphasis">
              No posts found
            </h2>
            <p className="text-nc-content-grey-subtle">
              {searchQuery
                ? `No blog posts match "${searchQuery}". Try a different search term.`
                : selectedCategory
                  ? `No blog posts found in the "${selectedCategory}" category.`
                  : "No blog posts available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <BlogCard key={post.url} post={post} />
            ))}
          </div>
        )}
      </div>

      {hasMorePosts && (
        <div className="mb-12 text-center">
          <Link
            className="rounded-md bg-fd-accent px-6 py-2 font-medium text-fd-accent-foreground hover:bg-fd-accent/80"
            href={{
              pathname: "/blog",
              query: {
                ...(selectedCategory ? { category: selectedCategory } : {}),
                ...(searchQuery ? { search: searchQuery } : {}),
                page: nextPage.toString(),
              },
            }}
            scroll={false}
          >
            Show More
          </Link>
        </div>
      )}
      <Subscribe />
      <Separator className="mb-12" />
    </main>
  );
}
