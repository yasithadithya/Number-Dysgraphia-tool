import React from 'react';
import QuestionList from '../../components/Question/QuestionList';
import useTest from './hooks/useTest';

const TestPage = () => {
  const { questions, handleSubmitAnswer, results, loading } = useTest();

  return (
    <div>
      <h2>Number Dysgraphia Test</h2>
      {loading && <p>Submitting answer...</p>}
      <QuestionList questions={questions} onSubmitAnswer={handleSubmitAnswer} />
      <div>
        <h3>Results:</h3>
        <ul>
          {Object.entries(results).map(([questionId, status]) => (
            <li key={questionId}>Question {questionId}: {status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
