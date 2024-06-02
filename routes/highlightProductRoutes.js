const express = require("express");
const highlightProductController = require("../controllers/highlightProductController");

const router = express.Router();

// CREATE - POST
router.post("/", highlightProductController.createHighlightProduct);

// READ - GET
router.get("/", highlightProductController.getAllHighlightProducts);

// UPDATE - PATCH
router.patch("/:id", highlightProductController.updateHighlightProduct);

// DELETE - DELETE
router.delete("/:id", highlightProductController.deleteHighlightProduct);

module.exports = router;
