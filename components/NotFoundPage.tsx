import Link from 'next/link'
import Image from 'next/image'
interface NotFoundPageProps {
  url: string;
  label?: string;
}

export default function NotFoundPage({ url, label }: NotFoundPageProps) {
  return (
    <div className="flex flex-col items-center w-full justify-center lg:justify-start min-h-[60vh] lg:my-20 text-center px-4">
      <Image 
        src="/img/404.svg" 
        alt="404 Not Found" 
        width={640} 
        height={300} 
        className="mb-8"
      />
      <p className="text-lg font-semibold mb-6">Seems like this page does not exist</p>
      <div className="flex gap-4">
        <Link 
          href={url} 
          className="px-2 py-1 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {label || 'Go to Docs Home'}
        </Link>
        <Link 
          href="https://app.nocodb.com" 
          className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Go to App
        </Link>
      </div>
    </div>
  )
}
