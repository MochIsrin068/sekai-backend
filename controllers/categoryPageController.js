const categoryPageModel = require('../models/categoryPage');

const getAllCategoryPages = async (req, res) => {
  try {
    const [data] = await categoryPageModel.getAllCategoryPages();
    res.json({
      message: "GET all category pages success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDetailCategoryPage = async (req, res) => {
  const {id} = req.params

  try {
    const [data] = await categoryPageModel.getCategoryPageById(id);
    res.json({
      message: "GET detail category page success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};


const createCategoryPage = async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await categoryPageModel.createCategoryPage(name);
    res.status(201).json({
      message: "CREATE new category page success",
      data: { name },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateCategoryPage = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await categoryPageModel.updateCategoryPage(id, name);
    res.json({
      message: "UPDATE category page success",
      data: { id, name },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteCategoryPage = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryPageModel.deleteCategoryPage(id);
    res.json({
      message: "DELETE category page success",
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
  getAllCategoryPages,
  createCategoryPage,
  updateCategoryPage,
  deleteCategoryPage,
  getDetailCategoryPage
};
