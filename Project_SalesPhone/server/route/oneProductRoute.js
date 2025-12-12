const express = require('express');
const router = express.Router();
const oneProductController = require('../controller/oneProductController');

router.get('/detail_product/:product_code', oneProductController.getOnePhone);

module.exports = router;