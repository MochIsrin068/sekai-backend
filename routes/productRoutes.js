const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// CREATE - POST
router.post("/", productController.createProduct);

// READ - GET
router.get("/:id", productController.getProductDetail); 
router.get("/", productController.getAllProducts); 

// UPDATE - PATCH
router.patch("/:id", productController.updateProduct);

// DELETE - DELETE
router.delete("/:id", productController.deleteProduct);

module.exports = router;
