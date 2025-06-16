"use client";
import { PageTree } from 'fumadocs-core/server';
import { TreeContextProvider as FumadocsTreeProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { SidebarProvider } from 'fumadocs-core/sidebar';

interface TreeProviderProps {
    children: ReactNode;
    tree: PageTree.Root;
}

export function TreeContextProvider({ children, tree }: TreeProviderProps) {
    return (
        <FumadocsTreeProvider tree={tree}>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </FumadocsTreeProvider>
    );
}