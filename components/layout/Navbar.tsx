"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import logoIconLight from "public/img/branding/logo_icon.svg";
import logoIconDark from "public/img/branding/logo_icon_white.svg";
import logoTextLight from "public/img/branding/logo_text.svg";
import logoTextDark from "public/img/branding/logo_text_white.svg";
import { useLayoutEffect, useState } from "react";
import { useDocsNavigation } from "@/app/docs/DocsNavigationProvider";
import { SearchTrigger } from "@/components/layout/SearchTrigger";
import { SearchTriggerIcon } from "@/components/layout/SearchTriggerIcon";
import { ThemeSwitch } from "@/components/layout/ThemeSwitch";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const { isOpen, toggle } = useDocsNavigation();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const logoIcon = mounted
    ? resolvedTheme === "light"
      ? logoIconLight
      : logoIconDark
    : logoIconDark;
  const logoText = mounted
    ? resolvedTheme === "light"
      ? logoTextLight
      : logoTextDark
    : logoTextDark;

  return (
    <div className="relative sticky top-0 z-50 mx-auto flex max-w-screen-xl items-center p-4">
      <Button className="mr-3 lg:hidden" onClick={toggle} variant="ghost">
        {isOpen ? (
          <X className="text-nc-content-grey-subtle" />
        ) : (
          <Menu className="text-nc-content-grey-subtle" />
        )}
      </Button>
      <Link href="/docs">
        <div className="flex items-center gap-3">
          {mounted ? (
            <>
              <Image
                alt="NocoDB Logo"
                height={32}
                quality={100}
                src={logoIcon}
                suppressHydrationWarning
                width={32}
              />
              <Image
                alt="NocoDB Logo"
                height={16}
                quality={100}
                src={logoText}
                suppressHydrationWarning
                width={101}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </Link>
      <div className="flex-1" />
      <div className="hidden items-center gap-3 lg:flex">
        <SearchTrigger />
        <div className="flex items-center gap-3">
          {/* <Button variant="ghost">
                        Support
                    </Button> */}
          <ThemeSwitch />
          <Link href="https://app.nocodb.com">
            <Button>Go to App</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3 lg:hidden">
        <SearchTriggerIcon />
        <ThemeSwitch />
      </div>
    </div>
  );
}
