// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit if you're sending large base64 images

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('Number Dysgraphia Backend is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
