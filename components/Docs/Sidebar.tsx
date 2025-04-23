"use client";
import * as SidebarPrimitive from "fumadocs-core/sidebar";
import {useSidebar, useTreeContext} from "fumadocs-ui/provider";
import {createContext, ReactNode, useContext, useMemo, useState,} from "react";
import {PageTree} from "fumadocs-core/server";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {SidebarHeader} from "fumadocs-ui/components/layout/sidebar";
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
}

const InternalContext = createContext<InternalContext | null>(null);

const useInternalContext = () => {
    const context = useContext(InternalContext);
    if (!context) {
        throw new Error("useInternalContext must be used within an InternalContext Provider");
    }
    return context;
};

const isActive = (href: string, pathname: string) => {
    return pathname === href;
};

const Sidebar = () => {
    const {root} = useTreeContext();
    const pathname = usePathname();

    const {open} = useSidebar()

    const context = useMemo<InternalContext>(() => ({level: 1}), []);

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
            <SidebarPrimitive.SidebarList
                removeScrollOn="(width < 768px)"
                hidden={!open && (document && document.body.clientWidth < 768)}
                className="fixed flex flex-col shrink-0 top-14 md:top-0 z-20 border-r-1 text-sm md:sticky md:h-[calc(100dvh-56px)] md:w-[300px] max-md:inset-x-0 max-md:bottom-0 max-md:bg-fd-background"
            >
                <ScrollArea className="h-full">
                    <SidebarHeader>
                        <div className="flex flex-row py-1.5 max-md:hidden"></div>
                    </SidebarHeader>
                    <ScrollViewport className="p-4">
                        {children}
                    </ScrollViewport>
                </ScrollArea>
            </SidebarPrimitive.SidebarList>
        </InternalContext.Provider>
    );
};

function SidebarItem({item, children, pathname, level,}: {
    item: PageTree.Node;
    children: ReactNode;
    pathname: string;
    level: number;
}) {
    const active = item.type === "page" && isActive(item.url, pathname);

    if (item.type === "page") {
        return (
            <Link
                className={cn(
                    "px-3 flex items-center gap-3 leading-5 rounded-[8px] py-1.5",
                    active
                        ? "text-nc-content-grey-emphasis font-[600] bg-nc-background-grey-light"
                        : "text-nc-content-grey-subtle font-[500] hover:bg-nc-background-grey-light"
                )}
                href={item.url}
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
            <SidebarFolder defaultOpen={item.defaultOpen ?? false}>
                {item.index ? (
                    <div className="flex items-center">
                        <Link
                            className={cn(
                                "flex-1 px-3 flex items-center gap-3 leading-5 font-[500] rounded-[8px] py-1.5",
                                isActive(item.index.url, pathname)
                                    ? "text-nc-content-grey-emphasis bg-nc-background-grey-light"
                                    : "text-nc-content-grey-subtle hover:bg-nc-background-grey-light"
                            )}
                            href={item.index.url}
                        >
                            {item.index.icon}
                            {item.index.name}
                        </Link>
                        <SidebarFolderTrigger>
                            <button className="p-1 rounded">
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 text-nc-content-grey-subtle transition-transform"
                                    )}
                                />
                            </button>
                        </SidebarFolderTrigger>
                    </div>
                ) : (
                    <SidebarFolderTrigger>
                        <div
                            className={cn(
                                "px-3 flex flex-1 items-center gap-3 text-nc-content-grey-subtle leading-5 font-[500] py-1.5"
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
                    "flex items-center hover:bg-nc-background-grey-light rounded-[8px]  justify-between",
                )}
            >
                {children}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 mr-2 text-nc-content-grey-subtle transition-transform",
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
                value={useMemo(() => ({level: ctx.level + 1}), [ctx.level])}
            >
                {children}
            </InternalContext.Provider>
        </CollapsibleContent>
    );
}

export default Sidebar;