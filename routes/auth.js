const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  return res.status(200).json({ message: 'Registered successfully' });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;