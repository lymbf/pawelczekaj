import {cn} from "@/lib/utils";
import Link from "next/link";
import {Post} from "@/interfaces/posts";

export default function CategorySection({className, name, posts}: { className?: string, name: string, posts: Post[] }) {
    return (
        <section className={cn('flex flex-col items-start gap-2 pb-[25px]  border-b border-b-slate-800/20', className)}>
            <h2 className={'text-[24px] font-bold font-loos-compressed mb-[6px] first-letter:uppercase'}>{name}</h2>
            {posts.map((p, i) => {
                return (
                    <Link className={'first-letter:uppercase  text-primary-foreground text-[15px] font-normal'} key={i} href={`/posts/${p.id}`}>{p.title}</Link>
                )
            })}
        </section>
    )
}