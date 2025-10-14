'use client';

import { useQueryState } from 'nuqs';
import { Search } from 'lucide-react';

export function SearchInput() {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: '',
        shallow: false,
    });

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nc-content-grey-subtle" />
            <input
                type="text"
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value || null)}
                className="w-full pl-10 pr-4 py-2 border border-nc-border-grey-medium rounded-md bg-transparent text-nc-content-grey-emphasis placeholder:text-nc-content-grey-subtle focus:outline-none focus:ring-2 focus:ring-nc-content-brand-default focus:border-transparent"
            />
        </div>
    );
}
