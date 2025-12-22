// app/reference/route.ts
import { ApiReference } from '@scalar/nextjs-api-reference'
const config = {
  url: '/swagger-v3.json',
  showDeveloperTools: "never" as const,
}
export const GET = ApiReference(config)