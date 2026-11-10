import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Today() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error);
        setMessage(error.message);
      }
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
