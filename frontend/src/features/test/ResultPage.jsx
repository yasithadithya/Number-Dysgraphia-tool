import React, { useContext } from 'react';
import { TestContext } from './TestContext';

const ResultsPage = () => {
  const { results } = useContext(TestContext);

  return (
    <div>
      <h2>Test Results</h2>
      <ul>
        {Object.entries(results).map(([questionId, status]) => (
          <li key={questionId}>
            Question {questionId}: {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
