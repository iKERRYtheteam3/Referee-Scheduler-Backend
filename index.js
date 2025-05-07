
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const refereeRoutes = require('./routes/referee');
const dashboardRoutes = require('./routes/dashboard');
const gamesRoutes = require('./routes/games');

dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = ['https://diamondofficials.com'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/referee', refereeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/games', gamesRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
