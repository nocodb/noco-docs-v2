import {blogSource} from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Link from "next/link";
import {notFound} from "next/navigation";

export default async function page(props: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const params = await props.params;
    const page = blogSource.getPage([params.slug]);

    if (!page) notFound();

    return (
        <>
            <div className="container md:px-8">
                <div className="flex gap-4 items-center">
                    {
                        page.data?.category ? (
                            <Link scroll={false}
                                  href={`/blog?category=${encodeURIComponent(page.data.category)}`}
                                  className="rounded-md px-4 py-2 text-sm font-normal transition-colors border border-fd-muted-foreground/20 bg-transparent text-fd-foreground hover:bg-fd-muted/20">
                                {page.data.category}
                            </Link>
                        ) : (<></>)
                    }
                    <div className="text-sm text-fd-muted-foreground">
                        {new Date(page.data.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </div>
                </div>
                <h1 className="mt-6 text-3xl font-normal">{page.data.title}</h1>
                <p className="mt-2 text-fd-muted-foreground">{page.data.description}</p>
            </div>
            <article className="container flex flex-col px-0 pb-8 lg:flex-row lg:px-4">
                <div className="prose min-w-0 flex-1 p-4">
                    <page.data.body components={defaultMdxComponents}/>
                </div>
                <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px]">
                    <div>
                        <p className="mb-1 text-fd-muted-foreground">Written by</p>
                        <p className="font-medium">{page.data.author}</p>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
                        <p className="font-medium">
                            {new Date(page.data.date ?? page.file.name).toDateString()}
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
}