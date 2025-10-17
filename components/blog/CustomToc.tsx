"use client";
import {useRef} from "react";
import * as Base from 'fumadocs-core/toc';
import {TableOfContents} from "fumadocs-core/server";

export default function CustomToc({toc}: { toc: TableOfContents }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const minDepth = Math.min(...toc.map((item) => item.depth));
    return (
        <div className="h-48 top-0 w-64 toc-container" ref={containerRef}>
            <div className="text-nc-content-grey-emphasis font-bold leading-6 mb-8 text-base">
                In this Blog
            </div>
            <Base.AnchorProvider toc={toc}>
                <Base.ScrollProvider containerRef={containerRef}>
                    {toc.map((item) => {
                        const normalizedDepth = item.depth - minDepth;
                        return (
                            <Base.TOCItem key={item.url} href={item.url} style={{paddingLeft: `${normalizedDepth * 12 + 16}px`}}
                                          className="block py-2 text-sm text-nc-content-grey-subtle border-l-2 border-transparent data-[active=true]:border-nc-border-brand data-[active=true]:text-nc-content-grey-emphasis data-[active=true]:font-bold"
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