import { useEffect, useState } from "react";
import { Navigate, Routes, Route, Link } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Today from "./pages/Today";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    fetch(`${API_URL}/health/db`)
      .then((res) => res.json())
      .then((data) => setStatus(data.ok ? "connected" : "database error"))
      .catch((err) => {
        console.error(err);
        setStatus("can't reach server ");
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">StreakLy</h1>
      <p className="mt-4">Server: {status}</p>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace></Navigate>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/today" element={<Today />} />
      </Routes>

      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </main>
  );
}

export default App;
