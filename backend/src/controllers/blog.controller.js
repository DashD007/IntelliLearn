import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

import { User } from "../models/user.model.js";
import {Blog} from "../models/blog.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getBlogs = asyncHandler(async(req,res) => {
    try {
        const blogs = await Blog.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline:[
                        {
                            $project: {
                                _id:1,
                                username:1,
                                email:1,
                                avatar:1,   
                            }

                        }
                    ]
                }
            },
            {
                $unwind: "$owner"
            }
        ]);
        if(!blogs){
            throw new apiError(404,"Something went wrong while fetching blogs");
        }

        return res.status(200).json(new apiResponse(201,blogs,"blogs fetched successfully"))
    } catch (error) {
        console.log(error)
    }


})

const getBlogById = asyncHandler(async(req,res) => {
    const {id} = req.params;
    if(!id){
        throw new apiError(400,"id is missing");
    }

    // const blog = await Blog.findById(id).populate("owner");

    const blog = await Blog.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project: {
                            _id:1,
                            username:1,
                            email:1,
                            avatar:1,   
                        }
                    }
                ]  
            },
        },
        {
            $unwind:"$owner"
        }
    ])
    
    if(!blog){
        throw new apiError(404,"blog not exist");
    }
    res.status(200).json(new apiResponse(201,blog,"blog fetched successfully"))
})

const getAllBlogsOfUser = asyncHandler(async(req,res) => {
    const {userId} = req.params;

    if(!userId) throw new apiError(404,"user id is missing");

    const user = await User.findById(userId);
    if(!user){
        throw new apiError(404,"no user exist")
    }
    const blog = await Blog.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project: {
                            _id:1,
                            username:1,
                            email:1,
                            avatar:1,   
                        }
                    }
                ]  
            },
        },
        {
            $unwind:"$owner"
        }
    ])

    if(!blog){
        throw new apiError(404,"blog not exist");
    }

    
    res.status(200).json(new apiResponse(201,blog,"All blogs of user fetched successfully"))
})



const writeBlog = asyncHandler(async(req,res) => {
    const {title,content,tag} = req.body;
    const bannerFilePath = req.file?.path;
    if(!(title && content)){
        throw new apiError(404,"title or content is missing");
    }

    if(!bannerFilePath){
        throw new apiError(404,"banner image is missing");
    }
    

    const banner = await uploadOnCloudinary(bannerFilePath);

    if(!banner){
        throw new apiError(500,"banner image is failed to upload")
    }
    const blog = await Blog.create({
        title: title.trim(),
        content: content.trim(),
        tag,
        owner: req.user?._id,
        banner:banner?.url
    })
    if(!blog){
        throw new apiError(500,"something went wrong while creating blog");
    }

    return res.status(200).json(new apiResponse(201,blog,"Blog created Successfully"))
})

export {getBlogs,writeBlog, getBlogById, getAllBlogsOfUser};