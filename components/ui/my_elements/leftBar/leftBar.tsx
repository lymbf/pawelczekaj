import {cn, sortPostsByDate} from "@/lib/utils";
import {Category, Post} from "@/interfaces/posts";
import Link from "next/link";
import {getCategories} from "@/actions/posts/categories";
import CategorySection from "@/components/ui/my_elements/leftBar/categorySection";

export default async function LeftBar({className, posts}: { className?: string, posts: Post[]|null }) {



    const categories = await getCategories();

    return (
        <div className={cn('w-[265px] hidden md:flex flex-col gap-5', className)}>

            <section className={'flex flex-col items-start gap-2 pb-[25px] border-b-[1px] border-slate-800 border-opacity-20'}>

                    <h2 className={'text-[24px] font-bold font-loos-compressed mb-[6px] '}>Najnowsze wpisy</h2>
                {posts && sortPostsByDate(posts).slice(0, 6).map((post: Post, i) => {
                    return (<div key={i} className={'first-letter:uppercase text-primary-foreground text-[15px]  font-normal hover:cursor-pointer hover:opacity-80'}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </div>)
                })}
                <div className={'text-[20px] leading-[15px] font-tahoma'}>...</div>
            </section>
            {categories && posts && categories.map((category: Category, i) => (
                <CategorySection key={i} name={category.name}
                                 posts={posts.filter((post) => post?.category?.id === category.id)}/>
            ))}
        </div>
    )
}