const express = require("express")
const {addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContent} = require("../controllers/blogController")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")
const blogRouter = express.Router()


blogRouter.post("/add", upload.single("image"), auth , addBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/:blogId", getBlogById)
blogRouter.post("/delete", auth , deleteBlogById)
blogRouter.put("/toggle-publish", auth , togglePublish)


blogRouter.post("/:blogId/add-comment", addComment)
blogRouter.get("/:blogId/comments", getBlogComments)

blogRouter.post("/generate", auth ,  generateContent)

module.exports = blogRouter