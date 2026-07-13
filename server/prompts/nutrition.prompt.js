export const nutritionPrompt = (
  onboarding,
  checkIn
) => {

return `
You are an expert fitness nutrition coach.

Create a personalized 7-day meal plan.

User details:

Fitness Goal:
${onboarding.fitnessGoal}

Age:
${onboarding.age}

Weight:
${onboarding.weight}

Height:
${onboarding.height}

Diet Preference:
${onboarding.dietPreference}

Activity Level:
${onboarding.activityLevel}

Latest Check-in:

Energy:
${checkIn.energyLevel}/10

Stress:
${checkIn.stressLevel}/10

Sleep:
${checkIn.sleepHours} hours


Return ONLY valid JSON.

Format:

{
 "dailyCalories": 2500,
 "macros": {
   "protein": "150g",
   "carbs": "300g",
   "fats": "70g"
 },
 "days": [
   {
     "day": "Monday",
     "meals": [
       {
         "time": "Breakfast",
         "name": "",
         "ingredients": [],
         "nutrition": {
            "protein": "",
            "calories": ""
         }
       }
     ]
   }
 ]
}

No markdown.
No explanations.
`;
};