import Link from "next/link";
import type React from "react";

const transformHref = (href: string) => {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (href.startsWith("/docs/product-docs")) {
    return href;
  }

  if (href.startsWith("/docs/self-hosting")) {
    return href;
  }

  if (href.startsWith("/docs/scripts")) {
    return href;
  }

  if (href.startsWith("/docs/changelog")) {
    return href;
  }

  return href;
};

type Props = {
  href: string;
  children: React.ReactNode;
};

const MdxLink = ({ href, children, ...props }: Props) => {
  const transformedHref = transformHref(href);

  return (
    <Link href={transformedHref || "#"} scroll={true} {...props}>
      {children}
    </Link>
  );
};

export default MdxLink;
