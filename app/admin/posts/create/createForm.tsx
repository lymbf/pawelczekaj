"use client"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {ComboboxDemo} from "@/components/formElements/comboBox";
import Editor from "@/app/admin/(editor)/editor";
import {Button} from "@/components/ui/button";
import React, {useActionState, useEffect, useState} from "react";
import LoadingSpinner from "@/components/ui/my_elements/loadingSpinner";
import ErrorBox from "@/components/ui/my_elements/errorBox";
import MessageBox from "@/components/ui/my_elements/messageBox";
import {createPostAction} from "@/actions/posts/posts";
import {Category, Type} from "@/interfaces/posts";

export default function CreateForm({categories, types}: { categories: Category[] | null, types:Type[] | null }) {
    const [category, setCategory] = useState<string>('');
    const [categoryObject, setCategoryObject] = useState<Category | null>(null);
    const [type, setType] = useState<string>('')
    const [typeObject, setTypeObject] = useState<Type | null>(null);
    const [richText, setRichText] = useState<string>('');
    const [clear, setClear] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const clearForm = ()=>{
        setCategory('')
        setRichText('')
        setCategoryObject(null)
    }



    const initState = {
        message:'',
        success:false
    }
    const post = createPostAction.bind(null, categoryObject,typeObject, richText)
    const [state, formAction, pending] = useActionState(post, initState)


    useEffect(() => {
        if(state?.success){
            console.log('added post')
            clearForm()
            setClear(true)
            setShowMessage(true)
            setTimeout(()=>{setShowMessage(false)}, 4000)
        }
        if(state?.message.length && !state?.success){
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
        }
    }, [state]);

    return (
        <form action={formAction}>
            {pending && <LoadingSpinner className={'z-[99] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'}/>}

            <Card className={'p-4 flex flex-col gap-12'}>
                <CardContent className={'flex flex-col gap-6'}>

                    <div className={'flex flex-col'}>
                        <label className={'text-xl font-bold mb-2'}>
                            Tytuł
                        </label>
                        <Input type='text' name='title' placeholder={'enter title'}/>
                    </div>
                    <div className={'flex flex-col '}>
                        <label htmlFor={'pc-picture'} className={'text-xl font-bold mb-2'}>
                            Zdjęcie główne
                        </label>
                        <Input
                            id={'pc-picture'}
                            type='file'
                            name='image'
                            placeholder={'enter title'}
                            className={' hover:opacity-80 hover:cursor-pointer'}/>
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <div className={'flex flex-col'}>
                            <label className={'text-xl font-bold mb-2'}>
                                Kategoria
                            </label>
                            <ComboboxDemo placeholder={'wybierz kategorie'}
                                          value={category}
                                          setValue={setCategory}
                                          setCategoryObject={setCategoryObject}
                                          data={categories}/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <div className={'flex flex-col'}>
                            <label className={'text-xl font-bold mb-2'}>
                                Rodzaj tekstu
                            </label>
                            <ComboboxDemo placeholder={'wybierz rodzaj tekstu'}
                                          value={type}
                                          setValue={setType}
                                          setCategoryObject={setTypeObject}
                                          data={types}/>
                        </div>
                    </div>

                    <label className={'text-xl font-bold mb-2'}>
                        Content
                    </label>
                    <Editor clear={clear} richText={richText} setRichText={setRichText}/>

                </CardContent>
                <CardFooter className={'flex justify-between'}>
                    <Button type='submit' className={'w-[130px] h-[33px]'}>Dodaj post</Button>
                    {<div className='form-error text-red-600 min-h-[40px]'>
                        {showMessage && state?.success && <MessageBox message={state?.message}/>}
                        {showMessage && !state?.success && state?.message && <ErrorBox errorMessage={state?.message}/>}
                    </div>}
                </CardFooter>
            </Card>
        </form>
    )
}