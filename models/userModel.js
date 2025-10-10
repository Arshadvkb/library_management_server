const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  image: {
    public_id: { type: String },
    secure_url: { type: String },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
  },
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;
