const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_image: String,
  total_orders: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_logged_in: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);


