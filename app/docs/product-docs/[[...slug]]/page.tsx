import { getPageTreePeers } from "fumadocs-core/page-tree";
import { AnchorProvider } from "fumadocs-core/toc";
import { Card, Cards } from "fumadocs-ui/components/card";
import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/layout/toc";
import ClerkTOCItems from "fumadocs-ui/components/layout/toc-clerk";
import { PageTOC } from "fumadocs-ui/layouts/docs/page";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TOCMobile from "@/components/layout/TOCMobile";
import MdxLink from "@/components/mdx/MdxLink";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;
  const tags = (page.data as any).tags as string[] | undefined;

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
            <MDXContent
              components={getMDXComponents({
                a: MdxLink,
              })}
            />
          </DocsBody>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Tags:</span>
              {tags.map((tag) => (
                <Link
                  className="inline-flex items-center rounded-md border border-nc-border-grey-light bg-nc-background-default px-2.5 py-0.5 font-medium text-sm transition-colors hover:border-nc-border-grey hover:bg-nc-background-grey-light hover:text-nc-content-brand"
                  href={`/docs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  key={tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <Cards>
            {getPageTreePeers(source.pageTree, page.url)
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
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
