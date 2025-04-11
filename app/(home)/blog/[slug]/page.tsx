import {blogSource} from "@/lib/source";
import Link from "next/link";
import {notFound} from "next/navigation";
import {metadataImage} from "@/lib/metadata";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {calculateReadingTime} from "@/lib/timeToRead";
import Image from "next/image";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {CustomToc} from "@/components/Blog/TableOfContents";
import {BlogCard} from "@/components/Blog/BlogCard";

export async function generateMetadata(props: {
    params: Promise<{ slug?: string }>;
}) {
    const params = await props.params;

    if (!params.slug) {
        return {};
    }

    const page = blogSource.getPage([params.slug]);
    if (!page) notFound();


    return metadataImage.withImage(page.slugs, {
        title: page.data.title,
        description: page.data.description,
    });
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
        <>
            <div className="container pt-[40px] lg:px-10 pb-10">
                <Link className="text-sm font-normal" href="/blog">
                    <Button className="cursor-pointer hover:underline underline-red" variant="none">
                        <div className="flex text-nc-content-grey-subtle items-center gap-2">
                            <ArrowLeft/>
                            Back
                        </div>
                    </Button>
                </Link>
                <div className="my-8 flex flex-col gap-3">
                    <div
                        className="text-nc-content-grey-emphasis text-2xl lg:text-[40px] font-bold leading-9 lg:leading-[64px]">
                        {page.data?.title}
                    </div>
                    <div className="text-base lg:text-xl text-nc-content-grey-default font-bold leading-6 lg:leading-8">
                        {page.data?.description}
                    </div>
                </div>
                <div className="flex justify-center items-center leading-6 text-nc-content-grey-subtle-2">
                    <div className="flex-1">
                        <span className="mr-3">
                            {page?.data?.author}
                        </span>
                        |
                        <span className="mx-3">
                            {new Date(page.data.date).toLocaleDateString("en-US", {})}
                        </span>
                    </div>

                    <div>
                        {calculateReadingTime(page?.data?.structuredData)}
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="relative w-full aspect-video">
                    <Image className="w-full object-cover" src={page.data.image} alt={page.data.title} fill/>
                </div>
            </div>

            <article className="container py-10 mx-auto">
                <div className="flex relative gap-8">
                    <div className="sticky hidden lg:block h-48 top-8">
                        <CustomToc toc={page.data.toc}/>
                    </div>
                    <div className="prose min-w-0 flex-1">
                        <page.data.body components={defaultMdxComponents}/>
                    </div>
                </div>
            </article>

            {
                related?.length === 2 ? (
                    <div className="container mx-auto">
                        <h1 className="text-nc-content-grey-emphasis leading-[62px] font-bold text-[40px]">
                            Related
                        </h1>
                        <div className="pt-15 gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-2 pb-20">
                            {related.map((post) => (
                                <BlogCard post={post} key={post.url}/>
                            ))}
                        </div>
                    </div>
                ) : (<></>)
            }

        </>
    );
}