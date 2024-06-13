const bannerModel = require('../models/banner');

const getAllBanners = async (req, res) => {
  try {
    const [data] = await bannerModel.getAllBanners();
    res.json({
      message: "GET all banners success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDetailBanner = async (req, res) => {
  const {id} = req.params

  try {
    const [data] = await bannerModel.getBannerById(id);
    res.json({
      message: "GET detail banner success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};


const createBanner = async (req, res) => {
  const { categoryPageId, image, link } = req.body;

  if (!categoryPageId || !image || !link) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await bannerModel.createBanner(categoryPageId, image, link);
    res.status(201).json({
      message: "CREATE new banner success",
      data: { categoryPageId, image, link },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { categoryPageId, image, link } = req.body;

  try {
    await bannerModel.updateBanner(id, categoryPageId, image, link);
    res.json({
      message: "UPDATE banner success",
      data: { id, categoryPageId, image, link },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    await bannerModel.deleteBanner(id);
    res.json({
      message: "DELETE banner success",
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
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getDetailBanner
};
