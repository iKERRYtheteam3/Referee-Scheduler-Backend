const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: { type: String, required: true },
  teams: { type: String, required: true },
  time: { type: String, required: true },
  referees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Game', GameSchema);
