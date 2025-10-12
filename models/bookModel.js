import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedDate:{
        type:Date,
        required:true
    },
    ISBN:{
        type:Number,
        required:true,
        unique:true
    },
    count:{
        type:Number,
        required:true,
    },
    image:{
            public_id:{type:String},
            secure_url:{type:String},
            width:{type:Number},
            height:{type:Number},
            format:{type:String}
    }

});

const bookModel=mongoose.models.book || mongoose.model('book',bookSchema);

export default bookModel;