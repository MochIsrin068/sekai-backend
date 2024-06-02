const dbPool = require('../config/database');

const getAllCategoryPages = () => {
  const sql = 'SELECT * FROM category_page';
  return dbPool.execute(sql);
};

const getCategoryPageById = (id) => {
  const sql = 'SELECT * FROM category_page WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createCategoryPage = (name) => {
  const sql = 'INSERT INTO category_page (name) VALUES (?)';
  return dbPool.execute(sql, [name]);
};

const updateCategoryPage = (id, name) => {
  const sql = 'UPDATE category_page SET name = ? WHERE id = ?';
  return dbPool.execute(sql, [name, id]);
};

const deleteCategoryPage = (id) => {
  const sql = 'DELETE FROM category_page WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllCategoryPages,
  getCategoryPageById,
  createCategoryPage,
  updateCategoryPage,
  deleteCategoryPage,
};
