   
import bookModel from "../models/bookModel.js";

 const addBook=async(req,res)=>{
    const {title,author,publishedDate,ISBN}=req.body;
    if(!title || !author || !publishedDate || !ISBN){
        return res.json({success:false,message:'missing details'})
    }
    try {
        const existingBook=await bookModel.findOne({ISBN});
        if(existingBook){
            return res.json({success:false,message:'Book with this ISBN already exists'})
        }       
        const book=new bookModel({title,author,publishedDate,ISBN});
        await book.save();
        return res.json({success:true,message:'Book added successfully'})
    } catch (error) {
        return res.json({success:false,message:error.message})      
    }
}

const viewBooks=async(req,res)=>{
    try {
        const books=await bookModel.find();
        return res.json({success:true,books})
    } catch (error) {
        return res.json({success:false,message:error.message})      
    }               
}


export {addBook ,viewBooks};