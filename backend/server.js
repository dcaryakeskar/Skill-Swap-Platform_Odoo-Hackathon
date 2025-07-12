const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const User = require('./models/User');
const SwapRequest = require('./models/SwapRequest');
const Feedback = require('./models/Feedback');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);


const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Skill Swap API running!');
});

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const swapRoutes = require('./routes/swaps');
app.use('/api/swaps', swapRoutes);

const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced.');
  app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
  });
});
