const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const productController = require("../controllers/productController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, productController.createProduct);

// READ - GET
router.get("/:id", productController.getProductDetail); 
router.get("/", productController.getAllProducts); 

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, productController.updateProduct);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, productController.deleteProduct);

module.exports = router;
