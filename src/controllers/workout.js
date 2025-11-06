import Workout from '../models/workout.js';

export const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    next(error);
  }
};

export const getWorkoutById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};

export const updateWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    res.status(200).json({ success: true, message: 'Workout deleted' });
  } catch (error) {
    next(error);
  }
};