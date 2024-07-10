import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Doubt } from "../models/doubt.model.js";
const createDoubt = asyncHandler(async(req,res) => {
    const {content} = req.body;
    if(!content){
        throw new apiError(404,"Doubt Content is missing");
    }
    const doubt = await Doubt.create({
        owner:req.user?._id,
        content
    });
    
    if(!doubt){
        throw new apiError(500,"Doubt creation failed")
    }

    return res.status(200).json(new apiResponse(201,doubt,"Doubt created Successfully"))
})


const addReply = asyncHandler(async(req,res) => {
    const {content} = req.body;
    const {id} = req.params;
    if(!content){
        throw new apiError(404,"Reply is missing")
    }
    const doubt = await Doubt.findById(id);
    if(!doubt){
        throw new apiError(404,"Doubt or reply not found")
    }

    const replyInstance = await Doubt.create({
        owner:req.user?._id,
        content,
        parentId:id
    });
    if(!replyInstance){
        throw new apiError(500,"Reply creation failed")
    }

    const data = await Doubt.findByIdAndUpdate(id,{
        $push:{
            replies:replyInstance._id
        }
    },{new:true})

    if(!data){
        throw new apiError(500,"Something went wrong while pushing reply")
    }

    return res.status(200).json(new apiResponse(201,data,"reply added successfully"))
})


const getDoubtTree = asyncHandler(async(req,res) => {
    const {doubtId} = req.params;
    if(!doubtId){
        throw new apiError(404,"doubt id is missing");
    }

    const tree = await Doubt.findOne({_id:doubtId});
    if(!tree){
        throw new apiError("doubt does not exist")
    }

    return res.status(200).json(new apiResponse(201,tree,"tree fetched sucessfully"))
})



// const deleteBranch = async(comment) => {
//     if(comment.replies.length == 0){
//         const {parentId} = comment;
//         await Doubt.findByIdAndDelete(comment._id);
//     }
// }



const deleteReply = asyncHandler(async(req,res) => {
    const {replyId} = req.params;
    if(!replyId){
        throw new apiError(404,"reply id is missing");
    }
    // if(!doubtId){
    //     throw new apiError(404,"doubt id is missing");
    // }
    const reply = await Doubt.findById(replyId);
    if(!reply){
        throw new apiError(404,"reply does not exist")
    }
    
    const replyParentId = reply?.parentId;
    if(replyParentId){
        const updateParent = await Doubt.findByIdAndUpdate(replyParentId,{
            $pull:{
                replies:replyId
            }
        })
    }
    await Doubt.findByIdAndDelete(replyId);
    // const tree = await Doubt.findOne({_id:replyId});
    // if(!tree){
    //     throw new apiError(404,"doubt does not exist")
    // }

    // const updatedTree = await Doubt.findOne({_id:doubtId})
    
    // if(!updatedTree){
    //     throw new apiError(500,"Something went wrong while deleting reply")
    // }
    return res.status(200).json(new apiResponse(201,{},"reply deleted successfully"))
})

const getAllDoubts = asyncHandler(async(req,res) => {
    const doubts = await Doubt.find({parentId:null}).populate("owner");
    if(!doubts){
        throw new apiError(400,"No doubts exist");
    }
    return res.status(200).json(new apiResponse(201,doubts,"All doubts fetched"))
})
export {createDoubt, addReply, getDoubtTree, deleteReply, getAllDoubts};