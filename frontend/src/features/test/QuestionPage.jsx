// src/features/test/QuestionPage.jsx
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';
import DrawingCanvas from '../../components/Canvas/DrawingCanvas';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, handleSubmitAnswer, loading, error } = useContext(TestContext);

  const [prompt, setPrompt] = useState('');
  const [clearCount, setClearCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const canvasRef = useRef(null);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions.find(q => String(q._id || q.id) === questionId);
      if (currentQuestion) {
        setPrompt(currentQuestion.prompt);
        setStartTime(Date.now());
        setClearCount(0);
      }
    }
  }, [questions, questionId]);

  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  if (questions.length === 0) return <div className="text-blue-500 text-center mt-4">Loading questions...</div>;

  const currentIndex = questions.findIndex(q => String(q._id || q.id) === questionId);
  const question = questions[currentIndex];
  if (!question) return <div className="text-red-500 text-center mt-4">Question not found.</div>;

  const onClear = () => {
    canvasRef.current.clearCanvas();
    setClearCount(prev => prev + 1);
  };

  const onSubmit = async () => {
    const imageData = canvasRef.current.getImageData();
    const timeTaken = Date.now() - startTime;
    const answerData = { imageData, timeTaken, clearCount };
    await handleSubmitAnswer(question._id || question.id, answerData);
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      const nextQuestionId = nextQuestion._id || nextQuestion.id;
      canvasRef.current.clearCanvas(); // Clear the canvas before navigating
      navigate(`/question/${nextQuestionId}`);
    } else {
      navigate('/test/results');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">{prompt}</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <DrawingCanvas ref={canvasRef} />
      </div>
      <div className="flex justify-center mt-6 space-x-6">
        <button onClick={onClear} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full">
          Clear
        </button>
        <button onClick={onSubmit} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      <p className="text-center text-gray-700 mt-4">Clear Count: {clearCount}</p>
    </div>
  );
};

export default QuestionPage;
