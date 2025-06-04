import Category from "../models/Category.model.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500), json(error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    res.send(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body);

  if (!category) {
    return res.status(404).json("category Not Found");
  }
  const updatedCategory = await category.findById(id);
  res.status(200).json(updatedCategory);
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json("category not found");
    } else {
      await category.findByIdAndDelete(id);
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCategoryById,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
