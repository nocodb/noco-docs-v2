"use client";

import { CheckIcon, Copy, Share as ShareIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/Icon";

type ShareDropdownProps = {
  url: string;
  title: string;
  label?: string;
};

export default function ShareDropdown({
  url,
  title,
  label = "Share this article on social media",
}: ShareDropdownProps) {
  const shareLinks = [
    {
      name: "X",
      icon: <Icon name="xTwitter" />,
      url: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: <Icon name="facebook" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Icon name="linkedin" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Bluesky",
      icon: <Icon name="bluesky" />,
      url: `https://bsky.app/intent/compose?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <ShareIcon className="h-4 w-4 font-semibold" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 rounded-[12px] border-nc-border-grey-medium p-4"
      >
        <h5 className="font-[700] text-base text-nc-content-grey-emphasis leading-6">
          Share
        </h5>
        <div className="mt-2 text-nc-content-grey-subtle text-sm leading-5">
          {label}
        </div>

        <div className="mt-4 flex gap-3">
          {shareLinks.map((link) => (
            <div
              className="relative flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-lg border-1 border-nc-border-grey-medium"
              key={link.name}
              onClick={() => handleShare(link.url)}
            >
              {link.icon}
            </div>
          ))}
        </div>

        <div
          className="mt-4 flex gap-2 rounded-lg border-1 border-nc-border-grey-medium px-4 py-2"
          onClick={handleCopy}
        >
          <div className="truncate">{url}</div>
          {copied ? (
            <CheckIcon className="w-10 cursor-pointer text-md text-nc-content-grey-default" />
          ) : (
            <Copy className="w-10 cursor-pointer text-md text-nc-content-grey-default" />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
