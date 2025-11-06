import express from 'express';
import Goal from '../models/goal.js';

const router = express.Router();

// GET all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET goal by ID
router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE a new goal
router.post('/', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE an existing goal
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
