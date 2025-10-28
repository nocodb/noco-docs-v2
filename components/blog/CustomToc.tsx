"use client";
import type { TableOfContents } from "fumadocs-core/toc";
import * as Base from "fumadocs-core/toc";
import { useRef } from "react";

export default function CustomToc({ toc }: { toc: TableOfContents }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const minDepth = Math.min(...toc.map((item) => item.depth));
  return (
    <div className="toc-container top-0 w-64" ref={containerRef}>
      <div className="mb-8 font-bold text-base text-nc-content-grey-emphasis leading-6">
        In this Blog
      </div>
      <Base.AnchorProvider toc={toc}>
        <Base.ScrollProvider containerRef={containerRef}>
          {toc.map((item) => {
            const normalizedDepth = item.depth - minDepth;
            return (
              <Base.TOCItem
                className="block border-transparent border-l-2 py-2 text-nc-content-grey-subtle text-sm data-[active=true]:border-nc-border-brand data-[active=true]:font-bold data-[active=true]:text-nc-content-grey-emphasis"
                href={item.url}
                key={item.url}
                style={{ paddingLeft: `${normalizedDepth * 12 + 16}px` }}
              >
                {item.title}
              </Base.TOCItem>
            );
          })}
        </Base.ScrollProvider>
      </Base.AnchorProvider>
    </div>
  );
}
