const express = require('express');
const router = express.Router();
const  userscontroller  = require('../controller/users'); // Destructure to get the `users` function
const jwtauth = require('../middelware/jwtauth');

// Correctly pass the `users` callback function
router.get('/', jwtauth,userscontroller.users);

module.exports = router;
