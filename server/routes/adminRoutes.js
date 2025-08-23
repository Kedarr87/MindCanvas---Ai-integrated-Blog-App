const express = require("express")
const {adminLogin, getAllComments, getAllBlogsAdmin, deleteCommentById, approveCommentById, getDashboard} = require("../controllers/adminController")
const auth = require("../middleware/auth")
const adminRouter = express.Router()


adminRouter.post("/login", adminLogin)
adminRouter.get("/comments", auth , getAllComments)
adminRouter.get("/blogs", auth , getAllBlogsAdmin)
adminRouter.post("/delete-comments", auth , deleteCommentById)
adminRouter.post("/approve-comments", auth , approveCommentById)
adminRouter.get("/dashboard" , getDashboard)


module.exports = adminRouter