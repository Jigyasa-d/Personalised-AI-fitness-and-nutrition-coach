import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Onboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    fitnessLevel: "",
    dietaryPreference: "",
    allergies: "",
    injuries: "",
    equipment: "",
    workoutDays: "",
    workoutDuration: "",
    sleepHours: "",
    waterIntake: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      await api.post("/onboarding", {
        age: Number(form.age),
        gender: form.gender,
        height: Number(form.height),
        weight: Number(form.weight),
        fitnessGoal: form.fitnessGoal,
        fitnessLevel: form.fitnessLevel,
        dietaryPreference: form.dietaryPreference,
        allergies: form.allergies
          ? form.allergies.split(",").map((i) => i.trim())
          : [],
        injuries: form.injuries
          ? form.injuries.split(",").map((i) => i.trim())
          : [],
        equipment: form.equipment
          ? form.equipment.split(",").map((i) => i.trim())
          : [],
        workoutDays: Number(form.workoutDays),
        workoutDuration: Number(form.workoutDuration),
        sleepHours: Number(form.sleepHours),
        waterIntake: Number(form.waterIntake),
      });

      alert("Onboarding Saved");

      navigate("/checkin");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Onboarding</h1>

      <input name="age" placeholder="Age" onChange={handleChange} />
      <br /><br />

      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <br /><br />

      <input name="height" placeholder="Height (cm)" onChange={handleChange} />
      <br /><br />

      <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
      <br /><br />

      <select name="fitnessGoal" onChange={handleChange}>
        <option value="">Fitness Goal</option>
        <option>Weight Loss</option>
        <option>Muscle Gain</option>
        <option>Strength</option>
        <option>Endurance</option>
        <option>General Fitness</option>
      </select>

      <br /><br />

      <select name="fitnessLevel" onChange={handleChange}>
        <option value="">Fitness Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <br /><br />

      <select name="dietaryPreference" onChange={handleChange}>
        <option value="">Diet Preference</option>
        <option>Vegetarian</option>
        <option>Vegan</option>
        <option>Eggetarian</option>
        <option>Non-Vegetarian</option>
      </select>

      <br /><br />

      <input
        name="allergies"
        placeholder="Allergies (comma separated)"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="injuries"
        placeholder="Injuries (comma separated)"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="equipment"
        placeholder="Equipment (comma separated)"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="workoutDays"
        placeholder="Workout Days / Week"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="workoutDuration"
        placeholder="Workout Duration (minutes)"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="sleepHours"
        placeholder="Sleep Hours"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="waterIntake"
        placeholder="Water Intake (litres)"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submit}>
        Save Onboarding
      </button>
    </div>
  );
}