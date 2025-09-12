const mongoose = require('mongoose');
const LecturerSchema = require('../schemas/lecturerSchema');

const Lecturer = mongoose.model('Lecturer', LecturerSchema);

module.exports = Lecturer;