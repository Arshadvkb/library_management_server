const mongoose=require('mongoose');

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
    }

});

const bookModel=mongoose.models.book || mongoose.model('book',bookSchema);

module.exports=bookModel;