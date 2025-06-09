import express from "express";
import User from "../models/Users.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ status: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ status: false, message: error.message });
    }
});

// Create a new user
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            password: req.body.password
        };

        if (req.file) {
            userData.image = `/uploads/${req.file.filename}`;
        }

        const user = await User.create(userData);
        res.status(201).json({ status: true, data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ 
            status: false, 
            message: error.message || 'Failed to create user'
        });
    }
});

// Update a user
router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            password: req.body.password
        };

        if (req.file) {
            userData.image = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, 
            userData, 
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ 
                status: false, 
                message: "User not found" 
            });
        }

        res.json({ status: true, data: user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ 
            status: false, 
            message: error.message || 'Failed to update user'
        });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                status: false, 
                message: "User not found" 
            });
        }
        res.json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            status: false, 
            message: error.message || 'Failed to delete user'
        });
    }
});

export default router; 