import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
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
router.get("/category/:id", getProductByCategory);

router.put("/:id", protect, restrictToAdmin, updateProduct);

router.delete("/:id", protect, restrictToAdmin, deleteProduct);

export default router;
