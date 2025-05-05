const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors({
  origin: 'https://diamondofficials.com',
  credentials: true
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));