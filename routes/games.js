const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Game = require('../models/Game');

// GET /api/games - List all games
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST /api/games - Create a game (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Admin access only' });
    }

    const { title, date, location } = req.body;
    const newGame = new Game({ title, date, location });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET /api/games/mine - Referee's signed-up games
router.get('/mine', auth, async (req, res) => {
  try {
    const games = await Game.find({ referees: req.user.id });
    res.json(games);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST /api/games/:id/signup - Referee signs up for a game
router.post('/:id/signup', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    if (game.referees.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already signed up' });
    }

    game.referees.push(req.user.id);
    await game.save();
    res.json({ msg: 'Signed up successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET /api/games/:id - Game details
router.get('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('referees', 'name email');
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
