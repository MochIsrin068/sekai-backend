const cheerio = require('cheerio');
const { deleteFiles } = require('../helper/deleteAsset')
const newsModel = require('../models/news');

const createSummary = (content) => {
  // Load the HTML content into cheerio
  const $ = cheerio.load(content);

  // Remove all image tags
  $('img').remove();

  // Get the text content
  let textContent = $.text();

  // Replace multiple spaces with a single space
  textContent = textContent.replace(/\s\s+/g, ' ');

  // Optionally, you can truncate the summary to a certain length if needed
  const summaryLength = 200; // Example length
  if (textContent.length > summaryLength) {
    textContent = textContent.substring(0, summaryLength) + '...';
  }

  return textContent;
};

const getAllNews = async (req, res) => {
  try {
    const [data] = await newsModel.getAllNews();
    const dataResponse = data?.map((d) => ({
      ...d,
      summary: createSummary(d?.content)
    })) || null

    res.json({
      message: "GET all news success",
      data: dataResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDetailNews = async (req, res) => {
  const { id } = req.params

  try {
    const [data] = await newsModel.getNewsById(id);
    const dataResponse = data?.[0] ? {
      ...data?.[0],
      summary: createSummary(data?.[0]?.content)
    } : null
  
    res.json({
      message: "GET news success",
      data: dataResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNews = async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content  || !image) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await newsModel.createNews(title, content, image);
    res.status(201).json({
      message: "CREATE new news success",
      data: { title, content, image },
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
  const { title, content, image } = req.body;

  try {
    await newsModel.updateNews(id, title, content, image);
    res.json({
      message: "UPDATE news success",
      data: { id, title, content, image },
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
    const [detailNews] = await newsModel.getNewsById(id)
    const image = detailNews?.[0]?.image || null

    const isDeleted = await newsModel.deleteNews(id);

    if (isDeleted) {
      if (image) {
        await deleteFiles([image])
      }

      res.json({
        message: "DELETE news success",
        data: null,
      });
    } else {
      res.status(500).json({
        message: "Failed to delete news",
        serverMessage: null,
      });
    }
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
  getDetailNews
};
