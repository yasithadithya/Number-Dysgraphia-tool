// Provides the test questions and simulates answer submission.

export const getTestQuestions = () => {
    // Create 5 questions for numbers 1 to 5.
    const questions = [];
    for (let i = 1; i <= 5; i++) {
      questions.push({
        id: i,
        prompt: `Please write the number ${i}`,
      });
    }
    return questions;
  };
  
  export const submitAnswer = async (questionId, imageData) => {
    // In a real app, you'd send a POST request to your backend.
    console.log(`Submitted answer for question ${questionId}:`, imageData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ questionId, status: 'success' });
      }, 500);
    });
  };
  