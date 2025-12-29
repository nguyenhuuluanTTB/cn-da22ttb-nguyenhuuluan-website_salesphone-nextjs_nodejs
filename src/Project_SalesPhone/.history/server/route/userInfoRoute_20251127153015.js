const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const userInfoController = require('../controller/userInfoController');

router.get('/user_info',validateRequest, userInfoController.getUserInfo);

module.exports = router;