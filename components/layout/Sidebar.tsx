"use client";
import * as SidebarPrimitive from "fumadocs-core/sidebar";
import {useSidebar, useTreeContext, useTreePath} from "fumadocs-ui/provider";
import {createContext, ReactNode, useContext, useMemo, useState, useCallback} from "react";
import {useDocsNavigation} from "@/app/docs/DocsNavigationProvider";
import {PageTree} from "fumadocs-core/server";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {ScrollArea, ScrollViewport} from "@/components/ui/scroll-area";
import {useOnChange} from "fumadocs-core/utils/use-on-change";

interface FolderContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderContext = createContext<FolderContextType | null>(null);

const useFolderContext = () => {
    const context = useContext(FolderContext);
    if (!context) {
        throw new Error("useFolderContext must be used within a FolderContext Provider");
    }
    return context;
};

interface InternalContext {
    level: number;
    isMobile?: boolean;
    closeSidebar?: () => void;
}

const InternalContext = createContext<InternalContext | null>(null);

const useInternalContext = () => {
    const context = useContext(InternalContext);
    if (!context) {
        throw new Error("useInternalContext must be used within an InternalContext Provider");
    }
    return context;
};

const Sidebar = ({isMobile}: {isMobile?: boolean}) => {
    const {root} = useTreeContext();
    const pathname = usePathname();
    const { setIsOpen } = useDocsNavigation();

    const {open} = useSidebar()
    
    const closeSidebar = useCallback(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [isMobile, setIsOpen]);
    
    const context = useMemo<InternalContext>(() => ({
        level: 1, 
        isMobile,
        closeSidebar
    }), [isMobile, closeSidebar]);

    const children = useMemo(() => {
        function renderItems(items: PageTree.Node[], level: number) {
            return items.map((item) => (
                <SidebarItem
                    key={item.$id}
                    item={item}
                    pathname={pathname}
                    level={level}
                >
                    {item.type === "folder" ? renderItems(item.children, level + 1) : null}
                </SidebarItem>
            ));
        }

        return renderItems(root.children, 1);
    }, [pathname]);

    return (
        <InternalContext.Provider value={context}>
            <SidebarPrimitive.SidebarList removeScrollOn="(width < 768px)" className={cn("xl:flex sticky py-4 mr-3 flex-col shrink-0 ", open ? 'block' : 'hidden xl:block', isMobile ? 'block' : 'hidden top-[120px] h-[calc(100dvh-120px)]  w-64')}>
                <ScrollArea className="h-full">
                    <ScrollViewport>
                        {children}
                    </ScrollViewport>
                </ScrollArea>
            </SidebarPrimitive.SidebarList>
        </InternalContext.Provider>
    );
};

function SidebarItem({item, children, level,}: {
    item: PageTree.Node;
    children: ReactNode;
    pathname: string;
    level: number;
}) {
    const context = useInternalContext();
    const path = useTreePath();

    const active = path.includes(item);
    
    const handleLinkClick = () => {
        if (context.closeSidebar) {
            context.closeSidebar();
        }
    };


    if (item.type === "page") {
        return (
            <Link
                className={cn(
                    "px-3 flex items-center text-[13px] gap-3 h-9 leading-4.5 rounded-[8px] py-1.5",
                    active
                        ? "text-nc-content-grey-emphasis font-[600] bg-nc-background-grey-light"
                        : "text-nc-content-grey-subtle-2 font-[500] hover:bg-nc-background-grey-light"
                )}
                href={item.url}
                onClick={handleLinkClick}
            >
                {item.icon}
                {item.name}
            </Link>
        );
    }

    if (item.type === "separator") {
        return (
            <p className="text-fd-muted-foreground mt-6 mb-2 first:mt-0">
                {item.icon}
                {item.name}
            </p>
        );
    }
    if (item.type === "folder") {
        return (
            <SidebarFolder defaultOpen={(active || (item.defaultOpen ?? false))}>
                {item.index ? (
                    <SidebarFolderTrigger>
                        <div className="flex w-full flex-1 items-center">
                            <Link
                                className={cn(
                                    "flex-1 pl-3 text-[13px] flex w-full flex-1 items-center gap-3 h-9 leading-4.5 font-[500] rounded-[8px] py-1.5",
                                    active
                                        ? "text-nc-content-grey-emphasis"
                                        : "text-nc-content-grey-subtle-2 hover:bg-nc-background-grey-light"
                            )}
                            href={item.index.url}
                            onClick={handleLinkClick}
                        >
                            {item.index.icon}
                            {item.index.name}                        
                        </Link>
                    </div>
                    </SidebarFolderTrigger>
                ) : (
                    <SidebarFolderTrigger>
                        <div
                            className={cn(
                                "px-3 flex flex-1 items-center cursor-pointer gap-3 text-[13px] h-9 leading-4.5 font-[500] py-1.5",
                                active? "text-nc-content-grey-subtle-2 font-[600]" : ""
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </div>
                    </SidebarFolderTrigger>
                )}
                <SidebarFolderContent>
                    <div
                        className={cn("flex flex-col", level === 1 ? "pl-7.25" : "pl-4")}
                    >
                        {children}
                    </div>
                </SidebarFolderContent>
            </SidebarFolder>
        );
    }

    return null;
}

function SidebarFolder({defaultOpen = false, children}: {
    defaultOpen?: boolean;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);

    useOnChange(defaultOpen, (v) => {
        if (v) setOpen(v);
    });

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <FolderContext.Provider value={useMemo(() => ({open, setOpen}), [open])}>
                {children}
            </FolderContext.Provider>
        </Collapsible>
    );
}

function SidebarFolderTrigger({children}: { children: ReactNode }) {
    const {open} = useFolderContext();

    return (
        <CollapsibleTrigger asChild>
            <div
                className={cn(
                    "flex items-center hover:bg-nc-background-grey-light rounded-[8px] justify-between",
                    open ? "text" : "text-nc-content-grey-subtle-2"
                )}
            >
                {children}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 mr-2 text-nc-content-grey-subtle-2 transition-transform",
                        !open && "-rotate-90"
                    )}
                />
            </div>
        </CollapsibleTrigger>
    );
}

function SidebarFolderContent({children}: { children: ReactNode }) {
    const ctx = useInternalContext();

    return (
        <CollapsibleContent>
            <InternalContext.Provider
                value={useMemo(() => ({
                    level: ctx.level + 1,
                    isMobile: ctx.isMobile,
                    closeSidebar: ctx.closeSidebar
                }), [ctx.level, ctx.isMobile, ctx.closeSidebar])}
            >
                {children}
            </InternalContext.Provider>
        </CollapsibleContent>
    );
}

export default Sidebar;