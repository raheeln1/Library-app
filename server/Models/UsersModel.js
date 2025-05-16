import mongoose from "mongoose";
const userSchema  = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    profilePic: {type:String},
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date,default: Date.now },
    createdAt: { type: Date, default: Date.now },
});


const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;