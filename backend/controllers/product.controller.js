import Product from "../models/product.model.js";
import Category from "../models/Category.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500), json(error.message);
  }
};

const createProduct = async (req, res) => {
  const imageUrl = req.file.path;
  try {
    const product = await Product.create({ ...req.body, image: imageUrl });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id }).populate("category");
    res.send(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params; // This is the category name

    // First, find the category by name
    const category = await Category.findOne({ name: id });
    if (!category) return res.status(404).json([]); // Return empty array if not found

    // Then, find products by category ID and populate category
    const products = await Product.find({ category: category._id }).populate(
      "category"
    );

    res.json(products); // ✅ This is an array
  } catch (error) {
    res.status(500).json([]); // Return empty array on error
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body);

  if (!product) {
    return res.status(404).json("Product Not Found");
  }
  const updatedProduct = await Product.findById(id);
  res.status(200).json(updatedProduct);
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json("Product not found");
    } else {
      await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
};
