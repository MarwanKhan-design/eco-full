import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { protect, restrictToAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", protect, restrictToAdmin, createCategory);

router.get("/:id", getCategoryById);

router.put("/:id", protect, restrictToAdmin, updateCategory);

router.delete("/:id", protect, restrictToAdmin, deleteCategory);

export default router;
