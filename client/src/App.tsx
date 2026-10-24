import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";

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
      <SignUp />
    </main>
  );
}

export default App;
