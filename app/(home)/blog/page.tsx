import {blogSource} from "@/lib/source";
import Link from "next/link";
import {Separator} from '@/components/ui/separator'
import Image from "next/image";

export default async function BlogPage({searchParams}: {
    searchParams?: Promise<{ category?: string; page?: string }>
}) {
    const posts = blogSource.getPages().sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    const categories = new Set<string>();
    posts.forEach((post) => {
        categories.add(post.data.category ?? "Uncategorized");
    });

    const selectedCategory = (await searchParams)?.category;
    const currentPage = parseInt((await searchParams)?.page || "1", 10);
    const postsPerPage = 15;

    const latestPosts = selectedCategory
        ? posts.filter((post) => (post.data.category ?? "Uncategorized") === selectedCategory)
        : posts

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayedPosts = latestPosts.slice(0, endIndex);

    const hasMorePosts = endIndex < latestPosts.length;
    const nextPage = currentPage + 1;

    return (
        <main className="max-sm:px-4 md:py-12">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-4xl font-medium mb-4">Blog</h1>
                    <p className="text-fd-muted-foreground">
                        Insights, tutorials, and updates from the team building the future of no-code databases.
                    </p>
                </div>
                <div className="flex flex-start gap-3 mb-12 flex-wrap">
                    <Link scroll={false}
                          href="/blog"
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border border-fd-muted-foreground/20 ${
                              !selectedCategory
                                  ? "bg-fd-accent text-fd-accent-foreground"
                                  : "bg-transparent text-fd-foreground hover:bg-fd-muted/20"
                          }`}
                    >
                        All
                    </Link>
                    {Array.from(categories).map((category) => (
                        <Link
                            scroll={false}
                            key={category}
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border border-fd-muted-foreground/20 ${
                                selectedCategory === category
                                    ? "bg-fd-accent text-fd-accent-foreground"
                                    : "bg-transparent text-fd-foreground hover:bg-fd-muted/20"
                            }`}
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>


            <Separator className="mb-12"/>
            <section className="mb-12 container bg-fd-background">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayedPosts.map((post) => (
                        <Link
                            scroll={false}
                            key={post.url}
                            href={post.url}
                            className="group rounded-xl border border-fd-border/50 shadow-sm  transition-all duration-300 hover:shadow-md hover:bg-fd-muted/10"
                        >
                            <div className="relative w-full h-52  rounded-t-xl bg-fd-muted/20 overflow-hidden mb-4">
                                <Image src={post?.data?.image} fill alt={post.data.title}
                                       className="object-cover group-hover:scale-105 rounded-t-xl rounded-b-none transition-transform duration-300"/>
                            </div>

                            <div className="flex flex-col px-5 pb-5 space-y-2">
                                <h3 className="text-lg font-semibold text-fd-foreground line-clamp-2 leading-tight">
                                    {post.data.title}
                                </h3>

                                <p className="text-sm text-fd-muted-foreground line-clamp-2">
                                    {post.data.description}
                                </p>

                                <div className="flex items-center gap-2">
            <span className="text-xs text-fd-muted-foreground">
              {new Date(post.data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              })}
            </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {hasMorePosts && (
                <div className="text-center mb-12">
                    <Link
                        scroll={false}
                        href={{
                            pathname: "/blog",
                            query: {
                                ...(selectedCategory ? {category: selectedCategory} : {}),
                                page: nextPage.toString(),
                            },
                        }}
                        className="bg-fd-accent text-fd-accent-foreground px-6 py-2 rounded-md font-medium hover:bg-fd-accent/80"
                    >
                        Show More
                    </Link>
                </div>
            )}
        </main>
    );
}