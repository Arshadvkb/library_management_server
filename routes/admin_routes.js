import express from 'express';
import { addBook } from '../controllers/admin_controller.js';


const adminRouter = express.Router();



adminRouter.post('/add-book', addBook);


export default adminRouter;