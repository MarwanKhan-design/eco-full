import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import multer from "multer";
import {storage} from '../config/cloudinary.js'

const router = express.Router();

const upload = multer({ storage });

router.get("/", getProducts);

router.post("/", upload.single("image"), createProduct);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
