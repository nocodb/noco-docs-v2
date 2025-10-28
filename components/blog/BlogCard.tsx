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
    slugs: string[];
    url: string;
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link className="group block" href={post.url}>
      <div className="-ml-[1px] -mt-[1px] relative w-full border border-gray-200 bg-white transition-colors duration-200 hover:bg-gray-50">
        {/* Thumbnail */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Image
            alt={post.data.title}
            className="object-cover"
            fill
            src={post.data.image}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-3 line-clamp-2 font-semibold text-gray-900 text-xl">
            {post.data.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-gray-600 text-sm leading-relaxed">
            {post.data.description}
          </p>

          {/* Author and Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 font-medium text-xs">
              {post.data.author.charAt(0).toUpperCase()}
            </div>
            <span>
              {new Date(post.data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
