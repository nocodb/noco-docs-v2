"use client"

import React from "react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {CheckIcon, Copy, Share as ShareIcon} from "lucide-react"
import Icon from "@/components/ui/Icon";

interface ShareDropdownProps {
    url: string;
    title: string;
    label?: string;
}

export function ShareDropdown({url, title, label = "Share this article on social media"}: ShareDropdownProps) {
    const shareLinks = [
        {
            name: "X",
            icon: (
                <Icon name="xTwitter"/>
            ),
            url: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        },
        {
            name: "Facebook",
            icon: (
                <Icon name="facebook"/>
            ),
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            name: "LinkedIn",
            icon: (
                <Icon name="linkedin"/>
            ),
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        {
            name: "Bluesky",
            icon: (
                <Icon name="bluesky"/>
            ),
            url: `https://bsky.app/intent/compose?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        },
    ]

    const handleShare = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer")
    }

    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                    <ShareIcon className="h-4 font-semibold w-4"/>
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 rounded-[12px] border-nc-border-grey-medium p-4">
                <h5 className="text-nc-content-grey-emphasis leading-6 font-[700] text-base">Share</h5>
                <div className="text-nc-content-grey-subtle text-sm leading-5 mt-2">{label}</div>

                <div className="flex gap-3 mt-4">
                    {shareLinks.map((link) => (
                        <div key={link.name}
                             onClick={() => handleShare(link.url)}

                             className="h-[56px] cursor-pointer flex items-center justify-center relative w-[56px] border-1 border-nc-border-grey-medium rounded-lg">
                            {link.icon}
                        </div>
                    ))}
                </div>

                <div className="px-4 py-2 border-1 mt-4 flex gap-2 rounded-lg border-nc-border-grey-medium"
                     onClick={handleCopy}>
                    <div className="truncate">
                        {url}
                    </div>
                    {copied ? (
                        <CheckIcon className="text-nc-content-grey-default cursor-pointer w-10 text-md"/>
                    ) : (
                        <Copy className="text-nc-content-grey-default cursor-pointer w-10 text-md"/>

                    )}
                </div>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}