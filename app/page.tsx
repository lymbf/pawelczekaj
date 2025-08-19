import {getPosts} from "@/actions/posts/posts";
import LeftBar from "@/components/ui/my_elements/leftBar/leftBar";
import RightBar from "@/components/ui/my_elements/rightBar/rightBar";
import {Post} from "@/interfaces/posts";
import PostFragment from "@/components/ui/my_elements/posts/postFragment";
import {sortPostsByDate} from "@/lib/utils";


export default async function Home() {

    const posts = await getPosts();

    return (
        <main className="min-h-screen w-full flex py-10 px-5">
            <LeftBar posts={posts}/>

            <div className="flex-1 w-full flex flex-col gap-14 items-start min-w-[300px] sm:px-12">
                {posts && sortPostsByDate(posts).map((post:Post, i) => {
                    console.log('post: ', post)
                    return <PostFragment key = {i} title={post.title} created_at={post.created_at} content={post.text} id={post.id}/>
                })}
            </div>

            <RightBar posts={posts}/>
        </main>
    );
}
