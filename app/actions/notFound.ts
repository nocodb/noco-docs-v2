'use server'

type Section = 'product-docs' | 'scripts' | 'self-hosting' | 'changelog';

interface NotificationData {
  section: Section;
  errorUrl?: string;
  referer?: string;
  internalReferer?: string;
  searchParams?: string;
}

// Store last notification times for URLs to implement cooldown
const notificationHistory: Record<string, number> = {};

// Cooldown period in milliseconds (24 hours)
const NOTIFICATION_COOLDOWN = 24 * 60 * 60 * 1000;

/**
 * Send a notification to Slack when a 404 error occurs
 */
export async function notifySlackAbout404(data: NotificationData): Promise<void> {
  try {
    const {
      section,
      errorUrl,
      referer,
      internalReferer,
      searchParams
    } = data;
    const actualErrorUrl = errorUrl || `/docs/${section}`;
    
    const notificationKey = `${actualErrorUrl}${searchParams || ''}`;
    
    const lastNotificationTime = notificationHistory[notificationKey];
    const currentTime = Date.now();
    
    if (lastNotificationTime && (currentTime - lastNotificationTime) < NOTIFICATION_COOLDOWN) {
      return;
    }
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nocodb.com';
      const fullUrl = new URL(actualErrorUrl.startsWith('/') ? actualErrorUrl : `/${actualErrorUrl}`, baseUrl);
      if (searchParams) {
        fullUrl.search = searchParams;
      }
      
      const response = await fetch(fullUrl.toString(), { method: 'HEAD' });
      
      if (response.status !== 404) {
        return;
      }
    } catch (error) {
      console.warn(`Couldn't validate URL ${actualErrorUrl}: ${error}`);
    }
    
    notificationHistory[notificationKey] = currentTime;
    
    const fields = [
      {
        type: 'mrkdwn',
        text: `*Section:*\n\`${section}\``
      },
      {
        type: 'mrkdwn',
        text: `*Error URL:*\n\`${actualErrorUrl}${searchParams || ''}\``
      }
    ];

    if (referer) {
      fields.push({
        type: 'mrkdwn',
        text: `*Referred from:*\n\`${referer}\``
      });
    }

    if (internalReferer && internalReferer !== referer) {
      fields.push({
        type: 'mrkdwn',
        text: `*Internal path:*\n\`${internalReferer}\``
      });
    }

    const message = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📄 Documentation 404 Error',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: fields
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `💡 *Quick Actions:* Check if this should redirect to an existing page or if content needs to be created`
            }
          ]
        }
      ]
    };

    const SLACK_WEBHOOK_URL = process.env.SLACK_DOCS_ERROR_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_DOCS_ERROR_URL environment variable is not set');
      return;
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      console.error('Failed to send Slack notification: ' + response.statusText);
    }

  } catch (error) {
    console.error('Error sending 404 notification to Slack:', error);
  }
}

