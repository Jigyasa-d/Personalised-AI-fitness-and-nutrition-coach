import Onboarding from "../models/Onboarding.js";
import CheckIn from "../models/CheckIn.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

import { calculateConfidence } from "../services/confidence/confidence.service.js";

export const generateConfidence = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({
      user: req.user._id,
    });

    if (!onboarding) {
      return errorResponse(
        res,
        "Complete onboarding first.",
        400
      );
    }

    const latestCheckIn = await CheckIn.findOne({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    if (!latestCheckIn) {
      return errorResponse(
        res,
        "No daily check-in found.",
        400
      );
    }

    const confidence = calculateConfidence({
      onboarding,
      checkIn: latestCheckIn,
    });

    return successResponse(
      res,
      "Confidence generated successfully",
      confidence
    );
  } catch (err) {
    console.log(err);

    return errorResponse(
      res,
      "Internal Server Error"
    );
  }
};