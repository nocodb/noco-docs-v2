import { createMetadataImage } from 'fumadocs-core/server';
import { blogSource } from './source';

export const metadataImage = createMetadataImage({
  imageRoute: '/docs-og',
  source: blogSource,
});
