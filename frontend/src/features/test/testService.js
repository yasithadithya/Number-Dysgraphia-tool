// Provides the test questions and simulates answer submission.

export const getTestQuestions = () => {
    const questions = [];
    for (let i = 1; i <= 5; i++) {
      questions.push({
        id: i,
        prompt: `Please write the number ${i}`,
      });
    }
    // Extra question for number 21
    questions.push({
      id: 21,
      prompt: `Please write the number 21`,
    });
    return questions;
  };
  
  export const submitAnswer = async (questionId, imageData) => {
    // In a real app, you would send a POST request to your backend.
    console.log(`Submitted answer for question ${questionId}:`, imageData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ questionId, status: 'success' });
      }, 500);
    });
  };
  