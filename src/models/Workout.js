import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    load: {
      type: Number,
      required: true,
      min: 0,
    },
    reps: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a consistent JSON output format
workoutSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default model('Workout', workoutSchema);
