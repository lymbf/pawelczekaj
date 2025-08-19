import {getPost, getPosts} from "@/actions/posts/posts";
import LeftBar from "@/components/ui/my_elements/leftBar/leftBar";
import Post from "@/components/ui/my_elements/posts/post";

export default async function Page({params}:{params: Promise<{postID:string}>}){

    const posts = await getPosts();
    const {postID} = await params
    const post = (await getPost(postID))
    console.log('my post: ', post)
    return(
        <main className="min-h-screen w-full gap-5 lg:gap-10 flex py-10 px-5">
            <LeftBar posts={posts} className={''}/>
            <div className={'flex-1'}>
                {post && <Post className={'max-w-[1000px]'} title={post[0].title} created_at={post[0].created_at} content={post[0].text} id={post[0].id}/>}

            </div>
        </main>
    )
}