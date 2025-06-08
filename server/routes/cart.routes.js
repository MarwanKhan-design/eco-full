import express from "express";
import { User } from "../models/User.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const cartItem = user.cart.find(
    (item) => item.product && item.product.toString() === productId
  );

  if (quantity === 1 && cartItem) {
    cartItem.quantity = cartItem.quantity + 1;
    console.log("1");
  } else if (quantity !== 1 && cartItem) {
    cartItem.quantity = quantity;
    console.log("2");
  } else {
    user.cart.push({ product: productId, quantity: quantity });
    console.log("3");
  }

  await user.save();
  await user.populate("cart.product");

  res.json(user.cart);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("cart.product");
  if (!user) {
    return res.json("User not Found");
  } else {
    return res.json(user.cart);
  }
});

export default router;
