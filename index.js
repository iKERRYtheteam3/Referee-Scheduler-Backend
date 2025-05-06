
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const app = express();

app.use(cors({
  origin: 'https://diamondofficials.com',
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
.catch(err => console.error('MongoDB connection error:', err.message));
