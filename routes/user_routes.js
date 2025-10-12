import express from "express";
import { rentBook, return_book } from "../controllers/user_controller.js";

const userRouter = express.Router();

userRouter.put("/rent-book", rentBook);
userRouter.put("/return-book/:id", return_book);

export default userRouter;
