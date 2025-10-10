import bookModel from "../models/bookModel.js";

const rentBook= async(req,res)=>{
    const{ISBN}=req.body
    console.log(req.body);
    
    try {
         const book = await bookModel.findOne({ ISBN });
         console.log(book);
         
         if (book) {
           await bookModel.findByIdAndUpdate(book._id, { $set: { count: book.count - 1 } }, {
             new: true,
             runValidators: true,
           });
           console.log("success");
           
               return res.json({success:true,message:"book rented sucessfuly"})
         }
          console.log("failed");
          
            return res.json({ success: false, message:"failed to rent book" });
    } catch (error) {
        console.log("server error");
        
            return res.json({ success: false, message: error.message });
    }
   

}

export {rentBook}