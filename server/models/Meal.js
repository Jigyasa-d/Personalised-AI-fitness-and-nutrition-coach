import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    calories: {
      type: Number,
    },

    plan: {
      type: Object,
      required: true,
    },

    generatedBy: {
      type: String,
      default: "Groq AI",
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;