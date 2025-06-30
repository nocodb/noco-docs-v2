"use client"

import {useEffect, useRef, useState} from "react"
import {clsx} from "clsx";
import Link from "next/link";

const tabs = [{
    title: 'Product Docs',
    href: '/docs/product-docs',
}, {
    title: 'Self Hosting',
    href: '/docs/self-hosting',
},
{
    title: 'NocoDB Scripts ☁',
    href: '/docs/scripts',
},
{
    title: 'Changelog (EE)',
    href: '/docs/changelog',
}
]

export default function TopBarNaigation() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({left: "0px", width: "0px"})
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])

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

    // Determine which tab should be active based on the current path when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            const activeTabIndex = tabs.findIndex(tab => path.startsWith(tab.href));
            setActiveIndex(activeTabIndex !== -1 ? activeTabIndex : 0);
        }
    }, []);
    
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
        <div className="flex w-full h-12 px-4 items-center overflow-x-auto max-w-screen-xl mx-auto">
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
                    {tabs.map((tab, index) => (
                        <Link key={index} href={tab.href}>
                            <div
                                ref={(el) => { tabRefs.current[index] = el; }}
                                className={`px-2 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                                    index === activeIndex ? "text-nc-content-brand-default" : "text-nc-content-grey-subtle-2"
                                }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => {
                                    setActiveIndex(index)
                                }}
                            >
                                <div
                                    className={clsx("text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full", index === activeIndex && "font-semibold")}>
                                    {tab.title}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
