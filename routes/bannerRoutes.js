const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const bannerController = require("../controllers/bannerController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, bannerController.createBanner);

// READ - GET
router.get("/:id", bannerController.getDetailBanner);
router.get("/", bannerController.getAllBanners);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, bannerController.updateBanner);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, bannerController.deleteBanner);

module.exports = router;
