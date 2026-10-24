import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email to confirm");
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
        required
        autoComplete="new-password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating Account" : "Sign Up"}
      </button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
}
