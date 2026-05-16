import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,// datatypes
        required:true, //field must be required
        unique:true //prevents duplicate values
    },
    phoneNumber:{
        type:Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['jobseeker','recruiter'],// enum used for option either student or recruiter
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
    },

},{timestamps:true});
export const User = mongoose.model('User',userSchema)