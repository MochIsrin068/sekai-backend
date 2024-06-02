const express = require("express");
const productCategoryController = require("../controllers/productCategoryController");

const router = express.Router();

// CREATE - POST
router.post("/", productCategoryController.createProductCategory);

// READ - GET
router.get("/:id", productCategoryController.getProductById);
router.get("/", productCategoryController.getAllProductCategories);

// UPDATE - PATCH
router.patch("/:id", productCategoryController.updateProductCategory);

// DELETE - DELETE
router.delete("/:id", productCategoryController.deleteProductCategory);

module.exports = router;
