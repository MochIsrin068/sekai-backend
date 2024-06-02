const express = require("express");
const categoryPageController = require("../controllers/categoryPageController");

const router = express.Router();

// CREATE - POST
router.post("/", categoryPageController.createCategoryPage);

// READ - GET
router.get("/", categoryPageController.getAllCategoryPages);

// UPDATE - PATCH
router.patch("/:id", categoryPageController.updateCategoryPage);

// DELETE - DELETE
router.delete("/:id", categoryPageController.deleteCategoryPage);

module.exports = router;
