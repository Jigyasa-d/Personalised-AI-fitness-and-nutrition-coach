import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    week: {
      type: Number,
      default: 1,
    },

    confidenceScore: Number,

    confidenceLevel: String,

    plan: Object,

    aiProvider: {
      type: String,
      default: "Gemini",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "WorkoutPlan",
  workoutPlanSchema
);