"use client"
import logoIconLight from "public/img/branding/logo_icon.svg"
import logoIconDark from "public/img/branding/logo_icon_white.svg"
import logoTextLight from "public/img/branding/logo_text.svg"
import logoTextDark from "public/img/branding/logo_text_white.svg"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ThemeSwitch} from "@/components/layout/ThemeSwitch";
import {SearchTrigger} from "@/components/layout/SearchTrigger";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {

    const { theme } = useTheme()

    const logoIcon = theme === "dark" ? logoIconDark : logoIconLight
    const logoText = theme === "dark" ? logoTextDark : logoTextLight

    return (
        <div className="max-w-screen-xl sticky top-0 z-50 mx-auto relative flex items-center p-4">
            <Link href="/docs">
                <div className="flex gap-3 items-center">
                    <Image width={32} height={32} src={logoIcon} alt="NocoDB Logo" quality={100}/>
                    <Image width={101} height={16} src={logoText} alt="NocoDB Logo" quality={100}/>
                </div>
            </Link>
            <div className="flex-1"></div>
            <div className="hidden lg:flex items-center gap-3">
                <SearchTrigger />
                <div className="flex items-center gap-3">
                    {/* <Button variant="ghost">
                        Support
                    </Button> */}
                    <ThemeSwitch/>
                    <Link href="https://app.nocodb.com">
                        <Button>
                            Go to App
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}