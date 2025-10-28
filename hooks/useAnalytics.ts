"use client";

import { useCallback, useEffect, useRef } from "react";

type AnalyticsEvent = {
  event: string;
  $current_url?: string;
  path?: string;
  hash?: string;
  [key: string]: string | number | boolean | undefined;
};

type PushFunction = (event: AnalyticsEvent) => void;

export function useAnalytics() {
  const pushRef = useRef<PushFunction | null>(null);

  useEffect(() => {
    // @ts-expect-error no types for this package
    import("nc-analytics").then(({ push }) => {
      pushRef.current = push;
    });
  }, []);

  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (pushRef.current) {
      pushRef.current({
        $current_url: window.location.href,
        path: window.location.pathname,
        hash: window.location.hash,
        ...event,
      });
    }
  }, []);

  return { trackEvent };
}
