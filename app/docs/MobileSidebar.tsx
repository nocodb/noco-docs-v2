"use client";
import { useDocsNavigation } from "@/app/docs/DocsNavigationProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

export default function MobileSidebar() {
  const { isOpen, setIsOpen } = useDocsNavigation();
  return (
    <Drawer direction="left" onOpenChange={setIsOpen} open={isOpen}>
      <DrawerContent className="overflow-auto">
        <DrawerTitle />
        <Sidebar isMobile />
      </DrawerContent>
    </Drawer>
  );
}
