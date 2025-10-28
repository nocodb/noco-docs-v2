import {blogSource} from "@/lib/source";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getPageImage} from "@/lib/metadata";
import {calculateReadingTime} from "@/lib/timeToRead";
import defaultMdxComponents from "fumadocs-ui/mdx";
import CustomToc from "@/components/blog/CustomToc";
import BlogCard from "@/components/blog/BlogCard";
import {getCategoryColor} from "@/lib/categoryColor";
import Subscribe from "@/components/blog/Subscribe";
import SignUp from "@/components/blog/SignUp";

export async function generateMetadata(props: {
    params: Promise<{ slug?: string }>;
}) {
    const params = await props.params;

    if (!params.slug) {
        return notFound();
    }

    const page = blogSource.getPage([params.slug]);
    if (!page) notFound();

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
            card: 'summary_large_image',
            title: page.data.title,
            description: page.data.description,
            images: [imageUrl],
        },
        icons: {
            icon: '/img/favicon.png',
        }
    };
}

export default async function page(props: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const params = await props.params;
    const page = blogSource.getPage([params.slug]);

    if (!page) notFound();

    const related = blogSource.getPages().filter((p) => {
        return p.data.category === page.data.category && p.slugs !== page.slugs;
    }).sort((a, b) => {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    }).slice(0, 2);

    return (
        <div className="relative w-full bg-gradient-to-b from-blue-50/50 via-purple-50/30 via-30% to-white to-60%">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl -z-10" />
            
            {/* Hero Section */}
            <div className="container py-4 lg:py-12">
                {/* Category Badge */}
                <Link className="inline-block mb-6" href={`/blog?category=${page.data?.category}`}>
                    <div 
                        style={{backgroundColor: getCategoryColor(page?.data?.category)}}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-nc-content-grey-default hover:opacity-80 transition-opacity"
                    >
                        {page.data?.category}
                    </div>
                </Link>
                
                {/* Title */}
                <h1 className="text-nc-content-grey-emphasis text-3xl lg:text-5xl font-bold leading-tight lg:leading-tight mb-6 max-w-4xl">
                    {page.data?.title}
                </h1>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-nc-content-grey-subtle-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-nc-background-grey-light flex items-center justify-center text-nc-content-grey-emphasis font-semibold">
                            {page?.data?.author?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{page?.data?.author}</span>
                    </div>
                    <span className="text-nc-content-grey-muted">•</span>
                    <span>{new Date(page.data.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}</span>
                    <span className="text-nc-content-grey-muted">•</span>
                    <span>{calculateReadingTime(page?.data?.structuredData)}</span>
                </div>
            </div>

            <article className="container py-10 lg:py-16 mx-auto">
                <div className="flex nc-blog-layout relative gap-8">
                    <div className="sticky hidden lg:block top-8 self-start space-y-8">
                        <CustomToc toc={page.data.toc}/>
                        <SignUp />
                    </div>
                    <div className="prose min-w-0 flex-1">
                        <page.data.body components={defaultMdxComponents}/>
                    </div>
                </div>
            </article>
            <Subscribe/>

            {
                related?.length === 2 ? (
                    <div className="bg-nc-background-grey-extra-light/30 py-16">
                        <div className="container mx-auto">
                            <h2 className="text-nc-content-grey-emphasis text-3xl lg:text-4xl font-bold mb-8">
                                Related Articles
                            </h2>
                            <div className="flex flex-col gap-0">
                                {related.map((post) => (
                                    <BlogCard post={post} key={post.url}/>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (<div className="py-10"></div>)
            }
        </div>
    );
}