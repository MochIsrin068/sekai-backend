const newsImageModel = require('../models/newsImage');

const getAllNewsImages = async (req, res) => {
  try {
    const [data] = await newsImageModel.getAllNewsImages();
    res.json({
      message: "GET all news images success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewsImage = async (req, res) => {
  const { image, newsId } = req.body;
  
  if (!image || !newsId) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await newsImageModel.createNewsImage(image, newsId);
    res.status(201).json({
      message: "CREATE new news image success",
      data: { image, newsId },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateNewsImage = async (req, res) => {
  const { id } = req.params;
  const { image, newsId } = req.body;

  try {
    await newsImageModel.updateNewsImage(id, image, newsId);
    res.json({
      message: "UPDATE news image success",
      data: { id, image, newsId },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteNewsImage = async (req, res) => {
  const { id } = req.params;

  try {
    await newsImageModel.deleteNewsImage(id);
    res.json({
      message: "DELETE news image success",
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
  getAllNewsImages,
  createNewsImage,
  updateNewsImage,
  deleteNewsImage,
};
