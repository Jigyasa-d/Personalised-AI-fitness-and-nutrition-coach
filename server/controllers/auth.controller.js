import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { successResponse, errorResponse } from "../utils/response.js";
import validator from "validator";

/*
=========================
REGISTER
=========================
*/

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (!validator.isEmail(email)) {
      return errorResponse(res, "Invalid email address", 400);
    }

    if (password.length < 6) {
      return errorResponse(
        res,
        "Password must contain at least 6 characters",
        400
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, "Email already registered", 409);
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const token = generateToken(user._id);

    return successResponse(
      res,
      "Registration Successful",
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      201
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Internal Server Error");
  }
};

/*
=========================
LOGIN
=========================
*/

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and Password required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, "Invalid Credentials", 401);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return errorResponse(res, "Invalid Credentials", 401);
    }

    const token = generateToken(user._id);

    return successResponse(res, "Login Successful", {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Internal Server Error");
  }
};

/*
=========================
PROFILE
=========================
*/

export const getProfile = async (req, res) => {
  return successResponse(res, "Profile fetched successfully", req.user);
};

/*
=========================
LOGOUT
=========================
*/

export const logoutUser = async (req, res) => {
  return successResponse(res, "Logged out successfully");
};