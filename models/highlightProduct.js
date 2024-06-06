const dbPool = require('../config/database');

const getAllHighlightProducts = () => {
  const sql = `
    SELECT
        hs.id AS section_id,
        hs.title AS section_title,
        hs.section_number,
        hs.description AS section_description,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', hp.id,
                'image', hp.image,
                'link', hp.link,
                'highlight_section_id', hp.highlight_section_id
            )
        ) AS highlight_products
    FROM
        highlight_section hs
    LEFT JOIN
        highlight_product hp ON hs.id = hp.highlight_section_id
    GROUP BY
        hs.id, hs.title, hs.section_number, hs.description;
  `;
  return dbPool.execute(sql);
};

const getHighlightProductById = (id) => {
  const sql = `
    SELECT
        hs.id AS section_id,
        hs.title AS section_title,
        hs.section_number,
        hs.description AS section_description,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', hp.id,
                'image', hp.image,
                'link', hp.link
            )
        ) AS highlight_products
    FROM
        highlight_section hs
    LEFT JOIN
        highlight_product hp ON hs.id = hp.highlight_section_id
    WHERE
        hs.id = ?
    GROUP BY
        hs.id, hs.title, hs.section_number, hs.description;
  `;
  return dbPool.execute(sql, [id]);
};

// SECTION
const createHighlightProductSection = (title, description, sectionNumber) => {
  const sql = 'INSERT INTO highlight_section (title, description, section_number) VALUES (?, ?, ?)';
  return dbPool.execute(sql, [title, description, sectionNumber]);
};

const updateHighlightProductSection = async(id, title, description, sectionNumber) => {
  const sql = 'UPDATE highlight_section SET title = ?, description = ?, section_number = ? WHERE id = ?';
  return dbPool.execute(sql, [title, description, sectionNumber, id]);
};

const deleteHighlightProductSection = async (id) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete related product images
    await connection.execute("DELETE FROM highlight_product WHERE highlight_section_id = ?", [id]);

    // Delete the product itself
    await connection.execute("DELETE FROM highlight_section WHERE id = ?", [id]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// PRODUCT
const createHighlightProduct = (placeholders, values) => {
  const sql = `INSERT INTO highlight_product (image, link, highlight_section_id)  VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const updateHighlightProduct = async(placeholders, values) => {
  const sql = `INSERT INTO highlight_product (image, link, highlight_section_id)  VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const deleteHighlightProduct = async(id) => {
  const sql = 'DELETE FROM highlight_product WHERE highlight_section_id = ?';
  return dbPool.execute(sql, [id]);
};

module.exports = {
  getAllHighlightProducts,
  getHighlightProductById,
  // Product
  createHighlightProduct,
  deleteHighlightProduct,
  updateHighlightProduct,
  // Section
  createHighlightProductSection,
  updateHighlightProductSection,
  deleteHighlightProductSection,
};
