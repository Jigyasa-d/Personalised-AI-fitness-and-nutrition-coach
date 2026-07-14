import WorkoutPlan from "../models/WorkoutPlan.js";
import Meal from "../models/Meal.js";
import CheckIn from "../models/CheckIn.js";
import Onboarding from "../models/Onboarding.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const onboarding = await Onboarding.findOne({
      user: userId,
    });

    const latestCheckIn = await CheckIn.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    const workoutsGenerated =
      await WorkoutPlan.countDocuments({
        user: userId,
      });

    const nutritionPlansGenerated =
      await Meal.countDocuments({
        user: userId,
      });

    const latestWorkout =
      await WorkoutPlan.findOne({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    const latestMeal =
      await Meal.findOne({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    return successResponse(
      res,
      "Dashboard Loaded",
      {
        profile: onboarding,

        latestCheckIn,

        workoutsGenerated,

        nutritionPlansGenerated,

        latestWorkout,

        latestMeal,
      }
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Dashboard loading failed",
      500
    );
  }
};