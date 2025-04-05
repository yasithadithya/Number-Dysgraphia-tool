const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  // Storing base64 image data
  imageData: {
    type: String,
    required: true,
  },
  // Time taken in milliseconds
  timeTaken: {
    type: Number,
    required: true,
  },
  // Number of times the student cleared the canvas during the question
  clearCount: {
    type: Number,
    default: 0,
  },
  // Optional: track who submitted
  userId: {
    type: String,
    required: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  // ML evaluation fields:
  predictedDigit: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
