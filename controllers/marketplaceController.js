const marketplaceModel = require('../models/marketplace');

const getAllMarketplaces = async (req, res) => {
  try {
    const [data] = await marketplaceModel.getAllMarketplaces();
    res.json({
      message: "GET all marketplaces success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createMarketplace = async (req, res) => {
  const { name, image } = req.body;
  
  if (!name || !image) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await marketplaceModel.createMarketplace(name, image);
    res.status(201).json({
      message: "CREATE new marketplace success",
      data: { name, image },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateMarketplace = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  try {
    await marketplaceModel.updateMarketplace(id, name, image);
    res.json({
      message: "UPDATE marketplace success",
      data: { id, name, image },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteMarketplace = async (req, res) => {
  const { id } = req.params;

  try {
    await marketplaceModel.deleteMarketplace(id);
    res.json({
      message: "DELETE marketplace success",
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
  getAllMarketplaces,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
};
