import express from 'express';
import { addBook, viewBooks , editBook, deleteBook, fileAAAAA } from '../controllers/book_controller.js';
import upload from '../middleware/mlter_setup.js';


const bookRouter = express.Router();



bookRouter.post('/add-book', addBook);
bookRouter.get('/view-books', viewBooks);
bookRouter.put('/edit-book/:id', editBook);
bookRouter.delete('/delete-book/:id',deleteBook);
bookRouter.post('/upload',  upload.single('file'),fileAAAAA);



export default bookRouter;