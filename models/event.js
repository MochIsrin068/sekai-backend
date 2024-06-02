const dbPool = require('../config/database');

const getAllEvents = () => {
  const sql = 'SELECT * FROM event';
  return dbPool.execute(sql);
};

const getEventById = (id) => {
  const sql = 'SELECT * FROM event WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

const createEvent = (image, link) => {
  const sql = 'INSERT INTO event (image, link) VALUES (?, ?)';
  return dbPool.execute(sql, [image, link]);
};

const updateEvent = (id, image, link) => {
  const sql = 'UPDATE event SET image = ?, link = ? WHERE id = ?';
  return dbPool.execute(sql, [image, link, id]);
};

const deleteEvent = (id) => {
  const sql = 'DELETE FROM event WHERE id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
