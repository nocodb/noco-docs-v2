import React from 'react';
import Link from 'next/link';

const transformHref = (href: string) => {
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
        return href;
    }

    if (href.startsWith('/docs/product-docs')) {
        return href;
    }

    if(href.startsWith('/docs/self-hosting')) {
        return href
    }

    if(href.startsWith('/docs/scripts')) {
        return href
    }

    if (href.startsWith('/docs')) {
        return `/docs/product-docs/${href}`;
    }

    if (href.startsWith('/')) {
        return `/docs/product-docs${href}`;
    }

    return href;
};

interface Props {
    href: string;
    children: React.ReactNode;
}

const MdxLink = ({href, children, ...props}: Props) => {
    const transformedHref = transformHref(href);

    return (
        <Link scroll={true} href={transformedHref || '#'} {...props}>
            {children}
        </Link>
    );
};

export default MdxLink;