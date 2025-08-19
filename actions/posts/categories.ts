"use server"

import {createClient} from "@/lib/supabase/server";
import {Category} from "@/interfaces/posts";

const getCategories = async ()=>{
    const supabase = await createClient()
    const categories:Category[]|null = (await supabase.from('categories').select(`id, name`)).data
    console.log('kategorie: ', categories)
    return categories
}



export {getCategories}