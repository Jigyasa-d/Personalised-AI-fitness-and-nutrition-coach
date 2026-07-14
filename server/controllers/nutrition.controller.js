import Meal from "../models/Meal.js";
import Onboarding from "../models/Onboarding.js";
import CheckIn from "../models/CheckIn.js";

import { nutritionPrompt } from "../prompts/nutrition.prompt.js";
import { generateNutritionAI } from "../services/nutrition/nutrition.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const generateNutrition = async (
  req,
  res
) => {
  try {
    const onboarding = await Onboarding.findOne({
      user: req.user._id,
    });

    const latest = await CheckIn.findOne({
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

    const prompt = nutritionPrompt(
      onboarding,
      latest
    );

    const raw = await generateNutritionAI(prompt);

    console.log(raw);

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const plan = JSON.parse(cleaned);

    const saved = await Meal.create({
      user: req.user._id,
      goal: onboarding.fitnessGoal,
      calories: plan.dailyCalories,
      plan,
    });

    return successResponse(
      res,
      "Nutrition Plan Generated",
      saved
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Nutrition generation failed",
      500
    );
  }
};