"use client"

import {cn} from "@/lib/utils";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import ErrorBox from "@/components/ui/my_elements/errorBox";
import {Post} from "@/interfaces/posts";
import {getPost} from "@/actions/posts/posts";

type Params = {
    postID:string
}

export default function Page(){
    const {postID} = useParams<Params>();
    const [post, setPost] = useState<Post>();
    const [errorMessage, setErrorMessage] = useState<string>();
    console.log('aID: ', postID);
    // const post = getPost(postID)



    useEffect(() => {
        getPost(postID).then(res=>{
            if(res)setPost(res[0])
            else setErrorMessage('wrong id, post not found')
        })
    }, []);

    return(
        <div className={cn('')}>
            {errorMessage && <ErrorBox errorMessage={errorMessage}/>}

            {post && <div className=''>{post.toString()}</div>}
        </div>
    )
}