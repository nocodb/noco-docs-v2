'use server'

type Section = 'product-docs' | 'scripts' | 'self-hosting' | 'changelog';

/**
 * Send a notification to Slack when a 404 error occurs
 * @param section The documentation section where the 404 occurred
 * @param errorUrl The full URL that caused the 404 error
 */
export async function notifySlackAbout404(section: Section, errorUrl?: string): Promise<void> {
  try {
    const actualErrorUrl = errorUrl || `/docs/${section}`;
    const timestamp = new Date().toISOString();
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
          fields: [
            {
              type: 'mrkdwn',
              text: `*Section:*\n\`${section}\``
            },
            {
              type: 'mrkdwn',
              text: `*Error URL:*\n\`${actualErrorUrl}\``
            }
          ]
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Environment:*\n${process.env.NODE_ENV || 'development'}`
            },
            {
              type: 'mrkdwn',
              text: `*Time:*\n${timestamp}`
            }
          ]
        }
      ]
    };

    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL environment variable is not set')
      return
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      console.error('Failed to send Slack notification: ' + response.statusText)
    }

  } catch (error) {
    console.error('Error sending 404 notification to Slack:', error)
  }
}
