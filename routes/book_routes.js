import express from 'express';
import {
  addBook,
  viewBooks,
  editBook,
  deleteBook,
} from '../controllers/book_controller.js';
import upload from '../middleware/multer_setup.js';

const bookRouter = express.Router();

bookRouter.post('/add-book', upload.single('file'), addBook);
bookRouter.get('/view-books', viewBooks);
bookRouter.put('/edit-book/:id', editBook);
bookRouter.delete('/delete-book/:id', deleteBook);

export default bookRouter;
