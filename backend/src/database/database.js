import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async() => {
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        .then(() => {console.log("connection Successfull");})
        .catch((err) => {console.log("error occured in db connection",err)})
        
    }
    catch(error){
        console.log("Error in db connection", error)
    }
}

export default connectDB;