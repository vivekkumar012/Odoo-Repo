import express from 'express'
import { addNewItem, approveItem, deleteItem, getAllApprovedItems, getPendingItems, rejectItem } from '../controller/categoryController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.post("/add", addNewItem);
// Admin wala kaam yaha se 
categoryRouter.post("/pending", adminMiddleware, getPendingItems);
categoryRouter.post("/approve/:id", adminMiddleware, approveItem)
categoryRouter.post("/reject/:id", adminMiddleware, rejectItem)
categoryRouter.post("/delete/:id", adminMiddleware, deleteItem)

categoryRouter.get("/items", getAllApprovedItems);

export default categoryRouter;
