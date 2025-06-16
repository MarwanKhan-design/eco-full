import Order from "../models/Order.model.js";
import { User } from "../models/User.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod, total, paymentResult } =
      req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
      paymentResult,
      total,
    });

    const user = await User.findById(req.user._id);
    user.cart = [];
    user.save();
    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Get one order by ID (only if it's the user's own)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user"
      // "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this order" });
    }

    return res.json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

// Admin: Get all orders
export const getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    return res.json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};
