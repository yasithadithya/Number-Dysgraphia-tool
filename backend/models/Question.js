// models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  // Example: store the expected number or correct answer
  correctAnswer: {
    type: String,
    required: false,
  },
  // Additional fields as needed
});

module.exports = mongoose.model('Question', QuestionSchema);
