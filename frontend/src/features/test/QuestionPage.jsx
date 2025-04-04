// src/features/test/QuestionPage.jsx
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';
import DrawingCanvas from '../../components/Canvas/DrawingCanvas';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, handleSubmitAnswer, loading, error } = useContext(TestContext);

  // Always initialize hooks first.
  const [prompt, setPrompt] = useState('');
  const [clearCount, setClearCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const canvasRef = useRef(null);

  // When questions or questionId change, update prompt and start timer.
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions.find(
        (q) => String(q._id || q.id) === questionId
      );
      if (currentQuestion) {
        setPrompt(currentQuestion.prompt);
        setStartTime(Date.now());
        setClearCount(0); // reset clear count on new question
      }
    }
  }, [questions, questionId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const questionIndex = questions.findIndex(
    (q) => String(q._id || q.id) === questionId
  );
  const question = questions[questionIndex];

  if (!question) {
    return <div>Question not found.</div>;
  }

  // When user clicks "Clear", clear the canvas and increment clear counter.
  const onClear = () => {
    canvasRef.current.clearCanvas();
    setClearCount((prev) => prev + 1);
  };

  // On submit, capture imageData, calculate time taken, and bundle metrics.
  const onSubmit = async () => {
    const imageData = canvasRef.current.getImageData();
    const timeTaken = Date.now() - startTime; // in milliseconds
    const answerData = { imageData, timeTaken, clearCount };

    await handleSubmitAnswer(question._id || question.id, answerData);

    // Navigate to next question or results page.
    if (questionIndex < questions.length - 1) {
      const nextQuestionId = questions[questionIndex + 1]._id || questions[questionIndex + 1].id;
      navigate(`/test/question/${nextQuestionId}`);
      canvasRef.current.clearCanvas(); // Clear canvas for next question
    } else {
      navigate('/test/results');
    }
  };

  return (
    <div>
      <h2>Number Dysgraphia Test - Question {question._id || question.id}</h2>
      <div>
        <label>
          Edit Question Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
      </div>
      <p>{prompt}</p>
      <DrawingCanvas ref={canvasRef} />
      <div>
        <button onClick={onClear}>Clear</button>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      <p>
        <strong>Clear Count:</strong> {clearCount}
      </p>
    </div>
  );
};

export default QuestionPage;
