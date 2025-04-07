import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';

const RedirectToFirstQuestion = () => {
  const navigate = useNavigate();
  const { questions, error } = useContext(TestContext);

  useEffect(() => {
    if (error) {
      console.error("Error loading questions:", error);
      return;
    }
    if (questions.length > 0) {
      const firstQuestionId = questions[0]._id || questions[0].id;
      navigate(`/question/${firstQuestionId}`, { replace: true });
    }
  }, [questions, error, navigate]);

  if (error) {
    return <div>Error loading questions: {error}</div>;
  }
  return <div>Loading questions...</div>;
};

export default RedirectToFirstQuestion;
