import {blogSource} from "@/lib/source";
import {FeaturedPost} from "@/components/Blog/FeaturedPost";
import {BlogCard} from "@/components/Blog/BlogCard";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {CategoryTabs} from "@/components/Blog/Category";

export const metadata = {
    title: "Blog | NocoDB",
    description: "Insights, tutorials, and updates from the team building the future of no-code databases.",
}

export default async function BlogPage({searchParams}: {
    searchParams?: Promise<{ category?: string; page?: string }>
}) {
    const posts = blogSource.getPages().sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    const featuredPost = posts?.length ? posts[0] : null; // Get first post

    const latestPosts = posts.filter(post => post.data?.title !== featuredPost?.data?.title);

    const categories = new Set<string>();
    latestPosts.forEach((post) => {
        categories.add(post.data.category ?? "Uncategorized");
    });

    const selectedCategory = (await searchParams)?.category;
    const currentPage = parseInt((await searchParams)?.page || "1", 10);
    const postsPerPage = 15;

    const categoryFilteredPosts = selectedCategory
        ? latestPosts.filter((post) => (post.data.category ?? "Uncategorized") === selectedCategory)
        : latestPosts;

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayedPosts = categoryFilteredPosts.slice(0, endIndex);

    const hasMorePosts = endIndex < categoryFilteredPosts.length;
    const nextPage = currentPage + 1;
    return (
        <main className="py-8 md:py-12">
            <div className="container py-20 h-full w-full">
                <h1 className="text-center text-nc-content-grey-emphasis leading-10 font-semibold text-4xl">
                    Blog
                </h1>
                <div className="text-center font-semibold mt-[40px] text-base lg:text-xl">
                    Insights, tutorials, and updates <br/> from the team building the future of no-code databases.
                </div>
            </div>
            <div className="container mx-auto">
                {featuredPost && (
                    <FeaturedPost post={featuredPost}/>
                )}
            </div>

            <div className="container mt-10">
                <CategoryTabs categories={Array.from(categories)} selectedCategory={selectedCategory}/>
                <Separator className="border-nc-border-grey-medium"/>
            </div>

            <div className="container py-8 lg:py-20 gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-2">
                {displayedPosts.map((post) => (
                    <BlogCard post={post} key={post.url}/>
                ))}
            </div>

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

            <Separator/>
        </main>
    );
}