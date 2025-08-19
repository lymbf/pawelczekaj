"use server"

import {createClient} from "@/lib/supabase/server";
import {Category, Post, Type} from "@/interfaces/posts";

const getPosts = async ()=>{
    const supabase = await createClient()
    // @ts-ignore
    const articles:Post[]|null = (await supabase.from('posts').select(`id, title, created_at, text, author ( id, name ), category ( id, name )`)).data
    return articles
}

const getPost = async (id:string)=>{
    const supabase = await createClient()
    // @ts-ignore
    const res:Post[]|null = (await supabase.from('posts').select(`id, title, created_at, text, author ( id, name ), category ( id, name )`).eq('id', id)).data
    console.log('res: ', res)
    return  res
}

export {getPost, getPosts}



export const createPostAction = async (category: Category | null,
                                       type:Type |null,
                                       richText: string,
                                       prevState: unknown,
                                       formData: FormData) => {
    const title = formData.get('title')?.toString().toLowerCase()
    const image = formData.get('image')

    const supabase = await createClient();

    /*  upload image to supabase storage  */
    let imageUrl;
    // @ts-ignore
    if(image?.size){
        console.log('image: ', image)
        // @ts-ignore
        const {data, error} = await supabase.storage.from('images').upload(image?.name, image, {
            cacheControl: '3600', upsert: false
        })
        // @ts-ignore
        if (error && error.statusCode != '409') {
            console.log('error posting file')
            //handle error
        }
        // @ts-ignore
        imageUrl = data ? supabase.storage.from('images').getPublicUrl(data.path)?.data?.publicUrl : supabase.storage.from('images').getPublicUrl(image?.name)?.data?.publicUrl
    }

    /*  get user -> userId needed  */
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (category && richText && title && user) {
        const post = {
            category: category?.id,
            text: richText,
            type: type?.id,
            img: imageUrl||null,
            title: title,
            author: user?.id
        }
        console.log('posting the following: ', post)
        try{
            const res = await supabase.from('posts').insert(post)
            if(res) console.log('post response: ', res)
            if(res.error)throw new Error(res.error.message)
            if (!res.error) return {message: 'post added successfully', success: true}
        }catch(err){
            console.log('err: ', err)
            return {message: 'sth went wrong, couldnt add the article', success:false}
        }

    } else {
        console.log('sth is missing', 'post: ', {
            category: category?.id,
            text: richText,
            img_file: imageUrl,
            title: title,
            author: user?.id
        })
        return {message: 'form filled incorrectly', success: false}
    }
    
}

export const deletPostsAction = async (rows: any, prevState: any) => {
    const supabase = await createClient();
    const ids = Object.keys(rows)
    const res = await supabase
        .from('posts')
        .delete()
        .in('id', ids)
    if (res.status === 204) {
        console.log('posts deleted')
        return {message: 'posts deleted succesfully', success: true, ids: ids}
    } else {
        console.log('unable to delete')
        return {message: 'unable to delete posts, try again later', success: false, ids: []}
    }
}