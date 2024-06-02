const dbPool = require('../config/database');

const getAllJobs = () => {
  const sql = 'SELECT * FROM job';
  return dbPool.execute(sql);
};

const getJobById = (id) => {
  const sql = 'SELECT * FROM job WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createJob = (title, content) => {
  const sql = 'INSERT INTO job (title, content) VALUES (?, ?)';
  return dbPool.execute(sql, [title, content]);
};

const updateJob = (id, title, content) => {
  const sql = 'UPDATE job SET title = ?, content = ? WHERE id = ?';
  return dbPool.execute(sql, [title, content, id]);
};

const deleteJob = (id) => {
  const sql = 'DELETE FROM job WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
