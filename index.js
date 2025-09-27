const express=require('express');
const { db } = require('./config/mongo');
const app=express();    
const dotenv=require('dotenv'); 
const cors=require('cors');
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth_routes.js')
const port=8000;

app.use(express.json());
dotenv.config();
app.use(cors({
    // origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());


//api endpoints
app.get('/',(req,res)=>{
    res.send('Hello World!');
}); 
app.use('/api/auth',authRouter)


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
db();