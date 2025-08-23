const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({

    blog: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    isApproved:{
        type:Boolean,
        default:true
    }

}, {timestamps: true})


module.exports = mongoose.model("Comment", commentSchema)