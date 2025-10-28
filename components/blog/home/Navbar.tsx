import {
  SiDiscord,
  SiDiscourse,
  SiGithub,
  SiReddit,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { AlignJustify, ChevronDown, Code, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <div className="sticky top-0 z-4 flex h-18 items-center border-1 border-[#e7e7e9] bg-white/50 py-3 pr-3 pl-4 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="https://nocodb.com">
          <Image
            alt="NocoDB"
            className="h-6 w-auto"
            height={50}
            src="/img/nocodb-text-logo.svg"
            width={100}
          />
        </Link>

        <div className="hidden items-center lg:flex">
          <Link href="https://nocodb.com/#How-it-works">
            <Button
              className="font-light text-nc-content-grey-subtle"
              variant="ghost"
            >
              How it works
            </Button>
          </Link>
          <Link href="https://nocodb.com/#Why-NocoDB">
            <Button
              className="font-light text-nc-content-grey-subtle"
              variant="ghost"
            >
              Why NocoDB
            </Button>
          </Link>
          <Link href="https://nocodb.com/thousands-of-airtable-bases-imported-to-nocodb-successfuly">
            <Button
              className="font-light text-nc-content-grey-subtle"
              variant="ghost"
            >
              Import Airtable
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 font-light text-nc-content-grey-subtle text-sm hover:bg-nc-background-grey-light">
                APIs
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://nocodb.com/apis/v2/meta"
                >
                  <Database className="h-5 w-5" />
                  <span>
                    Meta APIs{" "}
                    <span className="text-muted-foreground">(v2)</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://nocodb.com/apis/v2/data"
                >
                  <Code className="h-5 w-5" />
                  <span>
                    Data APIs{" "}
                    <span className="text-muted-foreground">(v2)</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://nocodb.com/apis/v3/meta"
                >
                  <Database className="h-5 w-5" />
                  <span>
                    Meta APIs{" "}
                    <span className="text-muted-foreground">(v3)</span>{" "}
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-700 text-xs">
                      Beta
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://nocodb.com/apis/v3/data"
                >
                  <Code className="h-5 w-5" />
                  <span>
                    Data APIs{" "}
                    <span className="text-muted-foreground">(v3)</span>{" "}
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-700 text-xs">
                      Beta
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2" />

              <div className="px-3 py-2 font-semibold text-muted-foreground text-xs tracking-wider">
                COMMUNITY
              </div>

              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://community.nocodb.com"
                >
                  <SiDiscourse />
                  <span>NocoDB Forum</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://github.com/nocodb/nocodb"
                >
                  <SiGithub />
                  <span>Github</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://reddit.com/r/NocoDB"
                >
                  <SiReddit />
                  <span>Reddit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://discord.gg/5RgZmkW"
                >
                  <SiDiscord />
                  <span>Discord</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://twitter.com/nocodb"
                >
                  <SiX />
                  <span>Twitter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 hover:bg-nc-background-grey-extra-light">
                <Link
                  className="flex w-full items-center gap-3"
                  href="https://youtube.com/@nocodb"
                >
                  <SiYoutube />
                  <span>YouTube</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="https://nocodb.com/docs/product-docs">
            <Button
              className="font-light text-nc-content-grey-subtle"
              variant="ghost"
            >
              Docs
            </Button>
          </Link>

          <Link href="https://nocodb.com/pricing">
            <Button
              className="font-light text-nc-content-grey-subtle"
              variant="ghost"
            >
              Pricing
            </Button>
          </Link>
        </div>

        <Link
          className="hidden h-[40px] rounded-[12px] bg-nc-content-brand-default px-6 py-2 font-semibold text-white lg:block"
          href="https://app.nocodb.com"
        >
          Go to App
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="block lg:hidden">
            <AlignJustify />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
              <Link href="https://nocodb.com/#How-it-works">How it works?</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
              <Link href="https://nocodb.com/#Why-NocoDB">Why NocoDB?</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
              <Link href="https://nocodb.com/thousands-of-airtable-bases-imported-to-nocodb-successfuly">
                Import Airtable
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
              <Link href="https://docs.nocodb.com">Docs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
              <Link href="https://nocodb.com/pricing">Pricing</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
