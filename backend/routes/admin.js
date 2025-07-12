const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');
const Feedback = require('../models/Feedback');

// BAN or UNBAN user
router.put('/users/:id/ban', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}` });
  } catch {
    res.status(500).json({ error: 'Could not update ban status' });
  }
});

// Modify skills (e.g., remove spam)
router.put('/users/:id/skills', async (req, res) => {
  try {
    const { skillsOffered, skillsWanted } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.skillsOffered = skillsOffered || '';
    user.skillsWanted = skillsWanted || '';
    await user.save();

    res.json({ message: 'Skills updated', user });
  } catch {
    res.status(500).json({ error: 'Could not update skills' });
  }
});

// View all swaps
router.get('/swaps', async (req, res) => {
  try {
    const swaps = await SwapRequest.findAll();
    res.json(swaps);
  } catch {
    res.status(500).json({ error: 'Could not fetch swaps' });
  }
});

// Download basic report (JSON)
router.get('/report', async (req, res) => {
  try {
    const users = await User.findAll();
    const swaps = await SwapRequest.findAll();
    const feedback = await Feedback.findAll();

    res.json({ users, swaps, feedback });
  } catch {
    res.status(500).json({ error: 'Could not generate report' });
  }
});

module.exports = router;
