import type { InferPageType } from "fumadocs-core/source";
import { blogSource } from "./source";

export { blogSource };

export function getPageImage(page: InferPageType<typeof blogSource>) {
  const segments = [...page.slugs, "image.png"];
  return {
    segments,
    url: `/docs-og/${segments.join("/")}`,
  };
}
