// src/features/test/ResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { getTestResults } from '../test/testService';

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

  if (loading) return <div className="text-center mt-4">Loading results...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Test Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 border">Question Number</th>
              <th className="py-3 px-4 border">Your Answer</th>
              <th className="py-3 px-4 border">Correct Answer</th>
              <th className="py-3 px-4 border">Predicted Digit</th>
              <th className="py-3 px-4 border">Is Correct?</th>
              <th className="py-3 px-4 border">Time (s)</th>
              <th className="py-3 px-4 border">Clear Count</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id} className="text-center border-b">
                <td className="py-2 px-4 border">Question {index + 1}</td>
                <td className="py-2 px-4 border">
                  {submission.imageData ? (
                    <img src={submission.imageData} alt="Your answer" className="mx-auto w-16 h-16 object-contain" />
                  ) : (
                    'No answer'
                  )}
                </td>
                <td className="py-2 px-4 border">{submission.question?.correctAnswer || 'N/A'}</td>
                <td className="py-2 px-4 border">{submission.predictedDigit || 'N/A'}</td>
                <td className="py-2 px-4 border">{submission.isCorrect ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">
                  {submission.timeTaken ? (submission.timeTaken / 1000).toFixed(2) : 'N/A'}
                </td>
                <td className="py-2 px-4 border">{submission.clearCount != null ? submission.clearCount : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;
