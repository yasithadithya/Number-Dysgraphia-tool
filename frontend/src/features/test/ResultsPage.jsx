import React, { useState, useEffect } from 'react';
import { getTestResults } from '../test/testService';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

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

  const latestSubmissions = submissions.slice(-6);

  // Assessment Logic
  const total = latestSubmissions.length;
  const correct = latestSubmissions.filter(s => s.isCorrect).length;
  const avgTime = latestSubmissions.reduce((sum, s) => sum + (s.timeTaken || 0), 0) / total / 1000;
  const avgClears = latestSubmissions.reduce((sum, s) => sum + (s.clearCount || 0), 0) / total;

  let accuracyLevel = correct >= 5 ? 'Mild' : correct >= 3 ? 'Moderate' : 'Severe';
  let timeLevel = avgTime < 8 ? 'Mild' : avgTime < 15 ? 'Moderate' : 'Severe';
  let clearsLevel = avgClears <= 1 ? 'Mild' : avgClears <= 3 ? 'Moderate' : 'Severe';

  const levels = [accuracyLevel, timeLevel, clearsLevel];
  const counts = { Mild: 0, Moderate: 0, Severe: 0 };
  levels.forEach(level => counts[level]++);
  let overallLevel = 'Mild';
  if (counts.Severe >= 2) overallLevel = 'Severe';
  else if (counts.Moderate >= 2) overallLevel = 'Moderate';

  const ResultSummary = () => (
    <Card sx={{ mb: 4, backgroundColor: '#f0f4ff', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          🧠 Dysgraphia Assessment Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mt: 2 }}>
          <Box>
            <Typography>✅ Accuracy:</Typography>
            <Chip label={`${correct}/${total} correct`} color={accuracyLevel === 'Severe' ? 'error' : accuracyLevel === 'Moderate' ? 'warning' : 'success'} />
          </Box>
          <Box>
            <Typography>⏱️ Avg. Time:</Typography>
            <Chip label={`${avgTime.toFixed(2)}s`} color={timeLevel === 'Severe' ? 'error' : timeLevel === 'Moderate' ? 'warning' : 'success'} />
          </Box>
          <Box>
            <Typography>🧽 Clear Count:</Typography>
            <Chip label={`${avgClears.toFixed(1)} times`} color={clearsLevel === 'Severe' ? 'error' : clearsLevel === 'Moderate' ? 'warning' : 'success'} />
          </Box>
          <Box>
            <Typography>🌟 Overall Level:</Typography>
            <Chip
              label={overallLevel}
              color={overallLevel === 'Severe' ? 'error' : overallLevel === 'Moderate' ? 'warning' : 'success'}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        📝 Your Latest Test Results
      </Typography>

      <ResultSummary />

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#cdeafe' }}>
            <TableRow>
              <TableCell align="center">#️⃣</TableCell>
              <TableCell align="center">🖍️ Your Drawing</TableCell>
              <TableCell align="center">🎯 Correct</TableCell>
              <TableCell align="center">🤖 Predicted</TableCell>
              <TableCell align="center">✅ Correct?</TableCell>
              <TableCell align="center">⏱️ Time (s)</TableCell>
              <TableCell align="center">🧽 Clears</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestSubmissions.map((submission, index) => (
              <TableRow
                key={submission._id || index}
                sx={{ backgroundColor: index % 2 === 0 ? '#f9fbff' : '#ffffff' }}
              >
                <TableCell align="center">Q{index + 1}</TableCell>
                <TableCell align="center">
                  {submission.imageData ? (
                    <img
                      src={submission.imageData}
                      alt="Your answer"
                      style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                    />
                  ) : (
                    'No answer'
                  )}
                </TableCell>
                <TableCell align="center">{submission.question?.correctAnswer || 'N/A'}</TableCell>
                <TableCell align="center">{submission.predictedDigit || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={submission.isCorrect ? 'Yes' : 'No'}
                    color={submission.isCorrect ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {submission.timeTaken ? (submission.timeTaken / 1000).toFixed(2) : 'N/A'}
                </TableCell>
                <TableCell align="center">{submission.clearCount ?? 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsPage;
