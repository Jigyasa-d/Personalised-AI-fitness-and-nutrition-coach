import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/response.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return errorResponse(res, "Access Denied", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    req.user = user;

    next();
  } catch (err) {
    return errorResponse(res, "Invalid Token", 401);
  }
};

export default protect;