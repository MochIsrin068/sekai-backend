const dbPool = require('../config/database');

const getAllProductCategories = () => {
  const sql = 'SELECT * FROM product_category';
  return dbPool.execute(sql);
};

const getProductCategoryById = (id) => {
  const sql = 'SELECT * FROM product_category WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createProductCategory = (name) => {
  const sql = 'INSERT INTO product_category (name) VALUES (?)';
  return dbPool.execute(sql, [name]);
};

const updateProductCategory = (id, name) => {
  const sql = 'UPDATE product_category SET name = ? WHERE id = ?';
  return dbPool.execute(sql, [name, id]);
};

const deleteProductCategory = (id) => {
  const sql = 'DELETE FROM product_category WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllProductCategories,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
