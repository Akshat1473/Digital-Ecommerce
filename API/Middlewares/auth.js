
export const Authenticated = async(req,res,next)=>{
    // give any name in () not use same in api request
    const token=req.header("Auth")

    if(!token)return res.json({message:"Login first"})
}