const express = require("express");
const aboutUsYtEmbedController = require("../controllers/aboutUsYtEmbedController");

const router = express.Router();

// CREATE - POST
router.post("/", aboutUsYtEmbedController.createAboutUsYtEmbed);

// READ - GET
router.get("/", aboutUsYtEmbedController.getAllAboutUsYtEmbeds);

// UPDATE - PATCH
router.patch("/:id", aboutUsYtEmbedController.updateAboutUsYtEmbed);

// DELETE - DELETE
router.delete("/:id", aboutUsYtEmbedController.deleteAboutUsYtEmbed);

module.exports = router;
