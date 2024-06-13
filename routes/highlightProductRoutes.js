const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const highlightProductController = require("../controllers/highlightProductController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, highlightProductController.createHighlightProduct);

// READ - GET
router.get("/:id", highlightProductController.getHighlightProductDetail);
router.get("/", highlightProductController.getAllHighlightProducts);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, highlightProductController.updateHighlightProduct);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, highlightProductController.deleteHighlightProduct);

module.exports = router;
