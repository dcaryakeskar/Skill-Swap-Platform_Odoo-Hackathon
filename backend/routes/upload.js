const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

// Create uploads folder if not exists
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// POST /api/upload/:userId
router.post('/:userId', upload.single('photo'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profilePhoto = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Photo uploaded', profilePhoto: user.profilePhoto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
