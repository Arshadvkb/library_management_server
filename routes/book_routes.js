import express from 'express';
import { addBook, viewBooks } from '../controllers/book_controller.js';


const adminRouter = express.Router();



adminRouter.post('/add-book', addBook);
adminRouter.get('/view-books', viewBooks);


export default adminRouter;