import Link from "next/link"
import {getCategoryColor} from "@/lib/categoryColor";

interface TabProps {
    categories: string[]
    selectedCategory?: string
}

export function CategoryTabs({categories, selectedCategory}: TabProps) {
    return (
        <div className="border-b border-nc-border-grey-medium">
            <div className="flex flex-wrap space-x-4">
                <div className="relative mb-2">
                    <Link
                        scroll={false}
                        href="/blog"
                        className={`text-nc-content-brand-default mx-3 relative px-2 rounded-[6px] text-sm h-6 bg-nc-background-brand ${!selectedCategory ? "font-semibold" : ""}`}
                    >
                        <span>All</span>
                    </Link>
                    {!selectedCategory && <span
                        className="absolute -bottom-2 left-0 h-1 w-full bg-nc-content-brand-default rounded-t-lg"/>}
                </div>
                {categories.map((category) => (

                    <div className="relative" key={category}
                    >
                        <Link
                            scroll={false}
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            style={{backgroundColor: getCategoryColor(category)}}
                            className={`text-nc-content-grey-subtle-2 mb-2 relative px-2 rounded-[6px] text-sm h-6 bg-nc-background-brand ${selectedCategory === category ? "font-semibold" : ""}`}
                        >
                            <span>
                                {category}
                            </span>
                        </Link>
                        {selectedCategory === category && <span
                            className="absolute -bottom-0 left-0 h-1 w-full bg-nc-content-brand-default rounded-t-lg"/>}
                    </div>

                ))}
            </div>
        </div>
    )
}
