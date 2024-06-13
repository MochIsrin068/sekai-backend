const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const eventController = require("../controllers/eventController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, eventController.createEvent);

// READ - GET
router.get("/:id", eventController.getEventDetail);
router.get("/", eventController.getAllEvents);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, eventController.updateEvent);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, eventController.deleteEvent);

module.exports = router;
