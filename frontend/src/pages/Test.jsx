import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TestProvider } from '../features/test/TestContext';
import QuestionPage from '../features/test/QuestionPage';
//import ResultsPage from '../features/test/ResultsPage';

const Test = () => {
  return (
    <TestProvider>
      <Routes>
        {/* When at /test, navigate to /test/question/1 */}
        <Route index element={<Navigate to="question/1" replace />} />
        <Route path="question/:questionId" element={<QuestionPage />} />
       
        {/* Fallback for unmatched routes */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </TestProvider>
  );
};

export default Test;
