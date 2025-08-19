import {createClient} from "@/lib/supabase/server";
import {Type} from "@/interfaces/posts";

const getTypes = async ()=>{
    const supabase = await createClient()
    const types:Type[]|null = (await supabase.from('types').select(`id, name`)).data
    console.log('text types: ', types)
    return types
}

export {getTypes}