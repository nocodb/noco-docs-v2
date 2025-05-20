import type {ReactNode} from "react";
import Navbar from "@/components/layout/Navbar";
import TopBarNaigation from "@/components/layout/TopBarNaigation";

/**
 * Layout component for rendering the main structure of the documentation page.
 * It includes a fixed top navigation bar with a Navbar and TopBarNaigation component.
 * The children content will be rendered below the navigation bar within the main section.
 *
 * @param {object} props - Component properties.
 * @param {ReactNode} props.children - The content to be displayed within the layout.
 * @returns {React.ReactElement} A React element representing the layout structure.
 */
export default function Layout({children}: { children: ReactNode }) {
    return (
        <main className="nc-docs-layout">
            <div className="border-b-1 fixed top-0 w-full backdrop-blur-md z-10 bg-nc-background-default/80 border-nc-border-grey-light">
                <Navbar/>
                <TopBarNaigation/>
            </div>
            {children}
        </main>
    )
}