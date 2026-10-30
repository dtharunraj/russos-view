
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://russos-view.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Russo's View backend is running!" });
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

 // Get one product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// Add a product
app.post("/api/products", async (req, res) => {
  try {
    const { name, category, price, image, description, stock } = req.body;

    if (!name || !category || price == null || Number(price) <= 0) {
      return res.status(400).json({
        message: "Valid name, category and price are required",
      });
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      image,
      description,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
