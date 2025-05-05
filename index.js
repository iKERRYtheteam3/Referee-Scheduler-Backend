const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// CORS setup to allow your frontend
app.use(cors({
  origin: 'https://diamondofficials.com',
  credentials: true
}));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));