import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please provide your username'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please provide your password']
    },
    isVerfied:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
//this is written specifically for nextJS because it runs on server side and we need to check if the model is already created or not

export default User;