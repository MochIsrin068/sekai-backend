const eventModel = require('../models/event');

const getAllEvents = async (req, res) => {
  try {
    const [data] = await eventModel.getAllEvents();
    res.json({
      message: "GET all events success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getEventDetail = async (req, res) => {
  const {id} = req.params

  try {
    const [data] = await eventModel.getEventById(id);
    res.json({
      message: "GET detail event success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};


const createEvent = async (req, res) => {
  const { image, link } = req.body;
  
  if (!image || !link) {
    return res.status(400).json({
      message: "Invalid data sent",
      data: null,
    });
  }

  try {
    await eventModel.createEvent(image, link);
    res.status(201).json({
      message: "CREATE new event success",
      data: { image, link },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { image, link } = req.body;

  try {
    await eventModel.updateEvent(id, image, link);
    res.json({
      message: "UPDATE event success",
      data: { id, image, link },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await eventModel.deleteEvent(id);
    res.json({
      message: "DELETE event success",
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
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventDetail
};
