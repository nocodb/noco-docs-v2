import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function SignUp() {
  const points = [
    'Create and organize data fast.',
    'Collaborate seamlessly',
    'Share data securely',
  ]

  return (
    <div className="hidden w-full rounded-2xl border border-nc-border-grey-medium bg-nc-background-grey-extra-light p-4 lg:block">
      <div className="mb-4 text-center text-base font-semibold text-nc-content-grey-emphasis">
        Manage data like never before.
      </div>

      <div className="mb-6 space-y-4">
        {points.map((p) => (
          <div key={p} className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-nc-content-brand-default" />
            <span className="text-sm text-nc-content-grey-default">{p}</span>
          </div>
        ))}
      </div>

      <Link href="https://app.nocodb.com/#/signup" target="_blank" className="block w-full">
        <Button className="w-full">Start Free</Button>
      </Link>
    </div>
  )
}
