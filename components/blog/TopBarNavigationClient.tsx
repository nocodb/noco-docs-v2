"use client"

import {usePathname, useSearchParams} from "next/navigation";
import TopBarNavigation from "./TopBarNavigation";

interface TopBarNavigationClientProps {
    categories: string[];
}

export default function TopBarNavigationClient({categories}: TopBarNavigationClientProps) {
    const searchParams = useSearchParams();        
    const pathname = usePathname();
    
    // Only show on /blog page (not on individual blog posts like /blog/[slug])
    const isBlogListPage = pathname === '/blog';
    
    if (!isBlogListPage) {
        return null;
    }
    const selectedCategory = searchParams.get('category') || undefined;
    const searchQuery = searchParams.get('search') || undefined;

    return (
        <div className="border-b border-nc-border-grey-medium bg-nc-background-default/80 backdrop-blur-sm sticky top-18 z-5">
            <TopBarNavigation 
                categories={categories} 
                selectedCategory={selectedCategory} 
                searchQuery={searchQuery}
            />
        </div>
    );
}
