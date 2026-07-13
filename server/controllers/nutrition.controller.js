import Meal from "../models/Meal.js";
import User from "../models/User.js";
import CheckIn from "../models/CheckIn.js";
import { nutritionPrompt } from "../prompts/nutrition.prompt.js";
import { generateNutritionAI } from "../services/nutrition/nutrition.service.js";


export const generateNutritionPlan = async (req, res) => {
  try {

    const userId = req.user.id;


    // Get user onboarding data
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    // Get latest check-in
    const checkIn = await CheckIn
      .findOne({ user: userId })
      .sort({ createdAt: -1 });


    if (!checkIn) {
      return res.status(400).json({
        message: "Complete daily check-in before generating nutrition plan"
      });
    }


    // Create AI prompt
    const prompt = nutritionPrompt(
      user,
      checkIn
    );


    // Generate nutrition using Groq
    const aiResponse = await generateNutritionAI(prompt);


    // Convert AI JSON string into object
    let nutritionPlan;

    try {
      nutritionPlan = JSON.parse(aiResponse);
    } 
    catch (error) {

      return res.status(500).json({
        message: "AI returned invalid JSON",
        response: aiResponse
      });

    }



    // Save nutrition plan
    const mealPlan = await Meal.create({

      user: userId,

      goal: user.fitnessGoal,

      calories: nutritionPlan.dailyCalories,

      plan: nutritionPlan,

      generatedBy: "Groq AI"

    });



    res.status(201).json({

      message: "Nutrition plan generated successfully",

      nutritionPlan: mealPlan

    });



  } catch (error) {

    console.error(
      "Nutrition generation error:",
      error
    );


    res.status(500).json({

      message: "Failed to generate nutrition plan",

      error: error.message

    });

  }
};