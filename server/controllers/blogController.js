const imagekit = require("../config/imageKit")
const Blog = require("../models/blog")
const fs = require("fs")
const Comment = require("../models/comment")
const main = require("../config/gemini")


const addBlog = async(req, res) => {
    try {
        
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog)

        const imageFile = req.file

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs" 
        })

        
        // Optimize Image through imageKit
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width: "1280"}
            ]
        })


        const image = optimizedImageUrl

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success: true, message: "Blog added successfully"})


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


const getAllBlogs = async(req, res) => {

    try {
        
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})

    } catch (error) {
        res.json({success: false, message : error.message})
    }
}

const getBlogById = async(req, res) => {

    try {
        
        const {blogId} = req.params

        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.json({success : false, message: "Blog not found"})
        }

        res.json({success: true, blog})

    } catch (error) {
        res.json({success: false, message : error.message})
    }
}


const deleteBlogById = async(req, res) => {
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)

        // delete all comment too

        await Comment.deleteMany({blog: id})

        res.json({success: true, message:"Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message : error.message})
    }
}


const togglePublish = async(req, res) => {
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)

        blog.isPublished = !blog.isPublished
        await blog.save()

        res.json({success: true, message:"Blog Status Updated"})

    } catch (error) {
        res.json({success: false, message : error.message})
    }
}


const addComment = async(req, res) => {
    try {
        const {blogId} = req.params
        const {name, content} = req.body
        await Comment.create({blog : blogId, name, content})

        res.json({success: true, message:"Comment added for review"})
    } catch (error) {
        res.json({success: false, message : error.message})
    }
}


const getBlogComments = async(req, res) => {
    try {
        const {blogId} = req.params
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1})

        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message : error.message})
    }
}


const generateContent = async(req , res) => {
    try {
        const {prompt} = req.body

        const content = await main(prompt + " Generate a blog content for this topic in simple text format")

        res.json({success:true, content})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


module.exports = {addBlog, getAllBlogs, getBlogById , deleteBlogById, togglePublish, addComment, getBlogComments, generateContent}