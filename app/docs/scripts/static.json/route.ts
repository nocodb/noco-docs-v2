import { NextResponse } from "next/server";
import { scriptsSource } from "@/lib/source";
import type { DocumentRecord } from "@/utils/search/typesense";

export const revalidate = false;

export function GET() {
  const results = [] as DocumentRecord[];

  for (const page of scriptsSource.getPages()) {
    results.push({
      _id: page.url,
      structured: page.data.structuredData,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
    });
  }

  return NextResponse.json(results);
}
