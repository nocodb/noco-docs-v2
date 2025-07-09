import NotFoundPage from '@/components/NotFoundPage'
import { notifySlackAbout404 } from '@/app/actions/notFound'
import { headers } from 'next/headers';

export default async function NotFound() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") as string; 
  await notifySlackAbout404({
    section: 'self-hosting',
    errorUrl: pathname,
    referer: headerList.get("x-referer") as string,
    internalReferer: headerList.get("x-internal-referer") as string,
    searchParams: headerList.get("x-current-search") as string
  })
  return <NotFoundPage url="/docs/self-hosting" />
}
