// api/routes/chatbot-router.js

import express from 'express';
import * as chatbotController from './../controllers/chatbot-controller.js';

const router = express.Router();

// Define the route for querying the chatbot
// POST /api/chatbot/
router.route('/')
    .post(chatbotController.queryAgent);

export default router;