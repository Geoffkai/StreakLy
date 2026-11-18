import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router";
import { useLocation } from "react-router";

export default function Login() {
  const location = useLocation();
  const resetMessage = location.state?.resetMessage ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //This is what happens when the user clicks Login button
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {resetMessage && <p role="alert">{resetMessage}</p>}
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
        <br />
        <Link to="/forgot-password">Forgot Password?</Link>
        {message && <p role="alert">{message}</p>}
      </form>
    </main>
  );
}
