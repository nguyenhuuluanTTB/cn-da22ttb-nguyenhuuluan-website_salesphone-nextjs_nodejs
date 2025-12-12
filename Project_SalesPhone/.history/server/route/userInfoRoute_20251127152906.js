const express = require('express');
const router = express.Router();
const userInfoController = require('../controller/userInfoController');

router.get('/user_info', userInfoController.getUserInfo);

module.exports = router;