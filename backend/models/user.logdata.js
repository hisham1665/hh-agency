import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required:true,
    },
    
    role:{
        type:String,
        required:true
    },
    isLoggedIn:{
        type:Boolean,
    },
}, {
    timestamps:true
})

const UsersLog = mongoose.model('UsersLogs' , userLogSchema );
export default UsersLog;