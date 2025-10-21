export type AnalyticsEventNames = 'a:docs:ai:search' | 'page_view';
export interface BasePayload {
  event: AnalyticsEventNames;
  created_at?: number;
}

export interface AISearchPayload extends BasePayload {
  event: 'a:docs:ai:search';
  query: string;
  response: string;
  all_parts: string;
  model?: string;
  provider?: string;
  duration_ms?: number;
  tool_calls?: number;
}

export interface PageViewPayload extends BasePayload {
  event: 'page_view';
  page_url: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
}

export type EventPayload = AISearchPayload | PageViewPayload;

export type PayloadType<T extends AnalyticsEventNames> = 
  T extends 'a:docs:ai:search' ? Omit<AISearchPayload, 'event'> :
  T extends 'page_view' ? Omit<PageViewPayload, 'event'> :
  never;

export interface TelemetryRequestBody {
  clientId: string;
  events: EventPayload[];
}
export interface TelemetryResponse {
  success: boolean;
  message?: string;
}

/**
 * Track events to NocoDB telemetry
 * Server-side implementation that sends events directly to the telemetry endpoint
 * @param eventName - Name of the event (e.g., 'a:docs:ai:search', 'page_view', etc.)
 * @param data - Event data to track (specific to the event type)
 * @param clientId - Client ID from the browser
 */
export async function trackEvent<T extends AnalyticsEventNames>(
  eventName: T,
  data: PayloadType<T>,
  clientId: string
): Promise<void> {
  try {
    const eventPayload: EventPayload = {
      event: eventName,
      created_at: Date.now(),
      ...data,
    } as EventPayload;

    const requestBody: TelemetryRequestBody = {
      clientId,
      events: [eventPayload],
    };

    await fetch('https://nocodb.com/api/v1/tele', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(requestBody),
    }).catch(() => {});
  } catch {}
}