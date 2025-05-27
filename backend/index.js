import express, { json } from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
import userRoutes from './routes/auth.route.js'
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);
app.use('/api', userRoutes)

app.listen(3000, () => {
  console.log("Server 3000");
  console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);
});

mongoose
  .connect(
    "mongodb+srv://marwanpsh:asdfg@cluster0.ljzflbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("db connected"));
