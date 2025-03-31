import { useState, useEffect } from 'react';
import { getTestQuestions, submitAnswer } from '../testService';

const useTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qs = getTestQuestions();
    setQuestions(qs);
  }, []);

  const handleSubmitAnswer = async (questionId, imageData) => {
    setLoading(true);
    try {
      const response = await submitAnswer(questionId, imageData);
      setAnswers((prev) => ({ ...prev, [questionId]: imageData }));
      setResults((prev) => ({ ...prev, [questionId]: response.status }));
    } catch (error) {
      console.error('Error submitting answer:', error);
      setResults((prev) => ({ ...prev, [questionId]: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    answers,
    results,
    loading,
    handleSubmitAnswer,
  };
};

export default useTest;
