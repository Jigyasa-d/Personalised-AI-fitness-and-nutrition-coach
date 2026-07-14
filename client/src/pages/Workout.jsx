import { useState } from "react";
import api from "../services/api";

export default function Workout() {

  const [plan, setPlan] = useState(null);

  // 👇 Replace this function
  async function generate() {
    try {
      const res = await api.post("/workout/generate");

      console.log("Response:", res.data);

      setPlan(res.data.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);

      alert(
        err.response?.data?.message ||
        err.message
      );
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Workout Generator</h1>

      <button onClick={generate}>
        Generate Workout
      </button>

      <pre>
        {JSON.stringify(plan, null, 2)}
      </pre>
    </div>
  );
}