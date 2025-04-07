// models/Submission.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  clearCount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  predictedDigit: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
