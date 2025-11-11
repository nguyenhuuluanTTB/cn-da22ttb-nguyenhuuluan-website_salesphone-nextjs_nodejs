const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const productController = require('../controller/productController');

//Lấy ra 15 sản phẩm mới nhất
router.get('/getnewproduct',authenticateToken,productController.getNewPhone);

module.exports = router;