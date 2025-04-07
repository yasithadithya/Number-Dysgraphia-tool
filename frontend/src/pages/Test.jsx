import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TestProvider } from '../features/test/TestContext';
import RedirectToFirstQuestion from '../features/test/RedirectToFirstQuestion';
import QuestionPage from '../features/test/QuestionPage';
import ResultsPage from '../features/test/ResultsPage';

const Test = () => {
  return (
    <TestProvider>
      <Routes>
        {/* When at /test, redirect to the first question using the actual DB id */}
        <Route index element={<RedirectToFirstQuestion />} />
        <Route path="question/:questionId" element={<QuestionPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="*" element={<RedirectToFirstQuestion />} />
      </Routes>
    </TestProvider>
  );
};

export default Test;
