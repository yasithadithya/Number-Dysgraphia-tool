// src/features/test/testService.js

// Load questions from backend
export const getTestQuestions = async () => {
  const response = await fetch('http://localhost:5000/api/questions');
  if (!response.ok) {
    throw new Error('Failed to load questions');
  }
  const data = await response.json();
  // Assuming backend response is { success: true, data: questions }
  return data.data;
};

// Submit answer (with imageData) to backend
export const submitAnswer = async (questionId, imageData) => {
  const response = await fetch(`http://localhost:5000/api/submissions/${questionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageData }), // add userId if needed
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  const data = await response.json();
  return data.data;
};
