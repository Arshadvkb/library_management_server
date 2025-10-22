import express from 'express';
import { register, login, logout } from '../controllers/auth_controller.js';
import upload from '../middleware/multer_setup.js';

const authRouter = express.Router();

authRouter.post('/register', upload.single('file'), register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;
