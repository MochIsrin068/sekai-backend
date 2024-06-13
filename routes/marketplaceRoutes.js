const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const marketplaceController = require("../controllers/marketplaceController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, marketplaceController.createMarketplace);

// READ - GET
router.get("/:id", marketplaceController.getDetailMarketplace);
router.get("/", marketplaceController.getAllMarketplaces);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, marketplaceController.updateMarketplace);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, marketplaceController.deleteMarketplace);

module.exports = router;
