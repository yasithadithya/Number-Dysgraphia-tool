import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';
import DrawingCanvas from '../../components/Canvas/DrawingCanvas';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, handleSubmitAnswer, loading } = useContext(TestContext);

  // Always call hooks at the top level
  const [prompt, setPrompt] = useState("");
  const canvasRef = useRef(null);

  // Update the prompt when questions or questionId change
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions.find(q => String(q.id) === questionId);
      if (currentQuestion) {
        setPrompt(currentQuestion.prompt);
      }
    }
  }, [questions, questionId]);

  // Conditionally render based on questions after hooks have been called
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const questionIndex = questions.findIndex(q => String(q.id) === questionId);
  const question = questions[questionIndex];

  if (!question) {
    return <div>Question not found.</div>;
  }

  const onSubmit = async () => {
    const imageData = canvasRef.current.getImageData();
    await handleSubmitAnswer(question.id, imageData);
    if (questionIndex < questions.length - 1) {
      canvasRef.current.clearCanvas();
      const nextQuestionId = questions[questionIndex + 1].id;
      navigate(`/test/question/${nextQuestionId}`);
    } else {
      //canvasRef.current.clearCanvas();
      navigate('/test/results');
    }
  };

  const onClear = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div>
      <h2>Number Dysgraphia Test - Question {question.id}</h2>
      <div>
      </div>
      <p>{prompt}</p>
      <DrawingCanvas ref={canvasRef} />
      <div>
        <button onClick={onClear}>Clear</button>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
