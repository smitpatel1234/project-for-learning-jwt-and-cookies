const express = require('express');
const userController = require('../controller/login');
const router = express.Router();

router.post('/appfind', userController.login);

module.exports = router;