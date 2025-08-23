import axios from 'axios'
import { tr } from 'motion/react-client'
import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const BlogTable = ({index, fetchDashboard, blog}) => {

    const {title, createdAt} = blog
    const BlogDate = new Date(createdAt)

    const handlePublish = async() => {
        try {
            const res = await axios.put("http://localhost:4000/api/blog/toggle-publish", {id: blog._id})
            console.log(res)
            fetchDashboard()
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async(id) => {
        try {
            const res = await axios.post("http://localhost:4000/api/blog/delete", {id})
            toast.success("Blog Deleted")
            fetchDashboard()
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
                {blog.isPublished ? "Published" : "Unpublished"}
            </p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={handlePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? "Unpublish" : "Publish"}</button>
            <img onClick={() => handleDelete(blog._id)} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
        </td>
    </tr>
  )
}

export default BlogTable
