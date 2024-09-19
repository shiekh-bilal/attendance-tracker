const express = require('express');
const { uploadFile, calculateTime } = require('../controllers/attendanceController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/upload', authMiddleware, uploadFile);
router.post('/calculate', authMiddleware, calculateTime);

module.exports = router;
