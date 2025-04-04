import React, { useState, useEffect } from 'react';
import { getTestResults } from './testService';

const ResultsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getTestResults();
        setSubmissions(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <div>Loading results...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Test Results</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Question Number</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Time Taken (s)</th>
            <th>Clear Count</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id}>
              <td>Question {index + 1}</td>
              <td>
                {submission.imageData ? (
                  <img src={submission.imageData} alt="Your answer" width="50" />
                ) : (
                  'No answer'
                )}
              </td>
              <td>{submission.question?.correctAnswer || 'N/A'}</td>
              <td>
                {submission.timeTaken ? (submission.timeTaken / 1000).toFixed(2) : 'N/A'}
              </td>
              <td>{submission.clearCount != null ? submission.clearCount : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;
