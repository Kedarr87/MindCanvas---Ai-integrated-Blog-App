const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Databse connected 🔥")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb