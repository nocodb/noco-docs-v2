import type { StructuredData } from "fumadocs-core/mdx-plugins";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  post: {
    data: {
      category: string;
      title: string;
      description: string;
      image: string;
      date: string | Date;
      author: string;
    };
    structuredData?: StructuredData;
    url: string;
  };
};

export function FeaturedPost({ post }: BlogCardProps) {
  return (
    <div className="relative w-full rounded-3xl">
      <Link
        className="group flex flex-col items-center gap-6 lg:flex-row lg:gap-10"
        href={post.url}
      >
        <div
          className="relative aspect-video w-full overflow-hidden rounded-3xl border-1 border-nc-border-grey-dark lg:w-1/2"
          style={{
            boxShadow: "box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Image
            alt={post.data.title}
            className="w-full rounded-3xl object-cover transition group-hover:scale-115"
            fill
            src={post.data.image}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="line-clamp-1 font-medium text-base text-nc-content-grey-emphasis leading-6 lg:text-2xl lg:leading-9">
            {post.data.title}
          </h3>
          <p className="mt-4 line-clamp-2 font-light text-nc-content-grey-emphasis text-sm leading-5 lg:text-base lg:leading-6">
            {post.data.description}
          </p>
          <div className="mt-4 flex justify-between font-light text-nc-content-grey-default text-sm leading-5">
            <div className="text-left">{post.data?.author}</div>
            <div className="text-right">
              {new Date(post.data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
