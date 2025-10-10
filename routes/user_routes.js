import express from 'express'
import { rentBook } from '../controllers/user_controller.js'


const userRouter=express.Router()

userRouter.put('/rent-book',rentBook)

export default userRouter