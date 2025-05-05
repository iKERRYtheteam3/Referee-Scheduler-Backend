
const express = require('express');
const router = express.Router();

// Temporary in-memory store (replace with DB later)
let availabilityStore = {};
let signedUpGames = {};

router.post('/availability', (req, res) => {
  const { email, available } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  availabilityStore[email] = available;
  res.status(200).json({ message: 'Availability saved.' });
});

router.get('/availability', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const available = availabilityStore[email];
  res.status(200).json({ available });
});

router.post('/signup', (req, res) => {
  const { email, game } = req.body;
  if (!email || !game) return res.status(400).json({ message: 'Email and game required' });

  if (!signedUpGames[email]) signedUpGames[email] = [];
  signedUpGames[email].push(game);

  res.status(200).json({ message: 'Game signed up.' });
});

router.get('/games', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const games = signedUpGames[email] || [];
  res.status(200).json({ games });
});

module.exports = router;
