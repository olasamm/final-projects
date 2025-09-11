const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('Resource', resourceSchema);