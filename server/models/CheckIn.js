import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    energyLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    sleepHours: {
      type: Number,
      required: true,
    },

    soreness: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    motivation: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    workoutCompleted: {
      type: Boolean,
      default: false,
    },

    waterIntake: Number,

    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CheckIn", checkInSchema);