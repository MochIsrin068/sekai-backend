const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

// CREATE - POST
router.post("/", jobController.createJob);

// READ - GET
router.get("/", jobController.getAllJobs);

// UPDATE - PATCH
router.patch("/:id", jobController.updateJob);

// DELETE - DELETE
router.delete("/:id", jobController.deleteJob);

module.exports = router;
