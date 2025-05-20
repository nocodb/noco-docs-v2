"use client"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import Sidebar from "@/components/layout/Sidebar";
import { useDocsNavigation } from "@/app/docs/DocsNavigationProvider";

export default function MobileSidebar() {
    const { isOpen, setIsOpen } = useDocsNavigation()
    return (
        <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent className="overflow-auto">
                <DrawerTitle></DrawerTitle>
                <Sidebar isMobile/>
            </DrawerContent>
        </Drawer>
    )
}