const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectDb = require("./config/db")
const adminRouter = require("./routes/adminRoutes")
const blogRouter = require("./routes/blogRoutes")

const app = express()



app.use(cors())
app.use(express.json())

connectDb()

app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`we are running at http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Backend is running")
})

module.exports = app