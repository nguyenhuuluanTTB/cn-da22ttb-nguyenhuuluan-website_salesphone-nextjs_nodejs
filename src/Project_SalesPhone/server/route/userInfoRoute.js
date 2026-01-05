const express = require('express');
const router = express.Router();
const multer = require('multer');
const validateRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticateToken');
const userInfoController = require('../controller/userInfoController');

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

router.get('/user_info',validateRequest, authenticateToken, userInfoController.getUserInfo);
router.get('/user_avatar', validateRequest, authenticateToken, userInfoController.getUserAvatar);
router.post(
	'/update_user_info',
	validateRequest,
	authenticateToken,
	upload.single('avatar'),
	userInfoController.updateUserInfoController
);

module.exports = router;