const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController');

// Chatbot endpoint
router.post('/chat', chatbotController.chat);

module.exports = router;
