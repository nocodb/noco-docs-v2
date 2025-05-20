"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DocsNavigationContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggle: () => void;
}

const DocsNavigationContext = createContext<DocsNavigationContextType | undefined>(undefined);

export function DocsNavigationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <DocsNavigationContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </DocsNavigationContext.Provider>
  );
}

export function useDocsNavigation() {
  const context = useContext(DocsNavigationContext);
  
  if (context === undefined) {
    throw new Error("useDocsNavigation must be used within a DocsNavigationProvider");
  }
  
  return context;
}