const express = require("express");
const bannerController = require("../controllers/bannerController");

const router = express.Router();

// CREATE - POST
router.post("/", bannerController.createBanner);

// READ - GET
router.get("/", bannerController.getAllBanners);

// UPDATE - PATCH
router.patch("/:id", bannerController.updateBanner);

// DELETE - DELETE
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
