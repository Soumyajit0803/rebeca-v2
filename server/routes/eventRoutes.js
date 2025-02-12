const express = require('express')
const eventController = require("../controllers/eventController")

const Router = express.Router()
Router.post("/create", eventController.createEvent)
Router.get("/all", eventController.getAllEvents)

module.exports = Router