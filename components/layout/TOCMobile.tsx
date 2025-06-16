
"use client";
import { TOCScrollArea } from "fumadocs-ui/components/layout/toc";
import { PageTOCPopover, PageTOCPopoverTrigger, PageTOCPopoverContent  } from 'fumadocs-ui/layouts/docs/page'
import ClerkTOCItems from "fumadocs-ui/components/layout/toc-clerk";
export default function TOCMobile() {
    return (
        <PageTOCPopover className="sticky xl:hidden !top-[117px] py-4 z-8 bg-nc-background-default/80 backdrop-blur-md">
            <PageTOCPopoverTrigger className="w-full" />
            <PageTOCPopoverContent className="backdrop-blur-md bg-nc-background-default/98 py-4">
                <TOCScrollArea className="px-4 xl:px-6">
                    <ClerkTOCItems />
                </TOCScrollArea>
            </PageTOCPopoverContent>
        </PageTOCPopover>
    )
}   