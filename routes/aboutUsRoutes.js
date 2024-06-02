const express = require("express");
const aboutUsController = require("../controllers/aboutUsController");

const router = express.Router();

// CREATE - POST
router.post("/", aboutUsController.createAboutUs);

// READ - GET
router.get("/", aboutUsController.getAllAboutUs);

// UPDATE - PATCH
router.patch("/:id", aboutUsController.updateAboutUs);

// DELETE - DELETE
router.delete("/:id", aboutUsController.deleteAboutUs);

module.exports = router;
