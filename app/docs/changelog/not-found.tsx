import NotFoundPage from '@/components/NotFoundPage'
import { notifySlackAbout404 } from '@/app/actions/notFound'
import { headers } from 'next/headers';

export default async function NotFound() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") as string; 
  await notifySlackAbout404('changelog', pathname)
  return <NotFoundPage url="/docs/changelog" />
}
