const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const aboutUsController = require("../controllers/aboutUsController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, aboutUsController.createAboutUs);

// READ - GET
router.get("/:id", aboutUsController.getDetailAboutUs);
router.get("/", aboutUsController.getAllAboutUs);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, aboutUsController.updateAboutUs);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, aboutUsController.deleteAboutUs);

module.exports = router;
