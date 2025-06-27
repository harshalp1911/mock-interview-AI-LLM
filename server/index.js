// server/index.js
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const mocksRoute = require('./routes/mocks');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for React dev server
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/mocks', mocksRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
