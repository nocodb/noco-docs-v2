"use client";
import type * as PageTree from "fumadocs-core/page-tree";
import { useOnChange } from "fumadocs-core/utils/use-on-change";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import { useSidebar } from "fumadocs-ui/components/sidebar/base"
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useDocsNavigation } from "@/app/docs/DocsNavigationProvider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ncIsObject } from "@/utils/is";
import { useMediaQuery } from "@/utils/use-media-query";

type FolderContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FolderContext = createContext<FolderContextType | null>(null);

const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error(
      "useFolderContext must be used within a FolderContext Provider"
    );
  }
  return context;
};

type InternalContext = {
  level: number;
  isMobile?: boolean;
  closeSidebar?: () => void;
};

const InternalContext = createContext<InternalContext | null>(null);

const useInternalContext = () => {
  const context = useContext(InternalContext);
  if (!context) {
    throw new Error(
      "useInternalContext must be used within an InternalContext Provider"
    );
  }
  return context;
};

export const SidebarList = ({
  as,
  blockScrollingWidth,
  removeScrollOn = blockScrollingWidth
    ? `(width < ${blockScrollingWidth}px)`
    : undefined,
  ...props
}: {
  as?: string;
  blockScrollingWidth?: number;
  removeScrollOn?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): ReactElement => {
  const { open } = useSidebar();
  const isBlocking =
    useMediaQuery(removeScrollOn ?? "", !removeScrollOn) ?? false;

  return (
    <RemoveScroll
      as={as ?? "aside"}
      data-open={open}
      enabled={isBlocking && open}
      {...props}
    >
      {props.children}
    </RemoveScroll>
  );
};

const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const { root } = useTreeContext();
  const pathname = usePathname();
  const { setIsOpen } = useDocsNavigation();

  const { open } = useSidebar();

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen]);

  const context = useMemo<InternalContext>(
    () => ({
      level: 1,
      isMobile,
      closeSidebar,
    }),
    [isMobile, closeSidebar]
  );

  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[], level: number) {
      return items.map((item) => (
        <SidebarItem
          item={item}
          key={item.$id}
          level={level}
          pathname={pathname}
        >
          {item.type === "folder"
            ? renderItems(item.children, level + 1)
            : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children, 1);
  }, [pathname, root.children]);

  return (
    <InternalContext.Provider value={context}>
      <SidebarList
        className={cn(
          "sticky mr-3 shrink-0 flex-col py-4 xl:flex",
          open ? "block" : "hidden xl:block",
          isMobile ? "block" : "top-[120px] hidden h-[calc(100dvh-120px)] w-64"
        )}
        removeScrollOn="(width < 768px)"
      >
        <ScrollArea className="h-full">
          <ScrollViewport>{children}</ScrollViewport>
        </ScrollArea>
      </SidebarList>
    </InternalContext.Provider>
  );
};

function SidebarItem({
  item,
  children,
  level,
}: {
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
          "flex h-9 items-center gap-3 rounded-[8px] px-3 py-1.5 text-[13px] leading-4.5",
          active
            ? "bg-nc-background-grey-light font-[600] text-nc-content-grey-emphasis"
            : "font-[500] text-nc-content-grey-subtle-2 hover:bg-nc-background-grey-light"
        )}
        href={item.url}
        onClick={handleLinkClick}
      >
        {ncIsObject(item.icon) ? item.icon : ""}
        {item.name}
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="mt-6 mb-2 text-fd-muted-foreground first:mt-0">
        {ncIsObject(item.icon) ? item.icon : ""}
        {item.name}
      </p>
    );
  }
  if (item.type === "folder") {
    return (
      <SidebarFolder defaultOpen={active || (item.defaultOpen ?? false)}>
        {item.index ? (
          <SidebarFolderTrigger>
            <div className="flex w-full flex-1 items-center">
              <Link
                className={cn(
                  "flex h-9 w-full flex-1 flex-1 items-center gap-3 rounded-[8px] py-1.5 pl-3 font-[500] text-[13px] leading-4.5",
                  active
                    ? "text-nc-content-grey-emphasis"
                    : "text-nc-content-grey-subtle-2 hover:bg-nc-background-grey-light"
                )}
                href={item.index.url}
                onClick={handleLinkClick}
              >
                {ncIsObject(item.index.icon) ? item.index.icon : ""}
                {item.index.name}
              </Link>
            </div>
          </SidebarFolderTrigger>
        ) : (
          <SidebarFolderTrigger>
            <div
              className={cn(
                "flex h-9 flex-1 cursor-pointer items-center gap-3 px-3 py-1.5 font-[500] text-[13px] leading-4.5",
                active ? "font-[600] text-nc-content-grey-subtle-2" : ""
              )}
            >
              {ncIsObject(item.icon) ? item.icon : ""}
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

function SidebarFolder({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useOnChange(defaultOpen, (v) => {
    if (v) {
      setOpen(v);
    }
  });

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <FolderContext.Provider
        value={useMemo(() => ({ open, setOpen }), [open])}
      >
        {children}
      </FolderContext.Provider>
    </Collapsible>
  );
}

function SidebarFolderTrigger({ children }: { children: ReactNode }) {
  const { open } = useFolderContext();

  return (
    <CollapsibleTrigger asChild>
      <div
        className={cn(
          "flex items-center justify-between rounded-[8px] hover:bg-nc-background-grey-light",
          open ? "text" : "text-nc-content-grey-subtle-2"
        )}
      >
        {children}
        <ChevronDown
          className={cn(
            "mr-2 h-4 w-4 text-nc-content-grey-subtle-2 transition-transform",
            !open && "-rotate-90"
          )}
        />
      </div>
    </CollapsibleTrigger>
  );
}

function SidebarFolderContent({ children }: { children: ReactNode }) {
  const ctx = useInternalContext();

  return (
    <CollapsibleContent>
      <InternalContext.Provider
        value={useMemo(
          () => ({
            level: ctx.level + 1,
            isMobile: ctx.isMobile,
            closeSidebar: ctx.closeSidebar,
          }),
          [ctx.level, ctx.isMobile, ctx.closeSidebar]
        )}
      >
        {children}
      </InternalContext.Provider>
    </CollapsibleContent>
  );
}

export default Sidebar;
