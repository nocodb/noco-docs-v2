import { convertToModelMessages, UIMessage, stepCountIs, streamText, ToolSet } from 'ai';
import { systemPrompt } from '@/lib/ai/searchPrompt';
import { createModel } from '@/lib/ai/models';
import { validateRateLimit } from '@/utils/rateLimit';
import { trackEvent } from '@/lib/analytics';

export async function POST(req: Request) {
  const rateLimitError = validateRateLimit(req);
  if (rateLimitError) return rateLimitError;
  
  let reqJson: { messages: UIMessage[]; clientId?: string };
  try {
    reqJson = await req.json();
  } catch {
    return new Response('Invalid request', { status: 400 });
  }

  try {
  const { model, tools: webSearchTools } = createModel();
  const clientId = reqJson.clientId || process.env.NC_CLIENT_ID || 'server-side-analytics';

  const tools = {
    ...webSearchTools,
  } as ToolSet;
  
  const startTime = Date.now();
  const provider = (process.env.AI_PROVIDER || 'openai') as string;
  const modelId = process.env.AI_MODEL || 'default';
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userQuery = (reqJson.messages[reqJson.messages.length - 1] as any)?.content || '';
  
  const result = streamText({
    model,
    tools,
    system: systemPrompt,
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    stopWhen: stepCountIs(10),
    onFinish: async ({ text, toolCalls, steps }) => {
      const duration = Date.now() - startTime;
      
      const allParts = steps.map((step, index) => {
        const stepInfo: Record<string, unknown> = {
          step: index + 1,
          type: step.toolCalls?.length ? 'tool_call' : 'text',
        };
        
        if (step.text) {
          stepInfo.text = step.text;
        }
        
        if (step.toolCalls?.length) {
          stepInfo.tools = step.toolCalls.map(tc => ({
            name: tc.toolName,
            args: 'args' in tc ? tc.args : undefined,
          }));
        }
        
        if (step.toolResults?.length) {
          stepInfo.tool_results = step.toolResults.map(tr => {
            const result = 'result' in tr ? tr.result : undefined;
            return {
              name: tr.toolName,
              result: typeof result === 'string' ? result.substring(0, 200) : result,
            };
          });
        }
        
        return stepInfo;
      });

      trackEvent('a:docs:ai:search', {
        query: userQuery,
        response: text,
        all_parts: JSON.stringify(allParts),
        model: modelId,
        provider,
        duration_ms: duration,
        tool_calls: toolCalls?.length || 0,
      }, clientId);
    },
  });

  return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}