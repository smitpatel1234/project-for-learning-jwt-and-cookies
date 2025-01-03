const express = require('express');
const userController = require('../controller/register');
const router = express.Router();

router.post('/appapi', userController.register);


module.exports = router;