import mongoose from "mongoose";

const onboardingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: Number,

    gender: String,

    height: Number,

    weight: Number,

    fitnessGoal: {
      type: String,
      enum: [
        "Weight Loss",
        "Muscle Gain",
        "Strength",
        "Endurance",
        "General Fitness",
      ],
    },

    fitnessLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    dietaryPreference: {
      type: String,
      enum: [
        "Vegetarian",
        "Vegan",
        "Eggetarian",
        "Non-Vegetarian",
      ],
    },

    allergies: [String],

    injuries: [String],

    equipment: [String],

    workoutDays: Number,

    workoutDuration: Number,

    sleepHours: Number,

    waterIntake: Number,

    confidenceScore: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Onboarding", onboardingSchema);