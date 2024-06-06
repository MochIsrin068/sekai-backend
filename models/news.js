const dbPool = require('../config/database');

const getAllNews = () => {
  const sql = 'SELECT * FROM news';
  return dbPool.execute(sql);
};

const getNewsById = (id) => {
  const sql = 'SELECT * FROM news WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createNews = (title, content, image) => {
  const sql = 'INSERT INTO news (title, content, image) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [title, content, image]);
};

const updateNews = (id, title, content, image) => {
  const sql = 'UPDATE news SET title = ?, content = ?, image = ? WHERE id = ?';
  return dbPool.execute(sql, [title, content, image, id]);
};

const deleteNews = (id) => {
  const sql = 'DELETE FROM news WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
