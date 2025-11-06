import { Schema, model } from 'mongoose';

const SuggestedWorkoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
  suggestedAt: { type: Date, default: Date.now },
  notes: { type: String },
  rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

const SuggestedWorkout = model('SuggestedWorkout', SuggestedWorkoutSchema);

export default SuggestedWorkout;
