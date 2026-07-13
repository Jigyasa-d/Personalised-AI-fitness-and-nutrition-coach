export const calculateConfidence = ({
  onboarding,
  checkIn,
}) => {
  let score = 100;

  const reasons = [];

  /*
  =====================
  PHYSICAL READINESS
  =====================
  */

  if (checkIn.sleepHours < 6) {
    score -= 15;
    reasons.push("Insufficient sleep");
  } else {
    reasons.push("Good sleep");
  }

  if (checkIn.energyLevel <= 4) {
    score -= 12;
    reasons.push("Low energy");
  } else if (checkIn.energyLevel >= 8) {
    reasons.push("High energy");
  }

  if (checkIn.soreness >= 7) {
    score -= 18;
    reasons.push("High muscle soreness");
  }

  if (checkIn.stressLevel >= 8) {
    score -= 12;
    reasons.push("High stress");
  }

  /*
  =====================
  CONSISTENCY
  =====================
  */

  if (!checkIn.workoutCompleted) {
    score -= 10;
    reasons.push("Workout skipped");
  } else {
    reasons.push("Workout completed");
  }

  if (checkIn.waterIntake < 2) {
    score -= 5;
    reasons.push("Low hydration");
  }

  /*
  =====================
  GOAL ALIGNMENT
  =====================
  */

  if (checkIn.motivation <= 4) {
    score -= 10;
    reasons.push("Low motivation");
  }

  /*
  =====================
  FITNESS LEVEL BONUS
  =====================
  */

  if (onboarding.fitnessLevel === "Advanced") {
    score += 3;
  }

  if (score > 100) score = 100;

  if (score < 0) score = 0;

  let level = "";

  let recommendation = "";

  if (score >= 85) {
    level = "High";

    recommendation =
      "Increase workout intensity slightly.";
  } else if (score >= 70) {
    level = "Moderate";

    recommendation =
      "Continue with planned workout.";
  } else if (score >= 50) {
    level = "Low";

    recommendation =
      "Reduce workout intensity and prioritize recovery.";
  } else {
    level = "Very Low";

    recommendation =
      "Recovery day recommended before resuming training.";
  }

  return {
    confidenceScore: score,
    confidenceLevel: level,
    recommendation,
    reasons,
  };
};