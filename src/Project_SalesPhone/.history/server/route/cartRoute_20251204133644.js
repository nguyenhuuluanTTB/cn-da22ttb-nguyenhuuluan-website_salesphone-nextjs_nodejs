const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticateToken');
const addToCart = require('../controller/addToCartController');

//router.post('/addToCart', validateRequest, authenticateToken, addToCart.addToCart);
router.post('/addToCart', (req, res, next) => {
  console.log('✅ Route /addToCart hit!', req.body);
  next();
}, validateRequest, authenticateToken, addToCart.addToCart);
module.exports = router;