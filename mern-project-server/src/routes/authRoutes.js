const express = require('express');
const authController = require('../controller/authcontroller');
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/login', authController.isUserLoggedIn);

module.exports = router;