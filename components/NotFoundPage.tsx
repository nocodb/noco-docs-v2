import Image from "next/image";
import Link from "next/link";

type NotFoundPageProps = {
  url: string;
  label?: string;
};

export default function NotFoundPage({ url, label }: NotFoundPageProps) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 text-center lg:my-20 lg:justify-start">
      <Image
        alt="404 Not Found"
        className="mb-8"
        height={300}
        src="/img/404.svg"
        width={640}
      />
      <p className="mb-6 font-semibold text-lg">
        Seems like this page does not exist
      </p>
      <div className="flex gap-4">
        <Link
          className="rounded-lg bg-primary px-2 py-1 text-white transition-colors hover:bg-primary/90"
          href={url}
        >
          {label || "Go to Docs Home"}
        </Link>
        <Link
          className="rounded-lg border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-100"
          href="https://app.nocodb.com"
        >
          Go to App
        </Link>
      </div>
    </div>
  );
}
