import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Page() {
    return (
        <header className={cn('text-[54px] flex flex-col items-center')}>
            <h1 className={'font-marker-aid hover:cursor-pointer hover:opacity-80'}>
                <Link href={'/'}>Paweł Czekaj</Link>
            </h1>
            <h2 className={'font-tahoma font-normal text-[17px]'}>Blog Osobisty</h2>

        </header>
    )
}