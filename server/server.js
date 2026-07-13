import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import onboardingRoutes from "./routes/onboarding.routes.js";
import connectDB from "./config/db.js";
import checkInRoutes from "./routes/checkin.routes.js";
import confidenceRoutes from "./routes/confidence.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import nutritionRoutes from "./routes/nutrition.routes.js";

dotenv.config();
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/checkin", checkInRoutes);
app.use("/api/confidence", confidenceRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);



app.get("/", (req, res) => {
    res.json({
        success: true,
        application: "Momentum API",
        version: "1.0",
        status: "Running 🚀",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});