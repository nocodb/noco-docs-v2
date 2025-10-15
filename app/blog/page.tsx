import {blogSource} from "@/lib/source";
import BlogCard from "@/components/blog/BlogCard";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import Subscribe from "@/components/blog/Subscribe";
import {SearchInput} from "@/components/blog/SearchInput";
import Image from "next/image";

export const metadata = {
    title: "Blog | NocoDB",
    description: "Insights, tutorials, and updates from the team building the future of no-code databases.",
}

export default async function BlogPage({searchParams}: {
    searchParams?: Promise<{ category?: string; page?: string; search?: string }>
}) {
    const posts = blogSource.getPages().sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    const categories = new Set<string>();
    posts.forEach((post) => {
        categories.add(post.data.category ?? "Uncategorized");
    });

    const selectedCategory = (await searchParams)?.category;
    const searchQuery = (await searchParams)?.search?.toLowerCase() || '';
    const currentPage = parseInt((await searchParams)?.page || "1", 10);
    const postsPerPage = 15;

    const categoryFilteredPosts = selectedCategory
        ? posts.filter((post) => (post.data.category ?? "Uncategorized") === selectedCategory)
        : posts;

    const searchFilteredPosts = searchQuery
        ? categoryFilteredPosts.filter((post) => {
            const titleMatch = post.data.title?.toLowerCase().includes(searchQuery);
            const descriptionMatch = post.data.description?.toLowerCase().includes(searchQuery);
            const authorMatch = post.data.author?.toLowerCase().includes(searchQuery);
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
            <div className="container py-10 relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl -z-10" />
                
                <h1 className="text-nc-content-grey-emphasis text-[40px] font-semibold leading-15.5">
                    Blog
                </h1>
                <h5 className="text-nc-content-grey-subtle mt-6 lg:mt-2 text-base leading-6 font-medium">
                    Insights, tutorials, and updates from the team building the future of no-code databases.
                </h5>
                <div className="mt-6">
                    <SearchInput />
                </div>
            </div>
            <Separator className="mb-12" />

            <div className="container">
                {displayedPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Image
                            src="/img/no-search-result-found.png"
                            alt="No results found"
                            width={400}
                            height={300}
                            className="mb-6"
                        />
                        <h2 className="text-2xl font-semibold text-nc-content-grey-emphasis mb-2">
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
                    <div className="flex flex-col">
                        {displayedPosts.map((post) => (
                            <BlogCard post={post} key={post.url}/>
                        ))}
                    </div>
                )}
            </div>

            {hasMorePosts && (
                <div className="text-center mb-12">
                    <Link
                        scroll={false}
                        href={{
                            pathname: "/blog",
                            query: {
                                ...(selectedCategory ? {category: selectedCategory} : {}),
                                ...(searchQuery ? {search: searchQuery} : {}),
                                page: nextPage.toString(),
                            },
                        }}
                        className="bg-fd-accent text-fd-accent-foreground px-6 py-2 rounded-md font-medium hover:bg-fd-accent/80"
                    >
                        Show More
                    </Link>
                </div>
            )}
            <Subscribe/>
            <Separator className="mb-12"/>
        </main>
    );
}