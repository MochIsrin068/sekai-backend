const dbPool = require('../config/database');

const getAllBanners = () => {
  const sql = `
  SELECT
      b.id AS id,
      b.image AS banner_image,
      b.link AS banner_link,
      cp.id AS category_id,
      cp.name AS category_name
  FROM
      banner b
  LEFT JOIN
      category_page cp ON b.category_page_id = cp.id;
`;
  return dbPool.query(sql);
};

const getBannerById = (id) => {
  const sql = `
  SELECT
      b.id AS id,
      b.image AS banner_image,
      b.link AS banner_link,
      cp.id AS category_id,
      cp.name AS category_name
  FROM
      banner b
  LEFT JOIN
      category_page cp ON b.category_page_id = cp.id
  WHERE b.id = ?;
`;
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
