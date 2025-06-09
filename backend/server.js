import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/Users.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ status: true, data: products });
});

app.post("/api/products", async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ status: true, message: "Product created successfullys" });
});

app.delete("/api/products/:id", async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Product deleted successfully" });
  })


app.post("/api/users", async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ status: true, message: "User created successfully" });
});


app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    await User.findByIdAndUpdate(id, user);
    res.status(200).json({ status: true, message: "User updated successfully" });
});

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User deleted successfully" });
});

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.status(200).json({ status: true, data: users });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});