import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { protect, restrictToAdmin } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ storage });

router.get("/", getProducts);

router.post(
  "/",
  upload.single("image"),
  protect,
  restrictToAdmin,
  createProduct
);

router.get("/:id", getProductById);

router.put("/:id", updateProduct, protect, restrictToAdmin);

router.delete("/:id", deleteProduct);

export default router;
