// src/features/test/hooks/useTest.js
import { useState, useEffect } from 'react';
import { getTestQuestions, submitAnswer } from '../testService';

const useTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const qs = await getTestQuestions();
        setQuestions(qs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmitAnswer = async (questionId, imageData) => {
    setLoading(true);
    try {
      const response = await submitAnswer(questionId, imageData);
      setAnswers((prev) => ({ ...prev, [questionId]: imageData }));
      setResults((prev) => ({ ...prev, [questionId]: 'success' }));
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
    error,
    handleSubmitAnswer,
  };
};

export default useTest;
