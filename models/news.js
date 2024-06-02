const dbPool = require('../config/database');

const getAllNews = () => {
  const sql = 'SELECT * FROM news';
  return dbPool.execute(sql);
};

const getNewsById = (id) => {
  const sql = 'SELECT * FROM news WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createNews = (title, content, createdAt) => {
  const sql = 'INSERT INTO news (title, content, created_at) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [title, content, createdAt]);
};

const updateNews = (id, title, content, createdAt) => {
  const sql = 'UPDATE news SET title = ?, content = ?, created_at = ? WHERE id = ?';
  return dbPool.execute(sql, [title, content, createdAt, id]);
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
