const dbPool = require('../config/database');

const getAllAboutUsYtEmbeds = () => {
  const sql = 'SELECT * FROM about_us_yt_embed';
  return dbPool.execute(sql);
};

const getAboutUsYtEmbedById = (id) => {
  const sql = 'SELECT * FROM about_us_yt_embed WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createAboutUsYtEmbed = (link, aboutUsId) => {
  const sql = 'INSERT INTO about_us_yt_embed (link, about_us_id) VALUES (?, ?)';
  return dbPool.execute(sql, [link, aboutUsId]);
};

const updateAboutUsYtEmbed = (id, link, aboutUsId) => {
  const sql = 'UPDATE about_us_yt_embed SET link = ?, about_us_id = ? WHERE id = ?';
  return dbPool.execute(sql, [link, aboutUsId, id]);
};

const deleteAboutUsYtEmbed = (id) => {
  const sql = 'DELETE FROM about_us_yt_embed WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllAboutUsYtEmbeds,
  getAboutUsYtEmbedById,
  createAboutUsYtEmbed,
  updateAboutUsYtEmbed,
  deleteAboutUsYtEmbed,
};
