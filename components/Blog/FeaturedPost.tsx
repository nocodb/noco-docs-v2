import Image from 'next/image'
import Link from 'next/link'
import {StructuredData} from "fumadocs-core/mdx-plugins";

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
        structuredData?: StructuredData,
        url: string
    }
}

export function FeaturedPost({post}: BlogCardProps) {
    return (
        <div className="relative w-full rounded-3xl">
            <Link className="flex-col flex lg:flex-row group gap-6 lg:gap-10 items-center" href={post.url}>
                <div
                    style={{
                        boxShadow: "box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.04)"
                    }}
                    className="relative w-full rounded-3xl border-1 overflow-hidden border-nc-border-grey-dark lg:w-1/2 aspect-video">
                    <Image className="w-full object-cover transition group-hover:scale-115 rounded-3xl" src={post.data.image} alt={post.data.title}
                           fill/>
                </div>
                <div className="w-full lg:w-1/2">
                    <h3 className="text-nc-content-grey-emphasis line-clamp-1 leading-6 font-bold text-base lg:text-2xl lg:leading-9">{post.data.title}</h3>
                    <p className="text-nc-content-grey-emphasis mt-4 text-sm leading-5 lg:text-base lg:leading-6 line-clamp-2">{post.data.description}</p>
                    <div className="flex text-sm leading-5 text-nc-content-grey-default justify-between mt-4">
                        <div className="text-left">
                            {post.data?.author}
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