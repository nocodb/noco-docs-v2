import * as fs from "node:fs";
import { Client } from "typesense";
import { type DocumentRecord, sync } from "@/utils/search/typesense";
import "dotenv/config";

const productContent = fs.readFileSync(
  ".next/server/app/docs/product-docs/static.json.body"
);
const scriptsContent = fs.readFileSync(
  ".next/server/app/docs/scripts/static.json.body"
);
const selfHostedContent = fs.readFileSync(
  ".next/server/app/docs/self-hosting/static.json.body"
);

const productRecords = JSON.parse(
  productContent.toString()
) as DocumentRecord[];
const scriptsRecords = JSON.parse(
  scriptsContent.toString()
) as DocumentRecord[];
const selfHostedRecords = JSON.parse(
  selfHostedContent.toString()
) as DocumentRecord[];

// Add path-based tags to documents
const addPathTags = (records: DocumentRecord[], pathPrefix: string, tag: string) => {
  return records.map(record => ({
    ...record,
    tag: record.tag ? `${record.tag},${tag}` : tag
  }));
};

const taggedProductRecords = addPathTags(productRecords, '/docs/product-docs', 'product-docs');
const taggedScriptsRecords = addPathTags(scriptsRecords, '/docs/scripts', 'scripts');
const taggedSelfHostedRecords = addPathTags(selfHostedRecords, '/docs/self-hosting', 'self-hosting');

if (!process.env?.TYPE_SENSE_ADMIN_API) {
  console.error(
    "No Typesense API key found. Please set the TYPE_SENSE_ADMIN_API environment variable."
  );
  process.exit(0);
}

const client = new Client({
  nodes: [
    {
      host: "rqf5uvajyeczwt3xp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: process.env?.TYPE_SENSE_ADMIN_API,
});

const collectionName = "noco-docs-v2";

sync(client, {
  collection: collectionName,
  documents: [...taggedProductRecords, ...taggedSelfHostedRecords, ...taggedScriptsRecords],
});
