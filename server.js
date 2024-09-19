require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const attendanceRoutes = require('./routes/attendance');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb+srv://bilalmazharbm5:jQpRJoMSOHwUIE2m@attendancetracker.fp19y.mongodb.net/?retryWrites=true&w=majority&appName=AttendanceTracker';

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//   console.log(`Failed to connect to MongoDB: ${err.message}`);
// });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/attendance', attendanceRoutes);

// Serve Frontend
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
