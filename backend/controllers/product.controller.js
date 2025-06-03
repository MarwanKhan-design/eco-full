import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
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
    const product = await Product.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    res.status(500).json(error.message);
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
};
