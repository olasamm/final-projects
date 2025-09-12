const mongoose = require('mongoose');

const LecturerSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = LecturerSchema;