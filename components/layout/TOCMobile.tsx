
"use client";
import { TocPopover, TocPopoverTrigger, TocPopoverContent, TOCScrollArea } from "fumadocs-ui/components/layout/toc";
import ClerkTOCItems from "fumadocs-ui/components/layout/toc-clerk";
import { TableOfContents } from "fumadocs-core/server";
import { useState } from "react";
export default function TOCMobile({toc}: {toc: TableOfContents}) {
    const [open, setOpen] = useState(false);

    return (
        <TocPopover className="h-10 sticky md:hidden top-28 z-8 bg-nc-background-default" open={open} onOpenChange={setOpen}>
            <TocPopoverTrigger className="w-full" items={toc} />
            <TocPopoverContent className="backdrop-blur-sm opacity-90 bg-nc-background-default py-4">
                <TOCScrollArea className="px-4 md:px-6">
                    <ClerkTOCItems items={toc} />
                </TOCScrollArea>
            </TocPopoverContent>
        </TocPopover>
    )
}