const dbPool = require('../config/database');

const getAllBanners = () => {
  const sql = 'SELECT * FROM banner';
  return dbPool.execute(sql);
};

const getBannerById = (id) => {
  const sql = 'SELECT * FROM banner WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createBanner = (categoryPageId, image, link) => {
  const sql = 'INSERT INTO banner (category_page_id, image, link) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [categoryPageId, image, link]);
};

const updateBanner = (id, categoryPageId, image, link) => {
  const sql = 'UPDATE banner SET category_page_id = ?, image = ?, link = ? WHERE id = ?';
  return dbPool.execute(sql, [categoryPageId, image, link, id]);
};

const deleteBanner = (id) => {
  const sql = 'DELETE FROM banner WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
