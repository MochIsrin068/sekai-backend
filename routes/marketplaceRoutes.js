const express = require("express");
const marketplaceController = require("../controllers/marketplaceController");

const router = express.Router();

// CREATE - POST
router.post("/", marketplaceController.createMarketplace);

// READ - GET
router.get("/", marketplaceController.getAllMarketplaces);

// UPDATE - PATCH
router.patch("/:id", marketplaceController.updateMarketplace);

// DELETE - DELETE
router.delete("/:id", marketplaceController.deleteMarketplace);

module.exports = router;
