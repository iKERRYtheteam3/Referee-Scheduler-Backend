
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  // Simulated user registration logic
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  return res.status(200).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Simulated login logic
  if (email === 'test@example.com' && password === 'password') {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
