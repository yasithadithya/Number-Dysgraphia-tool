import React, { useRef } from 'react';
import DrawingCanvas from '../Canvas/DrawingCanvas';
import './QuestionCard.css';

const QuestionCard = ({ question, onSubmit }) => {
  const canvasRef = useRef(null);

  const handleSubmit = () => {
    const imageData = canvasRef.current.getImageData();
    onSubmit(question.id, imageData);
  };

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="question-card">
      <h3>{question.prompt}</h3>
      <DrawingCanvas ref={canvasRef} />
      <div className="question-card-buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit Answer</button>
      </div>
    </div>
  );
};

export default QuestionCard;
