import Image from 'next/image'
import Link from 'next/link'

export function FeaturedPost({post}: { post: any }) {
    console.log(post)
    return (
        <div className="relative w-full rounded-3xl">
            <Link href={post.url}>
                <div className="relative w-full aspect-video">
                    <Image className="w-full object-cover" src={post.data.image} alt={post.data.title} fill/>
                </div>
                <div>
                    <h2 className="text-base lg:text-4xl leading-6 text-nc-content-grey-emphasis line-clamp-1 lg:leading-10 font-bold mt-6">{post.data.title}</h2>
                    <p className="text-nc-content-grey-emphasis mt-4 leading-5 lg:leading-6 line-clamp-2">{post.data.description}</p>
                    <div className="flex text-sm text-nc-content-grey-default justify-between mt-4">
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