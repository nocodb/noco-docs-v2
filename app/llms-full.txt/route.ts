import { source, scriptsSource } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-txt';
// cached forever
export const revalidate = false;
export async function GET() {
  const scan = [...source.getPages(), ...scriptsSource.getPages()].map(getLLMText);
  const scanned = await Promise.all(scan);
  return new Response(scanned.join('\n\n'));
}