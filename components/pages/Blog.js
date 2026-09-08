import BlogJournal from "../Blog_Components/Blog_content";
import Blog_Hero from "../Blog_Components/Blog_Hero";


export default function Blog({ initialBlogs = [] }){
    return(
        <>
            <Blog_Hero></Blog_Hero>
            <BlogJournal initialBlogs={initialBlogs}></BlogJournal>
        </>
    )
}