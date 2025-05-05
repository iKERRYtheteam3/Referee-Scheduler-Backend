const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// placeholder for game routes
router.get('/', auth, (req, res) => {
  res.json([]);
});

module.exports = router;