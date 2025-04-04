const Submission = require('../models/Submission');
const Question = require('../models/Question');

// Create a submission for a specific question
exports.createSubmission = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { imageData, timeTaken, clearCount, userId } = req.body;

    // Check if the question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const submission = new Submission({
      question: questionId,
      imageData,
      timeTaken,
      clearCount,
      userId,
    });
    await submission.save();

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get submissions for a specific question
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

// New: Get all submissions (populating the question data)
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({}).populate('question');
    return res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching all submissions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
