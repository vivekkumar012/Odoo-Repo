import { categoryModel } from "../models/categoryModel.js";
import fs from 'fs';
import path from 'path';

// Add a new item (user)
export const addNewItem = async (req, res) => {
    try {
        const { title, description, category, type, size, condition, tags } = req.body;
        const image = req.file ? req.file.filename : null;

        const newItem = new categoryModel({
            title,
            description,
            category,
            type,
            size,
            condition,
            tags,
            image,
            status: "pending" // Default status for admin moderation
        });

        await newItem.save();
        res.status(201).json({ success: true, message: "Item submitted for review", item: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding item", error: error.message });
    }
};

// Get all pending items (admin only)
export const getPendingItems = async (req, res) => {
    try {
        const pendingItems = await categoryModel.find({ status: "pending" });
        res.status(200).json({ success: true, data: pendingItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching items", error: error.message });
    }
};

// Approve item (admin)
export const approveItem = async (req, res) => {
    try {
        const item = await categoryModel.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });

        res.status(200).json({ success: true, message: "Item approved", item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Approval failed", error: error.message });
    }
};

// Reject item (admin)
export const rejectItem = async (req, res) => {
    try {
        const item = await categoryModel.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });

        res.status(200).json({ success: true, message: "Item rejected", item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Rejection failed", error: error.message });
    }
};

// Delete item (admin)
export const deleteItem = async (req, res) => {
    try {
        const item = await categoryModel.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });

        // Delete image file if exists
        if (item.image) {
            const imagePath = path.join("uploads", item.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Deletion failed", error: error.message });
    }
};
