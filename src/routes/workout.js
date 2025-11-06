import express from 'express';
import Workout from '../models/workout.js';

const router = express.Router();

// Helper to handle async route handlers
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /workouts - list all workouts
router.get('/', asyncHandler(async (req, res) => {
  const workouts = await Workout.find();
  res.status(200).json(workouts);
}));

// GET /workouts/:id - get a single workout by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.status(200).json(workout);
}));

// POST /workouts - create a new workout
router.post('/', asyncHandler(async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
}));

// PUT /workouts/:id - update an existing workout
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Workout.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.status(200).json(updated);
}));

// DELETE /workouts/:id - remove a workout
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Workout.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.status(204).end();
}));

export default router;
