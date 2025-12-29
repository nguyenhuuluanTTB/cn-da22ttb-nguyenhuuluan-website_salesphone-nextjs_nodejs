const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const productController = require('../controller/productController');
const oneProductController = require('../controller/oneProductController');
const getProductByBrand = require ('../controller/getProductByBrandController');
const HugeSales = require('../controller/productHugeSales');

//Lấy ra 15 sản phẩm mới nhất
// router.get('/getnewproduct',authenticateToken,productController.getNewPhone);

//test API, tắt kiểm tra token
router.get('/getnewproduct',productController.getNewPhone);

router.get('/detail_product/:product_code', oneProductController.getOnePhone);

router.get('/product_by_brand/:brand',getProductByBrand);

router.get('/hugesales', HugeSales.HugeSalesController);

module.exports = router;