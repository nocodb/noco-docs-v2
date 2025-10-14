import {blogSource} from "@/lib/source";
import BlogCard from "@/components/blog/BlogCard";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {CategoryTabs} from "@/components/blog/Category";
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
        <main className="py-8 w-full md:py-12">
            <div className="container py-10 lg:pt-16 lg:pb-8">
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

            
            <div className="container mt-5">
                
                <CategoryTabs categories={Array.from(categories)} selectedCategory={selectedCategory} searchQuery={searchQuery}/>
                <Separator className="border-nc-border-grey-medium"/>
            </div>

            <div className="container py-8 lg:pt-15 lg:pb-20 gap-8 lg:gap-16 grid grid-cols-1 lg:grid-cols-2">
                {displayedPosts.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
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
                    displayedPosts.map((post) => (
                        <BlogCard post={post} key={post.url}/>
                    ))
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
            <Separator/>
        </main>
    );
}