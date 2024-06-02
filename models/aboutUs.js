const dbPool = require('../config/database');

const getAllAboutUs = () => {
  const sql = 'SELECT * FROM about_us';
  return dbPool.execute(sql);
};

const getAboutUsById = (id) => {
  const sql = 'SELECT * FROM about_us WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createAboutUs = (description, vision, mission) => {
  const sql = 'INSERT INTO about_us (description, vision, mission) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [description, vision, mission]);
};

const updateAboutUs = (id, description, vision, mission) => {
  const sql = 'UPDATE about_us SET description = ?, vision = ?, mission = ? WHERE id = ?';
  return dbPool.execute(sql, [description, vision, mission, id]);
};

const deleteAboutUs = (id) => {
  const sql = 'DELETE FROM about_us WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
};
