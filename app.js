const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const loginRouter = require('./routes/login');
const resortRoutes = require('./routes/resortRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

dotenv.config(); // Load environment variables from .env file

const app = express();

// MongoDB connection
const mongoURI = "mongodb+srv://jayneshpatel1101:xD1Ip6c5twYkQ2jx@trawedz.uyzljxn.mongodb.net/?retryWrites=true&w=majority&appName=Trawedz"; // Use the environment variable
console.log('MongoDB URI:', mongoURI); // Check MongoDB URI in console

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});


// Middleware to parse JSON bodies
app.use(express.json());

// Use loginRouter for '/api/login' route
app.use('/api', loginRouter);

// Use resortRoutes for '/api/resorts' route
app.use('/api/resorts', resortRoutes);

// Protected route example
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route accessible only to authenticated users' });
});

// Error handling middleware for bad JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Bad JSON' });
  }
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
