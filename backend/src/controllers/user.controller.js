import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js"
import {httpOption} from "../constants.js"
import apiResponse from "../utils/apiResponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
const generateAccessTokenAndRefreshToken = async(userId) => {
    const user = await User.findById(userId);
    if(!user){
        throw new apiError(400,"user not exist");
    };
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});

    return {accessToken, refreshToken};
}

const registerUser = asyncHandler(async(req,res) => {
    
    const {username, email,password} = req.body;
    if(!(username && email && password)){
        throw new apiError(400,"please provide all the details");
    }

    //check if user already exist or not

    const checkingUser = await User.findOne({
        $or:[{username},{email}]
    });

    if(checkingUser){
        throw new apiError(400,"user already exist");
    }

    //register user if it don't exist earlier

    const user = await User.create({
        username:username.trim().toLowerCase(),
        email:email.trim(),
        password:password.trim(),
        avatar:`https://avatar.iran.liara.run/public?username=${username.trim()}`
    })

    if(!user){
        throw new apiError(500,"Something went wrong while registering user");
    }

    res.status(200).json(new apiResponse(201,user,"User registered successfully"))
})

const loginUser = asyncHandler(async(req,res) => {
    const {username,email, password} = req.body;
    if(!((email || username) && password)){
        throw new apiError(400,"please provide all the details");
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })
    //checking if user exist or not
    if(!user){
        throw new apiError(400,"user does not exist");
    }

    const isValidPassword = await user.isPasswordCorrect(password);
    if(!isValidPassword){
        throw new apiError(400,"invalid password");
    }

    //generating access and refresh tokens to save in user
    const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(user?._id);

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");

    res.status(200)
    .cookie("accessToken",accessToken,httpOption)
    .cookie("refreshToken",refreshToken,httpOption)
    .json(new apiResponse(201,loggedInUser,"user logged in successfully"))
})


const logoutUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new apiError(400,"user does not exist");
    }

    try{
        await user.updateOne({refreshToken:undefined})

        return res.status(200)
        .clearCookie("accessToken",httpOption)
        .clearCookie("refreshToken",httpOption)
        .json(new apiResponse(200,{},"user logged out successfully"))
    }
    catch(error){
        throw new apiError(400,error.message)
    }
})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarlocalpath = req.file?.path;

    if(!avatarlocalpath){
        throw new apiError(400,"avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarlocalpath);
    if(!avatar){
        throw new apiError(500,"server got crash while uploading new avatar");
    }
    const user =await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            avatar:avatar?.url
        }
    },{
        new:true
    }).select("-password -refreshToken");

    if(!user){
        throw new apiError(500,"something went wrong while updating avatar");
    }

    return res.status(200).json(new apiResponse(200,user,"successfully changed avatar"));

}) 


const updateAbout = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new apiError(404,"user doesnot exist");
    }
    const {about} = req.body;
    if(!about){
        throw new apiError(400,"about is required");
    }
    const updatedUser = await User.findByIdAndUpdate(req.user?._id,{about},{new:true});
    if(!updatedUser){
        throw new apiError(500,"something went wrong while updating about");
    }
    return res.status(200).json(new apiResponse(200,updatedUser,"successfully updated about"));
})


export {registerUser, loginUser, logoutUser, updateUserAvatar, updateAbout};