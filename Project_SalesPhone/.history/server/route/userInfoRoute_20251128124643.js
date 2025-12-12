const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticateToken');
const userInfoController = require('../controller/userInfoController');

router.get('/user_info',validateRequest, authenticateToken, userInfoController.getUserInfo);
router.post('/update_user_info', validateRequest, authenticateToken, userInfoController.updateUserInfoController);

module.exports = router;