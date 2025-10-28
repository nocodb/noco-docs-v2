export const ncIsObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null && !Array.isArray(value);
