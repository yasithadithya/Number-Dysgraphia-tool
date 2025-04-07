// src/features/test/QuestionPage.jsx
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TestContext } from './TestContext';
import DrawingCanvas from '../../components/Canvas/DrawingCanvas';
import { Box, Button, Typography, Card, CardContent, CircularProgress, Alert, LinearProgress } from '@mui/material';
import instructionVideo from '../../uploads/instructions/Instruction-1.MOV'; 
import backgroundImage from '../../uploads/img.jpg'; // Adjust the path as necessary

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions, handleSubmitAnswer, loading, error } = useContext(TestContext);

  const [prompt, setPrompt] = useState('');
  const [clearCount, setClearCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const canvasRef = useRef(null);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions.find(q => String(q._id || q.id) === questionId);
      if (currentQuestion) {
        setPrompt(currentQuestion.prompt);
        setStartTime(Date.now());
        setClearCount(0);
      }
    }
  }, [questions, questionId]);

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{`Error: ${error}`}</Alert>;
  }
  if (questions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  const currentIndex = questions.findIndex(q => String(q._id || q.id) === questionId);
  const question = questions[currentIndex];
  if (!question) {
    return <Alert severity="error" sx={{ mt: 2 }}>Question not found.</Alert>;
  }

  // Calculate progress percentage
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const onClear = () => {
    canvasRef.current.clearCanvas();
    setClearCount(prev => prev + 1);
  };

  const onSubmit = async () => {
    const imageData = canvasRef.current.getImageData();
    const timeTaken = Date.now() - startTime;
    const answerData = { imageData, timeTaken, clearCount };
    await handleSubmitAnswer(question._id || question.id, answerData);
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      const nextQuestionId = nextQuestion._id || nextQuestion.id;
      canvasRef.current.clearCanvas(); // Clear the canvas before navigating
      navigate(`/question/${nextQuestionId}`);
    } else {
      navigate('/test/results');
    }
  };

  return (
    <Box sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      maxWidth: '100vw',
      py: 4,
      px: 2
    }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
        
        {/* Progress Bar Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" align="center">
            {`ප්‍රශ්ණ  ${currentIndex + 1} / ${questions.length}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#f3f3f3',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: '#82b1ff',
              },
            }}
          />
        </Box>

        <Typography variant="h4" align="center" color="primary" gutterBottom>
          {prompt}
        </Typography>
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <DrawingCanvas ref={canvasRef} />
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={onClear} 
            sx={{ borderRadius: '20px', px: 3, py: 1 }}
          >
            මකන්න 
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onSubmit} 
            disabled={loading} 
            sx={{ borderRadius: '20px', px: 3, py: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'ඉදිරියට යන්න'}
          </Button>
        </Box>

        {/* Sign Language Instruction Video Section */}
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <video width="100%" controls style={{ borderRadius: '8px' }}>
              <source src={instructionVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default QuestionPage;
