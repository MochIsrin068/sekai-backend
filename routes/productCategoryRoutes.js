const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const productCategoryController = require("../controllers/productCategoryController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, productCategoryController.createProductCategory);

// READ - GET
router.get("/:id", productCategoryController.getProductById);
router.get("/", productCategoryController.getAllProductCategories);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, productCategoryController.updateProductCategory);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, productCategoryController.deleteProductCategory);

module.exports = router;
