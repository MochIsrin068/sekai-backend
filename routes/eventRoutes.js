const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// CREATE - POST
router.post("/", eventController.createEvent);

// READ - GET
router.get("/", eventController.getAllEvents);

// UPDATE - PATCH
router.patch("/:id", eventController.updateEvent);

// DELETE - DELETE
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
