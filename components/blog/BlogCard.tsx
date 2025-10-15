import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
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
            <div className="relative w-full border-b border-dashed border-nc-border-grey-medium py-6 md:py-8 hover:bg-white/50 transition-all duration-300">
                {/* Mobile: Category and Date on top */}
                <div className="flex items-center justify-between mb-4 md:hidden">
                    <div className="text-sm text-nc-content-grey-muted-2 uppercase tracking-wide">
                        [{post.data.category}]
                    </div>
                    <div className="text-sm text-nc-content-grey-muted-2 uppercase tracking-wide">
                        {new Date(post.data.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                        })}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-start px-4 justify-between gap-8">
                    {/* Thumbnail */}
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-nc-background-grey-light">
                        <Image 
                            src={post.data.image} 
                            alt={post.data.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        <div className="text-base text-nc-content-grey-subtle font-normal mb-2 transition-all group-hover:text-nc-content-grey-emphasis">
                            {post.data.title}
                        </div>
                        
                        <p className="text-nc-content-grey-subtle-2 text-sm leading-6 line-clamp-2 transition-all">
                            {post.data.description}
                        </p>
                    </div>
                    
                    {/* Right side: Date, Category, Arrow */}
                    <div className="flex items-start gap-6 flex-shrink-0">
                        <div className="text-sm text-nc-content-grey-muted-2 uppercase tracking-wide w-16 text-right">
                            {new Date(post.data.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                            })}
                        </div>
                        
                        <div className="text-sm text-nc-content-grey-muted-2 uppercase tracking-wide w-32 text-right">
                            [{post.data.category}]
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-nc-content-grey-muted-2 group-hover:text-nc-content-brand-default group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                </div>

                {/* Mobile: Thumbnail and Content */}
                <div className="md:hidden flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-nc-background-grey-light">
                        <Image 
                            src={post.data.image} 
                            alt={post.data.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="flex-1">
                        <div className="text-base text-nc-content-grey-subtle line-clamp-2 font-normal mb-2 transition-all">
                            {post.data.title}
                        </div>
                        
                        <p className="text-nc-content-grey-subtle-2 text-sm leading-5 line-clamp-2 transition-all">
                            {post.data.description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}