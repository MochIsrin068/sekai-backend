const productModel = require("../models/product");
const {deleteFiles} = require('../helper/deleteAsset')

const getAllProducts = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;
  const categoryId = req.query.categoryId || null;
  const search = req.query.search || null;

  try {
    const [data] = await productModel.getAllProducts(limit, offset, categoryId, search);
    res.json({
      message: "GET all products success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await productModel.getProductById(id);
    res.json({
      message: "GET product detail success",
      data: data?.[0] || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createProduct = async (req, res) => {
  const { name, description, categoryId, ytEmbeds, marketPlaces, images } =
    req.body;

  const isProductFieldEmpty = !name || !description || !categoryId;
  const isYtEmbedsEmpty = !ytEmbeds || ytEmbeds?.length === 0;
  const isMarketPlacesEmpty = !marketPlaces || marketPlaces?.length === 0;
  const isImagesEmpty = !images || images?.length === 0;

  if (
    isProductFieldEmpty ||
    isYtEmbedsEmpty ||
    isMarketPlacesEmpty ||
    isImagesEmpty
  ) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    const [dataProduct] = await productModel.createProduct(
      name,
      description,
      categoryId
    );

    if (
      !dataProduct ||
      dataProduct.length === 0 ||
      dataProduct?.affectedRows === 0
    ) {
      return res.status(500).json({
        message: "Failed Add Product",
        serverMessage: null,
      });
    }

    let isYtEmbedCreated = false;
    let isMarketplacesCreated = false;
    let isImagesCreatd = false;

    if (!isYtEmbedsEmpty) {
      const placeholders = ytEmbeds.map(() => "(?, ?)").join(", ");
      const values = ytEmbeds.reduce((acc, curr) => {
        acc.push(curr, dataProduct?.insertId);
        return acc;
      }, []);
      const [dataYtEmbeds] = await productModel.createProductYtEmbed(
        placeholders,
        values
      );
      if (dataYtEmbeds?.affectedRows > 0) {
        isYtEmbedCreated = true;
      }
    }

    if (!isMarketPlacesEmpty) {
      const placeholders = marketPlaces.map(() => "(?, ?, ?)").join(", ");
      const values = marketPlaces.reduce((acc, curr) => {
        acc.push(curr.link, curr.id, dataProduct?.insertId);
        return acc;
      }, []);
      const [dataMarketPlace] = await productModel.createProductMarketplace(
        placeholders,
        values
      );
      if (dataMarketPlace?.affectedRows > 0) {
        isMarketplacesCreated = true;
      }
    }

    if (!isImagesEmpty) {
      const placeholders = images.map(() => "(?, ?, ?)").join(", ");
      const values = images.reduce((acc, curr) => {
        acc.push(curr.image, curr.color, dataProduct?.insertId);
        return acc;
      }, []);
      const [dataImages] = await productModel.createProductImage(
        placeholders,
        values
      );
      if (dataImages?.affectedRows > 0) {
        isImagesCreatd = true;
      }
    }

    if (!isYtEmbedCreated || !isMarketplacesCreated || !isImagesCreatd) {
      return res.status(500).json({
        message: "Failed Add Product",
        serverMessage: null,
      });
    }

    res.status(201).json({
      message: "CREATE new product success",
      data: { name, description, categoryId, ytEmbeds, images, marketPlaces },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, categoryId, ytEmbeds, marketPlaces, images } =
    req.body;

  const isProductFieldEmpty = !name || !description || !categoryId;

  if (isProductFieldEmpty) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await productModel.updateProduct(id, name, description, categoryId);

    // Delete existing product images
    await productModel.deleteProductImage(id);
    // Insert new product images
    if (images && images.length > 0) {
      const placeholders = images.map(() => "(?, ?, ?)").join(", ");
      const values = images.reduce((acc, curr) => {
        acc.push(curr.image, curr.color, id);
        return acc;
      }, []);
      await productModel.updateProductImage(placeholders, values);
    }

    // Delete existing product YT embeds
    await productModel.deleteProductYtEmbed(id);
    // Insert new product YT embeds
    if (ytEmbeds && ytEmbeds.length > 0) {
      const placeholders = ytEmbeds.map(() => "(?, ?)").join(", ");
      const values = ytEmbeds.reduce((acc, curr) => {
        acc.push(curr, id);
        return acc;
      }, []);
      await productModel.updateProductYtEmbed(placeholders, values);
    }

    // Delete existing product marketplaces
    await productModel.deleteProductMarketplaces(id);
    // Insert new product marketplaces
    if (marketPlaces && marketPlaces.length > 0) {
      const placeholders = marketPlaces.map(() => "(?, ?, ?)").join(", ");
      const values = marketPlaces.reduce((acc, curr) => {
        acc.push(curr.link, curr.id, id);
        return acc;
      }, []);
      await productModel.updateProductMarketplace(placeholders, values);
    }

    // Get updated product
    const [updatedProduct] = await productModel.getProductById(id);

    res.json({
      message: "UPDATE product success",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [productDetailData] = await productModel.getProductById(id)
    const productImages = productDetailData?.[0]?.images?.map((item) => item?.image_url)

    const isDeleted = await productModel.deleteProduct(id);

    if (isDeleted) {
      if(productImages && productImages?.length > 0){
        await deleteFiles(productImages);
      }
      res.json({
        message: "DELETE product success",
        data: null,
      });
    } else {
      res.status(500).json({
        message: "Failed to delete product",
        serverMessage: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};
