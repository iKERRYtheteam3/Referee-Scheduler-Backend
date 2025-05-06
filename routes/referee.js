
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AdminMessage = require('../models/AdminMessage');

// Update profile info
router.post('/profile', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const updated = await User.findOneAndUpdate(
      { email },
      { name, password },
      { new: true }
    );
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get admin messages
router.get('/admin-messages', async (req, res) => {
  try {
    const messages = await AdminMessage.find().sort({ date: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin messages' });
  }
});

module.exports = router;
