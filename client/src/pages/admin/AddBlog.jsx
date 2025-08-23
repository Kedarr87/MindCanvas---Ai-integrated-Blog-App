import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from "quill"
import axios from 'axios'
import { parse } from 'marked'
import { toast } from 'react-toastify'

const AddBlog = () => {

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [ isAdding, setIsAdding] = useState(false)
    const [ loading, setLoading] = useState(false)

    const [image, setImage] = useState(false)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [category, setCategory] = useState("startup")
    const [isPublished, setIsPublished] = useState(false)


    const generateContent = async() => {
        if(!title) return toast.error("Please enter a title")

        try {
            setLoading(true)
            const res = await axios.post("http://localhost:4000/api/blog/generate", {prompt: title})


            if(res.data?.content){
                quillRef.current.root.innerHTML = parse(res.data.content)
                toast.success("AI content generated")
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    const handleSubmit = async(e) => {

        try {
            e.preventDefault()
            setIsAdding(true)

            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished
            }

            const formData = new FormData()
            formData.append("blog", JSON.stringify(blog))
            formData.append("image", image)

            const res = await axios.post(`http://localhost:4000/api/blog/add`, formData)

            try {
                toast.success("Blog added succesfully")
                setImage(false)
                setTitle("")
                quillRef.current.root.innerHTML = ""
                setCategory("startup")
            } catch (error) {
                toast.error("Failed to add blog")
            }
                
            



        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsAdding(false)
        }


    }

    useEffect(() => {
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {theme: "snow"})
        }
    }, [])

  return (
    <form onSubmit={handleSubmit} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
        <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
            <p>Upload thumbnail</p>
            <label htmlFor='image'>
                <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
            </label>

            <p className='mt-4'>Blog title</p>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />

            <p className='mt-4'>Sub title</p>
            <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />

            <p className='mt-4'>Blog description</p>
            <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                <div ref={editorRef}></div>
                <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>{loading ? "Loading..." : "Generate with AI"}</button>
            </div>

            <p className='mt-4'>Blog Category</p>
            <select onChange={(e) => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
                <option value="">Select category</option>
                <option value="startup">Startup</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="finance">Finance</option>
            </select>

            <div className='flex gap-2 mt-4'>
                <p>Publish Now</p>
                <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e) => setIsPublished(e.target.checked)} />
            </div>

            <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>{isAdding ? "Adding..." : "Add Blog"}</button>
        </div>
    </form>
  )
}

export default AddBlog
