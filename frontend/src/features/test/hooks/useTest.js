// src/features/test/hooks/useTest.js
import { useState, useEffect } from 'react';
import { getTestQuestions, submitAnswer } from '../testService';

const useTest = () => {
  const [questions, setQuestions] = useState([]);
  // We'll store answers as an object keyed by question id
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load questions from backend on mount
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

  // Submit answer data (including imageData, timeTaken, clearCount)
  const handleSubmitAnswer = async (questionId, answerData) => {
    setLoading(true);
    try {
      await submitAnswer(questionId, answerData);
      setAnswers((prev) => ({ ...prev, [questionId]: answerData }));
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
