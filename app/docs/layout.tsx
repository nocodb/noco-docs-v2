import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import TopBarNaigation from "@/components/layout/TopBarNaigation";
import { AISearchTrigger } from "@/components/search";
import { DocsNavigationProvider } from "./DocsNavigationProvider";

/**
 * Layout component for rendering the main structure of the documentation page.
 * It includes a fixed top navigation bar with a Navbar and TopBarNaigation component.
 * The children content will be rendered below the navigation bar within the main section.
 *
 * @param {object} props - Component properties.
 * @param {ReactNode} props.children - The content to be displayed within the layout.
 * @returns {React.ReactElement} A React element representing the layout structure.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="nc-docs-layout">
      <DocsNavigationProvider>
        <div className="fixed top-0 z-10 w-full border-nc-border-grey-light border-b-1 bg-nc-background-default/80 backdrop-blur-md">
          <Navbar />
          <TopBarNaigation />
        </div>
        {children}
      </DocsNavigationProvider>
      <AISearchTrigger />
    </main>
  );
}
