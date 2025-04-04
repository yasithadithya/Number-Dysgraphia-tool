const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmissionsByQuestion,
  getAllSubmissions,
} = require('../controllers/submissionController');

// New: GET all submissions for results page
router.get('/results', getAllSubmissions);

// POST /api/submissions/:questionId to create a submission
router.post('/:questionId', createSubmission);

// GET /api/submissions/:questionId to get submissions for a given question
router.get('/:questionId', getSubmissionsByQuestion);

module.exports = router;
