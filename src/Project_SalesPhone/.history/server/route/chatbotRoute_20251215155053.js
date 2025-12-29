const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController');

// Chatbot endpoint
router.post('/chat', chatbotController.chat);

// Test Gemini endpoint
router.get('/test-gemini', chatbotController.testGemini);

module.exports = router;
