const dbPool = require('../config/database');

const getAllNewsImages = () => {
  const sql = 'SELECT * FROM news_image';
  return dbPool.execute(sql);
};

const getNewsImageById = (id) => {
  const sql = 'SELECT * FROM news_image WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createNewsImage = (image, newsId) => {
  const sql = 'INSERT INTO news_image (image, news_id) VALUES (?, ?)';
  return dbPool.execute(sql, [image, newsId]);
};

const updateNewsImage = (id, image, newsId) => {
  const sql = 'UPDATE news_image SET image = ?, news_id = ? WHERE id = ?';
  return dbPool.execute(sql, [image, newsId, id]);
};

const deleteNewsImage = (id) => {
  const sql = 'DELETE FROM news_image WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllNewsImages,
  getNewsImageById,
  createNewsImage,
  updateNewsImage,
  deleteNewsImage,
};
