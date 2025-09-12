const mongoose = require('mongoose');
const StudentSchema = require('../schemas/studentSchema');

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;