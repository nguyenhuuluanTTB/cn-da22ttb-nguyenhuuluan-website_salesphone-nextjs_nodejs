const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticateToken');
const addToCart = require('../controller/addToCartController');
const getProductInCart_Controller = require('../controller/getProductInCart');
const updateCartController = require('../controller/updateCartController');

router.post('/addToCart', validateRequest, authenticateToken, addToCart.addToCart);
router.get('/', validateRequest, authenticateToken, getProductInCart_Controller.getProductInCartController);
router.put('/update-quantity', validateRequest, authenticateToken, updateCartController.updateCartQuantity);

module.exports = router;