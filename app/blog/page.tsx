import {blogSource} from "@/lib/source";
import {FeaturedPost} from "@/components/Blog/FeaturedPost";
import {BlogCard} from "@/components/Blog/BlogCard";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {CategoryTabs} from "@/components/Blog/Category";
import Subscribe from "@/components/Blog/Subscribe";

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

    const featuredPost = posts?.length ? posts[0] : null;

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
        <main className="py-8 w-full md:py-12">
            <div className="container py-20 lg:py-16">
                <h1 className="text-center text-nc-content-grey-emphasis text-[40px] font-[700] leading-15.5">
                    Blog
                </h1>
                <h5 className="text-nc-content-grey-subtle text-center mt-10 lg:mt-6 text-base leading-6 font-bold">
                    Insights, tutorials, and updates <br/>
                    from the team building the future of no-code databases.
                </h5>
            </div>
            <div className="container mx-auto">
                {featuredPost && (
                    <FeaturedPost post={featuredPost}/>
                )}
            </div>

            <Subscribe/>

            <div className="container mt-5 lg:mt-20">
                <CategoryTabs categories={Array.from(categories)} selectedCategory={selectedCategory}/>
                <Separator className="border-nc-border-grey-medium"/>
            </div>

            <div className="container py-8 lg:pt-15 lg:pb-20 gap-8 lg:gap-16 grid grid-cols-1 lg:grid-cols-2">
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