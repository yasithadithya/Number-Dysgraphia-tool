// Load questions from backend
export const getTestQuestions = async () => {
  const response = await fetch('http://localhost:5000/api/questions');
  if (!response.ok) {
    throw new Error('Failed to load questions');
  }
  const data = await response.json();
  return data.data;
};

// Submit answer data (including imageData, timeTaken, clearCount) to backend
export const submitAnswer = async (questionId, answerData) => {
  const response = await fetch(`http://localhost:5000/api/submissions/${questionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answerData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  const data = await response.json();
  return data.data;
};

// New: Fetch test results (all submissions)
export const getTestResults = async () => {
  const response = await fetch('http://localhost:5000/api/submissions/results');
  if (!response.ok) {
    throw new Error('Failed to load test results');
  }
  const data = await response.json();
  return data.data;
};
