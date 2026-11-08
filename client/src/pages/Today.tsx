import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Today() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogout(e: React.FormEvent) {
    setMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error);
        return;
      }

      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h1>Today</h1>
      <button type="button" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging Out" : "Log Out"}
      </button>
      {message && <p>{message}</p>}
    </>
  );
}
