const formidable = require('formidable');
const xlsx = require('xlsx');
const Attendance = require('../models/Attendance');

exports.uploadFile = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const workbook = xlsx.readFile(files.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Process data here and save to DB
    // Example:
    data.forEach(async (record) => {
      const attendance = new Attendance({
        userId: req.userId,
        date: record.date,
        checkin: record.checkin,
        checkout: record.checkout,
        short: record.short,
      });
      await attendance.save();
    });

    res.json({ message: 'File processed successfully' });
  });
};

exports.calculateTime = async (req, res) => {
  const { checkin, checkout } = req.body;
  try {
    const attendanceRecord = await Attendance.findOne({ userId: req.userId, date: new Date() });

    if (!attendanceRecord) {
      return res.status(400).json({ message: 'Attendance record not found' });
    }

    const checkinTime = new Date(`1970-01-01T${checkin}:00Z`);
    const checkoutTime = new Date(`1970-01-01T${checkout}:00Z`);
    const shortTime = new Date(`1970-01-01T${attendanceRecord.short}:00Z`);

    const workedTime = (checkoutTime - checkinTime) / 3600000; // in hours
    const remainingTime = 8 - workedTime;

    res.json({ remainingTime });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
