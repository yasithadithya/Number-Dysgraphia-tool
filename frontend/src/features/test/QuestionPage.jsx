import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';
import DrawingCanvas from '../../components/Canvas/DrawingCanvas';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, handleSubmitAnswer, loading, error } = useContext(TestContext);

  // Always define hooks
  const [prompt, setPrompt] = useState("");
  const canvasRef = useRef(null);

  // When questions load, update prompt
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions.find(q => String(q._id) === questionId || String(q.id) === questionId);
      if (currentQuestion) {
        setPrompt(currentQuestion.prompt);
      }
    }
  }, [questions, questionId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const questionIndex = questions.findIndex(q => String(q._id) === questionId || String(q.id) === questionId);
  const question = questions[questionIndex];

  if (!question) {
    return <div>Question not found.</div>;
  }

  const onSubmit = async () => {
    const imageData = canvasRef.current.getImageData();
    await handleSubmitAnswer(question._id || question.id, imageData);
    if (questionIndex < questions.length - 1) {
      const nextQuestionId = questions[questionIndex + 1]._id || questions[questionIndex + 1].id;
      navigate(`/test/question/${nextQuestionId}`);
    } else {
      navigate('/test/results');
    }
  };

  const onClear = () => {
    canvasRef.current.clearCanvas();
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
    </div>
  );
};

export default QuestionPage;
