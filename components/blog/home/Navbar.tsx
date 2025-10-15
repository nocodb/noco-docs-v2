import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlignJustify,
  ChevronDown,
  Database,
  Code,
  MessageSquare,
} from "lucide-react";
import {
  SiDiscord,
  SiDiscordHex,
  SiDiscourse,
  SiGithub,
  SiReddit,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="h-18 flex items-center py-3 pr-3 pl-4 z-4 border-1 border-[#e7e7e9] sticky top-0 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between container mx-auto">
        <Link href="https://nocodb.com">
          <Image
            src="/img/nocodb-text-logo.svg"
            alt="NocoDB"
            width={100}
            height={50}
            className="h-6 w-auto"
          />
        </Link>

        <div className="items-center hidden lg:flex">
          <Link href="https://nocodb.com/#How-it-works">
            <Button
              variant="ghost"
              className="text-nc-content-grey-subtle font-light"
            >
              How it works
            </Button>
          </Link>
          <Link href="https://nocodb.com/#Why-NocoDB">
            <Button
              variant="ghost"
              className="text-nc-content-grey-subtle font-light"
            >
              Why NocoDB
            </Button>
          </Link>
          <Link href="https://nocodb.com/thousands-of-airtable-bases-imported-to-nocodb-successfuly">
            <Button
              variant="ghost"
              className="text-nc-content-grey-subtle font-light"
            >
              Import Airtable
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-nc-background-grey-light gap-2 text-nc-content-grey-subtle font-light">
                APIs
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://nocodb.com/apis/v2/meta"
                  className="flex items-center gap-3 w-full"
                >
                  <Database className="w-5 h-5" />
                  <span>
                    Meta APIs{" "}
                    <span className="text-muted-foreground">(v2)</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://nocodb.com/apis/v2/data"
                  className="flex items-center gap-3 w-full"
                >
                  <Code className="w-5 h-5" />
                  <span>
                    Data APIs{" "}
                    <span className="text-muted-foreground">(v2)</span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://nocodb.com/apis/v3/meta"
                  className="flex items-center gap-3 w-full"
                >
                  <Database className="w-5 h-5" />
                  <span>
                    Meta APIs{" "}
                    <span className="text-muted-foreground">(v3)</span>{" "}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      Beta
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://nocodb.com/apis/v3/data"
                  className="flex items-center gap-3 w-full"
                >
                  <Code className="w-5 h-5" />
                  <span>
                    Data APIs{" "}
                    <span className="text-muted-foreground">(v3)</span>{" "}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      Beta
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2" />

              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground tracking-wider">
                COMMUNITY
              </div>

              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://community.nocodb.com"
                  className="flex items-center gap-3 w-full"
                >
                  <SiDiscourse />
                  <span>NocoDB Forum</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://github.com/nocodb/nocodb"
                  className="flex items-center gap-3 w-full"
                >
                  <SiGithub />
                  <span>Github</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://reddit.com/r/NocoDB"
                  className="flex items-center gap-3 w-full"
                >
                  <SiReddit />
                  <span>Reddit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://discord.gg/5RgZmkW"
                  className="flex items-center gap-3 w-full"
                >
                  <SiDiscord />
                  <span>Discord</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://twitter.com/nocodb"
                  className="flex items-center gap-3 w-full"
                >
                  <SiX />
                  <span>Twitter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-nc-background-grey-extra-light rounded-md px-3">
                <Link
                  href="https://youtube.com/@nocodb"
                  className="flex items-center gap-3 w-full"
                >
                  <SiYoutube />
                  <span>YouTube</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="https://nocodb.com/docs/product-docs">
            <Button
              variant="ghost"
              className="text-nc-content-grey-subtle font-light"
            >
              Docs
            </Button>
          </Link>

          <Link href="https://nocodb.com/pricing">
            <Button
              variant="ghost"
              className="text-nc-content-grey-subtle font-light"
            >
              Pricing
            </Button>
          </Link>
        </div>

        <Link
          className="bg-nc-content-brand-default h-[40px] font-semibold  hidden lg:block text-white rounded-[12px] px-6 py-2"
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
