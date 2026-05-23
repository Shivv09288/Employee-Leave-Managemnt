const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// CORS Configuration - Allow all origins for Vercel deployment
app.use(cors());

app.use(express.json());

// Connect to database
connectDB();

// Favicon handler - prevent 404
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Employee Leave Management API', status: 'Running' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leaves', require('./routes/leaves'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/departments', require('./routes/departments'));

const PORT = process.env.PORT || 5000;

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please close other applications or change PORT in .env`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

// Export for Vercel serverless
module.exports = app;
