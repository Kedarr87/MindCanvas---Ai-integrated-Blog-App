const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectDb = require("./config/db")
const adminRouter = require("./routes/adminRoutes")
const blogRouter = require("./routes/blogRoutes")

const app = express()



app.use(cors({
    origin: "https://your-frontend.vercel.app",
    credentials: true
}))
app.use(express.json())

connectDb()

app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)



app.get("/", (req, res) => {
    res.send("Backend is running")
})

module.exports = app