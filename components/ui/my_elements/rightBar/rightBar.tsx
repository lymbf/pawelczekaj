import {cn} from "@/lib/utils";
import {Post} from "@/interfaces/posts";
import Link from "next/link";

export default function RightBar({className, posts}: { className?: string, posts: Post[] | null }) {


    return (
        <div className={cn('w-[265px] hidden lg:flex flex-col gap-2', className)}>
            <h2 className={'text-[24px] font-bold font-loos-compressed mb-[6px] '}>Wszystkie teksty</h2>
            <div className={'flex flex-col gap-2'}>
                {posts?.map((post, i) => {
                    return (<div key={i}
                                 className={'first-letter:uppercase font-tahoma text-primary-foreground text-[15px] tracking-wide font-normal'}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </div>)

                })}
            </div>
        </div>
    )
}