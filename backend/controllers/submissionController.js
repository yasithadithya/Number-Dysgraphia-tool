// controllers/submissionController.js
const Submission = require('../models/Submission');
const Question = require('../models/Question');

// Create a submission for a specific question
exports.createSubmission = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { imageData, userId } = req.body;

    // Optional: check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const submission = new Submission({
      question: questionId,
      imageData,
      userId,
    });
    await submission.save();

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all submissions for a question
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
