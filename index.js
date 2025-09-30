import express from 'express';
import { db } from './config/mongo.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth_routes.js';
import adminRouter from './routes/book_routes.js';

const app = express();
const port=8000;

app.use(express.json());
dotenv.config();
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());


//api endpoints
app.get('/',(req,res)=>{
    res.send('library management system');
}); 

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
db();