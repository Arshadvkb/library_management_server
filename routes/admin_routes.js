import express from 'express'
import { viewUser } from '../controllers/admin_controller.js'


const adminRouter=express.Router()


adminRouter.get('/view-users',viewUser)



export default adminRouter