const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const newsController = require("../controllers/newsController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, newsController.createNews);

// READ - GET
router.get("/:id", newsController.getDetailNews);
router.get("/", newsController.getAllNews);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, newsController.updateNews);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, newsController.deleteNews);

module.exports = router;
