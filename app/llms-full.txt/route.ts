import { getLLMText } from "@/lib/get-llm-txt";
import { scriptsSource, selfHostingSource, source } from "@/lib/source";
// cached forever
export const revalidate = false;
export async function GET() {
  const scan = [
    ...source.getPages(),
    ...scriptsSource.getPages(),
    ...selfHostingSource.getPages(),
  ].map(getLLMText);
  const scanned = await Promise.all(scan);
  return new Response(scanned.join("\n\n"));
}
