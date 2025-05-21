import Image from "next/image";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {AlignJustify, ChevronDown} from "lucide-react";

export function Navbar() {
    return (
        <div
            className="h-18 w-15/16 shadow-[0_0_24px_#0000001a] py-3 pr-3 pl-4 rounded-[20px] border-1 border-[#e7e7e9]  mx-auto flex items-center justify-between bg-white">
            <Link href="https://nocodb.com">
                <Image src="/img/nocodb-text-logo.svg" alt="NocoDB" width={100} height={50} className="h-6 w-auto"/>
            </Link>


            <div className="items-center hidden lg:flex gap-4">
                <Link href="https://nocodb.com/thousands-of-airtable-bases-imported-to-nocodb-successfuly">
                    Import Airtable
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-2">
                            APIs
                            <ChevronDown className="w-4 h-4"/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="h-[44px] cursor-pointer !hover:bg-nc-background-grey-extra-light">
                            <Link href="https://data-apis-v2.nocodb.com/">
                                Data APIs <span className="text-fd-muted-foreground">(v2)</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-[44px] cursor-pointer !hover:bg-nc-background-grey-extra-light">
                            <Link href="https://meta-apis-v2.nocodb.com/">
                                Meta APIs <span className="text-fd-muted-foreground">(v2)</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href="https://docs.nocodb.com">
                    Docs
                </Link>

                <Link href="https://nocodb.com/pricing">
                    Pricing
                </Link>
            </div>

            <Link className="bg-nc-content-brand-default h-[40px] font-semibold  hidden lg:block text-white rounded-[12px] px-6 py-2"
                  href="https://app.nocodb.com">
                Go to App
            </Link>


            <DropdownMenu>
                <DropdownMenuTrigger className="block lg:hidden">
                    <AlignJustify/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                    <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
                        <Link href="https://nocodb.com/#How-it-works">
                            How it works?

                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
                        <Link href="https://nocodb.com/#Why-NocoDB">
                            Why NocoDB?
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
                        <Link href="https://nocodb.com/thousands-of-airtable-bases-imported-to-nocodb-successfuly">
                            Import AirTable
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
                        <Link href="https://docs.nocodb.com">
                            Docs
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-[44px] cursor-pointer hover:bg-nc-background-grey-extra-light">
                        <Link href="https://nocodb.com/pricing">
                            Pricing
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}
	