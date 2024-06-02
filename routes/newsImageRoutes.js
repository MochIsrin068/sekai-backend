const express = require("express");
const newsImageController = require("../controllers/newsImageController");

const router = express.Router();

// CREATE - POST
router.post("/", newsImageController.createNewsImage);

// READ - GET
router.get("/", newsImageController.getAllNewsImages);

// UPDATE - PATCH
router.patch("/:id", newsImageController.updateNewsImage);

// DELETE - DELETE
router.delete("/:id", newsImageController.deleteNewsImage);

module.exports = router;
