'use client';
import type {SharedProps} from 'fumadocs-ui/components/dialog/search';
import SearchDialog from '@/utils/search/SearchDialog';
import {Client} from 'typesense';

const typesenseClient = new Client({
    apiKey: 'lNKDTZdJrE76Sg8WEyeN9mXT29l1xq7Q',
    nodes: [{
        host: 'rqf5uvajyeczwt3xp-1.a1.typesense.net',
        port: 443,
        protocol: 'https',
    }],
});

export default function NcSearchDialog(props: SharedProps) {
    return <SearchDialog typesenseClient={typesenseClient} typesenseCollection="noco-docs-v3" {...props} />;
}