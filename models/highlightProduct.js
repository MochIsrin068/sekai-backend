const dbPool = require('../config/database');

const getAllHighlightProducts = () => {
  const sql = 'SELECT * FROM highlight_product';
  return dbPool.execute(sql);
};

const getHighlightProductById = (id) => {
  const sql = 'SELECT * FROM highlight_product WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createHighlightProduct = (title, subtitle, sectionNumber) => {
  const sql = 'INSERT INTO highlight_product (title, subtitle, section_number) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [title, subtitle, sectionNumber]);
};

const updateHighlightProduct = (id, title, subtitle, sectionNumber) => {
  const sql = 'UPDATE highlight_product SET title = ?, subtitle = ?, section_number = ? WHERE id = ?';
  return dbPool.execute(sql, [title, subtitle, sectionNumber, id]);
};

const deleteHighlightProduct = (id) => {
  const sql = 'DELETE FROM highlight_product WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllHighlightProducts,
  getHighlightProductById,
  createHighlightProduct,
  updateHighlightProduct,
  deleteHighlightProduct,
};
