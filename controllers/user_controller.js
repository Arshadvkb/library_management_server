import bookModel from "../models/bookModel.js";
import rentalModel from "../models/rentalModel.js"



const rentBook= async(req,res)=>{
    const{user_id,book_id,dueDate}=req.body
  
    
    try {

      const book =bookModel.findById(book_id)
      if(!book){
         return res.json({success:'false',message:"No book found"})
      }
      if(book.available_count<1){
        return res.json({success:false,message:"book not available"})
      }
      else{
        book.available_count-=1

        const rental=new rentalModel({
          user:user_id,
          book:book_id,
          due_date:dueDate
        })
        await rental.save()

        return res.json({success:true,message:"book rented successdfuly"})

      }

       
    } catch (error) {
        console.log("server error");
        
            return res.json({ success: false, message: error.message });
    }
   

}

export {rentBook}