import React from 'react';
import QuestionCard from './QuestionCard';
import './QuestionList.css';

const QuestionList = ({ questions, onSubmitAnswer }) => {
  return (
    <div className="question-list">
      {questions.map((question) => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          onSubmit={onSubmitAnswer} 
        />
      ))}
    </div>
  );
};

export default QuestionList;
