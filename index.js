import dotenv from 'dotenv/config';
import express from 'express';
import { db } from './config/mongo.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth_routes.js';
import bookRouter from './routes/book_routes.js';
import cloudinary from './config/cloudinary.js';

const app = express();
const port=8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'http://localhost:5173' : true,  
  credentials: true,  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());


//api endpoints
app.get('/',(req,res)=>{
    res.send('library management system');
}); 
app.use('/api/auth',authRouter)
app.use('/api/book',bookRouter)

db();
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
    
    
});

