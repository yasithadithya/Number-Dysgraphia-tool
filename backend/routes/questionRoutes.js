// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require('../controllers/questionController');

// POST /api/questions
router.post('/', createQuestion);

// GET /api/questions
router.get('/', getAllQuestions);

// GET /api/questions/:id
router.get('/:id', getQuestionById);

module.exports = router;
