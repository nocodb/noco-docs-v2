'use client';

import {useEffect} from 'react';

export default function ClientAnalytics() {
    useEffect(() => {
        // @ts-expect-error no types for this package
        import('nc-analytics').then(({init, push}) => {
            init();

            push({
                event: "page_view",
                $current_url: window.location.href,
                path: window.location.pathname,
                hash: window.location.hash
            });

            const clickListener = (
                e: MouseEvent & {
                    nc_handled?: boolean;
                }
            ) => {
                if (e.nc_handled) return;
                e.nc_handled = true;
                let target: HTMLElement | null = (e.target as HTMLElement);

                while (target && target.tagName !== 'A') {
                    target = target.parentElement;
                }

                if (target && target.tagName === 'A') {
                    push({
                        event: "link_clicked",
                        $current_url: window.location.href,
                        path: window.location.pathname,
                        hash: window.location.hash,
                        link_url: (target as HTMLAnchorElement).href || "",
                        link_text: (target.innerText || "").trim(),
                    });
                }
            };

            document.body.addEventListener("click", clickListener, true);

            return () => {
                document.body.removeEventListener("click", clickListener, true);
            };
        });
    }, []);

    return null;
}