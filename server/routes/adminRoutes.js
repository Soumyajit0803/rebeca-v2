const express = require('express');
const adminController = require('../controllers/adminController');
const adminCheck = require("../middlewares/adminMiddleware")

const Router = express.Router();


Router.get("/login", adminController.adminLogin); // login
Router.get('/status', adminCheck, adminController.adminStatus); // check user
Router.get('/logout', adminController.adminLogout); // logout

module.exports = Router;