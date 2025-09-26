const express=require('express');
const { db } = require('./config/mongo');
const app=express();    
const dotenv=require('dotenv');    
const port=8000;

app.use(express.json());
dotenv.config();
app.get('/',(req,res)=>{
    res.send('Hello World!');
}); 

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
db();