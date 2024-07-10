import { Practice } from "../models/practice.model.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const create = asyncHandler(async(req,res) => {
    const {content} = req.body;
    const comment = await Practice.create({
        content
    })

    res.status(200).json(new apiResponse(201,comment,"comment created successfully"))
})

function addnode(tree,commentId,newComment){
    if(String(tree._id) === commentId){
        return tree.replies.push(newComment._id) 
    }
}

const add = asyncHandler(async(req,res) => {
    const {content} = req.body;
    const {commentId} = req.params;
    const comment = await Practice.create({
        content
    })
    const abc = await Practice.updateOne({_id:commentId},{$push:{replies:comment._id}},{new:true})

    return res.status(200).json(new apiResponse(201,abc,"added data"))

})

const get = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const comment = await Practice.find({_id:id})
    return res.status(200).json(new apiResponse(200,comment,"fetched successfully"))
})

export {create, add, get}