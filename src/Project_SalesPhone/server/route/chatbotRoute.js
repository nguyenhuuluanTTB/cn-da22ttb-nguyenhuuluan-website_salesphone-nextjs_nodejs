const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController');
const authenticateToken = require('../middleware/authenticateToken');

// Chatbot endpoint - require authentication
router.post('/chat', authenticateToken, chatbotController.chat);

// Test Gemini endpoint
router.get('/test-gemini', chatbotController.testGemini);

module.exports = router;
