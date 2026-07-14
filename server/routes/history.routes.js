import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  getWorkoutHistory,
  getNutritionHistory,
  getCheckInHistory,
} from "../controllers/history.controller.js";

const router = express.Router();

router.get(
  "/workouts",
  protect,
  getWorkoutHistory
);

router.get(
  "/nutrition",
  protect,
  getNutritionHistory
);

router.get(
  "/checkins",
  protect,
  getCheckInHistory
);

export default router;