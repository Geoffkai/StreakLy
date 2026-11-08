import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //This is what happens when the user clicks Login button
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); //To prevent the refresh

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        navigate("/today", { replace: true });
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Enter your Email</label>
      <input
        id="email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        autoComplete="email"
      />
      <label htmlFor="password">Enter your Password</label>
      <input
        id="password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        autoComplete="current-password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging In" : "Log In"}
      </button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
}
