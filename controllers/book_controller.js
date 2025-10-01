   
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

const editBook=async(req,res)=>{
    const {id}=req.params;
    const {title,ISBN,author,publishedDate}=req.body;

    try {
       const book=await bookModel.findByIdAndUpdate(
            id,
            {title,ISBN,author,publishedDate},
            { new: true, runValidators: true }     
        )
        
       if(!book){
         return res.json({success:false,message:"No book found"})
       }
       
        return res.json({success:true,message:"book updated"})
    } catch (error) {
         
        return res.json({success:false,message:error.message})    
    }

}



export {addBook ,viewBooks, editBook};