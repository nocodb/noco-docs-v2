
"use client";
import { TocPopover, TocPopoverTrigger, TocPopoverContent, TOCScrollArea } from "fumadocs-ui/components/layout/toc";
import ClerkTOCItems from "fumadocs-ui/components/layout/toc-clerk";
import { TableOfContents } from "fumadocs-core/server";
import { useState } from "react";
export default function TOCMobile({toc}: {toc: TableOfContents}) {
    const [open, setOpen] = useState(false);

    return (
        <TocPopover className="h-10 sticky xl:hidden top-28 z-8 bg-nc-background-default/80 backdrop-blur-md" open={open} onOpenChange={setOpen}>
            <TocPopoverTrigger className="w-full" items={toc} />
            <TocPopoverContent className="backdrop-blur-md bg-nc-background-default/98 py-4">
                <TOCScrollArea className="px-4 xl:px-6">
                    <ClerkTOCItems items={toc} />
                </TOCScrollArea>
            </TocPopoverContent>
        </TocPopover>
    )
}