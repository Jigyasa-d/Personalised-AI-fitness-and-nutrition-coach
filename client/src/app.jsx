import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Nutrition from "./pages/Nutrition";
import Onboarding from "./pages/Onboarding";
import CheckIn from "./pages/CheckIn";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Profile from "./pages/Profile";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/checkin" element={<CheckIn />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/analytics" element={<Analytics/>}/>
<Route path="/history" element={<History/>}/>
<Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}