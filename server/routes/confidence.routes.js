import express from "express";

import protect from "../middleware/auth.middleware.js";

import { generateConfidence } from "../controllers/confidence.controller.js";

const router = express.Router();

router.get("/", protect, generateConfidence);

export default router;