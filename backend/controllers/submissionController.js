const Submission = require('../models/Submission');
const Question = require('../models/Question');
const { evaluateSubmission } = require('../MLModel/mlModel');

exports.createSubmission = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { imageData, timeTaken, clearCount, userId } = req.body;

    // Check if the question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Evaluate the submission using the pre-trained MNIST model.
    // Assuming question.correctAnswer contains the expected digit as a string.
    const expectedDigit = question.correctAnswer;
    const evaluation = await evaluateSubmission(imageData, expectedDigit);

    const submission = new Submission({
      question: questionId,
      imageData,
      timeTaken,
      clearCount,
      userId,
      predictedDigit: evaluation.predictedDigit,
      isCorrect: evaluation.isCorrect,
    });
    await submission.save();

    return res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
