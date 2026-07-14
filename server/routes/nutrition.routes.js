import express from "express";

import protect from "../middleware/auth.middleware.js";
import {
  generateNutrition,
} from "../controllers/nutrition.controller.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateNutrition
);

export default router;