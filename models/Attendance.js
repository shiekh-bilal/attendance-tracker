const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
  short: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);