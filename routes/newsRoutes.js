const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

// CREATE - POST
router.post("/", newsController.createNews);

// READ - GET
router.get("/:id", newsController.getDetailNews);
router.get("/", newsController.getAllNews);

// UPDATE - PATCH
router.patch("/:id", newsController.updateNews);

// DELETE - DELETE
router.delete("/:id", newsController.deleteNews);

module.exports = router;
