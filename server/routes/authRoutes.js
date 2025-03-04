const express = require('express');
const authController = require('../controllers/authController');
const checkAuth = require('../middlewares/authMiddleware')

const Router = express.Router();


Router.get("/google", authController.googleAuth); // login
Router.get('/status', checkAuth, authController.checkStatus); // check user
Router.get('/logout', authController.logout); // logout
Router.post('/validate-passkey', authController.validatePasskey)

module.exports = Router;