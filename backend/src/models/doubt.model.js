import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doubt",
        default:null
    },
    replies:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doubt"
    }]
},{timestamps:true})

function autoPopulateReplies(next){
    this.populate("replies");
    this.populate("owner",["username","avatar"])
    next();
}


doubtSchema.pre("find",autoPopulateReplies);
doubtSchema.pre("findOne",autoPopulateReplies);
// doubtSchema.pre("findOneAndDelete",autoDelete);

export const Doubt = mongoose.model("Doubt",doubtSchema);
