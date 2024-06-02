const jobModel = require('../models/job');

const getAllJobs = async (req, res) => {
  try {
    const [data] = await jobModel.getAllJobs();
    res.json({
      message: "GET all jobs success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createJob = async (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await jobModel.createJob(title, content);
    res.status(201).json({
      message: "CREATE new job success",
      data: { title, content },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await jobModel.updateJob(id, title, content);
    res.json({
      message: "UPDATE job success",
      data: { id, title, content },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await jobModel.deleteJob(id);
    res.json({
      message: "DELETE job success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
