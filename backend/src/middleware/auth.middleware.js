import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";

const verifyJWT = asyncHandler(async(req,_,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        throw new apiError(404,"token is missing");
    }

    try {
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new apiError(404,"User does not exist");
        }
        req.user = user
        next();
    } catch (error) {
        throw new apiError(500,"something went wrong while verifying token")
    }
})

export default verifyJWT;