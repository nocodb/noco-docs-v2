import type { StructuredData } from "fumadocs-core/mdx-plugins";

/**
 * Calculates the estimated reading time for MDX structured content in JSON format
 * @param {Object} mdxContent - The MDX structured content as a JSON object
 * @param {number} wordsPerMinute - Reading speed in words per minute (default: 200)
 * @returns {string} Formatted reading time (e.g. "5 min read")
 */
export function calculateReadingTime(
  mdxContent?: StructuredData,
  wordsPerMinute = 200
) {
  if (!mdxContent) {
    return "1 min read";
  }

  let allText = "";

  if (mdxContent.contents && Array.isArray(mdxContent.contents)) {
    mdxContent.contents.forEach((item) => {
      const skipPatterns = [
        "img",
        "alt:",
        "src:",
        "placeholder:",
        "width:",
        "height:",
      ];

      const shouldSkip = skipPatterns.some(
        (pattern) =>
          item.content === pattern || item.content.startsWith(pattern)
      );

      if (!shouldSkip && item.content) {
        allText += ` ${item.content}`;
      }
    });
  }

  if (mdxContent.headings && Array.isArray(mdxContent.headings)) {
    mdxContent.headings.forEach((heading) => {
      if (heading.content) {
        allText += ` ${heading.content}`;
      }
    });
  }

  const words = allText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const minutes = words / wordsPerMinute;

  const roundedMinutes = Math.max(1, Math.round(minutes));

  return `${roundedMinutes} min read`;
}
