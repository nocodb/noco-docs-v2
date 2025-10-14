import Link from "next/link"
import {getCategoryColor} from "@/lib/categoryColor";
import {cn} from "@/lib/utils";

interface TabProps {
    categories: string[]
    selectedCategory?: string
    searchQuery?: string
}

export function CategoryTabs({categories, selectedCategory, searchQuery}: TabProps) {
    return (
        <div className="border-b border-nc-border-grey-medium">
            <div className="flex flex-wrap space-x-6">
                <div className="relative mb-4">
                    <Link
                        scroll={false}
                        href={{
                            pathname: "/blog",
                            query: searchQuery ? { search: searchQuery } : undefined,
                        }}
                        className={`text-nc-content-brand-default mx-2 relative px-3 py-1.5 rounded-[6px] text-sm h-6 bg-nc-background-brand ${!selectedCategory ? "font-semibold" : ""}`}
                    >
                        <span>All</span>
                    </Link>
                    {!selectedCategory && <span
                        className="absolute -bottom-4 left-0 h-1 w-full bg-nc-content-brand-default rounded-t-lg"/>}
                </div>
                {categories.map((category) => (

                    <div className="relative" key={category}
                    >
                        <Link
                            scroll={false}
                            href={{
                                pathname: "/blog",
                                query: {
                                    category: encodeURIComponent(category),
                                    ...(searchQuery ? { search: searchQuery } : {}),
                                },
                            }}
                            style={{backgroundColor: getCategoryColor(category)}}
                            className={cn(`text-nc-content-grey-subtle-2 mb-2 relative px-3 py-1.5 rounded-[6px] text-sm h-6 bg-nc-background-brand`)}
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
