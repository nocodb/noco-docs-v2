import Image from 'next/image'
import Link from 'next/link'
import {getCategoryColor} from "@/lib/categoryColor";
import {calculateReadingTime} from "@/lib/timeToRead";
import {StructuredData} from "fumadocs-core/mdx-plugins";
import {blogSource} from "@/lib/source";


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
        structuredData?: StructuredData,
        url: string
    }
}

export function BlogCard({post}: BlogCardProps) {
    const color = getCategoryColor(post.data?.category)
    const t = blogSource.getPage(post.slugs)
    const readingTime = calculateReadingTime(t?.data?.structuredData)

    return (
        <div className="relative group rounded-t-xl w-full rounded-3xl">
            <Link href={post.url}>
                <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                    <Image className="h-full rounded-xl group-hover:scale-[1.15] transition-transform object-cover"
                           src={post.data.image} alt={post.data.title} fill/>
                </div>
                <div>
                    <div className="flex justify-between mt-5">
                        <div style={{backgroundColor: color}}
                             className="rounded-[6px] text-[14px] leading-5 px-1 text-nc-content-grey-default ">
                            {post.data?.category}
                        </div>
                        <div className="text-nc-content-grey-muted text-[13px] leading-4.5">
                            {readingTime}
                        </div>
                    </div>
                    <h2 className="text-[20px] mt-3 text-nc-content-grey-default line-clamp-1 leading-8 font-bold">{post.data.title}</h2>
                    <p className="text-nc-content-grey-default text-sm font-[400] mt-3 leading-5 line-clamp-2">{post.data.description}</p>

                    <div className="flex text-sm text-nc-content-grey-subtle-2 text-[13px] font-[500] leading-3.5 justify-between mt-3">
                        <div className="text-left">
                            By {post.data?.author}
                        </div>
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
    )
}