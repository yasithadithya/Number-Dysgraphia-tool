// routes/submissionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmissionsByQuestion,
} = require('../controllers/submissionController');

// POST /api/submissions/:questionId
router.post('/:questionId', createSubmission);

// GET /api/submissions/:questionId
router.get('/:questionId', getSubmissionsByQuestion);

module.exports = router;
