import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

import { protect, restrictToAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/", protect, restrictToAdmin, getAllOrders);
router.put("/status/:id", protect, restrictToAdmin, updateOrderStatus);

export default router;
