const bcrypt=require('bcrypt')
const UserModel=require('../Models/users')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const signup=async(req, res)=>{
    try{
        const {name, email, password}=req.body
        const user=await UserModel.findOne({email})
        if(user){
            return res.status(409).json({message:"User already exits, you can login", success: false})
        }

        const userModel=UserModel({name, email, password})
        userModel.password=await bcrypt.hash(password,10)
        await userModel.save()
        
        res.status(201).json({message:"Signup successfully",success:true})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Internal server error", success:false})

    }
}
const login=async(req, res)=>{
    try{
        const {email, password}=req.body
        const user=await UserModel.findOne({email})
        const msg="Email or password is wrong"
        if(!user){
            return res.status(403).json({message:msg, success: false})
        }

        const isPassword=await bcrypt.compare(password,user.password)
        
        if(!isPassword){
            return res.status(403).json({message:msg, success: false})
        }

        const jwtToken=jwt.sign({email:user.email, _id:user._id}, process.env.JWT_SECRET, {expiresIn:'24h'})
        res.status(200).json({message:"Login successfully",
            jwtToken,
            email,
            name:user.name,
            success:true})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Internal server error", success:false})

    }
}

module.exports={login, signup}