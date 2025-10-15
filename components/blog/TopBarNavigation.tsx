"use client"

import {useEffect, useRef, useState, useMemo} from "react"
import {clsx} from "clsx";
import Link from "next/link";

interface TopBarNavigationProps {
    categories: string[]
    selectedCategory?: string
    searchQuery?: string
}

export default function TopBarNavigation({categories, selectedCategory, searchQuery}: TopBarNavigationProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({left: "0px", width: "0px"})
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])
    
    // Create tabs array with "All" as first item
    const tabs = useMemo(() => [
        { title: 'All', category: null as string | null },
        ...categories.map(cat => ({ title: cat, category: cat as string | null }))
    ], [categories])

    useEffect(() => {
        if (hoveredIndex !== null) {
            const hoveredElement = tabRefs.current[hoveredIndex]
            if (hoveredElement) {
                const {offsetLeft, offsetWidth} = hoveredElement
                setHoverStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        }
    }, [hoveredIndex])

    useEffect(() => {
        const activeElement = tabRefs.current[activeIndex]
        if (activeElement) {
            const {offsetLeft, offsetWidth} = activeElement
            setActiveStyle({
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            })
        }
    }, [activeIndex])

    // Determine which tab should be active based on the selected category
    useEffect(() => {
        if (!selectedCategory) {
            setActiveIndex(0); // "All" tab
        } else {
            const activeTabIndex = tabs.findIndex(tab => tab.category === selectedCategory);
            setActiveIndex(activeTabIndex !== -1 ? activeTabIndex : 0);
        }
    }, [selectedCategory, tabs]);
    
    // Apply active style whenever activeIndex changes or after the component has mounted
    useEffect(() => {
        if (activeIndex === -1) return;
        
        requestAnimationFrame(() => {
            const activeElement = tabRefs.current[activeIndex];
            if (activeElement) {
                const {offsetLeft, offsetWidth} = activeElement;
                setActiveStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                });
            }
        });
    }, [activeIndex])

    return (
        <div className="flex w-full h-12 px-4 lg:px-0 items-center overflow-x-auto container mx-auto">
            <div className="relative">
                <div
                    className="absolute h-[30px] transition-all duration-300 ease-out bg-nc-background-grey-extra-light rounded-[6px] flex items-center"
                    style={{
                        ...hoverStyle,
                        opacity: hoveredIndex !== null ? 1 : 0,
                    }}
                />

                <div
                    className="absolute bottom-[-9px] h-[2px] bg-nc-content-brand-default rounded-t-lg transition-all duration-300 ease-out"
                    style={activeStyle}
                />

                {/* Tabs */}
                <div className="relative flex gap-3 items-center">
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
                            <Link key={index} href={href} scroll={false}>
                                <div
                                    ref={(el) => { tabRefs.current[index] = el; }}
                                    className={`px-3 py-1.5 cursor-pointer transition-colors duration-300 h-[30px] rounded-[6px] ${
                                        isActive 
                                            ? "text-nc-content-brand-default" 
                                            : "text-nc-content-grey-subtle-2"
                                    }`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => {
                                        setActiveIndex(index)
                                    }}
                                >
                                    <div
                                        className={clsx("text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full", isActive && "font-semibold")}>
                                        {tab.title}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
