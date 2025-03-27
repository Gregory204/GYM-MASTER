// SERVER ENTRY POINT

const express = require('express'); // Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
const mongoose = require('mongoose'); // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
const cors = require('cors'); // Cors allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
const helmet = require('helmet'); // Helmet helps secure Express apps by setting various HTTP headers
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth.routes'); // ex: Import auth routes
const userRoutes = require('./routes/user.routes');
const progressRoutes = require('./routes/progress.routes');
const rewardsRoutes = require('./routes/rewards.routes');

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // ex: Use auth routes
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rewards', rewardsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the console
  res.status(500).json({ // Send a 500 Internal Server Error response
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined // Only send the error message in development mode
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); // Log a message to the console
});