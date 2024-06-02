const aboutUsYtEmbedModel = require('../models/aboutUsYtEmbed');

const getAllAboutUsYtEmbeds = async (req, res) => {
  try {
    const [data] = await aboutUsYtEmbedModel.getAllAboutUsYtEmbeds();
    res.json({
      message: "GET all About Us YouTube embeds success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createAboutUsYtEmbed = async (req, res) => {
  const { link, aboutUsId } = req.body;
  
  if (!link || !aboutUsId) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await aboutUsYtEmbedModel.createAboutUsYtEmbed(link, aboutUsId);
    res.status(201).json({
      message: "CREATE new About Us YouTube embed success",
      data: { link, aboutUsId },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateAboutUsYtEmbed = async (req, res) => {
  const { id } = req.params;
  const { link, aboutUsId } = req.body;

  try {
    await aboutUsYtEmbedModel.updateAboutUsYtEmbed(id, link, aboutUsId);
    res.json({
      message: "UPDATE About Us YouTube embed success",
      data: { id, link, aboutUsId },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteAboutUsYtEmbed = async (req, res) => {
  const { id } = req.params;

  try {
    await aboutUsYtEmbedModel.deleteAboutUsYtEmbed(id);
    res.json({
      message: "DELETE About Us YouTube embed success",
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
  getAllAboutUsYtEmbeds,
  createAboutUsYtEmbed,
  updateAboutUsYtEmbed,
  deleteAboutUsYtEmbed,
};
