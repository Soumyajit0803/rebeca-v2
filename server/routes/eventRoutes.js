const express = require('express')
const eventController = require("../controllers/eventController")

const Router = express.Router()
Router.post("/create", eventController.createEvent)
Router.delete("/delete", eventController.deleteEvent)
Router.patch("/update", eventController.updateEvent)
Router.get("/all", eventController.getAllEvents)
Router.get("/all", eventController.getAllEvents)

module.exports = Router