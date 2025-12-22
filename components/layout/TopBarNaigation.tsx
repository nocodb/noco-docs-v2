"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    title: "Product Docs",
    href: "/docs/product-docs",
  },
  {
    title: "Self Hosting",
    href: "/docs/self-hosting",
  },
  {
    title: "Scripts ☁",
    href: "/docs/scripts",
  },
  {
    title: "Workflows ☁",
    href: "/docs/workflows",
  },
  {
    title: "Changelog (EE)",
    href: "/docs/changelog",
  },
  {
    title: "Legal",
    href: "/docs/legal",
  },
];

export default function TopBarNaigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/docs/tags")) {
    return null;
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter tabs based on current path - only show Legal if we're on /docs/legal
  const visibleTabs = tabs.filter((tab) => {
    if (tab.href === "/docs/legal") {
      return pathname === "/docs/legal" || pathname.startsWith("/docs/legal/");
    }
    return true;
  });

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  // Determine which tab should be active based on the current path
  useEffect(() => {
    const activeTabIndex = visibleTabs.findIndex((tab) =>
      pathname.startsWith(tab.href)
    );
    setActiveIndex(activeTabIndex !== -1 ? activeTabIndex : 0);
  }, [pathname, visibleTabs]);

  // Apply active style whenever activeIndex changes or after the component has mounted
  useEffect(() => {
    if (activeIndex === -1) {
      return;
    }

    requestAnimationFrame(() => {
      const activeElement = tabRefs.current[activeIndex];
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, [activeIndex]);

  return (
    <div className="mx-auto flex h-12 w-full max-w-screen-xl items-center overflow-x-auto px-4">
      <div className="relative">
        <div
          className="absolute flex h-[30px] items-center rounded-[6px] bg-nc-background-grey-extra-light transition-all duration-300 ease-out"
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />

        <div
          className="absolute bottom-[-9px] h-[2px] rounded-t-lg bg-nc-content-brand-default transition-all duration-300 ease-out"
          style={activeStyle}
        />

        {/* Tabs */}
        <div className="relative flex items-center gap-3">
          {visibleTabs.map((tab, index) => (
            <Link href={tab.href} key={index}>
              <div
                className={`h-[30px] cursor-pointer px-2 py-2 transition-colors duration-300 ${
                  index === activeIndex
                    ? "text-nc-content-brand-default"
                    : "text-nc-content-grey-subtle-2"
                }`}
                onClick={() => {
                  setActiveIndex(index);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
              >
                <div
                  className={clsx(
                    "flex h-full items-center justify-center whitespace-nowrap text-sm leading-5",
                    index === activeIndex && "font-semibold"
                  )}
                >
                  {tab.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
