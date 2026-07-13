import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  saveCheckIn,
  getLatestCheckIn,
} from "../controllers/checkin.controller.js";

const router = express.Router();

router.post("/", protect, saveCheckIn);

router.get("/latest", protect, getLatestCheckIn);

export default router;