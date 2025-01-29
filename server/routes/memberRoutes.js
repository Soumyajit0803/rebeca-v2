const express = require('express')
const memberController = require("../controllers/memberController")

const Router = express.Router()
Router.post("/create", memberController.createMember)

module.exports = Router