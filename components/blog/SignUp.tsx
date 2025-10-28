import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SignUp() {
  const points = [
    "Create and organize data fast.",
    "Collaborate seamlessly",
    "Share data securely",
  ];

  return (
    <div className="hidden w-full rounded-2xl border border-nc-border-grey-medium bg-nc-background-grey-extra-light p-4 lg:block">
      <div className="mb-4 text-center font-semibold text-base text-nc-content-grey-emphasis">
        Manage data like never before.
      </div>

      <div className="mb-6 space-y-4">
        {points.map((p) => (
          <div className="flex items-center gap-2" key={p}>
            <CheckCircle2 className="h-5 w-5 text-nc-content-brand-default" />
            <span className="text-nc-content-grey-default text-sm">{p}</span>
          </div>
        ))}
      </div>

      <Link
        className="block w-full"
        href="https://app.nocodb.com/#/signup"
        target="_blank"
      >
        <Button className="w-full">Start Free</Button>
      </Link>
    </div>
  );
}
