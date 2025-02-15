const express = require('express');
const adminController = require('../controllers/adminController');
const adminCheck = require("../middlewares/adminMiddleware")

const Router = express.Router();


Router.get("/google", adminController.adminGoogleAuth); // login
Router.get('/status', adminCheck, adminController.adminStatus); // check user
Router.get('/logout', adminController.adminLogout); // logout
Router.post('/validate-passkey', adminController.validatePasskey); // logout

module.exports = Router;