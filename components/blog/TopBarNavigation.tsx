"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type TopBarNavigationProps = {
  categories: string[];
  selectedCategory?: string;
  searchQuery?: string;
};

export default function TopBarNavigation({
  categories,
  selectedCategory,
  searchQuery,
}: TopBarNavigationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create tabs array with "All" as first item
  const tabs = useMemo(
    () => [
      { title: "All", category: null as string | null },
      ...categories.map((cat) => ({
        title: cat,
        category: cat as string | null,
      })),
    ],
    [categories]
  );

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

  // Determine which tab should be active based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      const activeTabIndex = tabs.findIndex(
        (tab) => tab.category === selectedCategory
      );
      setActiveIndex(activeTabIndex !== -1 ? activeTabIndex : 0);
    } else {
      setActiveIndex(0); // "All" tab
    }
  }, [selectedCategory, tabs]);

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
    <div className="container mx-auto flex h-12 w-full items-center overflow-x-auto px-4 lg:px-0">
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
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const href = tab.category
              ? {
                  pathname: "/blog",
                  query: {
                    category: encodeURIComponent(tab.category),
                    ...(searchQuery ? { search: searchQuery } : {}),
                  },
                }
              : {
                  pathname: "/blog",
                  query: searchQuery ? { search: searchQuery } : undefined,
                };

            return (
              <Link href={href} key={index} scroll={false}>
                <div
                  className={`h-[30px] cursor-pointer rounded-[6px] px-3 py-1.5 transition-colors duration-300 ${
                    isActive
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
                      isActive && "font-semibold"
                    )}
                  >
                    {tab.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
