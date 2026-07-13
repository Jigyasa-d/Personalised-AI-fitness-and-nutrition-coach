import groq from "../services/ai/groq.service.js";
import Onboarding from "../models/Onboarding.js";

import CheckIn from "../models/CheckIn.js";

import WorkoutPlan from "../models/WorkoutPlan.js";

import { calculateConfidence } from "../services/confidence/confidence.service.js";

import { workoutPrompt } from "../prompts/workout.prompt.js";
import { fetchExercises } from "../services/workout/exercise.service.js";import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const generateWorkout = async (
  req,
  res
) => {
  try {

    const onboarding =
      await Onboarding.findOne({
        user: req.user._id,
      });

    const latest =
      await CheckIn.findOne({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    if (!onboarding || !latest) {
      return errorResponse(
        res,
        "Complete onboarding and check-in first",
        400
      );
    }

    const confidence =
      calculateConfidence({
        onboarding,
        checkIn: latest,
      });
    const exercises = await fetchExercises();
    const filteredExercises = exercises.filter((exercise) => {
  const category =
    exercise.category?.name?.toLowerCase() || "";

  const equipment =
    exercise.equipment?.map((e) => e.name.toLowerCase()) || [];

  const goal =
    onboarding.fitnessGoal.toLowerCase();

  if (
    goal.includes("muscle") &&
    category.includes("strength")
  ) {
    return true;
  }

  if (
    onboarding.equipment.some((item) =>
      equipment.includes(item.toLowerCase())
    )
  ) {
    return true;
  }

  return false;
});

   const prompt = workoutPrompt(
    onboarding,
    latest,
    confidence,
    filteredExercises.slice(0, 20)
);

   const response = await groq.chat.completions.create({
  model: process.env.AI_MODEL,
  messages: [
    {
      role: "system",
      content:
        "You are an NSCA certified fitness coach. Always return ONLY valid JSON without markdown.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.7,
});

const raw = response.choices[0].message.content;

   

   let cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const workout = JSON.parse(cleaned);

    const saved =
      await WorkoutPlan.create({
        user: req.user._id,
        confidenceScore:
          confidence.confidenceScore,
        confidenceLevel:
          confidence.confidenceLevel,
        plan: workout,
      });

    return successResponse(
      res,
      "Workout Generated",
      saved
    );

  } catch (err) {

    console.log(err);

    return errorResponse(
      res,
      "Workout generation failed"
    );
  }
};