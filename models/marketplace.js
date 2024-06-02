const dbPool = require('../config/database');

const getAllMarketplaces = () => {
  const sql = 'SELECT * FROM marketplace';
  return dbPool.execute(sql);
};

const getMarketplaceById = (id) => {
  const sql = 'SELECT * FROM marketplace WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createMarketplace = (name, image) => {
  const sql = 'INSERT INTO marketplace (name, image) VALUES (?, ?)';
  return dbPool.execute(sql, [name, image]);
};

const updateMarketplace = (id, name, image) => {
  const sql = 'UPDATE marketplace SET name = ?, image = ? WHERE id = ?';
  return dbPool.execute(sql, [name, image, id]);
};

const deleteMarketplace = (id) => {
  const sql = 'DELETE FROM marketplace WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllMarketplaces,
  getMarketplaceById,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
};
