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

const getDetailAboutUs = async (req, res) => {
  const { id } = req.params

  try {
    const [data] = await aboutUsModel.getAboutUsById(id);
    res.json({
      message: "GET detail About Us success",
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
  const { description, vision, mission, ytEmbeds } = req.body;

  const isYtEmbedsEmpty = !ytEmbeds || ytEmbeds?.length === 0;

  if (!description || !vision || !mission || isYtEmbedsEmpty) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    const [aboutUsData] = await aboutUsModel.createAboutUs(description, vision, mission);

    if (
      !aboutUsData ||
      aboutUsData.length === 0 ||
      aboutUsData?.affectedRows === 0
    ) {
      return res.status(500).json({
        message: "Failed Add About Us",
        serverMessage: null,
      });
    }

    let isYtEmbedCreated = false;

    if (!isYtEmbedsEmpty) {
      const placeholders = ytEmbeds.map(() => "(?, ?)").join(", ");
      const values = ytEmbeds.reduce((acc, curr) => {
        acc.push(curr, aboutUsData?.insertId);
        return acc;
      }, []);
      const [dataYtEmbeds] = await aboutUsModel.createAboutUsYtEmbed(
        placeholders,
        values
      );
      if (dataYtEmbeds?.affectedRows > 0) {
        isYtEmbedCreated = true;
      }
    }

    if (!isYtEmbedCreated) {
      return res.status(500).json({
        message: "Failed Add About Us, Failed Add Youtube Embeds",
        serverMessage: null,
      });
    }

    res.status(201).json({
      message: "CREATE new About Us success",
      data: { description, vision, mission, ytEmbeds },
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
  const { description, vision, mission, ytEmbeds } = req.body;

  const isAboutFieldEmpty = !description || !vision || !mission;

  if (isAboutFieldEmpty) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await aboutUsModel.updateAboutUs(id, description, vision, mission);

    // Delete existing about us YT embeds
    await aboutUsModel.deleteAboutUsYtEmbed(id);
    // Insert new about us YT embeds
    if (ytEmbeds && ytEmbeds.length > 0) {
      const placeholders = ytEmbeds.map(() => "(?, ?)").join(", ");
      const values = ytEmbeds.reduce((acc, curr) => {
        acc.push(curr, id);
        return acc;
      }, []);
      await aboutUsModel.updateAboutUsYtEmbed(placeholders, values);
    }

    const [aboutUsData] = await aboutUsModel.getAboutUsById(id);

    res.json({
      message: "UPDATE About Us success",
      data: aboutUsData?.[0] || null,
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
  getDetailAboutUs
};
