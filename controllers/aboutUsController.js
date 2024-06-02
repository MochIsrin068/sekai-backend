const aboutUsModel = require('../models/aboutUs');

const getAllAboutUs = async (req, res) => {
  try {
    const [data] = await aboutUsModel.getAllAboutUs();
    res.json({
      message: "GET all About Us success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createAboutUs = async (req, res) => {
  const { title, content, createdAt } = req.body;
  
  if (!title || !content || !createdAt) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await aboutUsModel.createAboutUs(title, content, createdAt);
    res.status(201).json({
      message: "CREATE new About Us success",
      data: { title, content, createdAt },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateAboutUs = async (req, res) => {
  const { id } = req.params;
  const { title, content, createdAt } = req.body;

  try {
    await aboutUsModel.updateAboutUs(id, title, content, createdAt);
    res.json({
      message: "UPDATE About Us success",
      data: { id, title, content, createdAt },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteAboutUs = async (req, res) => {
  const { id } = req.params;

  try {
    await aboutUsModel.deleteAboutUs(id);
    res.json({
      message: "DELETE About Us success",
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
  getAllAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
};
