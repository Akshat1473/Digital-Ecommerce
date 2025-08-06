import jwt from 'jsonwebtoken'
import {User} from '../Models/User.js'
export const Authenticated = async(req,res,next)=>{
    // give any name in () not use same in api request
    const token=req.header("Auth")

    if(!token)return res.json({message:"Login first"})

    const decode =jwt.verify(token,"!@#$%^&*()")

    // console.log(decode)
    const id=decode.userId

    let user=await User.findById(id)

    if(!user)return res.json({message:
        "User not exist"
    })

    req.user=user;
    next();
}