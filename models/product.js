const dbPool = require("../config/database");

const getAllProducts = () => {
  const sql = `
    SELECT
        p.id AS id,
        p.name AS name,
        p.description AS description,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('image_id', pi.id, 'image_url', pi.image, 'image_color', pi.color)
          )
          FROM product_image pi
          WHERE pi.product_id = p.id
        ) AS images,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('yt_embed_id', pyt.id , 'yt_embed_link', pyt.link)
          )
          FROM product_yt_embed pyt
          WHERE pyt.product_id = p.id
        ) AS youtube_embeds,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('marketplace_id', m.id , 'marketplace_name', m.name, 'marketplace_link', pm.link)
          )
          FROM product_marketplace pm JOIN marketplace m ON pm.marketplace_id = m.id
          WHERE pm.product_id = p.id
        ) AS markerplaces,
        pc.id AS category_id,
        pc.name AS category_name
    FROM
        product p
    JOIN
        product_category pc ON p.category_id = pc.id
    LEFT JOIN
        product_image pi ON p.id = pi.product_id
    LEFT JOIN
        product_marketplace pm ON p.id = pm.product_id
    LEFT JOIN
        marketplace m ON pm.marketplace_id = m.id
    LEFT JOIN
        product_yt_embed pyt ON p.id = pyt.product_id
    GROUP BY p.id, p.name, p.description, pc.id, pc.name;  
  `;
  return dbPool.query(sql);
};

const getProductById = (id) => {
  const sql = `
    SELECT
        p.id AS id,
        p.name AS name,
        p.description AS description,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('image_id', pi.id, 'image_url', pi.image, 'image_color', pi.color)
          )
          FROM product_image pi
          WHERE pi.product_id = p.id
        ) AS images,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('yt_embed_id', pyt.id , 'yt_embed_link', pyt.link)
          )
          FROM product_yt_embed pyt
          WHERE pyt.product_id = p.id
        ) AS youtube_embeds,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('marketplace_id', m.id , 'marketplace_name', m.name, 'marketplace_link', pm.link)
          )
          FROM product_marketplace pm JOIN marketplace m ON pm.marketplace_id = m.id
          WHERE pm.product_id = p.id
        ) AS markerplaces,
        pc.id AS category_id,
        pc.name AS category_name
    FROM
        product p
    JOIN
        product_category pc ON p.category_id = pc.id
    LEFT JOIN
        product_marketplace pm ON p.id = pm.product_id
    LEFT JOIN
        marketplace m ON pm.marketplace_id = m.id
    WHERE p.id = ?
    GROUP BY p.id, p.name, p.description, pc.id, pc.name;  
  `;
  return dbPool.execute(sql, [id]);
};

const createProduct = (name, description, categoryId) => {
  const sql =
    "INSERT INTO product (name, description, category_id) VALUES (?, ?, ?)";
  return dbPool.execute(sql, [name, description, categoryId]);
};

const updateProduct = (id, name, description, categoryId) => {
  const sql =
    "UPDATE product SET name = ?, description = ?, category_id = ? WHERE id = ?";
  return dbPool.execute(sql, [name, description, categoryId, id]);
};


const deleteProduct = async (productId) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete related product images
    await connection.execute("DELETE FROM product_image WHERE product_id = ?", [productId]);

    // Delete related product YouTube embeds
    await connection.execute("DELETE FROM product_yt_embed WHERE product_id = ?", [productId]);

    // Delete related product marketplaces
    await connection.execute("DELETE FROM product_marketplace WHERE product_id = ?", [productId]);

    // Delete the product itself
    await connection.execute("DELETE FROM product WHERE id = ?", [productId]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Relation Table
// Images
const createProductImage = (placeholders, values) => {
  const sql = `INSERT INTO product_image (image, color, product_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const updateProductImage = async (placeholders, values) => {
  const sql = `INSERT INTO product_image (image, color, product_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const deleteProductImage = async (productId) => {
  const sql = "DELETE FROM product_image WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};

const getProductImages = async (productId) => {
  const sql = "SELECT * FROM product_image WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};

// Marketplace
const createProductMarketplace = (placeholders, values) => {
  const sql = `INSERT INTO product_marketplace (link, marketplace_id, product_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const updateProductMarketplace = async (placeholders, values) => {
  const sql = `INSERT INTO product_marketplace (link, marketplace_id, product_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const deleteProductMarketplaces = async (productId) => {
  const sql = "DELETE FROM product_marketplace WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};

const getProductMarketplaces = async (productId) => {
  const sql = "SELECT * FROM product_marketplace WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};

// Youtube Embeds
const createProductYtEmbed = (youtubeData, values) => {
  const sql = `INSERT INTO product_yt_embed (link, product_id) VALUES ${youtubeData}`;
  return dbPool.execute(sql, values);
};

const updateProductYtEmbed = async (placeholders, values) => {
  const sql = `INSERT INTO product_yt_embed (link, product_id) VALUES ${placeholders}`;
  return dbPool.execute(sql, values);
};

const deleteProductYtEmbed = async (productId) => {
  const sql = "DELETE FROM product_yt_embed WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};

const getProductYtEmbeds = async (productId) => {
  const sql = "SELECT * FROM product_yt_embed WHERE product_id = ?";
  return dbPool.execute(sql, [productId]);
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // Relation Table Function
  createProductImage,
  updateProductImage,
  createProductMarketplace,
  updateProductMarketplace,
  createProductYtEmbed,
  updateProductYtEmbed,
  deleteProductImage,
  deleteProductMarketplaces,
  deleteProductYtEmbed,
  getProductImages,
  getProductMarketplaces,
  getProductYtEmbeds
};
