import express from "express";
import { generateNutritionPlan } from "../controllers/nutrition.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// Generate AI Nutrition Plan
router.post(
  "/generate",
  authMiddleware,
  generateNutritionPlan
);


export default router;