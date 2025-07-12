const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// POST /api/swaps - Create a new swap
router.post('/', async (req, res) => {
  try {
    const { requesterId, recipientId, offeredSkill, requestedSkill } = req.body;
    const swap = await SwapRequest.create({ requesterId, recipientId, offeredSkill, requestedSkill });
    res.status(201).json({ message: 'Swap request sent', swap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create swap' });
  }
});

// GET /api/swaps?userId=1
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    const swaps = await SwapRequest.findAll({
      where: {
        [SwapRequest.sequelize.Op.or]: [
          { requesterId: userId },
          { recipientId: userId }
        ]
      }
    });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch swaps' });
  }
});

// PUT /api/swaps/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const swap = await SwapRequest.findByPk(req.params.id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });

    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });

    swap.status = status;
    await swap.save();

    res.json({ message: `Swap ${status}`, swap });
  } catch (err) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

// DELETE /api/swaps/:id
router.delete('/:id', async (req, res) => {
  try {
    const swap = await SwapRequest.findByPk(req.params.id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });

    if (swap.status !== 'pending')
      return res.status(400).json({ error: 'Only pending swaps can be deleted' });

    await swap.destroy();
    res.json({ message: 'Swap deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
