const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/profile/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, location, availability, skillsOffered, skillsWanted, isPublic } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name || user.name;
    user.location = location || user.location;
    user.availability = availability || user.availability;
    user.skillsOffered = skillsOffered || user.skillsOffered;
    user.skillsWanted = skillsWanted || user.skillsWanted;
    user.isPublic = isPublic !== undefined ? isPublic : user.isPublic;

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Profile update failed' });
  }
});

module.exports = router;
