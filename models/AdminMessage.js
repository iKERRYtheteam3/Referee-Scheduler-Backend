
const mongoose = require('mongoose');

const AdminMessageSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminMessage', AdminMessageSchema);
