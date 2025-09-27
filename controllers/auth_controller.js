import userModel from '../models/userModel'

bcrypt=require('bcryptjs')
jwt=require('jsonwebtoken')



export const register=async (req,res)=>{
    const {name,email,phone,password}=req.body

    if(!name || !email || !phone || !password){
        return res.json({success:false,message:'missing details'})
    }
    try {
        const exixtingUser=await userModel.findOne({email})
        if(exixtingUser){
            return res.json({success:false,message:'User alredy exists'})
        }

        const hashedpassword=await bcrypt.hash(password,10)
        const user=userModel({name,phone,email,password:hashedpassword})
        await user.save

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRETE,{expireIn:'7d'})

        res.cookie('tokrn',token,{
            httpOnly:true, 
            secured:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.json({success:true})

        } catch (error) {
        res.json({success:false,message:error.message})
        
    }
} 

export const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.json({success:false,message:'missing details'})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'Invalid email'})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:'Invalid password'})

        }
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRETE,{expireIn:'7d'})

        res.cookie('tokrn',token,{
            httpOnly:true, 
            secured:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.json({success:true})
        
    } catch (error) {
             return res.json({success:false,message:error.message})
   
    }
}

export const logout=async (req,res)=>{
try {
    res.clearCookie('token',{
            httpOnly:true, 
            secured:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7 * 24 * 60 * 60 * 1000
        })
     return res.json({success:true,message:'Logged out'})

    
} catch (error) {
    return res.json({success:false,message:error.message})
}
}