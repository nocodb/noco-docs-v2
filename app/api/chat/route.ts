import { ProvideLinksToolSchema } from '@/lib/ai-tools/inkeep-qa-schema';
import { SearchDocsToolSchema, searchAndFetchDocs } from '@/lib/ai-tools/search-and-fetch';
import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { systemPrompt } from '@/lib/searchPrompt';
import { createModel } from '@/lib/ai-models';
import { validateRateLimit } from '@/utils/rateLimit';

export async function POST(req: Request) {
  const rateLimitError = validateRateLimit(req);
  if (rateLimitError) return rateLimitError;
  
  let reqJson;
  try {
    reqJson = await req.json();
  } catch {
    return new Response('Invalid request', { status: 400 });
  }

  const result = streamText({
    model: createModel(),
    tools: {
      searchDocs: {
        description: 'Search the NocoDB documentation and retrieve full page content. After calling this, you MUST read the returned content and write a comprehensive answer for the user based on that content.',
        inputSchema: SearchDocsToolSchema,
        execute: async ({ query }: { query: string }) => {
          const { markdown, links } = await searchAndFetchDocs(query, 3);
          return { markdown, links };
        },
      },
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
    system: systemPrompt,
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    stopWhen: stepCountIs(10),
  });

  return result.toUIMessageStreamResponse();
}