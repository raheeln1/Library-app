import mongoose from "mongoose";
const userSchema  = mongoose.Schema({
    name : {type:String},
    email : {type:String},
    password : {type:String},
    profilePic: {type:String},
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date,default: Date.now },
    createdAt: { type: Date, default: Date.now },
}) ;

const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;