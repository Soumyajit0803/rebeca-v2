const express = require('express')
const memberController = require("../controllers/memberController")

const Router = express.Router()
Router.post("/create", memberController.createMember)
Router.get("/all", memberController.getAllMembers)
Router.post("/update", memberController.updateMember)

module.exports = Router