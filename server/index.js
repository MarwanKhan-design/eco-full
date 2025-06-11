import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Routes Import
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000, () => {
  console.log("Server 3000");
});

mongoose
  .connect(
    "mongodb+srv://marwanpsh:asdfg@cluster0.ljzflbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("db connected"));
