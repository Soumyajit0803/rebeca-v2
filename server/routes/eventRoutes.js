const express = require('express')
const eventController = require("../controllers/eventController")

const Router = express.Router()
Router.post("/create", eventController.createEvent)
Router.delete("/delete", eventController.deleteEvent)
Router.patch("/update", eventController.updateEvent)

module.exports = Router