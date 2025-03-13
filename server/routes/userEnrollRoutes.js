const express = require('express')
const userEnroll = require("../controllers/userEnrollController")

const Router = express.Router()
Router.post("/enroll", userEnroll.enrollUser)
Router.get("/getAllNotInEvent", userEnroll.getAllMembersNotInEvent)
Router.get("/isUserRegistered", userEnroll.isUserRegistered)


module.exports = Router