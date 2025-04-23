import * as fs from 'node:fs';
import {Client} from "typesense";
import {DocumentRecord, sync} from "@/utils/search/typesense";

const content = fs.readFileSync('.next/server/app/docs/static.json.body');

const records = JSON.parse(content.toString()) as DocumentRecord[];

if (!process.env?.TYPE_SENSE_ADMIN_API) {
    console.error('No Typesense API key found. Please set the TYPE_SENSE_ADMIN_API environment variable.');
    process.exit(0);
}

const client = new Client({
    nodes: [{
        host: 'rqf5uvajyeczwt3xp-1.a1.typesense.net',
        port: 443,
        protocol: 'https',
    }],
    apiKey: process.env?.TYPE_SENSE_ADMIN_API,
})

const collectionName = 'noco-docs-v2';

sync(client, {
    collection: collectionName,
    documents: records
})