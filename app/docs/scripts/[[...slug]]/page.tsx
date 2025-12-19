import { getPageTreePeers } from "fumadocs-core/page-tree";
import { AnchorProvider } from "fumadocs-core/toc";
import { Card, Cards } from "fumadocs-ui/components/card";
import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/toc/index";
import { TOCItems as ClerkTOCItems } from "fumadocs-ui/components/toc/clerk";
import { PageTOC } from "fumadocs-ui/layouts/docs/page";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import TOCMobile from "@/components/layout/TOCMobile";
import { scriptsSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = scriptsSource.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <TOCProvider toc={page.data.toc}>
      <AnchorProvider toc={page.data.toc}>
        <PageTOC className="!top-[120px] order-last hidden max-h-[calc(100vh-120px)] w-68 shrink-0 overflow-auto xl:sticky xl:block">
          <TOCScrollArea className="w-64">
            <ClerkTOCItems />
          </TOCScrollArea>
        </PageTOC>
        <TOCMobile />
        <div className="container relative mx-auto flex max-w-179 flex-1 shrink-1 flex-col gap-4 overflow-y-auto p-4">
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-0">
            {page.data.description}
          </DocsDescription>
          <DocsBody>
            <MDXContent components={getMDXComponents()} />
          </DocsBody>
          <Cards>
            {getPageTreePeers(scriptsSource.pageTree, page.url)
              .slice(0, 2)
              .map((peer) => (
                <Card href={peer.url} key={peer.url} title={peer.name}>
                  {peer.description}
                </Card>
              ))}
          </Cards>
          <div className="py-8" />
        </div>
      </AnchorProvider>
    </TOCProvider>
  );
}

export function generateStaticParams() {
  return scriptsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = scriptsSource.getPage(params.slug);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
