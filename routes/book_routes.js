import express from 'express';
import { addBook, viewBooks , editBook } from '../controllers/book_controller.js';


const bookRouter = express.Router();



bookRouter.post('/add-book', addBook);
bookRouter.get('/view-books', viewBooks);
bookRouter.put('/edit-book/:id', editBook);


export default bookRouter;