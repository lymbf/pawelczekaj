"use client"

import {cn} from "@/lib/utils";
import {useState} from "react";
import RichTextEditor from "@/app/admin/(editor)/richTextEditor";
import Link from "next/link";

export default function PostFragment({className, title, created_at, content, id}: {
    className?: string,
    title: string,
    created_at: string,
    content: string,
    id: string
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [richText, setRichText] = useState(content);

    return (
        <div className={cn('flex flex-col items-start box-border border-b border-b-slate-800/20 pb-6 ', className)}>
            <Link className={'hover:opacity-80'} href={`/posts/${id}`}><h1
                className={'first-letter:uppercase  font-semibold tracking-tight text-[19px] mb-[10px]'}>{title}</h1>
            </Link>
            <p className={'text-[12px]  font-normal mb-[10px]'}>{new Date(created_at).toLocaleString()}</p>
            <div className={'max-h-[187px] overflow-hidden'}>
                <RichTextEditor content={richText} editable={false}/>
            </div>

            <div
                className={'w-full flex justify-end text-[12px] font-medium hover:cursor-pointer hover:opacity-80 mt-4'}>
                <Link href={`/posts/${id}`}>Czytaj dalej.. </Link>
            </div>

        </div>
    )
}