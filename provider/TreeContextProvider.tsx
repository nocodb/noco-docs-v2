"use client";
import * as PageTree from 'fumadocs-core/page-tree';
import { TreeContextProvider as FumadocsTreeProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

interface TreeProviderProps {
    children: ReactNode;
    tree: PageTree.Root;
}

export function TreeContextProvider({ children, tree }: TreeProviderProps) {
    return (
        <FumadocsTreeProvider tree={tree}>
            {children}
        </FumadocsTreeProvider>
    );
}