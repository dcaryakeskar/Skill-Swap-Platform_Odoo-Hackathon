const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/User');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { fromUserId, toUserId, rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Save feedback
    await Feedback.create({ fromUserId, toUserId, rating, comment });

    // Update recipient's average rating
    const feedbacks = await Feedback.findAll({ where: { toUserId } });
    const total = feedbacks.reduce((sum, f) => sum + f.rating, 0);
    const avg = total / feedbacks.length;

    const user = await User.findByPk(toUserId);
    user.rating = avg;
    user.feedbackCount = feedbacks.length;
    await user.save();

    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not submit feedback' });
  }
});

// GET /api/feedback/:id
router.get('/:id', async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { toUserId: req.params.id }
    });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch feedback' });
  }
});

module.exports = router;
