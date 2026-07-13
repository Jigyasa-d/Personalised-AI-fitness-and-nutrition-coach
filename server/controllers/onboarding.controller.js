import Onboarding from "../models/Onboarding.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const saveOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;

    const onboarding = await Onboarding.findOneAndUpdate(
      {
        user: userId,
      },
      {
        ...req.body,
        user: userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return successResponse(
      res,
      "Onboarding saved successfully",
      onboarding
    );
  } catch (err) {
    console.log(err);

    return errorResponse(res, "Server Error");
  }
};

export const getOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({
      user: req.user._id,
    });

    return successResponse(
      res,
      "Onboarding fetched successfully",
      onboarding
    );
  } catch (err) {
    return errorResponse(res, "Server Error");
  }
};