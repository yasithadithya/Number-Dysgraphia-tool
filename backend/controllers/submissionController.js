// controllers/submissionController.js
const Submission = require('../models/Submission');
const Question = require('../models/Question');
// If you're using Node < 18, install node-fetch: npm install node-fetch
const fetch = require('node-fetch');

exports.createSubmission = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { imageData, timeTaken, clearCount, userId } = req.body;

    // Retrieve the question from the database
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Call the Python ML model endpoint
    const mlResponse = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData }),
    });

    if (!mlResponse.ok) {
      return res
        .status(500)
        .json({ success: false, message: 'Error calling ML prediction endpoint' });
    }

    const mlResult = await mlResponse.json();
    // The ML model returns an object with a 'predicted_class' field
    const predictedDigit = mlResult.predicted_class.toString();
    const isCorrect = predictedDigit === question.correctAnswer;

    // Create a new submission document with ML evaluation fields
    const submission = new Submission({
      question: questionId,
      imageData,
      timeTaken,
      clearCount,
      userId,
      predictedDigit,
      isCorrect,
    });

    await submission.save();

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getSubmissionsByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const submissions = await Submission.find({ question: questionId }).populate('question');
    return res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({}).populate('question');
    return res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching all submissions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
