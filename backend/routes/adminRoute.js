import express from 'express'
import { signin, signup } from '../controller/adminController.js';


const adminRouter = express.Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);

export default adminRouter;

