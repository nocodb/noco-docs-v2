'use client';

import {useEffect} from 'react';
import {useAnalytics} from '@/hooks/useAnalytics';

export default function ClientAnalytics() {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        // @ts-expect-error no types for this package
        import('nc-analytics').then(({init}) => {
            init();

            trackEvent({
                event: "page_view"
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
                    trackEvent({
                        event: "link_clicked",
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
    }, [trackEvent]);

    return null;
}