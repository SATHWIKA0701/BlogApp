import exp from 'express'
export const adminRoute=exp.Router()
import { UserTypeModel } from '../Models/UserModel.js'
//read all articles
//block user
adminRoute.put('/block/:userId',async(req,res)=>{
    let {userId}=req.params
    let userOfDB=await UserTypeModel.findById(userId)
    if(!userOfDB)
    {
       return res.status(401).json({message:"User Not Found"})
    }
    let blockedUser =await UserTypeModel.findByIdAndUpdate(
        userId,
       { $set: { isActive: false } },
       {new:true}
    )
    //send res
    res.status(200).json({message:"User Blocked Successfully",payload:blockedUser})

})
//unblock user roles

adminRoute.put('/unblock/:userId',async(req,res)=>{
    let {userId}=req.params
    let userOfDB=await UserTypeModel.findById(userId)
    if(!userOfDB)
    {
       return res.status(401).json({message:"User Not Found"})
    }
    let blockedUser =await UserTypeModel.findByIdAndUpdate(
        userId,
       { $set: { isActive: true } },
       {new:true}
    )
    //send res
    res.status(200).json({message:"User Unblocked Successfully",payload:blockedUser})

})