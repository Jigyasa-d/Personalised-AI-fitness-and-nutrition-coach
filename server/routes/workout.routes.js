import express from "express";

import protect from "../middleware/auth.middleware.js";

import { generateWorkout } from "../controllers/workout.controller.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateWorkout
);

export default router;