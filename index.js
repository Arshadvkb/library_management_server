const express=require('express');
const { db } = require('./config/mongo');
const app=express();        
const port=8000;

app.get('/',(req,res)=>{
    res.send('Hello World!');
}); 

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
db();