interface Author{
    name?:string,
    id?:string
}

interface Post{
    id:string,
    title:string,
    text:string,
    type?:string,
    category?:Category,
    created_at:string,
    author?:Author
}

interface Category{
    id:string,
    created_at?: string,
    name:string,

}

interface Type{
    id:string,
    name:string
}

interface Tag{
    id:string,
    name:string,
    post_ids?:string[]
}

export type {Post, Author, Category, Tag, Type}