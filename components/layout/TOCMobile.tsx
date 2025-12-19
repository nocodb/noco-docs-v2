"use client";
import { TOCScrollArea } from "fumadocs-ui/components/toc/index";
import { TOCItems as ClerkTOCItems } from "fumadocs-ui/components/toc/clerk";
import {
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverTrigger,
} from "fumadocs-ui/layouts/docs/page";
export default function TOCMobile() {
  return (
    <PageTOCPopover className="!top-[117px] sticky z-8 bg-nc-background-default/80 py-4 backdrop-blur-md xl:hidden">
      <PageTOCPopoverTrigger className="w-full" />
      <PageTOCPopoverContent className="bg-nc-background-default/98 py-4 backdrop-blur-md">
        <TOCScrollArea className="px-4 xl:px-6">
          <ClerkTOCItems />
        </TOCScrollArea>
      </PageTOCPopoverContent>
    </PageTOCPopover>
  );
}
