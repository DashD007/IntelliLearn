import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Practice"
    }]
})

function autoPopulateReplies(next){
    this.populate("replies")
    next();
}

practiceSchema.pre("findOne", autoPopulateReplies);
practiceSchema.pre("find", autoPopulateReplies);

export const Practice = mongoose.model("Practice",practiceSchema)