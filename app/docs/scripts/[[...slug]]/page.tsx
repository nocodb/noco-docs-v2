import {scriptsSource} from '@/lib/source';
import {DocsBody, DocsDescription, DocsTitle,} from 'fumadocs-ui/page';
import {notFound} from 'next/navigation';
import {getMDXComponents} from '@/mdx-components';
import MdxLink from "@/components/mdx/MdxLink";
import { AnchorProvider } from 'fumadocs-core/toc';
import { Toc, TOCScrollArea, } from 'fumadocs-ui/components/layout/toc';
import ClerkTOCItems from 'fumadocs-ui/components/layout/toc-clerk';
import TOCMobile from '@/components/layout/TOCMobile';
import { getPageTreePeers } from 'fumadocs-core/server';
import { Cards, Card } from 'fumadocs-ui/components/card';

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = scriptsSource.getPage(params.slug);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <AnchorProvider toc={page.data.toc}>
            <Toc className='hidden xl:sticky xl:block top-[120px] w-68 max-h-[calc(100vh-120px)] order-last shrink-0 overflow-auto'>
                <TOCScrollArea className='w-64'>
                    <ClerkTOCItems items={page.data.toc} />
                </TOCScrollArea>
            </Toc>
            <TOCMobile toc={page.data.toc}/>
            <div className='flex flex-col flex-1 gap-4 mx-auto overflow-y-auto shrink-1 max-w-179 relative p-4'>
                <DocsTitle>{page.data.title}</DocsTitle>
                <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
                <DocsBody>
                    <MDXContent
                        components={getMDXComponents({
                            a: MdxLink
                        })}
                        />
                </DocsBody>
                <Cards>
                    {getPageTreePeers(scriptsSource.pageTree, page.url).slice(0, 2).map((peer) => (
                        <Card key={peer.url} title={peer.name} href={peer.url}>
                            {peer.description}
                        </Card>
                    ))}
                </Cards>
                <div className="py-8">
                </div>
            </div>
        </AnchorProvider>
    );
}

export async function generateStaticParams() {
    return scriptsSource.generateParams();
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = scriptsSource.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
