const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const categoryPageController = require("../controllers/categoryPageController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, categoryPageController.createCategoryPage);

// READ - GET
router.get("/:id", categoryPageController.getDetailCategoryPage);
router.get("/", categoryPageController.getAllCategoryPages);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, categoryPageController.updateCategoryPage);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, categoryPageController.deleteCategoryPage);

module.exports = router;
