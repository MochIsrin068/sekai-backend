const dbPool = require('../config/database');

const getAllAboutUs = () => {
  const sql = `
    SELECT
      a.id AS id,
      a.description,
      a.vision,
      a.mission,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT('id', ay.id, 'link', ay.link)
        )
        FROM about_us_yt_embed ay
        WHERE ay.about_us_id = a.id
      ) AS youtubeEmbeds
    FROM
       about_us a
    LEFT JOIN
      about_us_yt_embed ay ON a.id = ay.about_us_id
    GROUP BY
      a.id, a.description, a.vision, a.mission;
  `;
  return dbPool.query(sql);
};

const getAboutUsById = (id) => {
  const sql = `
    SELECT
      a.id AS id,
      a.description,
      a.vision,
      a.mission,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT('id', ay.id, 'link', ay.link)
        )
        FROM about_us_yt_embed ay
        WHERE ay.about_us_id = a.id
      ) AS youtubeEmbeds
    FROM
      about_us a
    LEFT JOIN
      about_us_yt_embed ay ON a.id = ay.about_us_id
    WHERE a.id = ?
    GROUP BY
      a.id, a.description, a.vision, a.mission;
  `;
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

const deleteAboutUs = async (aboutUsId) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete related about us youtube embeds
    await connection.execute("DELETE FROM about_us_yt_embed WHERE about_us_id = ?", [aboutUsId]);

    // Delete the about us itself
    await connection.execute("DELETE FROM about_us WHERE id = ?", [aboutUsId]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Youtube Embeds
const createAboutUsYtEmbed = (placeholders, values) => {
  const sql = `INSERT INTO about_us_yt_embed (link, about_us_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const updateAboutUsYtEmbed = async (placeholders, values) => {
  const sql = `INSERT INTO about_us_yt_embed (link, about_us_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const deleteAboutUsYtEmbed = (id) => {
  const sql = 'DELETE FROM about_us_yt_embed WHERE about_us_id = ?';
  return dbPool.execute(sql, [id]);
};


module.exports = {
  getAllAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  createAboutUsYtEmbed,
  updateAboutUsYtEmbed,
  deleteAboutUsYtEmbed
};
