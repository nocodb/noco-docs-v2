import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
    post: {
        data: {
            category: string
            title: string
            description: string
            image: string
            date: string | Date
            author: string
        },
        slugs: string[],
        url: string
    }
}

export default function BlogCard({post}: BlogCardProps) {
    return (
        <Link href={post.url} className="group block">
            <div className="relative w-full bg-white hover:bg-gray-50 border border-gray-200 -ml-[1px] -mt-[1px] transition-colors duration-200">
                {/* Thumbnail */}
                <div className="relative w-full h-56 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
                    <Image 
                        src={post.data.image} 
                        alt={post.data.title}
                        fill
                        className="object-cover"
                    />
                </div>
                
                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.data.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.data.description}
                    </p>
                    
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            {post.data.author.charAt(0).toUpperCase()}
                        </div>
                        <span>
                            {new Date(post.data.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}