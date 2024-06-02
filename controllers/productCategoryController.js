const productCategoryModel = require("../models/productCategory");

const getAllProductCategories = async (req, res) => {
  try {
    const [data] = await productCategoryModel.getAllProductCategories();
    res.json({
      message: "GET all product categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await productCategoryModel.getProductCategoryById(id);
    res.json({
      message: "GET  product category success",
      data: data?.[0] || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createProductCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await productCategoryModel.createProductCategory(name);
    res.status(201).json({
      message: "CREATE new product category success",
      data: { name },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateProductCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await productCategoryModel.updateProductCategory(id, name);
    res.json({
      message: "UPDATE product category success",
      data: { id, name },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await productCategoryModel.deleteProductCategory(id);
    res.json({
      message: "DELETE product category success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductById
};
