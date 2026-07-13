import CheckIn from "../models/CheckIn.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const saveCheckIn = async (req, res) => {
  try {
    const checkIn = await CheckIn.create({
      user: req.user._id,
      ...req.body,
    });

    return successResponse(
      res,
      "Daily check-in saved successfully",
      checkIn,
      201
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error");
  }
};

export const getLatestCheckIn = async (req, res) => {
  try {
    const latest = await CheckIn.findOne({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return successResponse(
      res,
      "Latest check-in fetched",
      latest
    );
  } catch (error) {
    return errorResponse(res, "Server Error");
  }
};