import WorkoutPlan from "../models/WorkoutPlan.js";
import Meal from "../models/Meal.js";
import CheckIn from "../models/CheckIn.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const getWorkoutHistory = async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return successResponse(
      res,
      "Workout History Loaded",
      workouts
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Failed to load workout history",
      500
    );
  }
};

export const getNutritionHistory = async (req, res) => {
  try {
    const meals = await Meal.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return successResponse(
      res,
      "Nutrition History Loaded",
      meals
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Failed to load nutrition history",
      500
    );
  }
};

export const getCheckInHistory = async (req, res) => {
  try {
    const checkins = await CheckIn.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return successResponse(
      res,
      "Check-in History Loaded",
      checkins
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Failed to load check-ins",
      500
    );
  }
};