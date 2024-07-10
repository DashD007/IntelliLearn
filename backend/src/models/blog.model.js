import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    banner:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    tags:[{type:String}]
},{timestamps:true});

export const Blog = mongoose.model("Blog", blogSchema);
