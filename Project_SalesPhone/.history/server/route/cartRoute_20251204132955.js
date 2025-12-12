const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const authenticateToken = require('../middleware/authenticateToken');
import { addToCart } from '../controller/addToCartController.js';

router.post('/addToCart', validateRequest, authenticateToken, addToCart.addToCart);

module.exports = router;