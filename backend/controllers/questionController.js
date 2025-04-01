// controllers/questionController.js
const Question = require('../models/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { prompt, correctAnswer } = req.body;
    const question = new Question({ prompt, correctAnswer });
    await question.save();
    return res.status(201).json({ success: true, data: question });
  } catch (error) {
    console.error('Error creating question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    return res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    return res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error('Error fetching question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
