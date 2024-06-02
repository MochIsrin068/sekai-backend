const highlightProductModel = require('../models/highlightProduct');

const getAllHighlightProducts = async (req, res) => {
  try {
    const [data] = await highlightProductModel.getAllHighlightProducts();
    res.json({
      message: "GET all highlight products success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createHighlightProduct = async (req, res) => {
  const { title, subtitle, sectionNumber } = req.body;

  if (!title || !subtitle || !sectionNumber) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await highlightProductModel.createHighlightProduct(title, subtitle, sectionNumber);
    res.status(201).json({
      message: "CREATE new highlight product success",
      data: { title, subtitle, sectionNumber },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateHighlightProduct = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, sectionNumber } = req.body;

  try {
    await highlightProductModel.updateHighlightProduct(id, title, subtitle, sectionNumber);
    res.json({
      message: "UPDATE highlight product success",
      data: { id, title, subtitle, sectionNumber },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteHighlightProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await highlightProductModel.deleteHighlightProduct(id);
    res.json({
      message: "DELETE highlight product success",
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
  getAllHighlightProducts,
  createHighlightProduct,
  updateHighlightProduct,
  deleteHighlightProduct,
};
