import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CheckIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    energyLevel: "",
    sleepHours: "",
    soreness: "",
    stressLevel: "",
    motivation: "",
    workoutCompleted: false,
    waterIntake: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async () => {
    try {
      await api.post("/checkin", {
        energyLevel: Number(form.energyLevel),
        sleepHours: Number(form.sleepHours),
        soreness: Number(form.soreness),
        stressLevel: Number(form.stressLevel),
        motivation: Number(form.motivation),
        workoutCompleted: form.workoutCompleted,
        waterIntake: Number(form.waterIntake),
        notes: form.notes,
      });

      alert("Daily Check-In Saved");

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Daily Check-In</h1>

      <input
        name="energyLevel"
        placeholder="Energy Level (1-10)"
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
        name="soreness"
        placeholder="Soreness (1-10)"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="stressLevel"
        placeholder="Stress Level (1-10)"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="motivation"
        placeholder="Motivation (1-10)"
        onChange={handleChange}
      />
      <br /><br />

      <label>
        <input
          type="checkbox"
          name="workoutCompleted"
          onChange={handleChange}
        />
        Workout Completed Today
      </label>

      <br /><br />

      <input
        name="waterIntake"
        placeholder="Water Intake (litres)"
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="notes"
        placeholder="Notes"
        rows="4"
        cols="40"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submit}>
        Save Check-In
      </button>
    </div>
  );
}