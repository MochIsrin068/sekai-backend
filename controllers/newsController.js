const newsModel = require('../models/news');

const getAllNews = async (req, res) => {
  try {
    const [data] = await newsModel.getAllNews();
    res.json({
      message: "GET all news success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNews = async (req, res) => {
  const { title, content, createdAt } = req.body;
  
  if (!title || !content || !createdAt) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await newsModel.createNews(title, content, createdAt);
    res.status(201).json({
      message: "CREATE new news success",
      data: { title, content, createdAt },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, createdAt } = req.body;

  try {
    await newsModel.updateNews(id, title, content, createdAt);
    res.json({
      message: "UPDATE news success",
      data: { id, title, content, createdAt },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    await newsModel.deleteNews(id);
    res.json({
      message: "DELETE news success",
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
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
};
