const express = require("express");
const authenticateJWT = require('../middleware/authMiddleware');
const jobController = require("../controllers/jobController");

const router = express.Router();

// CREATE - POST
router.post("/", authenticateJWT, jobController.createJob);

// READ - GET
router.get("/:id", jobController.getDetailJob);
router.get("/", jobController.getAllJobs);

// UPDATE - PATCH
router.patch("/:id", authenticateJWT, jobController.updateJob);

// DELETE - DELETE
router.delete("/:id", authenticateJWT, jobController.deleteJob);

module.exports = router;
