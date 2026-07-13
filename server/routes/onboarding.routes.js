import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  saveOnboarding,
  getOnboarding,
} from "../controllers/onboarding.controller.js";

const router = express.Router();

router.post("/", protect, saveOnboarding);

router.get("/", protect, getOnboarding);

export default router;