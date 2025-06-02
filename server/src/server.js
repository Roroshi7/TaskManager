const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', '✗ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('\x1b[33m%s\x1b[0m', 'Please check your .env file');
  process.exit(1);
}

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let isConnecting = false;
let retryCount = 0;
const MAX_RETRIES = 5;

// Connection retry mechanism
const connectWithRetry = async () => {
  if (isConnecting) return;
  if (retryCount >= MAX_RETRIES) {
    console.error('\x1b[31m%s\x1b[0m', '✗ Maximum retry attempts reached. Please check your connection settings.');
    return;
  }

  isConnecting = true;
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('\x1b[32m%s\x1b[0m', '✓ Already connected to MongoDB');
      isConnecting = false;
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      family: 4
    });
    
    console.log('\x1b[32m%s\x1b[0m', '✓ Connected to MongoDB');
    retryCount = 0; // Reset retry count on successful connection
  } catch (err) {
    retryCount++;
    if (err.name === 'MongoServerError' && err.code === 18) {
      console.error('\x1b[31m%s\x1b[0m', '✗ MongoDB Authentication Error:');
      console.error('\x1b[33m%s\x1b[0m', 'Please check your username and password in the connection string');
      console.error('\x1b[33m%s\x1b[0m', 'Make sure to URL encode any special characters in the password');
    } else {
      console.error('\x1b[31m%s\x1b[0m', '✗ MongoDB connection error:', err.message);
    }
    console.error('\x1b[33m%s\x1b[0m', `Retry attempt ${retryCount} of ${MAX_RETRIES}`);
    
    if (retryCount < MAX_RETRIES) {
      console.error('\x1b[33m%s\x1b[0m', 'Retrying connection in 5 seconds...');
      setTimeout(() => {
        isConnecting = false;
        connectWithRetry();
      }, 5000);
    }
  }
  isConnecting = false;
};

// Initial connection attempt
connectWithRetry();

// Add connection error handler
mongoose.connection.on('error', (err) => {
  console.error('\x1b[31m%s\x1b[0m', '✗ MongoDB connection error:', err.message);
  if (!isConnecting) {
    connectWithRetry();
  }
});

// Add disconnection handler
mongoose.connection.on('disconnected', () => {
  console.log('\x1b[33m%s\x1b[0m', '! MongoDB disconnected');
  if (!isConnecting) {
    connectWithRetry();
  }
});

// Add reconnection handler
mongoose.connection.on('reconnected', () => {
  console.log('\x1b[32m%s\x1b[0m', '✓ MongoDB reconnected');
  retryCount = 0; // Reset retry count on successful reconnection
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\x1b[31m%s\x1b[0m', '✗ Server Error:', err.message);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  console.error('\x1b[31m%s\x1b[0m', '✗ Unhandled Promise Rejection:', err.message);
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('\x1b[31m%s\x1b[0m', '✗ Uncaught Exception:', err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✓ Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('\x1b[31m%s\x1b[0m', '✗ Server Error:', err.message);
}); 